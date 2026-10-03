import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

function hashIdentity(value: string) {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

function generateReferralCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase(); // e.g. "A1B2C3"
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, collegeId, graduationYear, referralCode, campaignId, source, medium } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailHash = hashIdentity(email);
    const phoneHash = phone ? hashIdentity(phone) : null;
    const idempotencyKey = `reg_${emailHash}`; // simple idempotency key for this demo

    // 1. Idempotent check: Does user exist?
    let user = await prisma.user.findUnique({
      where: { emailHash },
    });

    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      // 2. Create User
      user = await prisma.user.create({
        data: {
          emailHash,
          phoneHash,
          collegeId,
          graduationYear: graduationYear ? parseInt(graduationYear, 10) : null,
          consentFlags: JSON.stringify({ whatsappOptIn: false }), // default
        },
      });

      // 3. Create Connector profile automatically for referral loop
      await prisma.connector.create({
        data: {
          userId: user.id,
          collegeId,
          referralCode: generateReferralCode(),
          status: 'ACTIVE',
        },
      });

      // 4. Apply Attribution if referral code provided
      if (referralCode) {
        const referrerConnector = await prisma.connector.findUnique({
          where: { referralCode },
        });

        if (referrerConnector && referrerConnector.userId !== user.id) {
          // Bind Referral
          await prisma.referral.create({
            data: {
              referrerId: referrerConnector.userId,
              refereeId: user.id,
              referralCode,
              attributedAt: new Date(),
              qualificationState: 'QUALIFIED', // Qualified upon registration for this challenge
              attributionRule: 'explicit_code',
            },
          });
        }
      }

      // 5. Emit registration_completed tracking event
      await prisma.trackingEvent.create({
        data: {
          eventName: 'registration_completed',
          userId: user.id,
          referralCode: referralCode || null,
          campaignId: campaignId || null,
          propertiesJson: JSON.stringify({ source, medium }),
          idempotencyKey,
        },
      });
    }

    // Fetch the connector data to return the user's new referral code
    const userConnector = await prisma.connector.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({
      success: true,
      isNewUser,
      user: {
        id: user.id,
        referralCode: userConnector?.referralCode,
      },
    }, { status: 201 });
    
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
