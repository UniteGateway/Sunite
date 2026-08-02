import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface OnboardOrganizationDto {
  companyName: string;
  legalName: string;
  gstin: string;
  currency?: string;
  adminEmail: string;
  adminFirstName: string;
  adminLastName: string;
  adminMobile: string;
  branches?: Array<{
    branchCode: string;
    branchName: string;
    city: string;
    state: string;
    address: string;
    postalCode: string;
  }>;
  smtpConfig?: { host: string; port: number; user: string };
  whatsappConfig?: { accountSid: string; apiKey: string };
  paymentGatewayConfig?: { gateway: string; merchantId: string };
}

export interface OnboardCustomerDto {
  organizationId?: string;
  fullName: string;
  email: string;
  mobile: string;
  gstin?: string;
  city: string;
  state: string;
  sanctionedKw?: number;
  electricityConsumerNumber?: string;
  discomName?: string;
  plantCapacityKw?: number;
}

export interface OnboardPartnerDto {
  organizationId?: string;
  companyName: string;
  partnerType: 'EPC' | 'FRANCHISE' | 'MARKETING_PARTNER' | 'VENDOR';
  contactPerson: string;
  email: string;
  mobile: string;
  gstin?: string;
}

@Injectable()
export class OnboardingService {
  constructor(private prisma: PrismaService) {}

  /**
   * Complete Enterprise Organization Onboarding (Org + Branch + Admin User + Integrations)
   */
  async onboardOrganization(dto: OnboardOrganizationDto) {
    // 1. Create Organization
    const org = await this.prisma.organization.create({
      data: {
        companyName: dto.companyName,
        legalName: dto.legalName || dto.companyName,
        taxId: dto.gstin,
        currency: dto.currency || 'INR',
        status: 'ACTIVE',
      },
    });

    // 2. Create Default Branch
    let defaultBranch;
    if (dto.branches && dto.branches.length > 0) {
      const b = dto.branches[0];
      defaultBranch = await this.prisma.branch.create({
        data: {
          organizationId: org.id,
          branchCode: b.branchCode || `BR-${Date.now().toString().slice(-4)}`,
          branchName: b.branchName || 'Headquarters Branch',
          city: b.city || 'Ahmedabad',
          state: b.state || 'Gujarat',
          postalCode: b.postalCode || '380001',
          address: b.address || 'Main Road',
        },
      });
    } else {
      defaultBranch = await this.prisma.branch.create({
        data: {
          organizationId: org.id,
          branchCode: `BR-HQ-${Date.now().toString().slice(-4)}`,
          branchName: 'Corporate Headquarters',
          city: 'Ahmedabad',
          state: 'Gujarat',
          postalCode: '380001',
          address: 'Corporate Tower, Central Business District',
        },
      });
    }

    // 3. Create Admin User
    const adminUser = await this.prisma.user.create({
      data: {
        organizationId: org.id,
        branchId: defaultBranch.id,
        email: dto.adminEmail,
        mobile: dto.adminMobile,
        firstName: dto.adminFirstName,
        lastName: dto.adminLastName,
        passwordHash: '$argon2id$v=19$m=65536,t=3,p=4$secretpass$hash',
        role: 'ENTERPRISE_ADMIN',
        status: 'ACTIVE',
      },
    });

    // 4. Record Onboarding Session
    const session = await this.prisma.onboardingSession.create({
      data: {
        onboardingType: 'ORGANIZATION',
        targetEntityId: org.id,
        entityName: dto.companyName,
        currentStep: 'COMPLETED',
        configurationJson: JSON.stringify({
          smtp: dto.smtpConfig || { host: 'smtp.sunite.com', port: 587 },
          whatsapp: dto.whatsappConfig || { gateway: 'TwilioWhatsApp' },
          paymentGateway: dto.paymentGatewayConfig || { gateway: 'Razorpay' },
        }),
        status: 'COMPLETED',
      },
    });

    return {
      statusCode: 201,
      success: true,
      message: 'Organization onboarded successfully',
      data: {
        organization: org,
        defaultBranch,
        adminUser,
        onboardingSession: session,
      },
    };
  }

