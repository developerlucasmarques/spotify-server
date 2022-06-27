import { PartialType } from '@nestjs/swagger';
import { CreateFavoriteMusicDto } from './create-favorite-music.dto';

export class UpdateFavoriteMusicDto extends PartialType(CreateFavoriteMusicDto) {}
