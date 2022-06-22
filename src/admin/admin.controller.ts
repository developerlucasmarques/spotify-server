import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';

@Controller('admin')
@ApiTags('Manager-Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo Admin. (apenas manager pode criar um no admin)',
  })
  create(@Body() dto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todos os Admins. (apenas manager pode criar um no admin)',
  })
  findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }
}
