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
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo Admin - (apenas "Manager" pode executar essa rota)',
  })
  create(@LoggedManager() admin: Admin, @Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Buscar todos os Admins - (apenas "Manager" pode executar essa rota)',
  })
  findAll(@LoggedManager() admin: Admin) {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Buscar um Admin pelo ID - (apenas "Manager" pode executar essa rota)',
  })
  findOne(@LoggedManager() admin: Admin, @Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch()
  @ApiOperation({
    summary: 'Editar nome e senha do Admin.',
  })
  update(@LoggedAdmin() admin: Admin, @Body() dto: UpdateAdminDto) {
    return this.adminService.update(admin.id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      'Deletar um Admin pelo ID - (apenas "Manager" pode executar essa rota)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@LoggedManager() admin: Admin, @Param('id') id: string) {
    return this.adminService.delete(id);
  }
}
