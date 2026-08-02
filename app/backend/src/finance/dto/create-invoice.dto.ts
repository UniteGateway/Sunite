import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateInvoiceDto {
  @ApiPropertyOptional({ example: 'INV-2026-4001', description: 'Unique Invoice Number' })
  @IsString()
  @IsOptional()
  invoiceNumber?: string;

  @ApiPropertyOptional({ example: 'TAX_INVOICE', default: 'TAX_INVOICE', description: 'Invoice Type (PROFORMA, TAX_INVOICE, CREDIT_NOTE, DEBIT_NOTE)' })
  @IsString()
  @IsOptional()
  invoiceType?: string;

  @ApiPropertyOptional({ description: 'Order UUID' })
  @IsString()
  @IsOptional()
  orderId?: string;

  @ApiPropertyOptional({ description: 'Project UUID' })
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({ description: 'Customer UUID' })
  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiProperty({ example: 4500000, description: 'Subtotal Amount in INR' })
  @IsNumber()
  @Min(0)
  subtotal: number;

  @ApiPropertyOptional({ example: 310500, description: 'CGST Amount' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  cgstAmount?: number;

  @ApiPropertyOptional({ example: 310500, description: 'SGST Amount' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  sgstAmount?: number;

  @ApiPropertyOptional({ example: 0, description: 'IGST Amount' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  igstAmount?: number;

  @ApiPropertyOptional({ example: 50000, description: 'TDS Amount' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  tdsAmount?: number;

  @ApiPropertyOptional({ example: '8471', default: '8471', description: 'HSN / SAC Code' })
  @IsString()
  @IsOptional()
  hsnCode?: string;

  @ApiPropertyOptional({ example: 'Tax invoice for 100kW rooftop solar power plant supply & installation.', description: 'Invoice Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class GenerateInvoiceDto {
  @ApiProperty({ description: 'Order UUID or Project UUID to generate invoice for' })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiPropertyOptional({ example: 'TAX_INVOICE', default: 'TAX_INVOICE', description: 'Invoice Type (PROFORMA, TAX_INVOICE)' })
  @IsString()
  @IsOptional()
  invoiceType?: string;

  @ApiPropertyOptional({ example: 'State GST intra-state invoice', description: 'Generation Notes' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
