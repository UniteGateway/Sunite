import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { EntityStatus } from '@prisma/client';

export class CreateBranchDto {
  @ApiProperty({ description: 'Organization UUID' })
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({ example: 'HQ-MUMBAI-01', description: 'Unique Branch Code' })
  @IsString()
  @IsNotEmpty()
  branchCode: string;

  @ApiProperty({ example: 'Sunite Corporate HQ - Mumbai', description: 'Branch Name' })
  @IsString()
  @IsNotEmpty()
  branchName: string;

  @ApiProperty({ example: 'Mumbai', description: 'City' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'Maharashtra', description: 'State' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: '400051', description: 'Postal Code' })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ example: 'BKC Financial Center, Tower B, Level 12', description: 'Address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional({ enum: EntityStatus, default: EntityStatus.ACTIVE })
  @IsEnum(EntityStatus)
  @IsOptional()
  status?: EntityStatus;
}
