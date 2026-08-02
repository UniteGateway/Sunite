import { Injectable } from '@nestjs/common';
import { ActivitiesRepository } from './activities.repository';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from '@prisma/client';

@Injectable()
export class ActivitiesService {
  constructor(private readonly repository: ActivitiesRepository) {}

  async create(dto: CreateActivityDto): Promise<Activity> {
    return this.repository.create(dto);
  }

  async findByCustomer(customerId: string): Promise<Activity[]> {
    return this.repository.findByCustomer(customerId);
  }

  async findByLead(leadId: string): Promise<Activity[]> {
    return this.repository.findByLead(leadId);
  }

  async findAll(limit?: number): Promise<Activity[]> {
    return this.repository.findAll(limit || 20);
  }
}
