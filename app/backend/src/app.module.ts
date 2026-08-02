import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { BranchesModule } from './branches/branches.module';
import { DepartmentsModule } from './departments/departments.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { LeadsModule } from './leads/leads.module';
import { ActivitiesModule } from './activities/activities.module';
import { PartnersModule } from './partners/partners.module';
import { SurveysModule } from './surveys/surveys.module';
import { DesignsModule } from './designs/designs.module';
import { PricingModule } from './pricing/pricing.module';
import { QuotationsModule } from './quotations/quotations.module';
import { ExecutionModule } from './execution/execution.module';
import { FinanceModule } from './finance/finance.module';
import { ServiceManagementModule } from './service-management/service-management.module';
import { AiScadaModule } from './ai-scada/ai-scada.module';
import { SyncModule } from './sync/sync.module';
import { HealthModule } from './health/health.module';
import { MigrationModule } from './migration/migration.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { ReportsModule } from './reports/reports.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { CustomerPortalModule } from './customer-portal/customer-portal.module';
import { SaasModule } from './saas/saas.module';
import { PilotModule } from './pilot/pilot.module';
import { CustomerSuccessModule } from './customer-success/customer-success.module';
import { OperationsModule } from './operations/operations.module';
import { DeveloperPlatformModule } from './developer-platform/developer-platform.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    OrganizationsModule,
    BranchesModule,
    DepartmentsModule,
    UsersModule,
    CustomersModule,
    LeadsModule,
    ActivitiesModule,
    PartnersModule,
    SurveysModule,
    DesignsModule,
    PricingModule,
    QuotationsModule,
    ExecutionModule,
    FinanceModule,
    ServiceManagementModule,
    AiScadaModule,
    SyncModule,
    HealthModule,
    MigrationModule,
    OnboardingModule,
    ReportsModule,
    IntegrationsModule,
    CustomerPortalModule,
    SaasModule,
    PilotModule,
    CustomerSuccessModule,
    OperationsModule,
    DeveloperPlatformModule,
  ],
})
export class AppModule {}
