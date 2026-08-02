import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AiScadaService } from './ai-scada.service';
import {
  AiChatDto,
  ElectricityBillOcrDto,
  GstOcrDto,
  RoofAnalysisDto,
  DesignRecommendationDto,
  PricingRecommendationDto,
  ProjectRiskDto,
  ServiceDiagnosisDto,
} from './dto/ai.dto';
import { CreateScadaPlantDto, CreateScadaDeviceDto } from './dto/scada.dto';

@ApiTags('AI Engine, OCR, SCADA Telemetry, Predictive Analytics & Executive Intelligence')
@Controller()
export class AiScadaController {
  constructor(private readonly aiScadaService: AiScadaService) {}

  // AI CHAT & COPILOTS
  @Post('ai/chat')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Enterprise AI Assistant & Multi-LLM Copilot Chat' })
  processAiChat(@Body() dto: AiChatDto) {
    return this.aiScadaService.processAiChat(dto);
  }

  // OCR ENGINE
  @Post('ai/ocr/electricity-bill')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Electricity Discom Bill OCR & Automatic Sanctioned Load Extraction' })
  processElectricityBillOcr(@Body() dto: ElectricityBillOcrDto) {
    return this.aiScadaService.processElectricityBillOcr(dto);
  }

  @Post('ai/ocr/gst')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'GST Certificate OCR & Legal Taxpayer Verification' })
  processGstOcr(@Body() dto: GstOcrDto) {
    return this.aiScadaService.processGstOcr(dto);
  }

  // AI ENGINEERING & COPILOTS
  @Post('ai/roof-analysis')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'AI Satellite Roof Area, Azimuth & Feasibility Analysis' })
  analyzeRoof(@Body() dto: RoofAnalysisDto) {
    return this.aiScadaService.analyzeRoof(dto);
  }

  @Post('ai/design-recommendation')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'AI Solar String, Panel & Inverter Design Recommendation' })
  generateDesignRecommendation(@Body() dto: DesignRecommendationDto) {
    return this.aiScadaService.generateDesignRecommendation(dto);
  }

  @Post('ai/pricing-recommendation')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'AI Dynamic Pricing, Commercial Margin & ROI Optimization' })
  generatePricingRecommendation(@Body() dto: PricingRecommendationDto) {
    return this.aiScadaService.generatePricingRecommendation(dto);
  }

  @Post('ai/project-risk')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'AI Project Manager Delay & Completion Risk Forecast' })
  predictProjectRisk(@Body() dto: ProjectRiskDto) {
    return this.aiScadaService.predictProjectRisk(dto);
  }

  @Post('ai/service-diagnosis')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'AI Service Engineer Inverter & System Fault Diagnosis' })
  diagnoseServiceFault(@Body() dto: ServiceDiagnosisDto) {
    return this.aiScadaService.diagnoseServiceFault(dto);
  }

  // SCADA & IOT
  @Post('scada/plants')
  @ApiOperation({ summary: 'Register New SCADA Solar Power Plant' })
  createScadaPlant(@Body() dto: CreateScadaPlantDto) {
    return this.aiScadaService.createScadaPlant(dto);
  }

  @Get('scada/plants')
  @ApiOperation({ summary: 'Get List of SCADA Monitored Solar Plants' })
  findAllScadaPlants() {
    return this.aiScadaService.findAllScadaPlants();
  }

  @Post('scada/devices')
  @ApiOperation({ summary: 'Register SCADA Modbus / IoT Telemetry Device' })
  createScadaDevice(@Body() dto: CreateScadaDeviceDto) {
    return this.aiScadaService.createScadaDevice(dto);
  }

  @Get('scada/devices')
  @ApiOperation({ summary: 'Get SCADA IoT Telemetry Devices' })
  @ApiQuery({ name: 'scadaPlantId', required: false, type: String })
  findAllScadaDevices(@Query('scadaPlantId') scadaPlantId?: string) {
    return this.aiScadaService.findAllScadaDevices(scadaPlantId);
  }

  @Get('scada/telemetry')
  @ApiOperation({ summary: 'Get Real-Time SCADA Plant Telemetry Readings (Voltage, Power, PR, Irradiance)' })
  @ApiQuery({ name: 'scadaPlantId', required: false, type: String })
  getTelemetry(@Query('scadaPlantId') scadaPlantId?: string) {
    return this.aiScadaService.getTelemetry(scadaPlantId);
  }

  @Get('scada/alarms')
  @ApiOperation({ summary: 'Get Active SCADA Alarms & System Fault Events' })
  @ApiQuery({ name: 'scadaPlantId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  getAlarms(
    @Query('scadaPlantId') scadaPlantId?: string,
    @Query('status') status?: string,
  ) {
    return this.aiScadaService.getAlarms(scadaPlantId, status);
  }

  @Get('scada/analytics')
  @ApiOperation({ summary: 'Get Plant Performance Analytics, PR & CUF Summary' })
  @ApiQuery({ name: 'scadaPlantId', required: false, type: String })
  getScadaAnalytics(@Query('scadaPlantId') scadaPlantId?: string) {
    return this.aiScadaService.getScadaAnalytics(scadaPlantId);
  }

  // PREDICTIVE MAINTENANCE
  @Get('predictive-maintenance')
  @ApiOperation({ summary: 'Get AI Predictive Maintenance Failure Probabilities & Health Scores' })
  getPredictiveMaintenance() {
    return this.aiScadaService.getPredictiveMaintenance();
  }

  // CARBON ANALYTICS
  @Get('carbon-analytics')
  @ApiOperation({ summary: 'Get Enterprise Carbon Offsets, CO₂ Saved & ESG Analytics' })
  getCarbonAnalytics() {
    return this.aiScadaService.getCarbonAnalytics();
  }

  // EXECUTIVE AI DASHBOARD
  @Get('executive-dashboard')
  @ApiOperation({ summary: 'Get CEO Executive AI Dashboard & Enterprise Business Health' })
  getExecutiveDashboard() {
    return this.aiScadaService.getExecutiveDashboard();
  }
}
