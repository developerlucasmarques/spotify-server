import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateCountryDto } from './dto/create-country.dto';
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
        },
      })
      .catch(handleError);
  }

  
}
