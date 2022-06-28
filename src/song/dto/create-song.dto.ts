import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUrl, IsUUID } from "class-validator"

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the song.',
    example: 'Right Next Door to Hell',
  })
  name: string

  @IsUrl()
  @ApiProperty({
    description: 'The url of the song.',
    example: 'https://youtu.be/Zqo7j2yFoFs',
  })
  songUrl: string

  @IsUUID()
  @ApiProperty({
    description: 'The album of the song.',
    example: '',
  })
  albumId: string
}
