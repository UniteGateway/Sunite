package com.example.data.dao

import androidx.room.*
import com.example.data.entity.CustomerEntity
import com.example.data.entity.CustomerTimelineEntity
import com.example.data.entity.LeadEntity
import com.example.data.entity.PartnerEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface CrmDao {
    // PARTNERS
    @Query("SELECT * FROM partners ORDER BY registeredAt DESC")
    fun getAllPartners(): Flow<List<PartnerEntity>>

    @Query("SELECT * FROM partners WHERE id = :id")
    suspend fun getPartnerById(id: String): PartnerEntity?

    @Query("SELECT * FROM partners WHERE partnerType = :type ORDER BY registeredAt DESC")
    fun getPartnersByType(type: String): Flow<List<PartnerEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPartner(partner: PartnerEntity)

    @Update
    suspend fun updatePartner(partner: PartnerEntity)

    @Query("UPDATE partners SET status = :status WHERE id = :id")
    suspend fun updatePartnerStatus(id: String, status: String)

    // CUSTOMERS
    @Query("SELECT * FROM customers ORDER BY createdAt DESC")
    fun getAllCustomers(): Flow<List<CustomerEntity>>

    @Query("SELECT * FROM customers WHERE id = :id")
    suspend fun getCustomerById(id: String): CustomerEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCustomer(customer: CustomerEntity)

    @Update
    suspend fun updateCustomer(customer: CustomerEntity)

    // LEADS
    @Query("SELECT * FROM leads ORDER BY createdAt DESC")
    fun getAllLeads(): Flow<List<LeadEntity>>

    @Query("SELECT * FROM leads WHERE id = :id")
    suspend fun getLeadById(id: String): LeadEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertLead(lead: LeadEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertLeads(leads: List<LeadEntity>)

    @Update
    suspend fun updateLead(lead: LeadEntity)

    @Query("UPDATE leads SET status = :status, updatedAt = :updatedAt WHERE id = :id")
    suspend fun updateLeadStatus(id: String, status: String, updatedAt: String)

    @Query("UPDATE leads SET assignedSurveyEngineer = :surveyEngineer, updatedAt = :updatedAt WHERE id = :id")
    suspend fun assignSurveyEngineer(id: String, surveyEngineer: String, updatedAt: String)

    // TIMELINES
    @Query("SELECT * FROM customer_timelines WHERE customerId = :customerId ORDER BY timestamp DESC")
    fun getTimelineForCustomer(customerId: String): Flow<List<CustomerTimelineEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTimeline(timeline: CustomerTimelineEntity)
}
