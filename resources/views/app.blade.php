<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @php
            $profile = \App\Models\Profile::first();
            $siteName = $profile?->name ?? config('app.name', 'Syifa Raditya');
            $siteDescription = $profile?->bio ?? 'Full-Stack Developer specializing in Laravel, React, and modern web technologies. View my portfolio and projects.';
            $siteImage = $profile?->image ? asset('storage/' . $profile->image) : asset('images/profile.png');
            $gaId = $profile?->google_analytics_id;
            $faviconUrl = $profile?->logo ? asset('storage/' . $profile->logo) . '?v=' . time() : asset('favicon.ico');
        @endphp

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- SEO Meta Tags -->
        <meta name="description" content="{{ $siteDescription }}">
        <meta name="author" content="{{ $siteName }}">
        <meta name="robots" content="index, follow">
        <link rel="canonical" href="{{ url()->current() }}">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="{{ $siteName }} | Portfolio">
        <meta property="og:description" content="{{ $siteDescription }}">
        <meta property="og:image" content="{{ $siteImage }}">
        <meta property="og:site_name" content="{{ $siteName }}">

        <!-- Twitter Cards -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:url" content="{{ url()->current() }}">
        <meta name="twitter:title" content="{{ $siteName }} | Portfolio">
        <meta name="twitter:description" content="{{ $siteDescription }}">
        <meta name="twitter:image" content="{{ $siteImage }}">

        <!-- Favicon -->
        <link rel="icon" type="image/png" href="{{ $faviconUrl }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead

        @if($gaId)
            <!-- Google Analytics -->
            <script async src="https://www.googletagmanager.com/gtag/js?id={{ $gaId }}"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '{{ $gaId }}');
            </script>
        @endif
    </head>
    <body class="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-dark dark:text-slate-100 transition-colors duration-300">
        @inertia
    </body>
</html>
