import { Module } from '@nestjs/common';
import { FavoriteMusicService } from './favorite-music.service';
import { FavoriteMusicController } from './favorite-music.controller';

@Module({
  controllers: [FavoriteMusicController],
  providers: [FavoriteMusicService]
})
export class FavoriteMusicModule {}
