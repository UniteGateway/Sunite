package com.example.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "partners")
data class PartnerEntity(
    @PrimaryKey val id: String,
    val partnerType: String, // Marketing Partner, Franchise, EPC Contractor, Installation Vendor, Survey Engineer, Finance Team
    val companyName: String,
    val contactPerson: String,
    val mobile: String,
    val email: String,
    val address: String,
    val state: String,
    val district: String,
    val city: String,
    val gstNumber: String,
    val panNumber: String,
    val cin: String = "",
    val msme: String = "",
    val experienceYears: String = "3+",
    val employeeCount: String = "10-50",
    val bankName: String,
    val accountName: String,
    val accountNumber: String,
    val ifscCode: String,
    val cancelledChequeUrl: String = "cheque_doc_verified.pdf",
    val aadhaarDoc: String = "aadhaar_verified.pdf",
    val panDoc: String = "pan_card_verified.pdf",
    val gstCertDoc: String = "gst_cert_verified.pdf",
    val addressProofDoc: String = "address_proof_verified.pdf",
    val companyRegDoc: String = "company_reg_verified.pdf",
    val agreementSigned: Boolean = true,
    val digitalSignatureUrl: String = "sig_thumbprint.png",
    val status: String = "Pending", // Pending, Document Verification, Admin Review, Approved, Rejected
    val commissionEarned: Double = 0.0,
    val activeCustomers: Int = 0,
    val activeProjects: Int = 0,
    val registeredAt: String
)

@Entity(tableName = "customers")
data class CustomerEntity(
    @PrimaryKey val id: String,
    val customerNumber: String, // e.g. CUST-2026-8801
    val customerName: String,
    val mobile: String,
    val email: String,
    val address: String,
    val state: String,
    val district: String,
    val city: String,
    val gpsCoordinates: String = "37.7749,-122.4194",
    val consumerNumber: String, // Electricity Consumer No
    val customerType: String, // Residential, Commercial, Industrial, Government
    val partnerId: String = "",
    val partnerName: String = "Sunite Direct",
    val createdAt: String,
    val status: String = "Active"
)

@Entity(tableName = "leads")
data class LeadEntity(
    @PrimaryKey val id: String,
    val leadNumber: String, // e.g. LEAD-2026-1042
    val customerId: String,
    val customerName: String,
    val mobile: String,
    val email: String,
    val city: String,
    val state: String,
    val source: String, // Marketing Partner, Franchise Referral, Direct Web, Campaign
    val partnerId: String = "",
    val partnerName: String = "",
    val sanctionedLoadKw: Double = 10.0,
    val monthlyBillAmt: Double = 450.0,
    val roofType: String = "RCC Flat Roof",
    val status: String = "New Lead", // New Lead, Contacted, Qualified, Survey Scheduled, Survey Completed, Quotation Pending, Proposal Approved, Lost
    val priority: String = "HIGH", // HIGH, MEDIUM, LOW
    val assignedSalesAdmin: String = "Sarah Jenkins",
    val assignedSurveyEngineer: String = "Unassigned",
    val remarks: String = "",
    val createdAt: String,
    val updatedAt: String
)

@Entity(tableName = "customer_timelines")
data class CustomerTimelineEntity(
    @PrimaryKey val id: String,
    val customerId: String,
    val type: String, // Call, Meeting, WhatsApp, Email, Document, Note, Activity
    val title: String,
    val description: String,
    val createdBy: String,
    val timestamp: String
)
