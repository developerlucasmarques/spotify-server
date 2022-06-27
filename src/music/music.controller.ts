import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedArtist } from 'src/auth/logged-artist.decorator';
import { Artist } from 'src/artist/entities/artist.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@ApiTags('music')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  @ApiOperation({
    summary:
      'Create an music and associate it with the artist who created it (artist) and album.',
  })
  create(@LoggedArtist() artist: Artist, @Body() dto: CreateMusicDto) {
    return this.musicService.create(artist.id, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all musics.',
  })
  findAll(@LoggedUser() user: User) {
    return this.musicService.findAll();
  }

  @Get('/find-all-musics-artist:id')
  @ApiOperation({
    summary: 'Fetch all musics of the artist who is logged in (artist).',
  })
  findMusicsArtist(@LoggedArtist() artist: Artist) {
    return this.musicService.findMusicsArtist(artist.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'View a music by Id',
  })
  findOne(@LoggedUser() user: User, @Param('id') musicId: string) {
    return this.musicService.findOne(musicId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit an music of the artist who is logged in (artist)',
  })
  update(
    @LoggedArtist() artist: Artist,
    @Param('id') musicId: string,
    @Body() dto: UpdateMusicDto,
  ) {
    return this.musicService.update(artist.id, musicId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a music by Id',
  })
  delete(@LoggedArtist() artist: Artist, @Param('id') musicId: string) {
    return this.musicService.delete(artist.id, musicId);
  }
}
