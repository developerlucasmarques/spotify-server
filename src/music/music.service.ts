import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';

@Injectable()
export class MusicService {
  constructor(private readonly prisma: PrismaService) {}

  async create(artistId: string, dto: CreateMusicDto) {
    const data: Prisma.MusicCreateInput = {
      name: dto.name,
      musicUrl: dto.musicUrl,
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
    };

    return this.prisma.music
      .create({
        data,
        select: {
          id: true,
          name: true,
          musicUrl: true,
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
        },
      })
      .catch(handleError);
  }

  async findAll() {
    const musics = await this.prisma.music
      .findMany({
        select: {
          id: true,
          name: true,
          musicUrl: true,
          artist: {
            select: {
              name: true,
            },
          },
        },
      })
      .catch(handleError);

    if (musics.length === 0) {
      throw new NotFoundException('No music found');
    }

    return musics;
  }

  async findById(artistId: string, musicId: string) {
    const record = await this.prisma.artist
      .findUnique({
        where: { id: artistId },
        select: {
          musics: {
            where: {
              id: musicId,
            },
            select: {
              id: true,
              name: true,
              musicUrl: true,
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

    if (record.musics.length === 0) {
      throw new NotFoundException(`Music with ID '${musicId}' not found`);
    }

    return record;
  }

  async findOne(musicId: string) {
    return await this.prisma.music
      .findUnique({
        where: { id: musicId },
        select: {
          id: true,
          name: true,
          musicUrl: true,
          artist: {
            select: {
              name: true,
              image: true,
            },
          },
          album: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  async findOneByArtsit(musicId: string) {
    const musics = await this.prisma.artist
      .findMany({
        where: { id: musicId },
        select: {
          musics: {
            select: {
              id: true,
              name: true,
              musicUrl: true,
            },
          },
        },
      })
      .catch(handleError);

    if (musics.length === 0) {
      throw new NotFoundException('No music found');
    }

    return musics;
  }

  async findMusicsArtist(artistId: string) {
    const musics = await this.prisma.artist
      .findMany({
        where: { id: artistId },
        select: {
          musics: {
            select: {
              id: true,
              name: true,
              musicUrl: true,
            },
          },
        },
      })
      .catch(handleError);

    if (musics.length === 0) {
      throw new NotFoundException('No music found');
    }

    return musics;
  }

  async update(artistdId: string, musicId: string, dto: UpdateMusicDto) {
    await this.findById(artistdId, musicId);
    return await this.prisma.music
      .update({
        where: { id: musicId },
        data: { ...dto },
        select: {
          id: true,
          name: true,
          musicUrl: true,
        },
      })
      .catch(handleError);
  }

  async delete(artistId: string, musicId: string) {
    await this.findById(artistId, musicId);
    return await this.prisma.music
      .delete({ where: { id: musicId } })
      .catch(handleError);
  }
}
