import { NextRequest, NextResponse } from 'next/server';

/**
 * Validated Allowed Production Origins
 */
const ALLOWED_ORIGINS = new Set([
  'https://casaitaliarestaurants.com',
  'https://www.casaitaliarestaurants.com',
  'https://cdn.casaitaliarestaurants.com',
]);

/**
 * Check if the given origin is permitted under strict security policies
 */
export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;

  // Exact match in whitelist
  if (ALLOWED_ORIGINS.has(origin)) return true;

  // Local development only (disabled in production)
  const isDev = process.env.NODE_ENV !== 'production';
  if (isDev) {
    if (
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ) {
      return true;
    }
  }

  // Strict subdomain match on casaitaliarestaurants.com with HTTPS
  try {
    const parsed = new URL(origin);
    if (parsed.protocol === 'https:' && /^[a-zA-Z0-9-]+\.casaitaliarestaurants\.com$/.test(parsed.hostname)) {
      return true;
    }
  } catch {
    return false;
  }

  // Custom cloud system URL from environment (if strictly configured)
  const customCloudUrl = process.env.NEXT_PUBLIC_CLOUD_SYSTEM_URL;
  if (customCloudUrl && origin === customCloudUrl) {
    return true;
  }

  return false;
}

/**
 * Generate secure CORS headers dynamically based on request Origin
 */
export function getCorsHeaders(req: Request | NextRequest, allowedMethods: string = 'GET, POST, OPTIONS'): Record<string, string> {
  const origin = req.headers.get('origin');
  const allowed = isAllowedOrigin(origin);

  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': allowedMethods,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Internal-Secret',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };

  if (allowed && origin) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  }

  return headers;
}

/**
 * Handle preflight OPTIONS requests securely
 */
export function handleCorsPreflight(req: Request | NextRequest, allowedMethods: string = 'GET, POST, OPTIONS'): NextResponse {
  const origin = req.headers.get('origin');
  const allowed = isAllowedOrigin(origin);

  if (origin && !allowed) {
    return new NextResponse(null, {
      status: 403,
      statusText: 'CORS Origin Not Allowed',
    });
  }

  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(req, allowedMethods),
  });
}
