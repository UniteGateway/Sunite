import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class RegisterDeveloperDto {
  @IsString()
  @IsNotEmpty()
  orgName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  tier?: string; // TIER_STANDARD, TIER_OEM, TIER_ENTERPRISE_PARTNER
}

export class CreateApiKeyDto {
  @IsString()
  @IsNotEmpty()
  developerId: string;

  @IsString()
  @IsNotEmpty()
  label: string;
}

export class CreatePluginDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  version?: string;

  @IsString()
  @IsNotEmpty()
  permissions: string;
}

export class CreateMarketplaceAppDto {
  @IsString()
  @IsNotEmpty()
  developerId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string; // SOLAR_OEM, BATTERY_STORAGE, EV_CHARGING, SCADA_CONNECTOR, AI_EXTENSION, FINANCE_EXTENSION

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  pricingModel?: string;

  @IsNumber()
  @IsOptional()
  priceUsd?: number;
}
