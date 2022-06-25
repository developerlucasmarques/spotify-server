import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { verifyConfirmPassword } from 'src/utils/confirm-password.ultil';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

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
    return await this.prisma.artist.create({
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
    });
  }

  findAll() {
    return `This action returns all artist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
