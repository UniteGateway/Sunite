import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class ApplyMarginDto {
  @ApiPropertyOptional({ description: 'Pricing Sheet UUID' })
  @IsString()
  @IsOptional()
  pricingId?: string;

  @ApiProperty({ example: 12.0, description: 'Overall Target Margin Percentage (%)' })
  @IsNumber()
  @Min(0)
  marginPercentage: number;

  @ApiPropertyOptional({ example: 5.0, description: 'Corporate Corporate Margin (%)' })
  @IsNumber()
  @IsOptional()
  corporateMarginPct?: number;

  @ApiPropertyOptional({ example: 4.0, description: 'Branch / Regional Margin (%)' })
  @IsNumber()
  @IsOptional()
  branchMarginPct?: number;

  @ApiPropertyOptional({ example: 3.0, description: 'Franchise / Partner Margin (%)' })
  @IsNumber()
  @IsOptional()
  franchiseMarginPct?: number;
}
