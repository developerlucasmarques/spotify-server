import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(50)
  @ApiProperty({
    description: 'Music category name',
    example: 'Rock',
  })
  name: string;
}
