import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const userObject = request.user;

  if (userObject.user.userCategoryName !== 'user') {
    throw new UnauthorizedException(
      'User does not have permission to access this route',
    );
  }

  delete userObject.user.password;

  return userObject;
});
