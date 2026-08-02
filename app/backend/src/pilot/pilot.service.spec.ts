import { Test, TestingModule } from '@nestjs/testing';
import { PilotService } from './pilot.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PilotService', () => {
  let service: PilotService;

  const mockPrismaService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PilotService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PilotService>(PilotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should provision pilot organization and seed production data', async () => {
    const res = await service.provisionPilotData({
      organizationName: 'Sunite CleanEnergy India Pvt Ltd',
      headquartersCount: 1,
      branchOfficesCount: 3,
      userRolesCount: 10,
      customersCount: 100,
      partnersCount: 25,
      projectsCount: 50,
    });
    expect(res.success).toBe(true);
    expect(res.data.provisionedCounts.branchOffices).toEqual(3);
    expect(res.data.provisionedCounts.rolesList.length).toEqual(10);
  });

  it('should validate end-to-end 19-step Go-Live business workflow', async () => {
    const res = await service.validateGoLiveWorkflow({});
    expect(res.success).toBe(true);
    expect(res.data.totalSteps).toEqual(19);
    expect(res.data.passedSteps).toEqual(19);
    expect(res.data.overallStatus).toEqual('PASSED_CERTIFIED');
  });

  it('should verify all enterprise integrations', async () => {
    const res = await service.verifyIntegrations();
    expect(res.success).toBe(true);
    expect(res.data.integrations.length).toBeGreaterThan(5);
    expect(res.data.overallStatus).toEqual('ALL_INTEGRATIONS_OPERATIONAL');
  });

  it('should run performance load test simulation', async () => {
    const res = await service.runPerformanceTest({ concurrentUsers: 1000 });
    expect(res.success).toBe(true);
    expect(res.data.simulatedConcurrentUsers).toEqual(1000);
    expect(res.data.metrics.errorRatePct).toEqual(0.0);
  });

  it('should verify security and compliance audit', async () => {
    const res = await service.verifySecurityAudit();
    expect(res.success).toBe(true);
    expect(res.data.audits.length).toBeGreaterThan(5);
    expect(res.data.complianceStatus).toEqual('PRODUCTION_SECURITY_HARDENED');
  });

  it('should verify backup and disaster recovery status', async () => {
    const res = await service.verifyBackupStatus();
    expect(res.success).toBe(true);
    expect(res.data.disasterRecovery.rpoTarget).toEqual('15 Minutes');
  });

  it('should return health dashboard metrics', async () => {
    const res = await service.getHealthDashboard();
    expect(res.success).toBe(true);
    expect(res.data.clusterStatus).toEqual('HEALTHY_GREEN');
  });
});
