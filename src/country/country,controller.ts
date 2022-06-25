import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountryService } from './country.service';

@ApiTags('country')
@Controller()
export class CountryController {
  constructor(private readonly countryService: CountryService) {}
}
