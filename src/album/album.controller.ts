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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@ApiTags('album')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post('create')
  @ApiOperation({
    summary:
      'Create an album and associate it with the artist who created it - (ARTIST)',
  })
  create(@LoggedArtist() artist: Artist, @Body() dto: CreateAlbumDto) {
    return this.albumService.create(artist.id, dto);
  }

  @Get(':albumID')
  @ApiOperation({
    summary: 'Search for an album by the artist who is logged in - (OPEN)',
  })
  findOne(@Param('albumID') albumId: string) {
    return this.albumService.findOne(albumId);
  }

  @Patch('update/:albumID')
  @ApiOperation({
    summary: 'Edit an album of the artist who is logged - (ARTIST)',
  })
  update(
    @LoggedArtist() artist: Artist,
    @Param('albumID') albumId: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    return this.albumService.update(artist.id, albumId, dto);
  }

  @Delete('delete/:albumID')
  @ApiOperation({
    summary: 'Delete an album of the artist who is logged in - (ARTIST)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@LoggedArtist() artist: Artist, @Param('albumID') albumId: string) {
    return this.albumService.delete(artist.id, albumId);
  }
}
