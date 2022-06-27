import { Module } from '@nestjs/common';
import { ProfileFavoriteMusicService } from './profile-favorite-music.service';
import { ProfileFavoriteMusicController } from './profile-favorite-music.controller';

@Module({
  controllers: [ProfileFavoriteMusicController],
  providers: [ProfileFavoriteMusicService]
})
export class ProfileFavoriteMusicModule {}
