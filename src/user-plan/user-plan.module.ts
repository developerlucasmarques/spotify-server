import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserPlanController } from './user-plan.controller';
import { UserPlanService } from './user-plan.service';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserPlanController],
  providers: [UserPlanService],
})
export class UserPlanModule {}
