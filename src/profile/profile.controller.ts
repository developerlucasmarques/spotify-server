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
import { UserProfileId } from 'src/auth/dto/logged-profile-type';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new logged in user profile - (ONLY USER)',
  })
  create(
    @LoggedUser() userProfileId: UserProfileId,
    @Body() dto: CreateProfileDto,
  ) {
    return this.profileService.create(userProfileId.user.id, dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: 'Fetch all profiles of the logged in user - (ONLY USER)',
  })
  findAll(@LoggedUser() userProfileId: UserProfileId) {
    return this.profileService.findAll(userProfileId.user.id);
  }

  @Patch('update/:profileID')
  @ApiOperation({
    summary: 'Edit a profile by id - (ONLY USER)',
  })
  update(
    @LoggedUser() userProfileId: UserProfileId,
    @Param('profileID') profileId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.update(userProfileId.user.id, profileId, dto);
  }

  @Delete('delete/:profileID')
  @ApiOperation({
    summary: 'Delete a profile by id - (ONLY USER)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @LoggedUser() userProfileId: UserProfileId,
    @Param('profileID') profileId: string,
  ) {
    return this.profileService.delete(userProfileId.user.id, profileId);
  }
}
