import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ProfileFavoriteSongService } from './profile-favorite-song.service';

@ApiTags('profile-favorite-song')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile-favorite-song')
export class ProfileFavoriteSongController {
  constructor(
    private readonly favoriteSongService: ProfileFavoriteSongService,
  ) {}

  @Patch('add-favorite/:profileID/:songID')
  @ApiOperation({
    summary: 'Add a song to a profile - (ONLY USER)',
  })
  update(
    @LoggedUser() user: User,
    @Param('profileID') profileId: string,
    @Param('songID') songIdD: string,
  ) {
    return this.favoriteSongService.update(user.id, profileId, songIdD);
  }

  @Get('find-all-favorites/:profileID')
  @ApiOperation({
    summary: 'Fetch all favorite songs from profile - (ONLY USER)',
  })
  findAll(@LoggedUser() user: User, @Param('profileID') profileId: string) {
    return this.favoriteSongService.findAll(user.id, profileId);
  }

  @Patch('remove-favorite/:profileID/:songID')
  @ApiOperation({
    summary: 'Remove a song to a profile - (ONLY USER)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @LoggedUser() user: User,
    @Param('profileID') profileId: string,
    @Param('songID') songIdDto: string,
  ) {
    return this.favoriteSongService.delete(user.id, profileId, songIdDto);
  }
}
