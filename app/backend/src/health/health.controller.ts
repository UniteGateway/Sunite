import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health Checks, System Status & Infrastructure Monitoring')
@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('health')
  @ApiOperation({ summary: 'Get Application Health Summary & Subsystem Status' })
  getHealth() {
    return this.healthService.getHealth();
  }

  @Get('readiness')
  @ApiOperation({ summary: 'Kubernetes Readiness Probe Endpoint' })
  getReadiness() {
    return this.healthService.getReadiness();
  }

  @Get('liveness')
  @ApiOperation({ summary: 'Kubernetes Liveness Probe Endpoint' })
  getLiveness() {
    return this.healthService.getLiveness();
  }

  @Get('system/status')
  @ApiOperation({ summary: 'Get System Metrics, Kubernetes Pod Health & Security Status' })
  getSystemStatus() {
    return this.healthService.getSystemStatus();
  }

  @Get('system/version')
  @ApiOperation({ summary: 'Get Enterprise Application Release Version & Build Information' })
  getSystemVersion() {
    return this.healthService.getSystemVersion();
  }
}
