package com.example.data.dao

import androidx.room.*
import com.example.data.entity.*
import kotlinx.coroutines.flow.Flow

@Dao
interface AfterSalesDao {

    // Warranties
    @Query("SELECT * FROM warranties ORDER BY endDate ASC")
    fun getAllWarranties(): Flow<List<WarrantyEntity>>

    @Query("SELECT * FROM warranties WHERE projectId = :projectId")
    fun getWarrantiesForProject(projectId: String): Flow<List<WarrantyEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertWarranty(warranty: WarrantyEntity)

    // AMC Contracts
    @Query("SELECT * FROM amc_contracts ORDER BY nextVisitDate ASC")
    fun getAllAMCs(): Flow<List<AMCEntity>>

    @Query("SELECT * FROM amc_contracts WHERE projectId = :projectId")
    fun getAMCsForProject(projectId: String): Flow<List<AMCEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAMC(amc: AMCEntity)

    // Service Tickets
    @Query("SELECT * FROM service_tickets ORDER BY createdAt DESC")
    fun getAllTickets(): Flow<List<ServiceTicketEntity>>

    @Query("SELECT * FROM service_tickets WHERE projectId = :projectId ORDER BY createdAt DESC")
    fun getTicketsForProject(projectId: String): Flow<List<ServiceTicketEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTicket(ticket: ServiceTicketEntity)

    @Update
    suspend fun updateTicket(ticket: ServiceTicketEntity)

    // Service Visits
    @Query("SELECT * FROM service_visits WHERE ticketId = :ticketId")
    fun getVisitsForTicket(ticketId: String): Flow<List<ServiceVisitEntity>>

    @Query("SELECT * FROM service_visits ORDER BY visitDate DESC")
    fun getAllVisits(): Flow<List<ServiceVisitEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertVisit(visit: ServiceVisitEntity)

    // Preventive Maintenance
    @Query("SELECT * FROM preventive_maintenances ORDER BY scheduledDate ASC")
    fun getAllPreventiveMaintenances(): Flow<List<PreventiveMaintenanceEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPreventiveMaintenance(pm: PreventiveMaintenanceEntity)

    // Spare Inventory
    @Query("SELECT * FROM spare_inventories ORDER BY category ASC")
    fun getAllSpares(): Flow<List<SpareInventoryEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSpare(spare: SpareInventoryEntity)

    // Warranty Claims
    @Query("SELECT * FROM warranty_claims ORDER BY id DESC")
    fun getAllWarrantyClaims(): Flow<List<WarrantyClaimEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertWarrantyClaim(claim: WarrantyClaimEntity)

    // Customer Feedback
    @Query("SELECT * FROM customer_feedbacks ORDER BY createdAt DESC")
    fun getAllCustomerFeedback(): Flow<List<CustomerFeedbackEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCustomerFeedback(feedback: CustomerFeedbackEntity)

    // Equipment Health
    @Query("SELECT * FROM equipment_healths ORDER BY predictiveMaintenanceScore ASC")
    fun getAllEquipmentHealth(): Flow<List<EquipmentHealthEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertEquipmentHealth(health: EquipmentHealthEntity)

    // Notifications
    @Query("SELECT * FROM service_notifications ORDER BY sentAt DESC")
    fun getAllServiceNotifications(): Flow<List<ServiceNotificationEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertServiceNotification(notification: ServiceNotificationEntity)
}
