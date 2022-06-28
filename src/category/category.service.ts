import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const data: Prisma.CategoryCreateInput = {
      ...dto,
    };

    return await this.prisma.category
      .create({
        data,
      })
      .catch(handleError);
  }

  async findAll() {
    const allCategories = await this.prisma.category
      .findMany({
        select: {
          id: true,
          name: true,
        },
      })
      .catch(handleError);

    if (allCategories.length === 0) {
      throw new NotFoundException('No Music Category found');
    }

    return allCategories;
  }

  async findById(categoryId: string) {
    const record = await this.prisma.category
      .findUnique({
        where: { id: categoryId },
        select: {
          id: true,
          name: true,
        },
      })
      .catch(handleError);

    if (!record) {
      throw new NotFoundException(
        `Music Category with ID '${categoryId}' not found`,
      );
    }

    return record;
  }

  async findOne(categoryId: string) {
    return await this.findById(categoryId).catch(handleError);
  }

  async update(categoryId: string, dto: UpdateCategoryDto) {
    await this.findById(categoryId);

    const data: Prisma.CategoryUpdateInput = {
      ...dto,
    };

    return this.prisma.category.update({
      where: { id: categoryId },
      data,
      select: {
        id: true,
        name: true,
      },
    });
  }

  async delete(categoryId: string) {
    await this.findById(categoryId);

    return this.prisma.category
      .delete({
        where: { id: categoryId },
      })
      .catch(handleError);
  }
}
