import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserProfileId } from 'src/auth/dto/logged-profile-type';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { HomePageService } from './home-page.service';

@ApiTags('home-page')
@Controller('/')
export class HomePageController {
  constructor(private readonly homePageService: HomePageService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  homePage(@LoggedUser() userProfile: UserProfileId) {
    return this.homePageService.homePage(
      userProfile.user.id,
      userProfile.profileId,
    );
  }
}
