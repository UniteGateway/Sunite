import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { EntityStatus } from '@prisma/client';

export class CreateOrganizationDto {
  @ApiProperty({ example: 'Sunite Enterprise Solar Ltd.', description: 'Company Name' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ example: 'Sunite Enterprise Global Pvt Ltd', description: 'Legal Name' })
  @IsString()
  @IsNotEmpty()
  legalName: string;

  @ApiProperty({ example: '27AAAAA0000A1Z5', description: 'GSTIN / CIN / Tax ID' })
  @IsString()
  @IsNotEmpty()
  taxId: string;

  @ApiPropertyOptional({ example: 'INR', default: 'INR' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiPropertyOptional({ enum: EntityStatus, default: EntityStatus.ACTIVE })
  @IsEnum(EntityStatus)
  @IsOptional()
  status?: EntityStatus;
}
