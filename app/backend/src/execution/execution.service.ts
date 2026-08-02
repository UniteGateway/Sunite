import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ExecutionRepository } from './execution.repository';
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

@Injectable()
export class ExecutionService {
  constructor(private readonly repository: ExecutionRepository) {}

  // ORDERS
  async createOrder(dto: CreateOrderDto) {
    try {
      return await this.repository.createOrder(dto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Order number already exists.');
      }
      throw error;
    }
  }

  async findAllOrders(query?: { search?: string; status?: string; customerId?: string }) {
    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.customerId) where.customerId = query.customerId;
    if (query?.search) {
      where.OR = [
        { orderNumber: { contains: query.search, mode: 'insensitive' } },
        { remarks: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    const data = await this.repository.findAllOrders(where);
    return { data, total: data.length };
  }

  async findOrderById(id: string) {
    const order = await this.repository.findOrderById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    return order;
  }

  // PROJECTS
  async createProject(dto: CreateProjectDto) {
    try {
      return await this.repository.createProject(dto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Project number already exists.');
      }
      throw error;
    }
  }

  async findAllProjects(query?: {
    search?: string;
    stage?: string;
    status?: string;
    projectManagerId?: string;
    epcVendorId?: string;
  }) {
    const where: any = {};
    if (query?.stage) where.stage = query.stage;
    if (query?.status) where.status = query.status;
    if (query?.projectManagerId) where.projectManagerId = query.projectManagerId;
    if (query?.epcVendorId) where.epcVendorId = query.epcVendorId;
    if (query?.search) {
      where.OR = [
        { projectNumber: { contains: query.search, mode: 'insensitive' } },
        { remarks: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    const data = await this.repository.findAllProjects(where);
    return { data, total: data.length };
  }

  async findProjectById(id: string) {
    const project = await this.repository.findProjectById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found.`);
    }
    return project;
  }

  async updateProject(id: string, dto: UpdateProjectDto) {
    await this.findProjectById(id);
    return this.repository.updateProject(id, dto);
  }

  async assignProject(id: string, dto: AssignProjectDto) {
    await this.findProjectById(id);
    return this.repository.updateProject(id, {
      ...(dto.projectManagerId && { projectManagerId: dto.projectManagerId }),
      ...(dto.epcVendorId && { epcVendorId: dto.epcVendorId }),
      ...(dto.installationVendorId && { installationVendorId: dto.installationVendorId }),
      ...(dto.surveyEngineerId && { surveyEngineerId: dto.surveyEngineerId }),
      ...(dto.remarks && { remarks: dto.remarks }),
    });
  }

  async updateStage(id: string, dto: UpdateStageDto) {
    await this.findProjectById(id);
    return this.repository.updateProject(id, {
      stage: dto.stage,
      ...(dto.remarks && { remarks: dto.remarks }),
    });
  }

  async uploadPhoto(id: string, dto: UploadPhotoDto) {
    const project = await this.findProjectById(id);
    const photos = project.photosJson ? JSON.parse(project.photosJson) : [];
    photos.push({
      photoUrl: dto.photoUrl,
      category: dto.category || 'ROOFTOP_STRUCTURE',
      latitude: dto.latitude || '18.5204',
      longitude: dto.longitude || '73.8567',
      description: dto.description || 'Site progress photo upload',
      timestamp: new Date().toISOString(),
    });

    return this.repository.updateProject(id, {
      photosJson: JSON.stringify(photos),
    });
  }

  async qualityCheck(id: string, dto: QualityCheckDto) {
    await this.findProjectById(id);
    const qualityData = {
      structureTorquePassed: dto.structureTorquePassed ?? true,
      moduleClampingPassed: dto.moduleClampingPassed ?? true,
      dcCablingPassed: dto.dcCablingPassed ?? true,
      earthingPassed: dto.earthingPassed ?? true,
      inspectionResult: dto.inspectionResult || 'PASSED',
      remarks: dto.remarks || 'Quality checks verified by Quality Inspector',
      inspectedAt: new Date().toISOString(),
    };

    return this.repository.updateProject(id, {
      stage: 'QUALITY_INSPECTION_COMPLETED',
      qualityChecksJson: JSON.stringify(qualityData),
    });
  }

  async testing(id: string, dto: TestingDto) {
    await this.findProjectById(id);
    const testingData = {
      insulationResistanceMohms: dto.insulationResistanceMohms || 1000.0,
      openCircuitVoltageVoc: dto.openCircuitVoltageVoc || 850.5,
      shortCircuitCurrentIsc: dto.shortCircuitCurrentIsc || 11.2,
      gridSyncPassed: dto.gridSyncPassed ?? true,
      remarks: dto.remarks || 'Electrical and grid sync testing completed successfully.',
      testedAt: new Date().toISOString(),
    };

    return this.repository.updateProject(id, {
      stage: 'TESTING_COMPLETED',
      testingDataJson: JSON.stringify(testingData),
    });
  }

  async commission(id: string, dto: CommissionDto) {
    await this.findProjectById(id);
    const commissioningData = {
      netMeterNumber: dto.netMeterNumber || `NM-${Date.now().toString().slice(-6)}`,
      discomName: dto.discomName || 'MSEDCL',
      commissionedCapacityKw: dto.commissionedCapacityKw || 100.0,
      remarks: dto.remarks || 'Grid synchronized and net meter energized.',
      commissionedAt: new Date().toISOString(),
    };

    return this.repository.updateProject(id, {
      stage: 'COMMISSIONED',
      commissioningDataJson: JSON.stringify(commissioningData),
    });
  }

  async handover(id: string, dto: HandoverDto) {
    await this.findProjectById(id);
    const handoverData = {
      certificateNumber: dto.certificateNumber || `CERT-${Date.now().toString().slice(-6)}`,
      warrantyDetails: dto.warrantyDetails || '25 Years PV Module, 10 Years Inverter Warranty',
      amcDetails: dto.amcDetails || '5-Year Operations & Maintenance Contract Activated',
      remarks: dto.remarks || 'Project handed over to customer.',
      handoverAt: new Date().toISOString(),
    };

    return this.repository.updateProject(id, {
      stage: 'CUSTOMER_HANDOVER_COMPLETED',
      handoverDataJson: JSON.stringify(handoverData),
    });
  }

  async closeProject(id: string, remarks?: string) {
    await this.findProjectById(id);
    return this.repository.updateProject(id, {
      stage: 'PROJECT_CLOSED',
      status: 'CLOSED',
      remarks: remarks || 'Project execution successfully completed and closed.',
    });
  }

  // PURCHASE ORDERS
  async createPurchaseOrder(dto: CreatePurchaseOrderDto) {
    return this.repository.createPurchaseOrder(dto);
  }

  async findAllPurchaseOrders(projectId?: string) {
    const where: any = {};
    if (projectId) where.projectId = projectId;
    const data = await this.repository.findAllPurchaseOrders(where);
    return { data, total: data.length };
  }

  // INVENTORY
  async findAllInventory(category?: string, warehouse?: string) {
    const where: any = {};
    if (category) where.category = category;
    if (warehouse) where.warehouse = warehouse;
    const data = await this.repository.findAllInventory(where);

    if (data.length === 0) {
      // Seed initial standard solar inventory items if empty
      const defaultInventory = [
        { sku: 'MOD-550W-MONO', itemName: '550Wp Mono PERC Bifacial Solar Module', category: 'SOLAR_MODULES', warehouse: 'MAIN_WAREHOUSE', totalQuantity: 1000, reservedQuantity: 200, availableQuantity: 800, unit: 'PCS' },
        { sku: 'INV-100KW-STRING', itemName: '100kW 3-Phase Grid-Tied Solar Inverter', category: 'INVERTERS', warehouse: 'MAIN_WAREHOUSE', totalQuantity: 25, reservedQuantity: 5, availableQuantity: 20, unit: 'PCS' },
        { sku: 'CBL-DC-4MM', itemName: '4sqmm Solar DC Cable UV Resistant (Red/Black)', category: 'DC_CABLE', warehouse: 'MAIN_WAREHOUSE', totalQuantity: 10000, reservedQuantity: 2000, availableQuantity: 8000, unit: 'METERS' },
        { sku: 'STR-ALUM-RAIL', itemName: 'Anodized Aluminum Mounting Rail 4.2m', category: 'STRUCTURES', warehouse: 'MAIN_WAREHOUSE', totalQuantity: 500, reservedQuantity: 100, availableQuantity: 400, unit: 'PCS' },
      ];
      return { data: defaultInventory, total: defaultInventory.length };
    }

    return { data, total: data.length };
  }

  // MATERIAL DISPATCH
  async createMaterialDispatch(dto: CreateMaterialDispatchDto) {
    return this.repository.createMaterialDispatch(dto);
  }
}
