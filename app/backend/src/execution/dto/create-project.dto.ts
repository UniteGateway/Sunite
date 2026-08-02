import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateProjectDto {
  @ApiPropertyOptional({ example: 'PRJ-2026-7001', description: 'Unique Project Number' })
  @IsString()
  @IsOptional()
  projectNumber?: string;

  @ApiPropertyOptional({ description: 'Order UUID' })
  @IsString()
  @IsOptional()
  orderId?: string;

  @ApiPropertyOptional({ description: 'Quotation UUID' })
  @IsString()
  @IsOptional()
  quotationId?: string;

  @ApiPropertyOptional({ description: 'Customer UUID' })
  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiProperty({ example: 100.0, description: 'Solar Capacity in kWp' })
  @IsNumber()
  @Min(0.1)
  capacityKw: number;

  @ApiPropertyOptional({ description: 'Assigned Project Manager User UUID' })
  @IsString()
  @IsOptional()
  projectManagerId?: string;

  @ApiPropertyOptional({ description: 'Assigned EPC Vendor UUID' })
  @IsString()
  @IsOptional()
  epcVendorId?: string;

  @ApiPropertyOptional({ description: 'Assigned Installation Vendor UUID' })
  @IsString()
  @IsOptional()
  installationVendorId?: string;

  @ApiPropertyOptional({ description: 'Assigned Survey Engineer User UUID' })
  @IsString()
  @IsOptional()
  surveyEngineerId?: string;

  @ApiPropertyOptional({ example: '100kW Industrial Rooftop Solar Execution Project', description: 'Project Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
