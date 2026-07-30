package com.example.ui.screens.dashboard

import androidx.compose.animation.*
import androidx.compose.foundation.Canvas
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
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.SuniteRepository
import com.example.data.entity.ActivityLogEntity
import com.example.data.entity.BranchEntity
import com.example.data.entity.UserEntity
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun DashboardScreen(
    repository: SuniteRepository,
    onNavigate: (String) -> Unit
) {
    val coroutineScope = rememberCoroutineScope()
    val users by repository.users.collectAsState(initial = emptyList())
    val branches by repository.branches.collectAsState(initial = emptyList())
    val activityLogs by repository.activityLogs.collectAsState(initial = emptyList())
    var showAddLeadModal by remember { mutableStateOf(false) }
    var showRegisterPartnerModal by remember { mutableStateOf(false) }
    var showCreateSurveyModal by remember { mutableStateOf(false) }
    var showGenerateQuoteModal by remember { mutableStateOf(false) }
    var showCreateProjectModal by remember { mutableStateOf(false) }
    var showServiceTicketModal by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
    ) {
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Enterprise Overview Banner
            item {
                EnterpriseCard(
                    borderColor = SuniteNavy,
                    backgroundColor = SuniteNavy
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "SUNITE ENTERPRISE DASHBOARD",
                                style = MaterialTheme.typography.labelMedium.copy(
                                    color = SuniteOrange,
                                    fontWeight = FontWeight.Bold,
                                    letterSpacing = 1.sp
                                )
                            )
                            Text(
                                text = "Unite Solar Partner Network",
                                style = MaterialTheme.typography.titleMedium.copy(
                                    color = Color.White,
                                    fontWeight = FontWeight.Bold
                                ),
                                modifier = Modifier.padding(top = 2.dp)
                            )
                            Text(
                                text = "Solar ERP + CRM + Vendor & Partner Management Platform • Real-time Operations Active",
                                style = MaterialTheme.typography.bodySmall.copy(
                                    color = Color(0xFFCBD5E1),
                                    fontSize = 11.sp
                                ),
                                modifier = Modifier.padding(top = 4.dp)
                            )
                        }
                        Surface(
                            shape = RoundedCornerShape(20.dp),
                            color = Color(0xFF1E428A)
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(8.dp)
                                        .clip(CircleShape)
                                        .background(SuniteSuccess)
                                )
                                Spacer(modifier = Modifier.width(6.dp))
                                Text(
                                    text = "System Operational",
                                    color = Color.White,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }
                }
            }

            // Quick Actions Bar (6 Solar Quick Actions)
            item {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(
                        text = "SOLAR OPERATIONAL QUICK ACTIONS",
                        style = MaterialTheme.typography.labelSmall.copy(
                            fontWeight = FontWeight.Bold,
                            color = SuniteNavy
                        )
                    )
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        EnterpriseButton(
                            text = "+ Add Lead",
                            onClick = { showAddLeadModal = true },
                            modifier = Modifier.weight(1f),
                            isPrimary = true,
                            icon = Icons.Outlined.PersonAdd
                        )
                        EnterpriseButton(
                            text = "+ Partner",
                            onClick = { showRegisterPartnerModal = true },
                            modifier = Modifier.weight(1f),
                            isAccent = true,
                            icon = Icons.Outlined.Handshake
                        )
                        EnterpriseButton(
                            text = "+ Survey",
                            onClick = { showCreateSurveyModal = true },
                            modifier = Modifier.weight(1f),
                            isPrimary = false,
                            icon = Icons.Outlined.Assignment
                        )
                    }
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        EnterpriseButton(
                            text = "+ Quote",
                            onClick = { showGenerateQuoteModal = true },
                            modifier = Modifier.weight(1f),
                            isPrimary = false,
                            icon = Icons.Outlined.RequestQuote
                        )
                        EnterpriseButton(
                            text = "+ Project",
                            onClick = { showCreateProjectModal = true },
                            modifier = Modifier.weight(1f),
                            isPrimary = false,
                            icon = Icons.Outlined.SolarPower
                        )
                        EnterpriseButton(
                            text = "+ Ticket",
                            onClick = { showServiceTicketModal = true },
                            modifier = Modifier.weight(1f),
                            isPrimary = false,
                            icon = Icons.Outlined.ConfirmationNumber
                        )
                    }
                }
            }

            // Solar KPI Cards Grid (10 Solar KPIs)
            item {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Text(
                        text = "SOLAR ECOSYSTEM KPIS & METRICS",
                        style = MaterialTheme.typography.labelSmall.copy(
                            fontWeight = FontWeight.Bold,
                            color = SuniteNavy
                        )
                    )

                    // Row 1
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        KpiCard(
                            title = "Total Leads",
                            value = "1,420",
                            subtext = "+14.2% MoM • CRM Active",
                            icon = Icons.Outlined.Groups,
                            accentColor = SuniteNavy,
                            modifier = Modifier.weight(1f)
                        )
                        KpiCard(
                            title = "Active Quotations",
                            value = "384",
                            subtext = "$8.2M Total Proposal Value",
                            icon = Icons.Outlined.RequestQuote,
                            accentColor = SuniteInfo,
                            modifier = Modifier.weight(1f)
                        )
                    }

                    // Row 2
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        KpiCard(
                            title = "Running Projects",
                            value = "128",
                            subtext = "EPC & Installation Stage",
                            icon = Icons.Outlined.SolarPower,
                            accentColor = SuniteOrange,
                            modifier = Modifier.weight(1f)
                        )
                        KpiCard(
                            title = "Installed Capacity",
                            value = "45.8 MW",
                            subtext = "Global Commercial & Residential",
                            icon = Icons.Outlined.Bolt,
                            accentColor = SuniteSuccess,
                            modifier = Modifier.weight(1f)
                        )
                    }

                    // Row 3
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        KpiCard(
                            title = "Monthly Generation",
                            value = "6.2 GWh",
                            subtext = "Real-time Telemetry Engine",
                            icon = Icons.Outlined.Speed,
                            accentColor = Color(0xFF0284C7),
                            modifier = Modifier.weight(1f)
                        )
                        KpiCard(
                            title = "Revenue (Q3)",
                            value = "$18.4M",
                            subtext = "+18.4% YoY Growth Target",
                            icon = Icons.Outlined.MonetizationOn,
                            accentColor = SuniteSuccess,
                            modifier = Modifier.weight(1f)
                        )
                    }

                    // Row 4
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        KpiCard(
                            title = "Pending Commission",
                            value = "$420K",
                            subtext = "Partner Payout Queue",
                            icon = Icons.Outlined.Payments,
                            accentColor = Color(0xFFD97706),
                            modifier = Modifier.weight(1f)
                        )
                        KpiCard(
                            title = "AMC Contracts",
                            value = "512",
                            subtext = "Warranty & Annual Care",
                            icon = Icons.Outlined.VerifiedUser,
                            accentColor = SuniteNavy,
                            modifier = Modifier.weight(1f)
                        )
                    }

                    // Row 5
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        KpiCard(
                            title = "Open Service Tickets",
                            value = "14",
                            subtext = "Avg SLA Resolution: 4.2h",
                            icon = Icons.Outlined.Build,
                            accentColor = SuniteDanger,
                            modifier = Modifier.weight(1f)
                        )
                        KpiCard(
                            title = "Customer Satisfaction",
                            value = "98.4%",
                            subtext = "4.9/5 Star Rating Avg",
                            icon = Icons.Outlined.ThumbUp,
                            accentColor = SuniteSuccess,
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }

            // Performance & Revenue Canvas Chart
            item {
                EnterpriseCard {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(
                                text = "Monthly Solar Project Revenue & Deployment",
                                style = MaterialTheme.typography.titleSmall.copy(
                                    fontWeight = FontWeight.Bold,
                                    color = SuniteNavy
                                )
                            )
                            Text(
                                text = "Consolidated global branch installations ($ Millions)",
                                style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                            )
                        }
                        EnterpriseBadge(text = "Q3 2026", statusType = "SUPER ADMIN")
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // Canvas Chart Render
                    Canvas(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(140.dp)
                    ) {
                        val width = size.width
                        val height = size.height
                        val barWidth = width / 12f

                        // Draw background grid lines
                        for (i in 1..3) {
                            val y = height * (i / 4f)
                            drawLine(
                                color = Color(0xFFE2E8F0),
                                start = Offset(0f, y),
                                end = Offset(width, y),
                                strokeWidth = 1f
                            )
                        }

                        // Bar data points
                        val revenues = listOf(8.2f, 9.4f, 10.1f, 11.8f, 13.2f, 14.8f)
                        val maxRevenue = 18f

                        revenues.forEachIndexed { index, value ->
                            val barHeight = (value / maxRevenue) * height
                            val x = index * (barWidth * 1.8f) + 20f
                            val y = height - barHeight

                            drawRoundRect(
                                color = if (index == 5) SuniteOrange else SuniteNavy,
                                topLeft = Offset(x, y),
                                size = Size(barWidth, barHeight),
                                cornerRadius = androidx.compose.ui.geometry.CornerRadius(6f, 6f)
                            )
                        }
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        listOf("Feb", "Mar", "Apr", "May", "Jun", "Jul (Active)").forEach { month ->
                            Text(
                                text = month,
                                fontSize = 10.sp,
                                color = SuniteTextSecondary,
                                fontWeight = FontWeight.SemiBold
                            )
                        }
                    }
                }
            }

            // Pending Approvals Section
            item {
                EnterpriseCard {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Pending Partner Approvals",
                            style = MaterialTheme.typography.titleSmall.copy(
                                fontWeight = FontWeight.Bold,
                                color = SuniteNavy
                            )
                        )
                        TextButton(onClick = { onNavigate("users") }) {
                            Text("Manage All", fontSize = 12.sp, color = SuniteNavy, fontWeight = FontWeight.Bold)
                        }
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    listOf(
                        Triple("Karl Weber", "Branch Manager - Munich Hub", "Requires Super Admin Verification"),
                        Triple("Helios Solar Tech Inc.", "Tier 2 Vendor Partner", "Credit Limit Approval ($250k)"),
                        Triple("Sydney Grid Integration", "Branch Expansion", "Tax Exempt Compliance Audit")
                    ).forEach { (title, subtitle, detail) ->
                        Surface(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 4.dp),
                            shape = RoundedCornerShape(8.dp),
                            color = Color(0xFFF8FAFC),
                            border = androidx.compose.foundation.BorderStroke(1.dp, SuniteBorder)
                        ) {
                            Row(
                                modifier = Modifier.padding(12.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column(modifier = Modifier.weight(1f)) {
                                    Text(
                                        text = title,
                                        style = MaterialTheme.typography.bodyMedium.copy(
                                            fontWeight = FontWeight.Bold,
                                            color = SuniteTextPrimary
                                        )
                                    )
                                    Text(
                                        text = "$subtitle • $detail",
                                        style = MaterialTheme.typography.bodySmall.copy(
                                            color = SuniteTextSecondary,
                                            fontSize = 11.sp
                                        )
                                    )
                                }
                                Row {
                                    EnterpriseButton(
                                        text = "Approve",
                                        onClick = { },
                                        isPrimary = true,
                                        modifier = Modifier.height(32.dp)
                                    )
                                }
                            }
                        }
                    }
                }
            }

            // Recent Audit & Activity Feed
            item {
                EnterpriseCard {
                    Text(
                        text = "System Activity & Audit Log Feed",
                        style = MaterialTheme.typography.titleSmall.copy(
                            fontWeight = FontWeight.Bold,
                            color = SuniteNavy
                        )
                    )
                    Spacer(modifier = Modifier.height(12.dp))

                    activityLogs.take(4).forEach { log ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 6.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(32.dp)
                                    .clip(CircleShape)
                                    .background(if (log.status == "SUCCESS") SuniteSuccessBg else SuniteDangerBg),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = if (log.status == "SUCCESS") Icons.Default.CheckCircle else Icons.Default.Warning,
                                    contentDescription = null,
                                    tint = if (log.status == "SUCCESS") SuniteSuccess else SuniteDanger,
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = log.action,
                                    style = MaterialTheme.typography.bodyMedium.copy(
                                        fontWeight = FontWeight.SemiBold,
                                        color = SuniteTextPrimary,
                                        fontSize = 12.sp
                                    )
                                )
                                Text(
                                    text = "${log.userEmail} • ${log.timestamp} • IP: ${log.ipAddress}",
                                    style = MaterialTheme.typography.labelSmall.copy(
                                        color = SuniteTextSecondary,
                                        fontSize = 10.sp
                                    )
                                )
                            }
                            EnterpriseBadge(text = log.module)
                        }
                        Divider(color = SuniteBorder, modifier = Modifier.padding(vertical = 4.dp))
                    }
                }
            }
        }
    }

    // Modal 1: Add Lead
    if (showAddLeadModal) {
        var leadName by remember { mutableStateOf("") }
        var phone by remember { mutableStateOf("") }
        var capacityKw by remember { mutableStateOf("10 kW") }
        var leadType by remember { mutableStateOf("Commercial Solar") }

        EnterpriseModal(
            title = "Add Solar Lead",
            subtitle = "Register potential solar installation prospect",
            onDismissRequest = { showAddLeadModal = false },
            onConfirm = { showAddLeadModal = false }
        ) {
            EnterpriseTextField(
                value = leadName,
                onValueChange = { leadName = it },
                label = "Prospect / Business Name",
                placeholder = "Green Energy Warehouses LLC"
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseTextField(
                value = phone,
                onValueChange = { phone = it },
                label = "Contact Phone Number",
                placeholder = "+1 (512) 555-0199"
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseDropdown(
                label = "Target System Scale",
                options = listOf("Residential (5 - 15 kW)", "Commercial (20 - 100 kW)", "Industrial (100 kW - 1 MW)", "Utility Scale (>1 MW)"),
                selectedOption = capacityKw,
                onOptionSelected = { capacityKw = it }
            )
        }
    }

    // Modal 2: Register Partner
    if (showRegisterPartnerModal) {
        var companyName by remember { mutableStateOf("") }
        var partnerCategory by remember { mutableStateOf("EPC Contractor") }
        var email by remember { mutableStateOf("") }

        EnterpriseModal(
            title = "Register Partner Entity",
            subtitle = "Onboard new partner into Sunite Enterprise Network",
            onDismissRequest = { showRegisterPartnerModal = false },
            onConfirm = { showRegisterPartnerModal = false }
        ) {
            EnterpriseTextField(
                value = companyName,
                onValueChange = { companyName = it },
                label = "Company / Partner Legal Name",
                placeholder = "Apex Solar Technologies Corp"
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseDropdown(
                label = "Partner Category",
                options = listOf("Marketing Partner", "Franchise", "EPC Contractor", "Installation Vendor"),
                selectedOption = partnerCategory,
                onOptionSelected = { partnerCategory = it }
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseTextField(
                value = email,
                onValueChange = { email = it },
                label = "Primary Admin Email",
                placeholder = "admin@partner.com"
            )
        }
    }

    // Modal 3: Create Survey
    if (showCreateSurveyModal) {
        var siteAddress by remember { mutableStateOf("") }
        var engineerName by remember { mutableStateOf("") }

        EnterpriseModal(
            title = "Schedule Site Survey",
            subtitle = "Assign Survey Engineer for site feasibility assessment",
            onDismissRequest = { showCreateSurveyModal = false },
            onConfirm = { showCreateSurveyModal = false }
        ) {
            EnterpriseTextField(
                value = siteAddress,
                onValueChange = { siteAddress = it },
                label = "Site Location / Address",
                placeholder = "450 Industrial Blvd, Austin, TX"
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseTextField(
                value = engineerName,
                onValueChange = { engineerName = it },
                label = "Assigned Survey Engineer",
                placeholder = "David Miller (Tech Lead)"
            )
        }
    }

    // Modal 4: Generate Quote
    if (showGenerateQuoteModal) {
        var customerName by remember { mutableStateOf("") }
        var estimatedCost by remember { mutableStateOf("$45,000") }

        EnterpriseModal(
            title = "Generate Solar Quotation",
            subtitle = "Prepare BOM, tax credits, and financial payback proposal",
            onDismissRequest = { showGenerateQuoteModal = false },
            onConfirm = { showGenerateQuoteModal = false }
        ) {
            EnterpriseTextField(
                value = customerName,
                onValueChange = { customerName = it },
                label = "Customer Name",
                placeholder = "Austin Commercial Hub"
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseTextField(
                value = estimatedCost,
                onValueChange = { estimatedCost = it },
                label = "Estimated Proposal Value ($)",
                placeholder = "$45,000"
            )
        }
    }

    // Modal 5: Create Project
    if (showCreateProjectModal) {
        var projectName by remember { mutableStateOf("") }
        var epcLead by remember { mutableStateOf("") }

        EnterpriseModal(
            title = "Create Solar Project",
            subtitle = "Initiate EPC workflow, panel procurement, and grid sync",
            onDismissRequest = { showCreateProjectModal = false },
            onConfirm = { showCreateProjectModal = false }
        ) {
            EnterpriseTextField(
                value = projectName,
                onValueChange = { projectName = it },
                label = "Project Name",
                placeholder = "50kW Roof Array - Austin Logistics"
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseTextField(
                value = epcLead,
                onValueChange = { epcLead = it },
                label = "EPC Project Manager",
                placeholder = "Carlos Santana"
            )
        }
    }

    // Modal 6: Service Ticket
    if (showServiceTicketModal) {
        var issueSummary by remember { mutableStateOf("") }
        var priority by remember { mutableStateOf("HIGH") }

        EnterpriseModal(
            title = "Raise AMC & Service Ticket",
            subtitle = "Log inverter fault, panel degradation, or telemetry alert",
            onDismissRequest = { showServiceTicketModal = false },
            onConfirm = { showServiceTicketModal = false }
        ) {
            EnterpriseTextField(
                value = issueSummary,
                onValueChange = { issueSummary = it },
                label = "Issue Summary",
                placeholder = "Inverter 3 Telemetry Offline - Fault 402"
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseDropdown(
                label = "Priority Level",
                options = listOf("CRITICAL", "HIGH", "NORMAL", "LOW"),
                selectedOption = priority,
                onOptionSelected = { priority = it }
            )
        }
    }
}

@Composable
fun KpiCard(
    title: String,
    value: String,
    subtext: String,
    icon: ImageVector,
    accentColor: Color,
    modifier: Modifier = Modifier
) {
    EnterpriseCard(
        modifier = modifier,
        padding = 14.dp,
        elevation = 2.dp
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.Top
        ) {
            Column {
                Text(
                    text = title,
                    style = MaterialTheme.typography.labelSmall.copy(
                        color = SuniteTextSecondary,
                        fontWeight = FontWeight.SemiBold
                    )
                )
                Text(
                    text = value,
                    style = MaterialTheme.typography.headlineSmall.copy(
                        fontWeight = FontWeight.Black,
                        color = SuniteNavy
                    ),
                    modifier = Modifier.padding(vertical = 2.dp)
                )
                Text(
                    text = subtext,
                    style = MaterialTheme.typography.labelSmall.copy(
                        color = accentColor,
                        fontWeight = FontWeight.Bold,
                        fontSize = 10.sp
                    )
                )
            }
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .clip(CircleShape)
                    .background(accentColor.copy(alpha = 0.12f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = accentColor,
                    modifier = Modifier.size(20.dp)
                )
            }
        }
    }
}
