import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ApprovePricingDto {
  @ApiPropertyOptional({ description: 'Pricing Sheet UUID' })
  @IsString()
  @IsOptional()
  pricingId?: string;

  @ApiPropertyOptional({ example: 'COMMERCIAL', default: 'COMMERCIAL', description: 'Approval Stage (SALES, COMMERCIAL, FINANCE, MANAGEMENT)' })
  @IsString()
  @IsOptional()
  approvalType?: string;

  @ApiPropertyOptional({ example: 'Pricing approved for formal customer proposal.', description: 'Approval Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
