import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { SolarDesign, Prisma } from '@prisma/client';

@Injectable()
export class DesignsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDesignDto): Promise<SolarDesign> {
    const designNumber = data.designNumber || `DSGN-${Date.now().toString().slice(-6)}`;
    const systemCapacityKw = data.systemCapacityKw;
    const dcCapacityKw = data.dcCapacityKw ?? systemCapacityKw;
    const acCapacityKw = data.acCapacityKw ?? (dcCapacityKw / (data.dcAcRatio || 1.2));
    const estimatedAnnualGenKwh = data.estimatedAnnualGenKwh || (systemCapacityKw * 1450);
    const dailyGen = estimatedAnnualGenKwh / 365;
    const monthlyGen = estimatedAnnualGenKwh / 12;
    const co2Reduction = estimatedAnnualGenKwh * 0.00082; // ~0.82 kg CO2 / kWh
    const treesSaved = Math.round(co2Reduction * 42); // ~42 trees per ton CO2

    return this.prisma.solarDesign.create({
      data: {
        designNumber,
        surveyId: data.surveyId,
        systemCapacityKw,
        dcCapacityKw,
        acCapacityKw,
        dcAcRatio: data.dcAcRatio || 1.2,
        moduleType: data.moduleType,
        moduleCount: data.moduleCount,
        inverterType: data.inverterType,
        inverterCount: data.inverterCount,
        performanceRatio: data.performanceRatio || 0.78,
        cufPercent: data.cufPercent || 19.5,
        dailyGenerationKwh: dailyGen,
        monthlyGenerationKwh: monthlyGen,
        estimatedAnnualGenKwh,
        co2ReductionTons: co2Reduction,
        treesSaved,
        estimatedCost: systemCapacityKw * 45000, // ~45,000 INR per kWp
        subsidyAmount: systemCapacityKw <= 3 ? 78000 : 78000 + (systemCapacityKw - 3) * 10000,
        roiPercent: 24.5,
        paybackYears: 4.1,
        status: data.status || 'DRAFT',
        boqJson: data.boqJson,
        remarks: data.remarks,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.SolarDesignWhereInput;
  }): Promise<SolarDesign[]> {
    const { skip, take, where } = params;
    return this.prisma.solarDesign.findMany({
      skip,
      take,
      where: { ...where, deletedAt: null },
      include: {
        survey: {
          include: {
            lead: {
              include: {
                customer: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<SolarDesign | null> {
    return this.prisma.solarDesign.findFirst({
      where: { id, deletedAt: null },
      include: {
        survey: {
          include: {
            lead: {
              include: {
                customer: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateDesignDto): Promise<SolarDesign> {
    return this.prisma.solarDesign.update({
      where: { id },
      data,
    });
  }

  async updateStatus(id: string, status: string, remarks?: string): Promise<SolarDesign> {
    return this.prisma.solarDesign.update({
      where: { id },
      data: {
        status,
        ...(remarks && { remarks }),
      },
    });
  }

  async softDelete(id: string): Promise<SolarDesign> {
    return this.prisma.solarDesign.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'REJECTED' },
    });
  }
}
