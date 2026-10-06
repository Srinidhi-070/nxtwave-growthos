import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { awardXP, unlockAchievement } from '@/lib/progression';

// Note: Realistically quests should be stored in a DB model, but to preserve
// the Master Prompt instruction 'Preserve compatibility' we map against the existing UI config
const QUEST_REWARDS: Record<string, { xp: number; nextQuest?: string }> = {
  'build-crew': { xp: 150 },
  'attend-workshop': { xp: 500 },
  'first-project': { xp: 300 }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, questId } = body;

    if (!userId || !questId) {
      return NextResponse.json({ error: 'Missing userId or questId' }, { status: 400 });
    }

    const questConfig = QUEST_REWARDS[questId];
    if (!questConfig) {
      return NextResponse.json({ error: 'Unknown quest ID' }, { status: 400 });
    }

    // 1. Emit telemetry
    await prisma.trackingEvent.create({
      data: {
        eventName: 'quest_completed',
        userId,
        idempotencyKey: `quest_comp_${userId}_${questId}`,
        propertiesJson: JSON.stringify({ questId })
      }
    });

    // 2. Award XP idempotently (uses the same questId so duplicate submissions fail safely)
    const result = await awardXP({
      userId,
      amount: questConfig.xp,
      source: 'QUEST',
      referenceId: questId,
      idempotencyKey: `xp_quest_${userId}_${questId}`
    });

    // 3. Mark achievement implicitly if this quest corresponds to one
    await unlockAchievement({
      userId,
      achievementKey: `QUEST_${questId.toUpperCase()}`
    });

    return NextResponse.json({ 
      success: true, 
      status: result.status,
      awardedXP: questConfig.xp 
    }, { status: 200 });

  } catch (error: any) {
    // If the tracking event fails on uniqueness, the quest was already completed
    if (error.code === 'P2002') {
      return NextResponse.json({ success: true, status: 'ALREADY_COMPLETED' }, { status: 200 });
    }
    
    console.error('Quest Completion Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


