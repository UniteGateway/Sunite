import { Controller, Post, Get, Body } from '@nestjs/common';
import { OnboardingService, OnboardOrganizationDto, OnboardCustomerDto, OnboardPartnerDto } from './onboarding.service';

@Controller('api/v1/onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post('organization')
  async onboardOrganization(@Body() dto: OnboardOrganizationDto) {
    return this.onboardingService.onboardOrganization(dto);
  }

  @Post('customer')
  async onboardCustomer(@Body() dto: OnboardCustomerDto) {
    return this.onboardingService.onboardCustomer(dto);
  }

  @Post('partner')
  async onboardPartner(@Body() dto: OnboardPartnerDto) {
    return this.onboardingService.onboardPartner(dto);
  }

  @Get('status')
  async getStatus() {
    return this.onboardingService.getStatus();
  }
}
