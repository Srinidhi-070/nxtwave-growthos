const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function test() {
  const users = await prisma.user.findMany({ include: { connector: true } });
  const referrals = await prisma.referral.findMany();
  console.log('Users:', users.length);
  console.log('Referrals:', referrals.length);
  console.log(users[0]);
}
test().catch(console.error).finally(() => prisma.\$disconnect());
