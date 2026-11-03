import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/cors';
import { checkRateLimit, getClientIp } from '@/lib/ratelimit';
import { createPizza, listPizzas, PizzaWallError } from '@/lib/pizzaWall';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return handleCorsPreflight(req, 'GET, POST, OPTIONS');
}

/** The pizzas of the wall. */
export async function GET(req: NextRequest) {
  const cors = getCorsHeaders(req, 'GET, POST, OPTIONS');
  try {
    return NextResponse.json({ pizzas: await listPizzas() }, { headers: { ...cors, 'Cache-Control': 'no-store' } });
  } catch (error: unknown) {
    console.error('Pizza wall error:', error);
    return NextResponse.json({ error: 'server', message: 'The wall could not be loaded.' }, { status: 500, headers: cors });
  }
}

/** Saves a named pizza on the wall. */
export async function POST(req: NextRequest) {
  const cors = getCorsHeaders(req, 'GET, POST, OPTIONS');
  try {
    const rate = await checkRateLimit(`pizza_post_${getClientIp(req)}`, 6, 600);
    if (!rate.success) {
      return NextResponse.json({ error: 'too_many', message: 'Too many pizzas, please wait a few minutes.' }, { status: 429, headers: cors });
    }
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'invalid', message: 'Invalid pizza.' }, { status: 400, headers: cors });
    }
    return NextResponse.json({ ok: true, pizza: await createPizza(body) }, { status: 201, headers: cors });
  } catch (error: unknown) {
    if (error instanceof PizzaWallError) {
      return NextResponse.json({ error: error.code, message: error.message }, { status: error.status, headers: cors });
    }
    console.error('Pizza wall error:', error);
    return NextResponse.json({ error: 'server', message: 'The pizza could not be saved, please try again.' }, { status: 500, headers: cors });
  }
}
