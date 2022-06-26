import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of Album',
    example: 'Use Yoru Illusion I',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Album release year',
    example: 1991,
  })
  year: number;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'Image Url of Album',
    example: 'https://image-album.jpg',
  })
  image: string;
}
