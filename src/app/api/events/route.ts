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


export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      
      const send = (data) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // Send initial connection ping
      send({ type: 'ping' });

      // Generate random mock events for the prototype
      const types = ['CHARACTER_CREATED', 'QUEST_ACCEPTED', 'REFERRAL_SHARED', 'REFERRAL_REGISTERED', 'ACHIEVEMENT_UNLOCKED', 'WORKSHOP_READY', 'RISK_FLAGGED'];
      const actors = ['0x9A..2F', '0x2B..4C', 'VIT_STUDENT', 'SYSTEM', '0x11..FF', '0x88..BB'];
      
      let count = 0;
      const interval = setInterval(() => {
        if (count > 50) {
          clearInterval(interval);
          controller.close();
          return;
        }
        
        const type = types[Math.floor(Math.random() * types.length)];
        const actor = actors[Math.floor(Math.random() * actors.length)];
        const xp = Math.floor(Math.random() * 50) * 10;
        
        send({
          type,
          actor,
          text: type === 'CHARACTER_CREATED' ? 'Identity initialized' : type === 'REFERRAL_REGISTERED' ? `+${xp} Network XP` : `Event logged`
        });
        count++;
      }, 3000);

      // Clean up when connection closes
      req?.signal?.addEventListener('abort', () => {
        clearInterval(interval);
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
