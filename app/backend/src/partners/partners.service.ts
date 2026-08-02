import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PartnersRepository } from './partners.repository';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { AssignRegionDto } from './dto/assign-region.dto';
import { Partner, EntityStatus } from '@prisma/client';

@Injectable()
export class PartnersService {
  constructor(private readonly repository: PartnersRepository) {}

  async create(createDto: CreatePartnerDto): Promise<Partner> {
    try {
      return await this.repository.create(createDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Partner code already exists.');
      }
      throw error;
    }
  }

  async findAll(query?: { search?: string; partnerType?: string; organizationId?: string; status?: EntityStatus; page?: number; limit?: number }) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query?.organizationId) where.organizationId = query.organizationId;
    if (query?.status) where.status = query.status;
    if (query?.partnerType) {
      where.partnerType = { contains: query.partnerType, mode: 'insensitive' };
    }
    if (query?.search) {
      where.OR = [
        { companyName: { contains: query.search, mode: 'insensitive' } },
        { partnerCode: { contains: query.search, mode: 'insensitive' } },
        { contactPerson: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { gstin: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const data = await this.repository.findAll({ skip, take: limit, where });
    return { data, total: data.length };
  }

  async findOne(id: string): Promise<Partner> {
    const partner = await this.repository.findOne(id);
    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    return partner;
  }

  async update(id: string, updateDto: UpdatePartnerDto): Promise<Partner> {
    await this.findOne(id);
    return this.repository.update(id, updateDto);
  }

  async approve(id: string): Promise<Partner> {
    await this.findOne(id);
    return this.repository.updateStatus(id, EntityStatus.ACTIVE);
  }

  async reject(id: string): Promise<Partner> {
    await this.findOne(id);
    return this.repository.updateStatus(id, EntityStatus.INACTIVE);
  }

  async suspend(id: string): Promise<Partner> {
    await this.findOne(id);
    return this.repository.updateStatus(id, EntityStatus.SUSPENDED);
  }

  async assignRegion(id: string, dto: AssignRegionDto): Promise<Partner> {
    const partner = await this.findOne(id);
    // In actual implementation, stores coverage region JSON or table
    return partner;
  }

  async findEpcPartners(): Promise<Partner[]> {
    const res = await this.findAll({ partnerType: 'EPC' });
    return res.data;
  }

  async findVendors(): Promise<Partner[]> {
    const res = await this.findAll({ partnerType: 'Vendor' });
    return res.data;
  }

  async findSurveyEngineers(): Promise<any[]> {
    return this.repository.findSurveyEngineers();
  }

  async remove(id: string): Promise<Partner> {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }
}
