import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== 'production';

const connectSources = [
  "'self'",
  "https://*.cloudflare.com",
  "https://api.cloudflare.com",
  "https://cloudflareinsights.com",
  "https://*.cloudflareinsights.com",
  "https://cdn.casaitaliarestaurants.com",
  "https://*.casaitaliarestaurants.com",
  ...(isDev ? ["http://localhost:*", "ws://localhost:*", "http://127.0.0.1:*", "ws://127.0.0.1:*"] : []),
].join(' ');

const securityHeaders = [

  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://cdn.casaitaliarestaurants.com https://static.cloudflareinsights.com https://*.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://cdn.casaitaliarestaurants.com https://*.r2.cloudflarestorage.com https://*.r2.dev https://lh3.googleusercontent.com https://images.unsplash.com",
      "media-src 'self' data: blob: https://cdn.casaitaliarestaurants.com https://*.casaitaliarestaurants.com",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      `connect-src ${connectSources}`,
      "frame-src 'self' https://maps.google.com https://www.google.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join('; '),
  },

  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },

  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },

  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },

  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },

  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },

  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },

  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },

  {
    key: 'Content-Language',
    value: 'it, en',
  },
];

const nextConfig: NextConfig = {

  poweredByHeader: false,

  trailingSlash: false,

  compress: true,

  async headers() {
    return [

      {
        source: '/:path*',
        headers: securityHeaders,
      },

      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
        ],
      },

      {
        source: '/logo/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/backgrounds/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },

      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      {
        source: '/manifest.webmanifest',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=3600',
          },
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },

      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },

      {
        source: '/browserconfig.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000',
          },
        ],
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
        hostname: '**.r2.dev',
      },
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],

    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000, 
  },
};

export default nextConfig;
