import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Country Name',
    example: 'Brazil',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  @ApiProperty({
    description: 'Country Code',
    example: 'BR',
  })
  code: string;
}
