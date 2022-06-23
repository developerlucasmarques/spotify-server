import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The user CPF',
    example: '123.123.123-12',
  })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Admin password to login',
    example: 'Abcd@1234',
  })
  password: string;
}
