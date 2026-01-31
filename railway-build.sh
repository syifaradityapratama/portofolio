#!/bin/bash

# Railway Build Script
# This script runs after dependencies are installed

echo "Running Laravel setup..."

# Generate key if not exists
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

# Run migrations
php artisan migrate --force

# Create storage link
php artisan storage:link

# Cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Build complete!"
