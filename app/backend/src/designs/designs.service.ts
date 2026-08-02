import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DesignsRepository } from './designs.repository';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { CalculateDesignDto } from './dto/calculate-design.dto';
import { SolarDesign } from '@prisma/client';

@Injectable()
export class DesignsService {
  constructor(private readonly repository: DesignsRepository) {}

  async create(createDto: CreateDesignDto): Promise<SolarDesign> {
    try {
      return await this.repository.create(createDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Design number already exists.');
      }
      throw error;
    }
  }

  async findAll(query?: {
    search?: string;
    status?: string;
    surveyId?: string;
    page?: number;
    limit?: number;
  }) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.surveyId) where.surveyId = query.surveyId;
    if (query?.search) {
      where.OR = [
        { designNumber: { contains: query.search, mode: 'insensitive' } },
        { moduleType: { contains: query.search, mode: 'insensitive' } },
        { inverterType: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const data = await this.repository.findAll({ skip, take: limit, where });
    return { data, total: data.length };
  }

  async findOne(id: string): Promise<SolarDesign> {
    const design = await this.repository.findOne(id);
    if (!design) {
      throw new NotFoundException(`Solar Design with ID ${id} not found`);
    }
    return design;
  }

  async update(id: string, updateDto: UpdateDesignDto): Promise<SolarDesign> {
    await this.findOne(id);
    return this.repository.update(id, updateDto);
  }

  async calculate(id: string, calcDto: CalculateDesignDto): Promise<SolarDesign> {
    const design = await this.findOne(id);

    const roofArea = calcDto.usableRoofArea || (design.survey ? design.survey.usableRoofArea : 500);
    const moduleWatt = calcDto.moduleWattage || 550;
    const tariff = calcDto.tariffPerKwh || 8.5;

    // Standard engineering formulas
    // Approx 10 sq.m per 1 kWp of solar modules
    const maxKwByArea = roofArea / 10.0;
    const recommendedKw = Math.min(maxKwByArea, calcDto.sanctionedLoadKw || maxKwByArea || 100);

    const moduleCount = Math.ceil((recommendedKw * 1000) / moduleWatt);
    const dcCapacityKw = (moduleCount * moduleWatt) / 1000;
    const acCapacityKw = dcCapacityKw / 1.2;
    const inverterCount = Math.max(1, Math.ceil(acCapacityKw / 50)); // 50kW inverters

    const annualGen = dcCapacityKw * 1450;
    const dailyGen = annualGen / 365;
    const monthlyGen = annualGen / 12;

    const co2Tons = annualGen * 0.00082;
    const trees = Math.round(co2Tons * 42);

    const estCost = dcCapacityKw * 45000;
    const annualSavings = annualGen * tariff;
    const payback = estCost / (annualSavings || 1);

    const boq = {
      modules: { model: design.moduleType, wattage: moduleWatt, count: moduleCount },
      inverters: { model: design.inverterType, capacityKw: 50, count: inverterCount },
      dcCable: { type: '4 sq.mm Solar Cable', lengthMeters: Math.round(dcCapacityKw * 4.5) },
      acCable: { type: '3.5C Armoured Aluminium Cable', lengthMeters: Math.round(acCapacityKw * 1.5) },
      structures: { type: 'HDG Aluminium Elevated Roof Structure', quantity: Math.ceil(moduleCount / 2) },
      earthingKits: { type: 'Chemical Gel Earthing Electrode 50mm x 3m', count: 4 },
      lightningArrester: { type: 'ESE Active Lightning Arrester 107m radius', count: 1 },
      monitoring: { type: 'WiFi + RS485 Datalogger Smart Meter', count: 1 },
    };

    return this.repository.update(id, {
      systemCapacityKw: recommendedKw,
      dcCapacityKw,
      acCapacityKw,
      moduleCount,
      inverterCount,
      dailyGenerationKwh: dailyGen,
      monthlyGenerationKwh: monthlyGen,
      estimatedAnnualGenKwh: annualGen,
      co2ReductionTons: co2Tons,
      treesSaved: trees,
      estimatedCost: estCost,
      paybackYears: Number(payback.toFixed(1)),
      boqJson: JSON.stringify(boq),
      status: 'ENGINEERING_REVIEW',
    });
  }

  async approve(id: string, remarks?: string): Promise<SolarDesign> {
    await this.findOne(id);
    return this.repository.updateStatus(id, 'APPROVED', remarks || 'Engineering solar design approved.');
  }

  async reject(id: string, remarks?: string): Promise<SolarDesign> {
    await this.findOne(id);
    return this.repository.updateStatus(id, 'REJECTED', remarks || 'Engineering solar design rejected.');
  }

  async getGeneration(id: string) {
    const design = await this.findOne(id);

    const monthlyBreakdown = [
      { month: 'Jan', generationKwh: Math.round(design.estimatedAnnualGenKwh * 0.082) },
      { month: 'Feb', generationKwh: Math.round(design.estimatedAnnualGenKwh * 0.088) },
      { month: 'Mar', generationKwh: Math.round(design.estimatedAnnualGenKwh * 0.098) },
      { month: 'Apr', generationKwh: Math.round(design.estimatedAnnualGenKwh * 0.102) },
      { month: 'May', generationKwh: Math.round(design.estimatedAnnualGenKwh * 0.095) },
      { month: 'Jun', generationKwh: Math.round(design.estimatedAnnualGenKwh * 0.071) },
      { month: 'Jul', generationKwh: Math.round(design.estimatedAnnualGenKwh * 0.062) },
      { month: 'Aug', generationKwh: Math.round(design.estimatedAnnualGenKwh * 0.065) },
      { month: 'Sep', generationKwh: Math.round(design.estimatedAnnualGenKwh * 0.078) },
      { month: 'Oct', generationKwh: Math.round(design.estimatedAnnualGenKwh * 0.089) },
      { month: 'Nov', generationKwh: Math.round(design.estimatedAnnualGenKwh * 0.086) },
      { month: 'Dec', generationKwh: Math.round(design.estimatedAnnualGenKwh * 0.084) },
    ];

    return {
      designId: design.id,
      systemCapacityKw: design.systemCapacityKw,
      cufPercent: design.cufPercent,
      performanceRatio: design.performanceRatio,
      dailyAvgGenKwh: Math.round(design.dailyGenerationKwh),
      monthlyAvgGenKwh: Math.round(design.monthlyGenerationKwh),
      estimatedAnnualGenKwh: design.estimatedAnnualGenKwh,
      co2ReductionTons: design.co2ReductionTons,
      treesSaved: design.treesSaved,
      monthlyBreakdown,
    };
  }

  async getBoq(id: string) {
    const design = await this.findOne(id);
    const boqData = design.boqJson ? JSON.parse(design.boqJson) : null;

    return {
      designId: design.id,
      designNumber: design.designNumber,
      systemCapacityKw: design.systemCapacityKw,
      moduleType: design.moduleType,
      moduleCount: design.moduleCount,
      inverterType: design.inverterType,
      inverterCount: design.inverterCount,
      estimatedCost: design.estimatedCost,
      subsidyAmount: design.subsidyAmount,
      boq: boqData,
    };
  }

  async remove(id: string): Promise<SolarDesign> {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }
}
