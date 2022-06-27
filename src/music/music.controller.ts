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
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedArtist } from 'src/auth/logged-artist.decorator';
import { Artist } from 'src/artist/entities/artist.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('music')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  @ApiOperation({
    summary:
      'Create an music and associate it with the artist who created it (artist)',
  })
  create(@LoggedArtist() artist: Artist, @Body() dto: CreateMusicDto) {
    return this.musicService.create(artist.id, dto);
  }

  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.update(+id, updateMusicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicService.remove(+id);
  }
}
