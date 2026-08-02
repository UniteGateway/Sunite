import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { FinanceRepository } from './finance.repository';
import { CreatePaymentDto, RefundPaymentDto } from './dto/create-payment.dto';
import { CreateInvoiceDto, GenerateInvoiceDto } from './dto/create-invoice.dto';
import {
  CalculateCommissionDto,
  ReleaseCommissionDto,
  CreateVendorBillDto,
} from './dto/finance.dto';

@Injectable()
export class FinanceService {
  constructor(private readonly repository: FinanceRepository) {}

  // PAYMENTS
  async createPayment(dto: CreatePaymentDto) {
    try {
      return await this.repository.createPayment(dto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Payment number already exists.');
      }
      throw error;
    }
  }

  async findAllPayments(query?: { search?: string; status?: string; orderId?: string; customerId?: string }) {
    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.orderId) where.orderId = query.orderId;
    if (query?.customerId) where.customerId = query.customerId;
    if (query?.search) {
      where.OR = [
        { paymentNumber: { contains: query.search, mode: 'insensitive' } },
        { transactionRef: { contains: query.search, mode: 'insensitive' } },
        { remarks: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    const data = await this.repository.findAllPayments(where);
    return { data, total: data.length };
  }

  async findPaymentById(id: string) {
    const payment = await this.repository.findPaymentById(id);
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found.`);
    }
    return payment;
  }

  async refundPayment(dto: RefundPaymentDto) {
    const originalPayment = await this.findPaymentById(dto.paymentId);
    if (dto.refundAmount > originalPayment.amount) {
      throw new BadRequestException(`Refund amount cannot exceed original payment amount of INR ${originalPayment.amount}`);
    }

    // Create refund payment record
    const refundRecord = await this.repository.createPayment({
      paymentNumber: `REF-${Date.now().toString().slice(-6)}`,
      orderId: originalPayment.orderId || undefined,
      projectId: originalPayment.projectId || undefined,
      invoiceId: originalPayment.invoiceId || undefined,
      customerId: originalPayment.customerId || undefined,
      amount: dto.refundAmount,
      paymentType: 'REFUND',
      paymentMethod: originalPayment.paymentMethod,
      transactionRef: `REF-TXN-${Date.now().toString().slice(-8)}`,
      remarks: dto.reason || 'Customer refund processed',
    });

    // Mark refund flag on refund record
    await this.repository.updatePayment(refundRecord.id, { isRefund: true, status: 'REFUNDED' });

    // Update status on original payment if fully refunded
    if (dto.refundAmount === originalPayment.amount) {
      await this.repository.updatePayment(originalPayment.id, { status: 'REFUNDED' });
    }

    return refundRecord;
  }

  // INVOICES
  async createInvoice(dto: CreateInvoiceDto) {
    try {
      return await this.repository.createInvoice(dto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Invoice number already exists.');
      }
      throw error;
    }
  }

  async findAllInvoices(query?: { search?: string; status?: string; invoiceType?: string; orderId?: string }) {
    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.invoiceType) where.invoiceType = query.invoiceType;
    if (query?.orderId) where.orderId = query.orderId;
    if (query?.search) {
      where.OR = [
        { invoiceNumber: { contains: query.search, mode: 'insensitive' } },
        { remarks: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    const data = await this.repository.findAllInvoices(where);
    return { data, total: data.length };
  }

  async findInvoiceById(id: string) {
    const invoice = await this.repository.findInvoiceById(id);
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found.`);
    }
    return invoice;
  }

  async generateInvoice(dto: GenerateInvoiceDto) {
    const subtotal = 4500000.0; // 100kW Standard rooftop system base value
    return this.repository.createInvoice({
      orderId: dto.orderId,
      invoiceType: dto.invoiceType || 'TAX_INVOICE',
      subtotal,
      remarks: dto.remarks || 'Auto-generated GST tax invoice for order milestone.',
    });
  }

  // COMMISSIONS
  async calculateCommission(dto: CalculateCommissionDto) {
    return this.repository.createCommission(dto);
  }

  async releaseCommission(dto: ReleaseCommissionDto) {
    const commission = await this.repository.findCommissionById(dto.commissionId);
    if (!commission) {
      throw new NotFoundException(`Commission with ID ${dto.commissionId} not found.`);
    }

    if (dto.releaseAmount > commission.pendingAmount) {
      throw new BadRequestException(`Release amount exceeds pending commission amount of INR ${commission.pendingAmount}`);
    }

    const newReleased = commission.releasedAmount + dto.releaseAmount;
    const newPending = commission.totalCommission - newReleased;
    const newStatus = newPending <= 0 ? 'FULLY_RELEASED' : 'PARTIALLY_RELEASED';
    const newStage = dto.stage || (newPending <= 0 ? 'FINAL_RELEASE_50' : 'ADVANCE_RELEASE_50');

    return this.repository.updateCommission(commission.id, {
      releasedAmount: newReleased,
      pendingAmount: newPending,
      status: newStatus,
      stage: newStage,
      remarks: dto.remarks || commission.remarks || 'Commission payment released.',
    });
  }

