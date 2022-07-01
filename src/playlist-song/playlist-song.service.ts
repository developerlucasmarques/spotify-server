import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { AddSongPlaylist } from './dto/addSong-playlist.dto';

@Injectable()
export class PlaylistSongService {
  constructor(private readonly prisma: PrismaService) {}

  async findByIdProfileUser(userId: string, profileId: string) {
    const profileUser = await this.prisma.user
      .findUnique({
        where: { id: userId },
        select: {
          name: true,
          profiles: {
            where: { id: profileId },
          },
        },
      })
      .catch(handleError);

    if (profileUser.profiles.length === 0) {
      throw new NotFoundException('Profile not found');
    }

    return profileUser;
  }

  async addSong(userId: string, profileId: string, dto: AddSongPlaylist) {
    await this.findByIdProfileUser(userId, profileId);

    const data: Prisma.PlayListSongCreateInput = {
      playlist: {
        connect: {
          id: dto.playlistId,
        },
      },
      song: {
        connect: {
          id: dto.songId,
        },
      },
    };

    return this.prisma.playListSong
      .create({
        data,
        select: {
          playlist: {
            select: {
              id: true,
              name: true,
            },
          },
          song: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      .catch(handleError);
  }
}
