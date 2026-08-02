import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateWarrantyDto {
  @ApiPropertyOptional({ example: 'WRN-2026-9001', description: 'Warranty Certificate Number' })
  @IsString()
  @IsOptional()
  warrantyNumber?: string;

  @ApiPropertyOptional({ description: 'Project UUID' })
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({ description: 'Customer UUID' })
  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiPropertyOptional({ example: 25, default: 25, description: 'Solar Panel Warranty Years' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  panelWarrantyYears?: number;

  @ApiPropertyOptional({ example: 10, default: 10, description: 'Inverter Warranty Years' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  inverterWarrantyYears?: number;

  @ApiPropertyOptional({ example: 5, default: 5, description: 'Battery Storage Warranty Years' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  batteryWarrantyYears?: number;

  @ApiPropertyOptional({ example: 10, default: 10, description: 'Mounting Structure Warranty Years' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  structureWarrantyYears?: number;

  @ApiPropertyOptional({ example: 5, default: 5, description: 'Workmanship Warranty Years' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  workmanshipWarrantyYears?: number;

  @ApiPropertyOptional({ example: '25-Year Tier 1 Module & 10-Year Inverter Warranty Activated', description: 'Warranty Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class UpdateWarrantyDto {
  @ApiPropertyOptional({ example: 'ACTIVE', description: 'Warranty Status (ACTIVE, EXPIRED, TRANSFERRED, VOID)' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ example: 'Warranty transferred to new rooftop property owner.', description: 'Update Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
