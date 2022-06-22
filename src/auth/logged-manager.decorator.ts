import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const LoggedManager = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const Admin = request.ManagerAdmin;

    if (!Admin) {
      throw new UnauthorizedException('User not found or not authorized!');
    }

    if (Admin.manager != true) {
      throw new UnauthorizedException(
        'User does not have permission to access this route!',
      );
    }

    return Admin;
  },
);
