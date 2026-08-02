import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, IsBoolean } from 'class-validator';

export class ProvisionPilotDataDto {
  @IsString()
  @IsNotEmpty()
  organizationName: string; // e.g. "Sunite CleanEnergy India Pvt Ltd"

  @IsNumber()
  @IsOptional()
  headquartersCount?: number; // 1 HQ

  @IsNumber()
  @IsOptional()
  branchOfficesCount?: number; // 3 Branches (West, South, North)

  @IsNumber()
  @IsOptional()
  userRolesCount?: number; // 10 Roles

  @IsNumber()
  @IsOptional()
  customersCount?: number; // 100 Customers

  @IsNumber()
  @IsOptional()
  partnersCount?: number; // 25 Partners

  @IsNumber()
  @IsOptional()
  projectsCount?: number; // 50 Projects
}

export class RunGoLiveValidationDto {
  @IsString()
  @IsOptional()
  tenantId?: string;

  @IsBoolean()
  @IsOptional()
  simulateErrors?: boolean;
}

export class SimulateLoadTestDto {
  @IsNumber()
  @IsNotEmpty()
  concurrentUsers: number; // 100, 500, 1000, or 5000

  @IsNumber()
  @IsOptional()
  durationSeconds?: number;
}
