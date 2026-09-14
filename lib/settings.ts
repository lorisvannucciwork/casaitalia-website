import db, { SystemSetting } from './db';

export interface PublicSettings {
  currency: string;
  guestWifiSsid: string;
  guestWifiPassword?: string;
  restaurantPhone: string;
  restaurantName: string;
}

export const DEFAULT_PUBLIC_SETTINGS: PublicSettings = {
  currency: '€',
  guestWifiSsid: 'CasaItalia_Guest',
  guestWifiPassword: 'casaitaliaportghalib',
  restaurantPhone: '+20 123 456 7890',
  restaurantName: 'Casa Italia Ristorante',
};

/**
 * Fetch public settings from Cloudflare D1 with safe defaults
 */
export async function getPublicSettings(): Promise<PublicSettings> {
  try {
    const rows = await db.query<SystemSetting>(
      `SELECT key, value FROM system_settings WHERE key IN ('currency', 'guest_wifi_ssid', 'guest_wifi_password', 'restaurant_phone', 'restaurant_name')`
    );

    const map: Record<string, string> = {};
    for (const r of rows) {
      if (r && r.key && typeof r.value === 'string') {
        map[r.key] = r.value;
      }
    }

    return {
      currency: map['currency'] || DEFAULT_PUBLIC_SETTINGS.currency,
      guestWifiSsid: map['guest_wifi_ssid'] || DEFAULT_PUBLIC_SETTINGS.guestWifiSsid,
      guestWifiPassword: map['guest_wifi_password'] || DEFAULT_PUBLIC_SETTINGS.guestWifiPassword,
      restaurantPhone: map['restaurant_phone'] || DEFAULT_PUBLIC_SETTINGS.restaurantPhone,
      restaurantName: map['restaurant_name'] || DEFAULT_PUBLIC_SETTINGS.restaurantName,
    };
  } catch (err) {
    console.warn('Failed to load system settings from D1, using defaults:', err);
    return DEFAULT_PUBLIC_SETTINGS;
  }
}
