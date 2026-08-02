import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTenantDto,
  CreateSubscriptionDto,
  CreateLicenseDto,
  GenerateInvoiceDto,
  ReportUsageDto,
  CreateResellerDto,
} from './saas.dto';

@Injectable()
export class SaasService {
  constructor(private prisma: PrismaService) {}

  /**
   * 1. Tenant Management & Provisioning
   */
  async createTenant(dto: CreateTenantDto) {
    const tenant = await this.prisma.saasTenant.create({
      data: {
        name: dto.name,
        domain: dto.domain,
        plan: dto.plan || 'ENTERPRISE',
        logoUrl: dto.logoUrl || null,
        primaryColor: dto.primaryColor || '#f59e0b',
        whiteLabel: dto.whiteLabel ?? true,
        maxUsers: dto.maxUsers || 100,
        managedMw: dto.managedMw || 50.0,
        status: 'ACTIVE',
      },
    });

    return {
      statusCode: 201,
      success: true,
      message: `Tenant '${tenant.name}' provisioned successfully on domain '${tenant.domain}'.`,
      data: tenant,
    };
  }

  async getTenants() {
    const tenants = await this.prisma.saasTenant.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return {
      statusCode: 200,
      success: true,
      count: tenants.length,
      data: tenants,
    };
  }

