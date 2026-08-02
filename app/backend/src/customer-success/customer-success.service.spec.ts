import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSuccessService } from './customer-success.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CustomerSuccessService', () => {
  let service: CustomerSuccessService;

  const mockPrismaService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerSuccessService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CustomerSuccessService>(CustomerSuccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return executive customer success dashboard metrics', async () => {
    const res = await service.getDashboardMetrics();
    expect(res.success).toBe(true);
    expect(res.data.activeCustomersCount).toBeGreaterThan(100);
    expect(res.data.avgHealthScore).toEqual(94);
  });

  it('should return health metrics and customer risk scores', async () => {
    const res = await service.getHealthMetrics();
    expect(res.success).toBe(true);
    expect(res.data.customersHealthList.length).toBeGreaterThan(0);
    expect(res.data.healthOverview.healthyPercentage).toEqual(88);
  });

  it('should onboard customer and assign CSM', async () => {
    const res = await service.onboardCustomer({
      tenantId: 'ORG-TEST-99',
      customerName: 'Test Solar Energy Ltd',
      csmName: 'Ananya Sharma',
    });
    expect(res.success).toBe(true);
    expect(res.data.lifecycleStage).toEqual('ONBOARDING');
  });

  it('should return implementation projects list', async () => {
    const res = await service.getImplementationProjects();
    expect(res.success).toBe(true);
    expect(res.data.projects.length).toBeGreaterThan(0);
  });

  it('should sign off go-live for project', async () => {
    const res = await service.goLiveSignOff({
      projectId: 'IMP-701',
      signedBy: 'Rajesh Mehta (VP Engineering)',
    });
    expect(res.success).toBe(true);
    expect(res.data.status).toEqual('GO_LIVE_APPROVED');
  });

  it('should create and fetch support tickets', async () => {
    const createRes = await service.createSupportTicket({
      tenantId: 'ORG-TEST-99',
      subject: 'Inverter SCADA Gateway Error',
      priority: 'HIGH',
      category: 'SCADA',
      description: 'Gateway losing connection every 30 minutes',
    });
    expect(createRes.success).toBe(true);
    expect(createRes.data.status).toEqual('OPEN');

    const getRes = await service.getSupportTickets();
    expect(getRes.success).toBe(true);
    expect(getRes.data.tickets.length).toBeGreaterThan(0);
  });

  it('should return training courses and handle enrollment', async () => {
    const coursesRes = await service.getTrainingCourses();
    expect(coursesRes.success).toBe(true);
    expect(coursesRes.data.courses.length).toBeGreaterThan(0);

    const enrollRes = await service.enrollTraining({
      tenantId: 'ORG-TEST-99',
      userName: 'Amit Shah',
      courseCode: 'TRN-101',
    });
    expect(enrollRes.success).toBe(true);
    expect(enrollRes.data.courseCode).toEqual('TRN-101');
  });

  it('should return knowledge base articles and categories', async () => {
    const res = await service.getKnowledgeBase();
    expect(res.success).toBe(true);
    expect(res.data.articles.length).toBeGreaterThan(0);
  });

  it('should submit product feedback', async () => {
    const res = await service.submitProductFeedback({
      tenantId: 'ORG-TEST-99',
      userName: 'Pooja Verma',
      title: 'Dark Mode UI Toggle for SCADA',
      type: 'FEATURE_REQUEST',
      description: 'Add a dark theme for night monitoring in dispatch room',
    });
    expect(res.success).toBe(true);
    expect(res.data.status).toEqual('UNDER_REVIEW');
  });

  it('should return release notes and renewal forecasts', async () => {
    const releasesRes = await service.getReleaseNotes();
    expect(releasesRes.success).toBe(true);
    expect(releasesRes.data.releases.length).toBeGreaterThan(0);

    const renewalsRes = await service.getRenewalForecasts();
    expect(renewalsRes.success).toBe(true);
    expect(renewalsRes.data.forecastList.length).toBeGreaterThan(0);
  });
});
