import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { CustomerSuccessService } from './customer-success.service';
import {
  OnboardCustomerDto,
  GoLiveSignOffDto,
  CreateSupportTicketDto,
  UpdateSupportTicketDto,
  EnrollTrainingDto,
  SubmitProductFeedbackDto,
} from './customer-success.dto';

@Controller()
export class CustomerSuccessController {
  constructor(private readonly csService: CustomerSuccessService) {}

  // 1. Customer Success Dashboard
  @Get('api/v1/customer-success/dashboard')
  async getDashboard() {
    return this.csService.getDashboardMetrics();
  }

  // 2. Customer Health Dashboard
  @Get('api/v1/customer-success/health')
  async getHealth() {
    return this.csService.getHealthMetrics();
  }

  // 3. Customer Onboarding
  @Post('api/v1/customer-success/onboarding')
  async onboardCustomer(@Body() dto: OnboardCustomerDto) {
    return this.csService.onboardCustomer(dto);
  }

  // 4. Implementation Management
  @Get('api/v1/customer-success/implementation')
  async getImplementationProjects() {
    return this.csService.getImplementationProjects();
  }

  // 5. Go-Live Sign-Off
  @Post('api/v1/customer-success/go-live')
  async goLiveSignOff(@Body() dto: GoLiveSignOffDto) {
    return this.csService.goLiveSignOff(dto);
  }

  // 6. Support Center Tickets
  @Get('api/v1/support/tickets')
  async getSupportTickets() {
    return this.csService.getSupportTickets();
  }

  @Post('api/v1/support/tickets')
  async createSupportTicket(@Body() dto: CreateSupportTicketDto) {
    return this.csService.createSupportTicket(dto);
  }

  @Put('api/v1/support/tickets/:id')
  async updateSupportTicket(@Param('id') id: string, @Body() dto: UpdateSupportTicketDto) {
    return this.csService.updateSupportTicket(id, dto);
  }

  // 7. Training Academy
  @Get('api/v1/training/courses')
  async getTrainingCourses() {
    return this.csService.getTrainingCourses();
  }

  @Post('api/v1/training/enroll')
  async enrollTraining(@Body() dto: EnrollTrainingDto) {
    return this.csService.enrollTraining(dto);
  }

  // 8. Knowledge Base
  @Get('api/v1/knowledge-base')
  async getKnowledgeBase() {
    return this.csService.getKnowledgeBase();
  }

  // 9. Product Feedback & Feature Requests
  @Post('api/v1/product-feedback')
  async submitProductFeedback(@Body() dto: SubmitProductFeedbackDto) {
    return this.csService.submitProductFeedback(dto);
  }

  // 10. Release Center
  @Get('api/v1/releases')
  async getReleaseNotes() {
    return this.csService.getReleaseNotes();
  }

  // 11. Renewal Center
  @Get('api/v1/renewals')
  async getRenewals() {
    return this.csService.getRenewalForecasts();
  }
}
