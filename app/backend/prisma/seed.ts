// ====================================================
// SUNITE ENTERPRISE - MASTER POSTGRESQL SEED SCRIPT
// PHASE 11.3 - COMPLETE SEED ENGINE
// ====================================================

import { PrismaClient, UserRole, EntityStatus, LeadStatus, ProjectStage, OrderStatus, PaymentStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Sunite Enterprise Master Database Seeding...');

  // 1. Seed Master Organization
  const org = await prisma.organization.upsert({
    where: { taxId: '27AAAAA0000A1Z5' },
    update: {},
    create: {
      companyName: 'Sunite Enterprise Solar Systems Ltd.',
      legalName: 'Sunite Enterprise Global Private Limited',
      taxId: '27AAAAA0000A1Z5',
      currency: 'INR',
      status: EntityStatus.ACTIVE,
    },
  });
  console.log(`✅ Organization created: ${org.companyName}`);

  // 2. Seed Master Branches
  const hqBranch = await prisma.branch.upsert({
    where: { branchCode: 'HQ-MUMBAI-01' },
    update: {},
    create: {
      organizationId: org.id,
      branchCode: 'HQ-MUMBAI-01',
      branchName: 'Sunite Corporate HQ - Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400051',
      address: 'BKC Financial Center, Tower B, Level 12',
      status: EntityStatus.ACTIVE,
    },
  });

  const blrBranch = await prisma.branch.upsert({
    where: { branchCode: 'BR-BLR-02' },
    update: {},
    create: {
      organizationId: org.id,
      branchCode: 'BR-BLR-02',
      branchName: 'Sunite Tech & Innovation Hub - Bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560103',
      address: 'Outer Ring Road, Tech Park, Phase 2',
      status: EntityStatus.ACTIVE,
    },
  });
  console.log(`✅ Branches seeded: ${hqBranch.branchName}, ${blrBranch.branchName}`);

  // 3. Seed Departments
  const engDept = await prisma.department.upsert({
    where: {
      organizationId_deptCode: {
        organizationId: org.id,
        deptCode: 'ENG-SOLAR',
      },
    },
    update: {},
    create: {
      organizationId: org.id,
      branchId: blrBranch.id,
      deptCode: 'ENG-SOLAR',
      deptName: 'Solar Engineering & CAD Design',
      status: EntityStatus.ACTIVE,
    },
  });
  console.log(`✅ Department seeded: ${engDept.deptName}`);

  // 4. Seed Enterprise Users
  const passwordHash = await bcrypt.hash('SuniteAdmin@2026', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@sunite.com' },
    update: {},
    create: {
      organizationId: org.id,
      branchId: hqBranch.id,
      departmentId: engDept.id,
      email: 'admin@sunite.com',
      mobile: '+919876543210',
      passwordHash: passwordHash,
      firstName: 'Chief',
      lastName: 'Architect',
      role: UserRole.SUPER_ADMIN,
      status: EntityStatus.ACTIVE,
      mfaEnabled: true,
    },
  });

  const engineerUser = await prisma.user.upsert({
    where: { email: 'engineer@sunite.com' },
    update: {},
    create: {
      organizationId: org.id,
      branchId: blrBranch.id,
      departmentId: engDept.id,
      email: 'engineer@sunite.com',
      mobile: '+919876543211',
      passwordHash: passwordHash,
      firstName: 'Solar',
      lastName: 'Engineer',
      role: UserRole.SOLAR_ENGINEER,
      status: EntityStatus.ACTIVE,
    },
  });

  console.log(`✅ Users seeded: ${adminUser.email}, ${engineerUser.email}`);

  // 5. Seed Enterprise Customer & Partner
  const customer = await prisma.customer.upsert({
    where: { customerCode: 'CUST-2026-001' },
    update: {},
    create: {
      organizationId: org.id,
      customerCode: 'CUST-2026-001',
      fullName: 'Apex Renewable Logistics Park',
      email: 'contact@apexlogistics.com',
      mobile: '+919988776655',
      gstin: '27BBBBB1111B1Z2',
      city: 'Pune',
      state: 'Maharashtra',
      sanctionedKw: 500.0,
      status: EntityStatus.ACTIVE,
    },
  });

  const partner = await prisma.partner.upsert({
    where: { partnerCode: 'PARTNER-EPC-01' },
    update: {},
    create: {
      organizationId: org.id,
      partnerCode: 'PARTNER-EPC-01',
      companyName: 'Maharastra EPC Solar Corp',
      partnerType: 'EPC Contractor',
      contactPerson: 'Vikram Shinde',
      email: 'epc@mahasolar.com',
      mobile: '+919123456789',
      gstin: '27CCCCC2222C1Z9',
      status: EntityStatus.ACTIVE,
    },
  });

  console.log(`✅ Customer & Partner seeded: ${customer.fullName}, ${partner.companyName}`);

  // 6. Seed Lead, Survey & Project
  const lead = await prisma.lead.upsert({
    where: { leadNumber: 'LEAD-2026-8801' },
    update: {},
    create: {
      leadNumber: 'LEAD-2026-8801',
      customerId: customer.id,
      assignedUserId: engineerUser.id,
      kwRequirement: 500.0,
      roofType: 'Industrial Metal Sheet Roof',
      utilityCompany: 'MSEDCL',
      status: LeadStatus.SURVEY_COMPLETED,
    },
  });

  const survey = await prisma.survey.upsert({
    where: { surveyNumber: 'SRV-2026-9901' },
    update: {},
    create: {
      surveyNumber: 'SRV-2026-9901',
      leadId: lead.id,
      engineerId: engineerUser.id,
      usableRoofArea: 4500.0,
      azimuthDeg: 180.0,
      tiltAngleDeg: 15.0,
      sanctionedLoad: 600.0,
      shadingReport: 'Zero shading between 9:00 AM to 4:30 PM year-round.',
      isFeasible: true,
    },
  });

  const project = await prisma.project.upsert({
    where: { projectNumber: 'PROJ-SUN-500KW' },
    update: {},
    create: {
      projectNumber: 'PROJ-SUN-500KW',
      organizationId: org.id,
      branchId: hqBranch.id,
      customerId: customer.id,
      managerId: adminUser.id,
      projectName: '500 kWp Commercial Rooftop Solar Project - Apex Logistics',
      systemCapacityKw: 500.0,
      stage: ProjectStage.STRUCTURE_MOUNTING,
    },
  });

  console.log(`✅ Lead, Survey & Project seeded: ${project.projectNumber}`);

  console.log('🎉 Sunite Enterprise Seed Engine Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
