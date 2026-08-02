import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class RecordServiceVisitDto {
  @ApiPropertyOptional({ example: 'VST-2026-7001', description: 'Service Visit Reference Number' })
  @IsString()
  @IsOptional()
  visitNumber?: string;

  @ApiPropertyOptional({ description: 'Service Ticket UUID' })
  @IsString()
  @IsOptional()
  serviceTicketId?: string;

  @ApiPropertyOptional({ description: 'Field Service Engineer UUID' })
  @IsString()
  @IsOptional()
  engineerId?: string;

  @ApiPropertyOptional({ example: 'Blown DC Surge Protection Device (SPD) caused by grid surge.', description: 'Technical Diagnosis' })
  @IsString()
  @IsOptional()
  diagnosis?: string;

  @ApiPropertyOptional({ example: 'Replaced 1000V DC SPD module, verified string Voc/Isc, restarted inverter.', description: 'Repair Work Executed' })
  @IsString()
  @IsOptional()
  repairDetails?: string;

  @ApiPropertyOptional({ example: 'https://cdn.sunite.com/service/signatures/cust_sig_7001.png', description: 'Digital Customer Signature Asset URL' })
  @IsString()
  @IsOptional()
  customerSignatureUrl?: string;

  @ApiPropertyOptional({ example: 'https://cdn.sunite.com/service/photos/inverter_repair_01.jpg', description: 'Site Visit Photo Asset URL' })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiPropertyOptional({ example: 'Inverter error cleared. Full AC generation verified.', description: 'Visit Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
