import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PricingService } from './pricing.service';
import { CalculatePricingDto } from './dto/calculate-pricing.dto';
import { ApplyMarginDto } from './dto/apply-margin.dto';
import { ApplyDiscountDto } from './dto/apply-discount.dto';
import { CalculateGstDto } from './dto/calculate-gst.dto';
import { CalculateSubsidyDto } from './dto/calculate-subsidy.dto';
import { CalculateLoanDto } from './dto/calculate-loan.dto';
import { ApprovePricingDto } from './dto/approve-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';

@ApiTags('Dynamic Pricing, Commercial Engine & Financial Calculations')
@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Calculate Commercial Solar Pricing & Cost Sheet' })
  calculate(@Body() dto: CalculatePricingDto) {
    return this.pricingService.calculate(dto);
  }

  @Post('apply-margin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Apply Margin Engine rules (Corporate, Branch, Franchise)' })
  applyMargin(@Body() dto: ApplyMarginDto) {
    return this.pricingService.applyMargin(dto);
  }

  @Post('apply-discount')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Apply Campaign / Direct Discounts' })
  applyDiscount(@Body() dto: ApplyDiscountDto) {
    return this.pricingService.applyDiscount(dto);
  }

  @Post('calculate-gst')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Calculate State GST / Inter-State IGST & HSN Code summary' })
  calculateGst(@Body() dto: CalculateGstDto) {
    return this.pricingService.calculateGst(dto);
  }

  @Post('calculate-subsidy')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Calculate Government PM Surya Ghar Subsidy' })
  calculateSubsidy(@Body() dto: CalculateSubsidyDto) {
    return this.pricingService.calculateSubsidy(dto);
  }

  @Post('calculate-loan')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Calculate Loan EMI & Repayment Schedule' })
  calculateLoan(@Body() dto: CalculateLoanDto) {
    return this.pricingService.calculateLoan(dto);
  }

  @Post('approve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Commercial Approval Workflow' })
  approve(@Body() dto: ApprovePricingDto) {
    return this.pricingService.approve(dto);
  }

  @Get('internal-sheet')
  @ApiOperation({ summary: 'Get Internal Cost & Margin Sheet' })
  @ApiQuery({ name: 'id', required: true, type: String })
  getInternalSheet(@Query('id') id: string) {
    return this.pricingService.getInternalSheet(id);
  }

  @Get('customer-sheet')
  @ApiOperation({ summary: 'Get Customer Price Quote Sheet' })
  @ApiQuery({ name: 'id', required: true, type: String })
  getCustomerSheet(@Query('id') id: string) {
    return this.pricingService.getCustomerSheet(id);
  }

  @Get('partner-sheet')
  @ApiOperation({ summary: 'Get Partner Margin & Commission Sheet' })
  @ApiQuery({ name: 'id', required: true, type: String })
  getPartnerSheet(@Query('id') id: string) {
    return this.pricingService.getPartnerSheet(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of Pricing Sheets' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'designId', required: false, type: String })
  @ApiQuery({ name: 'leadId', required: false, type: String })
  findAll(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('designId') designId?: string,
    @Query('leadId') leadId?: string,
  ) {
    return this.pricingService.findAll({ search, status, designId, leadId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Pricing Sheet by ID' })
  findOne(@Param('id') id: string) {
    return this.pricingService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Pricing Sheet line items' })
  update(@Param('id') id: string, @Body() dto: UpdatePricingDto) {
    return this.pricingService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete / cancel a Pricing Sheet' })
  remove(@Param('id') id: string) {
    return this.pricingService.remove(id);
  }
}
