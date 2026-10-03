import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 60; 

export async function GET() {
  try {
    const totalUsers = await prisma.user.count();
    const capacity = 500;
    
    // For demo urgency, we'll assume we have a base of 380 + real users
    const registered = Math.min(380 + totalUsers, capacity);
    const remaining = capacity - registered;
    const isWaitlist = remaining <= 0;

    return NextResponse.json({ 
      success: true, 
      data: {
        capacity,
        registered,
        remaining,
        isWaitlist
      } 
    }, { status: 200 });
  } catch (error) {
    console.error('Workshop Stats Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
