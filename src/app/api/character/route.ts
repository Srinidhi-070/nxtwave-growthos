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

    const character = await prisma.character.findUnique({
      where: { userId },
    });

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: character }, { status: 200 });
  } catch (error) {
    console.error('GET Character Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, displayName, config } = body;

    if (!userId || !displayName || !config) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const character = await prisma.character.upsert({
      where: { userId },
      update: {
        displayName,
        body: config.body,
        face: config.face,
        hair: config.hair,
        hairColor: config.hairColor,
        outfit: config.outfit,
        accessory: config.accessory,
        effect: config.effect,
      },
      create: {
        userId,
        displayName,
        body: config.body,
        face: config.face,
        hair: config.hair,
        hairColor: config.hairColor,
        outfit: config.outfit,
        accessory: config.accessory,
        effect: config.effect,
      },
    });

    // Also award initial XP for creating character
    // We check if this tracking event already exists to prevent farming XP
    const eventExists = await prisma.trackingEvent.findFirst({
      where: {
        userId,
        eventName: 'character_created'
      }
    });

    if (!eventExists) {
       await prisma.trackingEvent.create({
         data: {
           eventName: 'character_created',
           userId,
           idempotencyKey: `char_create_${userId}_${Date.now()}`,
           propertiesJson: JSON.stringify({ characterId: character.id })
         }
       });
    }

    return NextResponse.json({ success: true, data: character }, { status: 200 });
  } catch (error) {
    console.error('POST Character Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

