import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { BranchesRepository } from './branches.repository';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from '@prisma/client';

@Injectable()
export class BranchesService {
  constructor(private readonly repository: BranchesRepository) {}

  async create(createDto: CreateBranchDto): Promise<Branch> {
    try {
      return await this.repository.create(createDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Branch code already exists.');
      }
      throw error;
    }
  }

  async findAll(query?: { search?: string; organizationId?: string; page?: number; limit?: number }) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query?.organizationId) {
      where.organizationId = query.organizationId;
    }
    if (query?.search) {
      where.OR = [
        { branchCode: { contains: query.search, mode: 'insensitive' } },
        { branchName: { contains: query.search, mode: 'insensitive' } },
        { city: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const data = await this.repository.findAll({ skip, take: limit, where });
    return { data, total: data.length };
  }

  async findOne(id: string): Promise<Branch> {
    const branch = await this.repository.findOne(id);
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    return branch;
  }

  async update(id: string, updateDto: UpdateBranchDto): Promise<Branch> {
    await this.findOne(id);
    return this.repository.update(id, updateDto);
  }

  async remove(id: string): Promise<Branch> {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }
}
