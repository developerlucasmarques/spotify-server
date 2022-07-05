import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CountryModule } from './country/country.module';
import { PlaylistModule } from './playlist/playlist.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileFavoriteSongModule } from './profile-favorite-song/profile-favorite-song.module';
import { ProfileModule } from './profile/profile.module';
import { SongModule } from './song/song.module';
import { UserPlanModule } from './user-plan/user-plan.module';
import { UserModule } from './user/user.module';
import { HomePageModule } from './home-page/home-page.module';

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
    HomePageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
