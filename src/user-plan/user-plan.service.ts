import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateUserPlanDto } from './dto/create-user-plan.dto';
import { UpdateUserPlanDto } from './dto/update-user-plan.dto';
import { UserPlan } from './entities/user-plan.entity';

@Injectable()
export class UserPlanService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserPlanDto) {
    try {
      const data: CreateUserPlanDto = {
        ...dto,
      };

      return await this.prisma.userPlan.create({ data });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.userPlan.findMany();
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.userPlan.findUnique({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string, dto: UpdateUserPlanDto) {
    try {
      const data: Partial<UserPlan> = { ...dto };

      return await this.prisma.userPlan.update({
        where: { id },
        data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.userPlan.delete({ where: { id } });
    } catch (error) {
      handleError(error);
    }
  }
}
