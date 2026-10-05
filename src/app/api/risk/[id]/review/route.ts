import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { action, reason, reviewerId } = await req.json();
    const { id } = await params;

    if (!['CLEAR', 'QUARANTINE'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action. Must be CLEAR or QUARANTINE' }, { status: 400 });
    }

    const flag = await prisma.riskFlag.findUnique({ where: { id } });
    if (!flag) return NextResponse.json({ error: 'Flag not found' }, { status: 404 });

    const updatedFlag = await prisma.riskFlag.update({
      where: { id },
      data: {
        status: action === 'CLEAR' ? 'RESOLVED' : 'REVIEWED',
        reviewedBy: reviewerId || 'SYSTEM_ADMIN',
        reviewedAt: new Date(),
      }
    });

    if (action === 'QUARANTINE' && flag.subjectType === 'USER') {
      // Suspend connector if it exists
      const connector = await prisma.connector.findUnique({ where: { userId: flag.subjectId } });
      if (connector) {
        await prisma.connector.update({
          where: { id: connector.id },
          data: { status: 'SUSPENDED' }
        });
      }
    }

    // Write to unified AuditLog (Masterplan constraint)
    await prisma.auditLog.create({
      data: {
        actorId: reviewerId || 'SYSTEM_ADMIN',
        action: action === 'CLEAR' ? 'RISK_CLEARED' : 'RISK_QUARANTINED',
        targetType: flag.subjectType,
        targetId: flag.subjectId,
        metadataJson: JSON.stringify({ reason: reason || 'Manual review', flagId: flag.id, score: flag.score }),
      }
    });

    // Also keep legacy AbuseAudit for compatibility if it's queried elsewhere
    await prisma.abuseAudit.create({
      data: {
        action: action === 'CLEAR' ? 'risk_approved' : 'risk_rejected',
        actorId: reviewerId || 'SYSTEM_ADMIN',
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
