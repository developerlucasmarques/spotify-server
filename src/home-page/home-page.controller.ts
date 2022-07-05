import { Controller, Get } from '@nestjs/common';
import { UserProfileId } from 'src/auth/dto/logged-profile-type';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { HomePageService } from './home-page.service';

@Controller('home-page')
export class HomePageController {
  constructor(private readonly homePageService: HomePageService) {}

  @Get()
  homePage(@LoggedUser() userProfileId: UserProfileId) {
    return this.homePageService.homePage(userProfileId);
  }
}
