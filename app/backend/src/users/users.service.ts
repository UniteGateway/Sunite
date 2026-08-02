import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { User, EntityStatus, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async create(createDto: CreateUserDto): Promise<User> {
    const existing = await this.repository.findByEmail(createDto.email);
    if (existing) {
      throw new ConflictException(`User with email ${createDto.email} already exists.`);
    }

    const passwordHash = await bcrypt.hash(createDto.password, 12);

    return this.repository.create({
      email: createDto.email,
      mobile: createDto.mobile,
      passwordHash,
      firstName: createDto.firstName,
      lastName: createDto.lastName,
      role: createDto.role,
      status: createDto.status || EntityStatus.ACTIVE,
      organization: { connect: { id: createDto.organizationId } },
      ...(createDto.branchId && { branch: { connect: { id: createDto.branchId } } }),
      ...(createDto.departmentId && { department: { connect: { id: createDto.departmentId } } }),
    });
  }

  async findAll(query?: { search?: string; organizationId?: string; role?: UserRole; page?: number; limit?: number }) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query?.organizationId) where.organizationId = query.organizationId;
    if (query?.role) where.role = query.role;
    if (query?.search) {
      where.OR = [
        { email: { contains: query.search, mode: 'insensitive' } },
        { firstName: { contains: query.search, mode: 'insensitive' } },
        { lastName: { contains: query.search, mode: 'insensitive' } },
        { mobile: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const data = await this.repository.findAll({ skip, take: limit, where });
    return { data, total: data.length };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    return this.repository.update(id, {
      firstName: updateDto.firstName,
      lastName: updateDto.lastName,
      email: updateDto.email,
      mobile: updateDto.mobile,
      role: updateDto.role,
      status: updateDto.status,
    });
  }

  async activate(id: string): Promise<User> {
    await this.findOne(id);
    return this.repository.updateStatus(id, EntityStatus.ACTIVE);
  }

  async deactivate(id: string): Promise<User> {
    await this.findOne(id);
    return this.repository.updateStatus(id, EntityStatus.INACTIVE);
  }

  async resetPassword(id: string, dto: ResetPasswordDto): Promise<User> {
    await this.findOne(id);
    const passwordHash = await bcrypt.hash(dto.newPassword, 12);
    return this.repository.update(id, { passwordHash });
  }

  async assignRole(id: string, role: UserRole): Promise<User> {
    await this.findOne(id);
    return this.repository.updateRole(id, role);
  }

  async remove(id: string): Promise<User> {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }
}
