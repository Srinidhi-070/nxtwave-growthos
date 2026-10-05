import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateLevel } from '@/lib/progression';

export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // 1. Direct Crew (First Degree)
    const directCrew = await prisma.referral.findMany({
      where: { referrerId: userId },
      include: {
        referee: {
          select: {
            id: true,
            character: true,
            project: true,
            xpTransactions: true,
            createdAt: true
          }
        }
      },
      orderBy: { attributedAt: 'desc' }
    });

    const directIds = directCrew.map(r => r.referee.id);

    // 2. Second Degree Crew (Network Growth)
    const secondDegree = await prisma.referral.findMany({
      where: { referrerId: { in: directIds }, qualificationState: 'QUALIFIED' },
      select: { id: true, referrerId: true }
    });

    // 3. Inviter (Who Brought Me)
    const inviterRel = await prisma.referral.findFirst({
      where: { refereeId: userId },
      include: {
        referrer: {
          select: {
            character: true,
            xpTransactions: true
          }
        }
      }
    });

    // Formatting Crew with privacy (No emails or phone hashes exposed)
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
      
      const totalXP = rel.referee.xpTransactions.reduce((acc, tx) => acc + tx.amount, 0);
      const levelStats = calculateLevel(totalXP);
      
      return {
        id: rel.referee.id,
        name: rel.referee.character?.displayName || 'Unknown',
        joinedAt: rel.attributedAt || rel.referee.createdAt,
        state: rel.lifecycleState,
        projectStep: step,
        level: levelStats.level,
        xp: totalXP
      };
    });

    // Formatting Inviter safely
    let inviter = null;
    if (inviterRel) {
       const inviterXP = inviterRel.referrer.xpTransactions.reduce((acc, tx) => acc + tx.amount, 0);
       const inviterLevel = calculateLevel(inviterXP);
       
       inviter = {
         name: inviterRel.referrer.character?.displayName || 'Unknown',
         level: inviterLevel.level,
         title: inviterLevel.title
       };
    }

    const networkStats = {
      direct: directCrew.length,
      active: directCrew.filter(c => c.lifecycleState !== 'CLICKED' && c.lifecycleState !== 'REGISTERED').length,
      secondDegree: secondDegree.length,
      impactXP: (directCrew.length * 150) + (secondDegree.length * 50) // Assuming theoretical second degree impact
    };

    return NextResponse.json({
      success: true,
      data: {
        inviter,
        networkStats,
        crewMembers
      }
    }, { status: 200 });

  } catch (error) {
    console.error('GET Crew Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
