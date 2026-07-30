package com.example.ui.screens.modules

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ai.AiProvider
import com.example.ai.SuniteAiServiceImpl
import com.example.data.SuniteRepository
import com.example.data.entity.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SmartEnergyIntelligenceScreen(
    repository: SuniteRepository,
    initialTab: Int = 0
) {
    var selectedTab by remember { mutableIntStateOf(initialTab) }
    val scope = rememberCoroutineScope()
    val aiService = remember { SuniteAiServiceImpl() }
    var selectedProvider by remember { mutableStateOf(AiProvider.GEMINI) }

    // Data observation from Room Repository
    val bills by repository.electricityBills.collectAsState(initial = emptyList())
    val roofAnalyses by repository.roofAnalyses.collectAsState(initial = emptyList())
    val aiRecs by repository.aiRecommendations.collectAsState(initial = emptyList())
    val scadaDevices by repository.scadaDevices.collectAsState(initial = emptyList())
    val realtimeGens by repository.realtimeGenerations.collectAsState(initial = emptyList())
    val plantPerfs by repository.plantPerformances.collectAsState(initial = emptyList())
    val predictiveMaint by repository.smartPredictiveMaintenances.collectAsState(initial = emptyList())
    val chatConvs by repository.chatConversations.collectAsState(initial = emptyList())
    val carbonCredits by repository.carbonCredits.collectAsState(initial = emptyList())
    val execAnalytics by repository.latestExecutiveAnalytics.collectAsState(initial = null)

    val tabs = listOf(
        "Executive AI",
        "Utility OCR",
        "Roof CAD",
        "Design Copilot",
        "SCADA Telemetry",
        "Plant Energy",
        "Predictive Maint",
        "GenAI Assistant"
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
    ) {
        // Top Banner / Header Controls
        Surface(
            tonalElevation = 2.dp,
            shadowElevation = 1.dp,
            color = MaterialTheme.colorScheme.surface
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Default.AutoAwesome,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.primary,
                                modifier = Modifier.size(26.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "Phase 9: Smart Energy & AI SCADA Platform",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        Text(
                            text = "OCR, Roof Analytics, SCADA Telemetry & GenAI Intelligence",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }

                    // Provider Selector Chip
                    Box {
                        var expandedProviderMenu by remember { mutableStateOf(false) }
                        AssistChip(
                            onClick = { expandedProviderMenu = true },
                            label = {
                                Text(
                                    text = selectedProvider.name,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.SemiBold
                                )
                            },
                            leadingIcon = {
                                Icon(
                                    imageVector = Icons.Default.Memory,
                                    contentDescription = null,
                                    tint = MaterialTheme.colorScheme.primary,
                                    modifier = Modifier.size(16.dp)
                                )
                            },
                            trailingIcon = {
                                Icon(
                                    imageVector = Icons.Default.ArrowDropDown,
                                    contentDescription = null,
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                        )

                        DropdownMenu(
                            expanded = expandedProviderMenu,
                            onDismissRequest = { expandedProviderMenu = false }
                        ) {
                            AiProvider.values().forEach { provider ->
                                DropdownMenuItem(
                                    text = { Text(provider.displayName, fontSize = 13.sp) },
                                    onClick = {
                                        selectedProvider = provider
                                        expandedProviderMenu = false
                                    },
                                    leadingIcon = {
                                        if (selectedProvider == provider) {
                                            Icon(Icons.Default.Check, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                                        }
                                    }
                                )
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(10.dp))

                // Scrollable Tabs Bar
                ScrollableTabRow(
                    selectedTabIndex = selectedTab,
                    edgePadding = 0.dp,
                    divider = {}
                ) {
                    tabs.forEachIndexed { index, title ->
                        Tab(
                            selected = selectedTab == index,
                            onClick = { selectedTab = index },
                            text = {
                                Text(
                                    text = title,
                                    fontWeight = if (selectedTab == index) FontWeight.Bold else FontWeight.Normal,
                                    fontSize = 13.sp
                                )
                            }
                        )
                    }
                }
            }
        }

        // Tab Content
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            when (selectedTab) {
                0 -> ExecutiveAiTabContent(execAnalytics, carbonCredits, aiRecs)
                1 -> UtilityOcrTabContent(bills, repository, aiService, selectedProvider)
                2 -> RoofCadTabContent(roofAnalyses, repository, aiService, selectedProvider)
                3 -> DesignCopilotTabContent(aiRecs, repository, aiService, selectedProvider)
                4 -> ScadaTelemetryTabContent(scadaDevices, realtimeGens, repository)
                5 -> PlantEnergyTabContent(plantPerfs)
                6 -> PredictiveMaintTabContent(predictiveMaint, repository)
                7 -> GenAiAssistantTabContent(chatConvs, repository, aiService, selectedProvider)
            }
        }
    }
}

// ==========================================
// TAB 0: EXECUTIVE AI & CARBON INTELLIGENCE
// ==========================================
@Composable
fun ExecutiveAiTabContent(
    exec: ExecutiveAnalyticsEntity?,
    carbonCredits: List<CarbonCreditEntity>,
    aiRecs: List<AIRecommendationEntity>
) {
    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Card(
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.6f)
                ),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(
                                text = "Executive Intelligence & ESG Analytics",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "Period: ${exec?.period ?: "Q3 2026"} | Last Synced: Today",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                        SuggestionChip(
                            onClick = {},
                            label = { Text("Verra Certified", fontSize = 11.sp, fontWeight = FontWeight.Bold) },
                            icon = { Icon(Icons.Default.Verified, contentDescription = null, tint = SuniteSuccess, modifier = Modifier.size(14.dp)) }
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        KpiTile(
                            title = "Revenue Forecast",
                            value = "$${String.format("%,.0f", exec?.revenueForecastUsd ?: 1250000.0)}",
                            subtitle = "Pipeline: $${String.format("%,.0f", exec?.pipelineForecastUsd ?: 3400000.0)}",
                            icon = Icons.Default.TrendingUp,
                            color = MaterialTheme.colorScheme.primary,
                            modifier = Modifier.weight(1f)
                        )
                        KpiTile(
                            title = "CO2 Offset",
                            value = "${exec?.totalCarbonOffsetTons ?: 784.5} Tons",
                            subtitle = "${exec?.totalEnergyGeneratedMwh ?: 1084.0} MWh Generated",
                            icon = Icons.Default.Park,
                            color = SuniteSuccess,
                            modifier = Modifier.weight(1f)
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        KpiTile(
                            title = "Target Capacity",
                            value = "${exec?.salesForecastKw ?: 2850.0} kW",
                            subtitle = "Top Hub: ${exec?.topBranchName ?: "Austin"}",
                            icon = Icons.Default.WbSunny,
                            color = SuniteWarning,
                            modifier = Modifier.weight(1f)
                        )
                        KpiTile(
                            title = "AMC Contract Value",
                            value = "$${String.format("%,.0f", exec?.amcAnnualRevenueUsd ?: 128000.0)}/yr",
                            subtitle = "Productivity: ${exec?.engineerProductivityScore ?: 94.2}%",
                            icon = Icons.Default.Payments,
                            color = MaterialTheme.colorScheme.tertiary,
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }
        }

        item {
            Text(
                text = "Carbon Credit & ESG Impact Ledger",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Bold
            )
        }

        items(carbonCredits) { credit ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = credit.customerName,
                            fontWeight = FontWeight.Bold,
                            fontSize = 15.sp
                        )
                        Text(
                            text = "Plant ID: ${credit.plantId} • Certified by ${credit.certifiedBy}",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                            BadgeChip(text = "${credit.co2OffsetTons} Tons CO2", color = SuniteSuccess)
                            BadgeChip(text = "${credit.equivalentTreesPlanted} Trees", color = MaterialTheme.colorScheme.primary)
                            BadgeChip(text = "+${credit.esgScoreImpact} ESG Score", color = SuniteWarning)
                        }
                    }

                    Column(horizontalAlignment = Alignment.End) {
                        Text(
                            text = "${credit.carbonCreditsEarned} Credits",
                            fontWeight = FontWeight.Bold,
                            color = SuniteSuccess,
                            fontSize = 15.sp
                        )
                        Text(
                            text = "Issued: ${credit.issueDate}",
                            fontSize = 11.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }
    }
}

// ==========================================
// TAB 1: UTILITY BILL OCR PROCESSING
// ==========================================
@Composable
fun UtilityOcrTabContent(
    bills: List<ElectricityBillEntity>,
    repository: SuniteRepository,
    aiService: SuniteAiServiceImpl,
    provider: AiProvider
) {
    val scope = rememberCoroutineScope()
    var isProcessing by remember { mutableStateOf(false) }

    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Module 1: OCR Utility Bill Processing",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Extract sanctioned load, monthly consumption, DISCOM & peak power factor automatically.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Button(
                        onClick = {
                            scope.launch {
                                isProcessing = true
                                val newBillId = "bill_" + System.currentTimeMillis()
                                val bill = ElectricityBillEntity(
                                    id = newBillId,
                                    consumerNumber = "ELEC-TX-" + (1000000..9999999).random(),
                                    consumerName = "Apex Logistics Facility",
                                    discom = "Austin Energy Commercial",
                                    tariffCategory = "Commercial High Voltage 11kV",
                                    sanctionLoadKw = 180.0,
                                    connectedLoadKw = 210.0,
                                    monthlyConsumptionKwh = 28500.0,
                                    maxDemandKw = 165.0,
                                    powerFactor = 0.97,
                                    billingMonth = "July 2026",
                                    unitsBilled = 28500.0,
                                    amountDueUsd = 3990.0,
                                    dueDate = "2026-08-30",
                                    meterNumber = "MTR-ATX-88012",
                                    gstAmountUsd = 718.2,
                                    documentUrl = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
                                    confidenceScore = 98.2,
                                    status = "Synced to CRM"
                                )
                                repository.addElectricityBill(bill)
                                isProcessing = false
                            }
                        },
                        enabled = !isProcessing,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        if (isProcessing) {
                            CircularProgressIndicator(modifier = Modifier.size(18.dp), color = Color.White)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Processing OCR Extraction...")
                        } else {
                            Icon(Icons.Default.CloudUpload, contentDescription = null)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Upload Utility Bill PDF / Scan (Auto-OCR)")
                        }
                    }
                }
            }
        }

        item {
            Text(
                text = "Extracted Electricity Bills (${bills.size})",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Bold
            )
        }

        items(bills) { bill ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(text = bill.consumerName, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                            Text(text = "A/C: ${bill.consumerNumber} • ${bill.discom}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        SuggestionChip(
                            onClick = {},
                            label = { Text("${bill.confidenceScore}% Confidence", fontSize = 11.sp) },
                            icon = { Icon(Icons.Default.CheckCircle, contentDescription = null, tint = SuniteSuccess, modifier = Modifier.size(14.dp)) }
                        )
                    }

                    HorizontalDivider(modifier = Modifier.padding(vertical = 10.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        MetricColumn("Sanctioned Load", "${bill.sanctionLoadKw} kW")
                        MetricColumn("Monthly KWh", "${bill.monthlyConsumptionKwh.toInt()} kWh")
                        MetricColumn("Power Factor", "${bill.powerFactor}")
                        MetricColumn("Amount Due", "$${bill.amountDueUsd}")
                    }
                }
            }
        }
    }
}

