import { Module } from '@nestjs/common';
import { ProfileFavoriteSongService } from './profile-favorite-song.service';
import { ProfileFavoriteSongController } from './profile-favorite-song.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProfileFavoriteSongController],
  providers: [ProfileFavoriteSongService],
})
export class ProfileFavoriteSongModule {}
