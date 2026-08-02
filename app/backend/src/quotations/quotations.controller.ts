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
import { QuotationsService } from './quotations.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { ApproveQuotationDto } from './dto/approve-quotation.dto';
import { SendQuotationDto } from './dto/send-quotation.dto';

@ApiTags('Professional Quotations & Proposal Engine')
@Controller('quotations')
export class QuotationsController {
  constructor(private readonly quotationsService: QuotationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Solar Quotation Proposal' })
  @ApiResponse({ status: 201, description: 'Quotation proposal created successfully.' })
  @ApiResponse({ status: 409, description: 'Quotation number conflict.' })
  create(@Body() createDto: CreateQuotationDto) {
    return this.quotationsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of Solar Quotations with filters' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'customerId', required: false, type: String })
  @ApiQuery({ name: 'leadId', required: false, type: String })
  @ApiQuery({ name: 'partnerId', required: false, type: String })
  @ApiQuery({ name: 'salesExecutiveId', required: false, type: String })
  findAll(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('customerId') customerId?: string,
    @Query('leadId') leadId?: string,
    @Query('partnerId') partnerId?: string,
    @Query('salesExecutiveId') salesExecutiveId?: string,
  ) {
    return this.quotationsService.findAll({ search, status, customerId, leadId, partnerId, salesExecutiveId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Solar Quotation details by ID' })
  findOne(@Param('id') id: string) {
    return this.quotationsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Solar Quotation parameters' })
  update(@Param('id') id: string, @Body() updateDto: UpdateQuotationDto) {
    return this.quotationsService.update(id, updateDto);
  }

  @Post(':id/generate-pdf')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate Enterprise PDF Proposal with QR & Digital Signatures' })
  generatePdf(@Param('id') id: string) {
    return this.quotationsService.generatePdf(id);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve Quotation Workflow Stage' })
  approve(@Param('id') id: string, @Body() dto: ApproveQuotationDto) {
    return this.quotationsService.approve(id, dto);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject Quotation / Request Revision' })
  reject(@Param('id') id: string, @Body('remarks') remarks?: string) {
    return this.quotationsService.reject(id, remarks);
  }

  @Post(':id/clone')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Clone & Create New Version Revision of Quotation' })
  clone(@Param('id') id: string) {
    return this.quotationsService.clone(id);
  }

  @Post(':id/send-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send Proposal PDF via Email' })
  sendEmail(@Param('id') id: string, @Body() dto: SendQuotationDto) {
    return this.quotationsService.sendEmail(id, dto);
  }

  @Post(':id/send-whatsapp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send Proposal PDF Link via WhatsApp' })
  sendWhatsApp(@Param('id') id: string, @Body() dto: SendQuotationDto) {
    return this.quotationsService.sendWhatsApp(id, dto);
  }

  @Post(':id/customer-accept')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Record Digital Customer Acceptance' })
  customerAccept(@Param('id') id: string, @Body('remarks') remarks?: string) {
    return this.quotationsService.customerAccept(id, remarks);
  }

  @Post(':id/customer-reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Record Customer Rejection / Decline' })
  customerReject(@Param('id') id: string, @Body('remarks') remarks?: string) {
    return this.quotationsService.customerReject(id, remarks);
  }

  @Get(':id/versions')
  @ApiOperation({ summary: 'Get full Revision History / Versions of a Quotation' })
  getVersions(@Param('id') id: string) {
    return this.quotationsService.getVersions(id);
  }

  @Get(':id/pdf')
  @ApiOperation({ summary: 'Get Generated PDF Document & QR Verification Link' })
  getPdf(@Param('id') id: string) {
    return this.quotationsService.getPdf(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete / cancel a Quotation' })
  remove(@Param('id') id: string) {
    return this.quotationsService.remove(id);
  }
}
