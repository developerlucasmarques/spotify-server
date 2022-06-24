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
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoggedAdmin } from './logged-admin.decorator';
import { LoggedUser } from './logged-user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving a validation token',
  })
  LoginUser(@Body() loginDto: LoginDto): Promise<LoginUserResponseDto> {
    return this.authService.LoginUser(loginDto);
  }

  @Post('/admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving a validation token',
  })
  LoginAdmin(@Body() loginDto: LoginDto) {
    return this.authService.LoginAdmin(loginDto);
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Return user authentication now',
  })
  Profile(@LoggedUser() user: User) {
    return user;
  }

  @Get('/admin')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Return user authentication now',
  })
  Admin(@LoggedAdmin() admin: Admin) {
    return admin;
  }
}
