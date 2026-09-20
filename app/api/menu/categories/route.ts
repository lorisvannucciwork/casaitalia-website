import { NextRequest, NextResponse } from 'next/server';
import { getDynamicMenuCategories } from '@/lib/menu';
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
    const rate = await checkRateLimit(`categories_get_${ip}`, 120, 60);
    if (!rate.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: corsHeaders });
    }

    const categories = await getDynamicMenuCategories();
    return NextResponse.json(
      { success: true, categories, total: categories.length },
      {
        headers: {
          ...corsHeaders,
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600',
          'CDN-Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error: unknown) {
    console.error('Error fetching website categories:', error);
    return NextResponse.json({ error: 'Failed to load categories' }, { status: 500, headers: corsHeaders });
  }
}
