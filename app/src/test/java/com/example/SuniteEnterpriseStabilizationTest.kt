package com.example

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.example.ai.AiProvider
import com.example.ai.SuniteAiServiceImpl
import com.example.data.AppDatabase
import com.example.data.SuniteRepository
import com.example.data.entity.*
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk = [36])
class SuniteEnterpriseStabilizationTest {

    private lateinit var db: AppDatabase
    private lateinit var repository: SuniteRepository

    @Before
    fun createDb() {
        val context = ApplicationProvider.getApplicationContext<Context>()
        db = Room.inMemoryDatabaseBuilder(context, AppDatabase::class.java)
            .allowMainThreadQueries()
            .build()

        repository = SuniteRepository(
            orgDao = db.orgDao(),
            userDao = db.userDao(),
            crmDao = db.crmDao(),
            solarDesignDao = db.solarDesignDao(),
            systemDao = db.systemDao(),
            pricingDao = db.pricingDao(),
            quotationDao = db.quotationDao(),
            projectExecutionDao = db.projectExecutionDao(),
            afterSalesDao = db.afterSalesDao(),
            smartEnergyDao = db.smartEnergyDao(),
            mobileDao = db.mobileDao(),
            backendDao = db.backendDao()
        )
    }

    @After
    fun closeDb() {
        db.close()
    }

    @Test
    fun `verify database version and initialization`() = runBlocking {
        assertNotNull(db)
        repository.organization.first()
        assertTrue(db.isOpen)
    }

    @Test
    fun `verify organization persistence and flow`() = runBlocking {
        val org = OrganizationEntity(
            id = "org_test",
            companyName = "Sunite Silicon Valley Inc",
            legalName = "Sunite Corp USA",
            taxId = "US-991208",
            registrationNumber = "REG-99102",
            website = "https://sunite.com",
            address = "100 Innovation Way",
            city = "San Jose",
            state = "CA",
            country = "USA",
            contactEmail = "contact@sunite.com",
            phone = "+1 800 555 0199",
            currency = "USD",
            timezone = "PST"
        )
        repository.updateOrganization(org)

        val retrieved = repository.organization.first()
        assertNotNull(retrieved)
        assertEquals("Sunite Silicon Valley Inc", retrieved?.companyName)
        assertEquals("USD", retrieved?.currency)
    }

    @Test
    fun `verify utility bill OCR entity persistence`() = runBlocking {
        val bill = ElectricityBillEntity(
            id = "bill_test_01",
            consumerNumber = "ELEC-TX-100200",
            consumerName = "Tesla Gigafactory 5",
            discom = "Austin Energy",
            tariffCategory = "Commercial High Voltage",
            sanctionLoadKw = 500.0,
            connectedLoadKw = 550.0,
            monthlyConsumptionKwh = 75000.0,
            maxDemandKw = 480.0,
            powerFactor = 0.99,
            billingMonth = "July 2026",
            unitsBilled = 75000.0,
            amountDueUsd = 10500.0,
            dueDate = "2026-08-30",
            meterNumber = "MTR-TX-0092",
            gstAmountUsd = 1890.0,
            documentUrl = "https://sunite.com/doc/bill1.pdf",
            confidenceScore = 99.1,
            status = "Verified"
        )
        repository.addElectricityBill(bill)

        val bills = repository.electricityBills.first()
        assertEquals(1, bills.size)
        assertEquals("Tesla Gigafactory 5", bills[0].consumerName)
        assertEquals(500.0, bills[0].sanctionLoadKw, 0.01)
    }

    @Test
    fun `verify roof analysis entity persistence`() = runBlocking {
        val roof = RoofAnalysisEntity(
            id = "roof_test_01",
            siteAddress = "500 Solar Way, Austin, TX",
            customerName = "Apex Logistics",
            totalRoofAreaSqFt = 40000.0,
            roofType = "Tin Shed",
            shadowPercentage = 1.5,
            obstaclesDetected = "Chillers (2)",
            slopeAngleDeg = 10.0,
            azimuthDeg = 180.0,
            tiltAngleDeg = 15.0,
            usableAreaSqFt = 32000.0,
            recommendedCapacityKw = 350.0,
            recommendedModuleCount = 636,
            recommendedInverterSizeKw = 300.0,
            expectedAnnualGenerationKwh = 525000.0,
            roofSuitabilityScore = 96,
            imageUrl = "https://sunite.com/roof.jpg",
            processedAt = "2026-07-31"
        )
        repository.addRoofAnalysis(roof)

        val roofs = repository.roofAnalyses.first()
        assertEquals(1, roofs.size)
        assertEquals(350.0, roofs[0].recommendedCapacityKw, 0.01)
        assertEquals(96, roofs[0].roofSuitabilityScore)
    }

