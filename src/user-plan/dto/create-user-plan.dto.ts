import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserPlanDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the User Plan.',
    example: 'Free',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The price of the User Plan.',
    example: 0.0,
  })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The number accounts of the User Plan.',
    example: 1,
  })
  accounts: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the User Plan.',
    example:
      'The free plan brings the entire catalog of songs and podcasts from the platform, but has some restrictions. The most notable is the presence of ads between tracks. In addition, it is not possible to download content for offline playback and, in the mobile version, there is only the possibility to choose the music played from selected playlists.',
  })
  description: string;
}
