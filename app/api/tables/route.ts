import { NextRequest, NextResponse } from 'next/server';
import db, { RestaurantTable } from '@/lib/db';
import { cacheManager } from '@/lib/cache';
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
    const rate = await checkRateLimit(`tables_get_${ip}`, 60, 60);
    if (!rate.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: corsHeaders });
    }

    const safeTables = await cacheManager.getOrSet(
      'tables_list',
      async () => {
        const rows = await db.query<RestaurantTable>(
          `SELECT id, table_number, name, active FROM tables WHERE active = 1 ORDER BY table_number ASC`
        );
        return rows.map((t) => ({
          id: t.id,
          table_number: t.table_number,
          name: t.name,
          active: t.active,
        }));
      },
      { ttlSeconds: 300, staleSeconds: 1800, tags: ['tables'] }
    );

    return NextResponse.json(
      { tables: safeTables },
      {
        headers: {
          ...corsHeaders,
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600',
          'CDN-Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
          'Vary': 'Origin, Accept',
        },
      }
    );
  } catch (error: unknown) {
    console.error('Error fetching tables on website:', error);
    return NextResponse.json({ error: 'Failed to fetch available tables' }, { status: 500, headers: corsHeaders });
  }
}
