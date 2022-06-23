import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserPlanService } from './user-plan.service';
import { CreateUserPlanDto } from './dto/create-user-plan.dto';
import { UpdateUserPlanDto } from './dto/update-user-plan.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user-plan')
@Controller('user-plan')
export class UserPlanController {
  constructor(private readonly userPlanService: UserPlanService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new User Plan',
  })
  create(@Body() dto: CreateUserPlanDto) {
    return this.userPlanService.create(dto);
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
  update(
    @Param('id') id: string,
    @Body() updateUserPlanDto: UpdateUserPlanDto,
  ) {
    return this.userPlanService.update(+id, updateUserPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPlanService.remove(+id);
  }
}
