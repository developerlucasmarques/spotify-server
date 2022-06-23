import { Injectable } from '@nestjs/common';
import { CreateUserPlanDto } from './dto/create-user-plan.dto';
import { UpdateUserPlanDto } from './dto/update-user-plan.dto';

@Injectable()
export class UserPlanService {
  create(createUserPlanDto: CreateUserPlanDto) {
    return 'This action adds a new userPlan';
  }

  findAll() {
    return `This action returns all userPlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPlan`;
  }

  update(id: number, updateUserPlanDto: UpdateUserPlanDto) {
    return `This action updates a #${id} userPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPlan`;
  }
}
