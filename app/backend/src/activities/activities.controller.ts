import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';

@ApiTags('Activities & Customer Timeline')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @ApiOperation({ summary: 'Log a new CRM Activity or Follow-up' })
  @ApiResponse({ status: 201, description: 'Activity logged successfully.' })
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get recent CRM activities' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query('limit') limit?: number) {
    return this.activitiesService.findAll(limit ? Number(limit) : 20);
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Get complete CRM activity timeline for a Customer' })
  findByCustomer(@Param('customerId') customerId: string) {
    return this.activitiesService.findByCustomer(customerId);
  }

  @Get('lead/:leadId')
  @ApiOperation({ summary: 'Get CRM activity timeline for a Lead' })
  findByLead(@Param('leadId') leadId: string) {
    return this.activitiesService.findByLead(leadId);
  }
}
