import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @ApiProperty({
    description: 'The name of the user.',
    example: 'Gustavo Martins',
  })
  name: string;

  @IsOptional()
  @IsString()
  @Length(11, 14)
  @ApiProperty({
    description: 'The cpf of the user',
    example: '123.456.789-10',
  })
  cpf: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user.',
    example: 'user@user.com',
  })
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({
    description: 'The password of the user.',
    example: 'User#5678@!',
  })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User password confirmation',
    example: 'User#5678@!',
  })
  confirmPassword: string;
}
