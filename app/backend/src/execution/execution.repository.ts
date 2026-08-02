import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AssignProjectDto } from './dto/assign-project.dto';
import { CreatePurchaseOrderDto, CreateMaterialDispatchDto } from './dto/execution-actions.dto';
import { Order, Project, PurchaseOrder, InventoryItem, MaterialDispatch, Prisma } from '@prisma/client';

@Injectable()
export class ExecutionRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ORDERS
  async createOrder(data: CreateOrderDto): Promise<Order> {
    const orderNumber = data.orderNumber || `ORD-${Date.now().toString().slice(-6)}`;
    return this.prisma.order.create({
      data: {
        orderNumber,
        quotationId: data.quotationId,
        customerId: data.customerId,
        leadId: data.leadId,
        partnerId: data.partnerId,
        totalAmount: data.totalAmount || 0,
        status: 'CONFIRMED',
        remarks: data.remarks,
      },
    });
  }

  async findAllOrders(where?: Prisma.OrderWhereInput): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOrderById(id: string): Promise<Order | null> {
    return this.prisma.order.findFirst({
      where: { id, deletedAt: null },
    });
  }

  // PROJECTS
  async createProject(data: CreateProjectDto): Promise<Project> {
    const projectNumber = data.projectNumber || `PRJ-${Date.now().toString().slice(-6)}`;
    return this.prisma.project.create({
      data: {
        projectNumber,
        orderId: data.orderId,
        quotationId: data.quotationId,
        customerId: data.customerId,
        capacityKw: data.capacityKw,
        projectManagerId: data.projectManagerId,
        epcVendorId: data.epcVendorId,
        installationVendorId: data.installationVendorId,
        surveyEngineerId: data.surveyEngineerId,
        stage: 'ORDER_CONFIRMED',
        status: 'IN_PROGRESS',
        remarks: data.remarks,
      },
    });
  }

  async findAllProjects(where?: Prisma.ProjectWhereInput): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findProjectById(id: string): Promise<Project | null> {
    return this.prisma.project.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  // PURCHASE ORDERS
  async createPurchaseOrder(data: CreatePurchaseOrderDto): Promise<PurchaseOrder> {
    const poNumber = data.poNumber || `PO-${Date.now().toString().slice(-6)}`;
    return this.prisma.purchaseOrder.create({
      data: {
        poNumber,
        projectId: data.projectId,
        vendorId: data.vendorId,
        vendorName: data.vendorName || 'Solar Equipment Vendor',
        totalAmount: data.totalAmount || 0,
        status: 'ISSUED',
        remarks: data.remarks,
      },
    });
  }

  async findAllPurchaseOrders(where?: Prisma.PurchaseOrderWhereInput): Promise<PurchaseOrder[]> {
    return this.prisma.purchaseOrder.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  // INVENTORY
  async findAllInventory(where?: Prisma.InventoryItemWhereInput): Promise<InventoryItem[]> {
    return this.prisma.inventoryItem.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  // MATERIAL DISPATCH
  async createMaterialDispatch(data: CreateMaterialDispatchDto): Promise<MaterialDispatch> {
    const dispatchNumber = data.dispatchNumber || `DISP-${Date.now().toString().slice(-6)}`;
    return this.prisma.materialDispatch.create({
      data: {
        dispatchNumber,
        projectId: data.projectId,
        vehicleNumber: data.vehicleNumber,
        driverName: data.driverName,
        driverPhone: data.driverPhone,
        status: 'DISPATCHED',
        remarks: data.remarks,
      },
    });
  }
}
