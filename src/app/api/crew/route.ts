import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Get the user's crew (people they referred)
    const directCrew = await prisma.referral.findMany({
      where: { referrerId: userId },
      include: {
        referee: {
          include: {
            character: true,
            project: true,
          }
        }
      },
      orderBy: { attributedAt: 'desc' }
    });

    // Get who referred this user (Who Brought Me)
    const inviterRel = await prisma.referral.findFirst({
      where: { refereeId: userId },
      include: {
        referrer: {
          include: { character: true, trackingEvents: true, givenReferrals: true }
        }
      }
    });

    // Format Crew
    const crewMembers = directCrew.map(rel => {
      const p = rel.referee.project;
      let step = 0;
      if (p) {
         if (p.idea) step = 1;
         if (p.data) step = 2;
         if (p.model) step = 3;
         if (p.app) step = 4;
         if (p.shipped) step = 5;
      }
      
      // Determine state based on project or referral status
      let state = 'REGISTERED';
      if (step > 0) state = 'PROJECT_STARTED';
      if (step === 5) state = 'SHIPPED';
      
      return {
        id: rel.refereeId,
        name: rel.referee.character?.displayName || 'Unknown',
        joinedAt: rel.attributedAt,
        state,
        projectStep: step
      };
    });

    // Format Inviter
    let inviter = null;
    if (inviterRel) {
       // Calc level
       const refXP = inviterRel.referrer.givenReferrals.filter(r => r.qualificationState === 'QUALIFIED').length * 150;
       const baseXP = inviterRel.referrer.trackingEvents.some(e => e.eventName === 'character_created') ? 100 : 0;
       const level = Math.floor((refXP + baseXP) / 300) + 1;
       
       inviter = {
         name: inviterRel.referrer.character?.displayName || 'Unknown',
         level
       };
    }

    // Network Impact (Direct + Second Degree mock)
    // For a real app we'd do a recursive CTE, but for now we'll do Direct * 50
    const impact = directCrew.length * 50;

    return NextResponse.json({
      success: true,
      data: {
        inviter,
        impact,
        crewMembers
      }
    }, { status: 200 });

  } catch (error) {
    console.error('GET Crew Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
