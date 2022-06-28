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
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { LoginDto } from './dto/login.dto';
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
  LoginUser(@Body() loginDto: LoginDto): Promise<LoginUserResponseDto> {
    return this.authService.LoginUser(loginDto);
  }

  @Post('/sign-in-admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving a validation token - (FOR ADMIN)',
  })
  LoginAdmin(@Body() loginDto: LoginDto) {
    return this.authService.LoginAdmin(loginDto);
  }

  @Post('/sign-in-artist')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving a validation token - (FOR ARTIST)',
  })
  LoginArtist(@Body() loginDto: LoginDto) {
    return this.authService.LoginArtist(loginDto);
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Return user authentication now - (FOR USER)',
  })
  Profile(@LoggedUser() user: User) {
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
