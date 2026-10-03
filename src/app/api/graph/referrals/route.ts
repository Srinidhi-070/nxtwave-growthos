import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        connector: true,
      }
    });

    const referrals = await prisma.referral.findMany();
    
    // We also need risk flags to color the nodes
    const riskFlags = await prisma.riskFlag.findMany({
      where: { status: 'OPEN' }
    });

    const flaggedUserIds = new Set(riskFlags.filter(r => r.subjectType === 'USER').map(r => r.subjectId));

    const nodes = users.map(user => {
      let state = 'registered';
      if (flaggedUserIds.has(user.id)) state = 'suspicious';
      else if (user.connector?.status === 'ACTIVE') state = 'connector';
      
      return {
        id: user.id,
        label: `User ${user.id.substring(0, 4)}`,
        state,
      };
    });

    const edges = referrals.map(ref => ({
      id: ref.id,
      source: ref.referrerId,
      target: ref.refereeId,
      label: ref.qualificationState,
    }));

    return NextResponse.json({
      success: true,
      data: {
        nodes,
        edges
      }
    });
  } catch (error) {
    console.error('Graph API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
