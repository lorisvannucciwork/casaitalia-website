import { NextRequest, NextResponse } from 'next/server';
import { isOdooAuthorized, listPending } from '@/lib/online';

export const dynamic = 'force-dynamic';

/** Called every minute by the restaurant's Odoo: the orders and bookings it has not received yet. */
export async function GET(req: NextRequest) {
  if (!isOdooAuthorized(req.headers.get('authorization'))) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  try {
    const pending = await listPending();
    return NextResponse.json(pending, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error: unknown) {
    console.error('Odoo pending error:', error);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
