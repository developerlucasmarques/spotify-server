import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The admin email',
    example: 'admin@admin.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Admin password to login',
    example: 'User#5678@!',
  })
  password: string;
}
