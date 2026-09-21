import { NextRequest, NextResponse } from 'next/server';
import { getDynamicMenuItems } from '@/lib/menu';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/cors';
import { checkRateLimit, getClientIp } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return handleCorsPreflight(req, 'GET, OPTIONS');
}

export async function GET(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req, 'GET, OPTIONS');
  try {
    const ip = getClientIp(req);
    const rate = await checkRateLimit(`menu_get_${ip}`, 120, 60);
    if (!rate.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: corsHeaders });
    }

    const categoryParam = req.nextUrl.searchParams.get('category')?.trim().toLowerCase();
    const category = categoryParam && categoryParam !== 'all' ? categoryParam : undefined;

    const items = await getDynamicMenuItems(category);
    return NextResponse.json(
      { success: true, items, total: items.length, category: category || 'all' },
      {
        headers: {
          ...corsHeaders,
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
          'CDN-Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
          'Vary': 'Origin, Accept',
        },
      }
    );
  } catch (error: unknown) {
    console.error('Error fetching website menu:', error);
    return NextResponse.json({ error: 'Failed to load menu items' }, { status: 500, headers: corsHeaders });
  }
}
