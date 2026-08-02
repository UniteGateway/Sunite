import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { PrismaService } from '../prisma/prisma.service';

describe('HealthService', () => {
  let service: HealthService;

  const mockPrisma = {
    $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return health summary', async () => {
    const res = await service.getHealth();
    expect(res.status).toBe('HEALTHY');
    expect(res.services.database.status).toBe('UP');
  });

  it('should return readiness status', async () => {
    const res = await service.getReadiness();
    expect(res.status).toBe('READY');
  });

  it('should return liveness status', async () => {
    const res = await service.getLiveness();
    expect(res.status).toBe('ALIVE');
    expect(res.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });

  it('should return system status metrics', async () => {
    const res = await service.getSystemStatus();
    expect(res.security.owaspProtection).toBe('ENABLED');
    expect(res.kubernetes.namespace).toBe('sunite-prod');
  });

  it('should return system version', async () => {
    const res = await service.getSystemVersion();
    expect(res.version).toBe('11.16.0');
  });
});