// ==========================================
// TAB 2: ROOF CAD & SHADING ANALYSIS
// ==========================================
@Composable
fun RoofCadTabContent(
    roofs: List<RoofAnalysisEntity>,
    repository: SuniteRepository,
    aiService: SuniteAiServiceImpl,
    provider: AiProvider
) {
    val scope = rememberCoroutineScope()
    var isAnalyzing by remember { mutableStateOf(false) }

    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Module 2: AI Roof & Shading Analysis Engine",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Automated satellite roof vectorization, obstacle detection & solar capacity calculation.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Button(
                        onClick = {
                            scope.launch {
                                isAnalyzing = true
                                val newRoof = RoofAnalysisEntity(
                                    id = "roof_" + System.currentTimeMillis(),
                                    siteAddress = "100 Silicon Valley Way, San Jose, CA",
                                    customerName = "Apex Commercial Complex",
                                    totalRoofAreaSqFt = 32000.0,
                                    roofType = "RCC Flat Roof",
                                    shadowPercentage = 2.8,
                                    obstaclesDetected = "HVAC Chillers (3), Solar Water Heater (1), Water Tanks (2)",
                                    slopeAngleDeg = 5.0,
                                    azimuthDeg = 180.0,
                                    tiltAngleDeg = 15.0,
                                    usableAreaSqFt = 24500.0,
                                    recommendedCapacityKw = 280.0,
                                    recommendedModuleCount = 508,
                                    recommendedInverterSizeKw = 250.0,
                                    expectedAnnualGenerationKwh = 420000.0,
                                    roofSuitabilityScore = 95,
                                    imageUrl = "https://images.unsplash.com/photo-1509391365360-2e959784a276",
                                    processedAt = "2026-07-30 11:30"
                                )
                                repository.addRoofAnalysis(newRoof)
                                isAnalyzing = false
                            }
                        },
                        enabled = !isAnalyzing,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        if (isAnalyzing) {
                            CircularProgressIndicator(modifier = Modifier.size(18.dp), color = Color.White)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Analyzing Satellite & CAD Roof Data...")
                        } else {
                            Icon(Icons.Default.Satellite, contentDescription = null)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Run Satellite Roof Feasibility AI Analysis")
                        }
                    }
                }
            }
        }

        items(roofs) { roof ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(text = roof.customerName, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                            Text(text = roof.siteAddress, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        BadgeChip(
                            text = "${roof.roofSuitabilityScore}/100 Suitability",
                            color = if (roof.roofSuitabilityScore > 85) SuniteSuccess else SuniteWarning
                        )
                    }

                    HorizontalDivider(modifier = Modifier.padding(vertical = 10.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        MetricColumn("Total Area", "${roof.totalRoofAreaSqFt.toInt()} sq ft")
                        MetricColumn("Usable Area", "${roof.usableAreaSqFt.toInt()} sq ft")
                        MetricColumn("Shadow Loss", "${roof.shadowPercentage}%")
                        MetricColumn("Rec. Capacity", "${roof.recommendedCapacityKw} kW")
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Text(
                        text = "Obstacles Identified: ${roof.obstaclesDetected}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}

// ==========================================
// TAB 3: DESIGN & PROPOSAL COPILOT
// ==========================================
@Composable
fun DesignCopilotTabContent(
    recs: List<AIRecommendationEntity>,
    repository: SuniteRepository,
    aiService: SuniteAiServiceImpl,
    provider: AiProvider
) {
    val scope = rememberCoroutineScope()
    var isGenerating by remember { mutableStateOf(false) }

    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Module 3 & 4: AI Design & Proposal Copilot",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Auto-generate optimal BOQ, string configurations, component selection & financial proposals.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Button(
                        onClick = {
                            scope.launch {
                                isGenerating = true
                                val newRec = AIRecommendationEntity(
                                    id = "rec_" + System.currentTimeMillis(),
                                    targetType = "Commercial Solar Design Optimization",
                                    targetId = "dsgn_02",
                                    title = "500kW Industrial Microgrid Design + Sungrow 100kW (5x)",
                                    panelBrand = "Adani 540W Mono PERC DCR Panels",
                                    moduleTechnology = "P-Type Mono PERC DCR",
                                    inverterBrand = "Sungrow SG110CX Inverters (5 Units)",
                                    batterySizeKwh = 100.0,
                                    structureType = "Aluminum Rail Galvanized Steel Structure",
                                    cableSizeMm = "1x6 sq mm Solar DC / 3.5C 240 sq mm AC",
                                    protectionDevices = "1000V DC SPD / Type II AC SPD / DC Isolator",
                                    lightningProtection = "ESE Air Terminal System",
                                    earthingType = "Chemical Gel Earthing Electrode (8 Pits)",
                                    boqSummary = "926x Adani 540W, 5x Sungrow 100kW, 1,800m DC Cable, 100kWh LFP Battery Storage",
                                    designNotes = "Designed for high-voltage industrial connection. Minimal clipping losses.",
                                    confidenceScorePct = 97.5,
                                    createdAt = "2026-07-30"
                                )
                                repository.addAIRecommendation(newRec)
                                isGenerating = false
                            }
                        },
                        enabled = !isGenerating,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        if (isGenerating) {
                            CircularProgressIndicator(modifier = Modifier.size(18.dp), color = Color.White)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Generating AI Design & BOQ...")
                        } else {
                            Icon(Icons.Default.Engineering, contentDescription = null)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Generate AI Technical Design & BOQ Proposal")
                        }
                    }
                }
            }
        }

        items(recs) { rec ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(text = rec.title, fontWeight = FontWeight.Bold, fontSize = 15.sp, modifier = Modifier.weight(1f))
                        BadgeChip(text = "${rec.confidenceScorePct}% Confidence", color = MaterialTheme.colorScheme.primary)
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(text = "Modules: ${rec.panelBrand} (${rec.moduleTechnology})", style = MaterialTheme.typography.bodySmall)
                    Text(text = "Inverters: ${rec.inverterBrand}", style = MaterialTheme.typography.bodySmall)
                    Text(text = "BOQ: ${rec.boqSummary}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)

                    Spacer(modifier = Modifier.height(8.dp))

                    Card(
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f)),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text(
                            text = "AI Engineer Note: ${rec.designNotes}",
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.padding(8.dp)
                        )
                    }
                }
            }
        }
    }
}

