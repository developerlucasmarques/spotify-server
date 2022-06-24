import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new logged in user profile',
  })
  create(@LoggedUser() user: User, @Body() dto: ProfileDto) {
    return this.profileService.create(user.id, dto);
  }
}
