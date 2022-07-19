import { BadRequestException } from '@nestjs/common';

export const verifyProfileIdInToken = (profileId: string) => {
  if (!profileId) {
    throw new BadRequestException('Profile ID not informed in the token');
  }
};
