import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionService } from './execution.service';
import { ExecutionRepository } from './execution.repository';

describe('ExecutionService', () => {
  let service: ExecutionService;
  let repository: ExecutionRepository;

  const mockRepository = {
    createOrder: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'ord-123', ...dto, status: 'CONFIRMED' })),
    findOrderById: jest.fn().mockImplementation((id) => Promise.resolve({ id, orderNumber: 'ORD-2026-8001', status: 'CONFIRMED' })),
    findAllOrders: jest.fn().mockResolvedValue([{ id: 'ord-123', orderNumber: 'ORD-2026-8001' }]),
    createProject: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'prj-123', ...dto, stage: 'ORDER_CONFIRMED', status: 'IN_PROGRESS' })),
    findProjectById: jest.fn().mockImplementation((id) => Promise.resolve({ id, projectNumber: 'PRJ-2026-7001', stage: 'ORDER_CONFIRMED', status: 'IN_PROGRESS' })),
    findAllProjects: jest.fn().mockResolvedValue([{ id: 'prj-123', projectNumber: 'PRJ-2026-7001' }]),
    updateProject: jest.fn().mockImplementation((id, data) => Promise.resolve({ id, ...data })),
    createPurchaseOrder: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'po-123', ...dto, status: 'ISSUED' })),
    findAllPurchaseOrders: jest.fn().mockResolvedValue([{ id: 'po-123', poNumber: 'PO-2026-5001' }]),
    findAllInventory: jest.fn().mockResolvedValue([{ sku: 'MOD-550W-MONO', itemName: '550Wp Mono PERC' }]),
    createMaterialDispatch: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'disp-123', ...dto, status: 'DISPATCHED' })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExecutionService,
        { provide: ExecutionRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<ExecutionService>(ExecutionService);
    repository = module.get<ExecutionRepository>(ExecutionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order', async () => {
    const res = await service.createOrder({ capacityKw: 100 } as any);
    expect(res.status).toBe('CONFIRMED');
  });

  it('should create a project', async () => {
    const res = await service.createProject({ capacityKw: 100.0 });
    expect(res.stage).toBe('ORDER_CONFIRMED');
  });

  it('should update project stage', async () => {
    const res = await service.updateStage('prj-123', { stage: 'INSTALLATION_STARTED' });
    expect(res.stage).toBe('INSTALLATION_STARTED');
  });

  it('should record quality check', async () => {
    const res = await service.qualityCheck('prj-123', { inspectionResult: 'PASSED' });
    expect(res.stage).toBe('QUALITY_INSPECTION_COMPLETED');
  });

  it('should commission project', async () => {
    const res = await service.commission('prj-123', { discomName: 'MSEDCL' });
    expect(res.stage).toBe('COMMISSIONED');
  });
});
