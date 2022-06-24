import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { UpdateAdminDto } from './dto/update-managerAdmin.dto';
import { Prisma } from '@prisma/client';
import { handleError } from 'src/utils/handle-error.util';
import { verifyConfirmPassword } from 'src/utils/confirm-password.ultil';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  adminSelect = {
    id: true,
    name: true,
    cpf: true,
  };

  async create(dto: CreateAdminDto) {
    try {
      verifyConfirmPassword(dto.password, dto.confirmPassword);
      delete dto.confirmPassword;
      const data: Prisma.AdminCreateInput = {
        ...dto,
        password: await bcrypt.hash(dto.password, 10),
        userCategory: {
          create: {
            admin: true,
            user: false,
          },
        },
      };

      return await this.prisma.admin.create({ data, select: this.adminSelect });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.admin.findMany({ select: this.adminSelect });
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.admin.findUnique({
        where: { id },
        select: this.adminSelect,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string, dto: UpdateAdminDto) {
    try {
      if (dto.password) {
        verifyConfirmPassword(dto.password, dto.confirmPassword);
      }
      delete dto.confirmPassword;

      const data: Partial<Admin> = { ...dto };

      if (data.password) {
        data.password = await bcrypt.hash(dto.password, 10);
      }

      return await this.prisma.admin.update({
        where: { id },
        data,
        select: this.adminSelect,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.admin.delete({ where: { id } });
    } catch (error) {
      handleError(error);
    }
  }
}
