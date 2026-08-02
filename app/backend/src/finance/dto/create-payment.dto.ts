import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsBoolean } from 'class-validator';

export class CreatePaymentDto {
  @ApiPropertyOptional({ example: 'PAY-2026-1001', description: 'Payment Reference Number' })
  @IsString()
  @IsOptional()
  paymentNumber?: string;

  @ApiPropertyOptional({ description: 'Order UUID' })
  @IsString()
  @IsOptional()
  orderId?: string;

  @ApiPropertyOptional({ description: 'Project UUID' })
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({ description: 'Invoice UUID' })
  @IsString()
  @IsOptional()
  invoiceId?: string;

  @ApiPropertyOptional({ description: 'Customer UUID' })
  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiProperty({ example: 500000, description: 'Payment Amount in INR' })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiPropertyOptional({ example: 'ADVANCE', default: 'ADVANCE', description: 'Payment Type (BOOKING, ADVANCE, MILESTONE, FINAL)' })
  @IsString()
  @IsOptional()
  paymentType?: string;

  @ApiPropertyOptional({ example: 'ONLINE', default: 'ONLINE', description: 'Payment Method (ONLINE, BANK_TRANSFER, NEFT, RTGS, UPI, CHEQUE, CASH)' })
  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @ApiPropertyOptional({ example: 'TXN-RAZORPAY-998811', description: 'External Transaction Reference' })
  @IsString()
  @IsOptional()
  transactionRef?: string;

  @ApiPropertyOptional({ example: 'Booking advance received via UPI/Online Gateway.', description: 'Payment Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class RefundPaymentDto {
  @ApiProperty({ description: 'Original Payment UUID to Refund' })
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @ApiProperty({ example: 50000, description: 'Refund Amount in INR' })
  @IsNumber()
  @Min(1)
  refundAmount: number;

  @ApiPropertyOptional({ example: 'Customer cancellation requested within cooling period.', description: 'Refund Reason' })
  @IsString()
  @IsOptional()
  reason?: string;
}
