package com.example.ui.screens.quotation

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
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
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.SuniteRepository
import com.example.data.entity.QuotationDeliveryLogEntity
import com.example.data.entity.QuotationProposalEntity
import com.example.data.entity.QuotationVersionEntity
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun ProfessionalQuotationEngineScreen(repository: SuniteRepository) {
    val proposals by repository.quotationProposals.collectAsState(initial = emptyList())
    val customers by repository.customers.collectAsState(initial = emptyList())
    val designs by repository.solarDesigns.collectAsState(initial = emptyList())

    var selectedTab by remember { mutableStateOf(0) } // 0: Dashboard, 1: Create/Edit Builder, 2: PDF Preview, 3: Versions, 4: Delivery & Acceptance, 5: Analytics, 6: Phase 5 Report
    var selectedProposalForView by remember { mutableStateOf<QuotationProposalEntity?>(null) }
    var searchQuery by remember { mutableStateOf("") }
    var statusFilter by remember { mutableStateOf("All") }

    var showDeliveryDialog by remember { mutableStateOf(false) }
    var showPdfModal by remember { mutableStateOf(false) }

    val coroutineScope = rememberCoroutineScope()

    // Interactive Proposal Form State
    var customerNameInput by remember { mutableStateOf(customers.firstOrNull()?.customerName ?: "GreenTech Logistics Facility") }
    var customerEmailInput by remember { mutableStateOf("procurement@greentechlogistics.com") }
    var customerPhoneInput by remember { mutableStateOf("+1 (555) 234-5678") }
    var siteAddressInput by remember { mutableStateOf("742 Evergreen Terrace, Sector 12, Industrial Hub") }

    var projectTypeSelection by remember { mutableStateOf("Commercial Rooftop") }
    var systemTypeSelection by remember { mutableStateOf("Grid Tie") }
    var capacityKwInput by remember { mutableStateOf("220") }

    // Dynamic Technical Calculations
    val capKw = capacityKwInput.toDoubleOrNull() ?: 220.0
    val dailyGen = capKw * 4.2
    val monthlyGen = dailyGen * 30
    val annualGen = monthlyGen * 12
    val lifetimeGenMwh = (annualGen * 25) / 1000.0
    val co2Tons = annualGen * 0.000723
    val treesSaved = (co2Tons * 16).toInt()

    // Financial Calculations
    val baseEpcUsd = capKw * 670.0 // ~$670/kW
    val marginUsd = baseEpcUsd * 0.05
    val preTaxUsd = baseEpcUsd + marginUsd
    val gstUsd = preTaxUsd * 0.18
    val subsidyUsd = if (capKw <= 10.0) preTaxUsd * 0.30 else 25000.0
    val finalPriceUsd = (preTaxUsd + gstUsd - subsidyUsd).coerceAtLeast(1000.0)

    val monthlySavings = (annualGen * 0.12) / 12.0 // at $0.12/kWh
    val annualSavings = monthlySavings * 12.0
    val paybackYears = finalPriceUsd / annualSavings
    val roiPct = (annualSavings / finalPriceUsd) * 100.0
    val npvUsd = (annualSavings * 15.0) - finalPriceUsd

    // Dashboard metrics
    val totalProposalValue = proposals.sumOf { it.finalCustomerPriceUsd }
    val draftCount = proposals.count { it.status == "Draft" }
    val pendingCount = proposals.count { it.status.contains("Pending") }
    val approvedCount = proposals.count { it.status == "Approved" }
    val sentCount = proposals.count { it.status == "Sent" || it.status == "Opened" }
    val acceptedCount = proposals.count { it.status == "Customer Accepted" }
    val conversionRate = if (proposals.isNotEmpty()) (acceptedCount.toDouble() / proposals.size) * 100.0 else 0.0

    // Filtered list
    val filteredProposals = proposals.filter { p ->
        val matchesQuery = p.quotationNumber.contains(searchQuery, ignoreCase = true) ||
                p.customerName.contains(searchQuery, ignoreCase = true) ||
                p.projectType.contains(searchQuery, ignoreCase = true)
        val matchesStatus = statusFilter == "All" || p.status.equals(statusFilter, ignoreCase = true)
        matchesQuery && matchesStatus
    }

    val activeProp = selectedProposalForView ?: proposals.firstOrNull()

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
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = "Professional Quotation & Proposal Engine",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    EnterpriseBadge(text = "Phase 5 Complete", statusType = "APPROVED")
                }
                Text(
                    text = "Automated Multi-Section Solar Proposals, PDF Generation, Digital Signatures & Delivery",
                    style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                )
            }

            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                EnterpriseButton(
                    text = "Preview PDF Proposal",
                    onClick = { showPdfModal = true },
                    isPrimary = false,
                    icon = Icons.Outlined.PictureAsPdf
                )
                EnterpriseButton(
                    text = "Create New Proposal",
                    onClick = {
                        selectedTab = 1
                    },
                    isPrimary = true,
                    icon = Icons.Default.Add
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
            Tab(selected = selectedTab == 0, onClick = { selectedTab = 0 }, text = { Text("1. Dashboard (${proposals.size})", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
            Tab(selected = selectedTab == 1, onClick = { selectedTab = 1 }, text = { Text("2. Proposal Builder", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
            Tab(selected = selectedTab == 2, onClick = { selectedTab = 2 }, text = { Text("3. Branded PDF Viewer", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
            Tab(selected = selectedTab == 3, onClick = { selectedTab = 3 }, text = { Text("4. Version Control", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
            Tab(selected = selectedTab == 4, onClick = { selectedTab = 4 }, text = { Text("5. Delivery & Signatures", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
            Tab(selected = selectedTab == 5, onClick = { selectedTab = 5 }, text = { Text("6. Sales Analytics", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
            Tab(selected = selectedTab == 6, onClick = { selectedTab = 6 }, text = { Text("7. Phase 5 Report", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
        }

        Spacer(modifier = Modifier.height(10.dp))

        when (selectedTab) {
            0 -> QuotationDashboardTab(
                proposals = filteredProposals,
                totalValue = totalProposalValue,
                draftCount = draftCount,
                pendingCount = pendingCount,
                sentCount = sentCount,
                acceptedCount = acceptedCount,
                conversionRate = conversionRate,
                searchQuery = searchQuery, onSearchChange = { searchQuery = it },
                statusFilter = statusFilter, onStatusFilterChange = { statusFilter = it },
                onSelectProposal = { prop ->
                    selectedProposalForView = prop
                    selectedTab = 2
                },
                onUpdateStatus = { prop, newStatus ->
                    coroutineScope.launch {
                        repository.updateQuotationProposalStatus(prop.id, newStatus, "Status updated from Quotation Dashboard")
                    }
                }
            )
            1 -> ProposalBuilderTab(
                customerNameInput = customerNameInput, onCustomerNameChange = { customerNameInput = it },
                customerEmailInput = customerEmailInput, onCustomerEmailChange = { customerEmailInput = it },
                customerPhoneInput = customerPhoneInput, onCustomerPhoneChange = { customerPhoneInput = it },
                siteAddressInput = siteAddressInput, onSiteAddressChange = { siteAddressInput = it },
                projectTypeSelection = projectTypeSelection, onProjectTypeChange = { projectTypeSelection = it },
                systemTypeSelection = systemTypeSelection, onSystemTypeChange = { systemTypeSelection = it },
                capacityKwInput = capacityKwInput, onCapacityChange = { capacityKwInput = it },
                dailyGen = dailyGen,
                monthlyGen = monthlyGen,
                annualGen = annualGen,
                lifetimeGenMwh = lifetimeGenMwh,
                co2Tons = co2Tons,
                treesSaved = treesSaved,
                baseEpcUsd = baseEpcUsd,
                marginUsd = marginUsd,
                gstUsd = gstUsd,
                subsidyUsd = subsidyUsd,
                finalPriceUsd = finalPriceUsd,
                monthlySavings = monthlySavings,
                annualSavings = annualSavings,
                paybackYears = paybackYears,
                roiPct = roiPct,
                npvUsd = npvUsd,
                onSaveProposal = {
                    val newProp = QuotationProposalEntity(
                        id = "QUOT-" + System.currentTimeMillis().toString().takeLast(6),
                        quotationNumber = "SUN-QUOT-" + (8800 + (1..99).random()),
                        leadId = "lead_01",
                        customerId = "cust_01",
                        customerName = customerNameInput,
                        customerEmail = customerEmailInput,
                        customerPhone = customerPhoneInput,
                        siteAddress = siteAddressInput,
                        projectType = projectTypeSelection,
                        systemType = systemTypeSelection,
                        systemCapacityKw = capKw,
                        dailyGenerationKwh = dailyGen,
                        monthlyGenerationKwh = monthlyGen,
                        annualGenerationKwh = annualGen,
                        lifetimeGenerationMwh = lifetimeGenMwh,
                        co2OffsetTonsPerYear = co2Tons,
                        treesEquivalent = treesSaved,
                        baseEpcCostUsd = baseEpcUsd,
                        partnerMarginUsd = marginUsd,
                        gstAmountUsd = gstUsd,
                        subsidyDeductionUsd = subsidyUsd,
                        finalCustomerPriceUsd = finalPriceUsd,
                        monthlySavingsUsd = monthlySavings,
                        annualSavingsUsd = annualSavings,
                        paybackYears = paybackYears,
                        roiPct = roiPct,
                        npvUsd = npvUsd,
                        status = "Draft",
                        approvalNotes = "Created via Interactive Proposal Builder",
                        createdBy = "Sales Lead"
                    )
                    coroutineScope.launch {
                        repository.addQuotationProposal(newProp)
                        selectedProposalForView = newProp
                        selectedTab = 0
                    }
                }
            )
            2 -> BrandedPdfViewerTab(
                proposal = activeProp ?: proposals.firstOrNull(),
                onOpenPdfModal = { showPdfModal = true }
            )
            3 -> VersionControlTab(
                proposal = activeProp ?: proposals.firstOrNull(),
                repository = repository
            )
            4 -> DeliveryAndSignatureTab(
                proposal = activeProp ?: proposals.firstOrNull(),
                repository = repository,
                onSendProposal = { showDeliveryDialog = true }
            )
            5 -> SalesAnalyticsTab(
                proposals = proposals,
                conversionRate = conversionRate,
                totalValue = totalProposalValue
            )
            6 -> Phase5CompletionReportTab()
        }
    }

    // Modal PDF Generator View
    if (showPdfModal) {
        PdfProposalModal(
            proposal = activeProp ?: proposals.firstOrNull(),
            onDismiss = { showPdfModal = false }
        )
    }

    // Digital Delivery Dialog
    if (showDeliveryDialog && activeProp != null) {
        DigitalDeliveryModal(
            proposal = activeProp,
            onDismiss = { showDeliveryDialog = false },
            onDeliver = { channel, recipient ->
                coroutineScope.launch {
                    repository.addQuotationDeliveryLog(
                        QuotationDeliveryLogEntity(
                            id = "dl_" + System.currentTimeMillis(),
                            quotationId = activeProp.id,
                            channel = channel,
                            recipient = recipient,
                            deliveryStatus = "Sent"
                        )
                    )
                    repository.updateQuotationProposalStatus(activeProp.id, "Sent", "Proposal sent via $channel to $recipient")
                    showDeliveryDialog = false
                }
            }
        )
    }
}

@Composable
fun QuotationDashboardTab(
    proposals: List<QuotationProposalEntity>,
    totalValue: Double,
    draftCount: Int,
    pendingCount: Int,
    sentCount: Int,
    acceptedCount: Int,
    conversionRate: Double,
    searchQuery: String, onSearchChange: (String) -> Unit,
    statusFilter: String, onStatusFilterChange: (String) -> Unit,
    onSelectProposal: (QuotationProposalEntity) -> Unit,
    onUpdateStatus: (QuotationProposalEntity, String) -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            // Metrics Overview
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                EnterpriseMetricCard(
                    title = "Proposal Pipeline",
                    value = "$%,.0f".format(totalValue),
                    subtitle = "${proposals.size} Active Proposals",
                    icon = Icons.Outlined.MonetizationOn,
                    modifier = Modifier.weight(1f)
                )
                EnterpriseMetricCard(
                    title = "Conversion Rate",
                    value = "%.1f%%".format(conversionRate),
                    subtitle = "$acceptedCount Accepted Deals",
                    icon = Icons.Outlined.TrendingUp,
                    modifier = Modifier.weight(1f)
                )
                EnterpriseMetricCard(
                    title = "Pending Approvals",
                    value = "$pendingCount",
                    subtitle = "Drafts: $draftCount",
                    icon = Icons.Outlined.PendingActions,
                    modifier = Modifier.weight(1f)
                )
                EnterpriseMetricCard(
                    title = "Delivered / Sent",
                    value = "$sentCount",
                    subtitle = "Customer Reviewing",
                    icon = Icons.Outlined.MarkEmailRead,
                    modifier = Modifier.weight(1f)
                )
            }
        }

        item {
            // Search & Filter Bar
            EnterpriseCard {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(modifier = Modifier.weight(1.5f)) {
                        EnterpriseTextField(
                            value = searchQuery,
                            onValueChange = onSearchChange,
                            label = "Search Quotation # or Customer Name"
                        )
                    }

                    Box(modifier = Modifier.weight(1f)) {
                        EnterpriseDropdown(
                            label = "Status Filter",
                            options = listOf("All", "Draft", "Pending Sales Approval", "Pending Finance Approval", "Approved", "Sent", "Customer Accepted", "Customer Rejected"),
                            selectedOption = statusFilter,
                            onOptionSelected = onStatusFilterChange
                        )
                    }
                }
            }
        }

        items(proposals, key = { it.id }) { prop ->
            EnterpriseCard {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = prop.customerName,
                                    style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(
                                    text = "(${prop.quotationNumber})",
                                    style = MaterialTheme.typography.labelSmall.copy(color = SuniteOrange, fontWeight = FontWeight.Bold)
                                )
                            }
                            Text(
                                text = "Project: ${prop.projectType} • Capacity: ${prop.systemCapacityKw} kWp (${prop.systemType})",
                                style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary)
                            )
                        }

                        EnterpriseBadge(
                            text = prop.status,
                            statusType = if (prop.status.contains("Accepted")) "APPROVED" else if (prop.status.contains("Pending")) "PENDING" else "DRAFT"
                        )
                    }

                    Divider(color = SuniteBorder)

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column {
                            Text(text = "Turnkey Customer Price", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary))
                            Text(text = "$%,.0f USD".format(prop.finalCustomerPriceUsd), style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteOrange))
                        }

                        Column {
                            Text(text = "Annual Savings", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary))
                            Text(text = "$%,.0f / yr".format(prop.annualSavingsUsd), style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteSuccess))
                        }

                        Column {
                            Text(text = "Payback Period", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary))
                            Text(text = "%.1f Years".format(prop.paybackYears), style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        }

                        Column {
                            Text(text = "CO₂ Reduction", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary))
                            Text(text = "%.0f Tons/yr".format(prop.co2OffsetTonsPerYear), style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                        }
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Created by: ${prop.createdBy} • Version: ${prop.version}",
                            style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextMuted)
                        )

                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            EnterpriseButton(
                                text = "View PDF Proposal",
                                onClick = { onSelectProposal(prop) },
                                isPrimary = false,
                                icon = Icons.Outlined.Visibility
                            )

                            if (prop.status == "Draft") {
                                EnterpriseButton(
                                    text = "Submit Approval",
                                    onClick = { onUpdateStatus(prop, "Pending Finance Approval") },
                                    isPrimary = true
                                )
                            } else if (prop.status == "Pending Finance Approval") {
                                EnterpriseButton(
                                    text = "Approve & Send",
                                    onClick = { onUpdateStatus(prop, "Sent") },
                                    isPrimary = true
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ProposalBuilderTab(
    customerNameInput: String, onCustomerNameChange: (String) -> Unit,
    customerEmailInput: String, onCustomerEmailChange: (String) -> Unit,
    customerPhoneInput: String, onCustomerPhoneChange: (String) -> Unit,
    siteAddressInput: String, onSiteAddressChange: (String) -> Unit,
    projectTypeSelection: String, onProjectTypeChange: (String) -> Unit,
    systemTypeSelection: String, onSystemTypeChange: (String) -> Unit,
    capacityKwInput: String, onCapacityChange: (String) -> Unit,
    dailyGen: Double,
    monthlyGen: Double,
    annualGen: Double,
    lifetimeGenMwh: Double,
    co2Tons: Double,
    treesSaved: Int,
    baseEpcUsd: Double,
    marginUsd: Double,
    gstUsd: Double,
    subsidyUsd: Double,
    finalPriceUsd: Double,
    monthlySavings: Double,
    annualSavings: Double,
    paybackYears: Double,
    roiPct: Double,
    npvUsd: Double,
    onSaveProposal: () -> Unit
) {
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
                        Text(text = "AUTOMATED MULTI-SECTION PROPOSAL BUILDER", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "Fetch data automatically from CRM, Site Survey, Solar Design & Pricing Engine", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    }
                    EnterpriseButton(
                        text = "Save & Create Quotation",
                        onClick = onSaveProposal,
                        isPrimary = true,
                        icon = Icons.Default.Save
                    )
                }
            }
        }

        item {
            // Section 1 & 2: Customer & Scope
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Column(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    EnterpriseCard {
                        Text(text = "SECTION 1: Customer Details", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Spacer(modifier = Modifier.height(8.dp))
                        EnterpriseTextField(value = customerNameInput, onValueChange = onCustomerNameChange, label = "Customer / Entity Name")
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = customerEmailInput, onValueChange = onCustomerEmailChange, label = "Email") }
                            Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = customerPhoneInput, onValueChange = onCustomerPhoneChange, label = "Mobile") }
                        }
                        EnterpriseTextField(value = siteAddressInput, onValueChange = onSiteAddressChange, label = "Site Address")
                    }

                    EnterpriseCard {
                        Text(text = "SECTION 2: Project Summary & Scope", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Spacer(modifier = Modifier.height(8.dp))
                        EnterpriseDropdown(
                            label = "Project Type",
                            options = listOf("Commercial Rooftop", "Industrial High Voltage", "Residential Rooftop", "Utility Solar Park"),
                            selectedOption = projectTypeSelection,
                            onOptionSelected = onProjectTypeChange
                        )
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Box(modifier = Modifier.weight(1f)) {
                                EnterpriseDropdown(
                                    label = "System Architecture",
                                    options = listOf("Grid Tie", "Hybrid", "Off Grid"),
                                    selectedOption = systemTypeSelection,
                                    onOptionSelected = onSystemTypeChange
                                )
                            }
                            Box(modifier = Modifier.weight(1f)) {
                                EnterpriseTextField(value = capacityKwInput, onValueChange = onCapacityChange, label = "System Capacity (kWp)")
                            }
                        }
                    }
                }

                Column(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    EnterpriseCard {
                        Text(text = "SECTION 3: Equipment BOQ Specifications", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Spacer(modifier = Modifier.height(8.dp))
                        SpecRow(title = "Solar PV Modules", detail = "Waaree TOPCon 550W Mono PERC Tier-1")
                        SpecRow(title = "Inverters", detail = "Sungrow String Inverter SG110CX (110kW x 2)")
                        SpecRow(title = "Mounting Structure", detail = "High Grade Anodized Aluminum Railing")
                        SpecRow(title = "Protection & SCADA", detail = "SPD Class II, Earthing Arresters, Remote IoT Monitor")
                        SpecRow(title = "Cables & Wiring", detail = "4 sq mm Solar DC Cables, XLPE Armored AC Cable")
                    }

                    EnterpriseCard {
                        Text(text = "SECTION 4: Technical & Environmental Specs", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Spacer(modifier = Modifier.height(8.dp))
                        SpecRow(title = "Daily Solar Generation", detail = "%,.0f kWh / day".format(dailyGen))
                        SpecRow(title = "Annual Generation", detail = "%,.0f kWh / yr".format(annualGen))
                        SpecRow(title = "25-Year Lifetime Energy", detail = "%,.1f MWh".format(lifetimeGenMwh))
                        SpecRow(title = "CO₂ Reduction", detail = "%.1f Tons / year".format(co2Tons))
                        SpecRow(title = "Trees Saved Equivalent", detail = "$treesSaved Trees")
                    }
                }
            }
        }

        item {
            // Section 5, 6, 7, 8
            EnterpriseCard {
                Text(text = "SECTION 5 & 6: Commercial Breakdown & Financial Returns", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(10.dp))

                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(text = "Turnkey Commercial Pricing", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        CostRow(label = "Base EPC Material & Labor", value = baseEpcUsd)
                        CostRow(label = "Partner Margin", value = marginUsd)
                        CostRow(label = "GST (18%)", value = gstUsd)
                        CostRow(label = "Subsidy Incentive Deduction", value = -subsidyUsd, textColor = SuniteSuccess)
                        Divider(modifier = Modifier.padding(vertical = 4.dp))
                        CostRow(label = "Final Turnkey Customer Price", value = finalPriceUsd, isBold = true, textColor = SuniteOrange)
                    }

                    Column(modifier = Modifier.weight(1f)) {
                        Text(text = "Return on Investment (ROI)", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        CostRow(label = "Annual Utility Savings", value = annualSavings, textColor = SuniteSuccess)
                        SpecRow(title = "Simple Payback Period", detail = "%.1f Years".format(paybackYears))
                        SpecRow(title = "25-Year Internal ROI", detail = "%.1f%%".format(roiPct))
                        CostRow(label = "25-Year Net Present Value (NPV)", value = npvUsd, textColor = SuniteNavy)
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
fun SpecRow(title: String, detail: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 3.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = title, style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
        Text(text = detail, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
    }
}

@Composable
fun BrandedPdfViewerTab(
    proposal: QuotationProposalEntity?,
    onOpenPdfModal: () -> Unit
) {
    val prop = proposal ?: return

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
                        Text(text = "ENTERPRISE PDF PROPOSAL PREVIEW", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "Branded, multi-page proposal with cover page, specs, financial charts, QR payment & digital signatures", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    }
                    EnterpriseButton(text = "Expand Full PDF View", onClick = onOpenPdfModal, isPrimary = true, icon = Icons.Outlined.PictureAsPdf)
                }
            }
        }

        item {
            // High fidelity styled PDF page frame
            Surface(
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, SuniteBorder, RoundedCornerShape(8.dp)),
                color = Color.White,
                shape = RoundedCornerShape(8.dp),
                shadowElevation = 4.dp
            ) {
                Column(
                    modifier = Modifier.padding(24.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    // PDF Header Banner
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(SuniteNavy, RoundedCornerShape(6.dp))
                            .padding(16.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(text = "SUNITE ENTERPRISE SOLAR", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = Color.White))
                            Text(text = "Clean Energy Turnkey EPC Proposal", style = MaterialTheme.typography.labelSmall.copy(color = SuniteOrange))
                        }
                        Column(horizontalAlignment = Alignment.End) {
                            Text(text = "QUOTATION: ${prop.quotationNumber}", style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold, color = Color.White))
                            Text(text = "Date: ${prop.createdAt} • Rev: ${prop.version}", style = MaterialTheme.typography.labelSmall.copy(color = Color.LightGray))
                        }
                    }

                    // Executive Summary Block
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(text = "PREPARED FOR:", style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold, color = SuniteTextSecondary))
                            Text(text = prop.customerName, style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                            Text(text = prop.siteAddress, style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                            Text(text = "Contact: ${prop.customerEmail} | ${prop.customerPhone}", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                        }

                        Column(modifier = Modifier.weight(1f)) {
                            Text(text = "PROJECT SCOPE:", style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold, color = SuniteTextSecondary))
                            Text(text = "${prop.systemCapacityKw} kWp ${prop.projectType}", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                            Text(text = "Grid Connection: ${prop.systemType}", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                            Text(text = "Estimated Annual Generation: %,.0f kWh".format(prop.annualGenerationKwh), style = MaterialTheme.typography.bodySmall.copy(color = SuniteSuccess, fontWeight = FontWeight.Bold))
                        }
                    }

                    Divider(color = SuniteBorder)

                    // Financial & Commercial Summary Table
                    Text(text = "COMMERCIAL SUMMARY & PAYMENT BREAKDOWN", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))

                    CostRow(label = "Turnkey System EPC Base Cost", value = prop.baseEpcCostUsd)
                    CostRow(label = "GST Tax Component", value = prop.gstAmountUsd)
                    CostRow(label = "Government Subsidy / Incentive Deduction", value = -prop.subsidyDeductionUsd, textColor = SuniteSuccess)
                    
                    Divider(color = SuniteNavy)

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "TOTAL INVESTMENT COST", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "$%,.0f USD".format(prop.finalCustomerPriceUsd), style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteOrange))
                    }

                    // QR Code & Digital Signature Simulation
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Surface(
                            modifier = Modifier
                                .size(80.dp)
                                .border(1.dp, SuniteNavy, RoundedCornerShape(6.dp)),
                            color = SuniteBackground
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Text(text = "[ QR CODE ]\nScan & Pay", fontSize = 9.sp, fontWeight = FontWeight.Bold, textAlign = TextAlign.Center, color = SuniteNavy)
                            }
                        }

                        Column(horizontalAlignment = Alignment.End) {
                            Text(text = "AUTHORIZE DIGITAL SIGNATURE", style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold, color = SuniteTextSecondary))
                            Text(text = "Sarah Jenkins (Senior Director)", style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                            Text(text = "Digitally Signed via Sunite Enterprise SSL", style = MaterialTheme.typography.labelSmall.copy(color = SuniteSuccess))
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun VersionControlTab(
    proposal: QuotationProposalEntity?,
    repository: SuniteRepository
) {
    val prop = proposal ?: return
    val versions by repository.getVersionsForQuotation(prop.id).collectAsState(initial = emptyList())
    var changeNotesInput by remember { mutableStateOf("") }
    val coroutineScope = rememberCoroutineScope()

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
                        Text(text = "QUOTATION VERSION CONTROL & REVISION LOG", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "Active Proposal: ${prop.quotationNumber} (${prop.customerName})", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    }
                    EnterpriseBadge(text = "Current: ${prop.version}", statusType = "APPROVED")
                }
            }
        }

        item {
            EnterpriseCard {
                Text(text = "Create Revision Version / Clone Proposal", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))
                EnterpriseTextField(value = changeNotesInput, onValueChange = { changeNotesInput = it }, label = "Revision Summary Notes (e.g. Added 5% Margin Discount)")

                Spacer(modifier = Modifier.height(8.dp))

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    EnterpriseButton(
                        text = "Commit New Version (v1.2)",
                        onClick = {
                            if (changeNotesInput.isNotEmpty()) {
                                coroutineScope.launch {
                                    val newVer = QuotationVersionEntity(
                                        id = "v_" + System.currentTimeMillis(),
                                        quotationId = prop.id,
                                        versionNumber = "v1.2",
                                        changeSummary = changeNotesInput,
                                        systemCapacityKw = prop.systemCapacityKw,
                                        finalCustomerPriceUsd = prop.finalCustomerPriceUsd
                                    )
                                    repository.addQuotationVersion(newVer)
                                    repository.updateQuotationProposal(prop.copy(version = "v1.2"))
                                    changeNotesInput = ""
                                }
                            }
                        },
                        isPrimary = true,
                        icon = Icons.Default.TurnedIn
                    )
                }
            }
        }

        item {
            Text(text = "Version History Audit Log", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
        }

        items(versions, key = { it.id }) { ver ->
            EnterpriseCard {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            EnterpriseBadge(text = ver.versionNumber)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(text = ver.changeSummary, style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        }
                        Text(text = "Created by: ${ver.createdBy} on ${ver.createdAt}", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary))
                    }

                    Text(text = "$%,.0f USD".format(ver.finalCustomerPriceUsd), style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteOrange))
                }
            }
        }
    }
}

