import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { SaasService } from './saas.service';
import {
  CreateTenantDto,
  CreateSubscriptionDto,
  CreateLicenseDto,
  GenerateInvoiceDto,
  ReportUsageDto,
  CreateResellerDto,
} from './saas.dto';

@Controller('api/v1')
export class SaasController {
  constructor(private readonly saasService: SaasService) {}

  @Post('tenants')
  async createTenant(@Body() dto: CreateTenantDto) {
    return this.saasService.createTenant(dto);
  }

  @Get('tenants')
  async getTenants() {
    return this.saasService.getTenants();
  }

  @Get('tenants/:id')
  async getTenantById(@Param('id') id: string) {
    return this.saasService.getTenantById(id);
  }

  @Post('subscriptions')
  async createSubscription(@Body() dto: CreateSubscriptionDto) {
    return this.saasService.createSubscription(dto);
  }

  @Get('subscriptions')
  async getSubscriptions() {
    return this.saasService.getSubscriptions();
  }

  @Post('licenses')
  async createLicense(@Body() dto: CreateLicenseDto) {
    return this.saasService.createLicense(dto);
  }

  @Get('licenses')
  async getLicenses() {
    return this.saasService.getLicenses();
  }

  @Post('billing/invoice')
  async generateInvoice(@Body() dto: GenerateInvoiceDto) {
    return this.saasService.generateInvoice(dto);
  }

  @Get('billing/history')
  async getBillingHistory() {
    return this.saasService.getBillingHistory();
  }

  @Post('usage/report')
  async reportUsage(@Body() dto: ReportUsageDto) {
    return this.saasService.reportUsage(dto);
  }

  @Get('marketplace')
  async getMarketplace() {
    return this.saasService.getMarketplace();
  }

  @Post('resellers')
  async createReseller(@Body() dto: CreateResellerDto) {
    return this.saasService.createReseller(dto);
  }

  @Get('customer-success')
  async getCustomerSuccessMetrics() {
    return this.saasService.getCustomerSuccessMetrics();
  }
}
