package com.example.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "notifications")
data class NotificationEntity(
    @PrimaryKey val id: String,
    val title: String,
    val message: String,
    val category: String, // SYSTEM, SECURITY, APPROVAL, COMPLIANCE
    val timestamp: String,
    val read: Boolean = false,
    val urgency: String = "NORMAL" // HIGH, NORMAL, LOW
)

@Entity(tableName = "activity_logs")
data class ActivityLogEntity(
    @PrimaryKey val id: String,
    val timestamp: String,
    val userEmail: String,
    val userRole: String,
    val action: String,
    val module: String,
    val ipAddress: String,
    val status: String // SUCCESS, FAILED, WARNING
)

@Entity(tableName = "master_data")
data class MasterDataEntity(
    @PrimaryKey val id: String,
    val category: String, // COUNTRY, STATE, CITY, BANK, CURRENCY, LANGUAGE, TAX
    val code: String,
    val name: String,
    val value: String,
    val status: String = "Active"
)

@Entity(tableName = "templates")
data class TemplateEntity(
    @PrimaryKey val id: String,
    val type: String, // EMAIL, SMS, WHATSAPP
    val code: String,
    val title: String,
    val subject: String = "",
    val body: String,
    val variables: String // e.g. "{user_name}, {otp}, {branch_code}"
)
