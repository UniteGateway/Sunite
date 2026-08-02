import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner, Prisma, EntityStatus, UserRole } from '@prisma/client';

@Injectable()
export class PartnersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePartnerDto): Promise<Partner> {
    return this.prisma.partner.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.PartnerWhereInput;
  }): Promise<Partner[]> {
    const { skip, take, where } = params;
    return this.prisma.partner.findMany({
      skip,
      take,
      where: { ...where, deletedAt: null },
      include: {
        organization: true,
        commissions: true,
      },
    });
  }

  async findOne(id: string): Promise<Partner | null> {
    return this.prisma.partner.findFirst({
      where: { id, deletedAt: null },
      include: {
        organization: true,
        commissions: true,
      },
    });
  }

  async update(id: string, data: UpdatePartnerDto): Promise<Partner> {
    return this.prisma.partner.update({
      where: { id },
      data,
    });
  }

  async updateStatus(id: string, status: EntityStatus): Promise<Partner> {
    return this.prisma.partner.update({
      where: { id },
      data: { status },
    });
  }

  async softDelete(id: string): Promise<Partner> {
    return this.prisma.partner.update({
      where: { id },
      data: { deletedAt: new Date(), status: EntityStatus.INACTIVE },
    });
  }

  async findSurveyEngineers(): Promise<any[]> {
    return this.prisma.user.findMany({
      where: {
        role: UserRole.SURVEY_ENGINEER,
        deletedAt: null,
      },
      include: {
        organization: true,
        branch: true,
        department: true,
      },
    });
  }
}
