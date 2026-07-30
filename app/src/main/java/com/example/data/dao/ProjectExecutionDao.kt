package com.example.data.dao

import androidx.room.*
import com.example.data.entity.*
import kotlinx.coroutines.flow.Flow

@Dao
interface ProjectExecutionDao {

    // Orders
    @Query("SELECT * FROM solar_orders ORDER BY createdDate DESC")
    fun getAllOrders(): Flow<List<SolarOrderEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrder(order: SolarOrderEntity)

    // Projects
    @Query("SELECT * FROM solar_projects ORDER BY updatedAt DESC")
    fun getAllProjects(): Flow<List<SolarProjectEntity>>

    @Query("SELECT * FROM solar_projects WHERE id = :id")
    suspend fun getProjectById(id: String): SolarProjectEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertProject(project: SolarProjectEntity)

    @Update
    suspend fun updateProject(project: SolarProjectEntity)

    @Query("UPDATE solar_projects SET currentStage = :stage, overallProgressPct = :progress, updatedAt = :updatedAt WHERE id = :id")
    suspend fun updateProjectStage(id: String, stage: String, progress: Double, updatedAt: String)

    // Tasks
    @Query("SELECT * FROM project_tasks WHERE projectId = :projectId ORDER BY dueDate ASC")
    fun getTasksForProject(projectId: String): Flow<List<ProjectTaskEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTask(task: ProjectTaskEntity)

    @Update
    suspend fun updateTask(task: ProjectTaskEntity)

    // Procurement
    @Query("SELECT * FROM purchase_requests WHERE projectId = :projectId")
    fun getPurchaseRequestsForProject(projectId: String): Flow<List<PurchaseRequestEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPurchaseRequest(pr: PurchaseRequestEntity)

    // Installation Logs
    @Query("SELECT * FROM installation_logs WHERE projectId = :projectId ORDER BY logDate DESC")
    fun getInstallationLogsForProject(projectId: String): Flow<List<InstallationLogEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertInstallationLog(log: InstallationLogEntity)

    // Commissioning
    @Query("SELECT * FROM commissioning_reports WHERE projectId = :projectId")
    fun getCommissioningReportForProject(projectId: String): Flow<CommissioningReportEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCommissioningReport(report: CommissioningReportEntity)
}
