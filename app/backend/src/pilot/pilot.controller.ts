import { Controller, Get, Post, Body } from '@nestjs/common';
import { PilotService } from './pilot.service';
import { ProvisionPilotDataDto, RunGoLiveValidationDto, SimulateLoadTestDto } from './pilot.dto';

@Controller('api/v1/pilot')
export class PilotController {
  constructor(private readonly pilotService: PilotService) {}

  @Post('provision')
  async provisionPilotData(@Body() dto: ProvisionPilotDataDto) {
    return this.pilotService.provisionPilotData(dto);
  }

  @Post('validate-workflow')
  async validateGoLiveWorkflow(@Body() dto: RunGoLiveValidationDto) {
    return this.pilotService.validateGoLiveWorkflow(dto);
  }

  @Get('integrations')
  async verifyIntegrations() {
    return this.pilotService.verifyIntegrations();
  }

  @Post('performance-test')
  async runPerformanceTest(@Body() dto: SimulateLoadTestDto) {
    return this.pilotService.runPerformanceTest(dto);
  }

  @Get('security-audit')
  async verifySecurityAudit() {
    return this.pilotService.verifySecurityAudit();
  }

  @Get('backup-status')
  async verifyBackupStatus() {
    return this.pilotService.verifyBackupStatus();
  }

  @Get('health-dashboard')
  async getHealthDashboard() {
    return this.pilotService.getHealthDashboard();
  }
}
