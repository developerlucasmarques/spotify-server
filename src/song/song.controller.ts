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
import { Artist } from 'src/artist/entities/artist.entity';
import { LoggedArtist } from 'src/auth/logged-artist.decorator';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SongService } from './song.service';

@ApiTags('song')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post('/create')
  @ApiOperation({
    summary:
      'Create an song and associate it with the artist who created it (artist) and album - (ONLY ARTIST)',
  })
  create(@LoggedArtist() artist: Artist, @Body() dto: CreateSongDto) {
    return this.songService.create(artist.id, dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: 'List all songs - (ONLY USER)',
  })
  findAll(@LoggedUser() user: User) {
    return this.songService.findAll();
  }

  @Get('/:songID')
  @ApiOperation({
    summary: 'View a song by Id - (ONLY USER)',
  })
  findOne(@LoggedUser() user: User, @Param('songID') songId: string) {
    return this.songService.findOne(songId);
  }

  @Patch('/update/:songID')
  @ApiOperation({
    summary: 'Edit an song of the artist who is logged in - (ONLY ARTIST)',
  })
  update(
    @LoggedArtist() artist: Artist,
    @Param('songID') songId: string,
    @Body() dto: UpdateSongDto,
  ) {
    return this.songService.update(artist.id, songId, dto);
  }

  @Delete('/delete/:songID')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a song by Id - (ONLY ARTIST)',
  })
  delete(@LoggedArtist() artist: Artist, @Param('songID') songId: string) {
    return this.songService.delete(artist.id, songId);
  }
}
