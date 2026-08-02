import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UploadMediaDto {
  @ApiProperty({ example: 'https://cdn.sunite.com/uploads/roof_photo_01.jpg', description: 'File / Image URL' })
  @IsString()
  @IsNotEmpty()
  fileUrl: string;

  @ApiPropertyOptional({ example: 'South West Corner Roof Measurement', description: 'Caption or Label' })
  @IsString()
  @IsOptional()
  caption?: string;

  @ApiPropertyOptional({ example: 'ROOF_PHOTO', description: 'Media Category (ROOF_PHOTO, ELECTRICITY_BILL, CAD_DRAWING, DRONE_IMAGE)' })
  @IsString()
  @IsOptional()
  category?: string;
}
