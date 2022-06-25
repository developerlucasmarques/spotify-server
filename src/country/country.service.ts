import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country,entity';

@Injectable()
export class CountryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCountryDto) {
    const data: Country = { ...dto };

    return await this.prisma.country
      .create({
        data,
        select: {
          id: true,
          name: true,
          code: true,
        },
      })
      .catch(handleError);
  }

  async findAll() {
    return await this.prisma.country
      .findMany({
        select: {
          id: true,
          name: true,
        },
      })
      .catch(handleError);
  }

  async findOne(id: string) {
    return await this.prisma.country
      .findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          code: true,
        },
      })
      .catch(handleError);
  }

  async update(id: string, dto: UpdateCountryDto) {
    const data: Partial<Country> = { ...dto };

    return this.prisma.country
      .update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          code: true,
        },
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.prisma.country.delete({ where: { id } }).catch(handleError);
  }
}
