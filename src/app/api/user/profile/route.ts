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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        character: true,
        project: true,
        givenReferrals: true,
        xpTransactions: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate dynamic XP from Ledger
    const totalXP = user.xpTransactions.reduce((acc, tx) => acc + tx.amount, 0);
    const levelStats = calculateLevel(totalXP);

    const qualifiedReferrals = user.givenReferrals.filter(r => r.qualificationState === 'QUALIFIED').length;

    // Determine completed quests
    const completedQuests = user.xpTransactions
      .filter(tx => tx.source === 'QUEST' && tx.referenceId)
      .map(tx => tx.referenceId);

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        character: user.character,
        project: user.project,
        stats: {
          totalXP,
          level: levelStats.level,
          title: levelStats.title,
          currentXP: levelStats.currentXP,
          nextLevelXP: levelStats.nextLevelXP,
          progress: levelStats.progress,
          crewCount: qualifiedReferrals,
          completedQuests,
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Profile API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
