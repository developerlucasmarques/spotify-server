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
import { Admin } from 'src/admin/entities/admin.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { UserProfileId } from './dto/logged-profile-type';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginArtistDto } from './dto/login-artist.dto';
import { LoginProfileDto } from './dto/login-profile.dto';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedAdmin } from './logged-admin.decorator';
import { LoggedArtist } from './logged-artist.decorator';
import { LoggedUser } from './logged-user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in-user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving a validation token - (FOR USER)',
  })
  LoginUser(@Body() loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    return this.authService.LoginUser(loginUserDto);
  }

  @Post('/sign-in-profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Log in, receiving a validation token - (FOR PROFILE)',
  })
  LoginProfile(
    @LoggedUser() user: UserProfileId,
    @Body() loginProfileDto: LoginProfileDto,
  ) {
    return this.authService.LoginProfile(user, loginProfileDto);
  }

  @Post('/sign-in-admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving a validation token - (FOR ADMIN)',
  })
  LoginAdmin(@Body() loginAdminDto: LoginAdminDto) {
    return this.authService.LoginAdmin(loginAdminDto);
  }

  @Post('/sign-in-artist')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving a validation token - (FOR ARTIST)',
  })
  LoginArtist(@Body() loginArtistDto: LoginArtistDto) {
    return this.authService.LoginArtist(loginArtistDto);
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Return user authentication now - (FOR USER)',
  })
  User(@LoggedUser() user: User) {
    return user;
  }

  @Get('/admin')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Return user authentication now - (FOR ADMIN)',
  })
  Admin(@LoggedAdmin() admin: Admin) {
    return admin;
  }

  @Get('/artist')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Return user authentication now - (FOR ARTIST)',
  })
  Artist(@LoggedArtist() artist: Artist) {
    return artist;
  }
}
