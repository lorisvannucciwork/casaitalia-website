import type { PublicSettings } from './settings';
import { DEFAULT_PUBLIC_SETTINGS } from './settings';

let cachedPublicSettings: PublicSettings | null = null;
let cachedAt: number = 0;
let inFlightRequest: Promise<PublicSettings | null> | null = null;

/** Time-to-live for cached settings (10 minutes in ms) */
const CACHE_TTL_MS = 10 * 60 * 1000;

export async function fetchClientPublicSettings(): Promise<PublicSettings | null> {
  if (typeof window === 'undefined') {
    return DEFAULT_PUBLIC_SETTINGS;
  }

  // Return cached value if within TTL
  if (cachedPublicSettings && (Date.now() - cachedAt) < CACHE_TTL_MS) {
    return cachedPublicSettings;
  }

  if (inFlightRequest) {
    return inFlightRequest;
  }

  inFlightRequest = (async () => {
    try {
      const res = await fetch('/api/settings/public', {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) return cachedPublicSettings || null;
      const data = (await res.json()) as { success?: boolean; settings?: PublicSettings };
      if (data?.settings) {
        cachedPublicSettings = data.settings;
        cachedAt = Date.now();
        return data.settings;
      }
    } catch {
      // On fetch failure, return stale cached value if available
      if (cachedPublicSettings) return cachedPublicSettings;
    } finally {
      inFlightRequest = null;
    }
    return null;
  })();

  return inFlightRequest;
}
