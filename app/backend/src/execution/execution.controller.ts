import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ExecutionService } from './execution.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AssignProjectDto } from './dto/assign-project.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import {
  UploadPhotoDto,
  QualityCheckDto,
  TestingDto,
  CommissionDto,
  HandoverDto,
  CreatePurchaseOrderDto,
  CreateMaterialDispatchDto,
} from './dto/execution-actions.dto';

@ApiTags('Project Execution, Procurement, Inventory, Installation & Commissioning')
@Controller()
export class ExecutionController {
  constructor(private readonly executionService: ExecutionService) {}

  // ORDERS
  @Post('orders')
  @ApiOperation({ summary: 'Convert Approved Quotation to Confirmed Order' })
  createOrder(@Body() dto: CreateOrderDto) {
    return this.executionService.createOrder(dto);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get list of Orders' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'customerId', required: false, type: String })
  findAllOrders(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('customerId') customerId?: string,
  ) {
    return this.executionService.findAllOrders({ search, status, customerId });
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Get Order details by ID' })
  findOrderById(@Param('id') id: string) {
    return this.executionService.findOrderById(id);
  }

  // PROJECTS
  @Post('projects')
  @ApiOperation({ summary: 'Create new EPC Solar Execution Project' })
  createProject(@Body() dto: CreateProjectDto) {
    return this.executionService.createProject(dto);
  }

  @Get('projects')
  @ApiOperation({ summary: 'Get list of Execution Projects' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'stage', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'projectManagerId', required: false, type: String })
  @ApiQuery({ name: 'epcVendorId', required: false, type: String })
  findAllProjects(
    @Query('search') search?: string,
    @Query('stage') stage?: string,
    @Query('status') status?: string,
    @Query('projectManagerId') projectManagerId?: string,
    @Query('epcVendorId') epcVendorId?: string,
  ) {
    return this.executionService.findAllProjects({ search, stage, status, projectManagerId, epcVendorId });
  }

  @Get('projects/:id')
  @ApiOperation({ summary: 'Get Project details by ID' })
  findProjectById(@Param('id') id: string) {
    return this.executionService.findProjectById(id);
  }

  @Put('projects/:id')
  @ApiOperation({ summary: 'Update Project parameters' })
  updateProject(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.executionService.updateProject(id, dto);
  }

  @Post('projects/:id/assign')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign Project Manager, EPC, Installation Vendor & Survey Engineer' })
  assignProject(@Param('id') id: string, @Body() dto: AssignProjectDto) {
    return this.executionService.assignProject(id, dto);
  }

  @Post('projects/:id/update-stage')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Project Execution Stage Milestone' })
  updateStage(@Param('id') id: string, @Body() dto: UpdateStageDto) {
    return this.executionService.updateStage(id, dto);
  }

  @Post('projects/:id/upload-photo')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload Geo-Tagged Site Installation Progress Photo' })
  uploadPhoto(@Param('id') id: string, @Body() dto: UploadPhotoDto) {
    return this.executionService.uploadPhoto(id, dto);
  }

  @Post('projects/:id/quality-check')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Record Quality Inspection Checklist & Result' })
  qualityCheck(@Param('id') id: string, @Body() dto: QualityCheckDto) {
    return this.executionService.qualityCheck(id, dto);
  }

  @Post('projects/:id/testing')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Record Electrical Testing (Voc, Isc, Insulation, Grid Sync)' })
  testing(@Param('id') id: string, @Body() dto: TestingDto) {
    return this.executionService.testing(id, dto);
  }

  @Post('projects/:id/commission')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Record Net Metering & Plant Commissioning' })
  commission(@Param('id') id: string, @Body() dto: CommissionDto) {
    return this.executionService.commission(id, dto);
  }

  @Post('projects/:id/handover')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Record Customer Handover & Warranty/AMC Activation' })
  handover(@Param('id') id: string, @Body() dto: HandoverDto) {
    return this.executionService.handover(id, dto);
  }

  @Post('projects/:id/close')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Close Execution Project' })
  closeProject(@Param('id') id: string, @Body('remarks') remarks?: string) {
    return this.executionService.closeProject(id, remarks);
  }

  // PURCHASE ORDERS
  @Get('purchase-orders')
  @ApiOperation({ summary: 'Get Purchase Orders list' })
  @ApiQuery({ name: 'projectId', required: false, type: String })
  findAllPurchaseOrders(@Query('projectId') projectId?: string) {
    return this.executionService.findAllPurchaseOrders(projectId);
  }

  @Post('purchase-orders')
  @ApiOperation({ summary: 'Create Purchase Order for Vendors' })
  createPurchaseOrder(@Body() dto: CreatePurchaseOrderDto) {
    return this.executionService.createPurchaseOrder(dto);
  }

  // INVENTORY
  @Get('inventory')
  @ApiOperation({ summary: 'Get Warehouse Inventory & Stock Levels' })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'warehouse', required: false, type: String })
  findAllInventory(
    @Query('category') category?: string,
    @Query('warehouse') warehouse?: string,
  ) {
    return this.executionService.findAllInventory(category, warehouse);
  }

  // MATERIAL DISPATCH
  @Post('material-dispatch')
  @ApiOperation({ summary: 'Create Material Dispatch Voucher for Site Delivery' })
  createMaterialDispatch(@Body() dto: CreateMaterialDispatchDto) {
    return this.executionService.createMaterialDispatch(dto);
  }
}
