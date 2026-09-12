/**
 * Sanitize strings by stripping HTML tags, javascript: protocols, control chars, and excessive whitespace
 */
export function sanitizeText(val?: string | null): string {
  if (!val) return '';
  return val
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/javascript:/gi, '') // Strip javascript: pseudo-protocols
    .replace(/on\w+="[^"]*"/gi, '') // Strip inline event handlers
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Strip control chars
    .trim();
}
