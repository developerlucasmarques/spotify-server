import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
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

    return this.prisma.music.create({
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
    });
  }

  findAll() {
    return `This action returns all music`;
  }

  findOne(id: number) {
    return `This action returns a #${id} music`;
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return `This action updates a #${id} music`;
  }

  remove(id: number) {
    return `This action removes a #${id} music`;
  }
}
