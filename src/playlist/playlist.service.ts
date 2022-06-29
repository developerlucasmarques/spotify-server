import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(profileId: string, dto: CreatePlaylistDto) {
    const data: Prisma.PlayListCreateInput = {
      ...dto,
      profile: {
        connect: {
          id: profileId,
        },
      },
    };

    return await this.prisma.playList
      .create({
        data,
        select: {
          id: true,
          name: true,
          image: true,
          profile: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  findAll() {
    return `This action returns all playlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  update(id: number, dto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
