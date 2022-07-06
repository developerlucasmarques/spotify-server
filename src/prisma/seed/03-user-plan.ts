import { Prisma, PrismaClient } from '@prisma/client';

export const userPlans: Prisma.UserPlanCreateInput[] = [
  {
    name: 'Individual',
    price: 19.90,
    accounts: 1,
    description:
      'The most basic subscription plan gives access to the Premium service for a Spotify account. There are no ads, users can download music for offline playback, and playback is unlimited. For new subscribers, the platform offers the first month for free.',
  },
  {
    name: 'University',
    price: 8.50,
    accounts: 1,
    description:
      'Spotify makes a version of the individual plan available for students at higher education institutions. During registration, it is necessary to inform data about university education, and the discount is released upon approval. The university plan can be used for twelve consecutive months at a monthly fee of R$8.50 and the benefits offered are the same as those of the individual subscription.',
  },
  {
    name: 'Duo',
    price: 21.90,
    accounts: 2,
    description:
      'This version of Spotify Premium is aimed at two people, offering the benefits of two Spotify accounts. It is a good option for couples or people who live in the same place. In addition to the already mentioned advantages of the Premium service, the plan offers Duo Mix: a playlist created according to the preferences of each user and automatically updated.',
  },
  {
    name: 'Family',
    price: 26.90,
    accounts: 6,
    description:
      'Spotify family plan offers up to six Premium accounts. The requirement is that the people benefited are from the same family and reside at the same address, upon proof. The plan brings the previous advantages of the Premium service, Family Mix – automatic playlist according to the family preferences –, explicit music control and the presence of Spotify Kids, a version aimed at children.',
  },
];

export const userPlan = async (prisma: PrismaClient) => {
  for (const obj of Object.values(userPlans)) {
    await prisma.userPlan.upsert({
      where: { name: obj.name },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
