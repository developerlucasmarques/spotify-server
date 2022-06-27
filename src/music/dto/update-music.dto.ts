import { PartialType } from '@nestjs/swagger';
import { CreateMusicDto } from './create-music.dto';

export class UpdateMusicDto extends PartialType(CreateMusicDto) {}
