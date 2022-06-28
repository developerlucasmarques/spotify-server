import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateProfileFavoriteMusicDto } from './dto/create-profile-favorite-music.dto';
import { ProfileFavoriteMusicService } from './profile-favorite-music.service';

@ApiTags('profile-favorite-music')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile-favorite-music')
export class ProfileFavoriteMusicController {
  constructor(
    private readonly favoriteMusicService: ProfileFavoriteMusicService,
  ) {}

  @Get('find-all-favorites/:profileID')
  @ApiOperation({
    summary: 'Fetch all favorite songs from profile (user)',
  })
  findAll(@LoggedUser() user: User, @Param('profileID') profileId: string) {
    return this.favoriteMusicService.findAll(user.id, profileId);
  }

  @Patch('add-favorite/:profileID/:musicID')
  @ApiOperation({
    summary: 'Add a song to a profile (user)',
  })
  update(
    @LoggedUser() user: User,
    @Param('profileID') profileId: string,
    @Param('musicID') musicIdD: string,
  ) {
    return this.favoriteMusicService.update(user.id, profileId, musicIdD);
  }

  @Patch('remove-favorite/:profileID/:musicID')
  @ApiOperation({
    summary: 'Remove a song to a profile (user)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @LoggedUser() user: User,
    @Param('profileID') profileId: string,
    @Param('musicID') musicIdDto: string,
  ) {
    return this.favoriteMusicService.delete(user.id, profileId, musicIdDto);
  }
}
