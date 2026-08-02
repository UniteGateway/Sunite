# SUNITE ENTERPRISE - PHASE 11.9 DYNAMIC PRICING & COMMERCIAL ENGINE REPORT

## Executive Overview
Phase 11.9 delivers the Dynamic Pricing, Commercial Engine, Margin Rules, Discount Engine, GST Calculator, PM Surya Ghar Subsidy Engine, and Loan EMI Calculator APIs for Sunite Enterprise. Built using NestJS (Fastify Adapter), Prisma ORM, and PostgreSQL 16 following Clean Architecture standards.

---

## Architecture & Clean Domain Layers

1. **Controller Layer (`pricing.controller.ts`)**:
   - `POST /api/v1/pricing/calculate` — Calculate commercial cost sheets & pricing
   - `GET /api/v1/pricing` — List pricing sheets with status & search filters
   - `GET /api/v1/pricing/:id` — Detail view by UUID
   - `PUT /api/v1/pricing/:id` — Update cost line items
   - `DELETE /api/v1/pricing/:id` — Soft delete
   - `POST /api/v1/pricing/apply-margin` — Margin allocation (Corporate, Branch, Franchise)
   - `POST /api/v1/pricing/apply-discount` — Campaign or flat discounts
   - `POST /api/v1/pricing/calculate-gst` — CGST, SGST, IGST & HSN code breakdown
   - `POST /api/v1/pricing/calculate-subsidy` — PM Surya Ghar central & state subsidy rules
   - `POST /api/v1/pricing/calculate-loan` — Financial loan EMI & repayment schedule
   - `POST /api/v1/pricing/approve` — Commercial approval workflow progression
   - `GET /api/v1/pricing/internal-sheet` — Internal cost, margin & management view
   - `GET /api/v1/pricing/customer-sheet` — Clean customer quote summary
   - `GET /api/v1/pricing/partner-sheet` — Channel partner commission breakdown

2. **Service Layer (`pricing.service.ts`)**: Encapsulates cost breakdowns, multi-tiered margin splits, campaign discounts, tax engine rules (HSN codes & inter-state vs intra-state GST), subsidy eligibility, and loan amortization.
3. **Repository Layer (`pricing.repository.ts`)**: Prisma ORM interface for persistent `pricing_sheets`.

---

## Deliverables & Build Verification

- **Compilation Check**: Validated clean build via `compile_applet`.
- **OpenAPI / Swagger Specs**: Fully exposed under Swagger documentation at `/docs`.
- **Postman Collection**: Exported as `Sunite_Enterprise_Phase_11_9.postman_collection.json`.
