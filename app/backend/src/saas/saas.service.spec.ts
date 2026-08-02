import { Test, TestingModule } from '@nestjs/testing';
import { SaasService } from './saas.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SaasService', () => {
  let service: SaasService;

  const mockPrismaService = {
    saasTenant: {
      create: jest.fn().mockImplementation((args) =>
        Promise.resolve({ id: 'tenant-101', ...args.data, createdAt: new Date() }),
      ),
      findMany: jest.fn().mockResolvedValue([
        { id: 'tenant-101', name: 'Sanand Industrial', domain: 'sanand.sunite.io', plan: 'ENTERPRISE', status: 'ACTIVE' },
      ]),
      findUnique: jest.fn().mockImplementation((args) =>
        Promise.resolve({ id: args.where.id, name: 'Sanand Industrial', domain: 'sanand.sunite.io', plan: 'ENTERPRISE' }),
      ),
    },
    saasSubscription: {
      create: jest.fn().mockImplementation((args) =>
        Promise.resolve({ id: 'sub-201', ...args.data, createdAt: new Date() }),
      ),
      findMany: jest.fn().mockResolvedValue([
        { id: 'sub-201', tenantId: 'tenant-101', planType: 'ENTERPRISE', amountInr: 350000, status: 'ACTIVE' },
      ]),
    },
    saasLicense: {
      create: jest.fn().mockImplementation((args) =>
        Promise.resolve({ id: 'lic-301', ...args.data, createdAt: new Date() }),
      ),
      findMany: jest.fn().mockResolvedValue([
        { id: 'lic-301', licenseKey: 'SUN-LIC-901', licenseType: 'ENTERPRISE', featureFlags: 'ALL' },
      ]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaasService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<SaasService>(SaasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should provision a new SaaS tenant', async () => {
    const res = await service.createTenant({
      name: 'Adani Solar Park',
      domain: 'adani.sunite.io',
      plan: 'ENTERPRISE',
      managedMw: 500,
    });
    expect(res.success).toBe(true);
    expect(res.data.domain).toEqual('adani.sunite.io');
  });

  it('should return list of tenants', async () => {
    const res = await service.getTenants();
    expect(res.success).toBe(true);
    expect(res.count).toBeGreaterThan(0);
  });

  it('should create subscription plan', async () => {
    const res = await service.createSubscription({
      tenantId: 'tenant-101',
      planType: 'ENTERPRISE',
      billingCycle: 'ANNUAL',
      amountInr: 350000,
    });
    expect(res.success).toBe(true);
    expect(res.data.status).toEqual('ACTIVE');
  });

  it('should issue enterprise license key', async () => {
    const res = await service.createLicense({
      tenantId: 'tenant-101',
      licenseType: 'ENTERPRISE',
      featureFlags: 'CRM,ERP,SCADA,AI,FINANCE,BI,WHITE_LABEL',
    });
    expect(res.success).toBe(true);
    expect(res.data.licenseKey).toContain('SUN-LIC-');
  });

  it('should generate SaaS tax invoice', async () => {
    const res = await service.generateInvoice({
      subscriptionId: 'sub-201',
      amountInr: 100000,
    });
    expect(res.success).toBe(true);
    expect(res.data.gst18Inr).toEqual(18000);
    expect(res.data.totalInr).toEqual(118000);
  });

  it('should return SaaS billing history & MRR', async () => {
    const res = await service.getBillingHistory();
    expect(res.success).toBe(true);
    expect(res.data.mrrInr).toBeGreaterThan(0);
  });

  it('should report tenant usage metering', async () => {
    const res = await service.reportUsage({
      tenantId: 'tenant-101',
      activeUsers: 50,
      scadaDevices: 100,
    });
    expect(res.success).toBe(true);
    expect(res.data.tenantId).toEqual('tenant-101');
  });

  it('should return B2B solar marketplace catalog', async () => {
    const res = await service.getMarketplace();
    expect(res.success).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
  });

  it('should register reseller partner', async () => {
    const res = await service.createReseller({
      partnerName: 'SunTech Integrators West',
      contactEmail: 'partners@suntech.com',
      commissionPct: 15,
    });
    expect(res.success).toBe(true);
    expect(res.data.partnerName).toEqual('SunTech Integrators West');
  });

  it('should return customer success health metrics', async () => {
    const res = await service.getCustomerSuccessMetrics();
    expect(res.success).toBe(true);
    expect(res.data.globalHealthScoreAvg).toBeGreaterThan(90);
  });
});
