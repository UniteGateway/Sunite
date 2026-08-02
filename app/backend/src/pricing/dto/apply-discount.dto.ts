import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class ApplyDiscountDto {
  @ApiPropertyOptional({ description: 'Pricing Sheet UUID' })
  @IsString()
  @IsOptional()
  pricingId?: string;

  @ApiPropertyOptional({ example: 25000, description: 'Flat Discount Amount in INR' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  discountAmount?: number;

  @ApiPropertyOptional({ example: 5.0, description: 'Percentage Discount (%)' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  discountPercentage?: number;

  @ApiPropertyOptional({ example: 'SUMMER_FESTIVAL_2026', description: 'Campaign Promotional Code' })
  @IsString()
  @IsOptional()
  campaignCode?: string;
}
