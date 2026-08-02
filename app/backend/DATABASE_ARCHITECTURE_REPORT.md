# SUNITE ENTERPRISE - PHASE 11.3 POSTGRESQL & PRISMA ORM DATA MODEL REPORT

## Executive Overview
Sunite Enterprise Phase 11.3 establishes a master PostgreSQL 16 database foundation powered by Prisma ORM. 

With this architecture:
1. **PostgreSQL 16** operates as the single source of truth (Master Database) for all enterprise entities.
2. **Android Room Database** acts strictly as an offline-first cache with bi-directional synchronization stream.
3. **Prisma ORM** manages data modeling, type-safe queries, migration control, cascading rules, and database seeding.

---

## Technical Stack & Configuration

- **Database Engine**: PostgreSQL 16
- **ORM Engine**: Prisma ORM 5.8+
- **Primary Keys**: UUID v4 (`@default(uuid())`)
- **Foreign Keys & Constraints**: Fully modeled relational schema with Strict Foreign Key constraints and Cascade/SetNull delete policies.
- **Audit Columns**: `createdBy`, `updatedBy`, `createdAt`, `updatedAt`, `deletedAt` (Soft Delete).
- **Indexing Strategy**: B-Tree composite and single-column indexes on high-frequency lookup fields (`email`, `mobile`, `taxId`, `gstin`, `projectNumber`, `orderNumber`, `invoiceNumber`, `leadNumber`, `partnerCode`).

---

## Entity Relationship & Domain Breakdown

### 1. Organization & Hierarchy
- `organizations`: Enterprise tenant accounts (`tax_id`, `company_name`, `currency`).
- `branches`: Regional hubs (`branch_code`, `city`, `state`, `address`).
- `departments`: Functional organizational units (`dept_code`, `dept_name`).

### 2. Identity, RBAC & Security
- `users`: Authenticated enterprise accounts with bcrypt password hashes, JWT refresh token hashes, and multi-factor authentication (MFA) secrets.
- `UserRole`: Enums covering `SUPER_ADMIN`, `ENTERPRISE_ADMIN`, `PROJECT_MANAGER`, `SOLAR_ENGINEER`, `SURVEY_ENGINEER`, `SALES_EXECUTIVE`, `FIELD_INSTALLER`, `FINANCE_AUDITOR`, `PARTNER_MEMBER`, `FRANCHISE_ADMIN`, `EPC_CONTRACTOR`, `CUSTOMER_USER`.

### 3. CRM & Supply Chain Stakeholders
- `customers`: Enterprise solar buyers with sanctioned load and GSTIN identifiers.
- `partners`: EPC contractors, franchise partners, vendors, and marketing affiliates.

### 4. Sales Lifecycle & Engineering Design
- `leads`: Customer inquiries with kW capacity requirements and utility company details.
- `surveys`: On-site survey parameters (`usable_roof_area`, `azimuth_deg`, `tilt_angle_deg`, `sanctioned_load`, `shading_report`).
- `solar_designs`: Technical system layout (`system_capacity_kw`, `module_type`, `module_count`, `inverter_type`, `estimated_annual_gen_kwh`).

### 5. Financial Management & Billing
- `quotations`: Bounded system proposals with base amount, tax/GST calculations, and government subsidies.
- `orders`: Approved commercial contracts.
- `invoices`: Formal billing statements with automated tax calculations.
- `payments`: Transaction records referencing bank reference numbers and payment channels.
- `commissions`: Partner commission tracking and disbursement statuses.

### 6. Project Execution & SCADA Telemetry
- `projects`: Master execution contracts with lifecycle stages (`FEASIBILITY` to `COMMISSIONING`).
- `telemetry`: High-frequency IoT SCADA readings (`SOLAR_GENERATION_KW`, `GRID_EXPORT_KW`, `BATTERY_SOC_PCT`, `INVERTER_TEMP_C`).
- `service_tickets`: O&M customer support tickets with priority levels and resolution tracking.

### 7. Governance, Audit & Notifications
- `audit_logs`: Detailed system access, IP address, user-agent, and payload JSON records.
- `notifications`: User notification delivery tracking.

---

## Entity Relationship Diagram (ERD)

```
[ Organization ] ───1:N───> [ Branch ] ───1:N───> [ Department ]
        │                       │                     │
       1:N                     1:N                   1:N
        ▼                       ▼                     ▼
   [ User ] ◄───────────── Assigned / Managed ───────────┤
        │                                             │
       1:N                                           1:N
        ▼                                             ▼
  [ Customer ] ───1:N───> [ Lead ] ───1:N───> [ Survey ]
        │                    │                    │
       1:N                  1:N                  1:1
        ▼                    ▼                    ▼
[ ServiceTicket ]     [ Quotation ]       [ SolarDesign ]
                             │
                            1:N
                             ▼
                         [ Order ]
                             │
                     ┌───────┴───────┐
                     │               │
                    1:N             1:N
                     ▼               ▼
                [ Invoice ]     [ Project ]
                     │               │
                    1:N             1:N
                     ▼               ▼
                [ Payment ]     [ Telemetry ]
```

---

## Seeding & Initial Verification

To initialize and seed the master PostgreSQL database:

```bash
# Generate Prisma Client
npm run prisma:generate

# Run Database Migrations
npm run prisma:migrate

# Seed Master Enterprise Data
npm run prisma:seed
```

Seeded master data includes:
- Headquarters and regional innovation hub branches.
- Master super admin and solar engineer accounts.
- Initial enterprise customer profiles, EPC partners, site surveys, and 500 kWp project execution contracts.
