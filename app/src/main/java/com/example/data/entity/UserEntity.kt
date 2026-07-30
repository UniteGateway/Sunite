package com.example.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "users")
data class UserEntity(
    @PrimaryKey val id: String,
    val email: String,
    val fullName: String,
    val role: String,
    val branch: String,
    val department: String,
    val phone: String,
    val status: String, // Active, Pending, Deactivated
    val mfaEnabled: Boolean = true,
    val lastLogin: String = "2026-07-30 08:45 AM",
    val avatarUrl: String = ""
)
