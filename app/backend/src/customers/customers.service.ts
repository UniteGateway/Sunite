import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(private readonly repository: CustomersRepository) {}

  async create(createDto: CreateCustomerDto): Promise<Customer> {
    try {
      return await this.repository.create(createDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Customer code already registered.');
      }
      throw error;
    }
  }

  async findAll(query?: { search?: string; organizationId?: string; page?: number; limit?: number }) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query?.organizationId) where.organizationId = query.organizationId;
    if (query?.search) {
      where.OR = [
        { fullName: { contains: query.search, mode: 'insensitive' } },
        { customerCode: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { mobile: { contains: query.search, mode: 'insensitive' } },
        { gstin: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const data = await this.repository.findAll({ skip, take: limit, where });
    return { data, total: data.length };
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.repository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: string, updateDto: UpdateCustomerDto): Promise<Customer> {
    await this.findOne(id);
    return this.repository.update(id, updateDto);
  }

  async remove(id: string): Promise<Customer> {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }
}
