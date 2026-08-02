import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { FinanceService } from './finance.service';
import { CreatePaymentDto, RefundPaymentDto } from './dto/create-payment.dto';
import { CreateInvoiceDto, GenerateInvoiceDto } from './dto/create-invoice.dto';
import {
  CalculateCommissionDto,
  ReleaseCommissionDto,
  CreateVendorBillDto,
} from './dto/finance.dto';

@ApiTags('Finance, Payments, Invoicing, GST & Commission Engine')
@Controller()
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  // PAYMENTS
  @Post('payments')
  @ApiOperation({ summary: 'Record Customer Payment (Booking, Advance, Milestone, Final)' })
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.financeService.createPayment(dto);
  }

  @Get('payments')
  @ApiOperation({ summary: 'Get List of Customer Payments' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'orderId', required: false, type: String })
  @ApiQuery({ name: 'customerId', required: false, type: String })
  findAllPayments(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('orderId') orderId?: string,
    @Query('customerId') customerId?: string,
  ) {
    return this.financeService.findAllPayments({ search, status, orderId, customerId });
  }

  @Post('payments/refund')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Process Customer Payment Refund' })
  refundPayment(@Body() dto: RefundPaymentDto) {
    return this.financeService.refundPayment(dto);
  }

  @Get('payments/:id')
  @ApiOperation({ summary: 'Get Payment Details by ID' })
  findPaymentById(@Param('id') id: string) {
    return this.financeService.findPaymentById(id);
  }

  // INVOICES
  @Post('invoices')
  @ApiOperation({ summary: 'Create Tax / Proforma Invoice' })
  createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.financeService.createInvoice(dto);
  }

  @Get('invoices')
  @ApiOperation({ summary: 'Get List of Invoices' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'invoiceType', required: false, type: String })
  @ApiQuery({ name: 'orderId', required: false, type: String })
  findAllInvoices(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('invoiceType') invoiceType?: string,
    @Query('orderId') orderId?: string,
  ) {
    return this.financeService.findAllInvoices({ search, status, invoiceType, orderId });
  }

  @Post('invoices/generate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Auto-Generate Tax Invoice from Order / Milestone' })
  generateInvoice(@Body() dto: GenerateInvoiceDto) {
    return this.financeService.generateInvoice(dto);
  }

  @Get('invoices/:id')
  @ApiOperation({ summary: 'Get Invoice Details by ID' })
  findInvoiceById(@Param('id') id: string) {
    return this.financeService.findInvoiceById(id);
  }

  // COMMISSIONS
  @Post('commission/calculate')
  @ApiOperation({ summary: 'Calculate Partner / Executive Sales Commission' })
  calculateCommission(@Body() dto: CalculateCommissionDto) {
    return this.financeService.calculateCommission(dto);
  }

  @Post('commission/release')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Release Commission Payment (50% Advance / 50% Final)' })
  releaseCommission(@Body() dto: ReleaseCommissionDto) {
    return this.financeService.releaseCommission(dto);
  }

  @Get('commission')
  @ApiOperation({ summary: 'Get Partner Commission Records' })
  @ApiQuery({ name: 'partnerId', required: false, type: String })
  @ApiQuery({ name: 'salesExecutiveId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  findAllCommissions(
    @Query('partnerId') partnerId?: string,
    @Query('salesExecutiveId') salesExecutiveId?: string,
    @Query('status') status?: string,
  ) {
    return this.financeService.findAllCommissions({ partnerId, salesExecutiveId, status });
  }

  // VENDOR BILLS
  @Post('vendor-bills')
  @ApiOperation({ summary: 'Submit Vendor Purchase Bill / Invoice' })
  createVendorBill(@Body() dto: CreateVendorBillDto) {
    return this.financeService.createVendorBill(dto);
  }

  @Get('vendor-bills')
  @ApiOperation({ summary: 'Get Vendor Bills & Purchase Settlements' })
  @ApiQuery({ name: 'vendorId', required: false, type: String })
  @ApiQuery({ name: 'purchaseOrderId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  findAllVendorBills(
    @Query('vendorId') vendorId?: string,
    @Query('purchaseOrderId') purchaseOrderId?: string,
    @Query('status') status?: string,
  ) {
    return this.financeService.findAllVendorBills({ vendorId, purchaseOrderId, status });
  }

  // FINANCIAL REPORTS
  @Get('gst-summary')
  @ApiOperation({ summary: 'Get GST Output Tax, Input Credit & Net Liability Summary' })
  @ApiQuery({ name: 'year', required: false, type: Number })
  @ApiQuery({ name: 'month', required: false, type: Number })
  getGstSummary(
    @Query('year') year?: number,
    @Query('month') month?: number,
  ) {
    return this.financeService.getGstSummary(year, month);
  }

  @Get('cashflow')
  @ApiOperation({ summary: 'Get Enterprise Cashflow Statement & Bank Reconciliation Summary' })
  getCashflowSummary() {
    return this.financeService.getCashflowSummary();
  }
}
