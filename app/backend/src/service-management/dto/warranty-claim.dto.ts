import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWarrantyClaimDto {
  @ApiPropertyOptional({ example: 'CLM-2026-8001', description: 'Warranty Claim Number' })
  @IsString()
  @IsOptional()
  claimNumber?: string;

  @ApiPropertyOptional({ description: 'Project UUID' })
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({ description: 'Customer UUID' })
  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiPropertyOptional({ example: 'INVERTER', default: 'INVERTER', description: 'Faulty Equipment Type (INVERTER, SOLAR_MODULE, BATTERY, MONITORING_GATEWAY)' })
  @IsString()
  @IsOptional()
  equipmentType?: string;

  @ApiPropertyOptional({ example: 'SN-INV-2025-889912', description: 'Manufacturer Equipment Serial Number' })
  @IsString()
  @IsOptional()
  serialNumber?: string;

  @ApiProperty({ example: 'IGBT internal failure causing DC bus overvoltage trip.', description: 'Claim Reason & Symptom Details' })
  @IsString()
  @IsNotEmpty()
  claimReason: string;

  @ApiPropertyOptional({ example: 'RMA claim logged with inverter OEM manufacturer for factory replacement.', description: 'Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
