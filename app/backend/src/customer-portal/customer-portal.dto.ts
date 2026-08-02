import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEmail, IsEnum } from 'class-validator';

export class ProcessCustomerPaymentDto {
  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  paymentMethod: 'UPI' | 'NET_BANKING' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'RAZORPAY' | 'PHONEPE';
}

export class CreateServiceTicketDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  category: 'INVERTER_FAULT' | 'GRID_TRIP' | 'PANEL_CLEANING' | 'BILLING_QUERY' | 'GENERAL_MAINTENANCE';

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export class CreateReferralDto {
  @IsString()
  @IsNotEmpty()
  referrerName: string;

  @IsEmail()
  referrerEmail: string;

  @IsString()
  @IsNotEmpty()
  friendName: string;

  @IsString()
  @IsNotEmpty()
  friendPhone: string;

  @IsEmail()
  @IsOptional()
  friendEmail?: string;

  @IsNumber()
  @IsOptional()
  estimatedCapacityKw?: number;
}

export class AiAssistantQueryDto {
  @IsString()
  @IsNotEmpty()
  query: string;

  @IsString()
  @IsOptional()
  category?: 'GENERATION' | 'TROUBLESHOOTING' | 'INVOICE' | 'WARRANTY' | 'ENERGY_SAVING' | 'PLANT_PERFORMANCE';
}
