import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProfileFavoriteMusicService } from './profile-favorite-music.service';
import { CreateProfileFavoriteMusicDto } from './dto/create-profile-favorite-music.dto';
import { UpdateProfileFavoriteMusicDto } from './dto/update-profile-favorite-music.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('profile-favorite-music')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile-favorite-music')
export class ProfileFavoriteMusicController {
  constructor(
    private readonly favoriteMusicService: ProfileFavoriteMusicService,
  ) {}

  @Get(':id')
  findAll(@LoggedUser() user: User, @Param('id') profileId: string) {
    return this.favoriteMusicService.findAll(user.id, profileId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Add a song to a profile',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') profileId: string,
    @Body() dto: CreateProfileFavoriteMusicDto,
  ) {
    return this.favoriteMusicService.update(user.id, profileId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteMusicService.remove(id);
  }
}
