import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import { UserProfileId } from './dto/logged-profile-type';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginArtistDto } from './dto/login-artist.dto';
import { LoginProfileDto } from './dto/login-profile.dto';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async LoginUser(loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    const { email, password } = loginUserDto;

    const user = await this.prisma.user
      .findUnique({ where: { email } })
      .catch(handleError);

    if (!user) {
      throw new UnauthorizedException('Invalid email and/or password!');
    }

    const isHashValid = await bcrypt.compare(password, user.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Invalid email and/or password!');
    }

    delete user.password;

    return {
      token: this.jwt.sign({ email }),
      user,
    };
  }

  async LoginProfile(user: UserProfileId, loginProfileDto: LoginProfileDto) {
    const email = user.user.email;
    const profileId = loginProfileDto.profileId;

    const profile = await this.prisma.user
      .findUnique({
        where: { email },
        select: {
          profiles: {
            where: {
              id: loginProfileDto.profileId,
            },
          },
        },
      })
      .catch(handleError);

    if (profile.profiles.length === 0) {
      throw new UnauthorizedException('Profile or User not found');
    }

    return {
      token: this.jwt.sign({ email, profileId }),
    };
  }

  async LoginAdmin(loginAdminDto: LoginAdminDto ) {
    const { email, password } = loginAdminDto;

    const admin = await this.prisma.admin
      .findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          userCategory: {
            select: {
              name: true,
            },
          },
        },
      })
      .catch(handleError);

    if (!admin) {
      throw new UnauthorizedException('Invalid email and/or password!');
    }

    const isHashValid = await bcrypt.compare(password, admin.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Invalid email and/or password!');
    }

    delete admin.password;

    return {
      token: this.jwt.sign({ email }),
      admin,
    };
  }

  async LoginArtist(loginArtistDto: LoginArtistDto) {
    const { email, password } = loginArtistDto;

    const artist = await this.prisma.artist
      .findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          userCategory: {
            select: {
              name: true,
            },
          },
          countryRelacion: {
            select: {
              name: true,
            },
          },
        },
      })
      .catch(handleError);

    if (!artist) {
      throw new UnauthorizedException('Invalid email and/or password!');
    }

    const isHashValid = await bcrypt.compare(password, artist.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Invalid email and/or password!');
    }

    delete artist.password;

    return {
      token: this.jwt.sign({ email }),
      artist,
    };
  }
}
