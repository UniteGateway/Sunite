import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiPropertyOptional({ example: 'ORD-2026-8001', description: 'Unique Order Number' })
  @IsString()
  @IsOptional()
  orderNumber?: string;

  @ApiPropertyOptional({ description: 'Quotation UUID' })
  @IsString()
  @IsOptional()
  quotationId?: string;

  @ApiPropertyOptional({ description: 'Customer UUID' })
  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiPropertyOptional({ description: 'Lead UUID' })
  @IsString()
  @IsOptional()
  leadId?: string;

  @ApiPropertyOptional({ description: 'Partner UUID' })
  @IsString()
  @IsOptional()
  partnerId?: string;

  @ApiPropertyOptional({ example: 5121000, description: 'Order Total Net Price in INR' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  totalAmount?: number;

  @ApiPropertyOptional({ example: 'Turnkey 100kW Rooftop Solar Order Confirmed', description: 'Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
