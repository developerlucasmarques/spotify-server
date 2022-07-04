import { BadRequestException } from '@nestjs/common';

export const verifyConfirmPassword = (
  password: string,
  confirmPassword: string,
): void => {
  if (password !== confirmPassword) {
    throw new BadRequestException('The passwords entered are not the same!');
  }
};
