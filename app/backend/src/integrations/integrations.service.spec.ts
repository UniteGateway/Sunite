import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationsService } from './integrations.service';
import { PrismaService } from '../prisma/prisma.service';

describe('IntegrationsService', () => {
  let service: IntegrationsService;

  const mockPrismaService = {
    integrationConfig: {
      create: jest.fn().mockImplementation((args) =>
        Promise.resolve({ id: 'cfg-101', ...args.data, createdAt: new Date() }),
      ),
      findMany: jest.fn().mockResolvedValue([]),
    },
    webhookSubscription: {
      create: jest.fn().mockImplementation((args) =>
        Promise.resolve({ id: 'sub-101', ...args.data, createdAt: new Date() }),
      ),
      count: jest.fn().mockResolvedValue(4),
    },
    webhookLog: {
      create: jest.fn().mockImplementation((args) =>
        Promise.resolve({ id: 'log-101', ...args.data, createdAt: new Date() }),
      ),
      findMany: jest.fn().mockResolvedValue([]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntegrationsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<IntegrationsService>(IntegrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect payment gateway', async () => {
    const res = await service.connectPaymentGateway({
      provider: 'RAZORPAY',
      apiKey: 'rzp_test_key_123',
      apiSecret: 'rzp_test_secret_456',
      environment: 'SANDBOX',
    });
    expect(res.success).toBe(true);
    expect(res.data.provider).toEqual('RAZORPAY');
  });

  it('should process payment webhook', async () => {
    const res = await service.handlePaymentWebhook({
      provider: 'RAZORPAY',
      eventId: 'evt_1001',
      eventType: 'PAYMENT.SUCCESS',
      signature: 'valid_hmac_signature_xyz',
      payload: { amount: 150000 },
    });
    expect(res.success).toBe(true);
  });

  it('should send WhatsApp template message', async () => {
    const res = await service.sendWhatsAppMessage({
      recipientPhoneNumber: '+919876543210',
      templateName: 'invoice_due_reminder',
    });
    expect(res.success).toBe(true);
    expect(res.data.deliveryStatus).toEqual('SENT');
  });

  it('should geocode location using GIS maps', async () => {
    const res = await service.geocodeLocation({
      address: 'Sanand Industrial Estate, Gujarat',
    });
    expect(res.success).toBe(true);
    expect(res.data.latitude).toBeDefined();
  });

  it('should fetch solar radiation and weather data', async () => {
    const res = await service.getWeatherAndSolarData({
      latitude: 22.98,
      longitude: 72.38,
    });
    expect(res.success).toBe(true);
    expect(res.data.ghiKwhM2Day).toBeGreaterThan(0);
  });

  it('should generate cloud storage presigned upload URL', async () => {
    const res = await service.generateStorageUploadUrl({
      fileName: 'pvsyst_design_report.pdf',
      fileType: 'application/pdf',
      fileSizeBytes: 2048000,
    });
    expect(res.success).toBe(true);
    expect(res.data.uploadUrl).toContain('amazonaws.com');
  });

  it('should register webhook subscription', async () => {
    const res = await service.registerWebhook({
      name: 'Invoice Status Sync',
      eventType: 'INVOICE_GENERATED',
      targetUrl: 'https://external-erp.com/webhooks/invoices',
    });
    expect(res.success).toBe(true);
    expect(res.data.eventType).toEqual('INVOICE_GENERATED');
  });

  it('should get integration channel status', async () => {
    const res = await service.getIntegrationStatus();
    expect(res.success).toBe(true);
    expect(res.data.overallStatus).toEqual('HEALTHY');
    expect(res.data.channels.length).toBeGreaterThan(0);
  });
});
