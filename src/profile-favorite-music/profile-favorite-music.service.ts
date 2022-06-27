import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileFavoriteMusicDto } from './dto/create-profile-favorite-music.dto';
import { UpdateProfileFavoriteMusicDto } from './dto/update-profile-favorite-music.dto';

@Injectable()
export class ProfileFavoriteMusicService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, profileId: string) {
    await this.findByIdProfileUser(userId, profileId);

    const allFavorites = await this.prisma.profile
      .findUnique({
        where: { id: profileId },
        select: {
          musics: {
            select: {
              music: {
                select: {
                  id: true,
                  name: true,
                  musicUrl: true,
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
                    },
                  },
                },
              },
            },
          },
        },
      })
      .catch(handleError);

    if (allFavorites.musics.length === 0) {
      throw new NotFoundException('No favorite songs found in profile');
    }

    return allFavorites;
  }

  async update(
    userId: string,
    profileId: string,
    dto: UpdateProfileFavoriteMusicDto,
  ) {
    await this.findByIdProfileUser(userId, profileId);

    const data: Prisma.ProfileFavoriteMusicCreateInput = {
      profile: {
        connect: {
          id: profileId,
        },
      },
      music: {
        connect: {
          id: dto.songID,
        },
      },
    };

    return await this.prisma.profileFavoriteMusic
      .create({
        data,
        select: {
          id: true,
          profile: {
            select: {
              name: true,
            },
          },
          music: {
            select: {
              id: true,
              name: true,
              musicUrl: true,
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

  remove(id: string) {
    return `This action removes a #${id} profileFavoriteMusic`;
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
}
