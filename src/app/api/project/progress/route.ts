import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { awardXP, unlockAchievement } from '@/lib/progression';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, step } = body; // step 1 to 5

    if (!userId || step === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const modules = ['IDEA', 'DATA', 'MODEL', 'APP', 'SHIP'];
    
    if (step < 1 || step > 5) {
      return NextResponse.json({ error: 'Invalid step' }, { status: 400 });
    }

    const milestoneKey = modules[step - 1];

    // 1. Upsert base Project
    let status = 'IN_PROGRESS';
    if (step === 5) status = 'SHIPPED';

    // The legacy boolean flags on Project model are kept for compatibility
    const legacyFlags = {
      idea: step >= 1,
      data: step >= 2,
      model: step >= 3,
      app: step >= 4,
      shipped: step === 5
    };

    const project = await prisma.project.upsert({
      where: { userId },
      update: { status, ...legacyFlags },
      create: { userId, status, ...legacyFlags }
    });

    // 2. Idempotent Milestone Completion
    const milestone = await prisma.projectMilestone.upsert({
      where: {
        projectId_milestoneKey: {
          projectId: project.id,
          milestoneKey
        }
      },
      update: {
        status: 'COMPLETED',
        completedAt: new Date()
      },
      create: {
        projectId: project.id,
        milestoneKey,
        status: 'COMPLETED',
        completedAt: new Date()
      }
    });

    // 3. Emit Tracking Event
    const idempotencyKey = `project_step_${step}_${userId}`;
    
    try {
      await prisma.trackingEvent.create({
        data: {
          eventName: 'project_progress',
          userId,
          idempotencyKey,
          propertiesJson: JSON.stringify({ step, milestoneKey })
        }
      });
    } catch (e: any) {
      if (e.code !== 'P2002') throw e;
      // If tracking event exists, it means we already awarded XP. Early return safely.
      return NextResponse.json({ success: true, status: 'ALREADY_COMPLETED', data: project }, { status: 200 });
    }

    // 4. Securely Award XP (e.g. 200 XP per stage, extra 500 for ship)
    const xpAmount = step === 5 ? 500 : 200;
    await awardXP({
      userId,
      amount: xpAmount,
      source: 'PROJECT_MILESTONE',
      referenceId: milestoneKey,
      idempotencyKey: `xp_project_${step}_${userId}`
    });

    // 5. Unlock Achievement for shipping
    if (step === 5) {
      await unlockAchievement({
        userId,
        achievementKey: 'PROJECT_SHIPPED'
      });
    }

    return NextResponse.json({ success: true, status: 'MILESTONE_COMPLETED', data: project }, { status: 200 });
  } catch (error) {
    console.error('POST Project Progress Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


