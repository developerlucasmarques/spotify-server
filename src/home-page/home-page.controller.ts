import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserProfileId } from 'src/auth/dto/logged-profile-type';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { SearchDto } from './dto/search.dto';
import { HomePageService } from './home-page.service';

@ApiTags('home-page')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('/')
export class HomePageController {
  constructor(private readonly homePageService: HomePageService) {}

  @Get()
  @ApiOperation({
    summary: `Returns the user's profile home page, with its playlists and platform playlists, in addition to the music categories`,
  })
  homePage(@LoggedUser() userProfile: UserProfileId) {
    return this.homePageService.homePage(
      userProfile.user.id,
      userProfile.profileId,
    );
  }

  @Post('/search')
  @ApiOperation({
    summary: `Search playlists, albums, songs and artists whose name starts with what you're looking for`,
  })
  @HttpCode(HttpStatus.OK)
  searchPlaylistSongAlbumArtist(@Body() dto: SearchDto) {
    return this.homePageService.searchPlaylistSongAlbumArtist(dto);
  }
}
