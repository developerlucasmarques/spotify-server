import { Prisma, PrismaClient } from '@prisma/client';

export const userCategorys: Prisma.UserCategoryCreateInput[] = [
  {
    name: 'manager',
  },
  {
    name: 'admin',
  },
  {
    name: 'user',
  },
  {
    name: 'artist',
  },
];

export const userCategory = async (prisma: PrismaClient) => {
  for (const obj of Object.values(userCategorys)) {
    await prisma.userCategory.upsert({
      where: { name: obj.name },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
