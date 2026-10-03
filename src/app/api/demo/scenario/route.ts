import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { scenario } = await req.json();

    if (scenario === 'reset' || scenario === 'baseline') {
      // Seed Experiments
      const expDefs = [
        {
          name: 'hook_copy',
          hypothesis: 'Outcome-driven hook beats generic workshop hook',
          primaryMetric: 'registration_conversion',
          allocationJson: JSON.stringify(['control_generic', 'variant_outcome']),
        },
        {
          name: 'referral_reward',
          hypothesis: 'Starter pack incentive improves referral rate over no reward',
          primaryMetric: 'qualified_referral_rate',
          allocationJson: JSON.stringify(['control_none', 'variant_starter_pack']),
        },
        {
          name: 'connector_onboarding',
          hypothesis: 'Message kit increases activations per connector',
          primaryMetric: 'connector_activation_rate',
          allocationJson: JSON.stringify(['control_link_only', 'variant_message_kit']),
        },
        {
          name: 'deadline_framing',
          hypothesis: 'Urgency countdown improves daily registration velocity',
          primaryMetric: 'registrations_per_day',
          allocationJson: JSON.stringify(['control_neutral', 'variant_deadline']),
        }
      ];

      for (const exp of expDefs) {
        const existing = await prisma.experiment.findFirst({ where: { name: exp.name } });
        if (!existing) {
          await prisma.experiment.create({
            data: {
              name: exp.name,
              hypothesis: exp.hypothesis,
              primaryMetric: exp.primaryMetric,
              allocationJson: exp.allocationJson,
              status: 'RUNNING',
              startAt: new Date()
            }
          });
        }
      }

      return NextResponse.json({ success: true, message: 'Experiments seeded successfully.' });
    }

    return NextResponse.json({ error: 'Unknown scenario' }, { status: 400 });
  } catch (error) {
    console.error('Scenario Engine Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
