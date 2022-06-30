import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class LoginProfileDto {
  @IsUUID()
  @ApiProperty({
    description: 'User profile id',
    example: '0eee08d7-8a4b-4751-bdfe-1f0bd61a6987',
  })
  profileId: string;
}
