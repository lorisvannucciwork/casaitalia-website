import { NextRequest, NextResponse } from 'next/server';
import db, { ServiceCall } from '@/lib/db';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tableNumber = searchParams.get('table');

    if (tableNumber) {
      const num = parseInt(tableNumber, 10);
      if (isNaN(num)) {
        return NextResponse.json({ error: 'Invalid table parameter' }, { status: 400, headers: corsHeaders });
      }
      const activeCall = await db.queryFirst<ServiceCall>(
        `SELECT * FROM service_calls WHERE table_number = ? AND status IN ('pending', 'claimed') ORDER BY created_at DESC LIMIT 1`,
        [num]
      );
      return NextResponse.json({ activeCall }, { headers: corsHeaders });
    }

    const calls = await db.query<ServiceCall>(
      `SELECT * FROM service_calls ORDER BY created_at DESC LIMIT 50`
    );
    return NextResponse.json({ calls }, { headers: corsHeaders });
  } catch (error: any) {
    console.error('Error fetching service calls on website:', error);
    return NextResponse.json({ error: error?.message || 'Failed to fetch calls' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400, headers: corsHeaders });
    }

    const { tableNumber, callType, notes, orderData } = body;

    const parsedTableNum = parseInt(String(tableNumber).replace(/\D/g, ''), 10);
    if (!parsedTableNum || isNaN(parsedTableNum)) {
      return NextResponse.json({ error: 'Valid table number is required' }, { status: 400, headers: corsHeaders });
    }

    const validCallType = callType || 'Call Waiter';
    const id = `call-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const newCall: ServiceCall = {
      id,
      table_number: parsedTableNum,
      call_type: validCallType,
      status: 'pending',
      waiter_id: null,
      waiter_name: null,
      notes: notes || null,
      order_data: orderData ? (typeof orderData === 'string' ? orderData : JSON.stringify(orderData)) : null,
      created_at: now,
      claimed_at: null,
      completed_at: null,
      response_time_seconds: 0,
    };

    // 1. Record call in database engine
    await db.execute(
      `INSERT INTO service_calls (
        id, table_number, call_type, status, waiter_id, waiter_name, notes, order_data, created_at, claimed_at, completed_at, response_time_seconds
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newCall.id,
        newCall.table_number,
        newCall.call_type,
        newCall.status,
        newCall.waiter_id,
        newCall.waiter_name,
        newCall.notes,
        newCall.order_data,
        newCall.created_at,
        newCall.claimed_at,
        newCall.completed_at,
        newCall.response_time_seconds,
      ]
    );

    // 2. Forward to waiters server if online for instant real-time notification
    try {
      const waitersUrl = process.env.NEXT_PUBLIC_WAITERS_URL || 'http://localhost:3001';
      fetch(`${waitersUrl}/api/calls`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).catch(() => {});
    } catch {
      // Non-blocking
    }

    return NextResponse.json({ success: true, call: newCall }, { status: 201, headers: corsHeaders });
  } catch (error: any) {
    console.error('Error creating service call on website:', error);
    return NextResponse.json({ error: error?.message || 'Failed to record call' }, { status: 500, headers: corsHeaders });
  }
}
