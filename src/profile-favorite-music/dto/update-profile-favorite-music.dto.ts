import { PartialType } from '@nestjs/swagger';
import { CreateProfileFavoriteMusicDto } from './create-profile-favorite-music.dto';

export class UpdateProfileFavoriteMusicDto extends PartialType(CreateProfileFavoriteMusicDto) {}
