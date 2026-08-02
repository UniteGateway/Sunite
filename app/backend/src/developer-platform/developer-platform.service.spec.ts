import { Test, TestingModule } from '@nestjs/testing';
import { DeveloperPlatformService } from './developer-platform.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DeveloperPlatformService', () => {
  let service: DeveloperPlatformService;

  const mockPrismaService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeveloperPlatformService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<DeveloperPlatformService>(DeveloperPlatformService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register developer organization', async () => {
    const res = await service.registerDeveloper({
      orgName: 'Sungrow Power Solutions',
      email: 'dev@sungrow.com',
      tier: 'TIER_OEM',
    });
    expect(res.success).toBe(true);
    expect(res.data.developerId).toContain('DEV-');
    expect(res.data.oauthClientId).toBeDefined();
  });

  it('should generate API key', async () => {
    const res = await service.createApiKey({
      developerId: 'DEV-10022',
      label: 'Production Telemetry Ingest Key',
    });
    expect(res.success).toBe(true);
    expect(res.data.apiKeySecret).toContain('sunite_live_sk_');
  });

  it('should return developer apps', async () => {
    const res = await service.getDeveloperApps();
    expect(res.success).toBe(true);
    expect(res.data.apps.length).toBeGreaterThan(0);
  });

  it('should register plugin extension', async () => {
    const res = await service.createPlugin({
      name: 'Huawei Inverter Modbus Parser',
      author: 'Huawei Digital Power',
      version: '1.2.0',
      permissions: 'READ_TELEMETRY',
    });
    expect(res.success).toBe(true);
    expect(res.data.lifecycleState).toEqual('RUNNING');
  });

  it('should return plugins list', async () => {
    const res = await service.getPlugins();
    expect(res.success).toBe(true);
    expect(res.data.plugins.length).toBeGreaterThan(0);
  });

  it('should create marketplace app', async () => {
    const res = await service.createMarketplaceApp({
      developerId: 'DEV-10022',
      name: 'CATL BESS Cell Balancing Optimizer',
      category: 'BATTERY_STORAGE',
      description: 'State-of-Charge optimization app.',
      priceUsd: 49.99,
    });
    expect(res.success).toBe(true);
    expect(res.data.status).toEqual('PUBLISHED');
  });

  it('should return marketplace directory and public API catalog', async () => {
    const mktRes = await service.getMarketplace();
    expect(mktRes.success).toBe(true);
    expect(mktRes.data.apps.length).toBeGreaterThan(0);

    const apiRes = await service.getPublicApis();
    expect(apiRes.success).toBe(true);
    expect(apiRes.data.apiGroups.length).toBeGreaterThan(0);
    expect(apiRes.data.sdksAvailable.length).toBeGreaterThan(0);
  });
});
