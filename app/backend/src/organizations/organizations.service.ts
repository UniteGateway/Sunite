import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { OrganizationsRepository } from './organizations.repository';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from '@prisma/client';

@Injectable()
export class OrganizationsService {
  constructor(private readonly repository: OrganizationsRepository) {}

  async create(createDto: CreateOrganizationDto): Promise<Organization> {
    try {
      return await this.repository.create(createDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Tax ID (GSTIN/CIN) already registered.');
      }
      throw error;
    }
  }

  async findAll(query?: { search?: string; page?: number; limit?: number }): Promise<{ data: Organization[]; total: number }> {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where = query?.search
      ? {
          OR: [
            { companyName: { contains: query.search, mode: 'insensitive' as const } },
            { legalName: { contains: query.search, mode: 'insensitive' as const } },
            { taxId: { contains: query.search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const data = await this.repository.findAll({ skip, take: limit, where });
    return { data, total: data.length };
  }

  async findOne(id: string): Promise<Organization> {
    const org = await this.repository.findOne(id);
    if (!org) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return org;
  }

  async update(id: string, updateDto: UpdateOrganizationDto): Promise<Organization> {
    await this.findOne(id);
    return this.repository.update(id, updateDto);
  }

  async remove(id: string): Promise<Organization> {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }
}
