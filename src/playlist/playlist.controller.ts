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
import { UserProfileId } from 'src/auth/dto/logged-profile-type';
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { AddSongPlaylistDto } from './dto/create-playlist-song.dto';
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
  findAllPlaylistProfile(@LoggedUser() userProfileId: UserProfileId) {
    return this.playlistService.findAllPlaylistProfile(
      userProfileId.user.id,
      userProfileId.profileId,
    );
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

  @Delete('delete/:playlistID')
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

  @Post('add-song')
  @ApiOperation({
    summary: 'Add a song to a playlist - (ONLY USER)',
  })
  addSongToPlaylist(
    @LoggedUser() userProfileId: UserProfileId,
    @Body() playlistSong: AddSongPlaylistDto,
  ) {
    return this.playlistService.addSongToPlaylist(
      userProfileId.user.id,
      userProfileId.profileId,
      playlistSong,
    );
  }

  @Patch('delete-song')
  @ApiOperation({
    summary: 'Delete a song from a playlist - (ONLY USER)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSongToPlaylist(
    @LoggedUser() userProfileId: UserProfileId,
    @Body() playlistSong: AddSongPlaylistDto,
  ) {
    return this.playlistService.deleteSongToPlaylist(
      userProfileId.user.id,
      userProfileId.profileId,
      playlistSong,
    );
  }

  @Patch('add-favorite/:playlistID')
  @ApiOperation({
    summary:
      'Favorite a playlist by id in the logged in users profile - (ONLY USER)',
  })
  @HttpCode(HttpStatus.CREATED)
  addPlaylistFavorite(
    @LoggedUser() userProfileId: UserProfileId,
    @Param('playlistID') playlistId: string,
  ) {
    return this.playlistService.addPlaylistFavorite(
      userProfileId.user.id,
      userProfileId.profileId,
      playlistId,
    );
  }

  @Delete('delete-favorite/:playlistID')
  @ApiOperation({
    summary: 'Delete a favorite playlist from profile - (ONLY USER)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePlaylistFavorite(
    @LoggedUser() userProfileId: UserProfileId,
    @Param('playlistID') playlistId: string,
  ) {
    return this.playlistService.deletePlaylistFavorite(
      userProfileId.user.id,
      userProfileId.profileId,
      playlistId,
    );
  }

  @Post('spotify-create')
  @ApiOperation({
    summary:
      'Create a playlist from the platform linked to the Spotify profile - (ONLY ADMIN)',
  })
  spotifyPlaylistCreate(
    @LoggedAdmin() admin: Admin,
    @Body()
    dto: CreatePlaylistDto,
  ) {
    return this.playlistService.spotifyPlaylistCreate(dto);
  }

  @Delete('spotify-delete/:playlistID')
  @ApiOperation({
    summary:
      'Delete a playlist from the platform linked to the Spotify profile - (ONLY ADMIN)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  spotifyPlaylistDelete(
    @LoggedAdmin() admin: Admin,
    @Param('playlistID')
    playlistId: string,
  ) {
    return this.playlistService.spotifyPlaylistDelete(playlistId);
  }
}
