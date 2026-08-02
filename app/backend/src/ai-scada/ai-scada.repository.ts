import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScadaPlantDto, CreateScadaDeviceDto } from './dto/scada.dto';
import {
  ScadaPlant,
  ScadaDevice,
  ScadaTelemetry,
  ScadaAlarm,
  AiInteractionLog,
  Prisma,
} from '@prisma/client';

@Injectable()
export class AiScadaRepository {
  constructor(private readonly prisma: PrismaService) {}

  // SCADA PLANTS
  async createScadaPlant(data: CreateScadaPlantDto): Promise<ScadaPlant> {
    const plantCode = data.plantCode || `SCD-PLT-${Date.now().toString().slice(-6)}`;
    return this.prisma.scadaPlant.create({
      data: {
        plantCode,
        plantName: data.plantName,
        capacityKw: data.capacityKw,
        location: data.location || 'Gujarat, India',
        gridVoltage: data.gridVoltage || 415.0,
        status: 'ONLINE',
        remarks: data.remarks,
      },
    });
  }

  async findAllScadaPlants(where?: Prisma.ScadaPlantWhereInput): Promise<ScadaPlant[]> {
    return this.prisma.scadaPlant.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findScadaPlantById(id: string): Promise<ScadaPlant | null> {
    return this.prisma.scadaPlant.findFirst({
      where: { id, deletedAt: null },
    });
  }

  // SCADA DEVICES
  async createScadaDevice(data: CreateScadaDeviceDto): Promise<ScadaDevice> {
    const deviceCode = data.deviceCode || `SCD-DEV-${Date.now().toString().slice(-6)}`;
    return this.prisma.scadaDevice.create({
      data: {
        deviceCode,
        scadaPlantId: data.scadaPlantId,
        deviceType: data.deviceType || 'INVERTER',
        model: data.model || 'Generic Solar Inverter 100kW',
        serialNumber: data.serialNumber || `SN-${Date.now()}`,
        ipAddress: data.ipAddress || '192.168.1.100',
        protocol: data.protocol || 'MODBUS_TCP',
        status: 'ACTIVE',
      },
    });
  }

  async findAllScadaDevices(where?: Prisma.ScadaDeviceWhereInput): Promise<ScadaDevice[]> {
    return this.prisma.scadaDevice.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  // TELEMETRY & ALARMS
  async createTelemetry(data: Partial<ScadaTelemetry>): Promise<ScadaTelemetry> {
    return this.prisma.scadaTelemetry.create({
      data: {
        scadaPlantId: data.scadaPlantId,
        scadaDeviceId: data.scadaDeviceId,
        activePowerKw: data.activePowerKw || 82.5,
        dcVoltage: data.dcVoltage || 680.0,
        dcCurrent: data.dcCurrent || 122.0,
        gridFrequency: data.gridFrequency || 50.02,
        performanceRatio: data.performanceRatio || 83.1,
        cufPct: data.cufPct || 20.2,
        irradianceWm2: data.irradianceWm2 || 880.0,
        ambientTempC: data.ambientTempC || 33.5,
      },
    });
  }

  async findAllTelemetries(scadaPlantId?: string): Promise<ScadaTelemetry[]> {
    return this.prisma.scadaTelemetry.findMany({
      where: scadaPlantId ? { scadaPlantId } : {},
      take: 50,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllAlarms(scadaPlantId?: string, status?: string): Promise<ScadaAlarm[]> {
    const where: any = {};
    if (scadaPlantId) where.scadaPlantId = scadaPlantId;
    if (status) where.status = status;
    return this.prisma.scadaAlarm.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  // AI LOGS
  async createAiLog(data: Partial<AiInteractionLog>): Promise<AiInteractionLog> {
    return this.prisma.aiInteractionLog.create({
      data: {
        interactionType: data.interactionType || 'CHAT',
        provider: data.provider || 'GEMINI',
        promptText: data.promptText,
        responseText: data.responseText,
        confidenceScore: data.confidenceScore || 0.95,
      },
    });
  }
}
