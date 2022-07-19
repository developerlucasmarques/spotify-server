import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { verifyProfileIdInToken } from 'src/utils/verifyProfileIdInToken';

@Injectable()
export class ProfileFavoriteSongService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, profileId: string, songID: string) {
    verifyProfileIdInToken(profileId);
    await this.verifySongExist(songID);
    await this.findByIdProfileUser(userId, profileId);

    const data: Prisma.ProfileFavoriteSongCreateInput = {
      profile: {
        connect: {
          id: profileId,
        },
      },
      song: {
        connect: {
          id: songID,
        },
      },
    };

    return await this.prisma.profileFavoriteSong
      .create({
        data,
        select: {
          profile: {
            select: {
              name: true,
            },
          },
          song: {
            select: {
              id: true,
              name: true,
              songUrl: true,
              artist: {
                select: {
                  id: true,
                  name: true,
                },
              },
              album: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      })
      .catch(handleError);
  }

  async findAll(userId: string, profileId: string) {
    verifyProfileIdInToken(profileId);
    await this.findByIdProfileUser(userId, profileId);

    const allFavorites = await this.prisma.profile
      .findUnique({
        where: { id: profileId },
        select: {
          songs: {
            select: {
              song: {
                select: {
                  id: true,
                  name: true,
                  songUrl: true,
                  artist: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                  album: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
      .catch(handleError);

    if (allFavorites.songs.length === 0) {
      throw new NotFoundException('No favorite songs found in profile');
    }

    return allFavorites;
  }

  async delete(userId: string, profileId: string, songId: string) {
    verifyProfileIdInToken(profileId);
    await this.findByIdProfileUser(userId, profileId);
    await this.findByIdSongInProfile(profileId, songId);
    return await this.prisma.profileFavoriteSong
      .delete({
        where: {
          profileId_songId: {
            profileId: profileId,
            songId: songId,
          },
        },
      })
      .catch(handleError);
  }

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

  async findByIdSongInProfile(profileId: string, songId: string) {
    const songProfile = await this.prisma.profile
      .findUnique({
        where: { id: profileId },
        select: {
          songs: {
            where: {
              song: {
                id: songId,
              },
            },
          },
        },
      })
      .catch(handleError);

    if (songProfile.songs.length === 0) {
      throw new NotFoundException('No favorite songs found in the profile ');
    }
  }

  async verifySongExist(songId: string) {
    const song = await this.prisma.song.findUnique({
      where: { id: songId },
    });

    if (!song) {
      throw new NotFoundException(`Song with ID '${songId} not found'`);
    }
  }
}
