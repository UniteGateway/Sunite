package com.example.data.dao

import androidx.room.*
import com.example.data.entity.*
import kotlinx.coroutines.flow.Flow

@Dao
interface MobileDao {
    // Mobile Devices
    @Query("SELECT * FROM mobile_devices ORDER BY lastActiveAt DESC")
    fun getAllMobileDevices(): Flow<List<MobileDeviceEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMobileDevice(device: MobileDeviceEntity)

    // Push Notifications
    @Query("SELECT * FROM push_notifications ORDER BY sentAt DESC")
    fun getAllPushNotifications(): Flow<List<PushNotificationEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPushNotification(notification: PushNotificationEntity)

    // Offline Sync Records
    @Query("SELECT * FROM offline_sync_records ORDER BY createdAt DESC")
    fun getAllOfflineSyncRecords(): Flow<List<OfflineSyncEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOfflineSyncRecord(record: OfflineSyncEntity)

    // Device Sessions
    @Query("SELECT * FROM device_sessions ORDER BY expiresAt DESC")
    fun getAllDeviceSessions(): Flow<List<DeviceSessionEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertDeviceSession(session: DeviceSessionEntity)

    // Digital Documents
    @Query("SELECT * FROM digital_documents ORDER BY createdAt DESC")
    fun getAllDocuments(): Flow<List<DocumentEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertDocument(doc: DocumentEntity)

    // Digital Signatures
    @Query("SELECT * FROM digital_signatures ORDER BY signedAt DESC")
    fun getAllDigitalSignatures(): Flow<List<DigitalSignatureEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertDigitalSignature(sig: DigitalSignatureEntity)
}
