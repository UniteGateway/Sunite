import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class SendQuotationDto {
  @ApiPropertyOptional({ example: 'customer@clientcorp.com', description: 'Recipient Email Address' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: '+919876543210', description: 'Recipient WhatsApp / Mobile Number' })
  @IsString()
  @IsOptional()
  mobile?: string;

  @ApiPropertyOptional({ example: 'Your Sunite Enterprise Turnkey Solar Quotation', description: 'Message Subject or Title' })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiPropertyOptional({ example: 'Please review your attached 100kW Solar Installation Proposal.', description: 'Message Body or Note' })
  @IsString()
  @IsOptional()
  message?: string;
}
