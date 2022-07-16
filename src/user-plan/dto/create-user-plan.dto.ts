import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateUserPlanDto {
  @IsString()
  @Length(2, 30)
  @ApiProperty({
    description: 'The name of the User Plan.',
    example: 'Free',
  })
  name: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The price of the User Plan.',
    example: 0.0,
  })
  price: number;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Number of profiles the user can have.',
    example: 1,
  })
  accounts: number;

  @IsString()
  @Length(10, 500)
  @ApiProperty({
    description: 'The description of the User Plan.',
    example:
      'The free plan brings the entire catalog of songs and podcasts from the platform, but has some restrictions. The most notable is the presence of ads between tracks. In addition, it is not possible to download content for offline playback and, in the mobile version, there is only the possibility to choose the music played from selected playlists.',
  })
  description: string;
}
