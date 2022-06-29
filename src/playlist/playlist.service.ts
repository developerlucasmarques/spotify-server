import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreatePlaylistDto) {
    await this.findOneProfileInUser(userId, dto.profileId);
    const data: Prisma.PlayListCreateInput = {
      name: dto.name,
      image: dto.image,
      private: dto.private,
      profile: {
        connect: {
          id: dto.profileId,
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
            },
          },
        },
      })
      .catch(handleError);
  }

  async profilePlayLists(userId: string, dto: UpdatePlaylistDto) {
    await this.findOneProfileInUser(userId, dto.profileId);
    const playLists = await this.prisma.profile.findUnique({
      where: { id: dto.profileId },
      select: {
        playlists: {
          select: {
            id: true,
            name: true,
            image: true,
            private: true,
          },
        },
      },
    });

    if (playLists.playlists.length === 0) {
      throw new NotFoundException('No playlist found');
    }
    return playLists;
  }

  findOne(id: string) {
    return `This action returns a #${id} playlist`;
  }

  update(id: string, dto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: string) {
    return `This action removes a #${id} playlist`;
  }

  async findOneProfileInUser(userId: string, profileId: string) {
    const record = await this.prisma.user
      .findUnique({
        where: { id: userId },
        select: {
          profiles: {
            where: {
              id: profileId,
            },
          },
        },
      })
      .catch(handleError);

    if (record.profiles.length === 0) {
      throw new NotFoundException(`Profile with ID '${profileId}' not found`);
    }
  }
}
