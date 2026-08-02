# SUNITE ENTERPRISE - PHASE 11.15 MOBILE SYNCHRONIZATION, OFFLINE ENGINE, API GATEWAY & REAL-TIME SYNC REPORT

## Executive Overview
Phase 11.15 delivers the production Mobile Synchronization Layer, Offline Engine, API Gateway, Delta Incremental Sync, Conflict Resolution Engine, Document Upload Sync, App Notifications, and Firebase Cloud Messaging (FCM) Push Token Registration for Sunite Enterprise. Built using NestJS (Fastify Adapter), Prisma ORM, PostgreSQL 16, and WebSockets/RxJS Event Gateways following Offline-First architecture.

---

## Architecture & Clean Domain Layers

1. **Controller Layer (`sync.controller.ts`)**:
   - `POST /api/v1/sync/register-device` — Register Mobile Android Device & Initialize Sync Session
   - `POST /api/v1/sync/start` — Start Mobile Synchronization Engine Session
   - `POST /api/v1/sync/full` — Execute Full Dataset Synchronization for Offline Room DB Initialization
   - `POST /api/v1/sync/incremental` — Execute Incremental Delta Sync & Process Offline Queued Mutations
   - `GET /api/v1/sync/status` — Get Mobile Device Sync Status & Last Sync Timestamp
   - `POST /api/v1/sync/conflicts/resolve` — Resolve Entity Conflict (Server Wins, Client Wins, Manual Merge)
   - `POST /api/v1/sync/upload-file` — Offline File & Document Upload Sync (Photos, Bills, Signatures, PDFs)
   - `GET /api/v1/notifications` — Get Push & App Sync Notifications
   - `POST /api/v1/push/register` — Register Firebase Cloud Messaging (FCM) Push Token

2. **Service Layer (`sync.service.ts`)**:
   - Device Registration & Hardware Fingerprinting
   - Full & Delta Incremental Sync Engine for Room Database Integration
   - Offline Queue Processing (Inserts, Updates, Deletes queued when offline)
   - Conflict Resolution Engine supporting Server Wins, Client Wins, Timestamp Strategy, and Manual Merge
   - File & Photo Upload Synchronization with CDN URL generation
   - Gateway Event Broadcasting & FCM Push Registration

3. **Repository Layer (`sync.repository.ts`)**:
   - Type-safe Prisma queries for `sync_device_sessions`, `sync_conflict_logs`, and `sync_notifications`.

4. **Real-Time Event Gateway (`sync.gateway.ts`)**:
   - RxJS Event Stream broadcasting WebSocket events for SCADA Alerts, Project Status changes, Service Ticket updates, and Push Notifications.

---

## Room DB & Android WorkManager Integration Strategy

- **Entity Versioning & Delta Sync**: Each synced entity tracks `updatedAt` timestamps. WorkManager triggers `/api/v1/sync/incremental` with `lastSyncedAt`.
- **Conflict Resolution**: Client offline mutations that conflict with concurrent server edits generate `SyncConflictLog` entries and default to `SERVER_WINS` or prompt manual resolution via `/api/v1/sync/conflicts/resolve`.
- **Offline Document Upload**: Photos and PDFs taken offline are stored in Room/local storage, queued as `UploadFileSyncDto`, and synced automatically when network connectivity returns.

---

## Deliverables & Build Verification

- **Compilation Verification**: Tested and verified cleanly with `compile_applet`.
- **OpenAPI / Swagger Specs**: Exposed under OpenAPI documentation at `/docs`.
- **Postman Collection**: Created as `Sunite_Enterprise_Phase_11_15.postman_collection.json`.
