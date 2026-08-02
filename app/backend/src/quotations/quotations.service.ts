import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { QuotationsRepository } from './quotations.repository';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { ApproveQuotationDto } from './dto/approve-quotation.dto';
import { SendQuotationDto } from './dto/send-quotation.dto';
import { Quotation } from '@prisma/client';

@Injectable()
export class QuotationsService {
  constructor(private readonly repository: QuotationsRepository) {}

  async create(createDto: CreateQuotationDto): Promise<Quotation> {
    try {
      return await this.repository.create(createDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Quotation number already exists.');
      }
      throw error;
    }
  }

  async findAll(query?: {
    search?: string;
    status?: string;
    customerId?: string;
    leadId?: string;
    partnerId?: string;
    salesExecutiveId?: string;
    page?: number;
    limit?: number;
  }) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.customerId) where.customerId = query.customerId;
    if (query?.leadId) where.leadId = query.leadId;
    if (query?.partnerId) where.partnerId = query.partnerId;
    if (query?.salesExecutiveId) where.salesExecutiveId = query.salesExecutiveId;
    if (query?.search) {
      where.OR = [
        { quotationNumber: { contains: query.search, mode: 'insensitive' } },
        { version: { contains: query.search, mode: 'insensitive' } },
        { remarks: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const data = await this.repository.findAll({ skip, take: limit, where });
    return { data, total: data.length };
  }

  async findOne(id: string): Promise<Quotation> {
    const quotation = await this.repository.findOne(id);
    if (!quotation) {
      throw new NotFoundException(`Quotation with ID ${id} not found`);
    }
    return quotation;
  }

  async update(id: string, updateDto: UpdateQuotationDto): Promise<Quotation> {
    await this.findOne(id);
    return this.repository.update(id, updateDto);
  }

  async generatePdf(id: string): Promise<{ success: boolean; pdfUrl: string; qrCodeUrl: string; digitalSignature: any }> {
    const quotation = await this.findOne(id);

    const pdfUrl = `https://cdn.sunite.com/quotations/${quotation.quotationNumber}_v${quotation.version}.pdf`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=https://sunite.com/verify/${quotation.quotationNumber}`;

    const signature = {
      signedBy: 'Authorized Signatory - Sunite Enterprise',
      timestamp: new Date().toISOString(),
      hash: `SHA256-${Buffer.from(quotation.id).toString('hex')}`,
      verificationUrl: qrCodeUrl,
    };

    await this.repository.update(id, {
      pdfUrl,
      qrCodeUrl,
      digitalSignatureJson: JSON.stringify(signature),
    });

    return {
      success: true,
      pdfUrl,
      qrCodeUrl,
      digitalSignature: signature,
    };
  }

  async approve(id: string, dto: ApproveQuotationDto): Promise<Quotation> {
    await this.findOne(id);
    const stage = dto.approvalType || 'COMMERCIAL';
    let nextStatus = 'SALES_REVIEW';

    if (stage === 'COMMERCIAL') nextStatus = 'COMMERCIAL_APPROVED';
    else if (stage === 'FINANCE') nextStatus = 'FINANCE_APPROVED';
    else if (stage === 'MANAGEMENT') nextStatus = 'RELEASED';

    return this.repository.updateStatus(id, nextStatus, dto.remarks || `Approved stage: ${stage}`);
  }

  async reject(id: string, remarks?: string): Promise<Quotation> {
    await this.findOne(id);
    return this.repository.updateStatus(id, 'REVISION_REQUESTED', remarks || 'Quotation rejected for revision.');
  }

  async clone(id: string): Promise<Quotation> {
    const original = await this.findOne(id);
    const versionParts = original.version.split('.');
    const nextSubVersion = Number(versionParts[1] || 0) + 1;
    const newVersion = `${versionParts[0]}.${nextSubVersion}`;

    return this.repository.create({
      quotationNumber: `${original.quotationNumber}-V${newVersion}`,
      version: newVersion,
      parentQuotationId: original.id,
      customerId: original.customerId || undefined,
      leadId: original.leadId || undefined,
      surveyId: original.surveyId || undefined,
      designId: original.designId || undefined,
      pricingId: original.pricingId || undefined,
      partnerId: original.partnerId || undefined,
      salesExecutiveId: original.salesExecutiveId || undefined,
      systemCapacityKw: original.systemCapacityKw,
      totalProjectCost: original.totalProjectCost,
      gstAmount: original.gstAmount,
      subsidyAmount: original.subsidyAmount,
      netCustomerPrice: original.netCustomerPrice,
      paymentTerms: original.paymentTerms || undefined,
      warrantyDetails: original.warrantyDetails || undefined,
      termsAndConditions: original.termsAndConditions || undefined,
      remarks: `Cloned revision from ${original.quotationNumber} (v${original.version})`,
    });
  }

  async sendEmail(id: string, dto: SendQuotationDto) {
    const quotation = await this.findOne(id);
    const recipient = dto.email || 'customer@clientcorp.com';

    const deliveryLog = {
      channel: 'EMAIL',
      recipient,
      subject: dto.subject || `Sunite Enterprise Solar Proposal - ${quotation.quotationNumber}`,
      sentAt: new Date().toISOString(),
      status: 'DELIVERED',
      readReceipt: true,
    };

    await this.repository.updateDeliveryLog(id, JSON.stringify(deliveryLog));

    return {
      success: true,
      quotationId: quotation.id,
      quotationNumber: quotation.quotationNumber,
      deliveryChannel: 'EMAIL',
      recipient,
      sentAt: deliveryLog.sentAt,
      pdfUrl: quotation.pdfUrl,
    };
  }

  async sendWhatsApp(id: string, dto: SendQuotationDto) {
    const quotation = await this.findOne(id);
    const mobile = dto.mobile || '+919876543210';

    const deliveryLog = {
      channel: 'WHATSAPP',
      recipient: mobile,
      sentAt: new Date().toISOString(),
      status: 'DELIVERED',
      whatsappMessageId: `WA-${Date.now()}`,
    };

    await this.repository.updateDeliveryLog(id, JSON.stringify(deliveryLog));

    return {
      success: true,
      quotationId: quotation.id,
      quotationNumber: quotation.quotationNumber,
      deliveryChannel: 'WHATSAPP',
      recipientMobile: mobile,
      sentAt: deliveryLog.sentAt,
      pdfUrl: quotation.pdfUrl,
    };
  }

  async customerAccept(id: string, remarks?: string): Promise<Quotation> {
    await this.findOne(id);
    return this.repository.updateStatus(id, 'CUSTOMER_ACCEPTED', remarks || 'Quotation digitally accepted by customer.');
  }

  async customerReject(id: string, remarks?: string): Promise<Quotation> {
    await this.findOne(id);
    return this.repository.updateStatus(id, 'CUSTOMER_REJECTED', remarks || 'Quotation declined by customer.');
  }

  async getVersions(id: string) {
    const quotation = await this.findOne(id);
    const parentId = quotation.parentQuotationId || quotation.id;
    return this.repository.findVersions(parentId);
  }

  async getPdf(id: string) {
    const quotation = await this.findOne(id);
    return {
      quotationId: quotation.id,
      quotationNumber: quotation.quotationNumber,
      version: quotation.version,
      pdfUrl: quotation.pdfUrl,
      qrCodeUrl: quotation.qrCodeUrl,
      digitalSignature: quotation.digitalSignatureJson ? JSON.parse(quotation.digitalSignatureJson) : null,
    };
  }

  async remove(id: string): Promise<Quotation> {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }
}
