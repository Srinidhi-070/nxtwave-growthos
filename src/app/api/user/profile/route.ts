import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        character: true,
        project: true,
        givenReferrals: true,
        trackingEvents: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate XP
    let totalXP = 0;
    
    // Base XP for account creation (handled by event)
    const hasAccountEvent = user.trackingEvents.some(e => e.eventName === 'character_created');
    if (hasAccountEvent) totalXP += 100;

    // XP for referrals
    const qualifiedReferrals = user.givenReferrals.filter(r => r.qualificationState === 'QUALIFIED').length;
    totalXP += (qualifiedReferrals * 150);

    // Calc Level
    const level = Math.floor(totalXP / 300) + 1;
    const currentXP = totalXP % 300;
    const maxXP = 300;

    return NextResponse.json({
      success: true,
      data: {
        character: user.character,
        project: user.project,
        stats: {
          totalXP,
          level,
          currentXP,
          maxXP,
          qualifiedReferrals,
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Profile API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
