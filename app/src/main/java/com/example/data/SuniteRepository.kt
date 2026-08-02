package com.example.data

import com.example.data.dao.AfterSalesDao
import com.example.data.dao.BackendDao
import com.example.data.dao.CrmDao
import com.example.data.dao.MobileDao
import com.example.data.dao.OrgDao
import com.example.data.dao.PricingDao
import com.example.data.dao.ProjectExecutionDao
import com.example.data.dao.QuotationDao
import com.example.data.dao.SmartEnergyDao
import com.example.data.dao.SolarDesignDao
import com.example.data.dao.SystemDao
import com.example.data.dao.UserDao
import com.example.data.entity.*
import kotlinx.coroutines.flow.Flow

class SuniteRepository(
    private val userDao: UserDao,
    private val orgDao: OrgDao,
    private val systemDao: SystemDao,
    private val crmDao: CrmDao,
    private val solarDesignDao: SolarDesignDao,
    private val pricingDao: PricingDao,
    private val quotationDao: QuotationDao,
    private val projectExecutionDao: ProjectExecutionDao,
    private val afterSalesDao: AfterSalesDao,
    private val smartEnergyDao: SmartEnergyDao,
    private val mobileDao: MobileDao,
    private val backendDao: BackendDao
) {
    // Organization
    val organization: Flow<OrganizationEntity?> = orgDao.getOrganizationFlow()
    suspend fun updateOrganization(org: OrganizationEntity) = orgDao.insertOrganization(org)

    // Branches
    val branches: Flow<List<BranchEntity>> = orgDao.getAllBranches()
    suspend fun addBranch(branch: BranchEntity) = orgDao.insertBranch(branch)
    suspend fun updateBranch(branch: BranchEntity) = orgDao.updateBranch(branch)
    suspend fun deleteBranch(id: String) = orgDao.deleteBranch(id)

    // Departments
    val departments: Flow<List<DepartmentEntity>> = orgDao.getAllDepartments()
    suspend fun addDepartment(dept: DepartmentEntity) = orgDao.insertDepartment(dept)

    // Roles
    val roles: Flow<List<RoleEntity>> = orgDao.getAllRoles()
    suspend fun addRole(role: RoleEntity) = orgDao.insertRole(role)
    suspend fun updateRole(role: RoleEntity) = orgDao.updateRole(role)

    // Users
    val users: Flow<List<UserEntity>> = userDao.getAllUsers()
    suspend fun getUserById(id: String) = userDao.getUserById(id)
    suspend fun getUserByEmail(email: String) = userDao.getUserByEmail(email)
    suspend fun addUser(user: UserEntity) = userDao.insertUser(user)
    suspend fun updateUser(user: UserEntity) = userDao.updateUser(user)
    suspend fun deleteUser(id: String) = userDao.deleteUser(id)
    suspend fun updateUserStatus(id: String, status: String) = userDao.updateUserStatus(id, status)

    // Partners
    val partners: Flow<List<PartnerEntity>> = crmDao.getAllPartners()
    fun getPartnersByType(type: String): Flow<List<PartnerEntity>> = crmDao.getPartnersByType(type)
    suspend fun getPartnerById(id: String): PartnerEntity? = crmDao.getPartnerById(id)
    suspend fun addPartner(partner: PartnerEntity) = crmDao.insertPartner(partner)
    suspend fun updatePartner(partner: PartnerEntity) = crmDao.updatePartner(partner)
    suspend fun updatePartnerStatus(id: String, status: String) = crmDao.updatePartnerStatus(id, status)

    // Customers
    val customers: Flow<List<CustomerEntity>> = crmDao.getAllCustomers()
    suspend fun getCustomerById(id: String): CustomerEntity? = crmDao.getCustomerById(id)
    suspend fun addCustomer(customer: CustomerEntity) = crmDao.insertCustomer(customer)
    suspend fun updateCustomer(customer: CustomerEntity) = crmDao.updateCustomer(customer)

    // Leads
    val leads: Flow<List<LeadEntity>> = crmDao.getAllLeads()
    suspend fun getLeadById(id: String): LeadEntity? = crmDao.getLeadById(id)
    suspend fun addLead(lead: LeadEntity) = crmDao.insertLead(lead)
    suspend fun updateLead(lead: LeadEntity) = crmDao.updateLead(lead)
    suspend fun updateLeadStatus(id: String, status: String, updatedAt: String = "2026-07-30") = crmDao.updateLeadStatus(id, status, updatedAt)
    suspend fun assignSurveyEngineer(id: String, surveyEngineer: String, updatedAt: String = "2026-07-30") = crmDao.assignSurveyEngineer(id, surveyEngineer, updatedAt)

    // Timelines
    fun getTimelineForCustomer(customerId: String): Flow<List<CustomerTimelineEntity>> = crmDao.getTimelineForCustomer(customerId)
    suspend fun addCustomerTimeline(timeline: CustomerTimelineEntity) = crmDao.insertTimeline(timeline)

    // Notifications
    val notifications: Flow<List<NotificationEntity>> = systemDao.getAllNotifications()
    suspend fun markNotificationAsRead(id: String) = systemDao.markNotificationAsRead(id)
    suspend fun markAllNotificationsAsRead() = systemDao.markAllNotificationsAsRead()

    // Activity Logs
    val activityLogs: Flow<List<ActivityLogEntity>> = systemDao.getActivityLogs()
    suspend fun logActivity(userEmail: String, userRole: String, action: String, module: String, ipAddress: String = "192.168.1.100", status: String = "SUCCESS") {
        val log = ActivityLogEntity(
            id = "act_" + System.currentTimeMillis(),
            timestamp = "2026-07-30 09:15 AM",
            userEmail = userEmail,
            userRole = userRole,
            action = action,
            module = module,
            ipAddress = ipAddress,
            status = status
        )
        systemDao.insertActivityLog(log)
    }

    // Master Data
    val masterData: Flow<List<MasterDataEntity>> = systemDao.getAllMasterData()
    fun getMasterDataByCategory(category: String) = systemDao.getMasterDataByCategory(category)
    suspend fun addMasterDataItem(item: MasterDataEntity) = systemDao.insertMasterDataItem(item)
    suspend fun deleteMasterDataItem(id: String) = systemDao.deleteMasterDataItem(id)

    // Templates
    val templates: Flow<List<TemplateEntity>> = systemDao.getAllTemplates()
    suspend fun updateTemplate(template: TemplateEntity) = systemDao.updateTemplate(template)

    // Solar Designs
    val solarDesigns: Flow<List<SolarDesignEntity>> = solarDesignDao.getAllDesigns()
    fun getDesignsByLeadId(leadId: String): Flow<List<SolarDesignEntity>> = solarDesignDao.getDesignsByLeadId(leadId)
    suspend fun getDesignById(id: String): SolarDesignEntity? = solarDesignDao.getDesignById(id)
    suspend fun addSolarDesign(design: SolarDesignEntity) = solarDesignDao.insertDesign(design)
    suspend fun updateSolarDesign(design: SolarDesignEntity) = solarDesignDao.updateDesign(design)
    suspend fun updateSolarDesignStatus(id: String, status: String, updatedAt: String = "2026-07-30") = solarDesignDao.updateDesignStatus(id, status, updatedAt)

    // Pricing & Commercials
    val pricingMasters: Flow<List<PricingMasterEntity>> = pricingDao.getAllPricingMasters()
    suspend fun addPricingMaster(master: PricingMasterEntity) = pricingDao.insertPricingMaster(master)
    suspend fun updatePricingMaster(master: PricingMasterEntity) = pricingDao.updatePricingMaster(master)
    suspend fun deletePricingMaster(master: PricingMasterEntity) = pricingDao.deletePricingMaster(master)

    val quotations: Flow<List<QuotationCommercialEntity>> = pricingDao.getAllQuotations()
    suspend fun getQuotationById(id: String): QuotationCommercialEntity? = pricingDao.getQuotationById(id)
    suspend fun addQuotation(quotation: QuotationCommercialEntity) = pricingDao.insertQuotation(quotation)
    suspend fun updateQuotation(quotation: QuotationCommercialEntity) = pricingDao.updateQuotation(quotation)
    suspend fun updateQuotationStatus(id: String, status: String, notes: String, updatedAt: String = "2026-07-30") = pricingDao.updateQuotationStatus(id, status, notes, updatedAt)

    val pricingRules: Flow<List<PricingRuleEntity>> = pricingDao.getAllPricingRules()
    suspend fun addPricingRule(rule: PricingRuleEntity) = pricingDao.insertPricingRule(rule)

    // Quotations & Proposals (Phase 5 Engine)
    val quotationProposals: Flow<List<QuotationProposalEntity>> = quotationDao.getAllProposals()
    suspend fun getQuotationProposalById(id: String): QuotationProposalEntity? = quotationDao.getProposalById(id)
    suspend fun addQuotationProposal(proposal: QuotationProposalEntity) = quotationDao.insertProposal(proposal)
    suspend fun updateQuotationProposal(proposal: QuotationProposalEntity) = quotationDao.updateProposal(proposal)
    suspend fun updateQuotationProposalStatus(id: String, status: String, notes: String, updatedAt: String = "2026-07-30") = quotationDao.updateProposalStatus(id, status, notes, updatedAt)
    suspend fun deleteQuotationProposal(id: String) = quotationDao.deleteProposalById(id)

    fun getVersionsForQuotation(quotationId: String): Flow<List<QuotationVersionEntity>> = quotationDao.getVersionsForQuotation(quotationId)
    suspend fun addQuotationVersion(version: QuotationVersionEntity) = quotationDao.insertVersion(version)

    fun getDeliveryLogsForQuotation(quotationId: String): Flow<List<QuotationDeliveryLogEntity>> = quotationDao.getDeliveryLogsForQuotation(quotationId)
    suspend fun addQuotationDeliveryLog(log: QuotationDeliveryLogEntity) = quotationDao.insertDeliveryLog(log)

    // Project Execution & Order Management (Phase 6)
    val solarOrders: Flow<List<SolarOrderEntity>> = projectExecutionDao.getAllOrders()
    suspend fun addSolarOrder(order: SolarOrderEntity) = projectExecutionDao.insertOrder(order)

    val solarProjects: Flow<List<SolarProjectEntity>> = projectExecutionDao.getAllProjects()
    suspend fun getSolarProjectById(id: String): SolarProjectEntity? = projectExecutionDao.getProjectById(id)
    suspend fun addSolarProject(project: SolarProjectEntity) = projectExecutionDao.insertProject(project)
    suspend fun updateSolarProject(project: SolarProjectEntity) = projectExecutionDao.updateProject(project)
    suspend fun updateSolarProjectStage(id: String, stage: String, progress: Double, updatedAt: String = "2026-07-30") = projectExecutionDao.updateProjectStage(id, stage, progress, updatedAt)

    fun getTasksForProject(projectId: String): Flow<List<ProjectTaskEntity>> = projectExecutionDao.getTasksForProject(projectId)
    suspend fun addTask(task: ProjectTaskEntity) = projectExecutionDao.insertTask(task)
    suspend fun updateTask(task: ProjectTaskEntity) = projectExecutionDao.updateTask(task)

    fun getPurchaseRequestsForProject(projectId: String): Flow<List<PurchaseRequestEntity>> = projectExecutionDao.getPurchaseRequestsForProject(projectId)
    suspend fun addPurchaseRequest(pr: PurchaseRequestEntity) = projectExecutionDao.insertPurchaseRequest(pr)

    fun getInstallationLogsForProject(projectId: String): Flow<List<InstallationLogEntity>> = projectExecutionDao.getInstallationLogsForProject(projectId)
    suspend fun addInstallationLog(log: InstallationLogEntity) = projectExecutionDao.insertInstallationLog(log)

    fun getCommissioningReportForProject(projectId: String): Flow<CommissioningReportEntity?> = projectExecutionDao.getCommissioningReportForProject(projectId)
    suspend fun addCommissioningReport(report: CommissioningReportEntity) = projectExecutionDao.insertCommissioningReport(report)

    // Phase 8 After Sales Service, Warranty & AMC
    val warranties: Flow<List<WarrantyEntity>> = afterSalesDao.getAllWarranties()
    fun getWarrantiesForProject(projectId: String): Flow<List<WarrantyEntity>> = afterSalesDao.getWarrantiesForProject(projectId)
    suspend fun addWarranty(warranty: WarrantyEntity) = afterSalesDao.insertWarranty(warranty)

    val amcContracts: Flow<List<AMCEntity>> = afterSalesDao.getAllAMCs()
    fun getAMCsForProject(projectId: String): Flow<List<AMCEntity>> = afterSalesDao.getAMCsForProject(projectId)
    suspend fun addAMC(amc: AMCEntity) = afterSalesDao.insertAMC(amc)

    val serviceTickets: Flow<List<ServiceTicketEntity>> = afterSalesDao.getAllTickets()
    fun getTicketsForProject(projectId: String): Flow<List<ServiceTicketEntity>> = afterSalesDao.getTicketsForProject(projectId)
    suspend fun addServiceTicket(ticket: ServiceTicketEntity) = afterSalesDao.insertTicket(ticket)
    suspend fun updateServiceTicket(ticket: ServiceTicketEntity) = afterSalesDao.updateTicket(ticket)

    val serviceVisits: Flow<List<ServiceVisitEntity>> = afterSalesDao.getAllVisits()
    fun getVisitsForTicket(ticketId: String): Flow<List<ServiceVisitEntity>> = afterSalesDao.getVisitsForTicket(ticketId)
    suspend fun addServiceVisit(visit: ServiceVisitEntity) = afterSalesDao.insertVisit(visit)

    val preventiveMaintenances: Flow<List<PreventiveMaintenanceEntity>> = afterSalesDao.getAllPreventiveMaintenances()
    suspend fun addPreventiveMaintenance(pm: PreventiveMaintenanceEntity) = afterSalesDao.insertPreventiveMaintenance(pm)

    val spareInventories: Flow<List<SpareInventoryEntity>> = afterSalesDao.getAllSpares()
    suspend fun addSpareInventory(spare: SpareInventoryEntity) = afterSalesDao.insertSpare(spare)

    val warrantyClaims: Flow<List<WarrantyClaimEntity>> = afterSalesDao.getAllWarrantyClaims()
    suspend fun addWarrantyClaim(claim: WarrantyClaimEntity) = afterSalesDao.insertWarrantyClaim(claim)

    val customerFeedbacks: Flow<List<CustomerFeedbackEntity>> = afterSalesDao.getAllCustomerFeedback()
    suspend fun addCustomerFeedback(feedback: CustomerFeedbackEntity) = afterSalesDao.insertCustomerFeedback(feedback)

    val equipmentHealths: Flow<List<EquipmentHealthEntity>> = afterSalesDao.getAllEquipmentHealth()
    suspend fun addEquipmentHealth(health: EquipmentHealthEntity) = afterSalesDao.insertEquipmentHealth(health)

    val serviceNotifications: Flow<List<ServiceNotificationEntity>> = afterSalesDao.getAllServiceNotifications()
    suspend fun addServiceNotification(notification: ServiceNotificationEntity) = afterSalesDao.insertServiceNotification(notification)

    // Phase 9 AI, SCADA, IoT & Smart Energy Platform
    val electricityBills: Flow<List<ElectricityBillEntity>> = smartEnergyDao.getAllElectricityBills()
    suspend fun addElectricityBill(bill: ElectricityBillEntity) = smartEnergyDao.insertElectricityBill(bill)

    fun getOCRResultForBill(billId: String): Flow<OCRResultEntity?> = smartEnergyDao.getOCRResultForBill(billId)
    suspend fun addOCRResult(result: OCRResultEntity) = smartEnergyDao.insertOCRResult(result)

    val roofAnalyses: Flow<List<RoofAnalysisEntity>> = smartEnergyDao.getAllRoofAnalyses()
    suspend fun addRoofAnalysis(analysis: RoofAnalysisEntity) = smartEnergyDao.insertRoofAnalysis(analysis)

    val aiRecommendations: Flow<List<AIRecommendationEntity>> = smartEnergyDao.getAllAIRecommendations()
    suspend fun addAIRecommendation(rec: AIRecommendationEntity) = smartEnergyDao.insertAIRecommendation(rec)

    val scadaDevices: Flow<List<SCADADeviceEntity>> = smartEnergyDao.getAllSCADADevices()
    suspend fun addSCADADevice(device: SCADADeviceEntity) = smartEnergyDao.insertSCADADevice(device)

    val realtimeGenerations: Flow<List<RealtimeGenerationEntity>> = smartEnergyDao.getAllRealtimeGenerations()
    suspend fun addRealtimeGeneration(gen: RealtimeGenerationEntity) = smartEnergyDao.insertRealtimeGeneration(gen)

    val telemetryLogs: Flow<List<EquipmentTelemetryEntity>> = smartEnergyDao.getAllTelemetryLogs()
    suspend fun addTelemetryLog(log: EquipmentTelemetryEntity) = smartEnergyDao.insertTelemetryLog(log)

    val plantPerformances: Flow<List<PlantPerformanceEntity>> = smartEnergyDao.getAllPlantPerformances()
    suspend fun addPlantPerformance(perf: PlantPerformanceEntity) = smartEnergyDao.insertPlantPerformance(perf)

    val smartPredictiveMaintenances: Flow<List<PredictiveMaintenanceEntity>> = smartEnergyDao.getAllPredictiveMaintenances()
    suspend fun addSmartPredictiveMaintenance(pm: PredictiveMaintenanceEntity) = smartEnergyDao.insertPredictiveMaintenance(pm)

    val chatConversations: Flow<List<ChatConversationEntity>> = smartEnergyDao.getAllChatConversations()
    suspend fun addChatConversation(chat: ChatConversationEntity) = smartEnergyDao.insertChatConversation(chat)

    val carbonCredits: Flow<List<CarbonCreditEntity>> = smartEnergyDao.getAllCarbonCredits()
    suspend fun addCarbonCredit(credit: CarbonCreditEntity) = smartEnergyDao.insertCarbonCredit(credit)

    val latestExecutiveAnalytics: Flow<ExecutiveAnalyticsEntity?> = smartEnergyDao.getLatestExecutiveAnalytics()
    suspend fun addExecutiveAnalytics(analytics: ExecutiveAnalyticsEntity) = smartEnergyDao.insertExecutiveAnalytics(analytics)

    // Phase 10 Mobile Platform & Digital Integration Layer
    val mobileDevices: Flow<List<MobileDeviceEntity>> = mobileDao.getAllMobileDevices()
    suspend fun addMobileDevice(device: MobileDeviceEntity) = mobileDao.insertMobileDevice(device)

    val pushNotifications: Flow<List<PushNotificationEntity>> = mobileDao.getAllPushNotifications()
    suspend fun addPushNotification(notification: PushNotificationEntity) = mobileDao.insertPushNotification(notification)

    val offlineSyncRecords: Flow<List<OfflineSyncEntity>> = mobileDao.getAllOfflineSyncRecords()
    suspend fun addOfflineSyncRecord(record: OfflineSyncEntity) = mobileDao.insertOfflineSyncRecord(record)

    val deviceSessions: Flow<List<DeviceSessionEntity>> = mobileDao.getAllDeviceSessions()
    suspend fun addDeviceSession(session: DeviceSessionEntity) = mobileDao.insertDeviceSession(session)

    val digitalDocuments: Flow<List<DocumentEntity>> = mobileDao.getAllDocuments()
    suspend fun addDigitalDocument(doc: DocumentEntity) = mobileDao.insertDocument(doc)

    val digitalSignatures: Flow<List<DigitalSignatureEntity>> = mobileDao.getAllDigitalSignatures()
    suspend fun addDigitalSignature(sig: DigitalSignatureEntity) = mobileDao.insertDigitalSignature(sig)

    // Phase 11 Production Backend, Cloud, DevOps & Security
    val postgresSyncLogs: Flow<List<PostgresSyncLogEntity>> = backendDao.getAllPostgresSyncLogs()
    suspend fun addPostgresSyncLog(log: PostgresSyncLogEntity) = backendDao.insertPostgresSyncLog(log)

    val apiGatewayRoutes: Flow<List<ApiGatewayRouteEntity>> = backendDao.getAllApiGatewayRoutes()
    suspend fun addApiGatewayRoute(route: ApiGatewayRouteEntity) = backendDao.insertApiGatewayRoute(route)

    val cloudStorageConfigs: Flow<List<CloudStorageConfigEntity>> = backendDao.getAllCloudStorageConfigs()
    suspend fun addCloudStorageConfig(config: CloudStorageConfigEntity) = backendDao.insertCloudStorageConfig(config)

    val securityAuditLogs: Flow<List<SecurityAuditLogEntity>> = backendDao.getAllSecurityAuditLogs()
    suspend fun addSecurityAuditLog(log: SecurityAuditLogEntity) = backendDao.insertSecurityAuditLog(log)

    val devOpsDeployments: Flow<List<DevOpsDeploymentEntity>> = backendDao.getAllDevOpsDeployments()
    suspend fun addDevOpsDeployment(deployment: DevOpsDeploymentEntity) = backendDao.insertDevOpsDeployment(deployment)
}

