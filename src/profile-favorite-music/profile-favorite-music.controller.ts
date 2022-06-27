import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileFavoriteMusicService } from './profile-favorite-music.service';
import { CreateProfileFavoriteMusicDto } from './dto/create-profile-favorite-music.dto';
import { UpdateProfileFavoriteMusicDto } from './dto/update-profile-favorite-music.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('profile-favorite-music')
@Controller('profile-favorite-music')
export class ProfileFavoriteMusicController {
  constructor(
    private readonly favoriteMusicService: ProfileFavoriteMusicService,
  ) {}

  @Post()
  create(@Body() dto: CreateProfileFavoriteMusicDto) {
    return this.favoriteMusicService.create(dto);
  }

  @Get()
  findAll() {
    return this.favoriteMusicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteMusicService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProfileFavoriteMusicDto) {
    return this.favoriteMusicService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteMusicService.remove(id);
  }
}
