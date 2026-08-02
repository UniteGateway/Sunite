import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PricingRepository } from './pricing.repository';
import { CalculatePricingDto } from './dto/calculate-pricing.dto';
import { ApplyMarginDto } from './dto/apply-margin.dto';
import { ApplyDiscountDto } from './dto/apply-discount.dto';
import { CalculateGstDto } from './dto/calculate-gst.dto';
import { CalculateSubsidyDto } from './dto/calculate-subsidy.dto';
import { CalculateLoanDto } from './dto/calculate-loan.dto';
import { ApprovePricingDto } from './dto/approve-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { PricingSheet } from '@prisma/client';

@Injectable()
export class PricingService {
  constructor(private readonly repository: PricingRepository) {}

  async calculate(dto: CalculatePricingDto): Promise<PricingSheet> {
    const capacity = dto.capacityKw;
    const category = dto.category || 'COMMERCIAL';
    const isBifacial = dto.isBifacial ?? false;

    // Commercial Cost Calculations per kWp
    const moduleCostPerKw = isBifacial ? 24000 : 22000;
    const inverterCostPerKw = 6500;
    const baseEquipmentCost = capacity * (moduleCostPerKw + inverterCostPerKw);

    const bosCost = capacity * 4500; // Cabling, structures, ACDB/DCDB
    const installationCost = capacity * 3000;
    const civilCost = capacity * 1500;
    const electricalCost = capacity * 2000;
    const transportCost = capacity * 1000;

    const costPrice = baseEquipmentCost + bosCost + installationCost + civilCost + electricalCost + transportCost;

    const defaultMarginPct = 12.0; // 12% margin
    const marginAmount = (costPrice * defaultMarginPct) / 100;
    const discountAmount = 0.0;

    const subtotalAmount = costPrice + marginAmount - discountAmount;
    const gstRate = 13.8; // Blended 13.8% Solar GST Rate
    const gstAmount = (subtotalAmount * gstRate) / 100;
    const grossTotal = subtotalAmount + gstAmount;

    // Subsidy Engine
    const subsidyAmount = this.computeSubsidy(capacity, category);
    const netCustomerContribution = Math.max(0, grossTotal - subsidyAmount);

    const breakdown = {
      equipment: { baseEquipmentCost, moduleCostPerKw, inverterCostPerKw },
      bos: { bosCost },
      services: { installationCost, civilCost, electricalCost, transportCost },
      margin: { marginPercentage: defaultMarginPct, marginAmount },
      discount: { discountPercentage: 0, discountAmount: 0 },
      gst: { gstRate, gstAmount },
      financials: { costPrice, subtotalAmount, grossTotal, subsidyAmount, netCustomerContribution },
    };

    return this.repository.create({
      designId: dto.designId,
      baseEquipmentCost,
      bosCost,
      installationCost,
      civilCost,
      electricalCost,
      transportCost,
      marginAmount,
      marginPercentage: defaultMarginPct,
      discountAmount: 0,
      discountPercentage: 0,
      subtotalAmount,
      gstRate,
      gstAmount,
      grossTotal,
      subsidyAmount,
      netCustomerContribution,
      status: 'DRAFT',
      breakdownJson: JSON.stringify(breakdown),
      remarks: `Commercial calculation generated for ${capacity} kWp (${category}).`,
    });
  }

