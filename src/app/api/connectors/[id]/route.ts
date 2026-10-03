import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const userId = id; // Using userId to fetch the connector dashboard

    const connector = await prisma.connector.findUnique({
      where: { userId },
      include: { user: true },
    });

    if (!connector) {
      return NextResponse.json({ error: 'Connector not found' }, { status: 404 });
    }

    // 1. Verified Registrations (Qualified Referrals)
    const qualifiedReferrals = await prisma.referral.count({
      where: {
        referrerId: userId,
        qualificationState: 'QUALIFIED',
      },
    });

    // 2. Recent Events (e.g., share clicks, new signups)
    const recentEvents = await prisma.trackingEvent.findMany({
      where: {
        referralCode: connector.referralCode,
        eventName: { in: ['registration_completed', 'share_clicked'] }
      },
      orderBy: { occurredAt: 'desc' },
      take: 5,
    });

    // Share rate / activation rate can be derived from events
    const shareEvents = recentEvents.filter(e => e.eventName === 'share_clicked').length;

    return NextResponse.json({
      success: true,
      data: {
        referralCode: connector.referralCode,
        status: connector.status,
        tier: connector.tier,
        metrics: {
          verifiedRegistrations: qualifiedReferrals,
          shareClicks: shareEvents,
          qualityScore: 95, // Stub for now, calculated in phase 5
          milestoneState: qualifiedReferrals >= 3 ? 'STARTER_PACK_UNLOCKED' : 'IN_PROGRESS',
          campusRank: 'Top 10% Active', 
        },
        recentEvents: recentEvents.map(e => ({
          id: e.id,
          event: e.eventName,
          time: e.occurredAt,
        })),
        suggestedAction: qualifiedReferrals < 3 ? 'Share in your college WhatsApp group to unlock the Starter Pack.' : 'Keep going! You are a top connector.',
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Connector API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
