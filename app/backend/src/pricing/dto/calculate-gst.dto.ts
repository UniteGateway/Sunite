import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsBoolean, Min } from 'class-validator';

export class CalculateGstDto {
  @ApiProperty({ example: 4500000, description: 'Base Taxable Commercial Amount in INR' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiPropertyOptional({ example: 'Maharashtra', default: 'Maharashtra', description: 'State' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ example: false, default: false, description: 'Inter-state transaction (IGST vs CGST+SGST)' })
  @IsBoolean()
  @IsOptional()
  isInterState?: boolean;

  @ApiPropertyOptional({ example: 13.8, default: 13.8, description: 'Custom mixed GST rate (%)' })
  @IsNumber()
  @IsOptional()
  gstRate?: number;
}
