import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { ProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: ProfileDto) {
    try {
      const data: Prisma.ProfileCreateInput = {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      };

      return this.prisma.profile.create({
        data,
        select: {
          id: true,
          name: true,
          image: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    } catch (error) {
      handleError(error);
    }
  }
}
