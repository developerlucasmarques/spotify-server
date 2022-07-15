import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  @ApiProperty({
    description: 'Profile Name',
    example: 'Barack Obama',
  })
  name: string;

  @IsNotEmpty()
  @IsUrl()
  @Length(5, 100)
  @ApiProperty({
    description: 'Profile picture URL',
    example: 'https://profileimage.jpg',
  })
  image: string;
}
