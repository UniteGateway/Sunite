import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { AssignLeadDto } from './dto/assign-lead.dto';
import { ConvertLeadDto } from './dto/convert-lead.dto';
import { LeadStatus } from '@prisma/client';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Lead' })
  @ApiResponse({ status: 201, description: 'Lead created successfully.' })
  @ApiResponse({ status: 409, description: 'Lead number conflict.' })
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of Leads with filters & pipeline status' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: LeadStatus })
  @ApiQuery({ name: 'customerId', required: false, type: String })
  @ApiQuery({ name: 'assignedUserId', required: false, type: String })
  findAll(
    @Query('search') search?: string,
    @Query('status') status?: LeadStatus,
    @Query('customerId') customerId?: string,
    @Query('assignedUserId') assignedUserId?: string,
  ) {
    return this.leadsService.findAll({ search, status, customerId, assignedUserId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Lead details by ID' })
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Lead details' })
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Post(':id/assign')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign Lead to a Sales Executive / User' })
  assign(@Param('id') id: string, @Body() dto: AssignLeadDto) {
    return this.leadsService.assign(id, dto.userId);
  }

  @Post(':id/convert')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Convert Lead to Won / Closed status' })
  convert(@Param('id') id: string, @Body() dto: ConvertLeadDto) {
    return this.leadsService.convert(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a Lead' })
  remove(@Param('id') id: string) {
    return this.leadsService.remove(id);
  }
}
