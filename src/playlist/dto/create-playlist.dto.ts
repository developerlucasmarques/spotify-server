import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreatePlaylistDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Playlist Name',
    example: 'Party',
  })
  name: string;

  @IsNotEmpty()
  @IsUrl()
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

  @IsUUID()
  @ApiProperty({
    description: 'Profile that is creating the playlist.',
    example: '76b73966-928c-407e-8c35-ba327f4d200c',
  })
  profileId: string;
}
