package com.example.data.dao

import androidx.room.*
import com.example.data.entity.SolarDesignEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface SolarDesignDao {
    @Query("SELECT * FROM solar_designs ORDER BY updatedAt DESC")
    fun getAllDesigns(): Flow<List<SolarDesignEntity>>

    @Query("SELECT * FROM solar_designs WHERE id = :id")
    suspend fun getDesignById(id: String): SolarDesignEntity?

    @Query("SELECT * FROM solar_designs WHERE leadId = :leadId")
    fun getDesignsByLeadId(leadId: String): Flow<List<SolarDesignEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertDesign(design: SolarDesignEntity)

    @Update
    suspend fun updateDesign(design: SolarDesignEntity)

    @Query("UPDATE solar_designs SET status = :status, updatedAt = :updatedAt WHERE id = :id")
    suspend fun updateDesignStatus(id: String, status: String, updatedAt: String)

    @Delete
    suspend fun deleteDesign(design: SolarDesignEntity)
}
