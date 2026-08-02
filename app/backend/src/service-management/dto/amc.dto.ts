import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateAmcDto {
  @ApiPropertyOptional({ example: 'AMC-2026-3001', description: 'AMC Contract Number' })
  @IsString()
  @IsOptional()
  amcNumber?: string;

  @ApiPropertyOptional({ description: 'Project UUID' })
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({ description: 'Customer UUID' })
  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiPropertyOptional({ example: 'GOLD', default: 'GOLD', description: 'AMC Plan Tier (SILVER, GOLD, PLATINUM, CORPORATE)' })
  @IsString()
  @IsOptional()
  planName?: string;

  @ApiProperty({ example: 45000, description: 'Annual AMC Price in INR' })
  @IsNumber()
  @Min(0)
  annualPrice: number;

  @ApiPropertyOptional({ example: 4, default: 4, description: 'Scheduled Preventive Maintenance Visits Per Year' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  visitsPerYear?: number;

  @ApiPropertyOptional({ example: 'Gold AMC Plan activated including quarterly preventive maintenance & free panel cleaning.', description: 'AMC Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class UpdateAmcDto {
  @ApiPropertyOptional({ example: 'PLATINUM', description: 'Upgraded AMC Plan Tier' })
  @IsString()
  @IsOptional()
  planName?: string;

  @ApiPropertyOptional({ example: 'ACTIVE', description: 'AMC Status (ACTIVE, EXPIRED, RENEWAL_DUE, CANCELLED)' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ example: 'AMC renewed for secondary 1-year term.', description: 'Update Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
