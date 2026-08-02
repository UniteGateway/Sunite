import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ApproveQuotationDto {
  @ApiPropertyOptional({ example: 'COMMERCIAL', default: 'COMMERCIAL', description: 'Approval Level (SALES, COMMERCIAL, FINANCE, MANAGEMENT)' })
  @IsString()
  @IsOptional()
  approvalType?: string;

  @ApiPropertyOptional({ example: 'Quotation verified and released for client delivery.', description: 'Approval Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
