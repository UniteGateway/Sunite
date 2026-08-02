import { Test, TestingModule } from '@nestjs/testing';
import { AiScadaService } from './ai-scada.service';
import { AiScadaRepository } from './ai-scada.repository';

describe('AiScadaService', () => {
  let service: AiScadaService;
  let repository: AiScadaRepository;

  const mockRepository = {
    createAiLog: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'log-123', ...dto })),
    createScadaPlant: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'plt-123', ...dto, status: 'ONLINE' })),
    findAllScadaPlants: jest.fn().mockResolvedValue([{ id: 'plt-123', plantCode: 'SCD-PLT-1001', status: 'ONLINE' }]),
    createScadaDevice: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'dev-123', ...dto, status: 'ACTIVE' })),
    findAllScadaDevices: jest.fn().mockResolvedValue([{ id: 'dev-123', deviceCode: 'SCD-DEV-2001' }]),
    findAllTelemetries: jest.fn().mockResolvedValue([{ activePowerKw: 84.6, performanceRatio: 83.4 }]),
    findAllAlarms: jest.fn().mockResolvedValue([{ alarmCode: 'ALM-101', severity: 'WARNING' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiScadaService,
        { provide: AiScadaRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<AiScadaService>(AiScadaService);
    repository = module.get<AiScadaRepository>(AiScadaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process AI chat request', async () => {
    const res = await service.processAiChat({ prompt: 'What is optimal DC/AC ratio?', provider: 'GEMINI', persona: 'ENGINEERING_COPILOT' });
    expect(res.provider).toBe('GEMINI');
    expect(res.response).toContain('Engineering Copilot');
  });

  it('should process electricity bill OCR', async () => {
    const res = await service.processElectricityBillOcr({ fileUrl: 'https://cdn.sunite.com/bills/bill.pdf' });
    expect(res.status).toBe('SUCCESS');
    expect(res.extractedData.sanctionedLoadKw).toBe(150.0);
  });

  it('should process GST certificate OCR', async () => {
    const res = await service.processGstOcr({ fileUrl: 'https://cdn.sunite.com/docs/gst.pdf' });
    expect(res.status).toBe('SUCCESS');
    expect(res.extractedData.gstin).toBe('24AAACS1234A1Z5');
  });

  it('should analyze roof feasibility', async () => {
    const res = await service.analyzeRoof({ imageUrl: 'https://cdn.sunite.com/satellite/roof.jpg', totalAreaSqm: 1200 });
    expect(res.usableSolarAreaSqm).toBe(900);
  });

  it('should generate solar design recommendation', async () => {
    const res = await service.generateDesignRecommendation({ requiredCapacityKw: 100 });
    expect(res.recommendedCapacityKw).toBe(100);
  });

  it('should generate commercial pricing recommendation', async () => {
    const res = await service.generatePricingRecommendation({ capacityKw: 100 });
    expect(res.recommendedMarginPct).toBe(14.5);
  });

  it('should predict project delay risk', async () => {
    const res = await service.predictProjectRisk({ projectId: 'prj-123' });
    expect(res.riskLevel).toBe('LOW_RISK');
  });

  it('should diagnose service fault', async () => {
    const res = await service.diagnoseServiceFault({ faultDescription: 'Inverter error E031' });
    expect(res.confidenceScore).toBe(0.94);
  });

  it('should return telemetry and analytics', async () => {
    const res = await service.getTelemetry('plt-123');
    expect(res).toBeDefined();
  });

  it('should return executive dashboard data', async () => {
    const res = await service.getExecutiveDashboard();
    expect(res.businessHealthScore).toBe(94.5);
  });
});
