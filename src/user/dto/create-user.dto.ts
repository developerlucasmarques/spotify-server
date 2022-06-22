import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the user.',
    example: 'Gustavo Martins',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(14)
  @ApiProperty({
    description: 'The cpf of the user',
    example: '123.456.789-10',
  })
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the user.',
    example: 'user@gmail.com',
  })
  email: string;

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
}
