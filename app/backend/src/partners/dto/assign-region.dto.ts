import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class AssignRegionDto {
  @ApiProperty({ example: ['Maharashtra', 'Karnataka'], description: 'States covered by partner' })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  states: string[];

  @ApiProperty({ example: ['Pune', 'Mumbai', 'Bengaluru'], description: 'Cities/Districts covered' })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  cities: string[];
}