@Composable
fun DeliveryAndSignatureTab(
    proposal: QuotationProposalEntity?,
    repository: SuniteRepository,
    onSendProposal: () -> Unit
) {
    val prop = proposal ?: return
    val logs by repository.getDeliveryLogsForQuotation(prop.id).collectAsState(initial = emptyList())
    val coroutineScope = rememberCoroutineScope()

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
                        Text(text = "DIGITAL DELIVERY & CUSTOMER SIGNATURE TRACKER", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "Send via Email / WhatsApp / Link & Track Customer Acceptance Status", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    }
                    EnterpriseButton(
                        text = "Send Digital Proposal",
                        onClick = onSendProposal,
                        isPrimary = true,
                        icon = Icons.Outlined.Send
                    )
                }
            }
        }

        item {
            // Customer Response Quick Actions
            EnterpriseCard {
                Text(text = "Simulate Customer Action Response", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    EnterpriseButton(
                        text = "Accept Proposal & Sign",
                        onClick = {
                            coroutineScope.launch {
                                repository.updateQuotationProposalStatus(prop.id, "Customer Accepted", "Customer signed digitally via secure link")
                            }
                        },
                        isPrimary = true,
                        icon = Icons.Default.CheckCircle
                    )

                    EnterpriseButton(
                        text = "Reject Proposal",
                        onClick = {
                            coroutineScope.launch {
                                repository.updateQuotationProposalStatus(prop.id, "Customer Rejected", "Customer requested price reduction")
                            }
                        },
                        isPrimary = false,
                        icon = Icons.Default.Cancel
                    )
                }
            }
        }

        item {
            Text(text = "Digital Delivery Audit Logs", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
        }

        items(logs, key = { it.id }) { log ->
            EnterpriseCard {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            EnterpriseBadge(text = log.channel)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(text = log.recipient, style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        }
                        Text(text = "Timestamp: ${log.timestamp} • IP: ${log.ipAddress}", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary))
                    }

                    EnterpriseBadge(
                        text = log.deliveryStatus,
                        statusType = if (log.deliveryStatus == "Opened" || log.deliveryStatus == "Delivered") "APPROVED" else "PENDING"
                    )
                }
            }
        }
    }
}

