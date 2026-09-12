import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { sanitizeText, validateRedirectUrl } from '@/lib/security';
import { checkRateLimit, getClientIp } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

interface NfcTableRow {
  id: string;
  type: string;
  target_url: string;
  social_card: string | null;
  taps_count: number;
  status: string;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ tagId: string }> }
) {
  try {
    const ip = getClientIp(req);
    const rate = await checkRateLimit(`nfc_redirect_${ip}`, 30, 60);
    if (!rate.success) {
      return new NextResponse('Too many requests. Please wait a moment.', { status: 429 });
    }

    const { tagId } = await context.params;
    const cleanId = sanitizeText(tagId).toLowerCase().trim();

    if (!cleanId || cleanId.length > 32) {
      return NextResponse.redirect(new URL('/', req.url), 307);
    }

    const rows = await db.query<NfcTableRow>(
      `SELECT id, type, target_url, social_card, taps_count, status FROM nfc WHERE LOWER(id) = ?`,
      [cleanId]
    );

    if (rows.length === 0) {
      return NextResponse.redirect(new URL(`/card/${cleanId}`, req.url), 307);
    }

    const tag = rows[0];

    // Atomically increment tap count asynchronously in nfc table
    try {
      const now = new Date().toISOString();
      await db.execute(
        `UPDATE nfc SET taps_count = taps_count + 1, updated_at = ? WHERE LOWER(id) = ?`,
        [now, cleanId]
      );
    } catch (err) {
      console.error('Failed to update NFC tap count:', err);
    }

    // Redirect Mode with strict URL validation & anti-open-redirect defenses
    if (tag.type === 'redirect' && tag.target_url && tag.target_url.trim() !== '') {
      const validatedTarget = validateRedirectUrl(tag.target_url);
      if (validatedTarget) {
        return NextResponse.redirect(validatedTarget, 307);
      }
    }

    // Social / Medal Card Mode: Redirect to /card/[cleanId]
    return NextResponse.redirect(new URL(`/card/${cleanId}`, req.url), 307);
  } catch (error: any) {
    console.error('Error handling NFC redirect in website app:', error);
    return NextResponse.redirect(new URL('/', req.url), 307);
  }
}
