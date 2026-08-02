import { Test, TestingModule } from '@nestjs/testing';
import { MigrationService } from './migration.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MigrationService', () => {
  let service: MigrationService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    migrationJob: {
      create: jest.fn().mockImplementation((args) =>
        Promise.resolve({
          id: 'job-uuid-101',
          ...args.data,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ),
      findUnique: jest.fn().mockImplementation((args) =>
        Promise.resolve({
          id: args.where.id,
          jobName: 'Test Customer Job',
          fileName: 'customer_import.csv',
          fileType: 'CSV',
          entityType: 'CUSTOMER',
          totalRecords: 2,
          validRecords: 2,
          failedRecords: 0,
          duplicateRecords: 0,
          status: 'VALIDATED',
          rawDataJson: JSON.stringify([
            { fullName: 'Test Customer 1', email: 'test1@sunite.com', mobile: '+919999900001' },
            { fullName: 'Test Customer 2', email: 'test2@sunite.com', mobile: '+919999900002' },
          ]),
        }),
      ),
      update: jest.fn().mockImplementation((args) =>
        Promise.resolve({
          id: args.where.id,
          ...args.data,
        }),
      ),
      findMany: jest.fn().mockResolvedValue([]),
    },
    migrationLog: {
      deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
      create: jest.fn().mockResolvedValue({ id: 'log-1' }),
      findMany: jest.fn().mockResolvedValue([]),
    },
    migrationRollback: {
      create: jest.fn().mockResolvedValue({ id: 'rb-1' }),
      findMany: jest.fn().mockResolvedValue([]),
      deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
    },
    organization: {
      findFirst: jest.fn().mockResolvedValue({ id: 'org-101', companyName: 'Sunite Test Org' }),
      create: jest.fn().mockResolvedValue({ id: 'org-101', companyName: 'Sunite Test Org' }),
    },
    customer: {
      findFirst: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: 'cust-101', fullName: 'Test Customer' }),
    },
    partner: {
      create: jest.fn().mockResolvedValue({ id: 'part-101', companyName: 'Test Partner' }),
    },
    project: {
      create: jest.fn().mockResolvedValue({ id: 'prj-101', projectName: 'Test Project' }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MigrationService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<MigrationService>(MigrationService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload migration data and create a job', async () => {
    const res = await service.uploadData({
      jobName: 'Batch Customer Migration',
      fileType: 'CSV',
      entityType: 'CUSTOMER',
      rawJsonData: [{ fullName: 'Sunite Energy', email: 'info@sunite.com', mobile: '+919876543210' }],
    });

    expect(res.success).toBe(true);
    expect(res.data.id).toEqual('job-uuid-101');
    expect(mockPrismaService.migrationJob.create).toHaveBeenCalled();
  });

  it('should validate migration data', async () => {
    const res = await service.validateData({ jobId: 'job-uuid-101' });
    expect(res.success).toBe(true);
    expect(res.data.summary.total).toBe(2);
  });
});
