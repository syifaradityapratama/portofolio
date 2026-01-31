FROM php:8.4-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm \
    oniguruma-dev \
    libxml2-dev \
    icu-dev \
    sqlite \
    sqlite-dev \
    bash

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_mysql \
    pdo_sqlite \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    intl \
    opcache

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Install Node dependencies and build
RUN npm ci && npm run build

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Create sqlite database for fallback
RUN mkdir -p /var/www/html/database && touch /var/www/html/database/database.sqlite

# DO NOT cache config during build - env vars are not available yet!
# Config will be cached at runtime

# Expose port
EXPOSE 8080

# Create startup script
RUN printf '#!/bin/bash\nset -e\necho "Starting Laravel application..."\nphp artisan storage:link 2>/dev/null || echo "Storage link exists"\nphp artisan migrate --force || echo "Migration skipped"\nphp artisan optimize:clear\nphp artisan icons:cache\nphp artisan filament:assets\nphp artisan vendor:publish --tag=livewire:assets --force\necho "Starting queue worker..."\nphp artisan queue:work --tries=3 --timeout=90 > /dev/null 2>&1 &\necho "Starting server on port ${PORT:-8080}"\nexec php artisan serve --host=0.0.0.0 --port=${PORT:-8080}\n' > /start.sh && chmod +x /start.sh

# Start command
CMD ["/bin/bash", "/start.sh"]
