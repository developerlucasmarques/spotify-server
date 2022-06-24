import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches, MinLength } from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  @Length(3, 50)
  @ApiProperty({
    description: 'Nome do Admin',
    example: 'Maria Silva',
  })
  name?: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do Admin',
    example: 'User#5678@!',
  })
  password?: string;

  @IsString()
  @ApiProperty({
    description: 'Confirmação da senha do Admin',
    example: 'User#5678@!',
  })
  confirmPassword?: string;
}
