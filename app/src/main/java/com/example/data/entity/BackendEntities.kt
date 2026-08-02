package com.example.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "postgres_sync_logs")
data class PostgresSyncLogEntity(
    @PrimaryKey val id: String,
    val tableName: String,
    val recordId: String,
    val syncDirection: String, // ROOM_TO_POSTGRES, POSTGRES_TO_ROOM
    val syncStatus: String, // SYNCED, IN_QUEUE, CONFLICT_RESOLVED, ERROR
    val latencyMs: Long,
    val postgresCluster: String, // primary-us-east-1.rds.amazonaws.com
    val timestamp: String
)

@Entity(tableName = "api_gateway_routes")
data class ApiGatewayRouteEntity(
    @PrimaryKey val id: String,
    val endpointPath: String, // /api/v1/quotations, /api/v1/scada/telemetry
    val httpMethod: String, // GET, POST, PUT, DELETE
    val controllerName: String, // QuotationController, TelemetryController
    val rateLimitRpm: Int,
    val isCachedRedis: Boolean,
    val authRequired: Boolean, // JWT / OAuth2
    val swaggerTag: String,
    val status: String // ACTIVE, DEPRECATED, RATE_LIMITED
)

@Entity(tableName = "cloud_storage_configs")
data class CloudStorageConfigEntity(
    @PrimaryKey val id: String,
    val provider: String, // AWS S3, Azure Blob, Google Cloud Storage
    val bucketName: String,
    val region: String,
    val cdnDomain: String,
    val defaultEncryption: String, // AES-256, AWS-KMS
    val activeStorageClass: String, // Standard, Infrequent Access, Glacier
    val totalFilesCount: Long,
    val storageUsedGb: Double
)

@Entity(tableName = "security_audit_logs")
data class SecurityAuditLogEntity(
    @PrimaryKey val id: String,
    val eventType: String, // JWT_TOKEN_REFRESH, MFA_CHALLENGE_SUCCESS, OWASP_XSS_BLOCKED, API_RATE_EXCEEDED
    val userEmail: String,
    val ipAddress: String,
    val userAgent: String,
    val threatSeverity: String, // LOW, MEDIUM, HIGH, CRITICAL
    val details: String,
    val timestamp: String
)

@Entity(tableName = "devops_deployments")
data class DevOpsDeploymentEntity(
    @PrimaryKey val id: String,
    val serviceName: String, // sunite-nestjs-api, sunite-sync-worker, sunite-redis-cache
    val environment: String, // Production, Staging, DR-East
    val dockerImageTag: String,
    val k8sPodStatus: String, // Running (12/12), Scaling (4/8), Healthy
    val helmReleaseVersion: String,
    val memoryUsageMb: Double,
    val cpuUsagePct: Double,
    val lastDeployedAt: String
)
