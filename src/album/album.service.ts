import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

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
    const albums = await this.prisma.album
      .findMany({
        where: { id: artistId },
        select: { id: true, name: true, image: true },
      })
      .catch(handleError);

    if (albums.length === 0) {
      throw new NotFoundException('No album found');
    }

    return albums;
  }
}
