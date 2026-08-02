import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class AiChatDto {
  @ApiProperty({ example: 'What is the optimal DC/AC ratio for a 100kW rooftop solar plant in Ahmedabad?', description: 'Prompt or query for AI Assistant' })
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @ApiPropertyOptional({ example: 'GEMINI', default: 'GEMINI', description: 'LLM Provider (GEMINI, OPENAI, CLAUDE)' })
  @IsString()
  @IsOptional()
  provider?: string;

  @ApiPropertyOptional({ example: 'ENGINEERING_COPILOT', description: 'Copilot Persona Role' })
  @IsString()
  @IsOptional()
  persona?: string;
}

export class ElectricityBillOcrDto {
  @ApiProperty({ example: 'https://cdn.sunite.com/bills/torrent_power_bill_july2026.pdf', description: 'Document or Image URL of Electricity Bill' })
  @IsString()
  @IsNotEmpty()
  fileUrl: string;

  @ApiPropertyOptional({ example: 'Torrent Power Ltd', description: 'Utility Discom Name' })
  @IsString()
  @IsOptional()
  discomName?: string;
}

export class GstOcrDto {
  @ApiProperty({ example: 'https://cdn.sunite.com/docs/gst_certificate_24AAACS1234A1Z5.pdf', description: 'Document URL of GST Certificate' })
  @IsString()
  @IsNotEmpty()
  fileUrl: string;
}

export class RoofAnalysisDto {
  @ApiProperty({ example: 'https://cdn.sunite.com/satellite/roof_geo_ahmedabad_01.jpg', description: 'Satellite or Drone Image URL' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiPropertyOptional({ example: 1200, description: 'Rooftop Total Area in Square Meters' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  totalAreaSqm?: number;
}

export class DesignRecommendationDto {
  @ApiProperty({ example: 100.0, description: 'Required Plant Capacity in kW' })
  @IsNumber()
  @Min(1)
  requiredCapacityKw: number;

  @ApiPropertyOptional({ example: 'RCC_FLAT', description: 'Roof Structure Type' })
  @IsString()
  @IsOptional()
  roofType?: string;
}

export class PricingRecommendationDto {
  @ApiProperty({ example: 100.0, description: 'Plant Capacity in kW' })
  @IsNumber()
  @Min(1)
  capacityKw: number;

  @ApiPropertyOptional({ example: 'COMMERCIAL_INDUSTRIAL', description: 'Customer Category' })
  @IsString()
  @IsOptional()
  customerCategory?: string;
}

export class ProjectRiskDto {
  @ApiProperty({ description: 'Project UUID' })
  @IsString()
  @IsNotEmpty()
  projectId: string;
}

export class ServiceDiagnosisDto {
  @ApiProperty({ example: 'Inverter error E031 - DC Overvoltage protection tripped during peak irradiance.', description: 'Fault or Alarm Description' })
  @IsString()
  @IsNotEmpty()
  faultDescription: string;

  @ApiPropertyOptional({ example: 'SUN2000-100KTL-M1', description: 'Inverter or Device Model' })
  @IsString()
  @IsOptional()
  deviceModel?: string;
}
