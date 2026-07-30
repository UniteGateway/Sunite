package com.example.data.dao

import androidx.room.*
import com.example.data.entity.PricingMasterEntity
import com.example.data.entity.PricingRuleEntity
import com.example.data.entity.QuotationCommercialEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface PricingDao {
    // Pricing Masters
    @Query("SELECT * FROM pricing_masters ORDER BY category ASC, itemName ASC")
    fun getAllPricingMasters(): Flow<List<PricingMasterEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPricingMaster(master: PricingMasterEntity)

    @Update
    suspend fun updatePricingMaster(master: PricingMasterEntity)

    @Delete
    suspend fun deletePricingMaster(master: PricingMasterEntity)

    // Quotation Commercials
    @Query("SELECT * FROM quotation_commercials ORDER BY updatedAt DESC")
    fun getAllQuotations(): Flow<List<QuotationCommercialEntity>>

    @Query("SELECT * FROM quotation_commercials WHERE id = :id")
    suspend fun getQuotationById(id: String): QuotationCommercialEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertQuotation(quotation: QuotationCommercialEntity)

    @Update
    suspend fun updateQuotation(quotation: QuotationCommercialEntity)

    @Query("UPDATE quotation_commercials SET approvalStatus = :status, approvalNotes = :notes, updatedAt = :updatedAt WHERE id = :id")
    suspend fun updateQuotationStatus(id: String, status: String, notes: String, updatedAt: String)

    // Pricing Rules
    @Query("SELECT * FROM pricing_rules ORDER BY stateRegion ASC")
    fun getAllPricingRules(): Flow<List<PricingRuleEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPricingRule(rule: PricingRuleEntity)
}
