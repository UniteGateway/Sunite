import { IsString, IsNotEmpty, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateIncidentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  severity: string; // SEV-1, SEV-2, SEV-3, SEV-4

  @IsString()
  @IsNotEmpty()
  category: string; // API, DATABASE, REDIS, KUBERNETES, SCADA, SECURITY

  @IsString()
  @IsNotEmpty()
  assignedLead: string;

  @IsString()
  @IsNotEmpty()
  impactedTenants: string;

  @IsString()
  @IsOptional()
  rootCause?: string;
}

export class UpdateIncidentDto {
  @IsString()
  @IsOptional()
  status?: string; // OPEN, INVESTIGATING, MITIGATED, RESOLVED

  @IsString()
  @IsOptional()
  assignedLead?: string;

  @IsString()
  @IsOptional()
  rootCause?: string;

  @IsString()
  @IsOptional()
  resolutionNotes?: string;
}

export class SecurityAlertQueryDto {
  @IsString()
  @IsOptional()
  threatLevel?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
