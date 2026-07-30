package com.example.ui.screens.pricing

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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.SuniteRepository
import com.example.data.entity.PricingMasterEntity
import com.example.data.entity.QuotationCommercialEntity
import com.example.data.entity.SolarDesignEntity
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch
import kotlin.math.roundToInt

@Composable
fun DynamicPricingEngineScreen(repository: SuniteRepository) {
    val pricingMasters by repository.pricingMasters.collectAsState(initial = emptyList())
    val quotations by repository.quotations.collectAsState(initial = emptyList())
    val designs by repository.solarDesigns.collectAsState(initial = emptyList())

    var selectedTab by remember { mutableStateOf(0) } // 0: Commercial Calculator, 1: Price Master BOM, 2: Approval Workflow, 3: Commercial Output Sheets, 4: Phase 4 Report
    var selectedQuotationForSheet by remember { mutableStateOf<QuotationCommercialEntity?>(null) }
    var showAddMasterDialog by remember { mutableStateOf(false) }

    val coroutineScope = rememberCoroutineScope()

    // Calculator Dynamic States
    var selectedDesignId by remember { mutableStateOf(designs.firstOrNull()?.id ?: "dsgn_01") }
    var projectTypeInput by remember { mutableStateOf("Commercial Rooftop") }
    var systemCapacityKwInput by remember { mutableStateOf("220") }
    var stateRegionInput by remember { mutableStateOf("Texas (TX)") }

    var partnerMarginPctInput by remember { mutableStateOf("5.0") }
    var franchiseMarginPctInput by remember { mutableStateOf("3.0") }
    var corporateMarginPctInput by remember { mutableStateOf("10.0") }

    var gstRateSelection by remember { mutableStateOf("18.0") }
    var applySubsidy by remember { mutableStateOf(true) }

    // Dynamic Reactive Calculations
    val capacityKw = systemCapacityKwInput.toDoubleOrNull() ?: 220.0
    val partnerMarginPct = partnerMarginPctInput.toDoubleOrNull() ?: 5.0
    val franchiseMarginPct = franchiseMarginPctInput.toDoubleOrNull() ?: 3.0
    val corporateMarginPct = corporateMarginPctInput.toDoubleOrNull() ?: 10.0
    val gstRatePct = gstRateSelection.toDoubleOrNull() ?: 18.0

    // Itemized Cost Calculations
    val moduleCostUsd = capacityKw * 1000.0 * 0.22 // ~$220/kW
    val inverterCostUsd = capacityKw * 38.0 // ~$38/kW
    val structureCostUsd = capacityKw * 40.0 // ~$40/kW
    val cableAndElectricalCostUsd = capacityKw * 55.0 // ~$55/kW
    val civilAndLaborCostUsd = capacityKw * 80.0 // ~$80/kW
    val pmgAndEngineeringUsd = 5000.0
    val contingencyUsd = 2500.0

    val totalMaterialCostUsd = moduleCostUsd + inverterCostUsd + structureCostUsd + cableAndElectricalCostUsd
    val totalInstallationCostUsd = civilAndLaborCostUsd
    val baseEpcSubtotalUsd = totalMaterialCostUsd + totalInstallationCostUsd + pmgAndEngineeringUsd + contingencyUsd

    val totalMarginPct = partnerMarginPct + franchiseMarginPct + corporateMarginPct
    val totalMarginUsd = baseEpcSubtotalUsd * (totalMarginPct / 100.0)
    val preTaxTotalUsd = baseEpcSubtotalUsd + totalMarginUsd

    val gstAmountUsd = preTaxTotalUsd * (gstRatePct / 100.0)
    val subsidyDeductionUsd = if (applySubsidy) (if (capacityKw <= 10.0) preTaxTotalUsd * 0.30 else 25000.0) else 0.0

    val finalCustomerPriceUsd = (preTaxTotalUsd + gstAmountUsd - subsidyDeductionUsd).coerceAtLeast(1000.0)
    val loanAmountUsd = finalCustomerPriceUsd * 0.80
    val monthlyEmiUsd = (loanAmountUsd * (0.08 / 12) * Math.pow(1.0 + 0.08 / 12, 120.0)) / (Math.pow(1.0 + 0.08 / 12, 120.0) - 1.0)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
    ) {
        // Top Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Dynamic Pricing Engine & Commercial Calculator",
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                )
                Text(
                    text = "Commercial Quotations, Margin Locks, GST Breakdown & Approval Workflows",
                    style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                )
            }

            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                EnterpriseButton(
                    text = "Create Price Master Item",
                    onClick = { showAddMasterDialog = true },
                    isPrimary = false,
                    icon = Icons.Default.Add
                )

                EnterpriseButton(
                    text = "Generate Quotation Record",
                    onClick = {
                        val newQuot = QuotationCommercialEntity(
                            id = "quot_" + System.currentTimeMillis(),
                            designId = selectedDesignId,
                            leadId = "lead_01",
                            customerName = "GreenTech Logistics Facility",
                            systemCapacityKw = capacityKw,
                            projectType = projectTypeInput,
                            materialCostUsd = totalMaterialCostUsd,
                            installationCostUsd = totalInstallationCostUsd,
                            transportAndInsuranceUsd = 4500.0,
                            civilAndElectricalUsd = civilAndLaborCostUsd,
                            engineeringAndPmgUsd = pmgAndEngineeringUsd,
                            contingencyUsd = contingencyUsd,
                            subtotalBaseEpcUsd = baseEpcSubtotalUsd,
                            partnerMarginPct = partnerMarginPct,
                            franchiseMarginPct = franchiseMarginPct,
                            corporateMarginPct = corporateMarginPct,
                            totalMarginUsd = totalMarginUsd,
                            gstRatePct = gstRatePct,
                            gstAmountUsd = gstAmountUsd,
                            subsidyDeductionUsd = subsidyDeductionUsd,
                            finalCustomerPriceUsd = finalCustomerPriceUsd,
                            loanAmountUsd = loanAmountUsd,
                            monthlyEmiUsd = monthlyEmiUsd,
                            approvalStatus = if (totalMarginPct < 15.0) "Pending Director Approval" else "Pending Finance Approval",
                            approvalNotes = "Auto-submitted from Dynamic Pricing Engine",
                            createdBy = "Sales Lead"
                        )
                        coroutineScope.launch {
                            repository.addQuotation(newQuot)
                        }
                    },
                    isPrimary = true,
                    icon = Icons.Default.Calculate
                )
            }
        }

        // Navigation Tabs
        TabRow(
            selectedTabIndex = selectedTab,
            containerColor = SuniteSurface,
            contentColor = SuniteNavy,
            divider = { Divider(color = SuniteBorder) }
        ) {
            Tab(
                selected = selectedTab == 0,
                onClick = { selectedTab = 0 },
                text = { Text("1. Dynamic Calculator", fontSize = 11.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedTab == 1,
                onClick = { selectedTab = 1 },
                text = { Text("2. Price Master BOM (${pricingMasters.size})", fontSize = 11.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedTab == 2,
                onClick = { selectedTab = 2 },
                text = { Text("3. Approval Workflow (${quotations.size})", fontSize = 11.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedTab == 3,
                onClick = { selectedTab = 3 },
                text = { Text("4. Commercial Sheets", fontSize = 11.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedTab == 4,
                onClick = { selectedTab = 4 },
                text = { Text("5. Phase 4 Report", fontSize = 11.sp, fontWeight = FontWeight.Bold) }
            )
        }

        Spacer(modifier = Modifier.height(10.dp))

        when (selectedTab) {
            0 -> DynamicCommercialCalculatorTab(
                capacityKw = capacityKw,
                systemCapacityKwInput = systemCapacityKwInput, onCapacityChange = { systemCapacityKwInput = it },
                projectTypeInput = projectTypeInput, onProjectTypeChange = { projectTypeInput = it },
                stateRegionInput = stateRegionInput, onStateRegionChange = { stateRegionInput = it },
                partnerMarginPctInput = partnerMarginPctInput, onPartnerMarginChange = { partnerMarginPctInput = it },
                franchiseMarginPctInput = franchiseMarginPctInput, onFranchiseMarginChange = { franchiseMarginPctInput = it },
                corporateMarginPctInput = corporateMarginPctInput, onCorporateMarginChange = { corporateMarginPctInput = it },
                gstRateSelection = gstRateSelection, onGstRateChange = { gstRateSelection = it },
                applySubsidy = applySubsidy, onApplySubsidyChange = { applySubsidy = it },
                moduleCostUsd = moduleCostUsd,
                inverterCostUsd = inverterCostUsd,
                structureCostUsd = structureCostUsd,
                cableAndElectricalCostUsd = cableAndElectricalCostUsd,
                civilAndLaborCostUsd = civilAndLaborCostUsd,
                baseEpcSubtotalUsd = baseEpcSubtotalUsd,
                totalMarginUsd = totalMarginUsd,
                totalMarginPct = totalMarginPct,
                gstAmountUsd = gstAmountUsd,
                subsidyDeductionUsd = subsidyDeductionUsd,
                finalCustomerPriceUsd = finalCustomerPriceUsd,
                monthlyEmiUsd = monthlyEmiUsd
            )
            1 -> PriceMasterBomTab(
                masters = pricingMasters,
                onAddClick = { showAddMasterDialog = true },
                onDeleteClick = { master ->
                    coroutineScope.launch { repository.deletePricingMaster(master) }
                }
            )
            2 -> ApprovalWorkflowTab(
                quotations = quotations,
                onApprove = { quot, nextStatus ->
                    coroutineScope.launch {
                        repository.updateQuotationStatus(quot.id, nextStatus, "Approved by authority on 2026-07-30")
                    }
                }
            )
            3 -> CommercialSheetsTab(
                quotations = quotations,
                selectedQuotation = selectedQuotationForSheet ?: quotations.firstOrNull(),
                onSelectQuotation = { selectedQuotationForSheet = it }
            )
            4 -> Phase4CompletionReportTab()
        }
    }

    // Modal to add new price master item
    if (showAddMasterDialog) {
        AddPriceMasterModal(
            onDismiss = { showAddMasterDialog = false },
            onSave = { newMaster ->
                coroutineScope.launch {
                    repository.addPricingMaster(newMaster)
                    showAddMasterDialog = false
                }
            }
        )
    }
}

@Composable
fun DynamicCommercialCalculatorTab(
    capacityKw: Double,
    systemCapacityKwInput: String, onCapacityChange: (String) -> Unit,
    projectTypeInput: String, onProjectTypeChange: (String) -> Unit,
    stateRegionInput: String, onStateRegionChange: (String) -> Unit,
    partnerMarginPctInput: String, onPartnerMarginChange: (String) -> Unit,
    franchiseMarginPctInput: String, onFranchiseMarginChange: (String) -> Unit,
    corporateMarginPctInput: String, onCorporateMarginChange: (String) -> Unit,
    gstRateSelection: String, onGstRateChange: (String) -> Unit,
    applySubsidy: Boolean, onApplySubsidyChange: (Boolean) -> Unit,
    moduleCostUsd: Double,
    inverterCostUsd: Double,
    structureCostUsd: Double,
    cableAndElectricalCostUsd: Double,
    civilAndLaborCostUsd: Double,
    baseEpcSubtotalUsd: Double,
    totalMarginUsd: Double,
    totalMarginPct: Double,
    gstAmountUsd: Double,
    subsidyDeductionUsd: Double,
    finalCustomerPriceUsd: Double,
    monthlyEmiUsd: Double
) {
    val selectedGstRatePct = gstRateSelection.toDoubleOrNull() ?: 18.0
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            // Metrics Bar
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                EnterpriseMetricCard(
                    title = "Base EPC Cost",
                    value = "$%,.0f".format(baseEpcSubtotalUsd),
                    subtitle = "Capacity: %.0f kWp".format(capacityKw),
                    icon = Icons.Default.Inventory,
                    modifier = Modifier.weight(1f)
                )
                EnterpriseMetricCard(
                    title = "Commercial Margins",
                    value = "$%,.0f".format(totalMarginUsd),
                    subtitle = "Margin: %.1f%%".format(totalMarginPct),
                    icon = Icons.Default.TrendingUp,
                    modifier = Modifier.weight(1f)
                )
                EnterpriseMetricCard(
                    title = "Turnkey Customer Price",
                    value = "$%,.0f".format(finalCustomerPriceUsd),
                    subtitle = "Est. EMI: $%,.0f/mo".format(monthlyEmiUsd),
                    icon = Icons.Default.Payments,
                    modifier = Modifier.weight(1f)
                )
            }
        }

        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // Left Configuration Inputs
                Column(
                    modifier = Modifier.weight(1f),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    EnterpriseCard {
                        Text(text = "1. Project & Scope Configurator", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Spacer(modifier = Modifier.height(8.dp))
                        
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Box(modifier = Modifier.weight(1f)) {
                                EnterpriseTextField(value = systemCapacityKwInput, onValueChange = onCapacityChange, label = "System Capacity (kWp)")
                            }
                            Box(modifier = Modifier.weight(1f)) {
                                EnterpriseDropdown(
                                    label = "Project Type",
                                    options = listOf("Commercial Rooftop", "Industrial High Voltage", "Residential Rooftop", "Utility Solar Park"),
                                    selectedOption = projectTypeInput,
                                    onOptionSelected = onProjectTypeChange
                                )
                            }
                        }

                        EnterpriseDropdown(
                            label = "State / Jurisdiction GST",
                            options = listOf("Texas (TX)", "California (CA)", "Florida (FL)", "New York (NY)", "Gujarat (GJ)", "Maharashtra (MH)"),
                            selectedOption = stateRegionInput,
                            onOptionSelected = onStateRegionChange
                        )
                    }

                    EnterpriseCard {
                        Text(text = "2. Multi-Tier Commercial Margins", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Spacer(modifier = Modifier.height(8.dp))

                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Box(modifier = Modifier.weight(1f)) {
                                EnterpriseTextField(value = partnerMarginPctInput, onValueChange = onPartnerMarginChange, label = "Partner Margin (%)")
                            }
                            Box(modifier = Modifier.weight(1f)) {
                                EnterpriseTextField(value = franchiseMarginPctInput, onValueChange = onFranchiseMarginChange, label = "Franchise Margin (%)")
                            }
                            Box(modifier = Modifier.weight(1f)) {
                                EnterpriseTextField(value = corporateMarginPctInput, onValueChange = onCorporateMarginChange, label = "Corporate Margin (%)")
                            }
                        }

                        if (totalMarginPct < 15.0) {
                            Surface(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(top = 8.dp),
                                color = SuniteWarningBg,
                                shape = RoundedCornerShape(6.dp)
                            ) {
                                Text(
                                    text = "⚠ Minimum margin threshold is 15.0%. Requires Director Level Override.",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = SuniteWarning,
                                    modifier = Modifier.padding(8.dp)
                                )
                            }
                        }
                    }

                    EnterpriseCard {
                        Text(text = "3. Tax (GST) & Subsidy Incentives", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Spacer(modifier = Modifier.height(8.dp))

                        EnterpriseDropdown(
                            label = "GST Rate Category",
                            options = listOf("18.0", "12.0", "5.0", "28.0"),
                            selectedOption = gstRateSelection,
                            onOptionSelected = onGstRateChange
                        )

                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(top = 6.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(text = "Apply Government Subsidy / IRA Credit", style = MaterialTheme.typography.bodySmall.copy(color = SuniteNavy))
                            Switch(checked = applySubsidy, onCheckedChange = onApplySubsidyChange)
                        }
                    }
                }

                // Right Dynamic Cost Sheet Column
                Column(
                    modifier = Modifier.weight(1f),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    EnterpriseCard {
                        Text(text = "Commercial Cost Breakdown Sheet", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "Auto-calculated itemized Bill of Materials (BOM) & Turnkey Execution", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary))

                        Spacer(modifier = Modifier.height(12.dp))

                        CostRow(label = "Solar PV Modules", value = moduleCostUsd)
                        CostRow(label = "Inverters & Transformers", value = inverterCostUsd)
                        CostRow(label = "Mounting Structures & Rails", value = structureCostUsd)
                        CostRow(label = "DC/AC Cables, AJB, SCADA", value = cableAndElectricalCostUsd)
                        CostRow(label = "Civil Works, Labor & Commissioning", value = civilAndLaborCostUsd)
                        
                        Divider(color = SuniteBorder, modifier = Modifier.padding(vertical = 6.dp))

                        CostRow(label = "Base EPC Subtotal", value = baseEpcSubtotalUsd, isBold = true)
                        CostRow(label = "Commercial Margins (${totalMarginPct}%)", value = totalMarginUsd, textColor = SuniteOrange)
                        CostRow(label = "GST Amount (${selectedGstRatePct}%)", value = gstAmountUsd)
                        CostRow(label = "Government Subsidy Deduction", value = -subsidyDeductionUsd, textColor = SuniteSuccess)

                        Divider(color = SuniteNavy, modifier = Modifier.padding(vertical = 8.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(text = "Final Turnkey Customer Price", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                            Text(text = "$%,.0f USD".format(finalCustomerPriceUsd), style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteOrange))
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun CostRow(label: String, value: Double, isBold: Boolean = false, textColor: Color = SuniteNavy) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 3.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = label,
            style = if (isBold) MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy) else MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
        )
        Text(
            text = "$%,.0f".format(value),
            style = if (isBold) MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = textColor) else MaterialTheme.typography.bodySmall.copy(color = textColor)
        )
    }
}

@Composable
fun PriceMasterBomTab(
    masters: List<PricingMasterEntity>,
    onAddClick: () -> Unit,
    onDeleteClick: (PricingMasterEntity) -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(text = "Enterprise Equipment Price Master", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                EnterpriseButton(text = "+ Add Item", onClick = onAddClick, isPrimary = true)
            }
        }

        items(masters, key = { it.id }) { item ->
            EnterpriseCard {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            EnterpriseBadge(text = item.category)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(text = item.itemName, style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        }
                        Text(text = "Brand: ${item.brand} • GST: ${item.gstRatePct}%", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary), modifier = Modifier.padding(top = 2.dp))
                    }

                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Text(
                            text = "$%.2f / %s".format(item.unitPriceUsd, item.unit),
                            style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteOrange)
                        )
                        IconButton(onClick = { onDeleteClick(item) }) {
                            Icon(imageVector = Icons.Default.Delete, contentDescription = "Delete", tint = SuniteDanger)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ApprovalWorkflowTab(
    quotations: List<QuotationCommercialEntity>,
    onApprove: (QuotationCommercialEntity, String) -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        item {
            Text(text = "Quotation Commercial Approval Queue & Audit Log", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
        }

        items(quotations, key = { it.id }) { quot ->
            EnterpriseCard {
                Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(text = quot.customerName, style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                            Text(text = "Ref: ${quot.id} • Capacity: ${quot.systemCapacityKw} kW", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary))
                        }

                        EnterpriseBadge(
                            text = quot.approvalStatus,
                            statusType = if (quot.approvalStatus.contains("Ready") || quot.approvalStatus.contains("Approved")) "APPROVED" else "PENDING"
                        )
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "EPC Cost: $%,.0f | Margins: $%,.0f".format(quot.subtotalBaseEpcUsd, quot.totalMarginUsd), style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                        Text(text = "Customer Price: $%,.0f".format(quot.finalCustomerPriceUsd), style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteOrange))
                    }

                    Text(text = "Notes: ${quot.approvalNotes}", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextMuted))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.End,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        if (!quot.approvalStatus.contains("Ready")) {
                            EnterpriseButton(
                                text = "Sales Approve",
                                onClick = { onApprove(quot, "Pending Finance Approval") },
                                isPrimary = false
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            EnterpriseButton(
                                text = "Finance Approve",
                                onClick = { onApprove(quot, "Approved & Ready") },
                                isPrimary = true
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun CommercialSheetsTab(
    quotations: List<QuotationCommercialEntity>,
    selectedQuotation: QuotationCommercialEntity?,
    onSelectQuotation: (QuotationCommercialEntity) -> Unit
) {
    val currentQuot = selectedQuotation ?: quotations.firstOrNull()

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            EnterpriseCard {
                Text(text = "Select Quotation Commercial Context", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))
                EnterpriseDropdown(
                    label = "Active Quotation Record",
                    options = quotations.map { "${it.customerName} (${it.id})" },
                    selectedOption = currentQuot?.let { "${it.customerName} (${it.id})" } ?: "",
                    onOptionSelected = { str ->
                        val found = quotations.find { "${it.customerName} (${it.id})" == str }
                        if (found != null) onSelectQuotation(found)
                    }
                )
            }
        }

        if (currentQuot != null) {
            item {
                EnterpriseCard {
                    Text(text = "CUSTOMER PRICE SHEET", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                    Text(text = "Formal Customer Facing Commercial Offer & Subsidy Deduction", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))

                    Spacer(modifier = Modifier.height(12.dp))

                    CostRow(label = "Turnkey EPC Solar System", value = currentQuot.subtotalBaseEpcUsd + currentQuot.totalMarginUsd)
                    CostRow(label = "GST Tax Component (${currentQuot.gstRatePct}%)", value = currentQuot.gstAmountUsd)
                    CostRow(label = "Subsidy Incentive Credit", value = -currentQuot.subsidyDeductionUsd, textColor = SuniteSuccess)
                    
                    Divider(color = SuniteBorder, modifier = Modifier.padding(vertical = 6.dp))

                    CostRow(label = "Net Payable Commercial Cost", value = currentQuot.finalCustomerPriceUsd, isBold = true, textColor = SuniteOrange)
                    CostRow(label = "Estimated Solar Loan EMI", value = currentQuot.monthlyEmiUsd, textColor = SuniteNavy)
                }
            }

            item {
                EnterpriseCard {
                    Text(text = "INTERNAL MARGIN & FINANCE SHEET", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                    Text(text = "Confidential Channel Commission & Gross Margin Distribution", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))

                    Spacer(modifier = Modifier.height(12.dp))

                    CostRow(label = "Marketing Partner Commission (${currentQuot.partnerMarginPct}%)", value = currentQuot.subtotalBaseEpcUsd * (currentQuot.partnerMarginPct / 100.0))
                    CostRow(label = "Franchise Royalty Margin (${currentQuot.franchiseMarginPct}%)", value = currentQuot.subtotalBaseEpcUsd * (currentQuot.franchiseMarginPct / 100.0))
                    CostRow(label = "Corporate Retained Net Margin (${currentQuot.corporateMarginPct}%)", value = currentQuot.subtotalBaseEpcUsd * (currentQuot.corporateMarginPct / 100.0), isBold = true, textColor = SuniteSuccess)
                }
            }
        }
    }
}

@Composable
fun Phase4CompletionReportTab() {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            EnterpriseCard {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = "PHASE 4 ARCHITECTURE & COMPLETION REPORT", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "Dynamic Pricing Engine & Commercial Calculator - Status: LOCKED & READY", style = MaterialTheme.typography.bodySmall.copy(color = SuniteSuccess, fontWeight = FontWeight.Bold))
                    }
                    EnterpriseBadge(text = "PHASE 4 COMPLETE", statusType = "APPROVED")
                }

                Spacer(modifier = Modifier.height(16.dp))

                Divider(color = SuniteBorder)

                Spacer(modifier = Modifier.height(12.dp))

                Text(text = "System Architecture Deliverables Summary", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))

                Spacer(modifier = Modifier.height(8.dp))

                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    EnterpriseMetricCard(title = "Total Active Screens", value = "12 Screens", subtitle = "Phase 1 - 4 Unified", modifier = Modifier.weight(1f))
                    EnterpriseMetricCard(title = "Database Tables", value = "17 Tables", subtitle = "Room Persistence", modifier = Modifier.weight(1f))
                }

                Spacer(modifier = Modifier.height(8.dp))

                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    EnterpriseMetricCard(title = "REST / Room APIs", value = "28 Endpoints", subtitle = "Full CRUD & Flow", modifier = Modifier.weight(1f))
                    EnterpriseMetricCard(title = "Approval Workflows", value = "4 Tiers", subtitle = "Lock & Audit", modifier = Modifier.weight(1f))
                }

                Spacer(modifier = Modifier.height(16.dp))

                Text(text = "Commercial Engine Workflow Architecture", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))

                Surface(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 8.dp),
                    color = SuniteBackground,
                    shape = RoundedCornerShape(8.dp),
                    border = androidx.compose.foundation.BorderStroke(1.dp, SuniteBorder)
                ) {
                    Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        Text(text = "1. Solar Design & Capacity Approved → Fetch Equipment BOM", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "2. Price Master Lookup → Calculate Base EPC Material & Civil Cost", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "3. Apply Multi-Tier Margins (Partner + Franchise + Corporate)", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "4. GST Tax Calculation (18% / 12%) & Subsidy Incentive Deductions", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "5. Multi-Level Approval Queue (Sales → Finance → Director)", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "6. Generate Output Price Sheets (Customer, Internal, Margin & Tax)", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteSuccess))
                    }
                }
            }
        }
    }
}

