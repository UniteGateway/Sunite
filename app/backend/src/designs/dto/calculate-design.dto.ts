import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class CalculateDesignDto {
  @ApiPropertyOptional({ example: 600.0, description: 'Available usable roof area in sq. meters' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  usableRoofArea?: number;

  @ApiPropertyOptional({ example: 120.0, description: 'Electricity sanction load in kW' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  sanctionedLoadKw?: number;

  @ApiPropertyOptional({ example: 550, default: 550, description: 'Target PV Module Wattage (Wp)' })
  @IsNumber()
  @Min(100)
  @IsOptional()
  moduleWattage?: number;

  @ApiPropertyOptional({ example: 8.5, default: 8.5, description: 'Electricity Tariff per kWh (INR)' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  tariffPerKwh?: number;
}
