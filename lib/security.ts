export function sanitizeText(val?: string | null): string {
  if (!val) return '';
  return String(val)
    .replace(/<[^>]*>?/gm, '') 
    .replace(/javascript:/gi, '') 
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim();
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
