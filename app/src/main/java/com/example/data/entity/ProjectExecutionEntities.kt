package com.example.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "solar_orders")
data class SolarOrderEntity(
    @PrimaryKey val id: String,
    val orderNumber: String,
    val quotationId: String,
    val customerName: String,
    val projectType: String = "Commercial Rooftop",
    val systemCapacityKw: Double,
    val totalOrderValueUsd: Double,
    val advancePaymentUsd: Double,
    val paymentStatus: String = "Advance Received", // Pending Advance, Advance Received, Milestone 2 Paid, Fully Paid
    val orderStatus: String = "Order Confirmed", // Order Confirmed, Processing, Execution In Progress, Completed
    val createdDate: String = "2026-07-29",
    val expectedCommissioningDate: String = "2026-09-15"
)

@Entity(tableName = "solar_projects")
data class SolarProjectEntity(
    @PrimaryKey val id: String,
    val projectNumber: String,
    val orderId: String,
    val customerName: String,
    val customerPhone: String = "+1 (555) 234-5678",
    val siteAddress: String = "742 Evergreen Terrace, Sector 12",
    val projectType: String = "Commercial Rooftop",
    val systemCapacityKw: Double,
    
    // Team Assignments
    val projectManager: String = "David Miller (PM Lead)",
    val epcContractor: String = "Sunite EPC Services Ltd",
    val surveyEngineer: String = "Alex Rivera",
    val installationVendor: String = "Apex Solar Installers",
    val financeLead: String = "Elena Rostova",
    
    // Execution Progress & Stage
    val currentStage: String = "Material Procurement", 
    // Stages: Order Confirmed -> Advance Payment -> Material Procurement -> Material Dispatch -> Site Ready -> Installation Started -> Installation Completed -> Testing -> Net Metering -> Commissioning -> Project Closed
    val overallProgressPct: Double = 35.0,
    val materialStatus: String = "PO Issued & Dispatch In Progress",
    val installationStatus: String = "Site Prep Completed",
    val qualityCheckStatus: String = "Pending QA Inspection",
    val netMeteringStatus: String = "Application Submitted to DISCOM",
    
    // Financials
    val contractValueUsd: Double,
    val totalInvoicedUsd: Double,
    val totalPaidUsd: Double,
    val estimatedMarginUsd: Double,
    
    val startDate: String = "2026-07-30",
    val targetCompletionDate: String = "2026-09-20",
    val updatedAt: String = "2026-07-30"
)

@Entity(tableName = "project_tasks")
data class ProjectTaskEntity(
    @PrimaryKey val id: String,
    val projectId: String,
    val taskName: String,
    val category: String, // Procurement, Civil, Electrical, Net Metering, Testing
    val assignedTo: String,
    val dueDate: String,
    val priority: String = "High", // Critical, High, Medium, Low
    val status: String = "In Progress", // Todo, In Progress, Review, Completed
    val progressPct: Int = 0
)

@Entity(tableName = "purchase_requests")
data class PurchaseRequestEntity(
    @PrimaryKey val id: String,
    val prNumber: String,
    val projectId: String,
    val category: String, // Modules, Inverters, Structures, Cables
    val vendorName: String,
    val totalAmountUsd: Double,
    val status: String = "Approved" // Draft, Pending PM Approval, Approved, Order Placed, Delivered
)

@Entity(tableName = "installation_logs")
data class InstallationLogEntity(
    @PrimaryKey val id: String,
    val projectId: String,
    val logDate: String = "2026-07-30",
    val activityName: String,
    val loggedBy: String,
    val progressUpdatePct: Double,
    val safetyCompliant: Boolean = true,
    val photoUrl: String = "https://images.unsplash.com/photo-1509391365360-2e959784a276",
    val notes: String
)

@Entity(tableName = "commissioning_reports")
data class CommissioningReportEntity(
    @PrimaryKey val id: String,
    val projectId: String,
    val testedCapacityKw: Double,
    val gridFrequencyHz: Double = 60.0,
    val vocVoltageV: Double = 750.0,
    val iscCurrentA: Double = 225.0,
    val insulationResistanceMohm: Double = 150.0,
    val discomApprovalStatus: String = "Approved & Net Meter Installed",
    val customerSignedOff: Boolean = true,
    val commissioningDate: String = "2026-07-30",
    val testedBy: String = "Chief Commissioning Officer"
)
