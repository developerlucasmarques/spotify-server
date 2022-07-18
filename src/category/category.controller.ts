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
import { Admin } from 'src/admin/entities/admin.entity';
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('category')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new Music Category - (ONLY ADMIN)',
  })
  create(@LoggedAdmin() admin: Admin, @Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get('all')
  @ApiOperation({
    summary: 'List All Music Categories - (OPEN)',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':categoryID')
  @ApiOperation({
    summary: 'List a Music Categorie by Id - (ONLY USER)',
  })
  findOne(@Param('categoryID') categoryId: string) {
    return this.categoryService.findOne(categoryId);
  }

  @Patch('update/:categoryID')
  @ApiOperation({
    summary: 'Edit a Music Categorie by Id - (ONLY ADMIN)',
  })
  update(
    @LoggedAdmin() admin: Admin,
    @Param('categoryID') categoryId: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(categoryId, dto);
  }

  @Delete('delete/:categoryID')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a Music Categorie by Id - (ONLY ADMIN)',
  })
  delete(@LoggedAdmin() admin: Admin, @Param('categoryID') categoryId: string) {
    return this.categoryService.delete(categoryId);
  }
}
