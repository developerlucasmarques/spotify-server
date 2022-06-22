import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiTags('Manager-Admin')
  @ApiOperation({
    summary: 'Criar um novo Admin. (apenas manager pode criar um no admin)',
  })
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }
}
