import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { sanitizeText } from '@/lib/security';
import { checkRateLimit, getClientIp } from '@/lib/ratelimit';
import { NfcGiftTag, SocialCardData } from '../route';

export const dynamic = 'force-dynamic';

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

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ tagId: string }> }
) {
  try {
    const ip = getClientIp(req);
    const rate = await checkRateLimit(`nfc_get_single_${ip}`, 60, 60);
    if (!rate.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const { tagId } = await context.params;
    const cleanId = sanitizeText(tagId).toLowerCase().trim();

    if (!cleanId) {
      return NextResponse.json({ error: 'Tag ID required' }, { status: 400 });
    }

    const rows = await db.query<NfcTableRow>(
      `SELECT id, type, target_url, social_card, taps_count, status, created_at, updated_at 
       FROM nfc 
       WHERE LOWER(id) = ?`,
      [cleanId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Tag not found' }, { status: 404 });
    }

    const r = rows[0];
    let socialCard: SocialCardData | undefined = undefined;
    if (r.social_card) {
      try {
        socialCard = typeof r.social_card === 'string' ? JSON.parse(r.social_card) : r.social_card;
      } catch {
        socialCard = undefined;
      }
    }

    const tag: NfcGiftTag = {
      id: r.id,
      type: r.type === 'social_card' ? 'social_card' : 'redirect',
      targetUrl: r.target_url || '',
      socialCard,
      tapsCount: Number(r.taps_count || 0),
      status: r.status === 'inactive' ? 'inactive' : 'active',
      createdAt: r.created_at,
    };

    return NextResponse.json({ success: true, tag });
  } catch (error: any) {
    console.error('Error fetching single NFC tag:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
