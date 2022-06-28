import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { verifyConfirmPassword } from 'src/utils/confirm-password.ultil';
import { handleError } from 'src/utils/handle-error.util';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateArtistDto) {
    verifyConfirmPassword(dto.password, dto.confirmPassword);
    delete dto.confirmPassword;
    const data: Prisma.ArtistCreateInput = {
      name: dto.name,
      image: dto.image,
      cpf: dto.cpf,
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
      about: dto.about,
      userCategory: {
        connect: {
          name: 'artist',
        },
      },
      countryRelacion: {
        connect: {
          id: dto.countryId,
        },
      },
    };
    return await this.prisma.artist
      .create({
        data,
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
          userCategory: {
            select: {
              name: true,
            },
          },
          countryRelacion: {
            select: {
              name: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  async findAll() {
    const artists = await this.prisma.artist
      .findMany({
        select: {
          id: true,
          name: true,
          image: true,
        },
      })
      .catch(handleError);

    if (artists.length === 0) {
      throw new NotFoundException('No a artists found');
    }
    return artists;
  }

  async findOne(id: string) {
    const record = await this.prisma.artist
      .findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          image: true,
          countryRelacion: {
            select: {
              name: true,
            },
          },
          musics: {
            take: 5,
            skip: 0,
            select: {
              id: true,
              name: true,
              musicUrl: true,
            },
          },
          albums: {
            take: 4,
            skip: 0,
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          about: true,
        },
      })
      .catch(handleError);

    if (!record) {
      throw new NotFoundException(`Record with Id '${id}' not found!`);
    }

    return record;
  }

  async update(artistId: string, dto: UpdateArtistDto) {
    if (dto.password) {
      verifyConfirmPassword(dto.password, dto.confirmPassword);
    }
    delete dto.confirmPassword;

    await this.prisma.artist.findUnique({ where: { id: artistId } });

    const data: Partial<Artist> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await this.prisma.artist
      .update({
        where: { id: artistId },
        data,
      })
      .catch(handleError);
  }

  async delete(artistId: string) {
    return await this.prisma.artist
      .delete({ where: { id: artistId } })
      .catch(handleError);
  }

  async deleteArtist(id: string) {
    return await this.prisma.artist
      .delete({ where: { id } })
      .catch(handleError);
  }
}
