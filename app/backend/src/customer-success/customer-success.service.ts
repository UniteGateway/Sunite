import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  OnboardCustomerDto,
  GoLiveSignOffDto,
  CreateSupportTicketDto,
  UpdateSupportTicketDto,
  EnrollTrainingDto,
  SubmitProductFeedbackDto,
} from './customer-success.dto';

@Injectable()
export class CustomerSuccessService {
  constructor(private prisma: PrismaService) {}

  /**
   * 1. Executive Operations & Customer Success Dashboard
   */
  async getDashboardMetrics() {
    return {
      statusCode: 200,
      success: true,
      data: {
        activeCustomersCount: 142,
        goLiveProjectsCount: 18,
        openSupportTicketsCount: 7,
        avgResolutionTimeHours: 1.8,
        avgHealthScore: 94,
        netRevenueRetentionPct: 118.5,
        renewalRatePct: 98.2,
        annualRecurringRevenueInr: 125000000, // ₹12.5 Cr ARR
        expansionRevenueInr: 18500000, // ₹1.85 Cr Expansion
        csatScore: 4.9,
        npsScore: 78,
      },
    };
  }

  /**
   * 2. Customer Health Dashboard & Risk Scores
   */
  async getHealthMetrics() {
    return {
      statusCode: 200,
      success: true,
      data: {
        healthOverview: {
          healthyPercentage: 88,
          moderateRiskPercentage: 9,
          criticalRiskPercentage: 3,
        },
        customersHealthList: [
          {
            tenantId: 'ORG-PILOT-001',
            customerName: 'Sunite CleanEnergy India Pvt Ltd',
            csmName: 'Ananya Sharma',
            lifecycleStage: 'ACTIVE',
            healthScore: 96,
            adoptionScore: 92,
            supportScore: 98,
            nrrPercentage: 125.0,
            renewalRisk: 'LOW',
            lastEbrDate: '2026-07-15',
            nextEbrDate: '2026-10-15',
          },
          {
            tenantId: 'ORG-CUST-102',
            customerName: 'Gujarat Solar Parks & Infrastructure',
            csmName: 'Rajesh Verma',
            lifecycleStage: 'EXPANSION',
            healthScore: 91,
            adoptionScore: 89,
            supportScore: 94,
            nrrPercentage: 118.0,
            renewalRisk: 'LOW',
            lastEbrDate: '2026-06-20',
            nextEbrDate: '2026-09-20',
          },
          {
            tenantId: 'ORG-CUST-103',
            customerName: 'Maharashtra Renewable Energy Corp',
            csmName: 'Priya Nair',
            lifecycleStage: 'ACTIVE',
            healthScore: 78,
            adoptionScore: 72,
            supportScore: 85,
            nrrPercentage: 102.0,
            renewalRisk: 'MEDIUM',
            lastEbrDate: '2026-05-10',
            nextEbrDate: '2026-08-10',
          },
        ],
      },
    };
  }

  /**
   * 3. Onboard Customer & Assign CSM
   */
  async onboardCustomer(dto: OnboardCustomerDto) {
    return {
      statusCode: 201,
      success: true,
      message: `Customer '${dto.customerName}' onboarded successfully to Customer Success Center.`,
      data: {
        tenantId: dto.tenantId,
        customerName: dto.customerName,
        csmName: dto.csmName || 'Ananya Sharma (Senior CSM)',
        lifecycleStage: 'ONBOARDING',
        initialHealthScore: 90,
        assignedPlaybook: 'ENTERPRISE_90_DAY_ONBOARDING_PLAYBOOK',
        onboardedAt: new Date(),
      },
    };
  }

  /**
   * 4. Implementation Projects
   */
  async getImplementationProjects() {
    return {
      statusCode: 200,
      success: true,
      data: {
        projects: [
          {
            id: 'IMP-701',
            tenantId: 'ORG-PILOT-001',
            projectName: 'Sunite CleanEnergy Phase 14 Pilot Go-Live',
            csmName: 'Ananya Sharma',
            leadEngineer: 'Vikram Mehta',
            status: 'COMPLETED_GO_LIVE',
            progressPct: 100,
            targetGoLive: '2026-08-01',
            signOffDate: '2026-08-01',
            checklistPassedCount: 24,
            checklistTotalCount: 24,
          },
          {
            id: 'IMP-702',
            tenantId: 'ORG-CUST-104',
            projectName: 'Rajasthan 100 MW MW Solar Plant SCADA Integration',
            csmName: 'Rajesh Verma',
            leadEngineer: 'Amit Kumar',
            status: 'UAT_TESTING',
            progressPct: 88,
            targetGoLive: '2026-08-15',
            checklistPassedCount: 21,
            checklistTotalCount: 24,
          },
        ],
      },
    };
  }

