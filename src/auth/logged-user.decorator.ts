import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const userObject = request.user;

  if (
    userObject.userCategoryName === 'artist' ||
    userObject.userCategoryName === 'admin' ||
    userObject.userCategoryName === 'manager'
  ) {
    throw new UnauthorizedException(
      'User does not have permission to access this route',
    );
  }

  if (userObject.user.userCategoryName === 'user') {
    delete userObject.user.password;

    return userObject;
  } else {
    throw new UnauthorizedException(
      'User does not have permission to access this route',
    );
  }
});
