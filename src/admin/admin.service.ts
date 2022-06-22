import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  adminSelect = {
    id: true,
    name: true,
    cpf: true,
  };

  async create(dto: CreateAdminDto) {
    this.verifyConfirmPassword(dto.password, dto.confirmPassword);
    delete dto.confirmPassword;
    const data: Admin = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };

    return await this.prisma.admin.create({ data, select: this.adminSelect });
  }

  async findAll() {
    return await this.prisma.admin.findMany({ select: this.adminSelect });
  }

  async findOne(id: string) {
    return await this.prisma.admin.findUnique({
      where: { id },
      select: this.adminSelect,
    });
  }

  async delete(id: string) {
    await this.prisma.admin.delete({ where: { id } });
  }

  verifyConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais');
    }
  }
}
