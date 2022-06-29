import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserPlanModule } from './user-plan/user-plan.module';
import { ProfileModule } from './profile/profile.module';
import { ArtistModule } from './artist/artist.module';
import { CountryModule } from './country/country.module';
import { AlbumModule } from './album/album.module';
import { SongModule } from './song/song.module';
import { ProfileFavoriteSongModule } from './profile-favorite-song/profile-favorite-song.module';
import { CategoryModule } from './category/category.module';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    AdminModule,
    UserPlanModule,
    ProfileModule,
    ArtistModule,
    CountryModule,
    AlbumModule,
    SongModule,
    ProfileFavoriteSongModule,
    CategoryModule,
    PlaylistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
