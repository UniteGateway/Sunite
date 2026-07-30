package com.example.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "solar_designs")
data class SolarDesignEntity(
    @PrimaryKey val id: String,
    val leadId: String,
    val customerId: String,
    val customerName: String,
    val siteAddress: String = "1200 Highway 71 East, Austin, TX",
    val roofType: String = "Tin Shed Rooftop",
    val sanctionedLoadKw: Double = 250.0,
    val monthlyBillAmt: Double = 8500.0,
    val tariffRatePerKwh: Double = 0.14,
    val availableRoofAreaSqFt: Double = 25000.0,
    
    // Design Specs
    val recommendedCapacityKw: Double = 200.0,
    val dcCapacityKw: Double = 220.0,
    val acCapacityKw: Double = 200.0,
    
    // Equipment
    val moduleManufacturer: String = "Waaree",
    val moduleType: String = "TOPCon DCR",
    val moduleWattageWp: Int = 550,
    val moduleQuantity: Int = 400,
    val inverterManufacturer: String = "Sungrow",
    val inverterModel: String = "SG110CX (110kW)",
    val inverterQuantity: Int = 2,
    val stringDesign: String = "16 Strings x 25 Modules",
    val mountingStructure: String = "Tin Shed Rail Mount",
    val batteryType: String = "Hybrid LFP Storage",
    val batteryCapacityKwh: Double = 50.0,
    
    // Auto Layout
    val numRows: Int = 16,
    val numCols: Int = 25,
    val panelOrientation: String = "Portrait",
    val tiltAngleDeg: Int = 18,
    val walkwayGapMeters: Double = 1.2,
    val maintenanceGapMeters: Double = 0.8,
    
    // Performance & Generation
    val annualGenerationKwh: Double = 310000.0,
    val performanceRatioPct: Double = 79.5,
    val cufPct: Double = 19.8,
    val areaRequiredSqFt: Double = 14800.0,
    val roofUtilizationPct: Double = 59.2,
    val co2ReductionTonsYr: Double = 245.0,
    val treesSavedEquivalent: Int = 11200,
    
    // Financials
    val projectCostUsd: Double = 175000.0,
    val subsidyUsd: Double = 25000.0,
    val customerContributionUsd: Double = 150000.0,
    val loanEmiUsd: Double = 1850.0,
    val roiPct: Double = 22.4,
    val irrPct: Double = 18.6,
    val npvUsd: Double = 310000.0,
    val paybackYears: Double = 3.8,
    val savings25YearsUsd: Double = 680000.0,
    
    // Engineering
    val sldDrawingNumber: String = "SLD-ATX-2026-099",
    val dcCableLengthMeters: Double = 1200.0,
    val acCableLengthMeters: Double = 350.0,
    val earthingPitsCount: Int = 6,
    val lightningArrestersCount: Int = 2,
    
    // Workflow Status
    val status: String = "Design Approved",
    val createdAt: String = "2026-07-30",
    val updatedAt: String = "2026-07-30"
)
