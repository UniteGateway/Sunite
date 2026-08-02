import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Max, IsBoolean } from 'class-validator';

export class CreateCustomerFeedbackDto {
  @ApiPropertyOptional({ example: 'FDB-2026-1001', description: 'Feedback Record Number' })
  @IsString()
  @IsOptional()
  feedbackNumber?: string;

  @ApiPropertyOptional({ description: 'Service Ticket UUID' })
  @IsString()
  @IsOptional()
  serviceTicketId?: string;

  @ApiPropertyOptional({ description: 'Customer UUID' })
  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiProperty({ example: 5, description: 'Overall Service Rating (1-5 Stars)' })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({ example: 10, default: 10, description: 'Net Promoter Score (0-10)' })
  @IsNumber()
  @Min(0)
  @Max(10)
  @IsOptional()
  npsScore?: number;

  @ApiPropertyOptional({ example: 'Prompt engineer arrival and excellent resolution of inverter fault.', description: 'Customer Review Text' })
  @IsString()
  @IsOptional()
  review?: string;

  @ApiPropertyOptional({ example: true, default: true, description: 'Permission to contact for customer referrals' })
  @IsBoolean()
  @IsOptional()
  referralPermission?: boolean;
}
