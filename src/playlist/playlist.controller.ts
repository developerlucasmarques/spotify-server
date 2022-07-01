import {
  Body,
  Controller,
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
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistService } from './playlist.service';

@ApiTags('playlist')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Create new playlist in the logged in user profile - (ONLY USER)',
  })
  create(
    @LoggedUser() userProfileId: UserProfileId,
    @Body() dto: CreatePlaylistDto,
  ) {
    return this.playlistService.create(
      userProfileId.user.id,
      userProfileId.profileId,
      dto,
    );
  }

  @Get('/all')
  @ApiOperation({
    summary: 'Search all playlists in the logged-in user profile - (ONLY USER)',
  })
  findAllPlaylistProfile(@LoggedUser() user: UserProfileId) {
    return this.playlistService.findAllPlaylistProfile(user);
  }

  @Get('/:playlistID')
  @ApiOperation({
    summary:
      'Search for a playlist by id in the logged-in users profile - (ONLY USER)',
  })
  findOnePlaylist(
    @LoggedUser() userProfileId: UserProfileId,
    @Param('playlistID') playlistId: string,
  ) {
    return this.playlistService.findOnePlaylist(
      userProfileId.profileId,
      playlistId,
    );
  }

  @Patch('update/:playlistID')
  @ApiOperation({
    summary:
      'Edit a playlist by id in the logged in users profile - (ONLY USER)',
  })
  updatePlayList(
    @LoggedUser() userProfileId: UserProfileId,
    @Param('playlistID') playlistId: string,
    @Body() dto: UpdatePlaylistDto,
  ) {
    return this.playlistService.updatePlayList(
      userProfileId.user.id,
      userProfileId.profileId,
      playlistId,
      dto,
    );
  }

  @Patch('delete/:playlistID')
  @ApiOperation({
    summary:
      'Delete a playlist by id in the logged in users profile - (ONLY USER)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @LoggedUser() userProfileId: UserProfileId,
    @Param('playlistID') playlistId: string,
  ) {
    return this.playlistService.delete(
      userProfileId.user.id,
      userProfileId.profileId,
      playlistId,
    );
  }

  @Patch('add-favorite/:playlistID')
  @ApiOperation({
    summary:
      'Favorite a playlist by id in the logged in users profile - (ONLY USER)',
  })
  @HttpCode(HttpStatus.CREATED)
  addFavorite(
    @LoggedUser() userProfileId: UserProfileId,
    @Param('playlistID') playlistId: string,
  ) {
    return this.playlistService.addFavorite(
      userProfileId.user.id,
      userProfileId.profileId,
      playlistId,
    );
  }
}