@Composable
fun AddPriceMasterModal(
    onDismiss: () -> Unit,
    onSave: (PricingMasterEntity) -> Unit
) {
    var category by remember { mutableStateOf("Solar Modules") }
    var itemName by remember { mutableStateOf("") }
    var priceStr by remember { mutableStateOf("0.22") }
    var unit by remember { mutableStateOf("Wp") }
    var brand by remember { mutableStateOf("Waaree") }

    EnterpriseModal(
        title = "Add Price Master Component",
        subtitle = "Configure Base Equipment Pricing & Tax Rules",
        onDismissRequest = onDismiss,
        confirmText = "Save Master Item",
        onConfirm = {
            val price = priceStr.toDoubleOrNull() ?: 0.0
            if (itemName.isNotEmpty() && price > 0) {
                onSave(
                    PricingMasterEntity(
                        id = "pm_" + System.currentTimeMillis(),
                        category = category,
                        itemName = itemName,
                        unitPriceUsd = price,
                        unit = unit,
                        brand = brand
                    )
                )
            }
        }
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            EnterpriseDropdown(
                label = "Category",
                options = listOf("Solar Modules", "Inverters", "Structures", "DC Cables", "AC Cables", "MC4 Connectors", "Earthing Kits", "Lightning Arresters", "Civil & Installation"),
                selectedOption = category,
                onOptionSelected = { category = it }
            )
            EnterpriseTextField(value = itemName, onValueChange = { itemName = it }, label = "Item Name")
            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = priceStr, onValueChange = { priceStr = it }, label = "Unit Price ($)") }
                Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = unit, onValueChange = { unit = it }, label = "Unit (Wp/Unit/Mtr)") }
            }
            EnterpriseTextField(value = brand, onValueChange = { brand = it }, label = "Brand")
        }
    }
}
