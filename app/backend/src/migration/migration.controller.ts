import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { MigrationService, UploadFileDto, ValidateJobDto, ImportJobDto, RollbackJobDto } from './migration.service';

@Controller('api/v1/migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @Post('upload')
  async upload(@Body() dto: UploadFileDto) {
    return this.migrationService.uploadData(dto);
  }

  @Post('validate')
  async validate(@Body() dto: ValidateJobDto) {
    return this.migrationService.validateData(dto);
  }

  @Post('preview')
  async preview(@Body() body: { jobId: string }) {
    return this.migrationService.previewData(body.jobId);
  }

  @Post('import')
  async importData(@Body() dto: ImportJobDto) {
    return this.migrationService.importData(dto);
  }

  @Post('rollback')
  async rollback(@Body() dto: RollbackJobDto) {
    return this.migrationService.rollbackJob(dto);
  }

  @Get('jobs')
  async getJobs() {
    return this.migrationService.getJobs();
  }

  @Get('logs')
  async getLogs(@Query('jobId') jobId?: string) {
    return this.migrationService.getLogs(jobId);
  }
}
