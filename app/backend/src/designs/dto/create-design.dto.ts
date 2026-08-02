import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateDesignDto {
  @ApiPropertyOptional({ example: 'DESIGN-2026-5001', description: 'Unique Design Identifier' })
  @IsString()
  @IsOptional()
  designNumber?: string;

  @ApiProperty({ description: 'Survey UUID' })
  @IsString()
  @IsNotEmpty()
  surveyId: string;

  @ApiProperty({ example: 100.0, description: 'Recommended Plant System Capacity in kWp' })
  @IsNumber()
  @Min(0.1)
  systemCapacityKw: number;

  @ApiProperty({ example: '550W Mono PERC Half-Cut Bifacial', description: 'Solar PV Module Specification' })
  @IsString()
  @IsNotEmpty()
  moduleType: string;

  @ApiProperty({ example: 182, description: 'Total Solar Module Count' })
  @IsNumber()
  @Min(1)
  moduleCount: number;

  @ApiProperty({ example: '50kW On-Grid String Inverter', description: 'Inverter Model' })
  @IsString()
  @IsNotEmpty()
  inverterType: string;

  @ApiProperty({ example: 2, description: 'Total Inverter Quantity' })
  @IsNumber()
  @Min(1)
  inverterCount: number;

  @ApiPropertyOptional({ example: 100.1, default: 100.0, description: 'DC Capacity kWp' })
  @IsNumber()
  @IsOptional()
  dcCapacityKw?: number;

  @ApiPropertyOptional({ example: 100.0, default: 100.0, description: 'AC Capacity kW' })
  @IsNumber()
  @IsOptional()
  acCapacityKw?: number;

  @ApiPropertyOptional({ example: 1.2, default: 1.2, description: 'DC / AC Ratio' })
  @IsNumber()
  @IsOptional()
  dcAcRatio?: number;

  @ApiPropertyOptional({ example: 0.78, default: 0.78, description: 'Performance Ratio (PR)' })
  @IsNumber()
  @IsOptional()
  performanceRatio?: number;

  @ApiPropertyOptional({ example: 19.5, default: 19.5, description: 'Capacity Utilization Factor (CUF %)' })
  @IsNumber()
  @IsOptional()
  cufPercent?: number;

  @ApiPropertyOptional({ example: 145000, description: 'Estimated Annual Generation in kWh / Units' })
  @IsNumber()
  @IsOptional()
  estimatedAnnualGenKwh?: number;

  @ApiPropertyOptional({ example: 'DRAFT', default: 'DRAFT', description: 'Status (DRAFT, ENGINEERING_REVIEW, APPROVED, REJECTED, REVISION_REQUIRED)' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ example: '{"modules": 182, "inverters": 2, "dcCableMeters": 450, "acCableMeters": 120}', description: 'Engineering Bill of Quantities (BOQ) JSON' })
  @IsString()
  @IsOptional()
  boqJson?: string;

  @ApiPropertyOptional({ example: 'South facing layout optimized for 0% shade loss.', description: 'Engineering Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