  async getTenantById(id: string) {
    const tenant = await this.prisma.saasTenant.findUnique({
      where: { id },
    });
    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }
    return {
      statusCode: 200,
      success: true,
      data: tenant,
    };
  }

  /**
   * 2. Subscription Engine & Billing Cycles
   */
  async createSubscription(dto: CreateSubscriptionDto) {
    const nextDate = new Date();
    if (dto.billingCycle === 'MONTHLY') nextDate.setMonth(nextDate.getMonth() + 1);
    else if (dto.billingCycle === 'QUARTERLY') nextDate.setMonth(nextDate.getMonth() + 3);
    else if (dto.billingCycle === 'HALF_YEARLY') nextDate.setMonth(nextDate.getMonth() + 6);
    else if (dto.billingCycle === 'ANNUAL') nextDate.setFullYear(nextDate.getFullYear() + 1);
    else nextDate.setFullYear(nextDate.getFullYear() + 100); // Lifetime

    const subscription = await this.prisma.saasSubscription.create({
      data: {
        tenantId: dto.tenantId,
        planType: dto.planType,
        billingCycle: dto.billingCycle,
        amountInr: dto.amountInr,
        status: 'ACTIVE',
        nextBillingDate: nextDate,
      },
    });

    return {
      statusCode: 201,
      success: true,
      message: `Subscription created for plan ${dto.planType} (${dto.billingCycle}). Next billing: ${nextDate.toISOString().split('T')[0]}`,
      data: subscription,
    };
  }

  async getSubscriptions() {
    const subs = await this.prisma.saasSubscription.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return {
      statusCode: 200,
      success: true,
      data: subs,
    };
  }

  /**
   * 3. License Engine & Feature Flags
   */
  async createLicense(dto: CreateLicenseDto) {
    const licenseKey = `SUN-LIC-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const expires = new Date();
    expires.setDate(expires.getDate() + (dto.validityDays || 365));

    const license = await this.prisma.saasLicense.create({
      data: {
        tenantId: dto.tenantId,
        licenseKey,
        licenseType: dto.licenseType,
        featureFlags: dto.featureFlags,
        isTrial: dto.isTrial ?? false,
        expiresAt: expires,
      },
    });

    return {
      statusCode: 201,
      success: true,
      message: `License key '${licenseKey}' issued. Valid till ${expires.toISOString().split('T')[0]}`,
      data: license,
    };
  }

  async getLicenses() {
    const licenses = await this.prisma.saasLicense.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return {
      statusCode: 200,
      success: true,
      data: licenses,
    };
  }

  /**
   * 4. Billing Engine & Invoice Generation
   */
  async generateInvoice(dto: GenerateInvoiceDto) {
    const invoiceNo = `INV-SAAS-${Date.now()}`;
    const gstAmount = dto.amountInr * 0.18; // 18% GST for B2B SaaS
    const totalAmount = dto.amountInr + gstAmount;

    return {
      statusCode: 201,
      success: true,
      message: `SaaS Tax Invoice ${invoiceNo} generated for ₹${totalAmount.toLocaleString('en-IN')}`,
      data: {
        invoiceNo,
        subscriptionId: dto.subscriptionId,
        subtotalInr: dto.amountInr,
        gst18Inr: gstAmount,
        totalInr: totalAmount,
        status: 'ISSUED_UNPAID',
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days due
      },
    };
  }

  async getBillingHistory() {
    return {
      statusCode: 200,
      success: true,
      data: {
        mrrInr: 1850000, // ₹18.5 Lakhs MRR
        arrInr: 22200000, // ₹2.22 Cr ARR
        churnRatePct: 0.8, // 0.8% low enterprise churn
        renewalRatePct: 99.2,
        invoices: [
          { invoiceNo: 'INV-SAAS-901', tenant: 'Tata Power Renewable Ltd.', plan: 'UTILITY_GRID', amountInr: 450000, status: 'PAID', date: '2026-07-10' },
          { invoiceNo: 'INV-SAAS-902', tenant: 'Adani Green Energy Ltd.', plan: 'ENTERPRISE', amountInr: 350000, status: 'PAID', date: '2026-07-15' },
          { invoiceNo: 'INV-SAAS-903', tenant: 'ReNew Power Solar', plan: 'ENTERPRISE', amountInr: 350000, status: 'ISSUED_UNPAID', dueDate: '2026-08-15' },
        ],
      },
    };
  }

  /**
   * 5. Usage Metering
   */
  async reportUsage(dto: ReportUsageDto) {
    return {
      statusCode: 200,
      success: true,
      message: `Usage reported for tenant ID ${dto.tenantId}`,
      data: {
        tenantId: dto.tenantId,
        activeUsers: dto.activeUsers || 42,
        managedMw: dto.managedMw || 120.5,
        scadaDevices: dto.scadaDevices || 85,
        aiRequests: dto.aiRequests || 1240,
        apiCalls: dto.apiCalls || 89200,
        storageGb: 48.2,
        reportedAt: new Date(),
      },
    };
  }

  /**
   * 6. Solar B2B Marketplace
   */
  async getMarketplace() {
    return {
      statusCode: 200,
      success: true,
      data: [
        { id: 'MKT-101', category: 'SOLAR_MODULES', title: 'LONGi Hi-MO 6 580W N-Type Mono PERC', manufacturer: 'LONGi Green Energy', pricePerWpInr: 16.5, inStockMw: 45.0, minOrderKw: 100 },
        { id: 'MKT-102', category: 'INVERTERS', title: 'Sungrow SG350HX 1500V String Inverter', manufacturer: 'Sungrow Power Supply', pricePerUnitInr: 680000, inStockUnits: 120, rating: '580 kW Output' },
        { id: 'MKT-103', category: 'BESS', title: 'CATL 2.1 MWh Containerized BESS Energy Storage', manufacturer: 'CATL Battery Solutions', pricePerUnitInr: 18500000, inStockUnits: 15, rating: '2.1 MWh Capacity' },
        { id: 'MKT-104', category: 'STRUCTURES', title: 'Sunite HDG High Wind Load Solar Racking', manufacturer: 'Sunite Structural Works', pricePerKgInr: 92.0, inStockTons: 850.0 },
      ],
    };
  }

  /**
   * 7. Reseller & Partner Portal
   */
  async createReseller(dto: CreateResellerDto) {
    return {
      statusCode: 201,
      success: true,
      message: `Reseller partner '${dto.partnerName}' onboarding completed. Commission rate: ${dto.commissionPct}%`,
      data: {
        partnerId: `RSL-${Math.floor(1000 + Math.random() * 9000)}`,
        partnerName: dto.partnerName,
        contactEmail: dto.contactEmail,
        commissionPct: dto.commissionPct,
        region: dto.region || 'INDIA_WEST',
        status: 'ACTIVE_CERTIFIED',
        totalTenantsReferred: 0,
        totalCommissionEarnedInr: 0,
      },
    };
  }

  /**
   * 8. Customer Success Platform
   */
  async getCustomerSuccessMetrics() {
    return {
      statusCode: 200,
      success: true,
      data: {
        globalHealthScoreAvg: 94.2, // Health score out of 100
        churnRiskTenantsCount: 0,
        highEngagementTenantsPct: 98.5,
        renewalPredictions: [
          { tenantName: 'Sanand Industrial Polymers Ltd.', renewalDate: '2026-11-15', likelihood: '99% VERY_HIGH', healthScore: 98 },
          { tenantName: 'Gujarat Solar Park Utilities', renewalDate: '2026-12-01', likelihood: '96% HIGH', healthScore: 92 },
        ],
      },
    };
  }
}
