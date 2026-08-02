import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: 'NewSecurePassword2026!', description: 'New password' })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  newPassword: string;
}
