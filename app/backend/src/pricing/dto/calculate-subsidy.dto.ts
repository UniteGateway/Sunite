import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CalculateSubsidyDto {
  @ApiProperty({ example: 5.0, description: 'Rooftop System Capacity in kWp' })
  @IsNumber()
  @Min(0.1)
  capacityKw: number;

  @ApiPropertyOptional({ example: 'RESIDENTIAL', default: 'RESIDENTIAL', description: 'Category (RESIDENTIAL, COMMERCIAL, INDUSTRIAL, GROUP_HOUSING)' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: 'Maharashtra', description: 'State for regional subsidy top-up' })
  @IsString()
  @IsOptional()
  state?: string;
}
