import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (user.userCategoryName !== 'user') {
    throw new UnauthorizedException(
      'User does not have permission to access this route',
    );
  }

  delete user.password;

  return user;
});
