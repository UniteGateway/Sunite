import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsEnum } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsString()
  @IsOptional()
  plan?: 'COMMUNITY' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE' | 'UTILITY' | 'GOVERNMENT' | 'DEVELOPER';

  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsString()
  @IsOptional()
  primaryColor?: string;

  @IsBoolean()
  @IsOptional()
  whiteLabel?: boolean;

  @IsNumber()
  @IsOptional()
  maxUsers?: number;

  @IsNumber()
  @IsOptional()
  managedMw?: number;
}

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsString()
  @IsNotEmpty()
  planType: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE' | 'UTILITY';

  @IsString()
  @IsNotEmpty()
  billingCycle: 'MONTHLY' | 'QUARTERLY' | 'HALF_YEARLY' | 'ANNUAL' | 'LIFETIME';

  @IsNumber()
  amountInr: number;

  @IsString()
  @IsOptional()
  paymentGateway?: 'RAZORPAY' | 'STRIPE' | 'PHONEPE' | 'PAYTM' | 'CASHFREE' | 'UPI';

  @IsString()
  @IsOptional()
  couponCode?: string;
}

export class CreateLicenseDto {
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsString()
  @IsNotEmpty()
  licenseType: 'COMMUNITY' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE' | 'UTILITY' | 'GOVERNMENT';

  @IsString()
  @IsNotEmpty()
  featureFlags: string; // e.g. "CRM,ERP,SCADA,AI,FINANCE,INVENTORY,WARRANTY,AMC,BI,API_ACCESS,WHITE_LABEL"

  @IsBoolean()
  @IsOptional()
  isTrial?: boolean;

  @IsNumber()
  @IsOptional()
  validityDays?: number;
}

export class GenerateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  subscriptionId: string;

  @IsNumber()
  amountInr: number;

  @IsString()
  @IsOptional()
  billingPeriod?: string;
}

export class ReportUsageDto {
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsNumber()
  @IsOptional()
  activeUsers?: number;

  @IsNumber()
  @IsOptional()
  managedMw?: number;

  @IsNumber()
  @IsOptional()
  scadaDevices?: number;

  @IsNumber()
  @IsOptional()
  aiRequests?: number;

  @IsNumber()
  @IsOptional()
  apiCalls?: number;
}

export class CreateResellerDto {
  @IsString()
  @IsNotEmpty()
  partnerName: string;

  @IsString()
  @IsNotEmpty()
  contactEmail: string;

  @IsNumber()
  commissionPct: number;

  @IsString()
  @IsOptional()
  region?: string;
}
