import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { verifyProfileIdInToken } from 'src/utils/verifyProfileIdInToken';
import { AddSongPlaylistDto } from './dto/create-playlist-song.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, profileId: string, dto: CreatePlaylistDto) {
    verifyProfileIdInToken(profileId);
    await this.findOneProfileInUser(userId, profileId);
    const data: Prisma.PlaylistCreateInput = {
      name: dto.name,
      image: dto.image,
      private: dto.private,
      profile: {
        connect: {
          id: profileId,
        },
      },
    };

    return await this.prisma.playlist
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
    verifyProfileIdInToken(profileId);
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
    verifyProfileIdInToken(profileId);
    await this.findByIdPlaylist(playlistId);
    const playlist = await this.prisma.playlist
      .findUnique({
        where: { id: playlistId },
        select: {
          id: true,
          name: true,
          image: true,
          private: true,
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
    verifyProfileIdInToken(profileId);
    await this.findOneProfileInUser(userId, profileId);
    await this.findOnePlayListInProfile(profileId, playlistId);

    const data: Partial<UpdatePlaylistDto> = { ...dto };

    return await this.prisma.playlist
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

  async delete(userId: string, profileId: string, playlistId: string) {
    verifyProfileIdInToken(profileId);
    await this.findOneProfileInUser(userId, profileId);
    await this.findOnePlayListInProfile(profileId, playlistId);

    await this.prisma.playlist
      .delete({ where: { id: playlistId } })
      .catch(handleError);
  }

  async addSongToPlaylist(
    userId: string,
    profileId: string,
    playlistSong: AddSongPlaylistDto,
  ) {
    verifyProfileIdInToken(profileId);
    await this.findOneProfileInUser(userId, profileId);
    await this.findOnePlayListInProfile(profileId, playlistSong.playlistId);
    await this.findOneSong(playlistSong.songId);

    const songInPlaylist = await this.prisma.playlist
      .findUnique({
        where: {
          id: playlistSong.playlistId,
        },
        select: {
          songs: {
            where: {
              song: {
                id: playlistSong.songId,
              },
            },
          },
        },
      })
      .catch(handleError);

    if (songInPlaylist.songs.length > 0) {
      throw new NotFoundException('Song already added to playlist');
    }

    const data: Prisma.PlaylistSongCreateInput = {
      playlist: {
        connect: {
          id: playlistSong.playlistId,
        },
      },
      song: {
        connect: {
          id: playlistSong.songId,
        },
      },
    };

    return await this.prisma.playlistSong
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

  async deleteSongToPlaylist(
    userId: string,
    profileId: string,
    playlistSong: AddSongPlaylistDto,
  ) {
    verifyProfileIdInToken(profileId);

    await this.findOneProfileInUser(userId, profileId);
    await this.findOnePlayListInProfile(profileId, playlistSong.playlistId);
    await this.findOneSong(playlistSong.songId);
    const songInPlaylist = await this.prisma.playlist
      .findUnique({
        where: {
          id: playlistSong.playlistId,
        },
        select: {
          songs: {
            where: {
              song: {
                id: playlistSong.songId,
              },
            },
          },
        },
      })
      .catch(handleError);

    if (songInPlaylist.songs.length === 0) {
      throw new NotFoundException('Song not found in playlist');
    }

    return await this.prisma.playlistSong
      .delete({
        where: {
          playlistId_songId: {
            playlistId: playlistSong.playlistId,
            songId: playlistSong.songId,
          },
        },
      })
      .catch(handleError);
  }

  async addPlaylistFavorite(
    userId: string,
    profileId: string,
    playlistId: string,
  ) {
    verifyProfileIdInToken(profileId);
    await this.findByIdPlaylist(playlistId);
    await this.findOneProfileInUser(userId, profileId);

    const playlist = await this.prisma.profile
      .findUnique({
        where: { id: profileId },
        select: {
          playlists: {
            where: {
              id: playlistId,
            },
          },
        },
      })
      .catch(handleError);

    if (playlist.playlists.length > 0) {
      throw new UnauthorizedException(`Can't favorite your own playlist`);
    }

    await this.checkIfPlaylistIsPrivate(playlistId);

    const data: Prisma.ProfileFavoritePlaylistCreateInput = {
      profile: {
        connect: {
          id: profileId,
        },
      },
      playlist: {
        connect: {
          id: playlistId,
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
    playlistId: string,
  ) {
    verifyProfileIdInToken(profileId);

    await this.findOneProfileInUser(userId, profileId);
    await this.findByIdPlaylist(playlistId);

    const favoritePlaylist = await this.prisma.profileFavoritePlaylist
      .findUnique({
        where: {
          profileId_playlistId: {
            profileId: profileId,
            playlistId: playlistId,
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
            playlistId: playlistId,
          },
        },
      })
      .catch(handleError);
  }

  async spotifyPlaylistCreate(dto: CreatePlaylistDto) {
    const data: Prisma.PlaylistCreateInput = {
      name: dto.name,
      image: dto.image,
      private: dto.private,
      profile: {
        connect: {
          userSpotify: true,
        },
      },
    };

    return await this.prisma.playlist
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

  async spotifyPlaylistDelete(playlistId: string) {
    await this.findByIdPlaylist(playlistId);

    return await this.prisma.playlist
      .delete({
        where: {
          id: playlistId,
        },
      })
      .catch(handleError);
  }

  async findOneProfileInUser(userId: string, profileId: string) {
    verifyProfileIdInToken(profileId);

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

  async findOnePlayListInProfile(profileId: string, playlistId: string) {
    verifyProfileIdInToken(profileId);
    await this.findByIdPlaylist(playlistId);

    const playlist = await this.prisma.profile
      .findUnique({
        where: { id: profileId },
        select: {
          playlists: {
            where: {
              id: playlistId,
            },
          },
        },
      })
      .catch(handleError);

    if (playlist.playlists.length === 0) {
      throw new NotFoundException('No a playlist found');
    }
  }

  async searchForFavoritePlaylistFromProfile(profileId: string) {
    verifyProfileIdInToken(profileId);

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

    return favoritePlaylists;
  }

  async checkIfPlaylistIsPrivate(playlistId: string) {
    const playlist = await this.prisma.playlist
      .findUnique({
        where: {
          id: playlistId,
        },
      })
      .catch(handleError);

    if (playlist.private) {
      throw new NotFoundException('No playlist found');
    }
  }

  async findOneSong(songId: string) {
    const song = await this.prisma.song
      .findUnique({
        where: {
          id: songId,
        },
      })
      .catch(handleError);

    if (!song) {
      throw new NotFoundException(`Song with id '${songId}' not found`);
    }

    return song;
  }

  async findByIdPlaylist(playlistId: string) {
    const playlist = await this.prisma.playlist
      .findUnique({
        where: { id: playlistId },
      })
      .catch(handleError);

    if (!playlist) {
      throw new NotFoundException(`Playlist with id '${playlistId}' not found`);
    }
  }
}
