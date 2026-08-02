import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey, Prisma } from '@prisma/client';

@Injectable()
export class SurveysRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSurveyDto): Promise<Survey> {
    return this.prisma.survey.create({
      data: {
        surveyNumber: data.surveyNumber,
        leadId: data.leadId,
        engineerId: data.engineerId,
        usableRoofArea: data.usableRoofArea ?? 0.0,
        azimuthDeg: data.azimuthDeg ?? 180.0,
        tiltAngleDeg: data.tiltAngleDeg ?? 20.0,
        sanctionedLoad: data.sanctionedLoad ?? 0.0,
        shadingReport: data.shadingReport,
        isFeasible: data.isFeasible ?? true,
        status: data.status || 'SCHEDULED',
        latitude: data.latitude,
        longitude: data.longitude,
        roofType: data.roofType,
        discom: data.discom,
        consumerNumber: data.consumerNumber,
        remarks: data.remarks,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.SurveyWhereInput;
  }): Promise<Survey[]> {
    const { skip, take, where } = params;
    return this.prisma.survey.findMany({
      skip,
      take,
      where: { ...where, deletedAt: null },
      include: {
        lead: {
          include: {
            customer: true,
          },
        },
        engineer: true,
        designs: true,
      },
    });
  }

  async findOne(id: string): Promise<Survey | null> {
    return this.prisma.survey.findFirst({
      where: { id, deletedAt: null },
      include: {
        lead: {
          include: {
            customer: true,
          },
        },
        engineer: true,
        designs: true,
      },
    });
  }

  async update(id: string, data: UpdateSurveyDto): Promise<Survey> {
    return this.prisma.survey.update({
      where: { id },
      data,
    });
  }

  async updateStatus(id: string, status: string, remarks?: string): Promise<Survey> {
    return this.prisma.survey.update({
      where: { id },
      data: {
        status,
        ...(remarks && { remarks }),
      },
    });
  }

  async assignEngineer(id: string, engineerId: string): Promise<Survey> {
    return this.prisma.survey.update({
      where: { id },
      data: {
        engineerId,
        status: 'ASSIGNED',
      },
    });
  }

  async softDelete(id: string): Promise<Survey> {
    return this.prisma.survey.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'CANCELLED' },
    });
  }
}
