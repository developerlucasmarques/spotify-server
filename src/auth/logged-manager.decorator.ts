import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const LoggedManager = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const admin = request.user;

    if (!admin) {
      throw new UnauthorizedException('User not found or not authorized!');
    }

    if (admin.userCategory.manager !== true) {
      throw new UnauthorizedException(
        'User does not have pessssrmission to access this route!',
      );
    }

    return admin;
  },
);
