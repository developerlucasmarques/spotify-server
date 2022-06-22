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
} from '@nestjs/common';
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
    summary: 'Criar um novo Admin - (apenas "Manager" pode executar essa rota)',
  })
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Buscar todos os Admins - (apenas "Manager" pode executar essa rota)',
  })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Buscar um Admin pelo ID - (apenas "Manager" pode executar essa rota)',
  })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  // @Patch(':id')
  // @ApiOperation({
  //   summary:
  //     'Editar a senha do Admin pelo ID',
  // })
  // update(@Param('id') id: string) {
  //   return this.adminService.update();
  // }

  @Delete(':id')
  @ApiOperation({
    summary:
      'Deletar um Admin pelo ID - (apenas "Manager" pode executar essa rota)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.adminService.delete(id);
  }
}
