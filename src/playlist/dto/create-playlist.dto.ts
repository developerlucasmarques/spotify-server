import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
  Length,
} from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  @Length(1, 50)
  @ApiProperty({
    description: 'Playlist Name',
    example: 'Party',
  })
  name: string;

  @IsUrl()
  @Length(1, 50)
  @ApiProperty({
    description: 'Playlist picture URL',
    example: 'https://playlistimage.jpg',
  })
  image: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Set whether the playlist will be open to everyone or not',
    example: false,
  })
  private: boolean;
}
