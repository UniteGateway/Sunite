import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsBoolean } from 'class-validator';

export class UploadPhotoDto {
  @ApiProperty({ example: 'https://cdn.sunite.com/projects/photos/rooftop_structure_01.jpg', description: 'Geo-tagged site progress photo URL' })
  @IsString()
  @IsNotEmpty()
  photoUrl: string;

  @ApiPropertyOptional({ example: 'ROOFTOP_STRUCTURE', description: 'Photo Category (ROOFTOP_STRUCTURE, MODULE_MOUNTING, INVERTER_INSTALLATION, CABLING, EARTHING, NET_METER)' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: '18.5204', description: 'Latitude coordinate' })
  @IsString()
  @IsOptional()
  latitude?: string;

  @ApiPropertyOptional({ example: '73.8567', description: 'Longitude coordinate' })
  @IsString()
  @IsOptional()
  longitude?: string;

  @ApiPropertyOptional({ example: 'Rooftop mounting rails installed with anti-corrosion coating.', description: 'Photo description or note' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class QualityCheckDto {
  @ApiPropertyOptional({ example: true, description: 'Structure Torque Check Passed' })
  @IsBoolean()
  @IsOptional()
  structureTorquePassed?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Module Clamping Check Passed' })
  @IsBoolean()
  @IsOptional()
  moduleClampingPassed?: boolean;

  @ApiPropertyOptional({ example: true, description: 'DC Cabling Insulation Check Passed' })
  @IsBoolean()
  @IsOptional()
  dcCablingPassed?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Earthing Resistance Check Passed (< 5 Ohms)' })
  @IsBoolean()
  @IsOptional()
  earthingPassed?: boolean;

  @ApiPropertyOptional({ example: 'ALL_PASSED', description: 'Quality Inspection Result' })
  @IsString()
  @IsOptional()
  inspectionResult?: string;

  @ApiPropertyOptional({ example: 'All mechanical and electrical quality checks passed successfully.', description: 'Quality Inspector Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class TestingDto {
  @ApiPropertyOptional({ example: 1000.0, description: 'Insulation Resistance in M-Ohms' })
  @IsNumber()
  @IsOptional()
  insulationResistanceMohms?: number;

  @ApiPropertyOptional({ example: 850.5, description: 'Open Circuit Voltage Voc in Volts' })
  @IsNumber()
  @IsOptional()
  openCircuitVoltageVoc?: number;

  @ApiPropertyOptional({ example: 11.2, description: 'Short Circuit Current Isc in Amperes' })
  @IsNumber()
  @IsOptional()
  shortCircuitCurrentIsc?: number;

  @ApiPropertyOptional({ example: true, description: 'Grid Synchronization Test Passed' })
  @IsBoolean()
  @IsOptional()
  gridSyncPassed?: boolean;

  @ApiPropertyOptional({ example: 'Grid synchronization and string Voc/Isc testing completed with zero faults.', description: 'Testing Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class CommissionDto {
  @ApiPropertyOptional({ example: 'NM-MH-2026-9901', description: 'Net Metering Application / Approval Reference Number' })
  @IsString()
  @IsOptional()
  netMeterNumber?: string;

  @ApiPropertyOptional({ example: 'MSEDCL', description: 'DISCOM Utility Provider' })
  @IsString()
  @IsOptional()
  discomName?: string;

  @ApiPropertyOptional({ example: 100.0, description: 'Commissioned AC Power Capacity in kW' })
  @IsNumber()
  @Min(0.1)
  @IsOptional()
  commissionedCapacityKw?: number;

  @ApiPropertyOptional({ example: 'Solar plant synchronized with grid network and net meter energized.', description: 'Commissioning Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class HandoverDto {
  @ApiPropertyOptional({ example: 'DOC-HANDOVER-100KW-01', description: 'Completion Certificate Number' })
  @IsString()
  @IsOptional()
  certificateNumber?: string;

  @ApiPropertyOptional({ example: '25 Years Tier-1 PV Module, 10 Years Inverter, 5 Years Structure & Workmanship', description: 'Activated Warranty Details' })
  @IsString()
  @IsOptional()
  warrantyDetails?: string;

  @ApiPropertyOptional({ example: '5-Year Comprehensive Operation & Maintenance (O&M) AMC Activated', description: 'Activated AMC Contract Details' })
  @IsString()
  @IsOptional()
  amcDetails?: string;

  @ApiPropertyOptional({ example: 'System handed over to customer. Training provided on monitoring portal.', description: 'Handover Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class CreatePurchaseOrderDto {
  @ApiPropertyOptional({ example: 'PO-2026-5001', description: 'Purchase Order Number' })
  @IsString()
  @IsOptional()
  poNumber?: string;

  @ApiPropertyOptional({ description: 'Project UUID' })
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({ description: 'Vendor UUID' })
  @IsString()
  @IsOptional()
  vendorId?: string;

  @ApiPropertyOptional({ example: 'Tata Power Solar Systems Ltd', description: 'Vendor Name' })
  @IsString()
  @IsOptional()
  vendorName?: string;

  @ApiPropertyOptional({ example: 2500000, description: 'PO Total Value in INR' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  totalAmount?: number;

  @ApiPropertyOptional({ example: 'Procurement of 182x 550Wp Mono PERC Bifacial Solar Modules', description: 'PO Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class CreateMaterialDispatchDto {
  @ApiPropertyOptional({ example: 'DISP-2026-3001', description: 'Material Dispatch Voucher Number' })
  @IsString()
  @IsOptional()
  dispatchNumber?: string;

  @ApiPropertyOptional({ description: 'Project UUID' })
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({ example: 'MH-12-AB-1234', description: 'Transport Vehicle Number' })
  @IsString()
  @IsOptional()
  vehicleNumber?: string;

  @ApiPropertyOptional({ example: 'Ramesh Shinde', description: 'Logistics Driver Name' })
  @IsString()
  @IsOptional()
  driverName?: string;

  @ApiPropertyOptional({ example: '+919876543210', description: 'Driver Mobile Number' })
  @IsString()
  @IsOptional()
  driverPhone?: string;

  @ApiPropertyOptional({ example: '182x Modules, 1x 100kW Inverter, 400m DC Cable, Mounting Structures', description: 'Dispatched Line Items Summary' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
