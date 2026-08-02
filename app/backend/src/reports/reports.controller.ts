import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReportsService, CustomReportDto, ExportReportDto, ScheduleReportDto } from './reports.service';

@Controller('api/v1/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('dashboard')
  async getDashboard() {
    return this.reportsService.getExecutiveDashboard();
  }

  @Get('sales')
  async getSales() {
    return this.reportsService.getSalesAnalytics();
  }

  @Get('finance')
  async getFinance() {
    return this.reportsService.getFinanceAnalytics();
  }

  @Get('projects')
  async getProjects() {
    return this.reportsService.getProjectAnalytics();
  }

  @Get('scada')
  async getScada() {
    return this.reportsService.getScadaAnalytics();
  }

  @Get('service')
  async getService() {
    return this.reportsService.getServiceAnalytics();
  }

  @Get('carbon')
  async getCarbon() {
    return this.reportsService.getCarbonAnalytics();
  }

  @Post('custom')
  async executeCustom(@Body() dto: CustomReportDto) {
    return this.reportsService.executeCustomReport(dto);
  }

  @Get('custom')
  async getSavedReports() {
    return this.reportsService.getSavedReports();
  }

  @Post('export')
  async exportReport(@Body() dto: ExportReportDto) {
    return this.reportsService.exportReport(dto);
  }

  @Post('schedule')
  async scheduleReport(@Body() dto: ScheduleReportDto) {
    return this.reportsService.scheduleReport(dto);
  }

  @Get('schedule')
  async getScheduledReports() {
    return this.reportsService.getScheduledReports();
  }
}
