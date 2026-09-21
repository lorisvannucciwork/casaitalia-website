import { NextRequest, NextResponse } from 'next/server';
import { getPublicSettings } from '@/lib/settings';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/cors';
import { checkRateLimit, getClientIp } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return handleCorsPreflight(req, 'GET, OPTIONS');
}

export async function GET(req: NextRequest) {
  const cors = getCorsHeaders(req, 'GET, OPTIONS');
  try {
    const ip = getClientIp(req);
    const rate = await checkRateLimit(`public_settings_${ip}`, 60, 60);
    if (!rate.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: cors });
    }

    const settings = await getPublicSettings();
    return NextResponse.json(
      { success: true, settings },
      {
        headers: {
          ...cors,
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=1200',
          'CDN-Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
          'Vary': 'Origin, Accept',
        },
      }
    );
  } catch (error: unknown) {
    console.error('Error in public settings API:', error);
    return NextResponse.json({ error: 'Failed to fetch public settings' }, { status: 500, headers: cors });
  }
}
