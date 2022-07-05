import { Get, Injectable } from '@nestjs/common';
import { UserProfileId } from 'src/auth/dto/logged-profile-type';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomePageService {
  constructor(private readonly prisma: PrismaService) {}

  async homePage(userProfileId: UserProfileId) {
    
  }
}
