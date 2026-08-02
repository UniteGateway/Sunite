import { Test, TestingModule } from '@nestjs/testing';
import { OperationsService } from './operations.service';
import { PrismaService } from '../prisma/prisma.service';

describe('OperationsService', () => {
  let service: OperationsService;

  const mockPrismaService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperationsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OperationsService>(OperationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return global operations dashboard metrics', async () => {
    const res = await service.getDashboard();
    expect(res.success).toBe(true);
    expect(res.data.systemAvailabilityPct).toBeGreaterThan(99.9);
    expect(res.data.servicesHealth.apiGateway).toEqual('HEALTHY');
  });

  it('should return system health checks', async () => {
    const res = await service.getHealth();
    expect(res.success).toBe(true);
    expect(res.data.overallStatus).toEqual('OPERATIONAL');
    expect(res.data.components.length).toBeGreaterThan(0);
  });

  it('should create and fetch incidents', async () => {
    const createRes = await service.createIncident({
      title: 'PostgreSQL Database Connection Pool Exhaustion Test',
      severity: 'SEV-2',
      category: 'DATABASE',
      assignedLead: 'Vikram Mehta',
      impactedTenants: 'ORG-PILOT-001',
    });
    expect(createRes.success).toBe(true);
    expect(createRes.data.status).toEqual('OPEN');

    const getRes = await service.getIncidents();
    expect(getRes.success).toBe(true);
    expect(getRes.data.incidents.length).toBeGreaterThan(0);
  });

  it('should update incident status', async () => {
    const res = await service.updateIncident('INC-2026-801', {
      status: 'MITIGATED',
      resolutionNotes: 'Restarted telemetry gateway connection pool',
    });
    expect(res.success).toBe(true);
    expect(res.data.status).toEqual('MITIGATED');
  });

  it('should return security threat metrics and alerts', async () => {
    const res = await service.getSecurity();
    expect(res.success).toBe(true);
    expect(res.data.socSummary.threatLevel).toEqual('LOW');
    expect(res.data.recentAlerts.length).toBeGreaterThan(0);
  });

  it('should return backup logs and DR status', async () => {
    const res = await service.getBackups();
    expect(res.success).toBe(true);
    expect(res.data.drSummary.rpoTargetMinutes).toEqual(5);
    expect(res.data.backupJobs.length).toBeGreaterThan(0);
  });

  it('should return capacity metrics and SLA report', async () => {
    const capRes = await service.getCapacity();
    expect(capRes.success).toBe(true);
    expect(capRes.data.nodeMetrics.length).toBeGreaterThan(0);

    const slaRes = await service.getSla();
    expect(slaRes.success).toBe(true);
    expect(slaRes.data.slaReport.actualUptimePct).toBeGreaterThan(99.9);
  });
});
