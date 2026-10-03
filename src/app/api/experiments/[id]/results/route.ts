import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const experimentKey = params.id;

    const experiment = await prisma.experiment.findFirst({
      where: { name: experimentKey },
      include: { assignments: true }
    });

    if (!experiment) {
      return NextResponse.json({ error: 'Experiment not found' }, { status: 404 });
    }

    const variants = JSON.parse(experiment.allocationJson);
    const results: Record<string, { exposures: number; conversions: number }> = {};
    
    variants.forEach((v: string) => {
      results[v] = { exposures: 0, conversions: 0 };
    });

    // Count exposures
    experiment.assignments.forEach(a => {
      if (results[a.variant]) {
        results[a.variant].exposures += 1;
      }
    });

    // For a real engine, we'd join assignments with the conversion event.
    // For this prototype, we'll fetch all conversion events and cross-reference in memory (since sqlite makes complex joins annoying sometimes)
    const conversionEvents = await prisma.trackingEvent.findMany({
      where: { eventName: 'registration_completed', userId: { not: null } },
      select: { userId: true }
    });

    const convertedUserIds = new Set(conversionEvents.map(e => e.userId));

    experiment.assignments.forEach(a => {
      if (convertedUserIds.has(a.userId) && results[a.variant]) {
        results[a.variant].conversions += 1;
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        experiment: {
          id: experiment.id,
          name: experiment.name,
          hypothesis: experiment.hypothesis,
          status: experiment.status,
          primaryMetric: experiment.primaryMetric,
        },
        results
      }
    });
  } catch (error) {
    console.error('Experiment Results Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
