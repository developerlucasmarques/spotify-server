import { Injectable } from '@nestjs/common';
import { CreateProfileFavoriteMusicDto } from './dto/create-profile-favorite-music.dto';
import { UpdateProfileFavoriteMusicDto } from './dto/update-profile-favorite-music.dto';

@Injectable()
export class ProfileFavoriteMusicService {
  create(dto: CreateProfileFavoriteMusicDto) {
    return 'This action adds a new profileFavoriteMusic';
  }

  findAll() {
    return `This action returns all profileFavoriteMusic`;
  }

  findOne(id: string) {
    return `This action returns a #${id} profileFavoriteMusic`;
  }

  update(id: string, dto: UpdateProfileFavoriteMusicDto) {
    return `This action updates a #${id} profileFavoriteMusic`;
  }

  remove(id: string) {
    return `This action removes a #${id} profileFavoriteMusic`;
  }
}
