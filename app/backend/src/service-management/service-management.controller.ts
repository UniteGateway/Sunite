import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ServiceManagementService } from './service-management.service';
import { CreateWarrantyDto, UpdateWarrantyDto } from './dto/warranty.dto';
import { CreateAmcDto, UpdateAmcDto } from './dto/amc.dto';
import {
  CreateServiceTicketDto,
  UpdateServiceTicketDto,
  AssignEngineerDto,
  CloseServiceTicketDto,
} from './dto/service-ticket.dto';
import { RecordServiceVisitDto } from './dto/service-visit.dto';
import { CreateSparePartDto } from './dto/spare-parts.dto';
import { CreateWarrantyClaimDto } from './dto/warranty-claim.dto';
import { CreateCustomerFeedbackDto } from './dto/customer-feedback.dto';

@ApiTags('Warranty, AMC, Service Tickets, Field Service, Spare Parts & SLA Engine')
@Controller()
export class ServiceManagementController {
  constructor(private readonly serviceManagementService: ServiceManagementService) {}

  // WARRANTIES
  @Post('warranty')
  @ApiOperation({ summary: 'Activate Automatic Warranty Certificate for Solar Plant' })
  createWarranty(@Body() dto: CreateWarrantyDto) {
    return this.serviceManagementService.createWarranty(dto);
  }

  @Get('warranty')
  @ApiOperation({ summary: 'Get List of Plant & Equipment Warranties' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'projectId', required: false, type: String })
  findAllWarranties(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('projectId') projectId?: string,
  ) {
    return this.serviceManagementService.findAllWarranties({ search, status, projectId });
  }

  @Get('warranty/:id')
  @ApiOperation({ summary: 'Get Warranty Details by ID' })
  findWarrantyById(@Param('id') id: string) {
    return this.serviceManagementService.findWarrantyById(id);
  }

  @Put('warranty/:id')
  @ApiOperation({ summary: 'Update Warranty Parameters or Transfer Ownership' })
  updateWarranty(@Param('id') id: string, @Body() dto: UpdateWarrantyDto) {
    return this.serviceManagementService.updateWarranty(id, dto);
  }

  // AMC
  @Post('amc')
  @ApiOperation({ summary: 'Create Annual Maintenance Contract (Silver, Gold, Platinum, Corporate)' })
  createAmc(@Body() dto: CreateAmcDto) {
    return this.serviceManagementService.createAmc(dto);
  }

  @Get('amc')
  @ApiOperation({ summary: 'Get List of AMC Contracts' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'planName', required: false, type: String })
  @ApiQuery({ name: 'projectId', required: false, type: String })
  findAllAmcs(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('planName') planName?: string,
    @Query('projectId') projectId?: string,
  ) {
    return this.serviceManagementService.findAllAmcs({ search, status, planName, projectId });
  }

  @Get('amc/:id')
  @ApiOperation({ summary: 'Get AMC Contract Details by ID' })
  findAmcById(@Param('id') id: string) {
    return this.serviceManagementService.findAmcById(id);
  }

  @Put('amc/:id')
  @ApiOperation({ summary: 'Update AMC Contract Parameters or Renew Plan' })
  updateAmc(@Param('id') id: string, @Body() dto: UpdateAmcDto) {
    return this.serviceManagementService.updateAmc(id, dto);
  }

  // SERVICE TICKETS
  @Post('service-tickets')
  @ApiOperation({ summary: 'Create After-Sales Service Support Ticket' })
  createServiceTicket(@Body() dto: CreateServiceTicketDto) {
    return this.serviceManagementService.createServiceTicket(dto);
  }

  @Get('service-tickets')
  @ApiOperation({ summary: 'Get List of Service Tickets' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'priority', required: false, type: String })
  @ApiQuery({ name: 'serviceType', required: false, type: String })
  @ApiQuery({ name: 'assignedEngineerId', required: false, type: String })
  @ApiQuery({ name: 'projectId', required: false, type: String })
  findAllServiceTickets(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('serviceType') serviceType?: string,
    @Query('assignedEngineerId') assignedEngineerId?: string,
    @Query('projectId') projectId?: string,
  ) {
    return this.serviceManagementService.findAllServiceTickets({
      search,
      status,
      priority,
      serviceType,
      assignedEngineerId,
      projectId,
    });
  }

  @Get('service-tickets/:id')
  @ApiOperation({ summary: 'Get Service Ticket Details by ID' })
  findServiceTicketById(@Param('id') id: string) {
    return this.serviceManagementService.findServiceTicketById(id);
  }

