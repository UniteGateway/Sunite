import { Module } from '@nestjs/common';
import { AiScadaController } from './ai-scada.controller';
import { AiScadaService } from './ai-scada.service';
import { AiScadaRepository } from './ai-scada.repository';

@Module({
  controllers: [AiScadaController],
  providers: [AiScadaService, AiScadaRepository],
  exports: [AiScadaService, AiScadaRepository],
})
export class AiScadaModule {}
