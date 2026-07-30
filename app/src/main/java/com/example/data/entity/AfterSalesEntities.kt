package com.example.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "warranties")
data class WarrantyEntity(
    @PrimaryKey val id: String,
    val warrantyNumber: String,
    val projectId: String,
    val customerName: String,
    val equipmentType: String, // Solar Panels, Inverters, Battery Storage, Structures
    val serialNumber: String,
    val manufacturer: String,
    val startDate: String,
    val endDate: String,
    val status: String, // Active, Expired, Claimed
    val claimHistoryCount: Int = 0
)

@Entity(tableName = "amc_contracts")
data class AMCEntity(
    @PrimaryKey val id: String,
    val amcNumber: String,
    val projectId: String,
    val customerName: String,
    val planType: String, // Silver, Gold, Platinum, Corporate
    val visitFrequency: String, // Quarterly, Half-Yearly, Annual
    val nextVisitDate: String,
    val contractValueUsd: Double,
    val gstTaxUsd: Double,
    val renewalDate: String,
    val expiryDate: String,
    val assignedEngineer: String,
    val slaHours: Int = 24,
    val paymentStatus: String, // Paid, Pending
    val autoRenewal: Boolean = true
)

@Entity(tableName = "service_tickets")
data class ServiceTicketEntity(
    @PrimaryKey val id: String,
    val ticketNumber: String,
    val projectId: String,
    val customerName: String,
    val channel: String, // Customer Portal, WhatsApp, Call Center, Partner Portal
    val ticketType: String, // No Generation, Low Generation, Inverter Fault, Panel Damage, Battery Issue, Cleaning
    val priority: String, // Critical, High, Medium, Low
    val status: String, // Open, Assigned, Engineer On Site, Waiting for Parts, Resolved, Closed
    val assignedEngineer: String,
    val issueDescription: String,
    val createdAt: String,
    val resolvedAt: String = ""
)

@Entity(tableName = "service_visits")
data class ServiceVisitEntity(
    @PrimaryKey val id: String,
    val ticketId: String,
    val projectId: String,
    val engineerName: String,
    val visitDate: String,
    val timeIn: String,
    val timeOut: String,
    val travelDistanceKm: Double,
    val gpsCoordinates: String,
    val beforePhotoUrl: String,
    val afterPhotoUrl: String,
    val materialsUsed: String,
    val customerSignature: String,
    val status: String // Completed, Scheduled, In Progress
)

@Entity(tableName = "preventive_maintenances")
data class PreventiveMaintenanceEntity(
    @PrimaryKey val id: String,
    val scheduleCode: String,
    val projectId: String,
    val customerName: String,
    val taskType: String, // Cleaning, Thermal Inspection, Electrical Testing, Torque Tightening, Earthing Test
    val frequency: String, // Quarterly, Half-Yearly, Annual
    val scheduledDate: String,
    val assignedEngineer: String,
    val status: String, // Scheduled, Completed, Overdue
    val reminderSent: Boolean = true
)

@Entity(tableName = "spare_inventories")
data class SpareInventoryEntity(
    @PrimaryKey val id: String,
    val partNumber: String,
    val partName: String,
    val category: String, // Panels, Inverters, Connectors, Cables, Fuses, Structure
    val warehouse: String,
    val stockQuantity: Int,
    val reservedQuantity: Int,
    val reorderLevel: Int,
    val unitPriceUsd: Double,
    val supplierName: String
)

@Entity(tableName = "warranty_claims")
data class WarrantyClaimEntity(
    @PrimaryKey val id: String,
    val claimNumber: String,
    val warrantyId: String,
    val customerName: String,
    val manufacturer: String,
    val equipmentSerial: String,
    val claimAmountUsd: Double,
    val rmaNumber: String,
    val status: String, // Submitted, Verification, Manufacturer Approved, Replacement Dispatched, Claim Closed
    val courierTracking: String
)

@Entity(tableName = "customer_feedbacks")
data class CustomerFeedbackEntity(
    @PrimaryKey val id: String,
    val projectId: String,
    val customerName: String,
    val installationRating: Int, // 1-5
    val engineerRating: Int, // 1-5
    val serviceRating: Int, // 1-5
    val overallRating: Int, // 1-5
    val npsScore: Int, // 0-10
    val comments: String,
    val photoProofUrl: String = "",
    val createdAt: String
)

@Entity(tableName = "equipment_healths")
data class EquipmentHealthEntity(
    @PrimaryKey val id: String,
    val equipmentSerial: String,
    val projectId: String,
    val equipmentRuntimeHours: Double,
    val faultHistoryCount: Int,
    val generationLossPct: Double,
    val operatingTemperatureC: Double,
    val mtbfHours: Double,
    val predictiveMaintenanceScore: Double,
    val lastTelemetryUpdate: String
)

@Entity(tableName = "service_notifications")
data class ServiceNotificationEntity(
    @PrimaryKey val id: String,
    val title: String,
    val message: String,
    val targetRole: String,
    val channel: String,
    val sentAt: String,
    val isRead: Boolean = false
)
