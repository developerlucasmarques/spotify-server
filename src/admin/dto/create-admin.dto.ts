import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsString,
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

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do Admin',
    example: 'Abcd@1234',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmação da senha do Admin',
    example: 'Abcd@1234',
  })
  confirmPassword: string;
}
