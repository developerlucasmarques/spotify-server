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
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
import { LoggedArtist } from 'src/auth/logged-artist.decorator';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Create a new artist',
  })
  create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @Get('/home')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Fetch all data of the artist who is logged in - (ONLY ARTIST)',
  })
  homePage(@LoggedArtist() artist: Artist) {
    return this.artistService.homePage(artist.id);
  }

  @Get('/all')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List all artists - (OPEN)',
  })
  findAll() {
    return this.artistService.findAll();
  }

  @Get('/:artistID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Fetch a artist by Id - (OPEN)',
  })
  findOne(@Param('artistID') id: string) {
    return this.artistService.findOne(id);
  }

  @Get('/:artistID/discography')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'View all songs by an artist - (OPEN)',
  })
  findOneByArtist(@Param('artistID') artistId: string) {
    return this.artistService.findOneByArtist(artistId);
  }

  @Patch('/update')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Edit artist logged - (ONLY ARTIST)',
  })
  update(@LoggedArtist() artist: Artist, @Body() dto: UpdateArtistDto) {
    return this.artistService.update(artist.id, dto);
  }

  @Delete('/delete')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove artist logged - (ONLY ARTIST)',
  })
  delete(@LoggedArtist() artist: Artist) {
    return this.artistService.delete(artist.id);
  }

  @Delete('/delete/:artistID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a artist by Id - (ONLY ADMIN)',
  })
  deleteArtist(@LoggedAdmin() admin: Admin, @Param('artistID') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
