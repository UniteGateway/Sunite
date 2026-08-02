import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ReportsService', () => {
  let service: ReportsService;

  const mockPrismaService = {
    customer: { count: jest.fn().mockResolvedValue(420) },
    partner: { count: jest.fn().mockResolvedValue(85) },
    project: { count: jest.fn().mockResolvedValue(310) },
    savedReport: {
      create: jest.fn().mockImplementation((args) =>
        Promise.resolve({ id: 'saved-101', ...args.data, createdAt: new Date() }),
      ),
      findMany: jest.fn().mockResolvedValue([]),
    },
    scheduledReport: {
      create: jest.fn().mockImplementation((args) =>
        Promise.resolve({ id: 'sched-101', ...args.data, createdAt: new Date() }),
      ),
      findMany: jest.fn().mockResolvedValue([]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve executive dashboard analytics', async () => {
    const res = await service.getExecutiveDashboard();
    expect(res.success).toBe(true);
    expect(res.data.kpis.totalRevenue.formatted).toEqual('₹14.85 Cr');
  });

  it('should retrieve sales analytics', async () => {
    const res = await service.getSalesAnalytics();
    expect(res.success).toBe(true);
    expect(res.data.leadSources.length).toBeGreaterThan(0);
  });

  it('should execute custom report builder', async () => {
    const res = await service.executeCustomReport({
      reportName: 'Custom Customer Growth',
      entityType: 'CUSTOMER',
      columns: ['code', 'name', 'capacityKw'],
    });
    expect(res.success).toBe(true);
    expect(res.data.records.length).toBe(10);
  });

  it('should export report in PDF/Excel/CSV format', async () => {
    const res = await service.exportReport({
      reportType: 'DASHBOARD',
      format: 'PDF',
    });
    expect(res.success).toBe(true);
    expect(res.data.format).toEqual('PDF');
  });

  it('should schedule recurring report', async () => {
    const res = await service.scheduleReport({
      reportName: 'Weekly Executive Summary',
      reportType: 'DASHBOARD',
      frequency: 'WEEKLY',
      recipients: ['ceo@sunite.com'],
    });
    expect(res.success).toBe(true);
    expect(res.data.frequency).toEqual('WEEKLY');
  });
});
