import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDeviceDto, PushRegisterDto } from './dto/sync.dto';
import { SyncDeviceSession, SyncConflictLog, SyncNotification } from '@prisma/client';

@Injectable()
export class SyncRepository {
  constructor(private readonly prisma: PrismaService) {}

  // DEVICE SESSION MANAGEMENT
  async registerOrUpdateDevice(dto: RegisterDeviceDto): Promise<SyncDeviceSession> {
    const existing = await this.prisma.syncDeviceSession.findUnique({
      where: { deviceId: dto.deviceId },
    });

    if (existing) {
      return this.prisma.syncDeviceSession.update({
        where: { deviceId: dto.deviceId },
        data: {
          userId: dto.userId || existing.userId,
          deviceModel: dto.deviceModel || existing.deviceModel,
          osVersion: dto.osVersion || existing.osVersion,
          appVersion: dto.appVersion || existing.appVersion,
          pushToken: dto.pushToken || existing.pushToken,
          syncStatus: 'IDLE',
        },
      });
    }

    return this.prisma.syncDeviceSession.create({
      data: {
        deviceId: dto.deviceId,
        userId: dto.userId,
        deviceModel: dto.deviceModel || 'Android Smartphone',
        osVersion: dto.osVersion || 'Android 14',
        appVersion: dto.appVersion || 'v11.15.0',
        pushToken: dto.pushToken,
        syncStatus: 'IDLE',
      },
    });
  }

  async findDeviceSession(deviceId: string): Promise<SyncDeviceSession | null> {
    return this.prisma.syncDeviceSession.findUnique({
      where: { deviceId },
    });
  }

  async updateDeviceSyncStatus(deviceId: string, syncStatus: string, lastSyncedAt?: Date): Promise<SyncDeviceSession> {
    return this.prisma.syncDeviceSession.update({
      where: { deviceId },
      data: {
        syncStatus,
        ...(lastSyncedAt ? { lastSyncedAt } : {}),
      },
    });
  }

  // CONFLICT LOGS
  async createConflictLog(data: {
    deviceId: string;
    entityName: string;
    entityId: string;
    clientData: any;
    serverData: any;
    resolutionStrategy: string;
  }): Promise<SyncConflictLog> {
    return this.prisma.syncConflictLog.create({
      data: {
        deviceId: data.deviceId,
        entityName: data.entityName,
        entityId: data.entityId,
        clientData: JSON.stringify(data.clientData),
        serverData: JSON.stringify(data.serverData),
        resolutionStrategy: data.resolutionStrategy,
        resolved: false,
      },
    });
  }

  async findConflictLogById(id: string): Promise<SyncConflictLog | null> {
    return this.prisma.syncConflictLog.findUnique({
      where: { id },
    });
  }

  async resolveConflictLog(id: string, strategy: string, resolvedData: any): Promise<SyncConflictLog> {
    return this.prisma.syncConflictLog.update({
      where: { id },
      data: {
        resolutionStrategy: strategy,
        resolved: true,
        resolvedData: JSON.stringify(resolvedData),
      },
    });
  }

  // NOTIFICATIONS
  async createNotification(data: {
    userId?: string;
    title: string;
    body: string;
    category?: string;
    payload?: any;
  }): Promise<SyncNotification> {
    return this.prisma.syncNotification.create({
      data: {
        userId: data.userId,
        title: data.title,
        body: data.body,
        category: data.category || 'GENERAL',
        payload: data.payload ? JSON.stringify(data.payload) : null,
      },
    });
  }

  async findNotifications(userId?: string): Promise<SyncNotification[]> {
    return this.prisma.syncNotification.findMany({
      where: userId ? { userId } : {},
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  // FCM REGISTER
  async registerPushToken(dto: PushRegisterDto): Promise<SyncDeviceSession> {
    return this.prisma.syncDeviceSession.upsert({
      where: { deviceId: dto.deviceId },
      update: {
        pushToken: dto.fcmToken,
        ...(dto.userId ? { userId: dto.userId } : {}),
      },
      create: {
        deviceId: dto.deviceId,
        pushToken: dto.fcmToken,
        userId: dto.userId,
        syncStatus: 'IDLE',
      },
    });
  }
}
