import { Module } from '@nestjs/common';
import { ServiceManagementController } from './service-management.controller';
import { ServiceManagementService } from './service-management.service';
import { ServiceManagementRepository } from './service-management.repository';

@Module({
  controllers: [ServiceManagementController],
  providers: [ServiceManagementService, ServiceManagementRepository],
  exports: [ServiceManagementService, ServiceManagementRepository],
})
export class ServiceManagementModule {}
