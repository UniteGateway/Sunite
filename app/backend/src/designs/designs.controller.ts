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
import { DesignsService } from './designs.service';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { CalculateDesignDto } from './dto/calculate-design.dto';

@ApiTags('Solar Design, Engineering & BOQ')
@Controller('designs')
export class DesignsController {
  constructor(private readonly designsService: DesignsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Solar Design entry' })
  @ApiResponse({ status: 201, description: 'Design entry created successfully.' })
  @ApiResponse({ status: 409, description: 'Design number conflict.' })
  create(@Body() createDesignDto: CreateDesignDto) {
    return this.designsService.create(createDesignDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of Solar Designs with filters' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'surveyId', required: false, type: String })
  findAll(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('surveyId') surveyId?: string,
  ) {
    return this.designsService.findAll({ search, status, surveyId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Solar Design details by ID' })
  findOne(@Param('id') id: string) {
    return this.designsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Solar Design parameters' })
  update(@Param('id') id: string, @Body() updateDesignDto: UpdateDesignDto) {
    return this.designsService.update(id, updateDesignDto);
  }

  @Post(':id/calculate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Calculate Solar Capacity, BOQ, Generation & Financial ROI' })
  calculate(@Param('id') id: string, @Body() dto: CalculateDesignDto) {
    return this.designsService.calculate(id, dto);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve Solar Design' })
  approve(@Param('id') id: string, @Body('remarks') remarks?: string) {
    return this.designsService.approve(id, remarks);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject Solar Design' })
  reject(@Param('id') id: string, @Body('remarks') remarks?: string) {
    return this.designsService.reject(id, remarks);
  }

  @Get(':id/generation')
  @ApiOperation({ summary: 'Get 12-month solar energy generation estimate report' })
  getGeneration(@Param('id') id: string) {
    return this.designsService.getGeneration(id);
  }

  @Get(':id/boq')
  @ApiOperation({ summary: 'Get Engineering Bill of Quantities (BOQ)' })
  getBoq(@Param('id') id: string) {
    return this.designsService.getBoq(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete / cancel a Solar Design' })
  remove(@Param('id') id: string) {
    return this.designsService.remove(id);
  }
}
