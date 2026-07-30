package com.example.data.dao

import androidx.room.*
import com.example.data.entity.*
import kotlinx.coroutines.flow.Flow

@Dao
interface SmartEnergyDao {
    // 1. Bills & OCR
    @Query("SELECT * FROM electricity_bills ORDER BY dueDate DESC")
    fun getAllElectricityBills(): Flow<List<ElectricityBillEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertElectricityBill(bill: ElectricityBillEntity)

    @Query("SELECT * FROM ocr_results WHERE billId = :billId")
    fun getOCRResultForBill(billId: String): Flow<OCRResultEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOCRResult(result: OCRResultEntity)

    // 2. Roof Analysis
    @Query("SELECT * FROM roof_analyses ORDER BY processedAt DESC")
    fun getAllRoofAnalyses(): Flow<List<RoofAnalysisEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRoofAnalysis(analysis: RoofAnalysisEntity)

    // 3. AI Recommendations
    @Query("SELECT * FROM ai_recommendations ORDER BY createdAt DESC")
    fun getAllAIRecommendations(): Flow<List<AIRecommendationEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAIRecommendation(recommendation: AIRecommendationEntity)

    // 4. SCADA & IoT
    @Query("SELECT * FROM scada_devices ORDER BY status ASC")
    fun getAllSCADADevices(): Flow<List<SCADADeviceEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSCADADevice(device: SCADADeviceEntity)

    @Query("SELECT * FROM realtime_generations ORDER BY livePowerKw DESC")
    fun getAllRealtimeGenerations(): Flow<List<RealtimeGenerationEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRealtimeGeneration(gen: RealtimeGenerationEntity)

    @Query("SELECT * FROM equipment_telemetries ORDER BY timestamp DESC")
    fun getAllTelemetryLogs(): Flow<List<EquipmentTelemetryEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTelemetryLog(log: EquipmentTelemetryEntity)

    // 5. Plant Performance
    @Query("SELECT * FROM plant_performances ORDER BY performanceRank ASC")
    fun getAllPlantPerformances(): Flow<List<PlantPerformanceEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPlantPerformance(perf: PlantPerformanceEntity)

    // 6. Predictive Maintenance
    @Query("SELECT * FROM predictive_maintenances ORDER BY failureProbabilityPct DESC")
    fun getAllPredictiveMaintenances(): Flow<List<PredictiveMaintenanceEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPredictiveMaintenance(pm: PredictiveMaintenanceEntity)

    // 7. Chat AI Assistant
    @Query("SELECT * FROM chat_conversations ORDER BY timestamp DESC")
    fun getAllChatConversations(): Flow<List<ChatConversationEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertChatConversation(chat: ChatConversationEntity)

    // 8. Carbon Credits
    @Query("SELECT * FROM carbon_credits ORDER BY issueDate DESC")
    fun getAllCarbonCredits(): Flow<List<CarbonCreditEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCarbonCredit(credit: CarbonCreditEntity)

    // 9. Executive Analytics
    @Query("SELECT * FROM executive_analytics ORDER BY generatedAt DESC LIMIT 1")
    fun getLatestExecutiveAnalytics(): Flow<ExecutiveAnalyticsEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertExecutiveAnalytics(analytics: ExecutiveAnalyticsEntity)
}
