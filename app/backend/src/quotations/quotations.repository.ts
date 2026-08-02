import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { Quotation, Prisma } from '@prisma/client';

@Injectable()
export class QuotationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateQuotationDto): Promise<Quotation> {
    const quotationNumber = data.quotationNumber || `QUOT-${Date.now().toString().slice(-6)}`;
    const systemCapacityKw = data.systemCapacityKw;
    const totalProjectCost = data.totalProjectCost || (systemCapacityKw * 45000 * 1.12);
    const gstAmount = data.gstAmount || (totalProjectCost * 0.138);
    const subsidyAmount = data.subsidyAmount || (systemCapacityKw <= 3 ? 78000 : 0);
    const netCustomerPrice = data.netCustomerPrice || Math.max(0, totalProjectCost + gstAmount - subsidyAmount);

    const proposalData = {
      systemCapacityKw,
      totalProjectCost,
      gstAmount,
      subsidyAmount,
      netCustomerPrice,
      paymentTerms: data.paymentTerms || '10% Advance, 80% Delivery, 10% Commissioning',
      warrantyDetails: data.warrantyDetails || '25-Year Tier-1 Module Performance Warranty, 10-Year Inverter Warranty',
      termsAndConditions: data.termsAndConditions || 'Quotation valid for 30 days from issuance.',
    };

    return this.prisma.quotation.create({
      data: {
        quotationNumber,
        version: data.version || '1.0',
        parentQuotationId: data.parentQuotationId,
        customerId: data.customerId,
        leadId: data.leadId,
        surveyId: data.surveyId,
        designId: data.designId,
        pricingId: data.pricingId,
        partnerId: data.partnerId,
        salesExecutiveId: data.salesExecutiveId,
        systemCapacityKw,
        totalProjectCost,
        gstAmount,
        subsidyAmount,
        netCustomerPrice,
        paymentTerms: data.paymentTerms || '10% Advance, 80% Delivery, 10% Commissioning',
        warrantyDetails: data.warrantyDetails || '25-Year Tier-1 Module Performance Warranty, 10-Year Inverter Warranty',
        termsAndConditions: data.termsAndConditions || 'Quotation valid for 30 days from issuance.',
        proposalDataJson: JSON.stringify(proposalData),
        pdfUrl: `https://cdn.sunite.com/quotations/${quotationNumber}.pdf`,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?data=https://sunite.com/verify/${quotationNumber}`,
        status: 'DRAFT',
        remarks: data.remarks,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.QuotationWhereInput;
  }): Promise<Quotation[]> {
    const { skip, take, where } = params;
    return this.prisma.quotation.findMany({
      skip,
      take,
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Quotation | null> {
    return this.prisma.quotation.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async findVersions(parentQuotationId: string): Promise<Quotation[]> {
    return this.prisma.quotation.findMany({
      where: {
        OR: [
          { id: parentQuotationId },
          { parentQuotationId: parentQuotationId },
        ],
        deletedAt: null,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async update(id: string, data: UpdateQuotationDto): Promise<Quotation> {
    return this.prisma.quotation.update({
      where: { id },
      data,
    });
  }

  async updateStatus(id: string, status: string, remarks?: string): Promise<Quotation> {
    return this.prisma.quotation.update({
      where: { id },
      data: {
        status,
        ...(remarks && { remarks }),
      },
    });
  }

  async updateDigitalSignature(id: string, signatureJson: string): Promise<Quotation> {
    return this.prisma.quotation.update({
      where: { id },
      data: {
        digitalSignatureJson: signatureJson,
      },
    });
  }

  async updateDeliveryLog(id: string, logJson: string): Promise<Quotation> {
    return this.prisma.quotation.update({
      where: { id },
      data: {
        deliveryLogJson: logJson,
      },
    });
  }

  async softDelete(id: string): Promise<Quotation> {
    return this.prisma.quotation.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'CUSTOMER_REJECTED' },
    });
  }
}