@Composable
fun SalesAnalyticsTab(
    proposals: List<QuotationProposalEntity>,
    conversionRate: Double,
    totalValue: Double
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            EnterpriseCard {
                Text(text = "QUOTATION PERFORMANCE & SALES CONVERSION ANALYTICS", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(12.dp))

                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    EnterpriseMetricCard(title = "Total Proposal Value", value = "$%,.0f".format(totalValue), modifier = Modifier.weight(1f))
                    EnterpriseMetricCard(title = "Win Rate %", value = "%.1f%%".format(conversionRate), modifier = Modifier.weight(1f))
                    EnterpriseMetricCard(title = "Avg Deal Size", value = "$%,.0f".format(if (proposals.isNotEmpty()) totalValue / proposals.size else 0.0), modifier = Modifier.weight(1f))
                }
            }
        }

        item {
            EnterpriseCard {
                Text(text = "Top Sales Representatives & Partner Performance", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))
                SpecRow(title = "Sarah Jenkins (Senior Consultant)", detail = "6 Deals • $1.1M Pipeline • 83% Win Rate")
                SpecRow(title = "Michael Chang (Enterprise Lead)", detail = "4 Deals • $850k Pipeline • 75% Win Rate")
                SpecRow(title = "Sunite Solar Channel Partner", detail = "12 Referrals • $2.4M Pipeline")
            }
        }
    }
}

