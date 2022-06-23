import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPlanService } from './user-plan.service';
import { CreateUserPlanDto } from './dto/create-user-plan.dto';
import { UpdateUserPlanDto } from './dto/update-user-plan.dto';

@Controller('user-plan')
export class UserPlanController {
  constructor(private readonly userPlanService: UserPlanService) {}

  @Post()
  create(@Body() createUserPlanDto: CreateUserPlanDto) {
    return this.userPlanService.create(createUserPlanDto);
  }

  @Get()
  findAll() {
    return this.userPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPlanDto: UpdateUserPlanDto) {
    return this.userPlanService.update(+id, updateUserPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPlanService.remove(+id);
  }
}
