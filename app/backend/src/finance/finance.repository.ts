import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto, RefundPaymentDto } from './dto/create-payment.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { CalculateCommissionDto } from './dto/finance.dto';
import { CreateVendorBillDto } from './dto/finance.dto';
import { Payment, Invoice, Commission, VendorBill, Prisma } from '@prisma/client';

@Injectable()
export class FinanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  // PAYMENTS
  async createPayment(data: CreatePaymentDto): Promise<Payment> {
    const paymentNumber = data.paymentNumber || `PAY-${Date.now().toString().slice(-6)}`;
    return this.prisma.payment.create({
      data: {
        paymentNumber,
        orderId: data.orderId,
        projectId: data.projectId,
        invoiceId: data.invoiceId,
        customerId: data.customerId,
        amount: data.amount,
        paymentType: data.paymentType || 'ADVANCE',
        paymentMethod: data.paymentMethod || 'ONLINE',
        status: 'COMPLETED',
        transactionRef: data.transactionRef || `TXN-${Date.now().toString().slice(-8)}`,
        remarks: data.remarks,
      },
    });
  }

  async findAllPayments(where?: Prisma.PaymentWhereInput): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findPaymentById(id: string): Promise<Payment | null> {
    return this.prisma.payment.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async updatePayment(id: string, data: Partial<Payment>): Promise<Payment> {
    return this.prisma.payment.update({
      where: { id },
      data,
    });
  }

  // INVOICES
  async createInvoice(data: CreateInvoiceDto): Promise<Invoice> {
    const invoiceNumber = data.invoiceNumber || `INV-${Date.now().toString().slice(-6)}`;
    const subtotal = data.subtotal || 0;
    const cgstAmount = data.cgstAmount ?? Math.round(subtotal * 0.069 * 100) / 100;
    const sgstAmount = data.sgstAmount ?? Math.round(subtotal * 0.069 * 100) / 100;
    const igstAmount = data.igstAmount ?? 0;
    const totalGst = cgstAmount + sgstAmount + igstAmount;
    const totalAmount = subtotal + totalGst;
    const tdsAmount = data.tdsAmount ?? Math.round(subtotal * 0.02 * 100) / 100;
    const netPayable = totalAmount - tdsAmount;

    return this.prisma.invoice.create({
      data: {
        invoiceNumber,
        invoiceType: data.invoiceType || 'TAX_INVOICE',
        orderId: data.orderId,
        projectId: data.projectId,
        customerId: data.customerId,
        subtotal,
        cgstAmount,
        sgstAmount,
        igstAmount,
        totalGst,
        totalAmount,
        tdsAmount,
        netPayable,
        status: 'ISSUED',
        hsnCode: data.hsnCode || '8471',
        pdfUrl: `https://cdn.sunite.com/invoices/${invoiceNumber}.pdf`,
        qrCodeUrl: `https://cdn.sunite.com/invoices/qr/${invoiceNumber}.png`,
        remarks: data.remarks,
      },
    });
  }

  async findAllInvoices(where?: Prisma.InvoiceWhereInput): Promise<Invoice[]> {
    return this.prisma.invoice.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findInvoiceById(id: string): Promise<Invoice | null> {
    return this.prisma.invoice.findFirst({
      where: { id, deletedAt: null },
    });
  }

  // COMMISSIONS
  async createCommission(data: CalculateCommissionDto): Promise<Commission> {
    const commissionNumber = `COMM-${Date.now().toString().slice(-6)}`;
    const pct = data.commissionPct ?? 5.0;
    const totalCommission = Math.round((data.dealAmount * (pct / 100)) * 100) / 100;

    return this.prisma.commission.create({
      data: {
        commissionNumber,
        partnerId: data.partnerId,
        salesExecutiveId: data.salesExecutiveId,
        projectId: data.projectId,
        orderId: data.orderId,
        partnerType: data.partnerType || 'CHANNEL_PARTNER',
        totalCommission,
        releasedAmount: 0.0,
        pendingAmount: totalCommission,
        status: 'CALCULATED',
        stage: 'ADVANCE_RELEASE_50',
        remarks: data.remarks,
      },
    });
  }

  async findAllCommissions(where?: Prisma.CommissionWhereInput): Promise<Commission[]> {
    return this.prisma.commission.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findCommissionById(id: string): Promise<Commission | null> {
    return this.prisma.commission.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async updateCommission(id: string, data: Partial<Commission>): Promise<Commission> {
    return this.prisma.commission.update({
      where: { id },
      data,
    });
  }

  // VENDOR BILLS
  async createVendorBill(data: CreateVendorBillDto): Promise<VendorBill> {
    const billNumber = data.billNumber || `BILL-${Date.now().toString().slice(-6)}`;
    const taxAmount = data.taxAmount ?? Math.round(data.amount * 0.18 * 100) / 100;
    const totalAmount = data.amount + taxAmount;

    return this.prisma.vendorBill.create({
      data: {
        billNumber,
        purchaseOrderId: data.purchaseOrderId,
        vendorId: data.vendorId,
        vendorName: data.vendorName || 'Solar Equipment Vendor',
        amount: data.amount,
        taxAmount,
        totalAmount,
        status: 'SUBMITTED',
        remarks: data.remarks,
      },
    });
  }

  async findAllVendorBills(where?: Prisma.VendorBillWhereInput): Promise<VendorBill[]> {
    return this.prisma.vendorBill.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }
}