    @Test
    fun `verify SCADA device and realtime generation telemetry`() = runBlocking {
        val scada = SCADADeviceEntity(
            id = "scada_test_01",
            deviceName = "Sungrow Inverter #1",
            manufacturer = "Sungrow",
            protocol = "Modbus TCP",
            ipAddress = "192.168.1.50",
            status = "Online",
            plantId = "PRJ-2026-001",
            capacityKw = 110.0,
            lastPingAt = "2026-07-31 10:00 AM"
        )
        repository.addSCADADevice(scada)

        val gen = RealtimeGenerationEntity(
            id = "rt_test_01",
            plantId = "PRJ-2026-001",
            plantName = "Austin Clean Energy Hub",
            livePowerKw = 205.4,
            todayGenerationKwh = 1120.0,
            monthlyGenerationMwh = 32.5,
            lifetimeGenerationMwh = 185.0,
            gridImportKw = 0.0,
            gridExportKw = 205.4,
            inverterStatus = "Grid Synchronized",
            stringStatus = "16/16 Strings Normal",
            faultCodes = "None",
            operatingTempC = 42.0,
            acVoltage = 415.0,
            dcCurrent = 280.0,
            frequencyHz = 50.0,
            performanceRatioPct = 85.5,
            cufPct = 22.0,
            availabilityPct = 99.9,
            alarmStatus = "Normal",
            updatedAt = "2026-07-31 10:00 AM"
        )
        repository.addRealtimeGeneration(gen)

        val scadaList = repository.scadaDevices.first()
        val genList = repository.realtimeGenerations.first()

        assertEquals(1, scadaList.size)
        assertEquals("Online", scadaList[0].status)
        assertEquals(1, genList.size)
        assertEquals(205.4, genList[0].livePowerKw, 0.01)
    }

    @Test
    fun `verify AI domain fallback response generation`() = runBlocking {
        val aiService = SuniteAiServiceImpl()

        val billResponse = aiService.processOcrBill("Electricity bill for account 9982104, 38500 kWh, 250 kW load", AiProvider.GEMINI)
        assertTrue(billResponse.contains("Sanctioned Load") || billResponse.contains("Utility Bill Analysis"))

        val roofResponse = aiService.analyzeRoofStructure(25000.0, "Austin TX", AiProvider.GEMINI)
        assertTrue(roofResponse.contains("Roof") || roofResponse.contains("Capacity") || roofResponse.contains("Annual Yield"))
    }

    @Test
    fun `verify Phase 11 backend postgres sync log and api gateway route persistence`() = runBlocking {
        val syncLog = PostgresSyncLogEntity(
            id = "test_log_01",
            tableName = "quotations",
            recordId = "QT-2026-9900",
            syncDirection = "ROOM_TO_POSTGRES",
            syncStatus = "SYNCED",
            latencyMs = 25,
            postgresCluster = "primary-us-east-1.rds.amazonaws.com",
            timestamp = "2026-07-31 12:00 PM"
        )
        repository.addPostgresSyncLog(syncLog)

        val route = ApiGatewayRouteEntity(
            id = "test_route_01",
            endpointPath = "/api/v1/projects",
            httpMethod = "GET",
            controllerName = "ProjectController",
            rateLimitRpm = 300,
            isCachedRedis = true,
            authRequired = true,
            swaggerTag = "Projects",
            status = "ACTIVE"
        )
        repository.addApiGatewayRoute(route)

        val logs = repository.postgresSyncLogs.first()
        val routes = repository.apiGatewayRoutes.first()

        assertEquals(1, logs.size)
        assertEquals("quotations", logs[0].tableName)
        assertEquals(1, routes.size)
        assertEquals("/api/v1/projects", routes[0].endpointPath)
    }
}
