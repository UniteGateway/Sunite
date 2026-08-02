import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, Min } from 'class-validator';

export class CreateSurveyDto {
  @ApiProperty({ example: 'SURVEY-2026-7001', description: 'Unique Survey Number' })
  @IsString()
  @IsNotEmpty()
  surveyNumber: string;

  @ApiProperty({ description: 'Lead UUID' })
  @IsString()
  @IsNotEmpty()
  leadId: string;

  @ApiPropertyOptional({ description: 'Assigned Survey Engineer User UUID' })
  @IsString()
  @IsOptional()
  engineerId?: string;

  @ApiPropertyOptional({ example: 450.5, default: 0.0, description: 'Usable Roof Area (sq. ft / sq. m)' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  usableRoofArea?: number;

  @ApiPropertyOptional({ example: 180.0, default: 180.0, description: 'Azimuth orientation in degrees' })
  @IsNumber()
  @IsOptional()
  azimuthDeg?: number;

  @ApiPropertyOptional({ example: 20.0, default: 20.0, description: 'Tilt angle in degrees' })
  @IsNumber()
  @IsOptional()
  tiltAngleDeg?: number;

  @ApiPropertyOptional({ example: 100.0, default: 0.0, description: 'Sanctioned load in kW' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  sanctionedLoad?: number;

  @ApiPropertyOptional({ example: 'No major shading from east or west towers.', description: 'Shading Analysis Report' })
  @IsString()
  @IsOptional()
  shadingReport?: string;

  @ApiPropertyOptional({ example: true, default: true, description: 'Feasibility status' })
  @IsBoolean()
  @IsOptional()
  isFeasible?: boolean;

  @ApiPropertyOptional({ example: 'SCHEDULED', default: 'SCHEDULED', description: 'Status (SCHEDULED, ASSIGNED, IN_PROGRESS, COMPLETED, APPROVED, REJECTED)' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ example: 18.5204, description: 'GPS Latitude' })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({ example: 73.8567, description: 'GPS Longitude' })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiPropertyOptional({ example: 'RCC Concrete Rooftop', description: 'Roof Type' })
  @IsString()
  @IsOptional()
  roofType?: string;

  @ApiPropertyOptional({ example: 'MSEDCL', description: 'DISCOM Utility' })
  @IsString()
  @IsOptional()
  discom?: string;

  @ApiPropertyOptional({ example: '10023456789', description: 'Electricity Consumer Number' })
  @IsString()
  @IsOptional()
  consumerNumber?: string;

  @ApiPropertyOptional({ example: 'Site visit confirmed. Transformer nearby.', description: 'Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
