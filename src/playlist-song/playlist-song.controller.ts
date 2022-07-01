import {
  Body, Controller, Patch, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserProfileId } from 'src/auth/dto/logged-profile-type';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { AddSongPlaylist } from './dto/addSong-playlist.dto';
import { PlaylistSongService } from './playlist-song.service';

@ApiTags('playlist-song')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('playlist-song')
export class PlaylistSongController {
  constructor(private readonly playlistSongService: PlaylistSongService) {}

  @Patch('add/:songID')
  @ApiOperation({
    summary: 'Add a song to a playlist - (ONLY USER)',
  })
  addSong(
    @LoggedUser() userProfileId: UserProfileId,
    @Body() dto: AddSongPlaylist,
  ) {
    return this.playlistSongService.addSong(
      userProfileId.user.id,
      userProfileId.profileId,
      dto,
    );
  }
}
