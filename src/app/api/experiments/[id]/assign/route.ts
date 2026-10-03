import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

function getStableVariant(userId: string, experimentId: string, variants: string[]): string {
  const hash = crypto.createHash('md5').update(`${userId}-${experimentId}`).digest('hex');
  const index = parseInt(hash.substring(0, 8), 16) % variants.length;
  return variants[index];
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await req.json();
    const experimentKey = params.id;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    let experiment = await prisma.experiment.findFirst({
      where: { name: experimentKey }
    });

    // Auto-seed for prototype simplicity if it doesn't exist
    if (!experiment) {
      experiment = await prisma.experiment.create({
        data: {
          name: experimentKey,
          hypothesis: `Auto-generated hypothesis for ${experimentKey}`,
          primaryMetric: 'conversion',
          allocationJson: JSON.stringify(['control', 'variant_a']),
          status: 'RUNNING',
          startAt: new Date()
        }
      });
    }

    const variants = JSON.parse(experiment.allocationJson);
    const assignedVariant = getStableVariant(userId, experiment.id, variants);

    // Upsert assignment
    await prisma.experimentAssignment.upsert({
      where: {
        experimentId_userId: {
          experimentId: experiment.id,
          userId: userId,
        }
      },
      update: {},
      create: {
        experimentId: experiment.id,
        userId: userId,
        variant: assignedVariant,
      }
    });

    // Log exposure event
    await prisma.trackingEvent.create({
      data: {
        eventName: 'experiment_exposure',
        userId: userId,
        propertiesJson: JSON.stringify({ experimentKey, variant: assignedVariant }),
        idempotencyKey: `exp_${experiment.id}_${userId}_${Date.now()}`,
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        experimentId: experiment.id,
        experimentKey,
        variant: assignedVariant,
      }
    });
  } catch (error) {
    console.error('Experiment Assignment Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
