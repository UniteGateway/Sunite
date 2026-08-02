import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateScadaPlantDto {
  @ApiPropertyOptional({ example: 'SCD-PLT-1001', description: 'SCADA Plant Code' })
  @IsString()
  @IsOptional()
  plantCode?: string;

  @ApiProperty({ example: 'Sunite Rooftop Plant - Sanand Industrial Park', description: 'Plant Name' })
  @IsString()
  @IsNotEmpty()
  plantName: string;

  @ApiProperty({ example: 100.0, description: 'DC System Installed Capacity in kW' })
  @IsNumber()
  @Min(1)
  capacityKw: number;

  @ApiPropertyOptional({ example: 'Sanand, Gujarat, India', description: 'Geographic Location' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ example: 415.0, default: 415.0, description: 'Grid Connection Voltage in Volts' })
  @IsNumber()
  @Min(100)
  @IsOptional()
  gridVoltage?: number;

  @ApiPropertyOptional({ example: 'SCADA gateway synced with Modbus TCP telemetry loggers.', description: 'Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class CreateScadaDeviceDto {
  @ApiPropertyOptional({ example: 'SCD-DEV-2001', description: 'SCADA Device Code' })
  @IsString()
  @IsOptional()
  deviceCode?: string;

  @ApiPropertyOptional({ description: 'SCADA Plant UUID' })
  @IsString()
  @IsOptional()
  scadaPlantId?: string;

  @ApiPropertyOptional({ example: 'INVERTER', default: 'INVERTER', description: 'Device Type (INVERTER, WEATHER_STATION, ENERGY_METER, LOGGER)' })
  @IsString()
  @IsOptional()
  deviceType?: string;

  @ApiPropertyOptional({ example: 'Huawei SUN2000-100KTL-M1', description: 'Device Model' })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiPropertyOptional({ example: 'SN-HW-100K-990011', description: 'Manufacturer Serial Number' })
  @IsString()
  @IsOptional()
  serialNumber?: string;

  @ApiPropertyOptional({ example: '192.168.1.150', description: 'IP Address for Modbus TCP' })
  @IsString()
  @IsOptional()
  ipAddress?: string;

  @ApiPropertyOptional({ example: 'MODBUS_TCP', default: 'MODBUS_TCP', description: 'Communication Protocol (MODBUS_TCP, MQTT, HTTPS)' })
  @IsString()
  @IsOptional()
  protocol?: string;
}
