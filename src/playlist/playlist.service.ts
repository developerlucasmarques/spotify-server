import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async findAllPlaylistProfile(userId: string, profileId: string) {
    await this.findOneProfileInUser(userId, profileId);
    const profilePlaylists = await this.prisma.profile
      .findUnique({
        where: { id: profileId },
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

    const favoritePlaylists = await this.searchForFavoritePlaylistFromProfile(
      profileId,
    );

    return [{ profilePlaylists }, { favoritePlaylists }];
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
          PlayListSongs: {
            select: {
              song: {
                select: {
                  id: true,
                  name: true,
                  songUrl: true,
                },
              },
            },
          },
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

  async addPlaylistFavorite(userId: string, profileId: string, playListId: string) {
    await this.findOneProfileInUser(userId, profileId);

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

    if (playList.playlists.length > 0) {
      throw new UnauthorizedException(`Can't favorite your own playlist`);
    }

    await this.checkIfPlaylistIsPrivate(playListId);

    const data: Prisma.ProfileFavoritePlaylistCreateInput = {
      profile: {
        connect: {
          id: profileId,
        },
      },
      playlist: {
        connect: {
          id: playListId,
        },
      },
    };

    return await this.prisma.profileFavoritePlaylist
      .create({
        data,
        select: {
          profile: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          playlist: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  async deletePlaylistFavorite(
    userId: string,
    profileId: string,
    playListId: string,
  ) {
    await this.findOneProfileInUser(userId, profileId);
    const favoritePlaylist = await this.prisma.profileFavoritePlaylist
      .findUnique({
        where: {
          profileId_playlistId: {
            profileId: profileId,
            playlistId: playListId,
          },
        },
      })
      .catch(handleError);

    if (!favoritePlaylist) {
      throw new NotFoundException(`This playlist hasn't been favorited yet`);
    }

    return await this.prisma.profileFavoritePlaylist
      .delete({
        where: {
          profileId_playlistId: {
            profileId: profileId,
            playlistId: playListId,
          },
        },
      })
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

  async searchForFavoritePlaylistFromProfile(profileId: string) {
    const favoritePlaylists =
      await this.prisma.profileFavoritePlaylist.findMany({
        where: {
          profileId: profileId,
        },
        select: {
          playlist: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

    if (favoritePlaylists.length === 0) {
      throw new NotFoundException('No playlist found');
    }

    return favoritePlaylists;
  }

  async checkIfPlaylistIsPrivate(playListId: string) {
    const playlist = await this.prisma.playList
      .findUnique({
        where: {
          id: playListId,
        },
      })
      .catch(handleError);

    if (playlist.private) {
      throw new NotFoundException('No playlist found');
    }
  }
}
