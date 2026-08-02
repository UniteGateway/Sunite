# SUNITE ENTERPRISE - DATA MIGRATION GUIDE

## 1. Overview
The Sunite Enterprise Migration Engine provides automated tools for importing legacy enterprise data into Sunite Version 1.0. Supported input formats include **Excel (.xlsx)**, **CSV (.csv)**, **JSON (.json)**, and **ZIP Archives (.zip)**.

---

## 2. Step-by-Step Data Migration Process

### Step 1: Upload Data Payload
Call `POST /api/v1/migration/upload` or use the Next.js Web Portal wizard (`/migration`).

```json
{
  "jobName": "Q2 2026 Customer Import",
  "fileType": "CSV",
  "entityType": "CUSTOMER",
  "fileContentBase64": "Y3VzdG9tZXJDb2RlLGZ1bGxOYW1lLGVtYWlsLG1vYmlsZSxnc3RpbixjaXR5LHN0YXRlLHNhbmN0aW9uZWRLdwpDVVNULTIwMDEsVG9ycmVudCBQb3dlciAsZW5lcmd5QHRvcnJlbnQuY29tLCs5MTk4MjUwMTExMTEsMjRBQUFDVDEyMzRGMloxLEFobWVkYWJhZCxHdWphcmF0LDUwMA=="
}
```

### Step 2: Validate Data & Duplicate Detection
Call `POST /api/v1/migration/validate` specifying your desired duplicate handling strategy (`SKIP`, `MERGE`, or `OVERWRITE`).

```json
{
  "jobId": "JOB-901",
  "duplicateResolutionStrategy": "SKIP"
}
```

### Step 3: Preview Records & Fix Errors
Call `POST /api/v1/migration/preview` to inspect rows flagged for schema or validation failures (e.g. invalid GSTIN or missing email).

### Step 4: Execute Production Import
Call `POST /api/v1/migration/import` to write validated records into PostgreSQL.

### Step 5: Rollback (Emergency Safety)
If an error occurs during execution, call `POST /api/v1/migration/rollback` with the `jobId` to cleanly remove all created entities.
