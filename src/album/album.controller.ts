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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Artist } from 'src/artist/entities/artist.entity';
import { LoggedArtist } from 'src/auth/logged-artist.decorator';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@ApiTags('album')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@LoggedArtist() artist: Artist, @Body() dto: CreateAlbumDto) {
    return this.albumService.create(artist.id, dto);
  }

  @Get()
  findAll(@LoggedArtist() artist: Artist) {
    return this.albumService.findAll(artist.id);
  }
}
