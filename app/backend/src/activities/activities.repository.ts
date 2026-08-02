import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from '@prisma/client';

@Injectable()
export class ActivitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateActivityDto): Promise<Activity> {
    return this.prisma.activity.create({ data });
  }

  async findByCustomer(customerId: string): Promise<Activity[]> {
    return this.prisma.activity.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        lead: true,
      },
    });
  }

  async findByLead(leadId: string): Promise<Activity[]> {
    return this.prisma.activity.findMany({
      where: { leadId },
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        lead: true,
      },
    });
  }

  async findAll(limit: number = 20): Promise<Activity[]> {
    return this.prisma.activity.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        lead: true,
      },
    });
  }
}
