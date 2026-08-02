# SUNITE ENTERPRISE - CUSTOMER ONBOARDING GUIDE

## 1. Overview
The Customer & Enterprise Onboarding System provides streamlined workflows for setting up new Organizations, Customer Master Accounts, and Partner Ecosystem members in Sunite Enterprise Version 1.0.

---

## 2. Onboarding Workflows

### 1. Enterprise Organization Onboarding
Creates the top-level tenant organization, primary headquarters branch, enterprise administrator account, and configures default external integrations (SMTP email, WhatsApp notifications, payment gateway, and SCADA endpoints).

**API Endpoint**: `POST /api/v1/onboarding/organization`

### 2. Customer Master Onboarding
Onboards commercial/industrial solar customers with contact information, GSTIN/PAN tax details, DISCOM electricity consumer numbers, utility provider name, and sanctioned load (kW). Automatically creates the initial solar lead.

**API Endpoint**: `POST /api/v1/onboarding/customer`

### 3. Partner Ecosystem Onboarding
Registers EPC Contractors, Franchise Partners, Marketing Partners, or Equipment Vendors into the partner network with assigned partner codes and commission tracking.

**API Endpoint**: `POST /api/v1/onboarding/partner`

### 4. Fetch Onboarding Status
Query overall onboarding activity and active sessions via `GET /api/v1/onboarding/status`.
