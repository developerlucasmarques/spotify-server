import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdatePlanDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Id of any of the plans available on the platform',
    example: '11f38851-afc7-41ae-b2d7-11781579099a',
  })
  userPlanId: string;
}
