import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const visits = await prisma.trackingEvent.count({ where: { eventName: 'landing_view' } });
    const workshopViews = await prisma.trackingEvent.count({ where: { eventName: 'workshop_view' } });
    const registerStart = await prisma.trackingEvent.count({ where: { eventName: 'registration_started' } });
    const registerComplete = await prisma.trackingEvent.count({ where: { eventName: 'registration_completed' } });
    
    // Character completion implies "ACTIVE" state
    const characters = await prisma.character.count();
    
    // First Quest
    const firstQuest = await prisma.trackingEvent.groupBy({
      by: ['userId'],
      where: { eventName: 'quest_completed' }
    });

    // First Referral (Users who successfully referred someone who qualified)
    const activeReferrers = await prisma.referral.groupBy({
      by: ['referrerId'],
      where: { qualificationState: 'QUALIFIED' }
    });

    // Projects Started & Shipped
    const projectStarted = await prisma.project.count({
      where: { status: { in: ['IN_PROGRESS', 'READY', 'SHIPPED'] } }
    });
    const projectShipped = await prisma.project.count({
      where: { status: 'SHIPPED' }
    });

    const funnel = [
      { key: 'LANDING', count: visits },
      { key: 'WORKSHOP VIEW', count: workshopViews },
      { key: 'REGISTER START', count: registerStart },
      { key: 'ACCOUNT CREATED', count: registerComplete },
      { key: 'CHARACTER CREATED', count: characters },
      { key: 'FIRST QUEST', count: firstQuest.length },
      { key: 'FIRST REFERRAL', count: activeReferrers.length },
      { key: 'PROJECT STARTED', count: projectStarted },
      { key: 'PROJECT SHIPPED', count: projectShipped },
    ];

    return NextResponse.json({
      success: true,
      data: {
        funnel
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Funnel API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
