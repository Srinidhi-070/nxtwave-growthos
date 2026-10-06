import { prisma } from './prisma';

export const LEVEL_CONFIG = [
  { level: 1, xpRequired: 0, title: 'NOVICE EXPLORER' },
  { level: 2, xpRequired: 300, title: 'RISING STAR' },
  { level: 3, xpRequired: 800, title: 'CREW BUILDER' },
  { level: 4, xpRequired: 1500, title: 'NETWORK NODE' },
  { level: 5, xpRequired: 2500, title: 'GROWTH HACKER' },
  { level: 6, xpRequired: 4000, title: 'SYSTEM ARCHITECT' },
  { level: 7, xpRequired: 6000, title: 'WORKSHOP MASTER' },
  { level: 8, xpRequired: 8500, title: 'AI PIONEER' },
  { level: 9, xpRequired: 12000, title: 'PROJECT LEGEND' },
  { level: 10, xpRequired: 20000, title: 'GROWTHOS PRIME' }
];

export function calculateLevel(totalXP: number) {
  let current = LEVEL_CONFIG[0];
  let next = LEVEL_CONFIG[1];
  
  for (let i = 0; i < LEVEL_CONFIG.length; i++) {
    if (totalXP >= LEVEL_CONFIG[i].xpRequired) {
      current = LEVEL_CONFIG[i];
      next = LEVEL_CONFIG[i + 1] || current; // Max level reached
    } else {
      break;
    }
  }

  return {
    level: current.level,
    title: current.title,
    currentXP: totalXP,
    nextLevelXP: next.xpRequired,
    progress: next.level > current.level 
      ? Math.floor(((totalXP - current.xpRequired) / (next.xpRequired - current.xpRequired)) * 100)
      : 100
  };
}

export async function awardXP({
  userId,
  amount,
  source,
  referenceId,
  idempotencyKey,
  metadata
}: {
  userId: string;
  amount: number;
  source: string;
  referenceId?: string;
  idempotencyKey: string;
  metadata?: unknown;
}) {
  // Use a transaction to ensure idempotency and calculate new total XP safely
  return await prisma.$transaction(async (tx) => {
    // 1. Check Idempotency
    const existing = await tx.xPTransaction.findUnique({
      where: { idempotencyKey }
    });
    
    if (existing) return { status: 'ALREADY_AWARDED', transaction: existing };

    // 2. Record Transaction
    const transaction = await tx.xPTransaction.create({
      data: {
        userId,
        amount,
        source,
        referenceId,
        idempotencyKey,
        metadataJson: metadata ? JSON.stringify(metadata) : null
      }
    });

    // 3. We don't store total XP explicitly in the User model to prevent race conditions. 
    // It's calculated dynamically, but we could optionally cache it if reads are too slow.
    
    return { status: 'AWARDED', transaction };
  });
}

export async function unlockAchievement({
  userId,
  achievementKey,
  metadata
}: {
  userId: string;
  achievementKey: string;
  metadata?: unknown;
}) {
  try {
    const unlock = await prisma.achievementUnlock.create({
      data: {
        userId,
        achievementKey,
        metadataJson: metadata ? JSON.stringify(metadata) : null
      }
    });
    return { status: 'UNLOCKED', unlock };
  } catch (error: unknown) {
    // Prisma unique constraint violation (P2002) means already unlocked
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2002') {
      return { status: 'ALREADY_UNLOCKED' };
    }
    throw error;
  }
}


