import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @Length(1, 50)
  @ApiProperty({
    description: 'The name of the artist.',
    example: "Guns N' Roses",
  })
  name: string;

  @IsUrl()
  @Length(1, 300)
  @ApiProperty({
    description: 'The image of the artist.',
    example: 'https://i.scdn.co/image/ab6761610000e5eb50defaf9fc059a1efc541f4c',
  })
  image: string;

  @IsString()
  @Length(11, 14)
  @ApiProperty({
    description: 'The cpf of the artist.',
    example: '321.654.987-01',
  })
  cpf: string;

  @IsEmail()
  @Length(5, 50)
  @ApiProperty({
    description: 'The email of the artist.',
    example: 'artist@artist.com',
  })
  email: string;

  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({
    description: 'The password of the artist.',
    example: 'User#5678@!',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Artist password confirmation',
    example: 'User#5678@!',
  })
  confirmPassword: string;

  @IsString()
  @Length(10, 300)
  @ApiProperty({
    description: 'The about of the artist.',
    example:
      "Guns N' Roses is an American hard rock band formed in Los Angeles, California in 1985. The band has released six studio albums, three EPs and one live album to date. The band sold over 100 million copies worldwide, with around 43 million in the United States alone.",
  })
  about: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The country of the artist.',
    example: 'ac06f36e-4b61-4fe8-8fd6-6ad807ac6282',
  })
  countryId: string;
}
