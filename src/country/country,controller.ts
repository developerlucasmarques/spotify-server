import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/admin/entities/admin.entity';
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';

@ApiTags('country')
@Controller()
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new country',
  })
  create(@LoggedAdmin() admin: Admin, @Body() dto: CreateCountryDto) {
    return this.countryService.create(dto);
  }
}