// ==========================================
// TAB 4: SCADA & LIVE IOT TELEMETRY
// ==========================================
@Composable
fun ScadaTelemetryTabContent(
    devices: List<SCADADeviceEntity>,
    generations: List<RealtimeGenerationEntity>,
    repository: SuniteRepository
) {
    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.5f)),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(text = "SCADA & IoT Modbus Live Telemetry", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                            Text(text = "Real-time MQTT & Modbus TCP Inverter Grid Synchronization", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        SuggestionChip(
                            onClick = {},
                            label = { Text("SCADA Online", fontSize = 11.sp) },
                            icon = { Icon(Icons.Default.CellTower, contentDescription = null, tint = SuniteSuccess, modifier = Modifier.size(14.dp)) }
                        )
                    }
                }
            }
        }

        item {
            Text(text = "Real-time Plant Generation", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
        }

        items(generations) { gen ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(text = gen.plantName, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                            Text(text = "Status: ${gen.inverterStatus} • Last Update: ${gen.updatedAt}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        BadgeChip(text = "${gen.livePowerKw} kW Live", color = SuniteSuccess)
                    }

                    HorizontalDivider(modifier = Modifier.padding(vertical = 10.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        MetricColumn("Today Gen", "${gen.todayGenerationKwh} kWh")
                        MetricColumn("Performance Ratio", "${gen.performanceRatioPct}%")
                        MetricColumn("Frequency", "${gen.frequencyHz} Hz")
                        MetricColumn("Inverter Temp", "${gen.operatingTempC}°C")
                    }
                }
            }
        }

        item {
            Text(text = "Connected SCADA Gateways & Sensors (${devices.size})", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
        }

        items(devices) { device ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = device.deviceName, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        Text(text = "${device.protocol} • ${device.ipAddress} • ${device.manufacturer}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    BadgeChip(
                        text = device.status,
                        color = if (device.status == "Online") SuniteSuccess else SuniteWarning
                    )
                }
            }
        }
    }
}

