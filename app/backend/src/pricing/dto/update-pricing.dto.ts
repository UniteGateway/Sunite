import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdatePricingDto {
  @ApiPropertyOptional({ example: 2800000, description: 'Base Equipment Cost' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  baseEquipmentCost?: number;

  @ApiPropertyOptional({ example: 450000, description: 'Balance of System (BOS) Cost' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  bosCost?: number;

  @ApiPropertyOptional({ example: 350000, description: 'Installation & Erection Cost' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  installationCost?: number;

  @ApiPropertyOptional({ example: 150000, description: 'Civil Works Cost' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  civilCost?: number;

  @ApiPropertyOptional({ example: 200000, description: 'Electrical Works & Grid Interconnection' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  electricalCost?: number;

  @ApiPropertyOptional({ example: 80000, description: 'Transportation & Logistics' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  transportCost?: number;

  @ApiPropertyOptional({ example: 12.0, description: 'Margin Percentage (%)' })
  @IsNumber()
  @IsOptional()
  marginPercentage?: number;

  @ApiPropertyOptional({ example: 25000, description: 'Discount Amount' })
  @IsNumber()
  @IsOptional()
  discountAmount?: number;

  @ApiPropertyOptional({ example: 'Updated commercial terms for client.', description: 'Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
