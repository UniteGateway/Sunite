import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { EntityStatus } from '@prisma/client';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Organization UUID' })
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiPropertyOptional({ description: 'Branch UUID (Optional)' })
  @IsString()
  @IsOptional()
  branchId?: string;

  @ApiProperty({ example: 'ENG-SOLAR', description: 'Unique Dept Code per Organization' })
  @IsString()
  @IsNotEmpty()
  deptCode: string;

  @ApiProperty({ example: 'Solar Engineering & CAD Design', description: 'Department Name' })
  @IsString()
  @IsNotEmpty()
  deptName: string;

  @ApiPropertyOptional({ enum: EntityStatus, default: EntityStatus.ACTIVE })
  @IsEnum(EntityStatus)
  @IsOptional()
  status?: EntityStatus;
}
