import { Module } from '@nestjs/common';
import { DesignsController } from './designs.controller';
import { DesignsService } from './designs.service';
import { DesignsRepository } from './designs.repository';

@Module({
  controllers: [DesignsController],
  providers: [DesignsService, DesignsRepository],
  exports: [DesignsService, DesignsRepository],
})
export class DesignsModule {}
