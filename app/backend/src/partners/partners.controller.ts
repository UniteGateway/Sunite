import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { AssignRegionDto } from './dto/assign-region.dto';
import { EntityStatus } from '@prisma/client';

@ApiTags('Partner Network & EPC Management')
@Controller()
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post('partners')
  @ApiOperation({ summary: 'Register a new Partner / EPC Contractor' })
  @ApiResponse({ status: 201, description: 'Partner registered.' })
  @ApiResponse({ status: 409, description: 'Partner code conflict.' })
  create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnersService.create(createPartnerDto);
  }

  @Get('partners')
  @ApiOperation({ summary: 'Get list of Partners with search & partnerType filters' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'partnerType', required: false, type: String })
  @ApiQuery({ name: 'organizationId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: EntityStatus })
  findAll(
    @Query('search') search?: string,
    @Query('partnerType') partnerType?: string,
    @Query('organizationId') organizationId?: string,
    @Query('status') status?: EntityStatus,
  ) {
    return this.partnersService.findAll({ search, partnerType, organizationId, status });
  }

  @Get('epc')
  @ApiOperation({ summary: 'Get list of active EPC Contractors' })
  findEpcPartners() {
    return this.partnersService.findEpcPartners();
  }

  @Get('vendors')
  @ApiOperation({ summary: 'Get list of Installation Vendors' })
  findVendors() {
    return this.partnersService.findVendors();
  }

  @Get('survey-engineers')
  @ApiOperation({ summary: 'Get list of active Survey Engineers' })
  findSurveyEngineers() {
    return this.partnersService.findSurveyEngineers();
  }

  @Get('partners/:id')
  @ApiOperation({ summary: 'Get Partner profile by ID' })
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(id);
  }

  @Put('partners/:id')
  @ApiOperation({ summary: 'Update Partner details' })
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnersService.update(id, updatePartnerDto);
  }

  @Post('partners/:id/approve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve KYC & activate Partner' })
  approve(@Param('id') id: string) {
    return this.partnersService.approve(id);
  }

  @Post('partners/:id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject Partner application' })
  reject(@Param('id') id: string) {
    return this.partnersService.reject(id);
  }

  @Post('partners/:id/suspend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Suspend Partner account' })
  suspend(@Param('id') id: string) {
    return this.partnersService.suspend(id);
  }

  @Post('partners/:id/assign-region')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign geographical coverage region to Partner' })
  assignRegion(@Param('id') id: string, @Body() dto: AssignRegionDto) {
    return this.partnersService.assignRegion(id, dto);
  }

  @Delete('partners/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a Partner' })
  remove(@Param('id') id: string) {
    return this.partnersService.remove(id);
  }
}
