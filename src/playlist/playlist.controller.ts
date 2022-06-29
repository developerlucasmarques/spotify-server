import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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

  @Get('/all/:profileID')
  findAllPlaylistProfile(
    @LoggedUser() user: User,
    @Param('profileID') profileId: string,
  ) {
    return this.playlistService.findAllPlaylistProfile(user.id, profileId);
  }

  @Get('/:profileID/:playlistID')
  findOnePlaylist(
    @LoggedUser() user: User,
    @Param('profileID') profileId: string,
    @Param('playlistID') playlistId: string,
  ) {
    return this.playlistService.findOnePlaylist(profileId, playlistId);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdatePlaylistDto) {
    return this.playlistService.update(id, dto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(id);
  }
}
