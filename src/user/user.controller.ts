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
import { UserProfileId } from 'src/auth/dto/logged-profile-type';
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new user',
  })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List all users - (ONLY ADMIN)',
  })
  findAll(@LoggedAdmin() admin: Admin) {
    return this.userService.findAll();
  }

  @Get('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'View logged user account - (ONLY USER)',
  })
  findMyAccount(@LoggedUser() userProfileId: UserProfileId) {
    return this.userService.findMyAccount(userProfileId.user.id);
  }

  @Get('/search/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'View a user by Id - (ONLY ADMIN)',
  })
  findOneUser(@LoggedAdmin() admin: Admin, @Param('id') id: string) {
    return this.userService.findOneUser(id);
  }

  @Patch('update-my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Edit user logged - (ONLY USER)',
  })
  updateMyAccount(
    @LoggedUser() userProfileId: UserProfileId,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateMyAccount(userProfileId.user.id, dto);
  }

  @Patch('update-my-plan')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Edit user plan logged - (ONLY USER)',
  })
  updateMyPlan(
    @LoggedUser() userProfileId: UserProfileId,
    @Body() dto: UpdatePlanDto,
  ) {
    return this.userService.updateMyPlan(userProfileId.user.id, dto);
  }

  @Delete('/delete-my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove user logged - (ONLY USER)',
  })
  deleteMyAccount(@LoggedUser() userProfileId: UserProfileId) {
    return this.userService.deleteMyAccount(userProfileId.user.id);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a user by Id - (ONLY ADMIN)',
  })
  deleteUser(@LoggedAdmin() admin: Admin, @Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
