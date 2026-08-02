import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPortalService } from './customer-portal.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CustomerPortalService', () => {
  let service: CustomerPortalService;

  const mockPrismaService = {
    customerReferral: {
      create: jest.fn().mockImplementation((args) =>
        Promise.resolve({ id: 'ref-101', ...args.data, createdAt: new Date() }),
      ),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerPortalService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CustomerPortalService>(CustomerPortalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return customer dashboard overview', async () => {
    const res = await service.getDashboard();
    expect(res.success).toBe(true);
    expect(res.data.installedCapacityKw).toEqual(550.0);
    expect(res.data.co2OffsetTons).toBeGreaterThan(0);
  });

  it('should return project tracking details', async () => {
    const res = await service.getProjects();
    expect(res.success).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data[0].milestones.length).toBeGreaterThan(0);
  });

  it('should return live SCADA telemetry metrics', async () => {
    const res = await service.getScada();
    expect(res.success).toBe(true);
    expect(res.data.livePowerKw).toBeGreaterThan(0);
    expect(res.data.performanceRatioPct).toBeGreaterThan(80);
  });

  it('should return customer document vault', async () => {
    const res = await service.getDocuments();
    expect(res.success).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
  });

  it('should return billing and outstanding payments', async () => {
    const res = await service.getPayments();
    expect(res.success).toBe(true);
    expect(res.data.invoices.length).toBeGreaterThan(0);
  });

  it('should process online customer payment', async () => {
    const res = await service.processPayment({
      invoiceId: 'INV-2026-042',
      amount: 125000,
      paymentMethod: 'UPI',
    });
    expect(res.success).toBe(true);
    expect(res.data.status).toEqual('SUCCESS');
  });

  it('should return warranty details & equipment list', async () => {
    const res = await service.getWarranty();
    expect(res.success).toBe(true);
    expect(res.data.equipmentList.length).toBeGreaterThan(0);
  });

  it('should return AMC plan & renewal details', async () => {
    const res = await service.getAmc();
    expect(res.success).toBe(true);
    expect(res.data.includedServices.length).toBeGreaterThan(0);
  });

  it('should create new service ticket', async () => {
    const res = await service.createServiceTicket({
      projectId: 'PROJ-SUN-550KW',
      category: 'INVERTER_FAULT',
      subject: 'Inverter error code E-102',
      description: 'Inverter #03 restarted due to transient grid over-voltage.',
    });
    expect(res.success).toBe(true);
    expect(res.data.status).toEqual('OPEN_ASSIGNED');
  });

  it('should return service desk ticket history', async () => {
    const res = await service.getServiceHistory();
    expect(res.success).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
  });

  it('should record customer referral', async () => {
    const res = await service.createReferral({
      referrerName: 'Sanand Industrial Polymers',
      referrerEmail: 'admin@sanandpolymers.com',
      friendName: 'Anand Textile Mills',
      friendPhone: '+91 98250 11223',
      estimatedCapacityKw: 200,
    });
    expect(res.success).toBe(true);
    expect(res.data.rewardAmount).toEqual(20000);
  });

  it('should answer AI Solar Assistant queries', async () => {
    const res = await service.askAiAssistant({
      query: 'What is my generation today?',
    });
    expect(res.success).toBe(true);
    expect(res.data.response).toContain('2,680.5 kWh');
  });
});
