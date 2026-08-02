import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsBoolean } from 'class-validator';

export class CalculatePricingDto {
  @ApiPropertyOptional({ description: 'Solar Design UUID' })
  @IsString()
  @IsOptional()
  designId?: string;

  @ApiProperty({ example: 100.0, description: 'Solar System Capacity in kWp' })
  @IsNumber()
  @Min(0.1)
  capacityKw: number;

  @ApiPropertyOptional({ example: 'COMMERCIAL', default: 'COMMERCIAL', description: 'Category (RESIDENTIAL, COMMERCIAL, INDUSTRIAL, SOLAR_PARK)' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: 'Maharashtra', default: 'Maharashtra', description: 'State for GST / Subsidy calculations' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ example: true, default: false, description: 'Bifacial module flag' })
  @IsBoolean()
  @IsOptional()
  isBifacial?: boolean;
}
