import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength
} from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @Length(3, 50)
  @ApiProperty({
    description: 'Nome do Admin',
    example: 'Maria Silva',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(13, 14)
  @ApiProperty({
    description: 'CPF do Admin',
    example: '123.123.123-12',
  })
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the user.',
    example: 'admin@admin.com',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do Admin',
    example: 'User#5678@!',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'Confirmação da senha do Admin',
    example: 'User#5678@!',
  })
  confirmPassword: string;


}
