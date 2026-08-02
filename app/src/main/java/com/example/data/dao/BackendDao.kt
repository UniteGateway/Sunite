package com.example.data.dao

import androidx.room.*
import com.example.data.entity.*
import kotlinx.coroutines.flow.Flow

@Dao
interface BackendDao {
    // Postgres Sync Logs
    @Query("SELECT * FROM postgres_sync_logs ORDER BY timestamp DESC")
    fun getAllPostgresSyncLogs(): Flow<List<PostgresSyncLogEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPostgresSyncLog(log: PostgresSyncLogEntity)

    // API Gateway Routes
    @Query("SELECT * FROM api_gateway_routes ORDER BY endpointPath ASC")
    fun getAllApiGatewayRoutes(): Flow<List<ApiGatewayRouteEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertApiGatewayRoute(route: ApiGatewayRouteEntity)

    // Cloud Storage Configs
    @Query("SELECT * FROM cloud_storage_configs ORDER BY provider ASC")
    fun getAllCloudStorageConfigs(): Flow<List<CloudStorageConfigEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCloudStorageConfig(config: CloudStorageConfigEntity)

    // Security Audit Logs
    @Query("SELECT * FROM security_audit_logs ORDER BY timestamp DESC")
    fun getAllSecurityAuditLogs(): Flow<List<SecurityAuditLogEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSecurityAuditLog(log: SecurityAuditLogEntity)

    // DevOps Deployments
    @Query("SELECT * FROM devops_deployments ORDER BY serviceName ASC")
    fun getAllDevOpsDeployments(): Flow<List<DevOpsDeploymentEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertDevOpsDeployment(deployment: DevOpsDeploymentEntity)
}
