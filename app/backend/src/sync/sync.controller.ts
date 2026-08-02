import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SyncService } from './sync.service';
import {
  RegisterDeviceDto,
  StartSyncDto,
  FullSyncDto,
  IncrementalSyncDto,
  ResolveConflictDto,
  UploadFileSyncDto,
  PushRegisterDto,
} from './dto/sync.dto';

@ApiTags('Mobile Synchronization, Offline Engine, API Gateway & Real-Time Sync')
@Controller()
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('sync/register-device')
  @ApiOperation({ summary: 'Register Mobile Android Device & Initialize Sync Session' })
  registerDevice(@Body() dto: RegisterDeviceDto) {
    return this.syncService.registerDevice(dto);
  }

  @Post('sync/start')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Start Mobile Synchronization Engine Session' })
  startSync(@Body() dto: StartSyncDto) {
    return this.syncService.startSync(dto);
  }

  @Post('sync/full')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Execute Full Dataset Synchronization for Offline Room DB Initialization' })
  executeFullSync(@Body() dto: FullSyncDto) {
    return this.syncService.executeFullSync(dto);
  }

  @Post('sync/incremental')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Execute Incremental Delta Sync & Process Offline Queued Mutations' })
  executeIncrementalSync(@Body() dto: IncrementalSyncDto) {
    return this.syncService.executeIncrementalSync(dto);
  }

  @Get('sync/status')
  @ApiOperation({ summary: 'Get Mobile Device Sync Status & Last Sync Timestamp' })
  @ApiQuery({ name: 'deviceId', required: true, type: String })
  getSyncStatus(@Query('deviceId') deviceId: string) {
    return this.syncService.getSyncStatus(deviceId);
  }

  @Post('sync/conflicts/resolve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resolve Entity Conflict (Server Wins, Client Wins, Manual Merge)' })
  resolveConflict(@Body() dto: ResolveConflictDto) {
    return this.syncService.resolveConflict(dto);
  }

  @Post('sync/upload-file')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Offline File & Document Upload Sync (Photos, Bills, Signatures, PDFs)' })
  uploadFile(@Body() dto: UploadFileSyncDto) {
    return this.syncService.uploadFile(dto);
  }

  @Get('notifications')
  @ApiOperation({ summary: 'Get Push & App Sync Notifications' })
  @ApiQuery({ name: 'userId', required: false, type: String })
  getNotifications(@Query('userId') userId?: string) {
    return this.syncService.getNotifications(userId);
  }

  @Post('push/register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register Firebase Cloud Messaging (FCM) Push Token' })
  registerPushToken(@Body() dto: PushRegisterDto) {
    return this.syncService.registerPushToken(dto);
  }
}
