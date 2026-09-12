import { NextRequest, NextResponse } from 'next/server';
import db, { RestaurantTable } from '@/lib/db';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/cors';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return handleCorsPreflight(req, 'GET, OPTIONS');
}

export async function GET(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req, 'GET, OPTIONS');
  try {
    const tables = await db.query<RestaurantTable>(
      `SELECT id, table_number, name, active FROM tables WHERE active = 1 ORDER BY table_number ASC`
    );

    const safeTables = tables.map((t) => ({
      id: t.id,
      table_number: t.table_number,
      name: t.name,
      active: t.active,
    }));

    return NextResponse.json({ tables: safeTables }, { headers: corsHeaders });
  } catch (error: any) {
    console.error('Error fetching tables on website:', error);
    return NextResponse.json({ error: 'Failed to fetch available tables' }, { status: 500, headers: corsHeaders });
  }
}
