import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, Prisma } from '@prisma/client';

@Injectable()
export class CustomersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCustomerDto): Promise<Customer> {
    return this.prisma.customer.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.CustomerWhereInput;
  }): Promise<Customer[]> {
    const { skip, take, where } = params;
    return this.prisma.customer.findMany({
      skip,
      take,
      where: { ...where, deletedAt: null },
      include: {
        organization: true,
        leads: true,
        projects: true,
        serviceTickets: true,
        activities: true,
      },
    });
  }

  async findOne(id: string): Promise<Customer | null> {
    return this.prisma.customer.findFirst({
      where: { id, deletedAt: null },
      include: {
        organization: true,
        leads: true,
        projects: true,
        serviceTickets: true,
        activities: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async update(id: string, data: UpdateCustomerDto): Promise<Customer> {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string): Promise<Customer> {
    return this.prisma.customer.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
