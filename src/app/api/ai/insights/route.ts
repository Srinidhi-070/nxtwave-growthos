import { NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai';

export async function GET() {
  try {
    const aiProvider = getAIProvider();

    // Stubbed payloads representing current system state
    const metricsPayload = { total_registrations: 428, target: 500 };
    const cohortsPayload = { connector_share: '57%', paid_share: '3%' };
    const experimentsPayload = { active: ['hook_copy', 'referral_reward'] };
    const anomaliesPayload = { flagged_users: 7, duplicate_ips: 3 };

    const insight = await aiProvider.getGrowthInsight(
      metricsPayload,
      cohortsPayload,
      experimentsPayload,
      anomaliesPayload
    );

    return NextResponse.json({
      success: true,
      data: insight
    });
  } catch (error) {
    console.error('AI Insight Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