  /**
   * 5. Go-Live Sign-Off Execution
   */
  async goLiveSignOff(dto: GoLiveSignOffDto) {
    return {
      statusCode: 200,
      success: true,
      message: `Project '${dto.projectId}' signed off for Production Go-Live by ${dto.signedBy}.`,
      data: {
        projectId: dto.projectId,
        signedBy: dto.signedBy,
        signOffCertificateUrl: `https://sunite.io/certs/go-live-${dto.projectId}.pdf`,
        status: 'GO_LIVE_APPROVED',
        signedAt: new Date(),
      },
    };
  }

  /**
   * 6. Support Tickets Queue
   */
  async getSupportTickets() {
    return {
      statusCode: 200,
      success: true,
      data: {
        tickets: [
          {
            id: 'TCK-9001',
            tenantId: 'ORG-PILOT-001',
            subject: 'SCADA Modbus IP Telemetry Connection Timeout',
            priority: 'HIGH',
            category: 'SCADA',
            status: 'IN_PROGRESS',
            assignedAgent: 'Suresh Patel (Tier 2 Engineer)',
            slaRemainingMinutes: 45,
            createdAt: '2026-08-01 10:15:00',
          },
          {
            id: 'TCK-9002',
            tenantId: 'ORG-CUST-102',
            subject: 'GST Invoice Export PDF Format Customization',
            priority: 'MEDIUM',
            category: 'FINANCE',
            status: 'RESOLVED',
            assignedAgent: 'Kavita Roy',
            resolutionNotes: 'Updated e-invoice template mapping in Finance settings.',
            createdAt: '2026-07-31 14:20:00',
          },
        ],
      },
    };
  }

  /**
   * 7. Create Support Ticket
   */
  async createSupportTicket(dto: CreateSupportTicketDto) {
    return {
      statusCode: 201,
      success: true,
      message: `Support Ticket created successfully with SLA priority ${dto.priority}.`,
      data: {
        ticketId: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
        tenantId: dto.tenantId,
        subject: dto.subject,
        priority: dto.priority,
        category: dto.category,
        status: 'OPEN',
        slaTargetHours: dto.priority === 'CRITICAL' ? 1 : dto.priority === 'HIGH' ? 4 : 24,
        createdAt: new Date(),
      },
    };
  }

  /**
   * 8. Update Support Ticket
   */
  async updateSupportTicket(id: string, dto: UpdateSupportTicketDto) {
    return {
      statusCode: 200,
      success: true,
      message: `Support Ticket '${id}' updated successfully.`,
      data: {
        ticketId: id,
        status: dto.status || 'IN_PROGRESS',
        resolutionNotes: dto.resolutionNotes || null,
        assignedAgent: dto.assignedAgent || 'Tier 2 Support Engineer',
        updatedAt: new Date(),
      },
    };
  }

  /**
   * 9. Training Courses & Role Learning Paths
   */
  async getTrainingCourses() {
    return {
      statusCode: 200,
      success: true,
      data: {
        courses: [
          {
            code: 'TRN-101',
            title: 'Sunite Platform Certified Administrator',
            targetRole: 'ADMIN',
            durationMinutes: 120,
            modulesCount: 8,
            passingScore: 85,
            enrolledCount: 340,
            certifiedCount: 295,
          },
          {
            code: 'TRN-201',
            title: 'Solar Engineer SCADA Telemetry & Inverter Setup',
            targetRole: 'FIELD_ENGINEER',
            durationMinutes: 90,
            modulesCount: 6,
            passingScore: 80,
            enrolledCount: 520,
            certifiedCount: 480,
          },
          {
            code: 'TRN-301',
            title: 'GST Invoicing, Subsidy & Finance Management',
            targetRole: 'FINANCE',
            durationMinutes: 60,
            modulesCount: 4,
            passingScore: 80,
            enrolledCount: 210,
            certifiedCount: 198,
          },
        ],
      },
    };
  }

  /**
   * 10. Enroll in Training Course
   */
  async enrollTraining(dto: EnrollTrainingDto) {
    return {
      statusCode: 201,
      success: true,
      message: `User '${dto.userName}' enrolled in course '${dto.courseCode}'.`,
      data: {
        enrollmentId: `ENR-${Math.floor(1000 + Math.random() * 9000)}`,
        userName: dto.userName,
        courseCode: dto.courseCode,
        status: 'IN_PROGRESS',
        progressPct: 0,
        enrolledAt: new Date(),
      },
    };
  }

