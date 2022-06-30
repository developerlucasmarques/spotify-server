import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserProfileId } from 'src/auth/dto/logged-profile-type';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, profileId: string, dto: CreatePlaylistDto) {
    await this.findOneProfileInUser(userId, profileId);
    const data: Prisma.PlayListCreateInput = {
      name: dto.name,
      image: dto.image,
      private: dto.private,
      profile: {
        connect: {
          id: profileId,
        },
      },
    };

    return await this.prisma.playList
      .create({
        data,
        select: {
          id: true,
          name: true,
          image: true,
          profile: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  async findAllPlaylistProfile(user: UserProfileId) {
    await this.findOneProfileInUser(user.user.id, user.profileId);
    const playLists = await this.prisma.profile
      .findUnique({
        where: { id: user.profileId },
        select: {
          playlists: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      })
      .catch(handleError);

    if (playLists.playlists.length === 0) {
      throw new NotFoundException('No playlist found');
    }
    return playLists;
  }

  async findOnePlaylist(profileId: string, playlistId: string) {
    const playlist = await this.prisma.playList
      .findUnique({
        where: { id: playlistId },
        select: {
          id: true,
          name: true,
          image: true,
          private: true,
          profile: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      })
      .catch(handleError);

    if (playlist.private && playlist.profile.id !== profileId) {
      throw new NotFoundException('Playlist not found');
    }

    return playlist;
  }

  async updatePlayList(
    userId: string,
    profileId: string,
    playlistId: string,
    dto: UpdatePlaylistDto,
  ) {
    await this.findOneProfileInUser(userId, profileId);
    await this.findOnePlayListInProfile(profileId, playlistId);

    const data: Partial<UpdatePlaylistDto> = { ...dto };

    return await this.prisma.playList
      .update({
        where: { id: playlistId },
        data,
        select: {
          id: true,
          name: true,
          image: true,
          private: true,
        },
      })
      .catch(handleError);
  }

  async delete(userId: string, profileId: string, playListId: string) {
    await this.findOneProfileInUser(userId, profileId);
    await this.findOnePlayListInProfile(profileId, playListId);

    await this.prisma.playList
      .delete({ where: { id: playListId } })
      .catch(handleError);
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

  async findOnePlayListInProfile(profileId: string, playListId: string) {
    const playList = await this.prisma.profile
      .findUnique({
        where: { id: profileId },
        select: {
          playlists: {
            where: {
              id: playListId,
            },
          },
        },
      })
      .catch(handleError);

    if (playList.playlists.length === 0) {
      throw new NotFoundException('No a playlist found');
    }
  }
}
