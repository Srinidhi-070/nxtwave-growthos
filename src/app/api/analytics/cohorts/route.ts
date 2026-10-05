import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        trackingEvents: {
          select: { eventName: true, occurredAt: true }
        }
      }
    });

    let ttvChar = 0, ttvQuest = 0, ttvRef = 0, ttvProject = 0;
    let cntChar = 0, cntQuest = 0, cntRef = 0, cntProject = 0;

    let ret0 = 0, ret1 = 0, ret3 = 0, ret7 = 0;

    allUsers.forEach(user => {
      const events = user.trackingEvents;
      
      const regEvent = events.find(e => e.eventName === 'registration_completed');
      if (!regEvent) return; // Skip if they didn't officially register via tracking event
      
      const regTime = new Date(regEvent.occurredAt).getTime();

      // --- Time To Value ---
      const charEvent = events.find(e => e.eventName === 'character_created');
      if (charEvent) {
        ttvChar += (new Date(charEvent.occurredAt).getTime() - regTime);
        cntChar++;
      }

      const questEvent = events.find(e => e.eventName === 'quest_completed');
      if (questEvent) {
        ttvQuest += (new Date(questEvent.occurredAt).getTime() - regTime);
        cntQuest++;
      }

      const refEvent = events.find(e => e.eventName === 'referral_converted' || e.eventName === 'referral_qualified'); // Generic naming depending on implementation
      if (refEvent) {
        ttvRef += (new Date(refEvent.occurredAt).getTime() - regTime);
        cntRef++;
      }

      const projEvent = events.find(e => e.eventName === 'project_progress');
      if (projEvent) {
        ttvProject += (new Date(projEvent.occurredAt).getTime() - regTime);
        cntProject++;
      }

      // --- Retention ---
      // We check the MAXIMUM time gap between registration and ANY event.
      let maxGapMs = 0;
      events.forEach(e => {
        const gap = new Date(e.occurredAt).getTime() - regTime;
        if (gap > maxGapMs) maxGapMs = gap;
      });

      const maxDays = maxGapMs / (1000 * 3600 * 24);
      
      // If they had ANY event on Day 0 (but > 0 ms, which means they didn't just instantly drop), 
      // but realistically if they have a character event that counts. We will just check maxDays.
      if (maxDays >= 0) ret0++;
      if (maxDays >= 1) ret1++;
      if (maxDays >= 3) ret3++;
      if (maxDays >= 7) ret7++;
    });

    const formatMs = (ms: number, cnt: number) => cnt === 0 ? 'N/A' : `${Math.round((ms / cnt) / 60000)} mins`;

    const timeToValue = {
      characterCreation: formatMs(ttvChar, cntChar),
      firstQuest: formatMs(ttvQuest, cntQuest),
      firstReferral: formatMs(ttvRef, cntRef),
      projectStart: formatMs(ttvProject, cntProject)
    };

    const totalReg = allUsers.length;
    const retention = {
      cohortSize: totalReg,
      day0: totalReg ? `${Math.round((ret0 / totalReg) * 100)}%` : '0%',
      day1: totalReg ? `${Math.round((ret1 / totalReg) * 100)}%` : '0%',
      day3: totalReg ? `${Math.round((ret3 / totalReg) * 100)}%` : '0%',
      day7: totalReg ? `${Math.round((ret7 / totalReg) * 100)}%` : '0%',
    };

    return NextResponse.json({
      success: true,
      data: {
        timeToValue,
        retention
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Cohorts API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
