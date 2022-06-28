import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
import { LoggedManager } from 'src/auth/logged-manager.decorator';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-managerAdmin.dto';
import { Admin } from './entities/admin.entity';

@Controller('admin')
@ApiTags('manager-admin')
// @UseGuards(AuthGuard())
// @ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new Admin - (MANAGER)',
  })
  create(/*@LoggedManager() admin: Admin, */ @Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Fetch all Admins - (MANAGER)',
  })
  findAll(@LoggedManager() admin: Admin) {
    return this.adminService.findAll();
  }

  @Get(':adminID')
  @ApiOperation({
    summary: 'Fetch an admin by ID - (MANAGER)',
  })
  findOne(@LoggedManager() admin: Admin, @Param('adminID') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch()
  @ApiOperation({
    summary: 'Edit an admin logged - (ADMIN)',
  })
  update(@LoggedAdmin() admin: Admin, @Body() dto: UpdateAdminDto) {
    return this.adminService.update(admin.id, dto);
  }

  @Delete(':adminID')
  @ApiOperation({
    summary:
      'Delete an admin by ID - (MANAGER)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@LoggedManager() admin: Admin, @Param('adminID') id: string) {
    return this.adminService.delete(id);
  }
}
