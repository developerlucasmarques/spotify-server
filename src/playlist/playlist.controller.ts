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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserProfileId } from 'src/auth/dto/logged-profile-type';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
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
  create(@LoggedUser() user: User, @Body() dto: CreatePlaylistDto) {
    return this.playlistService.create(user.id, dto);
  }

  @Get('/all')
  findAllPlaylistProfile(@LoggedUser() user: UserProfileId) {
    return this.playlistService.findAllPlaylistProfile(user);
  }

  @Get('/:profileID/:playlistID')
  findOnePlaylist(
    @Param('profileID') profileId: string,
    @Param('playlistID') playlistId: string,
  ) {
    return this.playlistService.findOnePlaylist(profileId, playlistId);
  }

  @Patch('update/:playlistID')
  updatePlayList(
    @LoggedUser() user: User,
    @Param('playlistID') playlistId: string,
    @Body() dto: UpdatePlaylistDto,
  ) {
    return this.playlistService.updatePlayList(user.id, playlistId, dto);
  }

  @Patch('delete/:profileID/:playlistID')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @LoggedUser() user: User,
    @Param('profileID') profileId: string,
    @Param('playlistID') playlistId: string,
  ) {
    return this.playlistService.delete(user.id, profileId, playlistId);
  }
}
