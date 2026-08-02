import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional, IsEnum, MinLength } from 'class-validator';
import { UserRole, EntityStatus } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ description: 'Organization UUID' })
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiPropertyOptional({ description: 'Branch UUID (Optional)' })
  @IsString()
  @IsOptional()
  branchId?: string;

  @ApiPropertyOptional({ description: 'Department UUID (Optional)' })
  @IsString()
  @IsOptional()
  departmentId?: string;

  @ApiProperty({ example: 'engineer@sunite.com', description: 'User Email Address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+919876543210', description: 'Mobile Number with Country Code' })
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({ example: 'SuniteAdmin@2026', description: 'Plain Text Initial Password' })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Solar', description: 'First Name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Engineer', description: 'Last Name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ enum: UserRole, default: UserRole.SOLAR_ENGINEER })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiPropertyOptional({ enum: EntityStatus, default: EntityStatus.ACTIVE })
  @IsEnum(EntityStatus)
  @IsOptional()
  status?: EntityStatus;
}
