import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { SyncRepository } from './sync.repository';
import { SyncGateway } from './sync.gateway';

@Module({
  controllers: [SyncController],
  providers: [SyncService, SyncRepository, SyncGateway],
  exports: [SyncService, SyncRepository, SyncGateway],
})
export class SyncModule {}
