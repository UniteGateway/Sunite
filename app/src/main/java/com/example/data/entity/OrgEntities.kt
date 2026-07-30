package com.example.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "organization")
data class OrganizationEntity(
    @PrimaryKey val id: String = "org_sunite_01",
    val companyName: String,
    val legalName: String,
    val taxId: String,
    val registrationNumber: String,
    val website: String,
    val address: String,
    val city: String,
    val state: String,
    val country: String,
    val contactEmail: String,
    val phone: String,
    val currency: String,
    val timezone: String,
    val partnerTier: String = "Enterprise Platinum Partner"
)

@Entity(tableName = "branches")
data class BranchEntity(
    @PrimaryKey val id: String,
    val branchCode: String,
    val name: String,
    val city: String,
    val state: String,
    val country: String,
    val managerName: String,
    val status: String, // Active, Maintenance, Pending Setup
    val activeProjects: Int = 0,
    val staffCount: Int = 0,
    val phone: String = ""
)

@Entity(tableName = "departments")
data class DepartmentEntity(
    @PrimaryKey val id: String,
    val code: String,
    val name: String,
    val leadName: String,
    val memberCount: Int,
    val description: String
)

@Entity(tableName = "roles")
data class RoleEntity(
    @PrimaryKey val id: String,
    val name: String,
    val description: String,
    val userCount: Int,
    val permissionsJson: String // String array or comma-separated actions e.g. "users:read,users:write"
)
