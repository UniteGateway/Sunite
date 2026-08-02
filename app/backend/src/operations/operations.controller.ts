import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateIncidentDto, UpdateIncidentDto } from './operations.dto';

@Controller()
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  // 1. Global Operations Dashboard
  @Get('api/v1/operations/dashboard')
  async getDashboard() {
    return this.operationsService.getDashboard();
  }

  // 2. Health Observability
  @Get('api/v1/operations/health')
  async getHealth() {
    return this.operationsService.getHealth();
  }

  // 3. System Incidents List
  @Get('api/v1/operations/incidents')
  async getIncidents() {
    return this.operationsService.getIncidents();
  }

  // 4. Create Incident
  @Post('api/v1/operations/incidents')
  async createIncident(@Body() dto: CreateIncidentDto) {
    return this.operationsService.createIncident(dto);
  }

  // 5. Update Incident
  @Put('api/v1/operations/incidents/:id')
  async updateIncident(@Param('id') id: string, @Body() dto: UpdateIncidentDto) {
    return this.operationsService.updateIncident(id, dto);
  }

  // 6. Security Operations (SOC)
  @Get('api/v1/operations/security')
  async getSecurity() {
    return this.operationsService.getSecurity();
  }

  // 7. Backup & DR Console
  @Get('api/v1/operations/backups')
  async getBackups() {
    return this.operationsService.getBackups();
  }

  // 8. Capacity Planning & Nodes
  @Get('api/v1/operations/capacity')
  async getCapacity() {
    return this.operationsService.getCapacity();
  }

  // 9. SLA Performance & Compliance
  @Get('api/v1/operations/sla')
  async getSla() {
    return this.operationsService.getSla();
  }
}
