import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsObject, IsBoolean } from 'class-validator';

export class RegisterDeviceDto {
  @ApiProperty({ example: 'DEV-ANDROID-99001122', description: 'Unique Android Device Identifier' })
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiPropertyOptional({ example: 'usr-sub-1001', description: 'User ID associated with device' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ example: 'Samsung Galaxy Tab S9 Ultra', description: 'Device Hardware Model' })
  @IsString()
  @IsOptional()
  deviceModel?: string;

  @ApiPropertyOptional({ example: 'Android 14 (API 34)', description: 'Android OS Version' })
  @IsString()
  @IsOptional()
  osVersion?: string;

  @ApiPropertyOptional({ example: 'v11.15.0', description: 'Sunite Mobile App Version' })
  @IsString()
  @IsOptional()
  appVersion?: string;

  @ApiPropertyOptional({ example: 'fcm_token_sample_xyz987654321', description: 'FCM Push Notification Token' })
  @IsString()
  @IsOptional()
  pushToken?: string;
}

export class StartSyncDto {
  @ApiProperty({ example: 'DEV-ANDROID-99001122', description: 'Registered Device ID' })
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiPropertyOptional({ example: 'FULL', default: 'INCREMENTAL', description: 'Sync Type (FULL, INCREMENTAL, BACKGROUND, MANUAL, REALTIME_PUSH)' })
  @IsString()
  @IsOptional()
  syncType?: string;
}

export class OfflineMutationItemDto {
  @ApiProperty({ example: 'Leads', description: 'Entity Name (Leads, Customers, Surveys, SolarDesigns, Projects, ServiceTickets, etc.)' })
  @IsString()
  @IsNotEmpty()
  entityName: string;

  @ApiProperty({ example: 'INSERT', description: 'Mutation Action (INSERT, UPDATE, DELETE)' })
  @IsString()
  @IsNotEmpty()
  action: string;

  @ApiProperty({ example: 'client-lead-uuid-101', description: 'Client-side UUID or entity ID' })
  @IsString()
  @IsNotEmpty()
  entityId: string;

  @ApiProperty({ description: 'Entity payload JSON object' })
  @IsObject()
  payload: Record<string, any>;

  @ApiPropertyOptional({ example: '2026-08-01T10:00:00.000Z', description: 'Timestamp when created on device offline' })
  @IsString()
  @IsOptional()
  clientTimestamp?: string;
}

export class FullSyncDto {
  @ApiProperty({ example: 'DEV-ANDROID-99001122', description: 'Device ID' })
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiPropertyOptional({ description: 'Array of offline queued mutations created while offline', type: [OfflineMutationItemDto] })
  @IsArray()
  @IsOptional()
  offlineQueue?: OfflineMutationItemDto[];
}

export class IncrementalSyncDto {
  @ApiProperty({ example: 'DEV-ANDROID-99001122', description: 'Device ID' })
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty({ example: '2026-08-01T00:00:00.000Z', description: 'ISO Timestamp of last successful sync' })
  @IsString()
  @IsNotEmpty()
  lastSyncedAt: string;

  @ApiPropertyOptional({ description: 'Offline mutations queued during disconnected state', type: [OfflineMutationItemDto] })
  @IsArray()
  @IsOptional()
  offlineQueue?: OfflineMutationItemDto[];
}

export class ResolveConflictDto {
  @ApiProperty({ example: 'cnf-log-uuid-1001', description: 'Conflict Log ID' })
  @IsString()
  @IsNotEmpty()
  conflictId: string;

  @ApiProperty({ example: 'SERVER_WINS', description: 'Resolution Strategy (SERVER_WINS, CLIENT_WINS, TIMESTAMP, MANUAL)' })
  @IsString()
  @IsNotEmpty()
  resolutionStrategy: string;

  @ApiPropertyOptional({ description: 'Merged payload if strategy is MANUAL' })
  @IsObject()
  @IsOptional()
  mergedData?: Record<string, any>;
}

export class UploadFileSyncDto {
  @ApiProperty({ example: 'DEV-ANDROID-99001122', description: 'Device ID' })
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty({ example: 'SITE_PHOTO', description: 'File Type (ELECTRICITY_BILL, DRONE_PHOTO, SITE_PHOTO, DIGITAL_SIGNATURE, PDF)' })
  @IsString()
  @IsNotEmpty()
  fileType: string;

  @ApiProperty({ example: 'site_survey_sanand_01.jpg', description: 'File Name' })
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @ApiProperty({ example: 'data:image/jpeg;base64,...', description: 'Base64 encoded file content or URL' })
  @IsString()
  @IsNotEmpty()
  fileContentBase64: string;
}

export class PushRegisterDto {
  @ApiProperty({ example: 'DEV-ANDROID-99001122', description: 'Device ID' })
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty({ example: 'fcm_token_sample_xyz987654321', description: 'FCM Push Registration Token' })
  @IsString()
  @IsNotEmpty()
  fcmToken: string;

  @ApiPropertyOptional({ example: 'usr-sub-1001', description: 'User ID' })
  @IsString()
  @IsOptional()
  userId?: string;
}
