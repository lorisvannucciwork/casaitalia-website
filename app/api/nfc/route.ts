import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { sanitizeText, sanitizeUrl, validateRedirectUrl } from '@/lib/security';
import { checkRateLimit, getClientIp } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

export type LinkPlatformType = 
  | 'phone' 
  | 'whatsapp' 
  | 'instagram' 
  | 'tiktok' 
  | 'facebook' 
  | 'linkedin' 
  | 'twitter' 
  | 'youtube' 
  | 'snapchat' 
  | 'telegram' 
  | 'email' 
  | 'website' 
  | 'other';

export interface CustomLinkItem {
  id: string;
  type?: LinkPlatformType;
  title: string;
  url: string;
}

export interface SocialCardData {
  guestName?: string;
  headline?: string;
  bio?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  customLinks?: CustomLinkItem[];
}

export interface NfcGiftTag {
  id: string;
  type: 'redirect' | 'social_card';
  targetUrl: string;
  socialCard?: SocialCardData;
  tapsCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface NfcTableRow {
  id: string;
  type: string;
  target_url: string;
  social_card: string | null;
  taps_count: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export async function GET(req: NextRequest) {
  try {
    // 1. Strict Internal Authentication (prevent public harvesting of guest contact/social data)
    const internalSecret = req.headers.get('x-internal-secret');
    const configuredSecret = process.env.INTERNAL_API_SECRET;

    if (!configuredSecret || internalSecret !== configuredSecret) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Internal service authentication required' },
        { status: 401 }
      );
    }

    // 2. IP Rate Limiting
    const ip = getClientIp(req);
    const rate = await checkRateLimit(`nfc_get_${ip}`, 60, 60);
    if (!rate.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const rows = await db.query<NfcTableRow>(
      `SELECT id, type, target_url, social_card, taps_count, status, created_at, updated_at 
       FROM nfc 
       ORDER BY created_at DESC`
    );

    const tags: NfcGiftTag[] = rows.map((r) => {
      let socialCard: SocialCardData | undefined = undefined;
      if (r.social_card) {
        try {
          socialCard = typeof r.social_card === 'string' ? JSON.parse(r.social_card) : r.social_card;
        } catch {
          socialCard = undefined;
        }
      }

      return {
        id: r.id,
        type: r.type === 'social_card' ? 'social_card' : 'redirect',
        targetUrl: r.target_url || '',
        socialCard,
        tapsCount: Number(r.taps_count || 0),
        status: r.status === 'inactive' ? 'inactive' : 'active',
        createdAt: r.created_at,
      };
    });

    return NextResponse.json({ success: true, tags });
  } catch (error: any) {
    console.error('Error fetching NFC tags in website app:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch tags' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Strict Internal Authentication
    const internalSecret = req.headers.get('x-internal-secret');
    const configuredSecret = process.env.INTERNAL_API_SECRET;

    if (!configuredSecret || internalSecret !== configuredSecret) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Internal service authentication required' },
        { status: 401 }
      );
    }

    // 2. IP Rate Limiting
    const ip = getClientIp(req);
    const rate = await checkRateLimit(`nfc_post_${ip}`, 20, 60);
    if (!rate.success) {
      return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.tags)) {
      return NextResponse.json({ success: false, error: 'Tags must be an array' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const activeIds: string[] = [];

    // 3. Upsert sanitized tags in dedicated nfc table
    for (const t of body.tags) {
      const id = sanitizeText(t.id).toLowerCase().slice(0, 32);
      if (!id) continue;
      activeIds.push(id);

      const type = t.type === 'redirect' ? 'redirect' : 'social_card';
      const targetUrl = type === 'redirect' ? (validateRedirectUrl(t.targetUrl) || '') : '';
      const status = t.status === 'inactive' ? 'inactive' : 'active';
      const tapsCount = Math.max(0, parseInt(t.tapsCount, 10) || 0);
      const createdAt = t.createdAt ? sanitizeText(t.createdAt) : now;

      let socialCardJson: string | null = null;
      if (t.socialCard && typeof t.socialCard === 'object') {
        const sc = t.socialCard;
        const customLinks: CustomLinkItem[] = Array.isArray(sc.customLinks)
          ? sc.customLinks.slice(0, 20).map((l: any, idx: number) => ({
              id: sanitizeText(l.id) || `link-${idx + 1}`,
              type: l.type || 'website',
              title: sanitizeText(l.title).slice(0, 100),
              url: sanitizeUrl(l.url),
            }))
          : [];

        const sanitizedCard = {
          guestName: sanitizeText(sc.guestName).slice(0, 100),
          headline: sanitizeText(sc.headline).slice(0, 150),
          bio: sanitizeText(sc.bio).slice(0, 500),
          phone: sanitizeText(sc.phone).slice(0, 30),
          whatsapp: sanitizeText(sc.whatsapp).slice(0, 30),
          instagram: sanitizeText(sc.instagram).slice(0, 100),
          tiktok: sanitizeText(sc.tiktok).slice(0, 100),
          facebook: sanitizeText(sc.facebook).slice(0, 100),
          linkedin: sanitizeText(sc.linkedin).slice(0, 100),
          twitter: sanitizeText(sc.twitter).slice(0, 100),
          customLinks,
        };
        socialCardJson = JSON.stringify(sanitizedCard);
      }

      await db.execute(
        `INSERT INTO nfc (id, type, target_url, social_card, taps_count, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET 
           type = excluded.type,
           target_url = excluded.target_url,
           social_card = excluded.social_card,
           taps_count = excluded.taps_count,
           status = excluded.status,
           updated_at = excluded.updated_at`,
        [id, type, targetUrl, socialCardJson, tapsCount, status, createdAt, now]
      );
    }

    if (activeIds.length > 0) {
      const placeholders = activeIds.map(() => '?').join(',');
      await db.execute(`DELETE FROM nfc WHERE id NOT IN (${placeholders})`, activeIds);
    } else {
      await db.execute(`DELETE FROM nfc`);
    }

    return NextResponse.json({ success: true, message: 'NFC tags saved successfully' });
  } catch (error: any) {
    console.error('Error saving NFC tags in website app:', error);
    return NextResponse.json({ success: false, error: 'Failed to save tags' }, { status: 500 });
  }
}
