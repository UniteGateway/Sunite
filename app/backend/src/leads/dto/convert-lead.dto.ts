import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ConvertLeadDto {
  @ApiPropertyOptional({ example: 'Lead converted after successful commercial contract signing.', description: 'Conversion notes' })
  @IsString()
  @IsOptional()
  conversionNotes?: string;
}
