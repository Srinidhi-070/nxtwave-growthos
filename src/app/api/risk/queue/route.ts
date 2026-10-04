export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const queue = await prisma.riskFlag.findMany({
      where: { status: 'OPEN' },
      orderBy: { score: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: queue
    });
  } catch (error) {
    console.error('Risk Queue Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


