import { Module } from '@nestjs/common';
import { PlaylistSongService } from './playlist-song.service';
import { PlaylistSongController } from './playlist-song.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [PlaylistSongController],
  providers: [PlaylistSongService],
})
export class PlaylistSongModule {}
