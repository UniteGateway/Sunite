import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsEnum, IsNumber, Min } from 'class-validator';
import { EntityStatus } from '@prisma/client';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Organization UUID' })
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({ example: 'CUST-2026-101', description: 'Unique Customer Code' })
  @IsString()
  @IsNotEmpty()
  customerCode: string;

  @ApiProperty({ example: 'Apex Logistics Parks Pvt Ltd', description: 'Full Customer / Company Name' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'contact@apexlogistics.com', description: 'Primary Email Address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+919988776655', description: 'Mobile Number' })
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @ApiPropertyOptional({ example: '27BBBBB1111B1Z2', description: 'GSTIN Identifier' })
  @IsString()
  @IsOptional()
  gstin?: string;

  @ApiProperty({ example: 'Pune', description: 'City' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'Maharashtra', description: 'State' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiPropertyOptional({ example: 500.0, default: 10.0, description: 'Sanctioned Solar kW' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  sanctionedKw?: number;

  @ApiPropertyOptional({ enum: EntityStatus, default: EntityStatus.ACTIVE })
  @IsEnum(EntityStatus)
  @IsOptional()
  status?: EntityStatus;
}
