import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAdminDto): Promise<Admin> {
    const data: Admin = { ...dto };
    return await this.prisma.admin.create({ data });
  }

  async findAll(): Promise<Admin[]> {
    return await this.prisma.admin.findMany();
  }

  async findOne(id: string): Promise<Admin> {
    return await this.prisma.admin.findUnique({ where: { id } });
  }

  async delete(id: string) {
    await this.prisma.admin.delete({ where: { id } });
  }
}
