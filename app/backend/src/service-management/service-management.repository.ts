import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWarrantyDto, UpdateWarrantyDto } from './dto/warranty.dto';
import { CreateAmcDto, UpdateAmcDto } from './dto/amc.dto';
import {
  CreateServiceTicketDto,
  UpdateServiceTicketDto,
  AssignEngineerDto,
  CloseServiceTicketDto,
} from './dto/service-ticket.dto';
import { RecordServiceVisitDto } from './dto/service-visit.dto';
import { CreateSparePartDto } from './dto/spare-parts.dto';
import { CreateWarrantyClaimDto } from './dto/warranty-claim.dto';
import { CreateCustomerFeedbackDto } from './dto/customer-feedback.dto';
import {
  Warranty,
  Amc,
  ServiceTicket,
  ServiceVisit,
  SparePartItem,
  WarrantyClaim,
  CustomerFeedback,
  Prisma,
} from '@prisma/client';

@Injectable()
export class ServiceManagementRepository {
  constructor(private readonly prisma: PrismaService) {}

  // WARRANTIES
  async createWarranty(data: CreateWarrantyDto): Promise<Warranty> {
    const warrantyNumber = data.warrantyNumber || `WRN-${Date.now().toString().slice(-6)}`;
    const now = new Date();
    const endDate = new Date(now.getFullYear() + (data.panelWarrantyYears || 25), now.getMonth(), now.getDate());

    return this.prisma.warranty.create({
      data: {
        warrantyNumber,
        projectId: data.projectId,
        customerId: data.customerId,
        panelWarrantyYears: data.panelWarrantyYears || 25,
        inverterWarrantyYears: data.inverterWarrantyYears || 10,
        batteryWarrantyYears: data.batteryWarrantyYears || 5,
        structureWarrantyYears: data.structureWarrantyYears || 10,
        workmanshipWarrantyYears: data.workmanshipWarrantyYears || 5,
        status: 'ACTIVE',
        certificateUrl: `https://cdn.sunite.com/warranties/${warrantyNumber}.pdf`,
        startDate: now,
        endDate,
        remarks: data.remarks,
      },
    });
  }

