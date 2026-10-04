import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const visits = await prisma.trackingEvent.count({ where: { eventName: 'landing_view' } });
    const starts = await prisma.trackingEvent.count({ where: { eventName: 'registration_started' } });
    const verified = await prisma.user.count();
    
    // Activated users: those who completed the calendar/starter pack action
    const activated = await prisma.trackingEvent.count({ where: { eventName: 'calendar_added' } });

    // Funnel conversion calculation
    const funnel = {
      visits: visits || 1240, // Providing demo mock data fallback if empty
      starts: starts || 610,
      verified: verified || 428,
      activated: activated || 347,
    };

    // By channel (stubbed derived from UTMs)
    const channelStats = {
      Connector: 244,
      Community: 96,
      Referral: 52,
      Organic: 24,
      Paid: 12
    };

    return NextResponse.json({
      success: true,
      data: {
        funnel,
        channelStats,
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Funnel API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

