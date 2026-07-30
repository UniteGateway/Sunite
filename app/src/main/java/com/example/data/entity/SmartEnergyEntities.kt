package com.example.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "electricity_bills")
data class ElectricityBillEntity(
    @PrimaryKey val id: String,
    val consumerNumber: String,
    val consumerName: String,
    val discom: String,
    val tariffCategory: String,
    val sanctionLoadKw: Double,
    val connectedLoadKw: Double,
    val monthlyConsumptionKwh: Double,
    val maxDemandKw: Double,
    val powerFactor: Double,
    val billingMonth: String,
    val unitsBilled: Double,
    val amountDueUsd: Double,
    val dueDate: String,
    val meterNumber: String,
    val gstAmountUsd: Double,
    val documentUrl: String,
    val confidenceScore: Double,
    val status: String // OCR Extracted, Verified, Synced to CRM
)

@Entity(tableName = "ocr_results")
data class OCRResultEntity(
    @PrimaryKey val id: String,
    val billId: String,
    val rawText: String,
    val extractedFieldsJson: String,
    val confidenceScoresJson: String,
    val processedAt: String
)

@Entity(tableName = "roof_analyses")
data class RoofAnalysisEntity(
    @PrimaryKey val id: String,
    val siteAddress: String,
    val customerName: String,
    val totalRoofAreaSqFt: Double,
    val roofType: String, // Tin Shed, RCC Flat, Tile, Metal
    val shadowPercentage: Double,
    val obstaclesDetected: String, // e.g., "Trees (2), Water Tanks (1), Parapet Wall (0.8m)"
    val slopeAngleDeg: Double,
    val azimuthDeg: Double,
    val tiltAngleDeg: Double,
    val usableAreaSqFt: Double,
    val recommendedCapacityKw: Double,
    val recommendedModuleCount: Int,
    val recommendedInverterSizeKw: Double,
    val expectedAnnualGenerationKwh: Double,
    val roofSuitabilityScore: Int, // 0 - 100
    val imageUrl: String,
    val processedAt: String
)

@Entity(tableName = "ai_recommendations")
data class AIRecommendationEntity(
    @PrimaryKey val id: String,
    val targetType: String, // Solar Design, Up-Sell, Maintenance, Customer Referral
    val targetId: String,
    val title: String,
    val panelBrand: String,
    val moduleTechnology: String,
    val inverterBrand: String,
    val batterySizeKwh: Double,
    val structureType: String,
    val cableSizeMm: String,
    val protectionDevices: String,
    val lightningProtection: String,
    val earthingType: String,
    val boqSummary: String,
    val designNotes: String,
    val confidenceScorePct: Double,
    val createdAt: String
)

@Entity(tableName = "scada_devices")
data class SCADADeviceEntity(
    @PrimaryKey val id: String,
    val deviceName: String,
    val manufacturer: String, // Sungrow, Huawei, Growatt, GoodWe, SMA, ABB, Hitachi, Delta
    val protocol: String, // Modbus TCP, MQTT, REST API, IEC 60870-5-104
    val ipAddress: String,
    val status: String, // Online, Warning, Offline
    val plantId: String,
    val capacityKw: Double,
    val lastPingAt: String
)

@Entity(tableName = "realtime_generations")
data class RealtimeGenerationEntity(
    @PrimaryKey val id: String,
    val plantId: String,
    val plantName: String,
    val livePowerKw: Double,
    val todayGenerationKwh: Double,
    val monthlyGenerationMwh: Double,
    val lifetimeGenerationMwh: Double,
    val gridImportKw: Double,
    val gridExportKw: Double,
    val inverterStatus: String, // Grid Synchronized, Derating, Fault
    val stringStatus: String, // All Strings Normal (16/16)
    val faultCodes: String, // None or E-301 Grid Overvoltage
    val operatingTempC: Double,
    val acVoltage: Double,
    val dcCurrent: Double,
    val frequencyHz: Double,
    val performanceRatioPct: Double,
    val cufPct: Double,
    val availabilityPct: Double,
    val alarmStatus: String, // Normal, Minor, Critical
    val updatedAt: String
)

@Entity(tableName = "equipment_telemetries")
data class EquipmentTelemetryEntity(
    @PrimaryKey val id: String,
    val serialNumber: String,
    val deviceType: String,
    val plantId: String,
    val currentA: Double,
    val voltageV: Double,
    val powerKw: Double,
    val tempC: Double,
    val efficiencyPct: Double,
    val timestamp: String
)

@Entity(tableName = "plant_performances")
data class PlantPerformanceEntity(
    @PrimaryKey val id: String,
    val plantId: String,
    val plantName: String,
    val capacityKw: Double,
    val todayGenKwh: Double,
    val monthlyGenMwh: Double,
    val prPct: Double,
    val cufPct: Double,
    val availabilityPct: Double,
    val revenueUsd: Double,
    val carbonSavingsTons: Double,
    val treesSavedCount: Int,
    val performanceRank: Int,
    val statusCategory: String, // Top Performer, Normal, Underperforming
    val updatedAt: String
)

@Entity(tableName = "predictive_maintenances")
data class PredictiveMaintenanceEntity(
    @PrimaryKey val id: String,
    val equipmentSerial: String,
    val equipmentType: String,
    val plantName: String,
    val failureProbabilityPct: Double,
    val maintenanceScore: Double,
    val remainingUsefulLifeDays: Int,
    val healthScorePct: Double,
    val riskLevel: String, // Low, Medium, High, Critical
    val suggestedRepairAction: String,
    val replacementPartsRequired: String,
    val engineerSkillRequired: String,
    val estResolutionHours: Double,
    val generatedAt: String
)

@Entity(tableName = "chat_conversations")
data class ChatConversationEntity(
    @PrimaryKey val id: String,
    val senderRole: String, // Customer, Partner, Engineer, Finance, Admin
    val userQuery: String,
    val aiResponse: String,
    val category: String, // Warranty, AMC, Quotation, Project, General
    val modelUsed: String, // gemini-3.5-flash
    val timestamp: String
)

@Entity(tableName = "carbon_credits")
data class CarbonCreditEntity(
    @PrimaryKey val id: String,
    val plantId: String,
    val customerName: String,
    val co2OffsetTons: Double,
    val carbonCreditsEarned: Double,
    val equivalentTreesPlanted: Int,
    val recCertificatesIssued: Int,
    val esgScoreImpact: Double,
    val certifiedBy: String, // Verra Carbon Standard / Gold Standard
    val issueDate: String
)

@Entity(tableName = "executive_analytics")
data class ExecutiveAnalyticsEntity(
    @PrimaryKey val id: String,
    val period: String, // Q3 2026
    val revenueForecastUsd: Double,
    val pipelineForecastUsd: Double,
    val salesForecastKw: Double,
    val projectRiskCount: Int,
    val topPartnerName: String,
    val topBranchName: String,
    val engineerProductivityScore: Double,
    val amcAnnualRevenueUsd: Double,
    val totalWarrantyCostUsd: Double,
    val totalServiceCostUsd: Double,
    val totalCarbonOffsetTons: Double,
    val totalEnergyGeneratedMwh: Double,
    val futureCashFlowUsd: Double,
    val generatedAt: String
)