  /**
   * 11. Knowledge Base Search & Articles
   */
  async getKnowledgeBase() {
    return {
      statusCode: 200,
      success: true,
      data: {
        categories: [
          'Installation & Commissioning',
          'SCADA IoT Configuration',
          'Troubleshooting & Fault Clearance',
          'Finance & GST Tax Invoicing',
          'API & Webhook Documentation',
        ],
        articles: [
          {
            articleId: 'KB-101',
            title: 'Connecting Sungrow & Huawei Inverters to SCADA Gateway',
            category: 'SCADA IoT Configuration',
            viewCount: 1240,
            helpfulVotes: 382,
            content: 'Step-by-step guide on setting RS485 Modbus RTU register addresses and TCP port 502 mappings.',
          },
          {
            articleId: 'KB-102',
            title: 'Generating E-Invoices with 18% GST and State DISCOM Subsidies',
            category: 'Finance & GST Tax Invoicing',
            viewCount: 980,
            helpfulVotes: 290,
            content: 'How to configure dynamic HSN code 8541 and auto-reconcile Razorpay online payments.',
          },
          {
            articleId: 'KB-103',
            title: 'REST API & Webhooks Quickstart Guide',
            category: 'API & Webhook Documentation',
            viewCount: 1850,
            helpfulVotes: 610,
            content: 'Authentication headers, HMAC signatures, and event hooks for SCADA telemetry alerts.',
          },
        ],
      },
    };
  }

  /**
   * 12. Submit Product Feedback or Feature Request
   */
  async submitProductFeedback(dto: SubmitProductFeedbackDto) {
    return {
      statusCode: 201,
      success: true,
      message: `Feedback submitted successfully under status 'UNDER_REVIEW'.`,
      data: {
        feedbackId: `PFB-${Math.floor(1000 + Math.random() * 9000)}`,
        tenantId: dto.tenantId,
        userName: dto.userName,
        title: dto.title,
        type: dto.type,
        votes: 1,
        status: 'UNDER_REVIEW',
        submittedAt: new Date(),
      },
    };
  }

  /**
   * 13. Release Center & Product Notes
   */
  async getReleaseNotes() {
    return {
      statusCode: 200,
      success: true,
      data: {
        releases: [
          {
            version: 'v1.0.0-phase14.2',
            releaseName: 'Sunite Enterprise Commercial Go-Live & CS Release',
            releaseDate: '2026-08-01',
            highlights: 'Added Phase 14.2 Customer Success Platform, Implementation Manager, Support Desk, Training Academy, and Release Center.',
            breakingChanges: 'None. 100% backward compatible.',
          },
          {
            version: 'v1.0.0-phase14.1',
            releaseName: 'Pilot Deployment & Load Testing Certification',
            releaseDate: '2026-07-28',
            highlights: 'Validated 19-step E2E business workflow, 5,000 user benchmark, Docker & Kubernetes manifests.',
            breakingChanges: 'None.',
          },
        ],
      },
    };
  }

  /**
   * 14. Renewal Center & AMC Forecast
   */
  async getRenewalForecasts() {
    return {
      statusCode: 200,
      success: true,
      data: {
        renewalSummary: {
          totalUpcomingArrInr: 45000000,
          renewedArrInr: 38000000,
          atRiskArrInr: 3500000,
          renewalLikelihoodAvgPct: 94,
        },
        forecastList: [
          {
            id: 'RNW-101',
            tenantId: 'ORG-PILOT-001',
            customerName: 'Sunite CleanEnergy India Pvt Ltd',
            contractType: 'ENTERPRISE_SAAS',
            mrrAmountInr: 500000,
            arrAmountInr: 6000000,
            expiryDate: '2027-08-01',
            renewalLikelihoodPct: 98,
            status: 'UPCOMING',
          },
          {
            id: 'RNW-102',
            tenantId: 'ORG-CUST-102',
            customerName: 'Gujarat Solar Parks',
            contractType: 'AMC_MAINTENANCE',
            mrrAmountInr: 350000,
            arrAmountInr: 4200000,
            expiryDate: '2026-09-30',
            renewalLikelihoodPct: 92,
            status: 'UPCOMING',
          },
        ],
      },
    };
  }
}
