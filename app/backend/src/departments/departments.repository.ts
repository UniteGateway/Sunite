import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department, Prisma } from '@prisma/client';

@Injectable()
export class DepartmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDepartmentDto): Promise<Department> {
    return this.prisma.department.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.DepartmentWhereInput;
  }): Promise<Department[]> {
    const { skip, take, where } = params;
    return this.prisma.department.findMany({
      skip,
      take,
      where: { ...where, deletedAt: null },
      include: {
        organization: true,
        branch: true,
        users: true,
      },
    });
  }

  async findOne(id: string): Promise<Department | null> {
    return this.prisma.department.findFirst({
      where: { id, deletedAt: null },
      include: {
        organization: true,
        branch: true,
        users: true,
      },
    });
  }

  async update(id: string, data: UpdateDepartmentDto): Promise<Department> {
    return this.prisma.department.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string): Promise<Department> {
    return this.prisma.department.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
