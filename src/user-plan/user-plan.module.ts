import { Module } from '@nestjs/common';
import { UserPlanService } from './user-plan.service';
import { UserPlanController } from './user-plan.controller';

@Module({
  controllers: [UserPlanController],
  providers: [UserPlanService]
})
export class UserPlanModule {}
