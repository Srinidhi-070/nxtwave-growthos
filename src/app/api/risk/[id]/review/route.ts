import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { action, reason, reviewerId } = await req.json();

    if (!['APPROVE', 'REJECT'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const flag = await prisma.riskFlag.findUnique({ where: { id: params.id } });
    if (!flag) return NextResponse.json({ error: 'Flag not found' }, { status: 404 });

    const updatedFlag = await prisma.riskFlag.update({
      where: { id: params.id },
      data: {
        status: action === 'APPROVE' ? 'RESOLVED' : 'REVIEWED',
        reviewedBy: reviewerId || 'system_admin',
        reviewedAt: new Date(),
      }
    });

    // Write to audit log
    await prisma.abuseAudit.create({
      data: {
        action: action === 'APPROVE' ? 'risk_approved' : 'risk_rejected',
        actorId: reviewerId || 'system_admin',
        reason: reason || 'Manual review',
        entityId: flag.subjectId,
        metadataJson: JSON.stringify({ flagId: flag.id, score: flag.score }),
      }
    });

    return NextResponse.json({ success: true, data: updatedFlag });
  } catch (error) {
    console.error('Risk Review Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
