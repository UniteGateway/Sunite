import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AssignLeadDto {
  @ApiProperty({ description: 'User UUID to assign lead to' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
