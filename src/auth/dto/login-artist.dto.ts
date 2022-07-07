import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginArtistDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The artist email',
    example: 'artist@artist.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Artist password to login',
    example: 'User#5678@!',
  })
  password: string;
}
