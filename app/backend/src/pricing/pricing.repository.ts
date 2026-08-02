import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { PricingSheet, Prisma } from '@prisma/client';

@Injectable()
export class PricingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    pricingCode?: string;
    designId?: string;
    leadId?: string;
    customerId?: string;
    partnerId?: string;
    baseEquipmentCost: number;
    bosCost: number;
    installationCost: number;
    civilCost: number;
    electricalCost: number;
    transportCost: number;
    marginAmount: number;
    marginPercentage: number;
    discountAmount: number;
    discountPercentage: number;
    subtotalAmount: number;
    gstRate: number;
    gstAmount: number;
    grossTotal: number;
    subsidyAmount: number;
    netCustomerContribution: number;
    status?: string;
    breakdownJson?: string;
    remarks?: string;
  }): Promise<PricingSheet> {
    const pricingCode = data.pricingCode || `PRICE-${Date.now().toString().slice(-6)}`;

    return this.prisma.pricingSheet.create({
      data: {
        pricingCode,
        designId: data.designId,
        leadId: data.leadId,
        customerId: data.customerId,
        partnerId: data.partnerId,
        baseEquipmentCost: data.baseEquipmentCost,
        bosCost: data.bosCost,
        installationCost: data.installationCost,
        civilCost: data.civilCost,
        electricalCost: data.electricalCost,
        transportCost: data.transportCost,
        marginAmount: data.marginAmount,
        marginPercentage: data.marginPercentage,
        discountAmount: data.discountAmount,
        discountPercentage: data.discountPercentage,
        subtotalAmount: data.subtotalAmount,
        gstRate: data.gstRate,
        gstAmount: data.gstAmount,
        grossTotal: data.grossTotal,
        subsidyAmount: data.subsidyAmount,
        netCustomerContribution: data.netCustomerContribution,
        status: data.status || 'DRAFT',
        breakdownJson: data.breakdownJson,
        remarks: data.remarks,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.PricingSheetWhereInput;
  }): Promise<PricingSheet[]> {
    const { skip, take, where } = params;
    return this.prisma.pricingSheet.findMany({
      skip,
      take,
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<PricingSheet | null> {
    return this.prisma.pricingSheet.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, data: Partial<PricingSheet>): Promise<PricingSheet> {
    return this.prisma.pricingSheet.update({
      where: { id },
      data,
    });
  }

  async updateStatus(id: string, status: string, remarks?: string): Promise<PricingSheet> {
    return this.prisma.pricingSheet.update({
      where: { id },
      data: {
        status,
        ...(remarks && { remarks }),
      },
    });
  }

  async softDelete(id: string): Promise<PricingSheet> {
    return this.prisma.pricingSheet.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'REJECTED' },
    });
  }
}
