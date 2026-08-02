package com.example.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "mobile_devices")
data class MobileDeviceEntity(
    @PrimaryKey val id: String,
    val userId: String,
    val deviceName: String,
    val deviceModel: String,
    val osVersion: String,
    val appRole: String, // Customer, Marketing Partner, Franchise, Survey Engineer, Installation Engineer, Service Engineer, Finance, CEO Executive
    val pushToken: String,
    val biometricEnabled: Boolean,
    val isRegistered: Boolean,
    val registeredAt: String,
    val lastActiveAt: String
)

@Entity(tableName = "push_notifications")
data class PushNotificationEntity(
    @PrimaryKey val id: String,
    val recipientUserId: String,
    val recipientRole: String,
    val title: String,
    val body: String,
    val channel: String, // Project Updates, Payment, Commission, Service, AMC, Warranty, Approvals, AI Alerts
    val payloadJson: String,
    val isRead: Boolean,
    val sentAt: String
)

@Entity(tableName = "offline_sync_records")
data class OfflineSyncEntity(
    @PrimaryKey val id: String,
    val userId: String,
    val entityName: String,
    val actionType: String, // INSERT, UPDATE, DELETE
    val payloadJson: String,
    val status: String, // PENDING, SYNCED, CONFLICT, FAILED
    val retryCount: Int,
    val createdAt: String,
    val syncedAt: String?
)

@Entity(tableName = "device_sessions")
data class DeviceSessionEntity(
    @PrimaryKey val id: String,
    val userId: String,
    val deviceId: String,
    val jwtToken: String,
    val refreshToken: String,
    val ipAddress: String,
    val locationGeo: String,
    val expiresAt: String,
    val isBiometricValidated: Boolean
)

@Entity(tableName = "digital_documents")
data class DocumentEntity(
    @PrimaryKey val id: String,
    val title: String,
    val documentType: String, // CAD, Invoice, Roof Photo, Bill, Contract, Digital Signature
    val fileUrl: String,
    val storageProvider: String, // AWS S3, Azure Blob, Google Cloud Storage
    val version: String,
    val uploadedByUserId: String,
    val fileSizeKb: Long,
    val createdAt: String
)

@Entity(tableName = "digital_signatures")
data class DigitalSignatureEntity(
    @PrimaryKey val id: String,
    val targetEntityName: String, // Quotation, Installation Signoff, Service Ticket, Commission Approval
    val targetId: String,
    val signerName: String,
    val signerRole: String, // Customer, Partner, Engineer, Project Manager, Finance
    val signatureDataSvg: String,
    val otpVerified: Boolean,
    val verifiedPhoneEmail: String,
    val gpsCoordinates: String,
    val signedAt: String
)
