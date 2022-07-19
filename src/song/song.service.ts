import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Injectable()
export class SongService {
  constructor(private readonly prisma: PrismaService) {}

  async create(artistId: string, dto: CreateSongDto) {
    await this.albumIdExist(dto.albumId);
    await this.categoryIdExist(dto.categoryId);
    const data: Prisma.SongCreateInput = {
      name: dto.name,
      songUrl: dto.songUrl,
      album: {
        connect: {
          id: dto.albumId,
        },
      },
      artist: {
        connect: {
          id: artistId,
        },
      },
      CategorySongs: {
        createMany: {
          data: dto.categoryId.map((categoryId) => ({
            categoryId: categoryId,
          })),
        },
      },
    };

    return this.prisma.song
      .create({
        data,
        select: {
          id: true,
          name: true,
          songUrl: true,
          album: {
            select: {
              name: true,
              image: true,
            },
          },
          artist: {
            select: {
              id: true,
              name: true,
            },
          },
          CategorySongs: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      })
      .catch(handleError);
  }

  async findAll() {
    const songs = await this.prisma.song
      .findMany({
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
        },
      })
      .catch(handleError);

    if (songs.length === 0) {
      throw new NotFoundException('No song found');
    }

    return songs;
  }

  async findById(artistId: string, songId: string) {
    const record = await this.prisma.artist
      .findUnique({
        where: { id: artistId },
        select: {
          songs: {
            where: {
              id: songId,
            },
            select: {
              id: true,
              name: true,
              songUrl: true,
              album: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      })
      .catch(handleError);

    if (record.songs.length === 0) {
      throw new NotFoundException(`Song with ID '${songId}' not found`);
    }

    return record;
  }

  async findOne(songId: string) {
    const song = await this.prisma.song
      .findUnique({
        where: { id: songId },
        select: {
          id: true,
          name: true,
          songUrl: true,
          artist: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          album: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          CategorySongs: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })
      .catch(handleError);

    if (!song) {
      throw new NotFoundException(`Song with ID '${songId}' not found`);
    }

    console.log(song);

    return song;
  }

  async findOneByArtsit(artistId: string) {
    const songs = await this.prisma.artist
      .findMany({
        where: { id: artistId },
        select: {
          songs: {
            select: {
              id: true,
              name: true,
              songUrl: true,
            },
          },
        },
      })
      .catch(handleError);

    if (songs.length === 0) {
      throw new NotFoundException('No song found');
    }

    return songs;
  }

  async update(artistdId: string, songId: string, dto: UpdateSongDto) {
    await this.findById(artistdId, songId);
    const data: Prisma.SongUpdateInput = {
      name: dto.name,
      songUrl: dto.songUrl,
      CategorySongs: {
        createMany: {
          data: dto.categoryId.map((categoryId) => ({
            categoryId: categoryId,
          })),
        },
      },
    };

    return await this.prisma.song
      .update({
        where: { id: songId },
        data,
        select: {
          id: true,
          name: true,
          songUrl: true,
          CategorySongs: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      })
      .catch(handleError);
  }

  async delete(artistId: string, songId: string) {
    await this.findById(artistId, songId);
    return await this.prisma.song
      .delete({ where: { id: songId } })
      .catch(handleError);
  }

  async albumIdExist(albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });

    if (!album) {
      throw new NotFoundException(`Album with ID '${albumId}' not found`);
    }
  }

  async categoryIdExist(categoryIds: string[]) {
    for (let i of categoryIds) {
      const category = await this.prisma.category.findUnique({
        where: { id: i },
      });

      if (!category) {
        throw new NotFoundException(`Category with ID '${i} not found'`);
      }
    }
  }
}
