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
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    try {
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

      return await this.prisma.user.create({
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
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      return this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findById(userId: string) {
    try {
      const record = await this.prisma.user.findUnique({
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
      });

      if (!record) {
        throw new NotFoundException(`Record with Id '${userId}' not found!`);
      }

      return record;
    } catch (error) {
      handleError(error);
    }
  }

  findMyAccount(userId: string) {
    try {
      return this.findById(userId);
    } catch (error) {
      handleError(error);
    }
  }

  findOneUser(id: string) {
    try {
      return this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      handleError(error);
    }
  }

  async updateMyAccount(userId: string, dto: UpdateUserDto) {
    try {
      if (dto.password) {
        verifyConfirmPassword(dto.password, dto.confirmPassword);
      }
      delete dto.confirmPassword;

      await this.findById(userId);

      const data: Partial<User> = { ...dto };

      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      return this.prisma.user.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          cpf: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async deleteMyAccount(userId: string) {
    try {
      await this.findById(userId);
      await this.prisma.user.delete({ where: { id: userId } });
    } catch (error) {
      handleError(error);
    }
  }

  async deleteUser(id: string) {
    try {
      await this.findById(id);
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      handleError(error);
    }
  }
}
