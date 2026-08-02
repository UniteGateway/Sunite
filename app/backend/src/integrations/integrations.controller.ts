import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  IntegrationsService,
  ConnectPaymentDto,
  PaymentWebhookDto,
  SendWhatsAppDto,
  SendEmailDto,
  SendSmsDto,
  GeocodeDto,
  WeatherDto,
  StorageUploadDto,
  RegisterWebhookDto,
  ErpSyncDto,
} from './integrations.service';

@Controller('api/v1/integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post('payment/connect')
  async connectPayment(@Body() dto: ConnectPaymentDto) {
    return this.integrationsService.connectPaymentGateway(dto);
  }

  @Post('payment/webhook')
  async paymentWebhook(@Body() dto: PaymentWebhookDto) {
    return this.integrationsService.handlePaymentWebhook(dto);
  }

  @Post('whatsapp/send')
  async sendWhatsApp(@Body() dto: SendWhatsAppDto) {
    return this.integrationsService.sendWhatsAppMessage(dto);
  }

  @Post('email/send')
  async sendEmail(@Body() dto: SendEmailDto) {
    return this.integrationsService.sendEmail(dto);
  }

  @Post('sms/send')
  async sendSms(@Body() dto: SendSmsDto) {
    return this.integrationsService.sendSms(dto);
  }

  @Post('maps/geocode')
  async geocode(@Body() dto: GeocodeDto) {
    return this.integrationsService.geocodeLocation(dto);
  }

  @Post('weather')
  async getWeather(@Body() dto: WeatherDto) {
    return this.integrationsService.getWeatherAndSolarData(dto);
  }

  @Post('storage/upload')
  async uploadStorage(@Body() dto: StorageUploadDto) {
    return this.integrationsService.generateStorageUploadUrl(dto);
  }

  @Post('webhooks/register')
  async registerWebhook(@Body() dto: RegisterWebhookDto) {
    return this.integrationsService.registerWebhook(dto);
  }

  @Post('erp/sync')
  async syncErp(@Body() dto: ErpSyncDto) {
    return this.integrationsService.syncErpData(dto);
  }

  @Get('status')
  async getStatus() {
    return this.integrationsService.getIntegrationStatus();
  }

  @Get('configs')
  async getConfigs() {
    return this.integrationsService.getIntegrationConfigs();
  }

  @Get('webhooks/logs')
  async getWebhookLogs() {
    return this.integrationsService.getWebhookLogs();
  }
}
