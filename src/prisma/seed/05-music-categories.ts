import { Prisma, PrismaClient } from '@prisma/client';

export const musicCategories: Prisma.CategoryCreateInput[] = [
  {
    name: 'Axé',
  },
  {
    name: 'Blues',
  },
  {
    name: 'Clássica',
  },
  {
    name: 'Country',
  },
  {
    name: 'Eletrônica',
  },
  {
    name: 'Forró',
  },
  {
    name: 'Funk',
  },
  {
    name: 'Gospel',
  },
  {
    name: 'Hip Hop',
  },
  {
    name: 'Instrumental',
  },
  {
    name: 'Jazz',
  },
  {
    name: 'K-pop/K-rock',
  },
  {
    name: 'Lo-fi',
  },
  {
    name: 'MPB',
  },
  {
    name: 'Pagode',
  },
  {
    name: 'Psicodelia',
  },
  {
    name: 'Pop',
  },
  {
    name: 'Rap',
  },
  {
    name: 'Reggae',
  },
  {
    name: 'Rock',
  },
  {
    name: 'Samba',
  },
  {
    name: 'Sertanejo',
  },
  {
    name: 'Trap',
  },
];

export const musicCategorie = async (prisma: PrismaClient) => {
  for (const obj of Object.values(musicCategories)) {
    await prisma.category.upsert({
      where: { name: obj.name },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
