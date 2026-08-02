import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  CustomerPortalService,
} from './customer-portal.service';
import {
  ProcessCustomerPaymentDto,
  CreateServiceTicketDto,
  CreateReferralDto,
  AiAssistantQueryDto,
} from './customer-portal.dto';

@Controller('api/v1/customer')
export class CustomerPortalController {
  constructor(private readonly customerService: CustomerPortalService) {}

  @Get('dashboard')
  async getDashboard() {
    return this.customerService.getDashboard();
  }

  @Get('projects')
  async getProjects() {
    return this.customerService.getProjects();
  }

  @Get('scada')
  async getScada() {
    return this.customerService.getScada();
  }

  @Get('documents')
  async getDocuments() {
    return this.customerService.getDocuments();
  }

  @Get('payments')
  async getPayments() {
    return this.customerService.getPayments();
  }

  @Post('payments')
  async processPayment(@Body() dto: ProcessCustomerPaymentDto) {
    return this.customerService.processPayment(dto);
  }

  @Get('warranty')
  async getWarranty() {
    return this.customerService.getWarranty();
  }

  @Get('amc')
  async getAmc() {
    return this.customerService.getAmc();
  }

  @Post('service-ticket')
  async createServiceTicket(@Body() dto: CreateServiceTicketDto) {
    return this.customerService.createServiceTicket(dto);
  }

  @Get('service-history')
  async getServiceHistory() {
    return this.customerService.getServiceHistory();
  }

  @Post('referral')
  async createReferral(@Body() dto: CreateReferralDto) {
    return this.customerService.createReferral(dto);
  }

  @Get('notifications')
  async getNotifications() {
    return this.customerService.getNotifications();
  }

  @Post('ai-assistant')
  async askAiAssistant(@Body() dto: AiAssistantQueryDto) {
    return this.customerService.askAiAssistant(dto);
  }
}
