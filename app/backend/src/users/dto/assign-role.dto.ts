import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '@prisma/client';

export class AssignRoleDto {
  @ApiProperty({ enum: UserRole, description: 'Role to assign to user' })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
