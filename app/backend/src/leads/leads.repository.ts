import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead, Prisma, LeadStatus } from '@prisma/client';

@Injectable()
export class LeadsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateLeadDto): Promise<Lead> {
    return this.prisma.lead.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.LeadWhereInput;
  }): Promise<Lead[]> {
    const { skip, take, where } = params;
    return this.prisma.lead.findMany({
      skip,
      take,
      where: { ...where, deletedAt: null },
      include: {
        customer: true,
        assignedUser: true,
        surveys: true,
        quotations: true,
        activities: true,
      },
    });
  }

  async findOne(id: string): Promise<Lead | null> {
    return this.prisma.lead.findFirst({
      where: { id, deletedAt: null },
      include: {
        customer: true,
        assignedUser: true,
        surveys: true,
        quotations: true,
        activities: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async update(id: string, data: UpdateLeadDto): Promise<Lead> {
    return this.prisma.lead.update({
      where: { id },
      data,
    });
  }

  async assign(id: string, userId: string): Promise<Lead> {
    return this.prisma.lead.update({
      where: { id },
      data: { assignedUserId: userId },
    });
  }

  async updateStatus(id: string, status: LeadStatus): Promise<Lead> {
    return this.prisma.lead.update({
      where: { id },
      data: { status },
    });
  }

  async softDelete(id: string): Promise<Lead> {
    return this.prisma.lead.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