  async findAll(query?: {
    search?: string;
    status?: string;
    designId?: string;
    leadId?: string;
    page?: number;
    limit?: number;
  }) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.designId) where.designId = query.designId;
    if (query?.leadId) where.leadId = query.leadId;
    if (query?.search) {
      where.OR = [
        { pricingCode: { contains: query.search, mode: 'insensitive' } },
        { status: { contains: query.search, mode: 'insensitive' } },
        { remarks: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const data = await this.repository.findAll({ skip, take: limit, where });
    return { data, total: data.length };
  }

  async findOne(id: string): Promise<PricingSheet> {
    const pricing = await this.repository.findOne(id);
    if (!pricing) {
      throw new NotFoundException(`Pricing Sheet with ID ${id} not found`);
    }
    return pricing;
  }

  async update(id: string, dto: UpdatePricingDto): Promise<PricingSheet> {
    const pricing = await this.findOne(id);

    const baseEquipmentCost = dto.baseEquipmentCost ?? pricing.baseEquipmentCost;
    const bosCost = dto.bosCost ?? pricing.bosCost;
    const installationCost = dto.installationCost ?? pricing.installationCost;
    const civilCost = dto.civilCost ?? pricing.civilCost;
    const electricalCost = dto.electricalCost ?? pricing.electricalCost;
    const transportCost = dto.transportCost ?? pricing.transportCost;

    const costPrice = baseEquipmentCost + bosCost + installationCost + civilCost + electricalCost + transportCost;

    const marginPercentage = dto.marginPercentage ?? pricing.marginPercentage;
    const marginAmount = (costPrice * marginPercentage) / 100;

    const discountAmount = dto.discountAmount ?? pricing.discountAmount;
    const discountPercentage = (discountAmount / (costPrice + marginAmount)) * 100 || 0;

    const subtotalAmount = costPrice + marginAmount - discountAmount;
    const gstAmount = (subtotalAmount * pricing.gstRate) / 100;
    const grossTotal = subtotalAmount + gstAmount;
    const netCustomerContribution = Math.max(0, grossTotal - pricing.subsidyAmount);

    return this.repository.update(id, {
      baseEquipmentCost,
      bosCost,
      installationCost,
      civilCost,
      electricalCost,
      transportCost,
      marginPercentage,
      marginAmount,
      discountAmount,
      discountPercentage,
      subtotalAmount,
      gstAmount,
      grossTotal,
      netCustomerContribution,
      ...(dto.remarks && { remarks: dto.remarks }),
    });
  }

  async applyMargin(dto: ApplyMarginDto): Promise<any> {
    if (dto.pricingId) {
      const pricing = await this.findOne(dto.pricingId);
      const costPrice = pricing.baseEquipmentCost + pricing.bosCost + pricing.installationCost + pricing.civilCost + pricing.electricalCost + pricing.transportCost;

      const corporatePct = dto.corporateMarginPct ?? 5.0;
      const branchPct = dto.branchMarginPct ?? 4.0;
      const franchisePct = dto.franchiseMarginPct ?? (dto.marginPercentage - corporatePct - branchPct);

      const marginAmount = (costPrice * dto.marginPercentage) / 100;
      const subtotalAmount = costPrice + marginAmount - pricing.discountAmount;
      const gstAmount = (subtotalAmount * pricing.gstRate) / 100;
      const grossTotal = subtotalAmount + gstAmount;
      const netCustomerContribution = Math.max(0, grossTotal - pricing.subsidyAmount);

      const updated = await this.repository.update(pricing.id, {
        marginPercentage: dto.marginPercentage,
        marginAmount,
        subtotalAmount,
        gstAmount,
        grossTotal,
        netCustomerContribution,
      });

      return {
        pricingSheet: updated,
        marginBreakdown: {
          corporateMargin: (costPrice * corporatePct) / 100,
          branchMargin: (costPrice * branchPct) / 100,
          franchiseMargin: (costPrice * franchisePct) / 100,
          totalMargin: marginAmount,
        },
      };
    }

    // Direct standalone calculation
    return {
      requestedMarginPct: dto.marginPercentage,
      corporateMarginPct: dto.corporateMarginPct ?? 5.0,
      branchMarginPct: dto.branchMarginPct ?? 4.0,
      franchiseMarginPct: dto.franchiseMarginPct ?? 3.0,
    };
  }

  async applyDiscount(dto: ApplyDiscountDto): Promise<any> {
    if (dto.pricingId) {
      const pricing = await this.findOne(dto.pricingId);
      const costPrice = pricing.baseEquipmentCost + pricing.bosCost + pricing.installationCost + pricing.civilCost + pricing.electricalCost + pricing.transportCost;

      let discountAmount = dto.discountAmount || 0;
      if (dto.discountPercentage) {
        discountAmount = ((costPrice + pricing.marginAmount) * dto.discountPercentage) / 100;
      }

      const subtotalAmount = costPrice + pricing.marginAmount - discountAmount;
      const gstAmount = (subtotalAmount * pricing.gstRate) / 100;
      const grossTotal = subtotalAmount + gstAmount;
      const netCustomerContribution = Math.max(0, grossTotal - pricing.subsidyAmount);

      const updated = await this.repository.update(pricing.id, {
        discountAmount,
        discountPercentage: dto.discountPercentage || (discountAmount / (costPrice + pricing.marginAmount)) * 100,
        subtotalAmount,
        gstAmount,
        grossTotal,
        netCustomerContribution,
      });

      return {
        pricingSheet: updated,
        appliedDiscountAmount: discountAmount,
        campaignCode: dto.campaignCode || 'DIRECT_DISCOUNT',
      };
    }

    return {
      discountAmount: dto.discountAmount || 0,
      discountPercentage: dto.discountPercentage || 0,
      campaignCode: dto.campaignCode || 'NONE',
    };
  }

  calculateGst(dto: CalculateGstDto) {
    const rate = dto.gstRate || 13.8;
    const taxableAmount = dto.amount;
    const totalGst = (taxableAmount * rate) / 100;

    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (dto.isInterState) {
      igst = totalGst;
    } else {
      cgst = totalGst / 2;
      sgst = totalGst / 2;
    }

    return {
      taxableAmount,
      gstRate: rate,
      totalGst,
      cgst,
      sgst,
      igst,
      grossAmount: taxableAmount + totalGst,
      hsnSummary: [
        { hsnCode: '85414011', description: 'Solar PV Modules (12% GST)', taxable: taxableAmount * 0.6, gstRate: 12.0, gstAmount: taxableAmount * 0.6 * 0.12 },
        { hsnCode: '85044090', description: 'Solar Inverter & Power Electronics (18% GST)', taxable: taxableAmount * 0.25, gstRate: 18.0, gstAmount: taxableAmount * 0.25 * 0.18 },
        { hsnCode: '995461', description: 'Solar Erection, Installation & Commissioning (18% GST)', taxable: taxableAmount * 0.15, gstRate: 18.0, gstAmount: taxableAmount * 0.15 * 0.18 },
      ],
    };
  }

  calculateSubsidy(dto: CalculateSubsidyDto) {
    const subsidy = this.computeSubsidy(dto.capacityKw, dto.category || 'RESIDENTIAL');
    return {
      capacityKw: dto.capacityKw,
      category: dto.category || 'RESIDENTIAL',
      schemeName: 'PM Surya Ghar: Muft Bijli Yojana',
      subsidyAmount: subsidy,
      description: dto.capacityKw <= 3
        ? 'Fixed ₹78,000 Central Government Subsidy for up to 3kW'
        : 'Fixed ₹78,000 for first 3kW + ₹10,000/kW for additional capacity up to maximum limit.',
    };
  }

  calculateLoan(dto: CalculateLoanDto) {
    const P = dto.loanAmount;
    const annualRate = dto.interestRate || 8.5;
    const N = dto.tenureMonths || 60;

    const r = annualRate / (12 * 100);
    const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    return {
      loanAmount: P,
      interestRateAnnual: annualRate,
      tenureMonths: N,
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    };
  }

  async approve(dto: ApprovePricingDto): Promise<PricingSheet> {
    if (!dto.pricingId) {
      throw new ConflictException('pricingId is required for approval workflow.');
    }

    const pricing = await this.findOne(dto.pricingId);
    let nextStatus = 'SALES_APPROVED';

    const stage = dto.approvalType || 'SALES';
    if (stage === 'COMMERCIAL') nextStatus = 'COMMERCIAL_APPROVED';
    else if (stage === 'FINANCE') nextStatus = 'FINANCE_APPROVED';
    else if (stage === 'MANAGEMENT') nextStatus = 'APPROVED';

    return this.repository.updateStatus(pricing.id, nextStatus, dto.remarks || `Approved stage: ${stage}`);
  }

  async getInternalSheet(id: string) {
    const pricing = await this.findOne(id);
    return {
      type: 'INTERNAL_COST_SHEET',
      pricingCode: pricing.pricingCode,
      status: pricing.status,
      costs: {
        baseEquipmentCost: pricing.baseEquipmentCost,
        bosCost: pricing.bosCost,
        installationCost: pricing.installationCost,
        civilCost: pricing.civilCost,
        electricalCost: pricing.electricalCost,
        transportCost: pricing.transportCost,
        totalCost: pricing.baseEquipmentCost + pricing.bosCost + pricing.installationCost + pricing.civilCost + pricing.electricalCost + pricing.transportCost,
      },
      margins: {
        marginPercentage: pricing.marginPercentage,
        marginAmount: pricing.marginAmount,
      },
      discounts: {
        discountAmount: pricing.discountAmount,
      },
      commercials: {
        subtotalAmount: pricing.subtotalAmount,
        gstRate: pricing.gstRate,
        gstAmount: pricing.gstAmount,
        grossTotal: pricing.grossTotal,
        subsidyAmount: pricing.subsidyAmount,
        netCustomerContribution: pricing.netCustomerContribution,
      },
    };
  }

  async getCustomerSheet(id: string) {
    const pricing = await this.findOne(id);
    return {
      type: 'CUSTOMER_PRICE_QUOTE',
      quotationCode: pricing.pricingCode,
      solarSystemPackage: {
        subtotalAmount: pricing.subtotalAmount,
        applicableGst: pricing.gstAmount,
        totalProjectCost: pricing.grossTotal,
        eligibleGovernmentSubsidy: pricing.subsidyAmount,
        netOutOfPocketCost: pricing.netCustomerContribution,
      },
      benefits: {
        cleanEnergyYield25Years: '25 Year Free Clean Solar Power',
        warranties: '25-Year Performance Warranty on Modules, 10-Year Inverter Warranty',
      },
    };
  }

  async getPartnerSheet(id: string) {
    const pricing = await this.findOne(id);
    const totalCost = pricing.baseEquipmentCost + pricing.bosCost + pricing.installationCost + pricing.civilCost + pricing.electricalCost + pricing.transportCost;
    const partnerCommission = (totalCost * 0.03); // 3% channel partner commission

    return {
      type: 'PARTNER_COMMISSION_SHEET',
      pricingCode: pricing.pricingCode,
      grossProjectValue: pricing.grossTotal,
      channelPartnerCommissionPct: 3.0,
      partnerCommissionAmount: partnerCommission,
      netDisbursementToPartner: partnerCommission,
    };
  }

  async remove(id: string): Promise<PricingSheet> {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }

  private computeSubsidy(capacityKw: number, category: string): number {
    if (category !== 'RESIDENTIAL') {
      return 0.0;
    }
    if (capacityKw <= 2) {
      return 60000;
    } else if (capacityKw <= 3) {
      return 78000;
    } else {
      return 78000; // Cap under PM Surya Ghar
    }
  }
}
