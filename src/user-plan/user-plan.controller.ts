import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserPlanService } from './user-plan.service';
import { CreateUserPlanDto } from './dto/create-user-plan.dto';
import { UpdateUserPlanDto } from './dto/update-user-plan.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
import { Admin } from 'src/admin/entities/admin.entity';

@ApiTags('user-plan')
@Controller('user-plan')
export class UserPlanController {
  constructor(private readonly userPlanService: UserPlanService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new User Plan - (ONLY ADMIN)',
  })
  create(@LoggedAdmin() admin: Admin, @Body() dto: CreateUserPlanDto) {
    return this.userPlanService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all Users Plans - (OPEN)',
  })
  findAll() {
    return this.userPlanService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'View User Plan by Id - (OPEN)',
  })
  findOne(@Param('id') id: string) {
    return this.userPlanService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Edit a User Plan by Id - (ONLY ADMIN)',
  })
  update(
    @LoggedAdmin() admin: Admin,
    @Param('id') id: string,
    @Body() dto: UpdateUserPlanDto,
  ) {
    return this.userPlanService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a User Plan by Id - (ONLY ADMIN)',
  })
  delete(@LoggedAdmin() admin: Admin, @Param('id') id: string) {
    return this.userPlanService.delete(id);
  }
}
