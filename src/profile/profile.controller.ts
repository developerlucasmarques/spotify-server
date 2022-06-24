import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  
}
