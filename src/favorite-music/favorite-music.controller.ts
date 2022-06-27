import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteMusicService } from './favorite-music.service';
import { CreateFavoriteMusicDto } from './dto/create-favorite-music.dto';
import { UpdateFavoriteMusicDto } from './dto/update-favorite-music.dto';

@Controller('favorite-music')
export class FavoriteMusicController {
  constructor(private readonly favoriteMusicService: FavoriteMusicService) {}

  @Post()
  create(@Body() createFavoriteMusicDto: CreateFavoriteMusicDto) {
    return this.favoriteMusicService.create(createFavoriteMusicDto);
  }

  @Get()
  findAll() {
    return this.favoriteMusicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteMusicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteMusicDto: UpdateFavoriteMusicDto) {
    return this.favoriteMusicService.update(+id, updateFavoriteMusicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteMusicService.remove(+id);
  }
}
