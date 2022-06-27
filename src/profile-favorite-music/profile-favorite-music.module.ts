import { Module } from '@nestjs/common';
import { ProfileFavoriteMusicService } from './profile-favorite-music.service';
import { ProfileFavoriteMusicController } from './profile-favorite-music.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProfileFavoriteMusicController],
  providers: [ProfileFavoriteMusicService],
})
export class ProfileFavoriteMusicModule {}
