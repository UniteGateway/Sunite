import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization, Prisma } from '@prisma/client';

@Injectable()
export class OrganizationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOrganizationDto): Promise<Organization> {
    return this.prisma.organization.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.OrganizationWhereInput;
    orderBy?: Prisma.OrganizationOrderByWithRelationInput;
  }): Promise<Organization[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.organization.findMany({
      skip,
      take,
      where: { ...where, deletedAt: null },
      orderBy,
      include: {
        branches: true,
        departments: true,
      },
    });
  }

  async findOne(id: string): Promise<Organization | null> {
    return this.prisma.organization.findFirst({
      where: { id, deletedAt: null },
      include: {
        branches: true,
        departments: true,
      },
    });
  }

  async update(id: string, data: UpdateOrganizationDto): Promise<Organization> {
    return this.prisma.organization.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string): Promise<Organization> {
    return this.prisma.organization.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
