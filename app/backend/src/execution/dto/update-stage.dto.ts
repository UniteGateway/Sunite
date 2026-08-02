import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateStageDto {
  @ApiProperty({ example: 'INSTALLATION_STARTED', description: 'Execution Stage (ADVANCE_PAYMENT, MATERIAL_PROCUREMENT, PURCHASE_ORDER, MATERIAL_RESERVED, MATERIAL_DISPATCH, SITE_READY, INSTALLATION_STARTED, INSTALLATION_COMPLETED, QUALITY_INSPECTION, TESTING, NET_METERING, COMMISSIONING, CUSTOMER_HANDOVER, PROJECT_CLOSED)' })
  @IsString()
  @IsNotEmpty()
  stage: string;

  @ApiProperty({ example: 'Structure mounting work started on rooftop.', description: 'Stage Progress Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
