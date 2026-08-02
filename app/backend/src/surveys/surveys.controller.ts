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
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { AssignSurveyDto } from './dto/assign-survey.dto';
import { UploadMediaDto } from './dto/upload-media.dto';

@ApiTags('Site Survey & Technical Engineering')
@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  @ApiOperation({ summary: 'Schedule a new Site Survey' })
  @ApiResponse({ status: 201, description: 'Survey scheduled successfully.' })
  @ApiResponse({ status: 409, description: 'Survey number conflict.' })
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveysService.create(createSurveyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of Site Surveys with filters' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'leadId', required: false, type: String })
  @ApiQuery({ name: 'engineerId', required: false, type: String })
  findAll(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('leadId') leadId?: string,
    @Query('engineerId') engineerId?: string,
  ) {
    return this.surveysService.findAll({ search, status, leadId, engineerId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Survey details by ID' })
  findOne(@Param('id') id: string) {
    return this.surveysService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Survey technical details & measurements' })
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveysService.update(id, updateSurveyDto);
  }

  @Post(':id/assign')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign Survey to a Survey Engineer' })
  assign(@Param('id') id: string, @Body() dto: AssignSurveyDto) {
    return this.surveysService.assign(id, dto.engineerId);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Technical Review - Approve Survey Feasibility' })
  approve(@Param('id') id: string, @Body('remarks') remarks?: string) {
    return this.surveysService.approve(id, remarks);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Technical Review - Reject Survey Feasibility' })
  reject(@Param('id') id: string, @Body('remarks') remarks?: string) {
    return this.surveysService.reject(id, remarks);
  }

  @Post(':id/upload-photo')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload Roof / Site Photos' })
  uploadPhoto(@Param('id') id: string, @Body() dto: UploadMediaDto) {
    return this.surveysService.uploadPhoto(id, dto);
  }

  @Post(':id/upload-document')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload Electricity Bill / CAD Drawings' })
  uploadDocument(@Param('id') id: string, @Body() dto: UploadMediaDto) {
    return this.surveysService.uploadDocument(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete / cancel a Survey' })
  remove(@Param('id') id: string) {
    return this.surveysService.remove(id);
  }
}
