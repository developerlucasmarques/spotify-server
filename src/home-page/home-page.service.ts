import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';

@Injectable()
export class HomePageService {
  constructor(private readonly prisma: PrismaService) {}

  async homePage(userId: string, profileId: string) {
    await this.findOneProfileInUser(userId, profileId);

    const playlists = await this.prisma.profile
      .findUnique({
        where: { id: profileId },
        select: {
          playlists: {
            select: {
              id: true,
              name: true,
              image: true,
              _count: {
                select: {
                  songs: true,
                },
              },
            },
          },
          favoritePlaylists: {
            select: {
              playlist: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  _count: {
                    select: {
                      songs: true,
                    },
                  },
                },
              },
            },
          },
          songs: {
            select: {
              song: {
                select: {
                  id: true,
                  name: true,
                  songUrl: true,
                },
              },
            },
            take: 10,
            skip: 0,
          },
        },
      })
      .catch(handleError);

    const playlistsSpotify = await this.prisma.profile.findUnique({
      where: { userSpotify: true },
      select: {
        playlists: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return [playlists, {playlistsSpotify}];
  }

  async findOneProfileInUser(userId: string, profileId: string) {
    const record = await this.prisma.user
      .findUnique({
        where: { id: userId },
        select: {
          profiles: {
            where: {
              id: profileId,
            },
          },
        },
      })
      .catch(handleError);

    if (record.profiles.length === 0) {
      throw new NotFoundException(`Profile with ID '${profileId}' not found`);
    }
  }
}
