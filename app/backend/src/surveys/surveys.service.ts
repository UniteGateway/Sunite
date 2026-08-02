import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { SurveysRepository } from './surveys.repository';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { UploadMediaDto } from './dto/upload-media.dto';
import { Survey } from '@prisma/client';

@Injectable()
export class SurveysService {
  constructor(private readonly repository: SurveysRepository) {}

  async create(createDto: CreateSurveyDto): Promise<Survey> {
    try {
      return await this.repository.create(createDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Survey number already exists.');
      }
      throw error;
    }
  }

  async findAll(query?: {
    search?: string;
    status?: string;
    leadId?: string;
    engineerId?: string;
    page?: number;
    limit?: number;
  }) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.leadId) where.leadId = query.leadId;
    if (query?.engineerId) where.engineerId = query.engineerId;
    if (query?.search) {
      where.OR = [
        { surveyNumber: { contains: query.search, mode: 'insensitive' } },
        { roofType: { contains: query.search, mode: 'insensitive' } },
        { discom: { contains: query.search, mode: 'insensitive' } },
        { consumerNumber: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const data = await this.repository.findAll({ skip, take: limit, where });
    return { data, total: data.length };
  }

  async findOne(id: string): Promise<Survey> {
    const survey = await this.repository.findOne(id);
    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }
    return survey;
  }

  async update(id: string, updateDto: UpdateSurveyDto): Promise<Survey> {
    await this.findOne(id);
    return this.repository.update(id, updateDto);
  }

  async assign(id: string, engineerId: string): Promise<Survey> {
    await this.findOne(id);
    return this.repository.assignEngineer(id, engineerId);
  }

  async approve(id: string, remarks?: string): Promise<Survey> {
    await this.findOne(id);
    return this.repository.updateStatus(id, 'APPROVED', remarks || 'Survey technical feasibility approved.');
  }

  async reject(id: string, remarks?: string): Promise<Survey> {
    await this.findOne(id);
    return this.repository.updateStatus(id, 'REJECTED', remarks || 'Survey technical feasibility rejected.');
  }

  async uploadPhoto(id: string, dto: UploadMediaDto): Promise<{ success: boolean; surveyId: string; fileUrl: string }> {
    await this.findOne(id);
    return {
      success: true,
      surveyId: id,
      fileUrl: dto.fileUrl,
    };
  }

  async uploadDocument(id: string, dto: UploadMediaDto): Promise<{ success: boolean; surveyId: string; fileUrl: string }> {
    await this.findOne(id);
    return {
      success: true,
      surveyId: id,
      fileUrl: dto.fileUrl,
    };
  }

  async remove(id: string): Promise<Survey> {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }
}