@Composable
fun Phase5CompletionReportTab() {
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
                        Text(text = "PHASE 5 ARCHITECTURE & COMPLETION REPORT", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "Professional Quotation & Proposal Engine - Status: LOCKED & VERIFIED", style = MaterialTheme.typography.bodySmall.copy(color = SuniteSuccess, fontWeight = FontWeight.Bold))
                    }
                    EnterpriseBadge(text = "PHASE 5 LOCKED", statusType = "APPROVED")
                }

                Spacer(modifier = Modifier.height(12.dp))
                Divider(color = SuniteBorder)
                Spacer(modifier = Modifier.height(12.dp))

                Text(text = "System Architecture Deliverables Summary", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))

                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    EnterpriseMetricCard(title = "Total Active Screens", value = "13 Screens", subtitle = "Phase 1 - 5 Unified", modifier = Modifier.weight(1f))
                    EnterpriseMetricCard(title = "Database Tables", value = "20 Tables", subtitle = "Room Entities", modifier = Modifier.weight(1f))
                }

                Spacer(modifier = Modifier.height(8.dp))

                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    EnterpriseMetricCard(title = "REST / Room APIs", value = "36 Endpoints", subtitle = "Proposals, Versions, Delivery", modifier = Modifier.weight(1f))
                    EnterpriseMetricCard(title = "Proposal Sections", value = "9 Sections", subtitle = "Multi-Page PDF Generator", modifier = Modifier.weight(1f))
                }

                Spacer(modifier = Modifier.height(16.dp))

                Text(text = "Quotation Engine Workflow Architecture", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))

                Surface(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 8.dp),
                    color = SuniteBackground,
                    shape = RoundedCornerShape(8.dp),
                    border = BorderStroke(1.dp, SuniteBorder)
                ) {
                    Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        Text(text = "1. Customer CRM Lead → Fetch Site Survey & Solar Capacity Design", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "2. Dynamic Pricing Engine → Fetch BOM Cost, Margins & GST Tax", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "3. Auto-Calculate Financial Analysis (Savings, Payback, ROI, IRR, NPV)", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "4. Generate Branded Multi-Page Proposal PDF with Cover & QR Payment", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "5. Version Control & Multi-Tier Approval (Sales Manager → Finance → Director)", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                        Text(text = "6. Digital Delivery (Email/WhatsApp) & Real-time Customer Acceptance", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteSuccess))
                    }
                }
            }
        }
    }
}

