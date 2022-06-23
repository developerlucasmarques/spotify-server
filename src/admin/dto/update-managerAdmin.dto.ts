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
    example: 'Abcd@1234',
  })
  password?: string;

  @IsString()
  @ApiProperty({
    description: 'Confirmação da senha do Admin',
    example: 'Abcd@1234',
  })
  confirmPassword?: string;
}
