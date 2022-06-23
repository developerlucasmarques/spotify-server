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
import { LoginAdminResponseDto } from './dto/login-admin-response.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { LoginDto } from './dto/login-user.dto';
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
  LoginAdmin(@Body() loginAdminDto: LoginAdminDto): Promise<LoginAdminResponseDto> {
    return this.authService.LoginAdmin(loginAdminDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Return user authentication now',
  })
  Profile(@LoggedUser() user: User) {
    return user;
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Return user authentication now',
  })
  Admin(@LoggedUser() admin: Admin) {
    return admin;
  }
}