  @Put('service-tickets/:id')
  @ApiOperation({ summary: 'Update Service Ticket Status or Priority' })
  updateServiceTicket(@Param('id') id: string, @Body() dto: UpdateServiceTicketDto) {
    return this.serviceManagementService.updateServiceTicket(id, dto);
  }

  @Post('service-tickets/:id/assign')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign Field Service Engineer to Service Ticket' })
  assignEngineer(@Param('id') id: string, @Body() dto: AssignEngineerDto) {
    return this.serviceManagementService.assignEngineer(id, dto);
  }

  @Post('service-tickets/:id/visit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Record Field Service Site Visit, Diagnosis & Customer Signature' })
  recordVisit(@Param('id') id: string, @Body() dto: RecordServiceVisitDto) {
    return this.serviceManagementService.recordVisit(id, dto);
  }

  @Post('service-tickets/:id/close')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Close Service Ticket with Resolution Details' })
  closeServiceTicket(@Param('id') id: string, @Body() dto: CloseServiceTicketDto) {
    return this.serviceManagementService.closeServiceTicket(id, dto);
  }

  // SERVICE VISITS
  @Post('service-visits')
  @ApiOperation({ summary: 'Record Direct Field Service Visit Log' })
  createServiceVisit(@Body() dto: RecordServiceVisitDto) {
    return this.serviceManagementService.recordVisit(dto.serviceTicketId || 'default', dto);
  }

  @Get('service-visits')
  @ApiOperation({ summary: 'Get List of Field Service Visits' })
  @ApiQuery({ name: 'serviceTicketId', required: false, type: String })
  @ApiQuery({ name: 'engineerId', required: false, type: String })
  findAllServiceVisits(
    @Query('serviceTicketId') serviceTicketId?: string,
    @Query('engineerId') engineerId?: string,
  ) {
    return this.serviceManagementService.findAllServiceVisits(serviceTicketId, engineerId);
  }

  // SPARE PARTS
  @Post('spare-parts')
  @ApiOperation({ summary: 'Create Spare Part Inventory Item SKU' })
  createSparePart(@Body() dto: CreateSparePartDto) {
    return this.serviceManagementService.createSparePart(dto);
  }

  @Get('spare-parts')
  @ApiOperation({ summary: 'Get Warehouse Spare Parts Stock Catalog' })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'warehouse', required: false, type: String })
  findAllSpareParts(
    @Query('category') category?: string,
    @Query('warehouse') warehouse?: string,
  ) {
    return this.serviceManagementService.findAllSpareParts(category, warehouse);
  }

  // WARRANTY CLAIMS
  @Post('warranty-claims')
  @ApiOperation({ summary: 'Submit Equipment Warranty Replacement RMA Claim' })
  createWarrantyClaim(@Body() dto: CreateWarrantyClaimDto) {
    return this.serviceManagementService.createWarrantyClaim(dto);
  }

  @Get('warranty-claims')
  @ApiOperation({ summary: 'Get Equipment Warranty Replacement Claims' })
  @ApiQuery({ name: 'projectId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  findAllWarrantyClaims(
    @Query('projectId') projectId?: string,
    @Query('status') status?: string,
  ) {
    return this.serviceManagementService.findAllWarrantyClaims(projectId, status);
  }

  // CUSTOMER FEEDBACK
  @Post('customer-feedback')
  @ApiOperation({ summary: 'Submit Customer Service Ticket Satisfaction Rating & NPS' })
  createCustomerFeedback(@Body() dto: CreateCustomerFeedbackDto) {
    return this.serviceManagementService.createCustomerFeedback(dto);
  }

  @Get('customer-feedback')
  @ApiOperation({ summary: 'Get Customer Satisfaction Reviews & Ratings' })
  @ApiQuery({ name: 'serviceTicketId', required: false, type: String })
  @ApiQuery({ name: 'customerId', required: false, type: String })
  findAllCustomerFeedbacks(
    @Query('serviceTicketId') serviceTicketId?: string,
    @Query('customerId') customerId?: string,
  ) {
    return this.serviceManagementService.findAllCustomerFeedbacks(serviceTicketId, customerId);
  }

  // SLA REPORT
  @Get('sla-report')
  @ApiOperation({ summary: 'Get Field Service Response & Resolution SLA Compliance Metrics' })
  getSlaReport() {
    return this.serviceManagementService.getSlaReport();
  }
}
