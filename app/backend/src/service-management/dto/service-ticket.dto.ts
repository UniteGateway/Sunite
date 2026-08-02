import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateServiceTicketDto {
  @ApiPropertyOptional({ example: 'TKT-2026-5001', description: 'Service Ticket Number' })
  @IsString()
  @IsOptional()
  ticketNumber?: string;

  @ApiPropertyOptional({ description: 'Project UUID' })
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({ description: 'Customer UUID' })
  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiPropertyOptional({ example: 'HIGH', default: 'MEDIUM', description: 'Priority (LOW, MEDIUM, HIGH, CRITICAL)' })
  @IsString()
  @IsOptional()
  priority?: string;

  @ApiPropertyOptional({ example: 'INVERTER_FAULT', default: 'INVERTER_FAULT', description: 'Service Category (NO_GENERATION, LOW_GENERATION, INVERTER_FAULT, PANEL_DAMAGE, CLEANING, PREVENTIVE_MAINTENANCE, EMERGENCY_BREAKDOWN)' })
  @IsString()
  @IsOptional()
  serviceType?: string;

  @ApiProperty({ example: 'Inverter error code E031 displayed. Grid connection fault.', description: 'Issue Description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ example: 'Customer reported inverter shutdown after severe lightning storm.', description: 'Ticket Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class UpdateServiceTicketDto {
  @ApiPropertyOptional({ example: 'CRITICAL', description: 'Ticket Priority' })
  @IsString()
  @IsOptional()
  priority?: string;

  @ApiPropertyOptional({ example: 'ON_SITE', description: 'Ticket Status (OPEN, ASSIGNED, ENGINEER_EN_ROUTE, ON_SITE, WAITING_PARTS, RESOLVED, CLOSED, CANCELLED)' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ example: 'Replaced DC SPD and reset inverter parameters.', description: 'Resolution Summary' })
  @IsString()
  @IsOptional()
  resolution?: string;

  @ApiPropertyOptional({ example: 'Engineer on-site inspecting AC/DC isolators.', description: 'Update Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class AssignEngineerDto {
  @ApiProperty({ description: 'Service Field Engineer User UUID' })
  @IsString()
  @IsNotEmpty()
  assignedEngineerId: string;

  @ApiPropertyOptional({ example: 'Assigned Senior Solar Field Technician for urgent inverter diagnosis.', description: 'Assignment Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class CloseServiceTicketDto {
  @ApiProperty({ example: 'Replaced blown DC fuse and recalibrated grid frequency threshold.', description: 'Final Resolution Details' })
  @IsString()
  @IsNotEmpty()
  resolution: string;

  @ApiPropertyOptional({ example: 'Plant generation restored to nominal 100kW AC output.', description: 'Closure Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
