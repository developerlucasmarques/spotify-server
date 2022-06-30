import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserProfileId } from 'src/auth/dto/logged-profile-type';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { ProfileFavoriteSongService } from './profile-favorite-song.service';

@ApiTags('profile-favorite-song')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('tracks')
export class ProfileFavoriteSongController {
  constructor(
    private readonly favoriteSongService: ProfileFavoriteSongService,
  ) {}

  @Patch('add/:songID')
  @ApiOperation({
    summary: 'Add a song to a profile - (ONLY USER)',
  })
  create(
    @LoggedUser() userProfileId: UserProfileId,
    @Param('songID') songIdD: string,
  ) {
    return this.favoriteSongService.create(
      userProfileId.user.id,
      userProfileId.profileId,
      songIdD,
    );
  }

  @Get('all')
  @ApiOperation({
    summary: 'Fetch all favorite songs from profile - (ONLY USER)',
  })
  findAll(@LoggedUser() userProfileId: UserProfileId) {
    return this.favoriteSongService.findAll(
      userProfileId.user.id,
      userProfileId.profileId,
    );
  }

  @Delete('delete/:songID')
  @ApiOperation({
    summary: 'Remove a song to a profile - (ONLY USER)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @LoggedUser() userProfileId: UserProfileId,
    @Param('songID') songIdDto: string,
  ) {
    return this.favoriteSongService.delete(
      userProfileId.user.id,
      userProfileId.profileId,
      songIdDto,
    );
  }
}
