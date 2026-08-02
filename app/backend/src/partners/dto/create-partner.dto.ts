import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { EntityStatus } from '@prisma/client';

export class CreatePartnerDto {
  @ApiProperty({ description: 'Organization UUID' })
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({ example: 'PARTNER-EPC-02', description: 'Unique Partner Code' })
  @IsString()
  @IsNotEmpty()
  partnerCode: string;

  @ApiProperty({ example: 'Maharastra EPC Solar Corp', description: 'Partner Company Name' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ example: 'EPC Contractor', description: 'Partner Type (EPC Contractor, Franchise, Marketing, Vendor)' })
  @IsString()
  @IsNotEmpty()
  partnerType: string;

  @ApiProperty({ example: 'Vikram Shinde', description: 'Contact Person Name' })
  @IsString()
  @IsNotEmpty()
  contactPerson: string;

  @ApiProperty({ example: 'epc@mahasolar.com', description: 'Email Address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+919123456789', description: 'Mobile Number' })
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @ApiPropertyOptional({ example: '27CCCCC2222C1Z9', description: 'GSTIN Identifier' })
  @IsString()
  @IsOptional()
  gstin?: string;

  @ApiPropertyOptional({ enum: EntityStatus, default: EntityStatus.PENDING })
  @IsEnum(EntityStatus)
  @IsOptional()
  status?: EntityStatus;
}
