import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async LoginUser(loginDto: LoginDto): Promise<LoginUserResponseDto> {
    try {
      const { email, password } = loginDto;

      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new UnauthorizedException('Invalid email and/or password!');
      }

      const isHashValid = await bcrypt.compare(password, user.password);

      if (!isHashValid) {
        throw new UnauthorizedException('Imvalid email and/or password!');
      }

      delete user.password;

      return {
        token: this.jwt.sign({ email }),
        user,
      };
    } catch (error) {
      handleError(error);
    }
  }

  async LoginAdmin(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      const admin = await this.prisma.admin.findUnique({
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
      });

      if (!admin) {
        throw new UnauthorizedException('Invalid CPF and/or password!');
      }

      const isHashValid = await bcrypt.compare(password, admin.password);

      if (!isHashValid) {
        throw new UnauthorizedException('Imvalid CPF and/or password!');
      }

      delete admin.password;

      return {
        token: this.jwt.sign({ email }),
        admin,
      };
    } catch (error) {
      handleError(error);
    }
  }
}
