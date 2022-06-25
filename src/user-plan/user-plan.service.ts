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
    const data: CreateUserPlanDto = {
      ...dto,
    };

    return await this.prisma.userPlan.create({ data }).catch(handleError);
  }

  async findAll() {
    return await this.prisma.userPlan
      .findMany({
        select: {
          id: true,
          name: true,
          price: true,
          accounts: true,
        },
      })
      .catch(handleError);
  }

  async findOne(id: string) {
    return await this.prisma.userPlan
      .findUnique({
        where: { id },
      })
      .catch(handleError);
  }

  async update(id: string, dto: UpdateUserPlanDto) {
    const data: Partial<UserPlan> = { ...dto };

    return await this.prisma.userPlan
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.prisma.userPlan.delete({ where: { id } }).catch(handleError);
  }
}
