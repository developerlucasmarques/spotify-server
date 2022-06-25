import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the artist.',
    example: 'Alok',
  })
  name: string;

  @IsUrl()
  @ApiProperty({
    description: 'The image of the artist.',
    example:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxfx_RtmsjNV7Mb0-WZmas7PP0nIf7BFUJDxQzIoK0TLsHHSOX7WlRxHi57Q4fz96EfM&usqp=CAU',
  })
  image: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(14)
  @ApiProperty({
    description: 'The cpf of the artist.',
    example: '321.654.987-01',
  })
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the artist.',
    example: 'artist@gmail.com',
  })
  email: string;

  @IsString()
  @MinLength(8)
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
  @IsNotEmpty()
  @ApiProperty({
    description: 'The country of the artist.',
    example: 'User#5678@!',
  })
  country: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The about of the artist.',
    example: 'User#5678@!',
  })
  about: string;
}
