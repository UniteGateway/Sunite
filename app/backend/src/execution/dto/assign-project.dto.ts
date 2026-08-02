import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class AssignProjectDto {
  @ApiPropertyOptional({ description: 'Project Manager UUID' })
  @IsString()
  @IsOptional()
  projectManagerId?: string;

  @ApiPropertyOptional({ description: 'EPC Vendor UUID' })
  @IsString()
  @IsOptional()
  epcVendorId?: string;

  @ApiPropertyOptional({ description: 'Installation Vendor UUID' })
  @IsString()
  @IsOptional()
  installationVendorId?: string;

  @ApiPropertyOptional({ description: 'Survey Engineer UUID' })
  @IsString()
  @IsOptional()
  surveyEngineerId?: string;

  @ApiPropertyOptional({ example: 'Assigned core project execution team', description: 'Assignment Remarks' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
