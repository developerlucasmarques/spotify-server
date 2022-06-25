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
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@ApiTags('country')
@Controller('country')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new country',
  })
  create(@LoggedAdmin() admin: Admin, @Body() dto: CreateCountryDto) {
    return this.countryService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Search all countries',
  })
  findAll(@LoggedAdmin() admin: Admin) {
    return this.countryService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Search for a country by id',
  })
  findOne(@LoggedAdmin() admin: Admin, @Param('id') id: string) {
    return this.countryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit a country by id',
  })
  update(
    @LoggedAdmin() admin: Admin,
    @Param('id') id: string,
    @Body() dto: UpdateCountryDto,
  ) {
    return this.countryService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a country by id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@LoggedAdmin() admin: Admin, @Param('id') id: string) {
    return this.countryService.delete(id);
  }
}
