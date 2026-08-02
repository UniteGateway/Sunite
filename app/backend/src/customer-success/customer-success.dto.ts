import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, IsBoolean } from 'class-validator';

export class OnboardCustomerDto {
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsOptional()
  csmName?: string;

  @IsString()
  @IsOptional()
  planType?: string;
}

export class GoLiveSignOffDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  signedBy: string;

  @IsString()
  @IsOptional()
  remarks?: string;
}

export class CreateSupportTicketDto {
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  priority: string; // LOW, MEDIUM, HIGH, CRITICAL

  @IsString()
  @IsNotEmpty()
  category: string; // CRM, ERP, SCADA, INVOICING, HARDWARE

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateSupportTicketDto {
  @IsString()
  @IsOptional()
  status?: string; // OPEN, IN_PROGRESS, RESOLVED, CLOSED

  @IsString()
  @IsOptional()
  resolutionNotes?: string;

  @IsString()
  @IsOptional()
  assignedAgent?: string;
}

export class EnrollTrainingDto {
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  courseCode: string;
}

export class SubmitProductFeedbackDto {
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string; // FEATURE_REQUEST, BUG_REPORT, ENHANCEMENT

  @IsString()
  @IsNotEmpty()
  description: string;
}
