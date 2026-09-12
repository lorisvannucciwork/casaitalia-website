import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== 'production';

const connectSources = [
  "'self'",
  "https://*.cloudflare.com",
  "https://api.cloudflare.com",
  "https://cdn.casaitaliarestaurants.com",
  "https://*.casaitaliarestaurants.com",
  ...(isDev ? ["http://localhost:*", "ws://localhost:*", "http://127.0.0.1:*", "ws://127.0.0.1:*"] : []),
].join(' ');

const securityHeaders = [
  // 1. Content Security Policy (Hardened - No unsafe-eval)
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://cdn.casaitaliarestaurants.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://cdn.casaitaliarestaurants.com https://*.r2.cloudflarestorage.com https://pub-*.r2.dev",
      "media-src 'self' data: blob: https://cdn.casaitaliarestaurants.com https://*.casaitaliarestaurants.com",
      `connect-src ${connectSources}`,
      "frame-src 'self' https://maps.google.com https://www.google.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
  // 2. Clickjacking protection
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // 3. MIME-type sniffing protection
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // 4. Referrer policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // 5. Enforce strict HTTPS transport (HSTS)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // 6. Restrict sensitive browser features
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  // 7. Cross-site scripting filter
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // 8. DNS prefetch control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.casaitaliarestaurants.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-*.r2.dev',
      },
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
      },
    ],
  },
};

export default nextConfig;