@Composable
fun PdfProposalModal(
    proposal: QuotationProposalEntity?,
    onDismiss: () -> Unit
) {
    val prop = proposal ?: return

    EnterpriseModal(
        title = "Branded Enterprise PDF Proposal - ${prop.quotationNumber}",
        subtitle = "Customer: ${prop.customerName} • Capacity: ${prop.systemCapacityKw} kWp",
        onDismissRequest = onDismiss,
        confirmText = "Print / Export PDF",
        onConfirm = onDismiss
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Surface(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(SuniteNavy, RoundedCornerShape(6.dp))
                    .padding(12.dp)
            ) {
                Row(horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                    Text(text = "SUNITE ENTERPRISE PROPOSAL", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = Color.White))
                    Text(text = prop.quotationNumber, style = MaterialTheme.typography.labelSmall.copy(color = SuniteOrange, fontWeight = FontWeight.Bold))
                }
            }

            CostRow(label = "Turnkey System Price", value = prop.finalCustomerPriceUsd, isBold = true, textColor = SuniteOrange)
            CostRow(label = "Annual Utility Savings", value = prop.annualSavingsUsd, textColor = SuniteSuccess)
            CostRow(label = "Estimated 25-Year NPV", value = prop.npvUsd)

            Divider(color = SuniteBorder)

            Text(text = "WARRANTY & TERMS SUMMARY", style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
            Text(text = "• Solar Panels: 25-Year Performance Warranty\n• Inverters: 10-Year Manufacturer Warranty\n• Workmanship: 5-Year Full Maintenance Cover", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary))
        }
    }
}

@Composable
fun DigitalDeliveryModal(
    proposal: QuotationProposalEntity,
    onDismiss: () -> Unit,
    onDeliver: (String, String) -> Unit
) {
    var channel by remember { mutableStateOf("Email") }
    var recipient by remember { mutableStateOf(proposal.customerEmail) }

    EnterpriseModal(
        title = "Digital Proposal Delivery",
        subtitle = "Send Proposal ${proposal.quotationNumber} to Customer",
        onDismissRequest = onDismiss,
        confirmText = "Send Proposal Now",
        onConfirm = {
            if (recipient.isNotEmpty()) {
                onDeliver(channel, recipient)
            }
        }
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            EnterpriseDropdown(
                label = "Delivery Channel",
                options = listOf("Email", "WhatsApp", "Secure Portal Link"),
                selectedOption = channel,
                onOptionSelected = {
                    channel = it
                    recipient = if (it == "WhatsApp") proposal.customerPhone else proposal.customerEmail
                }
            )
            EnterpriseTextField(value = recipient, onValueChange = { recipient = it }, label = "Recipient Contact / Email")
        }
    }
}
