import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  private albumSelect = {
    id: true,
    name: true,
    image: true,
    year: true,
    artist: {
      select: {
        id: true,
        name: true,
      },
    },
    songs: {
      select: {
        id: true,
        name: true,
        songUrl: true,
      },
    },
  };

  async create(artistId: string, dto: CreateAlbumDto) {
    this.verifyYearAlbum(dto.year);
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
        select: this.albumSelect,
      })
      .catch(handleError);
  }

  async findOne(albumId: string) {
    const record = await this.prisma.album
      .findUnique({
        where: { id: albumId },
        select: this.albumSelect,
      })
      .catch(handleError);

    if (!record) {
      throw new NotFoundException(`Album with ID '${albumId}' not found`);
    }
    return record;
  }

  async update(artistId: string, albumId: string, dto: UpdateAlbumDto) {
    await this.findOneAlbumInArtist(artistId, albumId);
    this.verifyYearAlbum(dto.year);
    return await this.prisma.album
      .update({
        where: { id: albumId },
        data: { ...dto },
        select: this.albumSelect,
      })
      .catch(handleError);
  }

  async delete(artistId: string, albumId: string) {
    await this.findOneAlbumInArtist(artistId, albumId);
    return await this.prisma.album
      .delete({ where: { id: albumId } })
      .catch(handleError);
  }

  async findOneAlbumInArtist(artistId: string, albumId: string) {
    const albumInArtist = await this.prisma.artist
      .findUnique({
        where: { id: artistId },
        select: {
          albums: {
            where: {
              id: albumId,
            },
          },
        },
      })
      .catch(handleError);

    if (albumInArtist.albums.length === 0) {
      throw new NotFoundException(`Album with ID '${albumId}' not found`);
    }
  }

  verifyYearAlbum(year: Number) {
    if (year < 1900 || year > 2022) {
      throw new BadRequestException(
        'The cannot be less than 1900 or greater than 2022',
      );
    }
  }
}