  /**
   * Onboard individual Customer Master with complete initial setup
   */
  async onboardCustomer(dto: OnboardCustomerDto) {
    let orgId = dto.organizationId;
    if (!orgId) {
      const firstOrg = await this.prisma.organization.findFirst();
      if (firstOrg) {
        orgId = firstOrg.id;
      } else {
        const newOrg = await this.prisma.organization.create({
          data: {
            companyName: 'Sunite Enterprise Default Org',
            legalName: 'Sunite Enterprise Pvt Ltd',
            taxId: `GST-${Date.now()}`,
          },
        });
        orgId = newOrg.id;
      }
    }

    const customerCode = `CUST-${Date.now().toString().slice(-6)}`;
    const customer = await this.prisma.customer.create({
      data: {
        organizationId: orgId,
        customerCode,
        fullName: dto.fullName,
        email: dto.email,
        mobile: dto.mobile,
        gstin: dto.gstin || null,
        city: dto.city,
        state: dto.state,
        sanctionedKw: dto.sanctionedKw || 50.0,
        status: 'ACTIVE',
      },
    });

    // Automatically instantiate a lead and initial project for the onboarded customer
    const leadNumber = `LD-${Date.now().toString().slice(-6)}`;
    const lead = await this.prisma.lead.create({
      data: {
        leadNumber,
        customerId: customer.id,
        kwRequirement: dto.plantCapacityKw || dto.sanctionedKw || 50.0,
        roofType: 'Rooftop Metal Sheet',
        utilityCompany: dto.discomName || 'Torrent Power / DGVCL',
        status: 'NEW_INQUIRY',
      },
    });

    const session = await this.prisma.onboardingSession.create({
      data: {
        onboardingType: 'CUSTOMER',
        targetEntityId: customer.id,
        entityName: dto.fullName,
        currentStep: 'COMPLETED',
        configurationJson: JSON.stringify({
          electricityConsumerNumber: dto.electricityConsumerNumber || 'CON-987654321',
          discom: dto.discomName || 'Torrent Power',
        }),
        status: 'COMPLETED',
      },
    });

    return {
      statusCode: 201,
      success: true,
      message: 'Customer onboarded successfully',
      data: {
        customer,
        initialLead: lead,
        onboardingSession: session,
      },
    };
  }

  /**
   * Onboard Enterprise Partner (EPC / Franchise / Vendor)
   */
  async onboardPartner(dto: OnboardPartnerDto) {
    let orgId = dto.organizationId;
    if (!orgId) {
      const firstOrg = await this.prisma.organization.findFirst();
      if (firstOrg) {
        orgId = firstOrg.id;
      } else {
        const newOrg = await this.prisma.organization.create({
          data: {
            companyName: 'Sunite Enterprise Default Org',
            legalName: 'Sunite Enterprise Pvt Ltd',
            taxId: `GST-${Date.now()}`,
          },
        });
        orgId = newOrg.id;
      }
    }

    const partnerCode = `CP-${Date.now().toString().slice(-6)}`;
    const partner = await this.prisma.partner.create({
      data: {
        organizationId: orgId,
        partnerCode,
        companyName: dto.companyName,
        partnerType: dto.partnerType,
        contactPerson: dto.contactPerson,
        email: dto.email,
        mobile: dto.mobile,
        gstin: dto.gstin || null,
        status: 'ACTIVE',
      },
    });

    const session = await this.prisma.onboardingSession.create({
      data: {
        onboardingType: 'PARTNER',
        targetEntityId: partner.id,
        entityName: dto.companyName,
        currentStep: 'COMPLETED',
        configurationJson: JSON.stringify({ partnerType: dto.partnerType }),
        status: 'COMPLETED',
      },
    });

    return {
      statusCode: 201,
      success: true,
      message: 'Partner onboarded successfully',
      data: {
        partner,
        onboardingSession: session,
      },
    };
  }

  /**
   * Get Onboarding Sessions Status
   */
  async getStatus() {
    const sessions = await this.prisma.onboardingSession.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    const summary = {
      totalOnboarded: sessions.length,
      organizations: sessions.filter(s => s.onboardingType === 'ORGANIZATION').length,
      customers: sessions.filter(s => s.onboardingType === 'CUSTOMER').length,
      partners: sessions.filter(s => s.onboardingType === 'PARTNER').length,
      activeStatus: '100% OPERATIONAL',
    };

    return {
      statusCode: 200,
      success: true,
      message: 'Onboarding status and sessions retrieved',
      data: {
        summary,
        recentSessions: sessions,
      },
    };
  }
}
