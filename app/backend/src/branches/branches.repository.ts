import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch, Prisma } from '@prisma/client';

@Injectable()
export class BranchesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBranchDto): Promise<Branch> {
    return this.prisma.branch.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.BranchWhereInput;
  }): Promise<Branch[]> {
    const { skip, take, where } = params;
    return this.prisma.branch.findMany({
      skip,
      take,
      where: { ...where, deletedAt: null },
      include: {
        organization: true,
        departments: true,
      },
    });
  }

  async findOne(id: string): Promise<Branch | null> {
    return this.prisma.branch.findFirst({
      where: { id, deletedAt: null },
      include: {
        organization: true,
        departments: true,
      },
    });
  }

  async update(id: string, data: UpdateBranchDto): Promise<Branch> {
    return this.prisma.branch.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string): Promise<Branch> {
    return this.prisma.branch.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
