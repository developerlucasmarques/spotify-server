import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}
  async create(artistId: string, dto: CreateAlbumDto) {
    const data: Prisma.AlbumCreateInput = {
      ...dto,
      artist: {
        connect: {
          id: artistId,
        },
      },
    };

    return await this.prisma.album
      .create({
        data,
        select: {
          id: true,
          name: true,
          image: true,
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

  async findAll(artistId: string) {
    const albums = await this.prisma.artist
      .findMany({
        where: { id: artistId },
        select: {
          name: true,
          albums: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      })
      .catch(handleError);

    if (albums.length === 0) {
      throw new NotFoundException('No album found');
    }

    return albums;
  }

  async findOne(artistId: string, albumId: string) {
    return await this.findOneAlbumInArtist(artistId, albumId);
  }

  async findOneAlbumInArtist(artistId: string, albumId: string) {
    const record = await this.prisma.artist
      .findUnique({
        where: { id: artistId },
        select: {
          albums: {
            where: {
              id: albumId,
            },
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      })
      .catch(handleError);

    if (record.albums.length === 0) {
      throw new NotFoundException(`Album with ID '${albumId}' not found`);
    }
    return record;
  }
}
