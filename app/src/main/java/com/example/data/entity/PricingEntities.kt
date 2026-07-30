package com.example.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "pricing_masters")
data class PricingMasterEntity(
    @PrimaryKey val id: String,
    val category: String,
    val itemName: String,
    val unitPriceUsd: Double,
    val unit: String = "Unit",
    val gstRatePct: Double = 18.0,
    val brand: String = "Generic",
    val isActive: Boolean = true
)

@Entity(tableName = "quotation_commercials")
data class QuotationCommercialEntity(
    @PrimaryKey val id: String,
    val designId: String,
    val leadId: String,
    val customerName: String,
    val systemCapacityKw: Double,
    val projectType: String = "Commercial Rooftop",
    
    // Cost Breakdown
    val materialCostUsd: Double,
    val installationCostUsd: Double,
    val transportAndInsuranceUsd: Double,
    val civilAndElectricalUsd: Double,
    val engineeringAndPmgUsd: Double,
    val contingencyUsd: Double,
    val subtotalBaseEpcUsd: Double,
    
    // Margins
    val partnerMarginPct: Double = 5.0,
    val franchiseMarginPct: Double = 3.0,
    val corporateMarginPct: Double = 10.0,
    val totalMarginUsd: Double,
    
    // Taxes & Subsidies
    val gstRatePct: Double = 18.0,
    val gstAmountUsd: Double,
    val subsidyDeductionUsd: Double = 0.0,
    val finalCustomerPriceUsd: Double,
    
    // Finance Loan Specs
    val loanAmountUsd: Double = 0.0,
    val monthlyEmiUsd: Double = 0.0,
    
    // Approval Workflow Status
    val approvalStatus: String = "Draft", // Draft, Pending Sales Approval, Pending Finance Approval, Pending Director Approval, Approved & Ready
    val approvalNotes: String = "Awaiting initial review",
    val createdBy: String = "Sales Manager",
    val createdAt: String = "2026-07-30",
    val updatedAt: String = "2026-07-30"
)

@Entity(tableName = "pricing_rules")
data class PricingRuleEntity(
    @PrimaryKey val id: String,
    val ruleName: String,
    val stateRegion: String,
    val projectType: String,
    val minCapacityKw: Double,
    val maxCapacityKw: Double,
    val priceMultiplier: Double = 1.0,
    val stateSubsidyAmountUsd: Double = 0.0,
    val isActive: Boolean = true
)
