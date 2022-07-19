import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches
} from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @ApiProperty({
    description: 'Nome do Admin',
    example: 'Maria Silva',
  })
  name?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 50)
  @ApiProperty({
    description: 'The email of the user.',
    example: 'admin@admin.com',
  })
  email: string;

  @IsOptional()
  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do Admin',
    example: 'User#5678@!',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Confirmação da senha do Admin',
    example: 'User#5678@!',
  })
  confirmPassword?: string;
}
