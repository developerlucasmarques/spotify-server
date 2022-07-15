import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @ApiProperty({
    description: 'The name of the user.',
    example: 'Gustavo Martins',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  @ApiProperty({
    description: 'The cpf of the user',
    example: '123.456.789-10',
  })
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(5, 50)
  @ApiProperty({
    description: 'The email of the user.',
    example: 'user@user.com',
  })
  email: string;

  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({
    description: 'The password of the user.',
    example: 'User#5678@!',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'User password confirmation',
    example: 'User#5678@!',
  })
  confirmPassword: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id of any of the plans available on the platform',
    example: '11f38851-afc7-41ae-b2d7-11781579099a',
  })
  userPlanId: string;
}
