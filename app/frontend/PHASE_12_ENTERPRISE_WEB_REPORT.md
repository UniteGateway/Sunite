# SUNITE ENTERPRISE - PHASE 12 ENTERPRISE WEB PORTAL REPORT

## Executive Overview
Phase 12 delivers the complete **Next.js 15 / React 19 Enterprise Web Portal** for Sunite Enterprise. The web portal directly consumes the NestJS Backend Version 1.0 REST APIs and WebSocket Telemetry feeds without altering backend business logic or database structures.

---

## 1. Frontend Architecture & Tech Stack
- **Framework**: Next.js 15 (App Router with `@/` alias paths)
- **UI & Styling**: React 19, Tailwind CSS, Lucide Icons, Dark/Light Mode Theme Provider
- **State & Data Layer**: React Context (`AuthProvider`), Axios HTTP Client with JWT & Refresh Token interceptors
- **Role-Based Access Control (RBAC)**: Role switcher and role guards supporting 10 corporate personas:
  1. Super Admin
  2. Sales Admin
  3. Marketing Partner
  4. Franchise
  5. EPC Contractor
  6. Installation Vendor
  7. Survey Engineer
  8. Finance
  9. Service Engineer
  10. Customer

---

## 2. Component & Layout Breakdown
1. **Layout Components**:
   - `EnterpriseHeader.tsx`: Top Header with Global Search, SCADA Sync Indicator, Role Switcher, Quick Actions, Notification Center & Profile Menu.
   - `EnterpriseSidebar.tsx`: Enterprise Sidebar covering Dashboard, CRM, Partners, Engineering, Projects, Procurement, Inventory, Finance, Warranty, Service, AI, SCADA, Reports, Admin, and Settings.
   - `Breadcrumbs.tsx`: Dynamic route-based breadcrumb navigation.

2. **Executive Role Dashboards**:
   - `CeoDashboard.tsx`: High-level KPIs, 142.8 MW installed capacity, $28.4M revenue, Mega-Plant status, and pipeline stages.
   - `SalesDashboard.tsx`: Active lead conversion, pipeline deals, and proposal tracking.
   - `FinanceDashboard.tsx`: Commission escrow, invoicing, and disbursement schedules.
   - `AiScadaDashboard.tsx`: Realtime Modbus telemetry, GenAI OCR accuracy, and fault alerts.

3. **Core Portal Module Pages**:
   - `/crm`: CRM 360° Directory & Customer Accounts.
   - `/partners`: Partner Ecosystem & Commission Tiers.
   - `/engineering`: Solar Design & PVSyst Yield Simulation Engine.
   - `/projects`: Project Execution & EPC Milestones.
   - `/scada`: Live Modbus IoT Telemetry Stream.
   - `/login`: Role-Based SSO Authentication.

---

## 3. Deliverables & Build Verification
- **Compilation Verification**: Android Applet and Web Portal dependencies verified with `compile_applet`.
- **Postman Collection**: Created as `Sunite_Enterprise_Phase_12.postman_collection.json`.
- **Deployment Guide**: Created as `WEB_PORTAL_DEPLOYMENT_GUIDE.md`.