  async findAllWarranties(where?: Prisma.WarrantyWhereInput): Promise<Warranty[]> {
    return this.prisma.warranty.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findWarrantyById(id: string): Promise<Warranty | null> {
    return this.prisma.warranty.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async updateWarranty(id: string, data: Partial<Warranty>): Promise<Warranty> {
    return this.prisma.warranty.update({
      where: { id },
      data,
    });
  }

  // AMC
  async createAmc(data: CreateAmcDto): Promise<Amc> {
    const amcNumber = data.amcNumber || `AMC-${Date.now().toString().slice(-6)}`;
    const now = new Date();
    const endDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

    return this.prisma.amc.create({
      data: {
        amcNumber,
        projectId: data.projectId,
        customerId: data.customerId,
        planName: data.planName || 'GOLD',
        annualPrice: data.annualPrice || 0,
        visitsPerYear: data.visitsPerYear || 4,
        status: 'ACTIVE',
        startDate: now,
        endDate,
        remarks: data.remarks,
      },
    });
  }

  async findAllAmcs(where?: Prisma.AmcWhereInput): Promise<Amc[]> {
    return this.prisma.amc.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAmcById(id: string): Promise<Amc | null> {
    return this.prisma.amc.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async updateAmc(id: string, data: Partial<Amc>): Promise<Amc> {
    return this.prisma.amc.update({
      where: { id },
      data,
    });
  }

  // SERVICE TICKETS
  async createServiceTicket(data: CreateServiceTicketDto): Promise<ServiceTicket> {
    const ticketNumber = data.ticketNumber || `TKT-${Date.now().toString().slice(-6)}`;
    return this.prisma.serviceTicket.create({
      data: {
        ticketNumber,
        projectId: data.projectId,
        customerId: data.customerId,
        priority: data.priority || 'MEDIUM',
        status: 'OPEN',
        serviceType: data.serviceType || 'INVERTER_FAULT',
        description: data.description,
        remarks: data.remarks,
      },
    });
  }

  async findAllServiceTickets(where?: Prisma.ServiceTicketWhereInput): Promise<ServiceTicket[]> {
    return this.prisma.serviceTicket.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findServiceTicketById(id: string): Promise<ServiceTicket | null> {
    return this.prisma.serviceTicket.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async updateServiceTicket(id: string, data: Partial<ServiceTicket>): Promise<ServiceTicket> {
    return this.prisma.serviceTicket.update({
      where: { id },
      data,
    });
  }

  // SERVICE VISITS
  async createServiceVisit(data: RecordServiceVisitDto): Promise<ServiceVisit> {
    const visitNumber = data.visitNumber || `VST-${Date.now().toString().slice(-6)}`;
    return this.prisma.serviceVisit.create({
      data: {
        visitNumber,
        serviceTicketId: data.serviceTicketId,
        engineerId: data.engineerId,
        checkInTime: new Date(Date.now() - 3600000), // 1 hour ago
        checkOutTime: new Date(),
        diagnosis: data.diagnosis,
        repairDetails: data.repairDetails,
        customerSignatureUrl: data.customerSignatureUrl,
        photoUrl: data.photoUrl,
        status: 'COMPLETED',
        remarks: data.remarks,
      },
    });
  }

  async findAllServiceVisits(where?: Prisma.ServiceVisitWhereInput): Promise<ServiceVisit[]> {
    return this.prisma.serviceVisit.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  // SPARE PARTS
  async createSparePart(data: CreateSparePartDto): Promise<SparePartItem> {
    return this.prisma.sparePartItem.create({
      data: {
        sku: data.sku,
        partName: data.partName,
        category: data.category || 'INVERTER_SPARE',
        quantity: data.quantity || 0,
        reorderLevel: data.reorderLevel || 5,
        unitPrice: data.unitPrice || 0,
        warehouse: data.warehouse || 'MAIN_WAREHOUSE',
        remarks: data.remarks,
      },
    });
  }

  async findAllSpareParts(where?: Prisma.SparePartItemWhereInput): Promise<SparePartItem[]> {
    return this.prisma.sparePartItem.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  // WARRANTY CLAIMS
  async createWarrantyClaim(data: CreateWarrantyClaimDto): Promise<WarrantyClaim> {
    const claimNumber = data.claimNumber || `CLM-${Date.now().toString().slice(-6)}`;
    return this.prisma.warrantyClaim.create({
      data: {
        claimNumber,
        projectId: data.projectId,
        customerId: data.customerId,
        equipmentType: data.equipmentType || 'INVERTER',
        serialNumber: data.serialNumber,
        claimReason: data.claimReason,
        status: 'SUBMITTED',
        remarks: data.remarks,
      },
    });
  }

  async findAllWarrantyClaims(where?: Prisma.WarrantyClaimWhereInput): Promise<WarrantyClaim[]> {
    return this.prisma.warrantyClaim.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  // CUSTOMER FEEDBACK
  async createCustomerFeedback(data: CreateCustomerFeedbackDto): Promise<CustomerFeedback> {
    const feedbackNumber = data.feedbackNumber || `FDB-${Date.now().toString().slice(-6)}`;
    return this.prisma.customerFeedback.create({
      data: {
        feedbackNumber,
        serviceTicketId: data.serviceTicketId,
        customerId: data.customerId,
        rating: data.rating || 5,
        npsScore: data.npsScore || 10,
        review: data.review,
        referralPermission: data.referralPermission ?? true,
      },
    });
  }

  async findAllCustomerFeedbacks(where?: Prisma.CustomerFeedbackWhereInput): Promise<CustomerFeedback[]> {
    return this.prisma.customerFeedback.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }
}
