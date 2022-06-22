import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class AdminDto {
  @IsString()
  @Length(3, 50)
  @ApiProperty({
    description: 'Nome do Admin',
    example: 'Maria Silva',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'CPF do Admin',
    example: '123.123.123-12',
  })
  cpf: number;
}
