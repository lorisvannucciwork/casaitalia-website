import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/cors';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return handleCorsPreflight(req, 'POST, OPTIONS');
}

export async function POST(req: NextRequest) {
  const cors = getCorsHeaders(req, 'POST, OPTIONS');
  try {
    const authSecret =
      req.headers.get('x-internal-secret') ||
      req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

    const expectedSecret = process.env.INTERNAL_API_SECRET;

    if (
      expectedSecret &&
      expectedSecret !== 'your_secure_internal_api_secret' &&
      authSecret !== expectedSecret
    ) {
      return NextResponse.json({ error: 'Unauthorized revalidation' }, { status: 401, headers: cors });
    }

    // Revalidate menu paths and API routes
    revalidatePath('/menu');
    revalidatePath('/');

    return NextResponse.json(
      {
        success: true,
        revalidated: true,
        timestamp: new Date().toISOString(),
        paths: ['/menu', '/'],
      },
      { headers: cors }
    );
  } catch (error: unknown) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500, headers: cors });
  }
}
