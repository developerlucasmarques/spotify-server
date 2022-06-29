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

  @IsUUID(undefined, {each: true})
  @ApiProperty({
    description: 'Category id to create the relationship with song',
    example: '["76b73966-928c-407e-8c35-ba327f4d200c", "0eee08d7-8a4b-4751-bdfe-1f0bd61a6987"]',
  })
  categoryId: string[]
}
