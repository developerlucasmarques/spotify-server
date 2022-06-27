import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUrl, IsUUID } from "class-validator"

export class CreateMusicDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the music.',
    example: 'Right Next Door to Hell',
  })
  name: string

  @IsUrl()
  @ApiProperty({
    description: 'The url of the music.',
    example: 'https://youtu.be/Zqo7j2yFoFs',
  })
  musicUrl: string

  @IsUUID()
  @ApiProperty({
    description: 'The album of the music.',
    example: '',
  })
  albumId: string
}
