import { Module } from '@nestjs/common';
import { ExecutionController } from './execution.controller';
import { ExecutionService } from './execution.service';
import { ExecutionRepository } from './execution.repository';

@Module({
  controllers: [ExecutionController],
  providers: [ExecutionService, ExecutionRepository],
  exports: [ExecutionService, ExecutionRepository],
})
export class ExecutionModule {}
