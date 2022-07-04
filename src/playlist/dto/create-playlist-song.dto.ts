import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AddSongPlaylistDto {
  @IsUUID()
  @ApiProperty({
    description: 'id of the playlist you want to add the song to',
    example: '36e8f88f-c079-4cc5-bd74-f8e87669ec99',
  })
  playlistId: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id of the song you want to add to the playlist',
    example: 'd450edf0-48c0-4470-8cf4-34e588103949',
  })
  songId: string;
}
