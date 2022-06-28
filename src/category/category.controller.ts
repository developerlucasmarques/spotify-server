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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/admin/entities/admin.entity';
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('category')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-music-category')
  @ApiOperation({
    summary: 'Create a new Music Category',
  })
  create(@LoggedAdmin() admin: Admin, @Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get('find-all-musics-categories')
  @ApiOperation({
    summary: 'List All Music Categories',
  })
  findAll(@LoggedUser() user: User) {
    return this.categoryService.findAll();
  }

  @Get('find-one-music-category/:categoryID')
  @ApiOperation({
    summary: 'List a Music Categorie by Id',
  })
  findOne(
    @LoggedUser() user: User, @Param('categoryID') categoryId: string,
  ) {
    return this.categoryService.findOne(categoryId);
  }

  @Patch('edit-music-category/:categoryID')
  @ApiOperation({
    summary: 'Edit a Music Categorie by Id',
  })
  update(
    @LoggedAdmin() admin: Admin,
    @Param('categoryID') categoryId: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(categoryId, dto);
  }

  @Delete('remove-music-category/:categoryID')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a Music Categorie by Id',
  })
  delete(
    @LoggedAdmin() admin: Admin, @Param('categoryID') categoryId: string,
  ) {
    return this.categoryService.delete(categoryId);
  }
}
