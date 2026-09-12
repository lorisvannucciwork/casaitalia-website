import { NextRequest, NextResponse } from 'next/server';
import { getDynamicMenuItems } from '@/lib/menu';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/cors';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return handleCorsPreflight(req, 'GET, OPTIONS');
}

export async function GET(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req, 'GET, OPTIONS');
  try {
    const items = await getDynamicMenuItems();
    return NextResponse.json(
      { success: true, items, total: items.length },
      {
        headers: {
          ...corsHeaders,
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error: any) {
    console.error('Error fetching website menu:', error);
    return NextResponse.json({ error: 'Failed to load menu items' }, { status: 500, headers: corsHeaders });
  }
}
