import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches
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
  @Length(11, 14)
  @ApiProperty({
    description: 'CPF do Admin',
    example: '123.123.123-12',
  })
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(5, 50)
  @ApiProperty({
    description: 'The email of the user.',
    example: 'admin@admin.com',
  })
  email: string;

  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do Admin',
    example: 'User#5678@!',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Confirmação da senha do Admin',
    example: 'User#5678@!',
  })
  confirmPassword: string;
}
