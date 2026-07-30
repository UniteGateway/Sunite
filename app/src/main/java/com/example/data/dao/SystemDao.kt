package com.example.data.dao

import androidx.room.*
import com.example.data.entity.ActivityLogEntity
import com.example.data.entity.MasterDataEntity
import com.example.data.entity.NotificationEntity
import com.example.data.entity.TemplateEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface SystemDao {
    @Query("SELECT * FROM notifications ORDER BY timestamp DESC")
    fun getAllNotifications(): Flow<List<NotificationEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertNotifications(notifications: List<NotificationEntity>)

    @Query("UPDATE notifications SET read = 1 WHERE id = :id")
    suspend fun markNotificationAsRead(id: String)

    @Query("UPDATE notifications SET read = 1")
    suspend fun markAllNotificationsAsRead()

    @Query("SELECT * FROM activity_logs ORDER BY timestamp DESC LIMIT 100")
    fun getActivityLogs(): Flow<List<ActivityLogEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertActivityLog(log: ActivityLogEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertActivityLogs(logs: List<ActivityLogEntity>)

    @Query("SELECT * FROM master_data WHERE category = :category ORDER BY name ASC")
    fun getMasterDataByCategory(category: String): Flow<List<MasterDataEntity>>

    @Query("SELECT * FROM master_data ORDER BY category ASC, name ASC")
    fun getAllMasterData(): Flow<List<MasterDataEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMasterData(items: List<MasterDataEntity>)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMasterDataItem(item: MasterDataEntity)

    @Query("DELETE FROM master_data WHERE id = :id")
    suspend fun deleteMasterDataItem(id: String)

    @Query("SELECT * FROM templates ORDER BY type ASC, title ASC")
    fun getAllTemplates(): Flow<List<TemplateEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTemplates(templates: List<TemplateEntity>)

    @Update
    suspend fun updateTemplate(template: TemplateEntity)
}
