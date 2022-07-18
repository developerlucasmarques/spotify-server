import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, Length, MaxLength } from 'class-validator';

export class UpdateSongDto {
  @IsString()
  @Length(1, 50)
  @ApiProperty({
    description: 'The name of the song.',
    example: 'Right Next Door to Hell',
  })
  name: string;

  @IsUrl()
  @MaxLength(2000)
  @ApiProperty({
    description: 'The url of the song.',
    example: 'https://youtu.be/Zqo7j2yFoFs',
  })
  songUrl: string;
}
