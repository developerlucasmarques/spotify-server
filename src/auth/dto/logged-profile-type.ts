import { IsUUID } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class UserProfileId {
  user: User;

  @IsUUID()
  profileId: string;
}
