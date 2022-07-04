import { PartialType } from '@nestjs/swagger';
import { CreateUserPlanDto } from './create-user-plan.dto';

export class UpdateUserPlanDto extends PartialType(CreateUserPlanDto) {}
