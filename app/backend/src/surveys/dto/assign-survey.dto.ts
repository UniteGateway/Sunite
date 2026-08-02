import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AssignSurveyDto {
  @ApiProperty({ description: 'Survey Engineer User UUID' })
  @IsString()
  @IsNotEmpty()
  engineerId: string;
}
