import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventName, userId, sessionId, campaignId, referralCode, propertiesJson } = body;

    if (!eventName) {
      return NextResponse.json({ error: 'Event name is required' }, { status: 400 });
    }

    const idempotencyKey = `evt_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    const event = await prisma.trackingEvent.create({
      data: {
        eventName,
        userId: userId || null,
        sessionId: sessionId || null,
        campaignId: campaignId || null,
        referralCode: referralCode || null,
        propertiesJson: propertiesJson || null,
        idempotencyKey,
      },
    });

    return NextResponse.json({ success: true, eventId: event.id }, { status: 201 });
  } catch (error) {
    console.error('Event Tracking Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
