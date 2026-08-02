import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateSparePartDto {
  @ApiProperty({ example: 'SPD-DC-1000V', description: 'Spare Part SKU Code' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: '1000V DC Surge Protection Device (SPD) Module Type 2', description: 'Part Description' })
  @IsString()
  @IsNotEmpty()
  partName: string;

  @ApiPropertyOptional({ example: 'INVERTER_SPARE', default: 'INVERTER_SPARE', description: 'Part Category (INVERTER_SPARE, MODULE_SPARE, CABLING, FUSE, SPD, EARTHING)' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 50, description: 'Initial Warehouse Quantity' })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiPropertyOptional({ example: 10, default: 5, description: 'Stock Reorder Threshold Level' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  reorderLevel?: number;

  @ApiPropertyOptional({ example: 2500, description: 'Unit Cost Price in INR' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  unitPrice?: number;

  @ApiPropertyOptional({ example: 'MAIN_WAREHOUSE', default: 'MAIN_WAREHOUSE', description: 'Storage Warehouse Location' })
  @IsString()
  @IsOptional()
  warehouse?: string;

  @ApiPropertyOptional({ example: 'Compatible with standard 100kW grid-tied triphase inverters.', description: 'Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
