import { Injectable } from '@nestjs/common';
import { CreateFavoriteMusicDto } from './dto/create-favorite-music.dto';
import { UpdateFavoriteMusicDto } from './dto/update-favorite-music.dto';

@Injectable()
export class FavoriteMusicService {
  create(createFavoriteMusicDto: CreateFavoriteMusicDto) {
    return 'This action adds a new favoriteMusic';
  }

  findAll() {
    return `This action returns all favoriteMusic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favoriteMusic`;
  }

  update(id: number, updateFavoriteMusicDto: UpdateFavoriteMusicDto) {
    return `This action updates a #${id} favoriteMusic`;
  }

  remove(id: number) {
    return `This action removes a #${id} favoriteMusic`;
  }
}
