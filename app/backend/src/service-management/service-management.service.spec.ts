import { Test, TestingModule } from '@nestjs/testing';
import { ServiceManagementService } from './service-management.service';
import { ServiceManagementRepository } from './service-management.repository';

describe('ServiceManagementService', () => {
  let service: ServiceManagementService;
  let repository: ServiceManagementRepository;

  const mockRepository = {
    createWarranty: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'wrn-123', ...dto, status: 'ACTIVE' })),
    findWarrantyById: jest.fn().mockImplementation((id) => Promise.resolve({ id, warrantyNumber: 'WRN-2026-9001', status: 'ACTIVE' })),
    findAllWarranties: jest.fn().mockResolvedValue([{ id: 'wrn-123', warrantyNumber: 'WRN-2026-9001', status: 'ACTIVE' }]),
    updateWarranty: jest.fn().mockImplementation((id, data) => Promise.resolve({ id, ...data })),
    createAmc: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'amc-123', ...dto, status: 'ACTIVE' })),
    findAmcById: jest.fn().mockImplementation((id) => Promise.resolve({ id, amcNumber: 'AMC-2026-3001', planName: 'GOLD' })),
    findAllAmcs: jest.fn().mockResolvedValue([{ id: 'amc-123', amcNumber: 'AMC-2026-3001', status: 'ACTIVE' }]),
    updateAmc: jest.fn().mockImplementation((id, data) => Promise.resolve({ id, ...data })),
    createServiceTicket: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'tkt-123', ...dto, status: 'OPEN' })),
    findServiceTicketById: jest.fn().mockImplementation((id) => Promise.resolve({ id, ticketNumber: 'TKT-2026-5001', status: 'OPEN' })),
    findAllServiceTickets: jest.fn().mockResolvedValue([{ id: 'tkt-123', ticketNumber: 'TKT-2026-5001', status: 'OPEN' }]),
    updateServiceTicket: jest.fn().mockImplementation((id, data) => Promise.resolve({ id, ...data })),
    createServiceVisit: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'vst-123', ...dto, status: 'COMPLETED' })),
    findAllServiceVisits: jest.fn().mockResolvedValue([{ id: 'vst-123', visitNumber: 'VST-2026-7001' }]),
    createSparePart: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'prt-123', ...dto })),
    findAllSpareParts: jest.fn().mockResolvedValue([{ id: 'prt-123', sku: 'SPD-DC-1000V', quantity: 45 }]),
    createWarrantyClaim: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'clm-123', ...dto, status: 'SUBMITTED' })),
    findAllWarrantyClaims: jest.fn().mockResolvedValue([{ id: 'clm-123', claimNumber: 'CLM-2026-8001' }]),
    createCustomerFeedback: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'fdb-123', ...dto })),
    findAllCustomerFeedbacks: jest.fn().mockResolvedValue([{ id: 'fdb-123', rating: 5, npsScore: 10 }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceManagementService,
        { provide: ServiceManagementRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<ServiceManagementService>(ServiceManagementService);
    repository = module.get<ServiceManagementRepository>(ServiceManagementRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create warranty certificate', async () => {
    const res = await service.createWarranty({ panelWarrantyYears: 25, inverterWarrantyYears: 10 });
    expect(res.status).toBe('ACTIVE');
  });

  it('should create AMC contract', async () => {
    const res = await service.createAmc({ planName: 'GOLD', annualPrice: 45000 });
    expect(res.status).toBe('ACTIVE');
  });

  it('should create service ticket', async () => {
    const res = await service.createServiceTicket({ description: 'Inverter trip code E031' });
    expect(res.status).toBe('OPEN');
  });

  it('should assign engineer to ticket', async () => {
    const res = await service.assignEngineer('tkt-123', { assignedEngineerId: 'usr-eng-001' });
    expect(res.status).toBe('ASSIGNED');
  });

  it('should record site visit and update ticket', async () => {
    const res = await service.recordVisit('tkt-123', { diagnosis: 'Blown SPD', repairDetails: 'Replaced SPD module' });
    expect(res.status).toBe('COMPLETED');
  });

  it('should close service ticket', async () => {
    const res = await service.closeServiceTicket('tkt-123', { resolution: 'Inverter testing ok.' });
    expect(res.status).toBe('CLOSED');
  });

  it('should fetch SLA compliance report', async () => {
    const res = await service.getSlaReport();
    expect(res.status).toBe('EXCEEDING_SLA_BENCHMARK');
  });
});
