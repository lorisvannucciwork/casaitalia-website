import { NextResponse } from 'next/server';
import db, { RestaurantTable, ServiceCall } from '@/lib/db';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function GET() {
  try {
    const tables = await db.query<RestaurantTable>(
      `SELECT * FROM tables WHERE active = 1 ORDER BY table_number ASC`
    );

    const activeCalls = await db.query<ServiceCall>(
      `SELECT * FROM service_calls WHERE status IN ('pending', 'claimed')`
    );

    const callMap = new Map<number, ServiceCall>();
    for (const call of activeCalls) {
      callMap.set(call.table_number, call);
    }

    const tablesWithStatus = tables.map((t) => {
      const activeCall = callMap.get(t.table_number);
      return {
        ...t,
        currentStatus: activeCall ? (activeCall.status === 'pending' ? 'calling' : 'claimed') : 'idle',
        activeCall: activeCall || null,
      };
    });

    return NextResponse.json({ tables: tablesWithStatus }, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching tables on website:', error);
    return NextResponse.json({ error: 'Failed to fetch tables' }, { status: 500, headers: corsHeaders });
  }
}
