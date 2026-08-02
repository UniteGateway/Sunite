import { Module } from '@nestjs/common';
import { DeveloperPlatformService } from './developer-platform.service';
import { DeveloperPlatformController } from './developer-platform.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DeveloperPlatformController],
  providers: [DeveloperPlatformService],
  exports: [DeveloperPlatformService],
})
export class DeveloperPlatformModule {}
