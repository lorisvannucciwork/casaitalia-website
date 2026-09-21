/**
 * Sanitize text input to prevent XSS vectors.
 * 
 * Note: React auto-escapes JSX, so this is a defense-in-depth measure
 * for contexts where the value might be used outside React (e.g., JSON-LD,
 * meta tags, database storage, or server-rendered attributes).
 */
export function sanitizeText(val?: string | null): string {
  if (!val) return '';
  let text = String(val);

  // 1. Decode HTML entities that could hide malicious content (e.g., &#60;script&#62;)
  text = text.replace(/&#x([0-9a-fA-F]+);?/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  text = text.replace(/&#(\d+);?/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
  text = text.replace(/&lt;/gi, '<');
  text = text.replace(/&gt;/gi, '>');
  text = text.replace(/&amp;/gi, '&');
  text = text.replace(/&quot;/gi, '"');
  text = text.replace(/&apos;/gi, "'");

  // 2. Strip inline event handlers BEFORE removing tags (so onclick="..." etc. are caught)
  text = text.replace(/\bon\w+\s*=\s*"[^"]*"/gi, '');
  text = text.replace(/\bon\w+\s*=\s*'[^']*'/gi, '');
  text = text.replace(/\bon\w+\s*=\s*[^\s>]*/gi, '');

  // 3. Remove javascript: / data: / vbscript: protocol handlers
  text = text.replace(/javascript\s*:/gi, '');
  text = text.replace(/vbscript\s*:/gi, '');
  text = text.replace(/data\s*:\s*text\/html/gi, '');

  // 4. Strip HTML tags — including unclosed tags like "<script" (no closing >)
  text = text.replace(/<[^>]*>?/gm, '');

  // 5. Remove control characters (except newline \n and carriage return \r)
  text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  return text.trim();
}

export function sanitizeUrl(url?: string | null): string {
  if (!url) return '';
  const cleaned = sanitizeText(url);
  if (!cleaned) return '';

  if (/^tel:\+?[0-9\s\-()]+$/i.test(cleaned)) {
    return cleaned.replace(/\s+/g, '');
  }
  if (/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(cleaned)) {
    return cleaned;
  }

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

export function validateRedirectUrl(url?: string | null): string | null {
  if (!url) return null;
  const raw = String(url).trim();
  if (!raw) return null;

  if (raw.startsWith('/') && !raw.startsWith('//') && !raw.startsWith('/\\')) {
    const cleanRelative = raw.replace(/[\x00-\x1F\x7F]/g, '');
    return cleanRelative.startsWith('/') ? cleanRelative : `/${cleanRelative}`;
  }

  const sanitized = sanitizeUrl(raw);
  if (!sanitized) return null;

  try {
    const parsed = new URL(sanitized);
    if (parsed.protocol === 'https:' || (process.env.NODE_ENV !== 'production' && parsed.protocol === 'http:')) {
      const hostname = parsed.hostname.toLowerCase();

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
