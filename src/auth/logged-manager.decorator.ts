import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const LoggedManager = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const manager = request.user;

    if (!manager) {
      throw new UnauthorizedException('User not found or not authorized!');
    }

    if (manager.userCategoryName !== 'manager') {
      throw new UnauthorizedException(
        'User does not have pessssrmission to access this route!',
      );
    }

    return manager;
  },
);
