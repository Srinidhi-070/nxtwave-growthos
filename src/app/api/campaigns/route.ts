import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let campaign = await prisma.campaign.findFirst({
      where: { status: 'LIVE' },
    });

    if (!campaign) {
      campaign = await prisma.campaign.findFirst();
    }

    // Default initialization if none exist
    if (!campaign) {
      campaign = await prisma.campaign.create({
        data: {
          name: 'SEASON_01',
          targetRegistrations: 500,
          budget: 10000,
          referralReward: 150,
          status: 'LIVE',
          startDate: new Date(),
          endDate: new Date(Date.now() + 7 * 24 * 3600 * 1000)
        }
      });
    }

    return NextResponse.json({ success: true, data: campaign }, { status: 200 });
  } catch (error) {
    console.error('Campaign API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, targetRegistrations, budget, referralReward, status } = body;

    if (!id) return NextResponse.json({ error: 'Campaign ID required' }, { status: 400 });

    const campaign = await prisma.campaign.update({
      where: { id },
      data: {
        targetRegistrations,
        budget,
        referralReward,
        status
      }
    });

    // Master Prompt: "Create an audit mechanism for sensitive admin operations"
    await prisma.auditLog.create({
      data: {
        actorId: 'SYSTEM_ADMIN', // In a real app, from auth session
        action: 'CAMPAIGN_UPDATED',
        targetType: 'CAMPAIGN',
        targetId: id,
        metadataJson: JSON.stringify(body)
      }
    });

    return NextResponse.json({ success: true, data: campaign }, { status: 200 });
  } catch (error) {
    console.error('Campaign API PUT Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
