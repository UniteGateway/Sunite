import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class CalculateLoanDto {
  @ApiProperty({ example: 3500000, description: 'Loan Principal Amount in INR' })
  @IsNumber()
  @Min(1000)
  loanAmount: number;

  @ApiPropertyOptional({ example: 8.5, default: 8.5, description: 'Annual Interest Rate (%)' })
  @IsNumber()
  @Min(0.1)
  @IsOptional()
  interestRate?: number;

  @ApiPropertyOptional({ example: 60, default: 60, description: 'Loan Tenure in Months' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  tenureMonths?: number;
}
