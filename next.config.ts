import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com https://sanity-cdn.com https://*.sanity-cdn.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://cdn.sanity.io https://logo.clearbit.com https://cdn.simpleicons.org https://www.google.com https://*.gstatic.com https://avatars.githubusercontent.com;
  font-src 'self' data:;
  connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://vitals.vercel-insights.com https://*.sanity.io wss://*.sanity.io https://sanity-cdn.com https://*.sanity-cdn.com;
  frame-src https://*.sanity.io;
  form-action 'self';
  base-uri 'self';
  object-src 'none';
  frame-ancestors 'none';
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "t3.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
  async headers() {
    // Headers that apply everywhere (including /studio)
    const commonHeaders = securityHeaders.filter(
      (h) => h.key !== "Content-Security-Policy"
    );

    return [
      {
        // Apply CSP only to non-studio routes
        source: "/((?!studio).*)",
        headers: securityHeaders,
      },
      {
        // Studio gets all security headers EXCEPT CSP
        source: "/studio/:path*",
        headers: commonHeaders,
      },
    ];
  },
};

export default nextConfig;
