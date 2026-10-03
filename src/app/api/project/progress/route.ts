import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, step } = body;

    if (!userId || step === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const modules = ['idea', 'data', 'model', 'app', 'shipped'];
    const updateData: Record<string, string | boolean> = {};
    
    // Set current step to true
    if (step >= 1 && step <= 5) {
      updateData[modules[step - 1]] = true;
    }
    
    // Update overall status
    if (step === 0) updateData.status = 'NOT_STARTED';
    else if (step < 5) updateData.status = 'IN_PROGRESS';
    else updateData.status = 'SHIPPED';

    const project = await prisma.project.upsert({
      where: { userId },
      update: updateData,
      create: {
        userId,
        ...updateData
      }
    });

    // XP for making progress
    if (step > 0) {
      const eventKey = `project_step_${step}_${userId}`;
      const eventExists = await prisma.trackingEvent.findUnique({
        where: { idempotencyKey: eventKey }
      });
      
      if (!eventExists) {
        await prisma.trackingEvent.create({
          data: {
            eventName: 'project_progress',
            userId,
            idempotencyKey: eventKey,
            propertiesJson: JSON.stringify({ step })
          }
        });
      }
    }

    return NextResponse.json({ success: true, data: project }, { status: 200 });
  } catch (error) {
    console.error('POST Project Progress Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
