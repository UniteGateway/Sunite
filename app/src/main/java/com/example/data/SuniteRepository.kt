package com.example.data

import com.example.data.dao.CrmDao
import com.example.data.dao.OrgDao
import com.example.data.dao.SystemDao
import com.example.data.dao.UserDao
import com.example.data.entity.*
import kotlinx.coroutines.flow.Flow

class SuniteRepository(
    private val userDao: UserDao,
    private val orgDao: OrgDao,
    private val systemDao: SystemDao,
    private val crmDao: CrmDao
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
}

