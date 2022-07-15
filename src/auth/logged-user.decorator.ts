import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserProfileId } from './dto/logged-profile-type';

export const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const userObject: UserProfileId = request.user;

  if (userObject.user.userCategoryName !== 'user') {
    throw new UnauthorizedException(
      'User does not have permission to access this route',
    );
  }

  delete userObject.user.password;

  return userObject;
});
