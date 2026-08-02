import { Test, TestingModule } from '@nestjs/testing';
import { FinanceService } from './finance.service';
import { FinanceRepository } from './finance.repository';

describe('FinanceService', () => {
  let service: FinanceService;
  let repository: FinanceRepository;

  const mockRepository = {
    createPayment: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'pay-123', ...dto, status: 'COMPLETED' })),
    findPaymentById: jest.fn().mockImplementation((id) => Promise.resolve({ id, amount: 500000, status: 'COMPLETED', paymentMethod: 'ONLINE' })),
    findAllPayments: jest.fn().mockResolvedValue([{ id: 'pay-123', amount: 500000, status: 'COMPLETED', isRefund: false }]),
    updatePayment: jest.fn().mockImplementation((id, data) => Promise.resolve({ id, ...data })),
    createInvoice: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'inv-123', invoiceNumber: 'INV-2026-4001', ...dto, status: 'ISSUED' })),
    findInvoiceById: jest.fn().mockImplementation((id) => Promise.resolve({ id, invoiceNumber: 'INV-2026-4001' })),
    findAllInvoices: jest.fn().mockResolvedValue([{ id: 'inv-123', cgstAmount: 310500, sgstAmount: 310500, igstAmount: 0 }]),
    createCommission: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'comm-123', totalCommission: 225000, releasedAmount: 0, pendingAmount: 225000, status: 'CALCULATED' })),
    findCommissionById: jest.fn().mockImplementation((id) => Promise.resolve({ id, totalCommission: 225000, releasedAmount: 0, pendingAmount: 225000, status: 'CALCULATED' })),
    findAllCommissions: jest.fn().mockResolvedValue([{ id: 'comm-123', totalCommission: 225000, releasedAmount: 112500 }]),
    updateCommission: jest.fn().mockImplementation((id, data) => Promise.resolve({ id, ...data })),
    createVendorBill: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'bill-123', ...dto, status: 'SUBMITTED' })),
    findAllVendorBills: jest.fn().mockResolvedValue([{ id: 'bill-123', taxAmount: 450000, totalAmount: 2950000, status: 'APPROVED' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinanceService,
        { provide: FinanceRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<FinanceService>(FinanceService);
    repository = module.get<FinanceRepository>(FinanceRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create customer payment', async () => {
    const res = await service.createPayment({ amount: 500000, paymentType: 'ADVANCE' });
    expect(res.status).toBe('COMPLETED');
  });

  it('should process customer refund', async () => {
    const res = await service.refundPayment({ paymentId: 'pay-123', refundAmount: 50000, reason: 'Test refund' });
    expect(res.paymentType).toBe('REFUND');
  });

  it('should calculate partner commission', async () => {
    const res = await service.calculateCommission({ dealAmount: 4500000, commissionPct: 5.0 });
    expect(res.status).toBe('CALCULATED');
  });

  it('should release commission payment', async () => {
    const res = await service.releaseCommission({ commissionId: 'comm-123', releaseAmount: 112500 });
    expect(res.releasedAmount).toBe(112500);
  });

  it('should calculate GST summary report', async () => {
    const res = await service.getGstSummary();
    expect(res.status).toBe('READY_FOR_GSTR3B_FILING');
  });

  it('should calculate cashflow summary report', async () => {
    const res = await service.getCashflowSummary();
    expect(res.bankReconciliationStatus).toBe('RECONCILED');
  });
});
