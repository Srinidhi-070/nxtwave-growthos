import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { awardXP, unlockAchievement } from '@/lib/progression';

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

    // Input Validation (Master Prompt: Character Validation)
    const allowedBodies = ['base', 'slim', 'heavy']; // Example allowlist
    const bodyType = allowedBodies.includes(config.body) ? config.body : 'base';

    const isNew = !(await prisma.character.findUnique({ where: { userId } }));

    const character = await prisma.character.upsert({
      where: { userId },
      update: {
        displayName,
        body: bodyType,
        face: config.face || 'default',
        hair: config.hair || 'none',
        hairColor: String(config.hairColor || '1'),
        outfit: config.outfit || 'explorer',
        accessory: config.accessory || 'none',
        effect: config.effect || 'none',
      },
      create: {
        userId,
        displayName,
        body: bodyType,
        face: config.face || 'default',
        hair: config.hair || 'none',
        hairColor: String(config.hairColor || '1'),
        outfit: config.outfit || 'explorer',
        accessory: config.accessory || 'none',
        effect: config.effect || 'none',
      },
    });

    if (isNew) {
      // 1. Emit telemetry
      await prisma.trackingEvent.create({
        data: {
          eventName: 'character_created',
          userId,
          idempotencyKey: `char_create_${userId}`,
          propertiesJson: JSON.stringify({ characterId: character.id })
        }
      });

      // 2. Qualify referral if they were referred
      const pendingReferral = await prisma.referral.findFirst({
        where: { refereeId: userId, qualificationState: 'PENDING' }
      });

      if (pendingReferral) {
        // Upgrade referral
        await prisma.referral.update({
          where: { id: pendingReferral.id },
          data: {
            qualificationState: 'QUALIFIED',
            lifecycleState: 'ACTIVE',
            attributedAt: new Date()
          }
        });

        // Award Referrer XP
        await awardXP({
          userId: pendingReferral.referrerId,
          amount: 150,
          source: 'REFERRAL_CONVERSION',
          referenceId: pendingReferral.id,
          idempotencyKey: `xp_ref_${pendingReferral.id}`
        });

        // Potentially unlock achievements for the referrer (e.g. FIRST_SIGNAL)
        const totalReferrals = await prisma.referral.count({
          where: { referrerId: pendingReferral.referrerId, qualificationState: 'QUALIFIED' }
        });

        if (totalReferrals === 1) {
          await unlockAchievement({
            userId: pendingReferral.referrerId,
            achievementKey: 'FIRST_SIGNAL'
          });
        } else if (totalReferrals === 3) {
          await unlockAchievement({
            userId: pendingReferral.referrerId,
            achievementKey: 'CREW_BUILDER'
          });
        }
      }
    }

    return NextResponse.json({ success: true, data: character }, { status: 200 });
  } catch (error) {
    console.error('POST Character Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
