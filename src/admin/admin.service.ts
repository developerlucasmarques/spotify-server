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
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-managerAdmin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  adminSelect = {
    id: true,
    name: true,
    email: true,
    cpf: true,
    userCategory: {
      select: {
        name: true,
      },
    },
  };

  async create(dto: CreateAdminDto) {
    verifyConfirmPassword(dto.password, dto.confirmPassword);
    const user = await this.prisma.user
      .findUnique({
        where: { email: dto.email },
      })
      .catch(handleError);

    if (user) {
      throw new BadRequestException(
        'Unable to create an admin with a user email',
      );
    }
    delete dto.confirmPassword;

    const data: Prisma.AdminCreateInput = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
      userCategory: {
        connect: {
          name: 'admin',
        },
      },
    };

    return await this.prisma.admin
      .create({ data, select: this.adminSelect })
      .catch(handleError);
  }

  async findAll() {
    return await this.prisma.admin
      .findMany({ select: this.adminSelect })
      .catch(handleError);
  }

  async findOne(id: string) {
    return await this.findById(id);
  }

  async update(id: string, dto: UpdateAdminDto) {
    if (dto.password) {
      verifyConfirmPassword(dto.password, dto.confirmPassword);
    }
    delete dto.confirmPassword;

    const data: Partial<Admin> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    return await this.prisma.admin
      .update({
        where: { id },
        data,
        select: this.adminSelect,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    const manager = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (manager.userCategoryName === 'manager') {
      throw new BadRequestException('Manager cannot be deleted');
    }
    
    await this.prisma.admin.delete({ where: { id } }).catch(handleError);
  }

  async findById(id: string) {
    const admin = await this.prisma.admin
      .findUnique({ where: { id }, select: this.adminSelect })
      .catch(handleError);

    if (!admin) {
      throw new NotFoundException(`Record with ID '${id}' not found`);
    }
    return admin;
  }
}
