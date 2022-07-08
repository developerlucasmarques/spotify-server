import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:
      'Name or part of the name of an artist, song, playlist or album',
    example: 'Alok',
  })
  search: string;
}
