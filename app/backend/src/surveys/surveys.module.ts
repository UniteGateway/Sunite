import { Module } from '@nestjs/common';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { SurveysRepository } from './surveys.repository';

@Module({
  controllers: [SurveysController],
  providers: [SurveysService, SurveysRepository],
  exports: [SurveysService, SurveysRepository],
})
export class SurveysModule {}
