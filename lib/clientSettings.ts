import type { PublicSettings } from './settings';
import { DEFAULT_PUBLIC_SETTINGS } from './settings';

let cachedPublicSettings: PublicSettings | null = null;
let inFlightRequest: Promise<PublicSettings | null> | null = null;

export async function fetchClientPublicSettings(): Promise<PublicSettings | null> {
  if (typeof window === 'undefined') {
    return DEFAULT_PUBLIC_SETTINGS;
  }

  if (cachedPublicSettings) {
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
      if (!res.ok) return null;
      const data = (await res.json()) as { success?: boolean; settings?: PublicSettings };
      if (data?.settings) {
        cachedPublicSettings = data.settings;
        return data.settings;
      }
    } catch {
    } finally {
      inFlightRequest = null;
    }
    return null;
  })();

  return inFlightRequest;
}
