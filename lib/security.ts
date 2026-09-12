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
 * Strict validator for NFC tag redirect target URLs
 */
export function validateRedirectUrl(url?: string | null): string | null {
  if (!url) return null;
  const sanitized = sanitizeUrl(url);
  if (!sanitized) return null;

  try {
    const parsed = new URL(sanitized);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      // Prevent redirecting to dangerous localhost / internal addresses in production
      if (process.env.NODE_ENV === 'production') {
        const hostname = parsed.hostname.toLowerCase();
        if (
          hostname === 'localhost' ||
          hostname === '127.0.0.1' ||
          hostname === '0.0.0.0' ||
          hostname.endsWith('.internal') ||
          hostname.endsWith('.local')
        ) {
          return null;
        }
      }
      return parsed.toString();
    }
  } catch {
    return null;
  }

  return null;
}
