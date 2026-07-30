package com.example.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "quotation_proposals")
data class QuotationProposalEntity(
    @PrimaryKey val id: String,
    val quotationNumber: String,
    val leadId: String,
    val customerId: String,
    val customerName: String,
    val customerEmail: String,
    val customerPhone: String,
    val siteAddress: String,
    val projectType: String = "Commercial Rooftop",
    val systemType: String = "Grid Tie",
    val systemCapacityKw: Double,
    val solarDesignId: String = "dsgn_01",
    val pricingQuotationId: String = "quot_01",
    val version: String = "v1.0",
    
    // Technical Specs
    val dailyGenerationKwh: Double,
    val monthlyGenerationKwh: Double,
    val annualGenerationKwh: Double,
    val lifetimeGenerationMwh: Double,
    val performanceRatioPct: Double = 82.5,
    val co2OffsetTonsPerYear: Double,
    val treesEquivalent: Int,
    
    // Commercials
    val baseEpcCostUsd: Double,
    val partnerMarginUsd: Double,
    val gstAmountUsd: Double,
    val subsidyDeductionUsd: Double = 0.0,
    val finalCustomerPriceUsd: Double,
    val monthlySavingsUsd: Double,
    val annualSavingsUsd: Double,
    val paybackYears: Double,
    val roiPct: Double,
    val npvUsd: Double,
    val monthlyEmiUsd: Double = 0.0,
    
    // Status & Workflow
    val status: String = "Draft", // Draft, Pending Sales Approval, Pending Finance Approval, Approved, Sent, Opened, Customer Accepted, Customer Rejected, Expired
    val approvalNotes: String = "Awaiting initial review",
    val validityDays: Int = 30,
    val createdBy: String = "Sales Representative",
    val createdAt: String = "2026-07-30",
    val updatedAt: String = "2026-07-30"
)

@Entity(tableName = "quotation_versions")
data class QuotationVersionEntity(
    @PrimaryKey val id: String,
    val quotationId: String,
    val versionNumber: String,
    val changeSummary: String,
    val systemCapacityKw: Double,
    val finalCustomerPriceUsd: Double,
    val createdAt: String = "2026-07-30",
    val createdBy: String = "Sales Representative"
)

@Entity(tableName = "quotation_delivery_logs")
data class QuotationDeliveryLogEntity(
    @PrimaryKey val id: String,
    val quotationId: String,
    val channel: String, // Email, WhatsApp, Secure Link
    val recipient: String,
    val deliveryStatus: String, // Sent, Delivered, Opened, Accepted, Rejected
    val timestamp: String = "2026-07-30 11:15",
    val ipAddress: String = "192.168.1.102"
)
