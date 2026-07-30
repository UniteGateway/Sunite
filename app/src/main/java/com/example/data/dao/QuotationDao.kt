package com.example.data.dao

import androidx.room.*
import com.example.data.entity.QuotationDeliveryLogEntity
import com.example.data.entity.QuotationProposalEntity
import com.example.data.entity.QuotationVersionEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface QuotationDao {
    @Query("SELECT * FROM quotation_proposals ORDER BY updatedAt DESC")
    fun getAllProposals(): Flow<List<QuotationProposalEntity>>

    @Query("SELECT * FROM quotation_proposals WHERE id = :id")
    suspend fun getProposalById(id: String): QuotationProposalEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertProposal(proposal: QuotationProposalEntity)

    @Update
    suspend fun updateProposal(proposal: QuotationProposalEntity)

    @Query("UPDATE quotation_proposals SET status = :status, approvalNotes = :notes, updatedAt = :updatedAt WHERE id = :id")
    suspend fun updateProposalStatus(id: String, status: String, notes: String, updatedAt: String)

    @Query("DELETE FROM quotation_proposals WHERE id = :id")
    suspend fun deleteProposalById(id: String)

    // Versions
    @Query("SELECT * FROM quotation_versions WHERE quotationId = :quotationId ORDER BY createdAt DESC")
    fun getVersionsForQuotation(quotationId: String): Flow<List<QuotationVersionEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertVersion(version: QuotationVersionEntity)

    // Delivery Logs
    @Query("SELECT * FROM quotation_delivery_logs WHERE quotationId = :quotationId ORDER BY timestamp DESC")
    fun getDeliveryLogsForQuotation(quotationId: String): Flow<List<QuotationDeliveryLogEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertDeliveryLog(log: QuotationDeliveryLogEntity)
}
