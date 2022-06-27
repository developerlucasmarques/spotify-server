import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateProfileFavoriteMusicDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id of the song to be favorited',
    example: '5ec96e39-7a1a-4202-b593-c6df1b67f0eb',
  })
  songID: string;
}
