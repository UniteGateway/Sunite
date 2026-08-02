import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateQuotationDto {
  @ApiPropertyOptional({ example: 'QUOT-2026-9001', description: 'Unique Quotation Number' })
  @IsString()
  @IsOptional()
  quotationNumber?: string;

  @ApiPropertyOptional({ example: '1.0', default: '1.0', description: 'Quotation Version' })
  @IsString()
  @IsOptional()
  version?: string;

  @ApiPropertyOptional({ description: 'Parent Quotation ID for version tracking' })
  @IsString()
  @IsOptional()
  parentQuotationId?: string;

  @ApiPropertyOptional({ description: 'Customer UUID' })
  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiPropertyOptional({ description: 'Lead UUID' })
  @IsString()
  @IsOptional()
  leadId?: string;

  @ApiPropertyOptional({ description: 'Survey UUID' })
  @IsString()
  @IsOptional()
  surveyId?: string;

  @ApiPropertyOptional({ description: 'Solar Design UUID' })
  @IsString()
  @IsOptional()
  designId?: string;

  @ApiPropertyOptional({ description: 'Pricing Sheet UUID' })
  @IsString()
  @IsOptional()
  pricingId?: string;

  @ApiPropertyOptional({ description: 'Partner UUID' })
  @IsString()
  @IsOptional()
  partnerId?: string;

  @ApiPropertyOptional({ description: 'Sales Executive User UUID' })
  @IsString()
  @IsOptional()
  salesExecutiveId?: string;

  @ApiProperty({ example: 100.0, description: 'Solar System Capacity in kWp' })
  @IsNumber()
  @Min(0.1)
  systemCapacityKw: number;

  @ApiPropertyOptional({ example: 4500000, description: 'Total Project Gross Price in INR' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  totalProjectCost?: number;

  @ApiPropertyOptional({ example: 621000, description: 'Applicable GST Amount in INR' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  gstAmount?: number;

  @ApiPropertyOptional({ example: 78000, description: 'Eligible Government Subsidy' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  subsidyAmount?: number;

  @ApiPropertyOptional({ example: 5043000, description: 'Net Customer Price Payable' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  netCustomerPrice?: number;

  @ApiPropertyOptional({ example: '10% Advance on Booking, 80% before dispatch, 10% on commissioning', description: 'Payment Milestones' })
  @IsString()
  @IsOptional()
  paymentTerms?: string;

  @ApiPropertyOptional({ example: '25 Years Tier-1 Module Performance, 10 Years Inverter, 5 Years Structure', description: 'Warranty Coverage' })
  @IsString()
  @IsOptional()
  warrantyDetails?: string;

  @ApiPropertyOptional({ example: 'Quotation valid for 30 days from date of issuance.', description: 'Terms & Conditions' })
  @IsString()
  @IsOptional()
  termsAndConditions?: string;

  @ApiPropertyOptional({ example: 'Turnkey 100kW Rooftop Solar Power Plant proposal.', description: 'Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
