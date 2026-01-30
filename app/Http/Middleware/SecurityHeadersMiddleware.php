<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware to add security headers to all HTTP responses.
 * 
 * Headers added:
 * - X-Content-Type-Options: Prevents MIME-sniffing attacks
 * - X-Frame-Options: Prevents clickjacking attacks
 * - X-XSS-Protection: Legacy XSS protection for older browsers
 * - Referrer-Policy: Controls referrer information leakage
 * - Permissions-Policy: Restricts browser feature access
 * - Strict-Transport-Security: Enforces HTTPS (production only)
 */
class SecurityHeadersMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Prevent MIME type sniffing
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // Prevent clickjacking - deny all framing
        $response->headers->set('X-Frame-Options', 'DENY');

        // Legacy XSS protection for older browsers
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // Control referrer information leakage
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Restrict browser features
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

        // HSTS - only in production with HTTPS
        if (app()->environment('production') && $request->isSecure()) {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }

        // Content Security Policy - adjusted for Vite and common needs
        $csp = $this->buildContentSecurityPolicy();
        $response->headers->set('Content-Security-Policy', $csp);

        return $response;
    }

    /**
     * Build Content Security Policy header value.
     */
    private function buildContentSecurityPolicy(): string
    {
        $policies = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for Vite HMR in dev
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com data:",
            "img-src 'self' data: blob: https:",
            "connect-src 'self' ws: wss: https://api.lanyard.rest", // WebSocket for Vite HMR + Lanyard
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
        ];

        return implode('; ', $policies);
    }
}
