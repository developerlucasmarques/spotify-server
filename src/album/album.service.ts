import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all album`;
  }

  findOne(id: string) {
    return `This action returns a #${id} album`;
  }

  update(id: string, dto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: string) {
    return `This action removes a #${id} album`;
  }
}
