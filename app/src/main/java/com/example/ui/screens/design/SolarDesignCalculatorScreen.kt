package com.example.ui.screens.design

import androidx.compose.animation.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.SuniteRepository
import com.example.data.entity.LeadEntity
import com.example.data.entity.SolarDesignEntity
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch
import kotlin.math.ceil
import kotlin.math.roundToInt

@Composable
fun SolarDesignCalculatorScreen(repository: SuniteRepository) {
    val designs by repository.solarDesigns.collectAsState(initial = emptyList())
    val leads by repository.leads.collectAsState(initial = emptyList())
    
    var selectedTab by remember { mutableStateOf(0) } // 0: Live Calculator & Canvas, 1: Engineering SLD, 2: Financial ROI Analysis, 3: Saved Designs Vault
    var selectedDesignForPdf by remember { mutableStateOf<SolarDesignEntity?>(null) }
    var selectedLeadForNewDesign by remember { mutableStateOf<LeadEntity?>(null) }
    var showCreateDesignModal by remember { mutableStateOf(false) }

    val coroutineScope = rememberCoroutineScope()

    // Interactive Calculator Form States (Dynamic Reactive Engine)
    var customerNameInput by remember { mutableStateOf("GreenTech Logistics Facility") }
    var sanctionLoadKwInput by remember { mutableStateOf("250") }
    var monthlyBillAmtInput by remember { mutableStateOf("8500") }
    var tariffRateInput by remember { mutableStateOf("0.14") }
    var roofAreaSqFtInput by remember { mutableStateOf("25000") }
    var roofTypeSelection by remember { mutableStateOf("Tin Shed Rooftop") }
    
    var selectedManufacturer by remember { mutableStateOf("Waaree") }
    var selectedModuleType by remember { mutableStateOf("TOPCon DCR") }
    var selectedModuleWattage by remember { mutableStateOf("550") }
    
    var selectedInverterBrand by remember { mutableStateOf("Sungrow") }
    var selectedInverterCapacity by remember { mutableStateOf("110") }
    
    var selectedMountingStructure by remember { mutableStateOf("Tin Shed Rail Mount") }
    var selectedBatteryOption by remember { mutableStateOf("Hybrid LFP Storage") }

    // Dynamic Reactive Calculations
    val sanctionLoadKw = sanctionLoadKwInput.toDoubleOrNull() ?: 250.0
    val monthlyBillAmt = monthlyBillAmtInput.toDoubleOrNull() ?: 8500.0
    val tariffRate = tariffRateInput.toDoubleOrNull() ?: 0.14
    val availableRoofArea = roofAreaSqFtInput.toDoubleOrNull() ?: 25000.0
    val moduleWp = selectedModuleWattage.toIntOrNull() ?: 550

    val monthlyKwh = (monthlyBillAmt / tariffRate).coerceAtLeast(100.0)
    val annualKwh = monthlyKwh * 12.0
    val recCapacityKw = ((monthlyKwh / (30.0 * 4.3)) * 1.1).coerceAtMost(sanctionLoadKw)
    
    val totalModules = ceil((recCapacityKw * 1000.0) / moduleWp).toInt().coerceAtLeast(20)
    val actualDcCapacityKw = (totalModules * moduleWp) / 1000.0
    val inverterRatingKw = selectedInverterCapacity.toDoubleOrNull() ?: 110.0
    val inverterQty = ceil(actualDcCapacityKw / inverterRatingKw).toInt().coerceAtLeast(1)
    val actualAcCapacityKw = inverterQty * inverterRatingKw

    val areaRequiredSqFt = totalModules * 37.0 // ~37 sqft per module with pitch/spacing
    val roofUtilizationPct = ((areaRequiredSqFt / availableRoofArea) * 100).coerceAtMost(100.0)
    val annualGenKwh = actualDcCapacityKw * 1550.0 // ~1550 kWh/kWp specific yield
    val performanceRatioPct = 79.5
    val cufPct = (annualGenKwh / (actualDcCapacityKw * 8760.0)) * 100.0
    
    val co2OffsetTons = annualGenKwh * 0.00079
    val treesSaved = (co2OffsetTons * 45).roundToInt()

    // Financial calculations
    val systemCostUsd = actualDcCapacityKw * 875.0 // ~$875/kW turnkey cost
    val subsidyUsd = if (recCapacityKw <= 10.0) systemCostUsd * 0.30 else 25000.0
    val netContributionUsd = (systemCostUsd - subsidyUsd).coerceAtLeast(1000.0)
    val annualSavingsUsd = annualGenKwh * tariffRate
    val paybackYears = netContributionUsd / annualSavingsUsd
    val savings25YrUsd = (annualSavingsUsd * 25.0 * 1.25) - netContributionUsd // factoring grid tariff escalation

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
    ) {
        // Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Solar Design & Capacity Calculator Engine",
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                )
                Text(
                    text = "Automated PV Sizing, Inverter Stringing, 25-Yr ROI & SLD Generation",
                    style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                )
            }

            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                EnterpriseButton(
                    text = "Export Solar PDF",
                    onClick = {
                        val currentDesign = designs.firstOrNull() ?: SolarDesignEntity(
                            id = "dsgn_" + System.currentTimeMillis(),
                            leadId = "lead_01",
                            customerId = "cust_01",
                            customerName = customerNameInput,
                            recommendedCapacityKw = recCapacityKw,
                            dcCapacityKw = actualDcCapacityKw,
                            acCapacityKw = actualAcCapacityKw,
                            moduleManufacturer = selectedManufacturer,
                            moduleType = selectedModuleType,
                            moduleWattageWp = moduleWp,
                            moduleQuantity = totalModules,
                            inverterManufacturer = selectedInverterBrand,
                            annualGenerationKwh = annualGenKwh,
                            projectCostUsd = systemCostUsd,
                            subsidyUsd = subsidyUsd,
                            customerContributionUsd = netContributionUsd,
                            paybackYears = paybackYears,
                            savings25YearsUsd = savings25YrUsd
                        )
                        selectedDesignForPdf = currentDesign
                    },
                    isPrimary = false,
                    icon = Icons.Default.PictureAsPdf
                )

                EnterpriseButton(
                    text = "Save Design Record",
                    onClick = {
                        val newDesign = SolarDesignEntity(
                            id = "dsgn_" + System.currentTimeMillis(),
                            leadId = "lead_01",
                            customerId = "cust_01",
                            customerName = customerNameInput,
                            roofType = roofTypeSelection,
                            sanctionedLoadKw = sanctionLoadKw,
                            monthlyBillAmt = monthlyBillAmt,
                            tariffRatePerKwh = tariffRate,
                            availableRoofAreaSqFt = availableRoofArea,
                            recommendedCapacityKw = recCapacityKw,
                            dcCapacityKw = actualDcCapacityKw,
                            acCapacityKw = actualAcCapacityKw,
                            moduleManufacturer = selectedManufacturer,
                            moduleType = selectedModuleType,
                            moduleWattageWp = moduleWp,
                            moduleQuantity = totalModules,
                            inverterManufacturer = selectedInverterBrand,
                            inverterQuantity = inverterQty,
                            mountingStructure = selectedMountingStructure,
                            batteryType = selectedBatteryOption,
                            annualGenerationKwh = annualGenKwh,
                            areaRequiredSqFt = areaRequiredSqFt,
                            roofUtilizationPct = roofUtilizationPct,
                            co2ReductionTonsYr = co2OffsetTons,
                            treesSavedEquivalent = treesSaved,
                            projectCostUsd = systemCostUsd,
                            subsidyUsd = subsidyUsd,
                            customerContributionUsd = netContributionUsd,
                            paybackYears = paybackYears,
                            savings25YearsUsd = savings25YrUsd,
                            status = "Engineered"
                        )
                        coroutineScope.launch {
                            repository.addSolarDesign(newDesign)
                        }
                    },
                    isPrimary = true,
                    icon = Icons.Default.Save
                )
            }
        }

        // Module Navigation Tabs
        TabRow(
            selectedTabIndex = selectedTab,
            containerColor = SuniteSurface,
            contentColor = SuniteNavy,
            divider = { Divider(color = SuniteBorder) }
        ) {
            Tab(
                selected = selectedTab == 0,
                onClick = { selectedTab = 0 },
                text = { Text("1. Calculator & Auto Layout", fontSize = 12.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedTab == 1,
                onClick = { selectedTab = 1 },
                text = { Text("2. Engineering SLD", fontSize = 12.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedTab == 2,
                onClick = { selectedTab = 2 },
                text = { Text("3. Financial ROI & Payback", fontSize = 12.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedTab == 3,
                onClick = { selectedTab = 3 },
                text = { Text("4. Saved Designs (${designs.size})", fontSize = 12.sp, fontWeight = FontWeight.Bold) }
            )
        }

        Spacer(modifier = Modifier.height(10.dp))

        when (selectedTab) {
            0 -> LiveCalculatorAndCanvasView(
                customerNameInput = customerNameInput, onCustomerNameChange = { customerNameInput = it },
                sanctionLoadKwInput = sanctionLoadKwInput, onSanctionLoadChange = { sanctionLoadKwInput = it },
                monthlyBillAmtInput = monthlyBillAmtInput, onMonthlyBillChange = { monthlyBillAmtInput = it },
                tariffRateInput = tariffRateInput, onTariffRateChange = { tariffRateInput = it },
                roofAreaSqFtInput = roofAreaSqFtInput, onRoofAreaChange = { roofAreaSqFtInput = it },
                roofTypeSelection = roofTypeSelection, onRoofTypeChange = { roofTypeSelection = it },
                selectedManufacturer = selectedManufacturer, onManufacturerChange = { selectedManufacturer = it },
                selectedModuleType = selectedModuleType, onModuleTypeChange = { selectedModuleType = it },
                selectedModuleWattage = selectedModuleWattage, onModuleWattageChange = { selectedModuleWattage = it },
                selectedInverterBrand = selectedInverterBrand, onInverterBrandChange = { selectedInverterBrand = it },
                selectedInverterCapacity = selectedInverterCapacity, onInverterCapacityChange = { selectedInverterCapacity = it },
                selectedMountingStructure = selectedMountingStructure, onMountingChange = { selectedMountingStructure = it },
                selectedBatteryOption = selectedBatteryOption, onBatteryChange = { selectedBatteryOption = it },
                // Calc Output Specs
                recCapacityKw = recCapacityKw,
                actualDcCapacityKw = actualDcCapacityKw,
                actualAcCapacityKw = actualAcCapacityKw,
                totalModules = totalModules,
                inverterQty = inverterQty,
                annualGenKwh = annualGenKwh,
                cufPct = cufPct,
                areaRequiredSqFt = areaRequiredSqFt,
                roofUtilizationPct = roofUtilizationPct,
                co2OffsetTons = co2OffsetTons,
                treesSaved = treesSaved,
                systemCostUsd = systemCostUsd,
                netContributionUsd = netContributionUsd,
                paybackYears = paybackYears
            )
            1 -> EngineeringSldView(
                dcCapacityKw = actualDcCapacityKw,
                acCapacityKw = actualAcCapacityKw,
                moduleWp = moduleWp,
                totalModules = totalModules,
                inverterBrand = selectedInverterBrand,
                inverterQty = inverterQty,
                mountingStructure = selectedMountingStructure
            )
            2 -> FinancialRoiView(
                systemCostUsd = systemCostUsd,
                subsidyUsd = subsidyUsd,
                netContributionUsd = netContributionUsd,
                annualSavingsUsd = annualSavingsUsd,
                paybackYears = paybackYears,
                savings25YrUsd = savings25YrUsd
            )
            3 -> SavedDesignsVaultView(
                designs = designs,
                onViewPdf = { selectedDesignForPdf = it },
                onApproveStatus = { design ->
                    coroutineScope.launch {
                        repository.updateSolarDesignStatus(design.id, "Design Approved")
                    }
                }
            )
        }
    }

    // Modal: Professional Solar Design Report PDF Preview
    selectedDesignForPdf?.let { design ->
        SolarDesignPdfPreviewModal(
            design = design,
            onDismiss = { selectedDesignForPdf = null }
        )
    }
}

@Composable
fun LiveCalculatorAndCanvasView(
    customerNameInput: String, onCustomerNameChange: (String) -> Unit,
    sanctionLoadKwInput: String, onSanctionLoadChange: (String) -> Unit,
    monthlyBillAmtInput: String, onMonthlyBillChange: (String) -> Unit,
    tariffRateInput: String, onTariffRateChange: (String) -> Unit,
    roofAreaSqFtInput: String, onRoofAreaChange: (String) -> Unit,
    roofTypeSelection: String, onRoofTypeChange: (String) -> Unit,
    selectedManufacturer: String, onManufacturerChange: (String) -> Unit,
    selectedModuleType: String, onModuleTypeChange: (String) -> Unit,
    selectedModuleWattage: String, onModuleWattageChange: (String) -> Unit,
    selectedInverterBrand: String, onInverterBrandChange: (String) -> Unit,
    selectedInverterCapacity: String, onInverterCapacityChange: (String) -> Unit,
    selectedMountingStructure: String, onMountingChange: (String) -> Unit,
    selectedBatteryOption: String, onBatteryChange: (String) -> Unit,
    recCapacityKw: Double,
    actualDcCapacityKw: Double,
    actualAcCapacityKw: Double,
    totalModules: Int,
    inverterQty: Int,
    annualGenKwh: Double,
    cufPct: Double,
    areaRequiredSqFt: Double,
    roofUtilizationPct: Double,
    co2OffsetTons: Double,
    treesSaved: Int,
    systemCostUsd: Double,
    netContributionUsd: Double,
    paybackYears: Double
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        // KPI Calculated Summary Bar
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                EnterpriseMetricCard(
                    title = "Recommended Capacity",
                    value = "%.1f kW".format(recCapacityKw),
                    subtitle = "DC: %.1f kWp | AC: %.1f kW".format(actualDcCapacityKw, actualAcCapacityKw),
                    icon = Icons.Default.SolarPower,
                    modifier = Modifier.weight(1f)
                )
                EnterpriseMetricCard(
                    title = "Annual Generation",
                    value = "%,.0f kWh".format(annualGenKwh),
                    subtitle = "CUF: %.1f%% | PR: 79.5%%".format(cufPct),
                    icon = Icons.Default.ElectricBolt,
                    modifier = Modifier.weight(1f)
                )
                EnterpriseMetricCard(
                    title = "Est. Turnkey Cost",
                    value = "$%,.0f".format(systemCostUsd),
                    subtitle = "Payback: %.1f Yrs".format(paybackYears),
                    icon = Icons.Default.AttachMoney,
                    modifier = Modifier.weight(1f)
                )
            }
        }

        // Form & Specs Row
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // Form Inputs Left Column
                Column(
                    modifier = Modifier.weight(1f),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    EnterpriseCard {
                        Text(text = "1. Customer & Feasibility Inputs", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Spacer(modifier = Modifier.height(8.dp))
                        EnterpriseTextField(value = customerNameInput, onValueChange = onCustomerNameChange, label = "Customer / Entity")
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = sanctionLoadKwInput, onValueChange = onSanctionLoadChange, label = "Sanction Load (kW)") }
                            Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = monthlyBillAmtInput, onValueChange = onMonthlyBillChange, label = "Monthly Bill ($)") }
                        }
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = tariffRateInput, onValueChange = onTariffRateChange, label = "Tariff ($/kWh)") }
                            Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = roofAreaSqFtInput, onValueChange = onRoofAreaChange, label = "Roof Area (sq ft)") }
                        }
                        EnterpriseDropdown(
                            label = "Roof Construction Type",
                            options = listOf("Tin Shed Rooftop", "RCC Flat Roof", "Ground Mounted", "Carport", "Solar Park"),
                            selectedOption = roofTypeSelection,
                            onOptionSelected = onRoofTypeChange
                        )
                    }

                    EnterpriseCard {
                        Text(text = "2. Solar Equipment Selection", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Spacer(modifier = Modifier.height(8.dp))
                        EnterpriseDropdown(
                            label = "Panel Manufacturer",
                            options = listOf("Waaree", "Adani", "Premier Energies", "Vikram Solar", "Longi", "Jinko", "Canadian Solar"),
                            selectedOption = selectedManufacturer,
                            onOptionSelected = onManufacturerChange
                        )
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Box(modifier = Modifier.weight(1f)) {
                                EnterpriseDropdown(
                                    label = "Technology",
                                    options = listOf("TOPCon DCR", "Mono PERC", "HJT", "Non-DCR"),
                                    selectedOption = selectedModuleType,
                                    onOptionSelected = onModuleTypeChange
                                )
                            }
                            Box(modifier = Modifier.weight(1f)) {
                                EnterpriseDropdown(
                                    label = "Module Wattage",
                                    options = listOf("540", "550", "575", "600"),
                                    selectedOption = selectedModuleWattage,
                                    onOptionSelected = onModuleWattageChange
                                )
                            }
                        }

                        EnterpriseDropdown(
                            label = "Inverter Brand",
                            options = listOf("Sungrow", "Growatt", "Huawei", "SMA", "ABB", "Delta", "Hitachi"),
                            selectedOption = selectedInverterBrand,
                            onOptionSelected = onInverterBrandChange
                        )
                        
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Box(modifier = Modifier.weight(1f)) {
                                EnterpriseDropdown(
                                    label = "Mounting Structure",
                                    options = listOf("Tin Shed Rail Mount", "RCC Elevated Superstructure", "Ground Ballasted", "Carport Canopy"),
                                    selectedOption = selectedMountingStructure,
                                    onOptionSelected = onMountingChange
                                )
                            }
                            Box(modifier = Modifier.weight(1f)) {
                                EnterpriseDropdown(
                                    label = "Battery Storage",
                                    options = listOf("Hybrid LFP Storage", "Lithium-Ion Grid Tie", "None"),
                                    selectedOption = selectedBatteryOption,
                                    onOptionSelected = onBatteryChange
                                )
                            }
                        }
                    }
                }

                // Interactive Auto Layout Visual Canvas Right Column
                Column(
                    modifier = Modifier.weight(1f),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    EnterpriseCard {
                        Text(text = "Rooftop Layout & Shadow Visualizer", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "$totalModules Panels ($selectedManufacturer $selectedModuleWattage Wp) • Roof Area Utilized: %.1f%%".format(roofUtilizationPct), style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary))
                        
                        Spacer(modifier = Modifier.height(10.dp))

                        // Custom Visual Canvas showing Solar Panel Array
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(260.dp)
                                .background(SuniteBackground, shape = RoundedCornerShape(8.dp))
                                .border(1.dp, SuniteBorder, RoundedCornerShape(8.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Canvas(modifier = Modifier.fillMaxSize().padding(12.dp)) {
                                val cols = 12
                                val rows = 8
                                val cellWidth = size.width / cols
                                val cellHeight = size.height / rows

                                for (r in 0 until rows) {
                                    for (c in 0 until cols) {
                                        val x = c * cellWidth + 2f
                                        val y = r * cellHeight + 2f
                                        val w = cellWidth - 4f
                                        val h = cellHeight - 4f

                                        // Draw Solar Panel
                                        drawRoundRect(
                                            color = SuniteNavy,
                                            topLeft = Offset(x, y),
                                            size = Size(w, h),
                                            cornerRadius = CornerRadius(2f, 2f)
                                        )

                                        // Draw Grid Lines on Panel
                                        drawRect(
                                            color = SuniteOrange.copy(alpha = 0.4f),
                                            topLeft = Offset(x, y),
                                            size = Size(w, h),
                                            style = Stroke(width = 1f)
                                        )
                                    }
                                }

                                // Maintenance Walkway Corridor Indicator
                                drawLine(
                                    color = SuniteWarning,
                                    start = Offset(0f, size.height / 2f),
                                    end = Offset(size.width, size.height / 2f),
                                    strokeWidth = 3f,
                                    pathEffect = PathEffect.dashPathEffect(floatArrayOf(10f, 5f), 0f)
                                )
                            }

                            Surface(
                                modifier = Modifier
                                    .align(Alignment.BottomEnd)
                                    .padding(8.dp),
                                color = SuniteSurface.copy(alpha = 0.9f),
                                shape = RoundedCornerShape(4.dp)
                            ) {
                                Text(
                                    text = "1.2m Walkway Included • Azimuth: 180° South",
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = SuniteNavy,
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(10.dp))

                        // Environmental Impact Summary
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Surface(
                                modifier = Modifier.weight(1f),
                                color = SuniteSuccessBg,
                                shape = RoundedCornerShape(6.dp)
                            ) {
                                Column(modifier = Modifier.padding(8.dp)) {
                                    Text(text = "CO₂ Reduction", fontSize = 10.sp, color = SuniteSuccess, fontWeight = FontWeight.Bold)
                                    Text(text = "%.0f Tons/Yr".format(co2OffsetTons), fontSize = 14.sp, fontWeight = FontWeight.Bold, color = SuniteSuccess)
                                }
                            }
                            Surface(
                                modifier = Modifier.weight(1f),
                                color = SuniteSuccessBg,
                                shape = RoundedCornerShape(6.dp)
                            ) {
                                Column(modifier = Modifier.padding(8.dp)) {
                                    Text(text = "Trees Saved Equivalent", fontSize = 10.sp, color = SuniteSuccess, fontWeight = FontWeight.Bold)
                                    Text(text = "%,d Trees".format(treesSaved), fontSize = 14.sp, fontWeight = FontWeight.Bold, color = SuniteSuccess)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun EngineeringSldView(
    dcCapacityKw: Double,
    acCapacityKw: Double,
    moduleWp: Int,
    totalModules: Int,
    inverterBrand: String,
    inverterQty: Int,
    mountingStructure: String
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            EnterpriseCard {
                Text(text = "Single Line Diagram (SLD) & Cable Sizing Architecture", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Text(text = "Automatic Electrical Engineering Scheme & Grid Interface Protocol", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))

                Spacer(modifier = Modifier.height(16.dp))

                // SLD Diagram Graphic Scheme
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(SuniteBackground, shape = RoundedCornerShape(8.dp))
                        .padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    SldNode(title = "PV Solar Array ($totalModules Modules x $moduleWp Wp = %.1f kWp DC)".format(dcCapacityKw), icon = Icons.Default.SolarPower, subtitle = mountingStructure)
                    Icon(imageVector = Icons.Default.ArrowDownward, contentDescription = null, tint = SuniteNavy)
                    SldNode(title = "DC Array Junction Box (AJB) / DC Disconnect", icon = Icons.Default.Sensors, subtitle = "SPD Type II • 1000V DC Fuse Protection")
                    Icon(imageVector = Icons.Default.ArrowDownward, contentDescription = null, tint = SuniteNavy)
                    SldNode(title = "$inverterQty x $inverterBrand String Inverters (AC Total: %.0f kW)".format(acCapacityKw), icon = Icons.Default.Bolt, subtitle = "Max Efficiency 98.8% • MPPT Voltage 200-1000V")
                    Icon(imageVector = Icons.Default.ArrowDownward, contentDescription = null, tint = SuniteNavy)
                    SldNode(title = "AC Distribution Panel (ACDB) & Net Metering", icon = Icons.Default.Speed, subtitle = "Bi-Directional Smart Tariff Meter • RS485 Modbus Telemetry")
                    Icon(imageVector = Icons.Default.ArrowDownward, contentDescription = null, tint = SuniteNavy)
                    SldNode(title = "Utility Grid Transformer Connection", icon = Icons.Default.Power, subtitle = "11kV Grid Interconnection • Anti-Islanding Verified")
                }

                Spacer(modifier = Modifier.height(16.dp))

                Divider(color = SuniteBorder)

                // Bill of Quantities (BOQ) Summary
                Text(text = "Engineering Bill of Quantities (BOQ)", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy), modifier = Modifier.padding(top = 8.dp))
                
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(text = "Solar DC Solar Cable (4 sq mm Cu)", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    Text(text = "1,200 Meters", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(text = "Armored AC Aluminum Cable (3.5C x 185 sq mm)", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    Text(text = "350 Meters", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(text = "Chemical Earthing Pits (Maintenance Free)", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    Text(text = "6 Pits", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(text = "Lightning Arrester (Early Streamer Emission ESE)", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    Text(text = "2 Units (107m Radius)", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                }
            }
        }
    }
}

@Composable
fun SldNode(title: String, icon: androidx.compose.ui.graphics.vector.ImageVector, subtitle: String) {
    Surface(
        modifier = Modifier.fillMaxWidth(0.9f),
        color = SuniteSurface,
        shape = RoundedCornerShape(8.dp),
        border = androidx.compose.foundation.BorderStroke(1.dp, SuniteNavy.copy(alpha = 0.3f))
    ) {
        Row(
            modifier = Modifier.padding(10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Surface(
                shape = RoundedCornerShape(6.dp),
                color = SuniteNavy.copy(alpha = 0.1f),
                modifier = Modifier.size(36.dp)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Icon(imageVector = icon, contentDescription = null, tint = SuniteNavy)
                }
            }

            Spacer(modifier = Modifier.width(12.dp))

            Column {
                Text(text = title, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Text(text = subtitle, style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary, fontSize = 10.sp))
            }
        }
    }
}

@Composable
fun FinancialRoiView(
    systemCostUsd: Double,
    subsidyUsd: Double,
    netContributionUsd: Double,
    annualSavingsUsd: Double,
    paybackYears: Double,
    savings25YrUsd: Double
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            EnterpriseCard {
                Text(text = "Financial Feasibility, Subsidy & Payback Analysis", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Text(text = "25-Year Life Cycle Cashflow & Clean Energy ROI Projections", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))

                Spacer(modifier = Modifier.height(12.dp))

                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    EnterpriseMetricCard(title = "Turnkey Gross Cost", value = "$%,.0f".format(systemCostUsd), modifier = Modifier.weight(1f))
                    EnterpriseMetricCard(title = "Government Subsidy", value = "$%,.0f".format(subsidyUsd), modifier = Modifier.weight(1f))
                }

                Spacer(modifier = Modifier.height(8.dp))

                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    EnterpriseMetricCard(title = "Net Customer Investment", value = "$%,.0f".format(netContributionUsd), modifier = Modifier.weight(1f))
                    EnterpriseMetricCard(title = "Simple Payback Period", value = "%.1f Years".format(paybackYears), modifier = Modifier.weight(1f))
                }

                Spacer(modifier = Modifier.height(16.dp))

                Divider(color = SuniteBorder)

                Text(text = "25-Year Cumulative Savings Benchmark", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy), modifier = Modifier.padding(top = 8.dp))
                
                Surface(
                    modifier = Modifier.fillMaxWidth(),
                    color = SuniteSuccessBg,
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Text(text = "Cumulative Lifetime Savings: $%,.0f USD".format(savings25YrUsd), style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteSuccess))
                        Text(text = "Includes 4.5% annual grid tariff inflation & 0.5% module degradation buffer.", style = MaterialTheme.typography.bodySmall.copy(color = SuniteNavy))
                    }
                }
            }
        }
    }
}

@Composable
fun SavedDesignsVaultView(
    designs: List<SolarDesignEntity>,
    onViewPdf: (SolarDesignEntity) -> Unit,
    onApproveStatus: (SolarDesignEntity) -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        items(designs, key = { it.id }) { design ->
            EnterpriseCard {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(text = design.customerName, style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                            Spacer(modifier = Modifier.width(8.dp))
                            EnterpriseBadge(text = "%.1f kWp".format(design.dcCapacityKw))
                        }

                        Text(
                            text = "Equipment: ${design.moduleManufacturer} ${design.moduleWattageWp}W (${design.moduleQuantity} Panels) + ${design.inverterManufacturer}",
                            style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary),
                            modifier = Modifier.padding(top = 2.dp)
                        )
                        Text(
                            text = "Annual Generation: %,.0f kWh • Turnkey Cost: $%,.0f".format(design.annualGenerationKwh, design.projectCostUsd),
                            style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextMuted, fontSize = 10.sp),
                            modifier = Modifier.padding(top = 1.dp)
                        )
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        if (design.status != "Design Approved") {
                            EnterpriseButton(
                                text = "Approve",
                                onClick = { onApproveStatus(design) },
                                isPrimary = true
                            )
                        } else {
                            EnterpriseBadge(text = "✓ Approved", statusType = "APPROVED")
                        }

                        EnterpriseButton(
                            text = "PDF Report",
                            onClick = { onViewPdf(design) },
                            isPrimary = false,
                            icon = Icons.Default.PictureAsPdf
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun SolarDesignPdfPreviewModal(
    design: SolarDesignEntity,
    onDismiss: () -> Unit
) {
    EnterpriseModal(
        title = "Solar Technical Feasibility & Design Report",
        subtitle = "Sunite Solar Enterprise Engine • Generated Document",
        onDismissRequest = onDismiss,
        confirmText = "Print / Download PDF",
        onConfirm = onDismiss
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            // Document Header
            Surface(
                modifier = Modifier.fillMaxWidth(),
                color = SuniteNavy,
                shape = RoundedCornerShape(8.dp)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text(text = "SUNITE SOLAR ENTERPRISE REPORT", style = MaterialTheme.typography.labelSmall.copy(color = SuniteOrange, fontWeight = FontWeight.Bold))
                    Text(text = "Technical Feasibility Study & PV Capacity Design", style = MaterialTheme.typography.titleSmall.copy(color = Color.White, fontWeight = FontWeight.Bold))
                    Text(text = "Ref ID: ${design.id} • Date: ${design.createdAt}", style = MaterialTheme.typography.labelSmall.copy(color = Color.White.copy(alpha = 0.8f)))
                }
            }

            Divider(color = SuniteBorder)

            // Details
            Text(text = "Site & Customer Context", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(text = "Customer Name", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                Text(text = design.customerName, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
            }
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(text = "Recommended Solar System", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                Text(text = "%.1f kW DC / %.1f kW AC".format(design.dcCapacityKw, design.acCapacityKw), style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteOrange))
            }
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(text = "Module Specification", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                Text(text = "${design.moduleQuantity} x ${design.moduleManufacturer} ${design.moduleWattageWp}W", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
            }
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(text = "Inverter Architecture", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                Text(text = "${design.inverterManufacturer} (${design.stringDesign})", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
            }

            Divider(color = SuniteBorder)

            // Financial Summary
            Text(text = "Financial Feasibility", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(text = "Net Investment", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                Text(text = "$%,.0f USD".format(design.customerContributionUsd), style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
            }
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(text = "Estimated Simple Payback", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                Text(text = "%.1f Years".format(design.paybackYears), style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteSuccess))
            }

            Divider(color = SuniteBorder)

            // Signature & Stamp
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(text = "Digital Verification Stamp", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextMuted))
                    Text(text = "✓ Verified by Lead PV Engineer", style = MaterialTheme.typography.labelSmall.copy(color = SuniteSuccess, fontWeight = FontWeight.Bold))
                }
                Icon(
                    imageVector = Icons.Default.QrCode2,
                    contentDescription = "QR Stamp",
                    modifier = Modifier.size(40.dp),
                    tint = SuniteNavy
                )
            }
        }
    }
}
