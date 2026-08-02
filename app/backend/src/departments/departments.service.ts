import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DepartmentsRepository } from './departments.repository';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from '@prisma/client';

@Injectable()
export class DepartmentsService {
  constructor(private readonly repository: DepartmentsRepository) {}

  async create(createDto: CreateDepartmentDto): Promise<Department> {
    try {
      return await this.repository.create(createDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Department code already exists in this organization.');
      }
      throw error;
    }
  }

  async findAll(query?: { search?: string; organizationId?: string; branchId?: string; page?: number; limit?: number }) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query?.organizationId) where.organizationId = query.organizationId;
    if (query?.branchId) where.branchId = query.branchId;
    if (query?.search) {
      where.OR = [
        { deptCode: { contains: query.search, mode: 'insensitive' } },
        { deptName: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const data = await this.repository.findAll({ skip, take: limit, where });
    return { data, total: data.length };
  }

  async findOne(id: string): Promise<Department> {
    const dept = await this.repository.findOne(id);
    if (!dept) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return dept;
  }

  async update(id: string, updateDto: UpdateDepartmentDto): Promise<Department> {
    await this.findOne(id);
    return this.repository.update(id, updateDto);
  }

  async remove(id: string): Promise<Department> {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }
}