// ==========================================
// TAB 5: PLANT ENERGY & ANALYTICS
// ==========================================
@Composable
fun PlantEnergyTabContent(
    perfs: List<PlantPerformanceEntity>
) {
    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Text(text = "Module 8: Plant Performance Analytics Dashboard", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
        }

        items(perfs) { perf ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(text = perf.plantName, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                            Text(text = "Capacity: ${perf.capacityKw} kW • Rank #${perf.performanceRank}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        BadgeChip(text = perf.statusCategory, color = if (perf.performanceRank == 1) SuniteSuccess else MaterialTheme.colorScheme.primary)
                    }

                    HorizontalDivider(modifier = Modifier.padding(vertical = 10.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        MetricColumn("Today Generation", "${perf.todayGenKwh} kWh")
                        MetricColumn("Monthly Revenue", "$${perf.revenueUsd.toInt()}")
                        MetricColumn("PR %", "${perf.prPct}%")
                        MetricColumn("Availability", "${perf.availabilityPct}%")
                    }
                }
            }
        }
    }
}

// ==========================================
// TAB 6: PREDICTIVE MAINTENANCE AI
// ==========================================
@Composable
fun PredictiveMaintTabContent(
    pmList: List<PredictiveMaintenanceEntity>,
    repository: SuniteRepository
) {
    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Module 9: AI Predictive Maintenance Engine",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Predict equipment failures before downtime occurs using inverter anomaly detection.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }

        items(pmList) { pm ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(text = "${pm.equipmentType} Serial: ${pm.equipmentSerial}", fontWeight = FontWeight.Bold, fontSize = 15.sp)
                            Text(text = pm.plantName, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        BadgeChip(
                            text = "${pm.riskLevel} Risk (${pm.failureProbabilityPct}%)",
                            color = if (pm.riskLevel == "Critical" || pm.riskLevel == "High") SuniteDanger else SuniteWarning
                        )
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Text(text = "Health Score: ${pm.healthScorePct}% | RUL: ${pm.remainingUsefulLifeDays} Days", style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold)
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(text = "Suggested Repair: ${pm.suggestedRepairAction}", style = MaterialTheme.typography.bodySmall)
                    Text(text = "Required Parts: ${pm.replacementPartsRequired}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
    }
}

// ==========================================
// TAB 7: GENAI MULTI-ROLE CHATBOT
// ==========================================
@Composable
fun GenAiAssistantTabContent(
    chatHistory: List<ChatConversationEntity>,
    repository: SuniteRepository,
    aiService: SuniteAiServiceImpl,
    provider: AiProvider
) {
    var userQuery by remember { mutableStateOf("") }
    var isSending by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    Column(modifier = Modifier.fillMaxSize()) {
        Text(
            text = "Module 10: Multi-Channel GenAI Solar Assistant",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold
        )
        Text(
            text = "Powered by ${provider.displayName}",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Spacer(modifier = Modifier.height(12.dp))

        LazyColumn(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(chatHistory) { chat ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    border = CardDefaults.outlinedCardBorder()
                ) {
                    Column(modifier = Modifier.padding(12.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(text = "User (${chat.senderRole}): ${chat.userQuery}", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                            Text(text = chat.timestamp, fontSize = 10.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        HorizontalDivider(modifier = Modifier.padding(vertical = 6.dp))
                        Text(text = chat.aiResponse, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurface)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = userQuery,
                onValueChange = { userQuery = it },
                placeholder = { Text("Ask Sunite GenAI Solar Assistant...", fontSize = 13.sp) },
                modifier = Modifier.weight(1f),
                singleLine = true
            )
            Spacer(modifier = Modifier.width(8.dp))
            IconButton(
                onClick = {
                    if (userQuery.isNotBlank()) {
                        val queryText = userQuery
                        userQuery = ""
                        scope.launch {
                            isSending = true
                            val aiResp = aiService.generateResponse(
                                prompt = queryText,
                                systemInstruction = "You are the Sunite Enterprise AI Technical Copilot.",
                                provider = provider
                            )
                            val conv = ChatConversationEntity(
                                id = "chat_" + System.currentTimeMillis(),
                                senderRole = "User",
                                userQuery = queryText,
                                aiResponse = aiResp,
                                category = "General AI Query",
                                modelUsed = provider.name,
                                timestamp = "2026-07-30 11:35 AM"
                            )
                            repository.addChatConversation(conv)
                            isSending = false
                        }
                    }
                },
                enabled = !isSending && userQuery.isNotBlank()
            ) {
                if (isSending) {
                    CircularProgressIndicator(modifier = Modifier.size(20.dp))
                } else {
                    Icon(Icons.Default.Send, contentDescription = "Send", tint = MaterialTheme.colorScheme.primary)
                }
            }
        }
    }
}

// ==========================================
// HELPER COMPONENTS
// ==========================================
@Composable
fun KpiTile(
    title: String,
    value: String,
    subtitle: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    color: Color,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = CardDefaults.outlinedCardBorder()
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(imageVector = icon, contentDescription = null, tint = color, modifier = Modifier.size(18.dp))
                Spacer(modifier = Modifier.width(6.dp))
                Text(text = title, fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            Spacer(modifier = Modifier.height(4.dp))
            Text(text = value, fontWeight = FontWeight.Bold, fontSize = 16.sp, color = MaterialTheme.colorScheme.onSurface)
            Text(text = subtitle, fontSize = 10.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}

@Composable
fun MetricColumn(label: String, value: String) {
    Column {
        Text(text = label, fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Text(text = value, fontWeight = FontWeight.Bold, fontSize = 13.sp)
    }
}

@Composable
fun BadgeChip(text: String, color: Color) {
    Surface(
        color = color.copy(alpha = 0.15f),
        shape = RoundedCornerShape(12.dp)
    ) {
        Text(
            text = text,
            color = color,
            fontWeight = FontWeight.Bold,
            fontSize = 11.sp,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
        )
    }
}
