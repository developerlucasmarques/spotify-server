import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const LoggedAdmin = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const admin = request.user;

  if (!admin) {
    throw new UnauthorizedException('User not found or not authorized!');
  }

  if (admin.userCategoryName !== 'admin') {
    throw new UnauthorizedException(
      'User does not have permission to access this route!',
    );
  }

  return admin;
});
