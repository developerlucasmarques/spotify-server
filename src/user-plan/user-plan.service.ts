import { Injectable, NotFoundException } from '@nestjs/common';
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
    const userPlan = await this.prisma.userPlan
      .findMany({
        select: {
          id: true,
          name: true,
          price: true,
          accounts: true,
        },
      })
      .catch(handleError);

    if (userPlan.length === 0) {
      throw new NotFoundException('No user plan not found');
    }

    return userPlan;
  }

  async findOne(id: string) {
    await this.verifyUserPlanIdExist(id);
    return await this.prisma.userPlan
      .findUnique({
        where: { id },
      })
      .catch(handleError);
  }

  async update(id: string, dto: UpdateUserPlanDto) {
    await this.verifyUserPlanIdExist(id);

    const data: Partial<UserPlan> = { ...dto };

    return await this.prisma.userPlan
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.verifyUserPlanIdExist(id);
    await this.prisma.userPlan.delete({ where: { id } }).catch(handleError);
  }

  async verifyUserPlanIdExist(userPlanId: string) {
    const userPlan = await this.prisma.userPlan.findUnique({
      where: { id: userPlanId },
    });

    if (!userPlan) {
      throw new NotFoundException('User plan not found');
    }
  }
}
