import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CalculateCommissionDto {
  @ApiPropertyOptional({ description: 'Partner UUID' })
  @IsString()
  @IsOptional()
  partnerId?: string;

  @ApiPropertyOptional({ description: 'Sales Executive User UUID' })
  @IsString()
  @IsOptional()
  salesExecutiveId?: string;

  @ApiPropertyOptional({ description: 'Project UUID' })
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({ description: 'Order UUID' })
  @IsString()
  @IsOptional()
  orderId?: string;

  @ApiPropertyOptional({ example: 'CHANNEL_PARTNER', default: 'CHANNEL_PARTNER', description: 'Partner Type (MARKETING_PARTNER, SALES_EXECUTIVE, FRANCHISE, CHANNEL_PARTNER, REFERRAL_PARTNER)' })
  @IsString()
  @IsOptional()
  partnerType?: string;

  @ApiProperty({ example: 4500000, description: 'Base Deal / Order Total in INR' })
  @IsNumber()
  @Min(0)
  dealAmount: number;

  @ApiPropertyOptional({ example: 5.0, default: 5.0, description: 'Commission Percentage Rate' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  commissionPct?: number;

  @ApiPropertyOptional({ example: 'Channel partner commission calculation for 100kW deal.', description: 'Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class ReleaseCommissionDto {
  @ApiProperty({ description: 'Commission UUID' })
  @IsString()
  @IsNotEmpty()
  commissionId: string;

  @ApiProperty({ example: 112500, description: 'Amount to release in INR' })
  @IsNumber()
  @Min(1)
  releaseAmount: number;

  @ApiPropertyOptional({ example: 'ADVANCE_RELEASE_50', description: 'Release Stage (ADVANCE_RELEASE_50, FINAL_RELEASE_50)' })
  @IsString()
  @IsOptional()
  stage?: string;

  @ApiPropertyOptional({ example: '50% advance commission released on order advance payment.', description: 'Release Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class CreateVendorBillDto {
  @ApiPropertyOptional({ example: 'BILL-2026-6001', description: 'Vendor Bill / Invoice Number' })
  @IsString()
  @IsOptional()
  billNumber?: string;

  @ApiPropertyOptional({ description: 'Purchase Order UUID' })
  @IsString()
  @IsOptional()
  purchaseOrderId?: string;

  @ApiPropertyOptional({ description: 'Vendor UUID' })
  @IsString()
  @IsOptional()
  vendorId?: string;

  @ApiPropertyOptional({ example: 'Tata Power Solar Systems Ltd', description: 'Vendor Legal Name' })
  @IsString()
  @IsOptional()
  vendorName?: string;

  @ApiProperty({ example: 2500000, description: 'Bill Base Amount in INR' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiPropertyOptional({ example: 450000, description: 'Vendor Bill Tax Amount' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  taxAmount?: number;

  @ApiPropertyOptional({ example: 'Vendor bill submitted for 182x PV module dispatch.', description: 'Bill Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
