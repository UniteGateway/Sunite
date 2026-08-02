import { Test, TestingModule } from '@nestjs/testing';
import { SyncService } from './sync.service';
import { SyncRepository } from './sync.repository';
import { SyncGateway } from './sync.gateway';

describe('SyncService', () => {
  let service: SyncService;

  const mockRepository = {
    registerOrUpdateDevice: jest.fn().mockImplementation((dto) =>
      Promise.resolve({ id: 'sess-1', ...dto, syncStatus: 'IDLE' }),
    ),
    findDeviceSession: jest.fn().mockImplementation((deviceId) => {
      if (deviceId === 'DEV-9999') return Promise.resolve(null);
      return Promise.resolve({
        id: 'sess-1',
        deviceId,
        userId: 'usr-101',
        syncStatus: 'IDLE',
        appVersion: 'v11.15.0',
        pushToken: 'sample_token',
        lastSyncedAt: new Date(),
      });
    }),
    updateDeviceSyncStatus: jest.fn().mockResolvedValue({ id: 'sess-1', syncStatus: 'SUCCESS' }),
    createConflictLog: jest.fn().mockImplementation((data) => Promise.resolve({ id: 'cnf-1', ...data })),
    findConflictLogById: jest.fn().mockResolvedValue({
      id: 'cnf-1',
      serverData: JSON.stringify({ name: 'Server Version' }),
      clientData: JSON.stringify({ name: 'Client Version' }),
    }),
    resolveConflictLog: jest.fn().mockImplementation((id, strategy, data) =>
      Promise.resolve({ id, resolutionStrategy: strategy, resolved: true, resolvedData: JSON.stringify(data) }),
    ),
    findNotifications: jest.fn().mockResolvedValue([
      { id: 'ntf-1', title: 'Test Notification', body: 'Test Body', category: 'GENERAL', isRead: false },
    ]),
    registerPushToken: jest.fn().mockImplementation((dto) =>
      Promise.resolve({ id: 'sess-1', deviceId: dto.deviceId, pushToken: dto.fcmToken }),
    ),
  };

  const mockGateway = {
    broadcastEvent: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SyncService,
        { provide: SyncRepository, useValue: mockRepository },
        { provide: SyncGateway, useValue: mockGateway },
      ],
    }).compile();

    service = module.get<SyncService>(SyncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register mobile device', async () => {
    const res = await service.registerDevice({ deviceId: 'DEV-1001', deviceModel: 'Galaxy Tab' });
    expect(res.status).toBe('SUCCESS');
    expect(res.deviceSession.deviceId).toBe('DEV-1001');
  });

  it('should start sync session', async () => {
    const res = await service.startSync({ deviceId: 'DEV-1001', syncType: 'INCREMENTAL' });
    expect(res.status).toBe('IN_PROGRESS');
    expect(res.entitiesSupported.length).toBeGreaterThan(10);
  });

  it('should execute full sync', async () => {
    const res = await service.executeFullSync({ deviceId: 'DEV-1001' });
    expect(res.syncType).toBe('FULL_SYNC');
    expect(res.status).toBe('COMPLETED');
  });

  it('should execute incremental delta sync with conflict detection', async () => {
    const res = await service.executeIncrementalSync({
      deviceId: 'DEV-1001',
      lastSyncedAt: new Date().toISOString(),
      offlineQueue: [
        { entityName: 'Leads', action: 'UPDATE', entityId: 'conflict-lead-1', payload: { name: 'Client Lead' } },
        { entityName: 'Projects', action: 'UPDATE', entityId: 'prj-101', payload: { progressPct: 80 } },
      ],
    });

    expect(res.syncType).toBe('INCREMENTAL_DELTA_SYNC');
    expect(res.conflictsCount).toBe(1);
    expect(res.processedMutationsCount).toBe(1);
  });

  it('should resolve conflict with SERVER_WINS strategy', async () => {
    const res = await service.resolveConflict({ conflictId: 'cnf-1', resolutionStrategy: 'SERVER_WINS' });
    expect(res.status).toBe('RESOLVED');
    expect(res.resolvedData.name).toBe('Server Version');
  });

  it('should process offline file upload', async () => {
    const res = await service.uploadFile({
      deviceId: 'DEV-1001',
      fileType: 'SITE_PHOTO',
      fileName: 'site.jpg',
      fileContentBase64: 'data:image/jpeg;base64,sample',
    });
    expect(res.status).toBe('SUCCESS');
    expect(res.offlineFileSynced).toBe(true);
  });

  it('should register push notification FCM token', async () => {
    const res = await service.registerPushToken({ deviceId: 'DEV-1001', fcmToken: 'fcm_12345' });
    expect(res.status).toBe('SUCCESS');
    expect(res.fcmToken).toBe('fcm_12345');
  });
});
