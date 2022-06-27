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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Admin } from '@prisma/client';
import { Artist } from 'src/artist/entities/artist.entity';
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
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
  @ApiOperation({
    summary:
      'Create an album and associate it with the artist who created it (artist)',
  })
  create(@LoggedArtist() artist: Artist, @Body() dto: CreateAlbumDto) {
    return this.albumService.create(artist.id, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Fetch all albums of the artist who is logged in (artist)',
  })
  findAll(@LoggedArtist() artist: Artist) {
    return this.albumService.findAll(artist.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Search for an album by the artist who is logged in (artist)',
  })
  findOne(@LoggedArtist() artist: Artist, @Param('id') albumId: string) {
    return this.albumService.findOne(artist.id, albumId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit an album of the artist who is logged in (artist)',
  })
  update(
    @LoggedArtist() artist: Artist,
    @Param('id') albumId: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    return this.albumService.update(artist.id, albumId, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an album of the artist who is logged in (artist)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@LoggedArtist() artist: Artist, @Param('id') albumId: string) {
    return this.albumService.delete(artist.id, albumId);
  }
}
