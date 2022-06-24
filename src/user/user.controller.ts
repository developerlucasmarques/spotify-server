import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/admin/entities/admin.entity';
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
  })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List all users',
  })
  findAll(@LoggedAdmin() admin: Admin) {
    return this.userService.findAll();
  }

  @Get('/my-account:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'View logged user account',
  })
  findMyAccount(@LoggedUser() user: User) {
    return this.userService.findMyAccount(user.id);
  }

  @Get('/search-user:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'View a user by Id',
  })
  findOneUser(@LoggedAdmin() admin: Admin, @Param('id') id: string) {
    return this.userService.findOneUser(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Edit user logged',
  })
  updateMyAccount(@LoggedUser() user: User, @Body() dto: UpdateUserDto) {
    return this.userService.updateMyAccount(user.id, dto);
  }

  @Delete('/delete-my-account:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove user logged',
  })
  deleteMyAccount(@LoggedUser() user: User) {
    return this.userService.deleteMyAccount(user.id);
  }

  @Delete('delete-user:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a user by Id',
  })
  deleteUser(@LoggedAdmin() admin: Admin, @Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
