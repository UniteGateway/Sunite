package com.example.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.sqlite.db.SupportSQLiteDatabase
import com.example.data.dao.AfterSalesDao
import com.example.data.dao.CrmDao
import com.example.data.dao.OrgDao
import com.example.data.dao.PricingDao
import com.example.data.dao.ProjectExecutionDao
import com.example.data.dao.QuotationDao
import com.example.data.dao.SmartEnergyDao
import com.example.data.dao.SolarDesignDao
import com.example.data.dao.SystemDao
import com.example.data.dao.UserDao
import com.example.data.entity.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Database(
    entities = [
        UserEntity::class,
        OrganizationEntity::class,
        BranchEntity::class,
        DepartmentEntity::class,
        RoleEntity::class,
        NotificationEntity::class,
        ActivityLogEntity::class,
        MasterDataEntity::class,
        TemplateEntity::class,
        PartnerEntity::class,
        CustomerEntity::class,
        LeadEntity::class,
        CustomerTimelineEntity::class,
        SolarDesignEntity::class,
        PricingMasterEntity::class,
        QuotationCommercialEntity::class,
        PricingRuleEntity::class,
        QuotationProposalEntity::class,
        QuotationVersionEntity::class,
        QuotationDeliveryLogEntity::class,
        SolarOrderEntity::class,
        SolarProjectEntity::class,
        ProjectTaskEntity::class,
        PurchaseRequestEntity::class,
        InstallationLogEntity::class,
        CommissioningReportEntity::class,
        WarrantyEntity::class,
        AMCEntity::class,
        ServiceTicketEntity::class,
        ServiceVisitEntity::class,
        PreventiveMaintenanceEntity::class,
        SpareInventoryEntity::class,
        WarrantyClaimEntity::class,
        CustomerFeedbackEntity::class,
        EquipmentHealthEntity::class,
        ServiceNotificationEntity::class,
        ElectricityBillEntity::class,
        OCRResultEntity::class,
        RoofAnalysisEntity::class,
        AIRecommendationEntity::class,
        SCADADeviceEntity::class,
        RealtimeGenerationEntity::class,
        EquipmentTelemetryEntity::class,
        PlantPerformanceEntity::class,
        PredictiveMaintenanceEntity::class,
        ChatConversationEntity::class,
        CarbonCreditEntity::class,
        ExecutiveAnalyticsEntity::class
    ],
    version = 8,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {

    abstract fun userDao(): UserDao
    abstract fun orgDao(): OrgDao
    abstract fun systemDao(): SystemDao
    abstract fun crmDao(): CrmDao
    abstract fun solarDesignDao(): SolarDesignDao
    abstract fun pricingDao(): PricingDao
    abstract fun quotationDao(): QuotationDao
    abstract fun projectExecutionDao(): ProjectExecutionDao
    abstract fun afterSalesDao(): AfterSalesDao
    abstract fun smartEnergyDao(): SmartEnergyDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getDatabase(context: Context, scope: CoroutineScope): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "sunite_uspn_db"
                )
                .addCallback(DatabaseCallback(scope))
                .fallbackToDestructiveMigration()
                .build()
                INSTANCE = instance
                instance
            }
        }

        private class DatabaseCallback(
            private val scope: CoroutineScope
        ) : RoomDatabase.Callback() {
            override fun onCreate(db: SupportSQLiteDatabase) {
                super.onCreate(db)
                INSTANCE?.let { database ->
                    scope.launch(Dispatchers.IO) {
                        populateInitialData(database)
                    }
                }
            }
        }

        suspend fun populateInitialData(db: AppDatabase) {
            val orgDao = db.orgDao()
            val userDao = db.userDao()
            val systemDao = db.systemDao()

            // Organization
            orgDao.insertOrganization(
                OrganizationEntity(
                    id = "org_sunite_01",
                    companyName = "Sunite Energy Systems",
                    legalName = "Unite Solar Partner Network Global Corp",
                    taxId = "US-984210492-EIN",
                    registrationNumber = "DEL-2024-SOLAR-099",
                    website = "https://sunite.io",
                    address = "100 Solar Way, Energy Tech Park",
                    city = "Austin",
                    state = "Texas",
                    country = "United States",
                    contactEmail = "support@sunite.io",
                    phone = "+1 (800) 555-SUNITE",
                    currency = "USD ($)",
                    timezone = "UTC-6 (CST)"
                )
            )

            // Branches
            orgDao.insertBranches(
                listOf(
                    BranchEntity("br_01", "HUB-ATX", "Austin Clean Energy Hub", "Austin", "Texas", "United States", "Marcus Brody", "Active", 142, 38, "+1 512 555 0192"),
                    BranchEntity("br_02", "HUB-SJC", "Silicon Valley Tech Center", "San Jose", "California", "United States", "Siddharth Mehta", "Active", 98, 24, "+1 408 555 0184"),
                    BranchEntity("br_03", "HUB-MUC", "Munich Partner Desk", "Munich", "Bavaria", "Germany", "Karl Weber", "Active", 76, 19, "+49 89 555 0110"),
                    BranchEntity("br_04", "HUB-SYD", "Sydney Pacific Operations", "Sydney", "NSW", "Australia", "Gemma Vance", "Maintenance", 54, 15, "+61 2 555 0144"),
                    BranchEntity("br_05", "HUB-SIN", "Singapore Regional Hub", "Singapore", "Central", "Singapore", "Li Wei", "Active", 88, 22, "+65 6555 0122")
                )
            )

            // Departments
            orgDao.insertDepartments(
                listOf(
                    DepartmentEntity("dept_01", "EXEC", "Executive Management", "Alexander Vance", 8, "Enterprise strategy, partner governance & global operations."),
                    DepartmentEntity("dept_02", "ENG", "Solar Engineering", "David Miller", 42, "Grid compliance, PV array architecture & CAD validations."),
                    DepartmentEntity("dept_03", "PARTNER", "Partner Network Relations", "Elena Rostova", 28, "Vendor onboarding, SLA audits & tier verification."),
                    DepartmentEntity("dept_04", "FIN", "Finance & Tax Administration", "Sophia Chen", 16, "Invoicing, tax withholding, escrow & commission payouts."),
                    DepartmentEntity("dept_05", "SEC", "Cybersecurity & Compliance", "Robert Thorne", 10, "RBAC enforcement, audit logging & MFA policies."),
                    DepartmentEntity("dept_06", "FIELD", "Field Operations & Commissioning", "Carlos Santana", 64, "On-site installation quality, telemetry & IoT sync.")
                )
            )

            // Roles (BRD Compliant)
            orgDao.insertRoles(
                listOf(
                    RoleEntity("role_01", "Super Admin", "Full system access including tenant config, master settings, and audit trails.", 3, "all:manage"),
                    RoleEntity("role_02", "Sales Admin", "Leads, customer opportunities, proposal generation and pipeline management.", 18, "crm:manage,quotes:write,reports:read"),
                    RoleEntity("role_03", "Marketing Partner", "Referral tracking, lead generation and marketing campaign management.", 42, "leads:write,campaigns:read"),
                    RoleEntity("role_04", "Franchise", "Regional franchise hub management, localized partner network oversight.", 12, "franchise:manage,leads:read,projects:read"),
                    RoleEntity("role_05", "EPC Contractor", "Engineering, Procurement, and Construction execution and site milestones.", 28, "epc:manage,projects:write,surveys:read"),
                    RoleEntity("role_06", "Installation Vendor", "Field installation crew scheduling, panel assembly and safety audits.", 35, "vendor:manage,install:write"),
                    RoleEntity("role_07", "Survey Engineer", "Feasibility surveys, roof structural analysis and shading simulation.", 15, "surveys:manage,cad:write"),
                    RoleEntity("role_08", "Finance Team", "Invoicing, escrow, commission payouts, tax withholding and audits.", 10, "finance:manage,escrow:write,audit:read"),
                    RoleEntity("role_09", "Service Engineer", "AMC contracts, warranty claims, inverter telemetry and service tickets.", 22, "service:manage,tickets:write,telemetry:read"),
                    RoleEntity("role_10", "Customer", "Client portal access, generation monitoring, quotes and warranty tracking.", 1200, "portal:read,tickets:write")
                )
            )

            // Users
            userDao.insertUsers(
                listOf(
                    UserEntity("usr_01", "admin@sunite.io", "Alexander Vance", "Super Admin", "Austin Clean Energy Hub", "Executive Management", "+1 512 555 0101", "Active", true, "2026-07-30 08:45 AM"),
                    UserEntity("usr_02", "partner.dir@sunite.io", "Elena Rostova", "Solar Partner Admin", "Silicon Valley Tech Center", "Partner Network Relations", "+1 408 555 0102", "Active", true, "2026-07-30 07:12 AM"),
                    UserEntity("usr_03", "austin.mgr@sunite.io", "Marcus Brody", "Branch Manager", "Austin Clean Energy Hub", "Executive Management", "+1 512 555 0103", "Active", true, "2026-07-29 05:30 PM"),
                    UserEntity("usr_04", "finance.lead@sunite.io", "Sophia Chen", "Finance Auditor", "Austin Clean Energy Hub", "Finance & Tax Administration", "+1 512 555 0104", "Active", true, "2026-07-30 08:10 AM"),
                    UserEntity("usr_05", "tech.lead@sunite.io", "David Miller", "Solar Engineer / Tech Lead", "Silicon Valley Tech Center", "Solar Engineering", "+1 408 555 0105", "Active", false, "2026-07-28 02:15 PM"),
                    UserEntity("usr_06", "weber@sunite.de", "Karl Weber", "Branch Manager", "Munich Partner Desk", "Executive Management", "+49 89 555 0106", "Pending", true, "Never"),
                    UserEntity("usr_07", "sec.officer@sunite.io", "Robert Thorne", "Super Admin", "Austin Clean Energy Hub", "Cybersecurity & Compliance", "+1 512 555 0107", "Active", true, "2026-07-30 09:00 AM"),
                    UserEntity("usr_08", "field.lead@sunite.io", "Carlos Santana", "Solar Engineer / Tech Lead", "Sydney Pacific Operations", "Field Operations & Commissioning", "+61 2 555 0108", "Deactivated", false, "2026-06-12 11:20 AM")
                )
            )

            // Master Data
            systemDao.insertMasterData(
                listOf(
                    MasterDataEntity("md_c1", "COUNTRY", "US", "United States", "North America"),
                    MasterDataEntity("md_c2", "COUNTRY", "DE", "Germany", "Europe"),
                    MasterDataEntity("md_c3", "COUNTRY", "AU", "Australia", "Asia Pacific"),
                    MasterDataEntity("md_c4", "COUNTRY", "SG", "Singapore", "Asia Pacific"),
                    MasterDataEntity("md_s1", "STATE", "TX", "Texas", "US"),
                    MasterDataEntity("md_s2", "STATE", "CA", "California", "US"),
                    MasterDataEntity("md_s3", "STATE", "BY", "Bavaria", "DE"),
                    MasterDataEntity("md_s4", "STATE", "NSW", "New South Wales", "AU"),
                    MasterDataEntity("md_cur1", "CURRENCY", "USD", "US Dollar", "$"),
                    MasterDataEntity("md_cur2", "CURRENCY", "EUR", "Euro", "€"),
                    MasterDataEntity("md_cur3", "CURRENCY", "AUD", "Australian Dollar", "A$"),
                    MasterDataEntity("md_cur4", "CURRENCY", "SGD", "Singapore Dollar", "S$"),
                    MasterDataEntity("md_t1", "TAX", "GST_STANDARD", "Standard GST (Solar Equipment)", "18.00%"),
                    MasterDataEntity("md_t2", "TAX", "VAT_GREEN", "Green Energy Reduced VAT", "5.00%"),
                    MasterDataEntity("md_t3", "TAX", "WHT_PARTNER", "Withholding Tax (Partner Payouts)", "10.00%"),
                    MasterDataEntity("md_b1", "BANK", "JPM", "JPMorgan Chase Enterprise", "SWIFT: CHASUS33"),
                    MasterDataEntity("md_b2", "BANK", "DB", "Deutsche Bank Corporate", "SWIFT: DEUTDEFF"),
                    MasterDataEntity("md_l1", "LANGUAGE", "EN", "English (Global)", "Default"),
                    MasterDataEntity("md_l2", "LANGUAGE", "DE", "German (Deutsch)", "Active")
                )
            )

            // Templates
            systemDao.insertTemplates(
                listOf(
                    TemplateEntity("tpl_01", "EMAIL", "TPL_WELCOME_USER", "Welcome to Sunite Solar Network", "Welcome {user_name} to USPN", "Dear {user_name},\n\nYour account has been provisioned on Sunite Partner Network under branch {branch_code}.\n\nTemporary OTP Code: {otp}\n\nRegards,\nSunite Security Team", "{user_name}, {branch_code}, {otp}"),
                    TemplateEntity("tpl_02", "EMAIL", "TPL_MFA_ALERT", "Security Alert: New Login Attempt", "MFA Login Verification for Sunite", "Hello {user_name},\n\nYour 6-digit MFA passcode is {otp}.\n\nIf you did not initiate this request, contact cybersecurity immediately.", "{user_name}, {otp}"),
                    TemplateEntity("tpl_03", "SMS", "SMS_OTP_LOGIN", "Sunite SMS OTP", "", "Sunite USPN Verification Code: {otp}. Valid for 5 minutes. Do not share.", "{otp}"),
                    TemplateEntity("tpl_04", "WHATSAPP", "WA_PARTNER_INVITE", "WhatsApp Partner Invitation", "", "Hello {partner_name}, you have been invited to join Sunite Solar Ecosystem as {role_name}. Accept here: {invite_link}", "{partner_name}, {role_name}, {invite_link}")
                )
            )

            // Notifications
            systemDao.insertNotifications(
                listOf(
                    NotificationEntity("notif_01", "Branch Maintenance Scheduled", "Sydney Hub (HUB-SYD) scheduled for grid telemetry upgrade on Aug 2.", "SYSTEM", "2026-07-30 08:30 AM", false, "NORMAL"),
                    NotificationEntity("notif_02", "Pending Partner Approval", "Munich Branch Manager Karl Weber account requires Super Admin verification.", "APPROVAL", "2026-07-30 07:15 AM", false, "HIGH"),
                    NotificationEntity("notif_03", "Security Audit Alert", "MFA policy update applied across all Executive & Admin accounts.", "SECURITY", "2026-07-29 04:00 PM", true, "NORMAL"),
                    NotificationEntity("notif_04", "Tax Rule Updated", "Green Energy Reduced VAT rate confirmed for European Branches at 5.00%.", "COMPLIANCE", "2026-07-28 11:45 AM", true, "LOW")
                )
            )

            // Activity Logs
            systemDao.insertActivityLogs(
                listOf(
                    ActivityLogEntity("act_01", "2026-07-30 09:00:12", "admin@sunite.io", "Super Admin", "System Login (MFA Verified)", "SECURITY", "192.168.1.102", "SUCCESS"),
                    ActivityLogEntity("act_02", "2026-07-30 08:42:05", "partner.dir@sunite.io", "Solar Partner Admin", "Updated Branch Profile: Silicon Valley Tech Center", "ORGANIZATION", "10.0.4.88", "SUCCESS"),
                    ActivityLogEntity("act_03", "2026-07-30 08:15:30", "finance.lead@sunite.io", "Finance Auditor", "Exported Master Tax Compliance Report", "TAX", "192.168.1.145", "SUCCESS"),
                    ActivityLogEntity("act_04", "2026-07-30 07:50:18", "unknown@guest.com", "Guest", "Failed Login Attempt (Invalid Credentials)", "SECURITY", "172.56.12.90", "FAILED"),
                    ActivityLogEntity("act_05", "2026-07-29 16:30:00", "sec.officer@sunite.io", "Super Admin", "Role Permissions Matrix Updated: Solar Engineer", "ROLES", "192.168.1.107", "SUCCESS")
                )
            )

            // CRM & Partners Seed Data
            val crmDao = db.crmDao()
            crmDao.insertPartner(
                PartnerEntity(
                    id = "prt_01",
                    partnerType = "Marketing Partner",
                    companyName = "Apex Solar Agency LLC",
                    contactPerson = "Marcus Aurelius",
                    mobile = "+1 512 555 9011",
                    email = "marcus@apexsolar.com",
                    address = "204 Innovation Way",
                    state = "Texas",
                    district = "Travis",
                    city = "Austin",
                    gstNumber = "27AAACS9901F1Z2",
                    panNumber = "ABCDE1234F",
                    bankName = "JPMorgan Chase Enterprise",
                    accountName = "Apex Solar Agency LLC",
                    accountNumber = "9820194812",
                    ifscCode = "CHASUS33",
                    status = "Approved",
                    commissionEarned = 14500.00,
                    activeCustomers = 32,
                    activeProjects = 14,
                    registeredAt = "2026-07-01 10:00 AM"
                )
            )
            crmDao.insertPartner(
                PartnerEntity(
                    id = "prt_02",
                    partnerType = "Franchise",
                    companyName = "Sunite Silicon Valley Hub",
                    contactPerson = "Priya Sharma",
                    mobile = "+1 408 555 8822",
                    email = "priya.s@sunitefranchise.com",
                    address = "101 Clean Energy Blvd",
                    state = "California",
                    district = "Santa Clara",
                    city = "San Jose",
                    gstNumber = "06AABCS8821K1Z9",
                    panNumber = "PRYSH9912K",
                    bankName = "Silicon Valley Bank",
                    accountName = "Sunite SV Franchise",
                    accountNumber = "8810293811",
                    ifscCode = "SVBKUS66",
                    status = "Approved",
                    commissionEarned = 28400.00,
                    activeCustomers = 68,
                    activeProjects = 24,
                    registeredAt = "2026-06-15 09:30 AM"
                )
            )
            crmDao.insertPartner(
                PartnerEntity(
                    id = "prt_03",
                    partnerType = "EPC Contractor",
                    companyName = "Vanguard Engineering & Construction",
                    contactPerson = "David Miller",
                    mobile = "+1 512 555 3344",
                    email = "david.m@vanguardepc.com",
                    address = "500 Industrial Pkwy",
                    state = "Texas",
                    district = "Williamson",
                    city = "Round Rock",
                    gstNumber = "48AABCV1029M1Z3",
                    panNumber = "VNGEC8810M",
                    bankName = "Bank of America",
                    accountName = "Vanguard EPC Corp",
                    accountNumber = "7710293844",
                    ifscCode = "BOFAUS3N",
                    status = "Admin Review",
                    commissionEarned = 8900.00,
                    activeCustomers = 12,
                    activeProjects = 8,
                    registeredAt = "2026-07-28 02:00 PM"
                )
            )

            // Customers
            crmDao.insertCustomer(
                CustomerEntity(
                    id = "cust_01",
                    customerNumber = "CUST-2026-8801",
                    customerName = "GreenTech Logistics Facility",
                    mobile = "+1 512 555 7711",
                    email = "facilities@greentechlog.com",
                    address = "1200 Highway 71 East",
                    state = "Texas",
                    district = "Travis",
                    city = "Austin",
                    consumerNumber = "ELEC-TX-9982104",
                    customerType = "Industrial",
                    partnerId = "prt_01",
                    partnerName = "Apex Solar Agency LLC",
                    createdAt = "2026-07-20 09:00 AM"
                )
            )
            crmDao.insertCustomer(
                CustomerEntity(
                    id = "cust_02",
                    customerNumber = "CUST-2026-8802",
                    customerName = "Dr. Arthur Pendelton Residence",
                    mobile = "+1 408 555 4433",
                    email = "arthur.p@gmail.com",
                    address = "742 Evergreen Terrace",
                    state = "California",
                    district = "Santa Clara",
                    city = "San Jose",
                    consumerNumber = "ELEC-CA-1102938",
                    customerType = "Residential",
                    partnerId = "prt_02",
                    partnerName = "Sunite Silicon Valley Hub",
                    createdAt = "2026-07-22 11:30 AM"
                )
            )

            // Leads
            crmDao.insertLeads(
                listOf(
                    LeadEntity(
                        id = "lead_01",
                        leadNumber = "LEAD-2026-1001",
                        customerId = "cust_01",
                        customerName = "GreenTech Logistics Facility",
                        mobile = "+1 512 555 7711",
                        email = "facilities@greentechlog.com",
                        city = "Austin",
                        state = "Texas",
                        source = "Marketing Partner",
                        partnerId = "prt_01",
                        partnerName = "Apex Solar Agency LLC",
                        sanctionedLoadKw = 250.0,
                        monthlyBillAmt = 8500.0,
                        roofType = "Tin Shed Rooftop",
                        status = "Survey Completed",
                        priority = "HIGH",
                        assignedSalesAdmin = "Sarah Jenkins",
                        assignedSurveyEngineer = "Alex Vance",
                        remarks = "Feasibility study passed. 250kW grid-tied rooftop solar recommended.",
                        createdAt = "2026-07-20 09:15 AM",
                        updatedAt = "2026-07-28 04:00 PM"
                    ),
                    LeadEntity(
                        id = "lead_02",
                        leadNumber = "LEAD-2026-1002",
                        customerId = "cust_02",
                        customerName = "Dr. Arthur Pendelton Residence",
                        mobile = "+1 408 555 4433",
                        email = "arthur.p@gmail.com",
                        city = "San Jose",
                        state = "California",
                        source = "Franchise Referral",
                        partnerId = "prt_02",
                        partnerName = "Sunite Silicon Valley Hub",
                        sanctionedLoadKw = 15.0,
                        monthlyBillAmt = 520.0,
                        roofType = "Tile Roof",
                        status = "Survey Scheduled",
                        priority = "HIGH",
                        assignedSalesAdmin = "Sarah Jenkins",
                        assignedSurveyEngineer = "Alex Vance",
                        remarks = "Site survey scheduled for tomorrow 10:00 AM.",
                        createdAt = "2026-07-22 11:45 AM",
                        updatedAt = "2026-07-29 01:20 PM"
                    ),
                    LeadEntity(
                        id = "lead_03",
                        leadNumber = "LEAD-2026-1003",
                        customerId = "cust_03_temp",
                        customerName = "Horizon Horizon Shopping Center",
                        mobile = "+1 512 555 6600",
                        email = "info@horizoncenter.com",
                        city = "Austin",
                        state = "Texas",
                        source = "Direct Web",
                        sanctionedLoadKw = 120.0,
                        monthlyBillAmt = 3800.0,
                        roofType = "RCC Flat Roof",
                        status = "New Lead",
                        priority = "MEDIUM",
                        assignedSalesAdmin = "Sarah Jenkins",
                        assignedSurveyEngineer = "Unassigned",
                        remarks = "Incoming query from website form.",
                        createdAt = "2026-07-30 08:00 AM",
                        updatedAt = "2026-07-30 08:00 AM"
                    )
                )
            )

            // Customer Timelines
            crmDao.insertTimeline(
                CustomerTimelineEntity(
                    id = "tml_01",
                    customerId = "cust_01",
                    type = "Call",
                    title = "Initial Requirements Discovery Call",
                    description = "Discussed 250kW rooftop installation with Facility Manager.",
                    createdBy = "Sarah Jenkins",
                    timestamp = "2026-07-20 10:30 AM"
                )
            )
            crmDao.insertTimeline(
                CustomerTimelineEntity(
                    id = "tml_02",
                    customerId = "cust_01",
                    type = "Document",
                    title = "Electricity Bill Uploaded",
                    description = "Last 12 months consumption statement attached.",
                    createdBy = "Marcus Aurelius",
                    timestamp = "2026-07-21 02:15 PM"
                )
            )
            crmDao.insertTimeline(
                CustomerTimelineEntity(
                    id = "tml_03",
                    customerId = "cust_01",
                    type = "Meeting",
                    title = "On-site Shadow & Rooftop Feasibility Survey",
                    description = "Survey Engineer completed CAD drone scanning and transformer load test.",
                    createdBy = "Alex Vance",
                    timestamp = "2026-07-27 04:00 PM"
                )
            )

            // Initial Solar Design
            val solarDesignDao = db.solarDesignDao()
            solarDesignDao.insertDesign(
                SolarDesignEntity(
                    id = "dsgn_01",
                    leadId = "lead_01",
                    customerId = "cust_01",
                    customerName = "GreenTech Logistics Facility",
                    siteAddress = "1200 Highway 71 East, Austin, TX",
                    roofType = "Tin Shed Rooftop",
                    sanctionedLoadKw = 250.0,
                    monthlyBillAmt = 8500.0,
                    tariffRatePerKwh = 0.14,
                    availableRoofAreaSqFt = 25000.0,
                    recommendedCapacityKw = 200.0,
                    dcCapacityKw = 220.0,
                    acCapacityKw = 200.0,
                    moduleManufacturer = "Waaree",
                    moduleType = "TOPCon DCR",
                    moduleWattageWp = 550,
                    moduleQuantity = 400,
                    inverterManufacturer = "Sungrow",
                    inverterModel = "SG110CX (110kW)",
                    inverterQuantity = 2,
                    stringDesign = "16 Strings x 25 Modules",
                    mountingStructure = "Tin Shed Rail Mount",
                    batteryType = "Hybrid LFP Storage",
                    batteryCapacityKwh = 50.0,
                    numRows = 16,
                    numCols = 25,
                    panelOrientation = "Portrait",
                    tiltAngleDeg = 18,
                    walkwayGapMeters = 1.2,
                    maintenanceGapMeters = 0.8,
                    annualGenerationKwh = 310000.0,
                    performanceRatioPct = 79.5,
                    cufPct = 19.8,
                    areaRequiredSqFt = 14800.0,
                    roofUtilizationPct = 59.2,
                    co2ReductionTonsYr = 245.0,
                    treesSavedEquivalent = 11200,
                    projectCostUsd = 175000.0,
                    subsidyUsd = 25000.0,
                    customerContributionUsd = 150000.0,
                    loanEmiUsd = 1850.0,
                    roiPct = 22.4,
                    irrPct = 18.6,
                    npvUsd = 310000.0,
                    paybackYears = 3.8,
                    savings25YearsUsd = 680000.0,
                    status = "Design Approved",
                    createdAt = "2026-07-28",
                    updatedAt = "2026-07-30"
                )
            )

            // Initial Pricing Masters
            val pricingDao = db.pricingDao()
            pricingDao.insertPricingMaster(PricingMasterEntity("pm_01", "Solar Modules", "Waaree 550W TOPCon Mono Panel", 0.22, "Wp", 12.0, "Waaree"))
            pricingDao.insertPricingMaster(PricingMasterEntity("pm_02", "Solar Modules", "Adani 540W Mono PERC DCR Panel", 0.24, "Wp", 12.0, "Adani"))
            pricingDao.insertPricingMaster(PricingMasterEntity("pm_03", "Inverters", "Sungrow SG110CX String Inverter (110kW)", 4200.0, "Unit", 18.0, "Sungrow"))
            pricingDao.insertPricingMaster(PricingMasterEntity("pm_04", "Inverters", "Growatt MAX 100KTL3-LV (100kW)", 3800.0, "Unit", 18.0, "Growatt"))
            pricingDao.insertPricingMaster(PricingMasterEntity("pm_05", "Structures", "Aluminum Tin Shed Rail Structure", 0.04, "Wp", 18.0, "Sunite Rail"))
            pricingDao.insertPricingMaster(PricingMasterEntity("pm_06", "DC Cables", "4 sq mm Solar DC Cable UV Resistant", 1.25, "Meter", 18.0, "Polycab"))
            pricingDao.insertPricingMaster(PricingMasterEntity("pm_07", "AC Cables", "3.5C x 185 sq mm XLPE Armored Cable", 18.50, "Meter", 18.0, "Havells"))
            pricingDao.insertPricingMaster(PricingMasterEntity("pm_08", "Civil & Installation", "Turnkey Mechanical & Electrical Commissioning", 0.08, "Wp", 18.0, "Sunite Contracting"))

            // Initial Commercial Quotation
            pricingDao.insertQuotation(
                QuotationCommercialEntity(
                    id = "quot_01",
                    designId = "dsgn_01",
                    leadId = "lead_01",
                    customerName = "GreenTech Logistics Facility",
                    systemCapacityKw = 220.0,
                    projectType = "Commercial Rooftop",
                    materialCostUsd = 105000.0,
                    installationCostUsd = 18000.0,
                    transportAndInsuranceUsd = 4500.0,
                    civilAndElectricalUsd = 12500.0,
                    engineeringAndPmgUsd = 5000.0,
                    contingencyUsd = 2500.0,
                    subtotalBaseEpcUsd = 147500.0,
                    partnerMarginPct = 5.0,
                    franchiseMarginPct = 3.0,
                    corporateMarginPct = 10.0,
                    totalMarginUsd = 26550.0,
                    gstRatePct = 18.0,
                    gstAmountUsd = 31329.0,
                    subsidyDeductionUsd = 25000.0,
                    finalCustomerPriceUsd = 180379.0,
                    loanAmountUsd = 140000.0,
                    monthlyEmiUsd = 1850.0,
                    approvalStatus = "Pending Finance Approval",
                    approvalNotes = "Discount within 5% limit. Awaiting CFO signoff.",
                    createdBy = "Sales Manager",
                    createdAt = "2026-07-29",
                    updatedAt = "2026-07-30"
                )
            )

            // Initial Proposal & Quotation Engine Data (Phase 5)
            val quotationDao = db.quotationDao()
            val prop1 = QuotationProposalEntity(
                id = "QUOT-2026-001",
                quotationNumber = "SUN-QUOT-8801",
                leadId = "lead_01",
                customerId = "cust_01",
                customerName = "GreenTech Logistics Facility",
                customerEmail = "procurement@greentechlogistics.com",
                customerPhone = "+1 (555) 234-5678",
                siteAddress = "742 Evergreen Terrace, Sector 12, Industrial Hub",
                projectType = "Commercial Rooftop",
                systemType = "Grid Tie",
                systemCapacityKw = 220.0,
                solarDesignId = "dsgn_01",
                pricingQuotationId = "quot_01",
                version = "v1.1",
                dailyGenerationKwh = 924.0,
                monthlyGenerationKwh = 27720.0,
                annualGenerationKwh = 332640.0,
                lifetimeGenerationMwh = 8316.0,
                performanceRatioPct = 82.5,
                co2OffsetTonsPerYear = 240.5,
                treesEquivalent = 3850,
                baseEpcCostUsd = 147500.0,
                partnerMarginUsd = 7375.0,
                gstAmountUsd = 31329.0,
                subsidyDeductionUsd = 25000.0,
                finalCustomerPriceUsd = 180379.0,
                monthlySavingsUsd = 3100.0,
                annualSavingsUsd = 37200.0,
                paybackYears = 4.8,
                roiPct = 21.5,
                npvUsd = 412000.0,
                monthlyEmiUsd = 1850.0,
                status = "Sent",
                approvalNotes = "Approved by Finance & Director. Proposal link shared via Email.",
                validityDays = 30,
                createdBy = "Sarah Jenkins (Senior Solar Consultant)",
                createdAt = "2026-07-28",
                updatedAt = "2026-07-30"
            )

            val prop2 = QuotationProposalEntity(
                id = "QUOT-2026-002",
                quotationNumber = "SUN-QUOT-8802",
                leadId = "lead_02",
                customerId = "cust_02",
                customerName = "Apex Warehousing Complex",
                customerEmail = "admin@apexwarehousing.com",
                customerPhone = "+1 (555) 987-6543",
                siteAddress = "88 Logistics Blvd, Suite 400",
                projectType = "Industrial High Voltage",
                systemType = "Grid Tie",
                systemCapacityKw = 500.0,
                solarDesignId = "dsgn_02",
                pricingQuotationId = "quot_02",
                version = "v1.0",
                dailyGenerationKwh = 2100.0,
                monthlyGenerationKwh = 63000.0,
                annualGenerationKwh = 756000.0,
                lifetimeGenerationMwh = 18900.0,
                performanceRatioPct = 83.0,
                co2OffsetTonsPerYear = 540.0,
                treesEquivalent = 8640,
                baseEpcCostUsd = 310000.0,
                partnerMarginUsd = 15500.0,
                gstAmountUsd = 62100.0,
                subsidyDeductionUsd = 0.0,
                finalCustomerPriceUsd = 407100.0,
                monthlySavingsUsd = 7200.0,
                annualSavingsUsd = 86400.0,
                paybackYears = 4.7,
                roiPct = 22.1,
                npvUsd = 985000.0,
                monthlyEmiUsd = 4200.0,
                status = "Customer Accepted",
                approvalNotes = "Customer signed digitally via secure portal.",
                validityDays = 30,
                createdBy = "Michael Chang",
                createdAt = "2026-07-25",
                updatedAt = "2026-07-29"
            )

            quotationDao.insertProposal(prop1)
            quotationDao.insertProposal(prop2)

            // Version history
            quotationDao.insertVersion(QuotationVersionEntity("v_1", "QUOT-2026-001", "v1.0", "Initial Commercial Draft", 220.0, 185000.0, "2026-07-28", "Sarah Jenkins"))
            quotationDao.insertVersion(QuotationVersionEntity("v_2", "QUOT-2026-001", "v1.1", "Applied 5% Partner Promo Discount", 220.0, 180379.0, "2026-07-29", "Sarah Jenkins"))

            // Delivery Logs
            quotationDao.insertDeliveryLog(QuotationDeliveryLogEntity("dl_1", "QUOT-2026-001", "Email", "procurement@greentechlogistics.com", "Delivered", "2026-07-29 09:30"))
            quotationDao.insertDeliveryLog(QuotationDeliveryLogEntity("dl_2", "QUOT-2026-001", "Email", "procurement@greentechlogistics.com", "Opened", "2026-07-29 10:15"))
            quotationDao.insertDeliveryLog(QuotationDeliveryLogEntity("dl_3", "QUOT-2026-001", "WhatsApp", "+15552345678", "Delivered", "2026-07-29 10:16"))

            // Initial Phase 6 Project Execution Data
            val execDao = db.projectExecutionDao()
            val order1 = SolarOrderEntity(
                id = "ORD-2026-001",
                orderNumber = "SUN-ORD-9901",
                quotationId = "QUOT-2026-001",
                customerName = "GreenTech Logistics Facility",
                projectType = "Commercial Rooftop",
                systemCapacityKw = 220.0,
                totalOrderValueUsd = 180379.0,
                advancePaymentUsd = 36000.0,
                paymentStatus = "Advance Received",
                orderStatus = "Execution In Progress",
                createdDate = "2026-07-29",
                expectedCommissioningDate = "2026-09-15"
            )

            val proj1 = SolarProjectEntity(
                id = "PRJ-2026-001",
                projectNumber = "SUN-PRJ-7001",
                orderId = "ORD-2026-001",
                customerName = "GreenTech Logistics Facility",
                customerPhone = "+1 (555) 234-5678",
                siteAddress = "742 Evergreen Terrace, Sector 12, Industrial Hub",
                projectType = "Commercial Rooftop",
                systemCapacityKw = 220.0,
                projectManager = "David Miller (PM Lead)",
                epcContractor = "Sunite EPC Services Ltd",
                surveyEngineer = "Alex Rivera",
                installationVendor = "Apex Solar Installers",
                financeLead = "Elena Rostova",
                currentStage = "Material Procurement",
                overallProgressPct = 35.0,
                materialStatus = "Modules & Inverters Dispatched",
                installationStatus = "Site Structural Mounting Ready",
                qualityCheckStatus = "Pre-Installation Check Cleared",
                netMeteringStatus = "Application Filed with State Grid DISCOM",
                contractValueUsd = 180379.0,
                totalInvoicedUsd = 36000.0,
                totalPaidUsd = 36000.0,
                estimatedMarginUsd = 14500.0,
                startDate = "2026-07-30",
                targetCompletionDate = "2026-09-15",
                updatedAt = "2026-07-30"
            )

            val proj2 = SolarProjectEntity(
                id = "PRJ-2026-002",
                projectNumber = "SUN-PRJ-7002",
                orderId = "ORD-2026-002",
                customerName = "Apex Warehousing Complex",
                customerPhone = "+1 (555) 987-6543",
                siteAddress = "88 Logistics Blvd, Suite 400",
                projectType = "Industrial High Voltage",
                systemCapacityKw = 500.0,
                projectManager = "Sarah Jenkins",
                epcContractor = "Sunite Industrial Power",
                surveyEngineer = "Carlos Mendez",
                installationVendor = "HighVoltage Contracting Co.",
                financeLead = "Elena Rostova",
                currentStage = "Installation Started",
                overallProgressPct = 65.0,
                materialStatus = "Material 100% On-Site",
                installationStatus = "Module Racking 80% Complete",
                qualityCheckStatus = "Electrical Insulation Test Passed",
                netMeteringStatus = "DISCOM Inspection Scheduled",
                contractValueUsd = 407100.0,
                totalInvoicedUsd = 200000.0,
                totalPaidUsd = 200000.0,
                estimatedMarginUsd = 32000.0,
                startDate = "2026-07-15",
                targetCompletionDate = "2026-08-30",
                updatedAt = "2026-07-30"
            )

            execDao.insertOrder(order1)
            execDao.insertProject(proj1)
            execDao.insertProject(proj2)

            // Initial Tasks
            execDao.insertTask(ProjectTaskEntity("tsk_1", "PRJ-2026-001", "Verify Civil Roof Load Capacity", "Civil", "Alex Rivera", "2026-08-02", "High", "Completed", 100))
            execDao.insertTask(ProjectTaskEntity("tsk_2", "PRJ-2026-001", "Issue Purchase Order for Tier-1 PV Modules", "Procurement", "David Miller", "2026-08-05", "Critical", "In Progress", 60))
            execDao.insertTask(ProjectTaskEntity("tsk_3", "PRJ-2026-001", "File DISCOM Net Metering Interconnection App", "Net Metering", "Elena Rostova", "2026-08-10", "High", "In Progress", 40))

            // Initial Purchase Requests
            execDao.insertPurchaseRequest(PurchaseRequestEntity("pr_1", "SUN-PR-9001", "PRJ-2026-001", "Modules", "Waaree Solar Ltd", 98000.0, "Approved"))
            execDao.insertPurchaseRequest(PurchaseRequestEntity("pr_2", "SUN-PR-9002", "PRJ-2026-001", "Inverters", "Sungrow Power", 32000.0, "Order Placed"))

            // Installation Log
            execDao.insertInstallationLog(InstallationLogEntity("log_1", "PRJ-2026-001", "2026-07-30", "Aluminum Rail Mounting Bracket Fitting", "Apex Solar Team Lead", 25.0, true, "https://images.unsplash.com/photo-1509391365360-2e959784a276", "Completed North Array MMS structure installation without incidents."))

            // Commissioning
            execDao.insertCommissioningReport(CommissioningReportEntity("com_1", "PRJ-2026-001", 220.0, 60.0, 750.0, 225.0, 180.0, "Application Submitted", false, "2026-09-15", "Chief Inspector"))

            // Phase 8 After Sales, Warranty & AMC Data
            val afterDao = db.afterSalesDao()

            val w1 = WarrantyEntity("wrn_1", "WRN-2026-001", "PRJ-2026-001", "GreenTech Logistics Facility", "Solar Panels", "WAA-540W-99010", "Waaree Energies", "2026-09-15", "2051-09-15", "Active", 0)
            val w2 = WarrantyEntity("wrn_2", "WRN-2026-002", "PRJ-2026-001", "GreenTech Logistics Facility", "Inverters", "SG-110CX-77041", "Sungrow Power", "2026-09-15", "2036-09-15", "Active", 1)
            val w3 = WarrantyEntity("wrn_3", "WRN-2026-003", "PRJ-2026-002", "Apex Warehousing Complex", "Solar Panels", "JINKO-550W-88120", "Jinko Solar", "2026-08-30", "2051-08-30", "Active", 0)

            afterDao.insertWarranty(w1)
            afterDao.insertWarranty(w2)
            afterDao.insertWarranty(w3)

            val amc1 = AMCEntity("amc_1", "AMC-2026-001", "PRJ-2026-001", "GreenTech Logistics Facility", "Platinum", "Quarterly", "2026-12-15", 4500.0, 810.0, "2027-09-15", "2027-09-15", "Carlos Mendez (Lead Engineer)", 12, "Paid", true)
            val amc2 = AMCEntity("amc_2", "AMC-2026-002", "PRJ-2026-002", "Apex Warehousing Complex", "Gold", "Half-Yearly", "2027-02-28", 7800.0, 1404.0, "2027-08-30", "2027-08-30", "Devon Vance", 24, "Paid", true)

            afterDao.insertAMC(amc1)
            afterDao.insertAMC(amc2)

            val tkt1 = ServiceTicketEntity("tkt_1", "TKT-2026-8801", "PRJ-2026-001", "GreenTech Logistics Facility", "WhatsApp", "Inverter Fault", "High", "Assigned", "Carlos Mendez", "Inverter 2 showing E-301 grid frequency mismatch error during peak load.", "2026-07-30 08:30")
            val tkt2 = ServiceTicketEntity("tkt_2", "TKT-2026-8802", "PRJ-2026-002", "Apex Warehousing Complex", "Customer Portal", "Cleaning", "Medium", "Open", "Unassigned", "Quarterly dust & bird drop cleaning request for East Array panels.", "2026-07-29 14:15")

            afterDao.insertTicket(tkt1)
            afterDao.insertTicket(tkt2)

            val visit1 = ServiceVisitEntity("vst_1", "tkt_1", "PRJ-2026-001", "Carlos Mendez", "2026-07-30", "09:00", "11:30", 18.5, "28.6139° N, 77.2090° E", "https://images.unsplash.com/photo-1509391365360-2e959784a276", "https://images.unsplash.com/photo-1509391365360-2e959784a276", "1x Sungrow SPD Fuse Block", "David Miller", "Completed")

            afterDao.insertVisit(visit1)

            val pm1 = PreventiveMaintenanceEntity("pm_1", "PM-Q3-001", "PRJ-2026-001", "GreenTech Logistics Facility", "Thermal Inspection & Torque Tightening", "Quarterly", "2026-09-30", "Carlos Mendez", "Scheduled", true)
            val pm2 = PreventiveMaintenanceEntity("pm_2", "PM-Q3-002", "PRJ-2026-002", "Apex Warehousing Complex", "Earthing Resistance & SPD Inspection", "Quarterly", "2026-10-15", "Devon Vance", "Scheduled", true)

            afterDao.insertPreventiveMaintenance(pm1)
            afterDao.insertPreventiveMaintenance(pm2)

            val sp1 = SpareInventoryEntity("sp_1", "SP-PV-540", "Waaree 540W Mono PERC Module", "Panels", "Central Warehouse A", 45, 10, 15, 145.0, "Waaree Energies")
            val sp2 = SpareInventoryEntity("sp_2", "SP-INV-SG110", "Sungrow 110kW String Inverter", "Inverters", "Central Warehouse A", 6, 2, 3, 2800.0, "Sungrow Power")
            val sp3 = SpareInventoryEntity("sp_3", "SP-MC4-PAIR", "MC4 Solar Cable Connectors (Pair)", "Connectors", "Central Warehouse B", 350, 50, 100, 3.5, "Stäubli Electrical")

            afterDao.insertSpare(sp1)
            afterDao.insertSpare(sp2)
            afterDao.insertSpare(sp3)

            val claim1 = WarrantyClaimEntity("clm_1", "CLM-2026-101", "wrn_2", "GreenTech Logistics Facility", "Sungrow Power", "SG-110CX-77041", 2800.0, "RMA-SG-9982", "Manufacturer Approved", "TRK-FEDEX-90123")

            afterDao.insertWarrantyClaim(claim1)

            val fb1 = CustomerFeedbackEntity("fb_1", "PRJ-2026-001", "GreenTech Logistics Facility", 5, 5, 5, 5, 10, "Outstanding solar installation and prompt initial service support. Very satisfied!", "https://images.unsplash.com/photo-1509391365360-2e959784a276", "2026-07-29")

            afterDao.insertCustomerFeedback(fb1)

            val eh1 = EquipmentHealthEntity("eh_1", "WAA-540W-99010", "PRJ-2026-001", 1450.0, 0, 0.2, 42.5, 50000.0, 96.5, "2026-07-30 11:00")
            val eh2 = EquipmentHealthEntity("eh_2", "SG-110CX-77041", "PRJ-2026-001", 1420.0, 2, 2.8, 58.0, 18000.0, 72.0, "2026-07-30 11:00")

            afterDao.insertEquipmentHealth(eh1)
            afterDao.insertEquipmentHealth(eh2)

            val ntf1 = ServiceNotificationEntity("ntf_1", "AMC Renewal Due in 45 Days", "AMC Contract AMC-2026-001 for GreenTech Logistics is up for auto-renewal on 2027-09-15.", "Service Manager", "WhatsApp", "2026-07-30 10:00", false)

            afterDao.insertServiceNotification(ntf1)

            // Phase 9 Smart Energy & AI Seed Data
            val smartDao = db.smartEnergyDao()

            val bill1 = ElectricityBillEntity(
                id = "bill_01",
                consumerNumber = "ELEC-TX-9982104",
                consumerName = "GreenTech Logistics Facility",
                discom = "Austin Energy Commercial",
                tariffCategory = "HT Industrial Commercial 11kV",
                sanctionLoadKw = 250.0,
                connectedLoadKw = 280.0,
                monthlyConsumptionKwh = 38500.0,
                maxDemandKw = 210.0,
                powerFactor = 0.98,
                billingMonth = "June 2026",
                unitsBilled = 38500.0,
                amountDueUsd = 5390.0,
                dueDate = "2026-08-15",
                meterNumber = "MTR-ATX-90021",
                gstAmountUsd = 970.2,
                documentUrl = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
                confidenceScore = 98.4,
                status = "Synced to CRM"
            )
            smartDao.insertElectricityBill(bill1)

            val ocr1 = OCRResultEntity(
                id = "ocr_01",
                billId = "bill_01",
                rawText = "AUSTIN ENERGY UTILITY BILL - ACCOUNT 9982104 - CONSUMER: GREENTECH LOGISTICS - SANCTIONED LOAD: 250 kW - MONTHLY KWH: 38,500 - MAX DEMAND: 210 kW - POWER FACTOR: 0.98 - AMOUNT: $5,390.00",
                extractedFieldsJson = "{\"sanctionLoadKw\":250.0,\"monthlyConsumptionKwh\":38500.0,\"discom\":\"Austin Energy Commercial\"}",
                confidenceScoresJson = "{\"consumerNumber\":0.99,\"amountDueUsd\":0.98,\"sanctionLoadKw\":0.97}",
                processedAt = "2026-07-30 08:30"
            )
            smartDao.insertOCRResult(ocr1)

            val roof1 = RoofAnalysisEntity(
                id = "roof_01",
                siteAddress = "742 Evergreen Terrace, Sector 12, Industrial Hub",
                customerName = "GreenTech Logistics Facility",
                totalRoofAreaSqFt = 25000.0,
                roofType = "Tin Shed Rooftop",
                shadowPercentage = 4.2,
                obstaclesDetected = "HVAC Chiller Units (2), Skylights (4), Parapet Wall (0.6m)",
                slopeAngleDeg = 12.0,
                azimuthDeg = 180.0,
                tiltAngleDeg = 18.0,
                usableAreaSqFt = 18500.0,
                recommendedCapacityKw = 220.0,
                recommendedModuleCount = 400,
                recommendedInverterSizeKw = 200.0,
                expectedAnnualGenerationKwh = 332640.0,
                roofSuitabilityScore = 92,
                imageUrl = "https://images.unsplash.com/photo-1509391365360-2e959784a276",
                processedAt = "2026-07-30 09:00"
            )
            smartDao.insertRoofAnalysis(roof1)

            val aiRec1 = AIRecommendationEntity(
                id = "rec_01",
                targetType = "Solar Design Optimization",
                targetId = "dsgn_01",
                title = "220kW TOPCon High Efficiency Array + Dual Sungrow SG110CX",
                panelBrand = "Waaree 550W TOPCon Mono",
                moduleTechnology = "N-Type TOPCon DCR",
                inverterBrand = "Sungrow SG110CX String Inverter",
                batterySizeKwh = 50.0,
                structureType = "Aluminum Rail Elevated Shed Mount",
                cableSizeMm = "1x4 sq mm Solar DC / 3.5C 185 sq mm AC",
                protectionDevices = "1000V DC SPD / Type II AC SPD / DC Isolator Switch",
                lightningProtection = "Early Streamer Emission (ESE) Air Terminal",
                earthingType = "Chemical Gel Earthing Electrode (5 Pits)",
                boqSummary = "400x Waaree 550W, 2x Sungrow 110kW, 800m DC Cable, 50kWh LFP Battery Storage",
                designNotes = "Optimized for minimal cable losses (<1.2%). Yield estimated at 1,512 kWh/kWp/year.",
                confidenceScorePct = 96.8,
                createdAt = "2026-07-30"
            )
            smartDao.insertAIRecommendation(aiRec1)

            val scada1 = SCADADeviceEntity(
                id = "scada_01",
                deviceName = "Main Inverter Gateway SG110-01",
                manufacturer = "Sungrow",
                protocol = "Modbus TCP",
                ipAddress = "192.168.10.45",
                status = "Online",
                plantId = "PRJ-2026-001",
                capacityKw = 110.0,
                lastPingAt = "2026-07-30 11:28 AM"
            )
            val scada2 = SCADADeviceEntity(
                id = "scada_02",
                deviceName = "Secondary Inverter Gateway SG110-02",
                manufacturer = "Sungrow",
                protocol = "Modbus TCP",
                ipAddress = "192.168.10.46",
                status = "Online",
                plantId = "PRJ-2026-001",
                capacityKw = 110.0,
                lastPingAt = "2026-07-30 11:28 AM"
            )
            val scada3 = SCADADeviceEntity(
                id = "scada_03",
                deviceName = "Weather Station Pyranometer & Anemometer",
                manufacturer = "Kipp & Zonen",
                protocol = "MQTT",
                ipAddress = "192.168.10.80",
                status = "Online",
                plantId = "PRJ-2026-001",
                capacityKw = 0.0,
                lastPingAt = "2026-07-30 11:28 AM"
            )
            smartDao.insertSCADADevice(scada1)
            smartDao.insertSCADADevice(scada2)
            smartDao.insertSCADADevice(scada3)

            val rt1 = RealtimeGenerationEntity(
                id = "rt_01",
                plantId = "PRJ-2026-001",
                plantName = "GreenTech Logistics 220kW Solar Plant",
                livePowerKw = 184.2,
                todayGenerationKwh = 940.5,
                monthlyGenerationMwh = 27.8,
                lifetimeGenerationMwh = 142.5,
                gridImportKw = 12.0,
                gridExportKw = 172.2,
                inverterStatus = "Grid Synchronized",
                stringStatus = "All Strings Normal (16/16)",
                faultCodes = "None",
                operatingTempC = 44.5,
                acVoltage = 415.2,
                dcCurrent = 248.0,
                frequencyHz = 50.02,
                performanceRatioPct = 84.2,
                cufPct = 21.5,
                availabilityPct = 99.8,
                alarmStatus = "Normal",
                updatedAt = "2026-07-30 11:30 AM"
            )
            smartDao.insertRealtimeGeneration(rt1)

            val perf1 = PlantPerformanceEntity(
                id = "perf_01",
                plantId = "PRJ-2026-001",
                plantName = "GreenTech Logistics 220kW Rooftop",
                capacityKw = 220.0,
                todayGenKwh = 940.5,
                monthlyGenMwh = 27.8,
                prPct = 84.2,
                cufPct = 21.5,
                availabilityPct = 99.8,
                revenueUsd = 3892.0,
                carbonSavingsTons = 24.5,
                treesSavedCount = 390,
                performanceRank = 1,
                statusCategory = "Top Performer",
                updatedAt = "2026-07-30"
            )
            val perf2 = PlantPerformanceEntity(
                id = "perf_02",
                plantId = "PRJ-2026-002",
                plantName = "Apex Warehousing 500kW Array",
                capacityKw = 500.0,
                todayGenKwh = 2150.0,
                monthlyGenMwh = 62.4,
                prPct = 81.8,
                cufPct = 20.2,
                availabilityPct = 98.5,
                revenueUsd = 8736.0,
                carbonSavingsTons = 54.0,
                treesSavedCount = 860,
                performanceRank = 2,
                statusCategory = "Normal",
                updatedAt = "2026-07-30"
            )
            smartDao.insertPlantPerformance(perf1)
            smartDao.insertPlantPerformance(perf2)

            val pmRisk1 = PredictiveMaintenanceEntity(
                id = "pm_risk_01",
                equipmentSerial = "SG-110CX-77041",
                equipmentType = "Inverter",
                plantName = "GreenTech Logistics 220kW Solar Plant",
                failureProbabilityPct = 18.4,
                maintenanceScore = 82.0,
                remainingUsefulLifeDays = 145,
                healthScorePct = 76.5,
                riskLevel = "Medium",
                suggestedRepairAction = "Inspect DC Surge Protection Device (SPD) fuse block and check cooling fan dust accumulation.",
                replacementPartsRequired = "1x Sungrow SPD Fuse Block (SP-MC4-PAIR)",
                engineerSkillRequired = "Certified Inverter Technician Level 2",
                estResolutionHours = 2.5,
                generatedAt = "2026-07-30 08:00 AM"
            )
            smartDao.insertPredictiveMaintenance(pmRisk1)

            val chat1 = ChatConversationEntity(
                id = "chat_01",
                senderRole = "Sales Engineer",
                userQuery = "What is the optimal DC/AC ratio for a 200kW Commercial Solar Project in Austin Texas?",
                aiResponse = "For Austin, Texas (GHI ~5.2 kWh/m²/day), an optimal DC/AC ratio is 1.15x to 1.25x. For a 200kW AC inverter capacity, pair with 230kWp to 250kWp DC module capacity to maximize annual energy yield while keeping inverter clipping loss under 1.5%.",
                category = "Solar Engineering",
                modelUsed = "gemini-3.5-flash",
                timestamp = "2026-07-30 10:15 AM"
            )
            smartDao.insertChatConversation(chat1)

            val carbon1 = CarbonCreditEntity(
                id = "cc_01",
                plantId = "PRJ-2026-001",
                customerName = "GreenTech Logistics Facility",
                co2OffsetTons = 240.5,
                carbonCreditsEarned = 240.5,
                equivalentTreesPlanted = 3850,
                recCertificatesIssued = 332,
                esgScoreImpact = +14.2,
                certifiedBy = "Verra Carbon Standard (VCS)",
                issueDate = "2026-07-15"
            )
            smartDao.insertCarbonCredit(carbon1)

            val exec1 = ExecutiveAnalyticsEntity(
                id = "exec_01",
                period = "Q3 2026",
                revenueForecastUsd = 1250000.0,
                pipelineForecastUsd = 3400000.0,
                salesForecastKw = 2850.0,
                projectRiskCount = 1,
                topPartnerName = "Sunite Silicon Valley Hub",
                topBranchName = "Austin Clean Energy Hub",
                engineerProductivityScore = 94.2,
                amcAnnualRevenueUsd = 128000.0,
                totalWarrantyCostUsd = 4200.0,
                totalServiceCostUsd = 8500.0,
                totalCarbonOffsetTons = 784.5,
                totalEnergyGeneratedMwh = 1084.0,
                futureCashFlowUsd = 485000.0,
                generatedAt = "2026-07-30 11:00 AM"
            )
            smartDao.insertExecutiveAnalytics(exec1)
        }
    }
}
