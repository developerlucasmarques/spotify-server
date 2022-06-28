import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Music category name',
    example: 'Rock',
  })
  name: string;
}
