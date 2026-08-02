import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateActivityDto {
  @ApiPropertyOptional({ description: 'Customer UUID' })
  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiPropertyOptional({ description: 'Lead UUID' })
  @IsString()
  @IsOptional()
  leadId?: string;

  @ApiPropertyOptional({ description: 'User UUID performing action' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({ example: 'On-site Survey Meeting', description: 'Activity Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Discussed 500kW rooftop installation and DISCOM grid sync.', description: 'Activity Description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'MEETING', description: 'Activity Type (CALL, MEETING, WHATSAPP, EMAIL, NOTE, STAGE_CHANGE)' })
  @IsString()
  @IsNotEmpty()
  activityType: string;
}
