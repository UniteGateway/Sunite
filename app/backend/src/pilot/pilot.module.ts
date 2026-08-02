import { Module } from '@nestjs/common';
import { PilotService } from './pilot.service';
import { PilotController } from './pilot.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PilotController],
  providers: [PilotService],
  exports: [PilotService],
})
export class PilotModule {}
