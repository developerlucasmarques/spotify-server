import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: payload.email }
      });

      const admin = await this.prisma.admin.findUnique({
        where: { email: payload.email },
        include: {
          userCategory: {
            select: {
              manager: true,
              admin: true,
            },
          },
        },
      });
      const adminCategory = { userCategory: `${admin.userCategory}` };

      if (!user && !admin) {
        throw new UnauthorizedException('User not found or not authorized!');
      }

      if (user) {
        delete user.password;
        return user;
      }

      if (admin) {
        delete admin.password;
        return [admin, adminCategory];
      }
    } catch (error) {
      handleError(error);
    }
  }
}
