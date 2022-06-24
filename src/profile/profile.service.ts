import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateProfileDto) {
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

  async findAll(userId: string) {
    try {
      return await this.prisma.profile.findMany({
        where: { userId: userId },
        select: {
          id: true,
          name: true,
          image: true,
        },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(userId: string, profileId: string) {
    try {
      return this.findOneProfileInUser(userId, profileId);
    } catch (error) {
      handleError(error);
    }
  }

  async update(userId: string, profileId: string, dto: UpdateProfileDto) {
    try {
      this.findOneProfileInUser(userId, profileId);

      const data: Partial<Profile> = { ...dto };

      return await this.prisma.profile.update({
        where: { id: profileId },
        data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findOneProfileInUser(userId: string, profileId: string) {
    try {
      const userProfile = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          profiles: {
            where: {
              id: profileId,
            },
          },
        },
      });

      if (userProfile.profiles.length === 0) {
        throw new NotFoundException('Profile not found');
      }

      return userProfile.profiles;
    } catch (error) {
      handleError(error);
    }
  }
}
