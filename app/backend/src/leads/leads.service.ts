import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { LeadsRepository } from './leads.repository';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ConvertLeadDto } from './dto/convert-lead.dto';
import { Lead, LeadStatus } from '@prisma/client';

@Injectable()
export class LeadsService {
  constructor(private readonly repository: LeadsRepository) {}

  async create(createDto: CreateLeadDto): Promise<Lead> {
    try {
      return await this.repository.create(createDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Lead number already exists.');
      }
      throw error;
    }
  }

  async findAll(query?: { search?: string; status?: LeadStatus; customerId?: string; assignedUserId?: string; page?: number; limit?: number }) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.customerId) where.customerId = query.customerId;
    if (query?.assignedUserId) where.assignedUserId = query.assignedUserId;
    if (query?.search) {
      where.OR = [
        { leadNumber: { contains: query.search, mode: 'insensitive' } },
        { roofType: { contains: query.search, mode: 'insensitive' } },
        { utilityCompany: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const data = await this.repository.findAll({ skip, take: limit, where });
    return { data, total: data.length };
  }

  async findOne(id: string): Promise<Lead> {
    const lead = await this.repository.findOne(id);
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return lead;
  }

  async update(id: string, updateDto: UpdateLeadDto): Promise<Lead> {
    await this.findOne(id);
    return this.repository.update(id, updateDto);
  }

  async assign(id: string, userId: string): Promise<Lead> {
    await this.findOne(id);
    return this.repository.assign(id, userId);
  }

  async convert(id: string, convertDto: ConvertLeadDto): Promise<Lead> {
    await this.findOne(id);
    return this.repository.updateStatus(id, LeadStatus.CONVERTED);
  }

  async remove(id: string): Promise<Lead> {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }
}
