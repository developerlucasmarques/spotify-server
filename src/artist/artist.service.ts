import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  private artistSelect = {
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
  };

  async create(dto: CreateArtistDto) {
    verifyConfirmPassword(dto.password, dto.confirmPassword);
    delete dto.confirmPassword;

    await this.verifyCountryIdExist(dto.countryId);

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
        select: this.artistSelect,
      })
      .catch(handleError);
  }

  async homePage(artistId: string) {
    const record = await this.prisma.artist
      .findUnique({
        where: { id: artistId },
        select: {
          songs: {
            take: 5,
            skip: 0,
            select: {
              id: true,
              name: true,
              songUrl: true,
            },
          },
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

    if (record.songs.length === 0 && record.albums.length === 0) {
      throw new NotFoundException('No song or album found');
    }

    return record;
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
          songs: {
            take: 5,
            skip: 0,
            select: {
              id: true,
              name: true,
              songUrl: true,
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
      throw new NotFoundException(`Artist with Id '${id}' not found!`);
    }

    return record;
  }

  async findOneByArtist(artistId: string) {
    const artistDiscography = await this.prisma.artist
      .findUnique({
        where: { id: artistId },
        select: {
          id: true,
          name: true,
          albums: {
            select: {
              _count: true,
              id: true,
              name: true,
              image: true,
              year: true,
              songs: {
                select: {
                  id: true,
                  name: true,
                  songUrl: true,
                },
              },
            },
          },
        },
      })
      .catch(handleError);

    if (!artistDiscography) {
      throw new NotFoundException(`Artist with ID '${artistId} not found'`);
    }

    if (artistDiscography.albums.length === 0) {
      throw new NotFoundException('No song found');
    }

    return artistDiscography;
  }

  async update(artistId: string, dto: UpdateArtistDto) {
    if (
      !dto.name &&
      !dto.image &&
      !dto.about &&
      !dto.confirmPassword &&
      !dto.countryId &&
      !dto.cpf &&
      !dto.email &&
      !dto.password
    ) {
      throw new BadRequestException('No fields were informed to update');
    }
    if (dto.password) {
      verifyConfirmPassword(dto.password, dto.confirmPassword);
    }
    delete dto.confirmPassword;

    await this.verifyCountryIdExist(dto.countryId);

    await this.prisma.artist.findUnique({ where: { id: artistId } });

    const data: Partial<Artist> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await this.prisma.artist
      .update({
        where: { id: artistId },
        data,
        select: this.artistSelect,
      })
      .catch(handleError);
  }

  async delete(artistId: string) {
    return await this.prisma.artist
      .delete({ where: { id: artistId } })
      .catch(handleError);
  }

  async deleteArtist(id: string) {
    await this.findOneArtist(id);
    return await this.prisma.artist
      .delete({ where: { id } })
      .catch(handleError);
  }

  async verifyCountryIdExist(countryId: string) {
    const country = await this.prisma.country.findUnique({
      where: { id: countryId },
    });

    if (!country) {
      throw new NotFoundException(`Country with id ${countryId} not found`);
    }
  }

  async findOneArtist(artistId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with ID '${artistId}' not found`);
    }
  }
}
