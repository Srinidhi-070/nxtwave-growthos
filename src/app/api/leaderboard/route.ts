import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        character: true,
        givenReferrals: true,
        trackingEvents: true,
      }
    });

    const leaderboard = users
      .filter(u => u.character) // Only users who completed character creation
      .map(u => {
        // Calculate XP
        let totalXP = 0;
        if (u.trackingEvents.some(e => e.eventName === 'character_created')) totalXP += 100;
        const refs = u.givenReferrals.filter(r => r.qualificationState === 'QUALIFIED').length;
        totalXP += (refs * 150);
        
        // Calculate Impact (refs * 50)
        const impact = u.givenReferrals.length * 50;
        const level = Math.floor(totalXP / 300) + 1;

        return {
          id: u.id,
          name: u.character?.displayName || 'Unknown',
          character: u.character,
          level,
          impact,
          referrals: refs
        };
      })
      .sort((a, b) => b.impact - a.impact || b.level - a.level)
      .slice(0, 50); // Top 50

    return NextResponse.json({ success: true, data: leaderboard }, { status: 200 });
  } catch (error) {
    console.error('Leaderboard API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