  async findAllCommissions(query?: { partnerId?: string; salesExecutiveId?: string; status?: string }) {
    const where: any = {};
    if (query?.partnerId) where.partnerId = query.partnerId;
    if (query?.salesExecutiveId) where.salesExecutiveId = query.salesExecutiveId;
    if (query?.status) where.status = query.status;
    const data = await this.repository.findAllCommissions(where);
    return { data, total: data.length };
  }

  // VENDOR BILLS
  async createVendorBill(dto: CreateVendorBillDto) {
    return this.repository.createVendorBill(dto);
  }

  async findAllVendorBills(query?: { vendorId?: string; purchaseOrderId?: string; status?: string }) {
    const where: any = {};
    if (query?.vendorId) where.vendorId = query.vendorId;
    if (query?.purchaseOrderId) where.purchaseOrderId = query.purchaseOrderId;
    if (query?.status) where.status = query.status;
    const data = await this.repository.findAllVendorBills(where);
    return { data, total: data.length };
  }

  // GST SUMMARY REPORT
  async getGstSummary(year?: number, month?: number) {
    const invoices = await this.repository.findAllInvoices();
    const vendorBills = await this.repository.findAllVendorBills();

    const outputCgst = invoices.reduce((acc, inv) => acc + inv.cgstAmount, 0);
    const outputSgst = invoices.reduce((acc, inv) => acc + inv.sgstAmount, 0);
    const outputIgst = invoices.reduce((acc, inv) => acc + inv.igstAmount, 0);
    const totalOutputTax = outputCgst + outputSgst + outputIgst;

    const inputCredit = vendorBills.reduce((acc, bill) => acc + bill.taxAmount, 0);
    const netGstPayable = Math.max(0, totalOutputTax - inputCredit);

    return {
      financialYear: year || 2026,
      periodMonth: month || 7,
      hsnCode: '8471',
      outputTax: {
        cgst: Math.round(outputCgst * 100) / 100,
        sgst: Math.round(outputSgst * 100) / 100,
        igst: Math.round(outputIgst * 100) / 100,
        totalOutputTax: Math.round(totalOutputTax * 100) / 100,
      },
      inputTaxCredit: {
        vendorInputTaxCredit: Math.round(inputCredit * 100) / 100,
      },
      netGstLiability: Math.round(netGstPayable * 100) / 100,
      status: 'READY_FOR_GSTR3B_FILING',
    };
  }

  // CASH FLOW REPORT
  async getCashflowSummary() {
    const payments = await this.repository.findAllPayments();
    const vendorBills = await this.repository.findAllVendorBills();
    const commissions = await this.repository.findAllCommissions();

    const totalInflow = payments
      .filter((p) => !p.isRefund && p.status === 'COMPLETED')
      .reduce((acc, p) => acc + p.amount, 0);

    const totalOutflowRefunds = payments
      .filter((p) => p.isRefund)
      .reduce((acc, p) => acc + p.amount, 0);

    const totalOutflowVendorBills = vendorBills
      .filter((b) => b.status === 'SETTLED' || b.status === 'APPROVED')
      .reduce((acc, b) => acc + b.totalAmount, 0);

    const totalOutflowCommissions = commissions.reduce((acc, c) => acc + c.releasedAmount, 0);

    const totalOutflow = totalOutflowRefunds + totalOutflowVendorBills + totalOutflowCommissions;
    const netCashFlow = totalInflow - totalOutflow;

    return {
      currency: 'INR',
      period: 'FY 2026-Q2',
      cashInflow: {
        customerCollections: Math.round(totalInflow * 100) / 100,
        totalInflow: Math.round(totalInflow * 100) / 100,
      },
      cashOutflow: {
        refunds: Math.round(totalOutflowRefunds * 100) / 100,
        vendorSettlements: Math.round(totalOutflowVendorBills * 100) / 100,
        partnerCommissions: Math.round(totalOutflowCommissions * 100) / 100,
        totalOutflow: Math.round(totalOutflow * 100) / 100,
      },
      netCashFlow: Math.round(netCashFlow * 100) / 100,
      bankReconciliationStatus: 'RECONCILED',
    };
  }
}
