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

  @Post('/create')
  @ApiOperation({
    summary: 'Create a new country - (ONLY ADMIN)',
  })
  create(@LoggedAdmin() admin: Admin, @Body() dto: CreateCountryDto) {
    return this.countryService.create(dto);
  }

  @Get('/find-all')
  @ApiOperation({
    summary: 'Search all countries - (ONLY ADMIN)',
  })
  findAll(@LoggedAdmin() admin: Admin) {
    return this.countryService.findAll();
  }

  @Get('/find-one/:countryID')
  @ApiOperation({
    summary: 'Search for a country by id - (ONLY ADMIN)',
  })
  findOne(@LoggedAdmin() admin: Admin, @Param('countryID') id: string) {
    return this.countryService.findOne(id);
  }

  @Patch('/update/:countryID')
  @ApiOperation({
    summary: 'Edit a country by id - (ONLY ADMIN)',
  })
  update(
    @LoggedAdmin() admin: Admin,
    @Param('countryID') id: string,
    @Body() dto: UpdateCountryDto,
  ) {
    return this.countryService.update(id, dto);
  }

  @Delete('/delete/:countryID')
  @ApiOperation({
    summary: 'Delete a country by id - (ONLY ADMIN)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@LoggedAdmin() admin: Admin, @Param('countryID') id: string) {
    return this.countryService.delete(id);
  }
}
