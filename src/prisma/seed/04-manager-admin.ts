import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
export const admins: Prisma.AdminCreateInput[] = [
  {
    name: 'Manager',
    cpf: '153.743.513-15',
    email: 'manager@manager.com',
    password: 'User#5678@!',
    userCategory: {
      connect: {
        name: 'manager',
      },
    },
  },
  {
    name: 'Admin',
    cpf: '713.443.513-15',
    email: 'admin@admin.com',
    password: 'User#5678@!',
    userCategory: {
      connect: {
        name: 'admin',
      },
    },
  },
];

export const admin = async (prisma: PrismaClient) => {
  for (const obj of Object.values(admins)) {
    obj.password = await bcrypt.hash(obj.password, 10);
    await prisma.admin.upsert({
      where: { cpf: obj.cpf },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
