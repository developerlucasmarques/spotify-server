import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const LoggedArtist = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const artist = request.user;

  if (!artist) {
    throw new UnauthorizedException('User not found or not authorized!');
  }

  if (artist.userCategoryName !== 'artist') {
    throw new UnauthorizedException(
      'User does not have permission to access this route!',
    );
  }

  return artist;
});
