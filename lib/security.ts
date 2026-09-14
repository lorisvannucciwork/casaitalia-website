/**
 * Strips HTML tags, javascript: protocols, inline handlers, control chars, and excessive whitespace
 */
export function sanitizeText(val?: string | null): string {
  if (!val) return '';
  return String(val)
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/javascript:/gi, '') // Strip javascript: pseudo-protocols
    .replace(/on\w+="[^"]*"/gi, '') // Strip inline event handlers
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Strip control chars
    .trim();
}

/**
 * Validates and sanitizes a URL, enforcing safe protocols (https, http, tel, mailto)
 */
export function sanitizeUrl(url?: string | null): string {
  if (!url) return '';
  const cleaned = sanitizeText(url);
  if (!cleaned) return '';

  // Handle tel: and mailto:
  if (/^tel:\+?[0-9\s\-()]+$/i.test(cleaned)) {
    return cleaned.replace(/\s+/g, '');
  }
  if (/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(cleaned)) {
    return cleaned;
  }

  // Prepend https:// if no protocol provided
  let candidate = cleaned;
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString();
    }
  } catch {
    return '';
  }

  return '';
}

/**
 * Strict validator for safe redirect URLs
 */
export function validateRedirectUrl(url?: string | null): string | null {
  if (!url) return null;
  const raw = String(url).trim();
  if (!raw) return null;

  // 1. Safe relative paths (starts with single '/' and not '//' to prevent protocol-relative redirects)
  if (raw.startsWith('/') && !raw.startsWith('//') && !raw.startsWith('/\\')) {
    // Strip control characters
    const cleanRelative = raw.replace(/[\x00-\x1F\x7F]/g, '');
    return cleanRelative.startsWith('/') ? cleanRelative : `/${cleanRelative}`;
  }

  const sanitized = sanitizeUrl(raw);
  if (!sanitized) return null;

  try {
    const parsed = new URL(sanitized);
    if (parsed.protocol === 'https:' || (process.env.NODE_ENV !== 'production' && parsed.protocol === 'http:')) {
      const hostname = parsed.hostname.toLowerCase();

      // Whitelist of trusted production domains
      const ALLOWED_HOSTS = new Set([
        'casaitaliarestaurants.com',
        'www.casaitaliarestaurants.com',
        'cdn.casaitaliarestaurants.com',
      ]);

      const customCloud = process.env.NEXT_PUBLIC_CLOUD_SYSTEM_URL;
      if (customCloud) {
        try {
          ALLOWED_HOSTS.add(new URL(customCloud).hostname.toLowerCase());
        } catch {
          // ignore invalid env url
        }
      }

      if (ALLOWED_HOSTS.has(hostname) || hostname.endsWith('.casaitaliarestaurants.com')) {
        return parsed.toString();
      }

      if (process.env.NODE_ENV !== 'production' && (hostname === 'localhost' || hostname === '127.0.0.1')) {
        return parsed.toString();
      }
    }
  } catch {
    return null;
  }

  return null;
}

