package com.example.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.sqlite.db.SupportSQLiteDatabase
import com.example.data.dao.CrmDao
import com.example.data.dao.OrgDao
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
        CustomerTimelineEntity::class
    ],
    version = 2,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {

    abstract fun userDao(): UserDao
    abstract fun orgDao(): OrgDao
    abstract fun systemDao(): SystemDao
    abstract fun crmDao(): CrmDao

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
        }
    }
}
