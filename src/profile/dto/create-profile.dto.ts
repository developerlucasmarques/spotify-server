import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Profile Name',
    example: 'Barack Obama',
  })
  name: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'Profile picture URL',
    example: 'https://profileimage.jpg',
  })
  image: string;
}
