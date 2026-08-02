import { Module } from '@nestjs/common';
import { CustomerSuccessService } from './customer-success.service';
import { CustomerSuccessController } from './customer-success.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerSuccessController],
  providers: [CustomerSuccessService],
  exports: [CustomerSuccessService],
})
export class CustomerSuccessModule {}
