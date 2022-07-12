import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { verifyConfirmPassword } from 'src/utils/confirm-password.ultil';
import { handleError } from 'src/utils/handle-error.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    verifyConfirmPassword(dto.password, dto.confirmPassword);
    delete dto.confirmPassword;
    const data: Prisma.UserCreateInput = {
      name: dto.name,
      cpf: dto.cpf,
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
      userPlan: {
        connect: {
          id: dto.userPlanId,
        },
      },
      userCategory: {
        connect: {
          name: 'user',
        },
      },
    };

    return await this.prisma.user
      .create({
        data,
        select: {
          id: true,
          name: true,
          email: true,
          userPlan: {
            select: {
              name: true,
              accounts: true,
            },
          },
          createdAt: true,
        },
      })
      .catch(handleError);
  }

  async findAll() {
    const allUsers = await this.prisma.user
      .findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      })
      .catch(handleError);

    if (allUsers.length === 0) {
      throw new NotFoundException('No a users found');
    }

    return allUsers;
  }

  async findById(userId: string) {
    const record = await this.prisma.user
      .findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          userPlan: {
            select: {
              name: true,
              accounts: true,
            },
          },
          profiles: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      })
      .catch(handleError);

    if (!record) {
      throw new NotFoundException(`Record with Id '${userId}' not found!`);
    }

    return record;
  }

  async findMyAccount(userId: string) {
    return await this.findById(userId);
  }

  async findOneUser(id: string) {
    return await this.findById(id);
  }

  async updateMyAccount(userId: string, dto: UpdateUserDto) {
    if (dto.password) {
      verifyConfirmPassword(dto.password, dto.confirmPassword);
    }
    delete dto.confirmPassword;

    await this.findById(userId);

    const data: Partial<User> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await this.prisma.user
      .update({
        where: { id: userId },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          cpf: true,
          updatedAt: true,
        },
      })
      .catch(handleError);
  }

  async updateMyPlan(userId: string, dto: UpdatePlanDto) {
    await this.findById(userId);

    const data: Partial<User> = { ...dto };

    return await this.prisma.user
      .update({
        where: { id: userId },
        data,
        select: {
          id: true,
          name: true,
          userPlan: {
            select: {
              id: true,
              name: true,
            }
          }
        },
      })
      .catch(handleError);
  }

  async deleteMyAccount(userId: string) {
    await this.findById(userId);
    await this.prisma.user.delete({ where: { id: userId } }).catch(handleError);
  }

  async deleteUser(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } }).catch(handleError);
  }
}
