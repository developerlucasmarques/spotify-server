import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
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

  @Post()
  @ApiOperation({
    summary: 'Create a new artist',
  })
  create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List all artists',
  })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'View a artist by Id',
  })
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Edit artist logged',
  })
  update(@LoggedArtist() artist: Artist, @Body() dto: UpdateArtistDto) {
    return this.artistService.update(artist.id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove artist logged',
  })
  delete(@LoggedArtist() artist: Artist) {
    return this.artistService.delete(artist.id);
  }

  @Delete('delete-artist:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a artist by Id',
  })
  deleteArtist(@LoggedAdmin() admin: Admin, @Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
