import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum, Min } from 'class-validator';
import { LeadStatus } from '@prisma/client';

export class CreateLeadDto {
  @ApiProperty({ example: 'LEAD-2026-9001', description: 'Unique Lead Number' })
  @IsString()
  @IsNotEmpty()
  leadNumber: string;

  @ApiProperty({ description: 'Customer UUID' })
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiPropertyOptional({ description: 'Assigned User / Sales Executive UUID' })
  @IsString()
  @IsOptional()
  assignedUserId?: string;

  @ApiProperty({ example: 500.0, description: 'kW Capacity Requirement' })
  @IsNumber()
  @Min(0)
  kwRequirement: number;

  @ApiProperty({ example: 'Industrial Metal Sheet Roof', description: 'Roof Type' })
  @IsString()
  @IsNotEmpty()
  roofType: string;

  @ApiProperty({ example: 'MSEDCL', description: 'Electricity Utility DISCOM Name' })
  @IsString()
  @IsNotEmpty()
  utilityCompany: string;

  @ApiPropertyOptional({ enum: LeadStatus, default: LeadStatus.NEW_INQUIRY })
  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus;
}
