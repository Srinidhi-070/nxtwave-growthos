import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    // We will build a simulated cohort report for the prototype
    
    // 1. Cohort by Acquisition Source (approximated from users with propertiesJson)
    // For SQLite compatibility and simplicity in Prisma, we'll pull users and group in memory
    const allEvents = await prisma.trackingEvent.findMany({
      where: { eventName: 'registration_completed' },
      select: { propertiesJson: true, occurredAt: true }
    });

    const sourceCohorts: Record<string, number> = {};
    const dateCohorts: Record<string, number> = {};

    allEvents.forEach(evt => {
      // Aggregate by Source
      const props = evt.propertiesJson ? JSON.parse(evt.propertiesJson) : {};
      const source = props.source || 'direct';
      sourceCohorts[source] = (sourceCohorts[source] || 0) + 1;

      // Aggregate by Day
      const date = new Date(evt.occurredAt).toISOString().split('T')[0];
      dateCohorts[date] = (dateCohorts[date] || 0) + 1;
    });

    // 2. Global Conversion Rates
    const totalVisits = await prisma.trackingEvent.count({ where: { eventName: 'landing_view' } });
    const totalRegistrations = allEvents.length;
    const totalShares = await prisma.trackingEvent.count({ where: { eventName: 'share_clicked' } });
    const totalQualifiedReferrals = await prisma.referral.count({ where: { qualificationState: 'QUALIFIED' } });

    const totalConnectors = await prisma.connector.count();
    const activeConnectors = await prisma.connector.count({ where: { status: 'ACTIVE' } });

    const metrics = {
      registrationConversionRate: totalVisits ? (totalRegistrations / totalVisits * 100).toFixed(1) + '%' : '0%',
      qualifiedReferralRate: totalRegistrations ? (totalQualifiedReferrals / totalRegistrations * 100).toFixed(1) + '%' : '0%',
      connectorActivationRate: totalConnectors ? (activeConnectors / totalConnectors * 100).toFixed(1) + '%' : '0%',
      registrationsPerActiveConnector: activeConnectors ? (totalRegistrations / activeConnectors).toFixed(1) : '0',
      shareToReferralConversion: totalShares ? (totalQualifiedReferrals / totalShares * 100).toFixed(1) + '%' : '0%',
      riskRate: '1.2%' // Stubbed for Phase 4
    };

    return NextResponse.json({
      success: true,
      data: {
        sourceCohorts: Object.entries(sourceCohorts).map(([name, value]) => ({ name, value })),
        dateCohorts: Object.entries(dateCohorts).map(([date, value]) => ({ date, value })),
        metrics
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Cohorts API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
