package com.example.ui.screens.crm

import androidx.compose.animation.*
import androidx.compose.foundation.background
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
import com.example.data.entity.LeadEntity
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun LeadManagementScreen(repository: SuniteRepository) {
    val leads by repository.leads.collectAsState(initial = emptyList())
    val users by repository.users.collectAsState(initial = emptyList())

    var selectedStageFilter by remember { mutableStateOf("ALL") }
    var selectedLeadForEdit by remember { mutableStateOf<LeadEntity?>(null) }
    var showCreateLeadModal by remember { mutableStateOf(false) }

    val coroutineScope = rememberCoroutineScope()

    val pipelineStages = listOf(
        "ALL",
        "New Lead",
        "Contacted",
        "Qualified",
        "Survey Scheduled",
        "Survey Completed",
        "Quotation Pending"
    )

    val filteredLeads = leads.filter { lead ->
        if (selectedStageFilter == "ALL") true else lead.status.equals(selectedStageFilter, ignoreCase = true)
    }

    val surveyEngineers = users.filter { it.role.contains("Engineer", ignoreCase = true) || it.role.contains("Admin", ignoreCase = true) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
    ) {
        // Top Header Action Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Opportunity Pipeline & Lead Management",
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                )
                Text(
                    text = "Track lead lifecycle, survey engineering assignments & quotation stages",
                    style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                )
            }

            EnterpriseButton(
                text = "Capture New Lead",
                onClick = { showCreateLeadModal = true },
                isPrimary = true,
                icon = Icons.Default.Add
            )
        }

        // Pipeline Stage Count Cards
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            listOf(
                "New" to leads.count { it.status == "New Lead" },
                "Qualified" to leads.count { it.status == "Qualified" },
                "Surveying" to leads.count { it.status == "Survey Scheduled" || it.status == "Survey Completed" },
                "Quotation" to leads.count { it.status == "Quotation Pending" }
            ).forEach { (label, count) ->
                EnterpriseMetricCard(
                    title = label,
                    value = "$count",
                    subtitle = "Pipeline Stage",
                    modifier = Modifier.weight(1f)
                )
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Pipeline Stage Filter Tabs
        ScrollableTabRow(
            selectedTabIndex = pipelineStages.indexOf(selectedStageFilter).coerceAtLeast(0),
            containerColor = SuniteSurface,
            contentColor = SuniteNavy,
            edgePadding = 16.dp,
            divider = { Divider(color = SuniteBorder) }
        ) {
            pipelineStages.forEach { stage ->
                Tab(
                    selected = selectedStageFilter == stage,
                    onClick = { selectedStageFilter = stage },
                    text = {
                        Text(
                            text = stage,
                            fontSize = 12.sp,
                            fontWeight = if (selectedStageFilter == stage) FontWeight.Bold else FontWeight.Normal
                        )
                    }
                )
            }
        }

        // Lead Cards List
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(filteredLeads, key = { it.id }) { lead ->
                EnterpriseCard {
                    Column {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = lead.customerName,
                                    style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                EnterpriseBadge(text = lead.leadNumber)
                            }

                            EnterpriseBadge(
                                text = lead.status,
                                statusType = if (lead.status == "Survey Completed" || lead.status == "Quotation Pending") "COMPLETED" else "PENDING"
                            )
                        }

                        Spacer(modifier = Modifier.height(4.dp))

                        Text(
                            text = "Source: ${lead.source} (${lead.partnerName.ifEmpty { "Direct" }}) • Location: ${lead.city}, ${lead.state}",
                            style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary)
                        )

                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 8.dp),
                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            Surface(
                                modifier = Modifier.weight(1f),
                                color = SuniteBackground,
                                shape = RoundedCornerShape(6.dp)
                            ) {
                                Column(modifier = Modifier.padding(8.dp)) {
                                    Text(text = "Sanctioned Load", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextMuted, fontSize = 9.sp))
                                    Text(text = "${lead.sanctionedLoadKw} kW", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                                }
                            }
                            Surface(
                                modifier = Modifier.weight(1f),
                                color = SuniteBackground,
                                shape = RoundedCornerShape(6.dp)
                            ) {
                                Column(modifier = Modifier.padding(8.dp)) {
                                    Text(text = "Roof Architecture", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextMuted, fontSize = 9.sp))
                                    Text(text = lead.roofType, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                                }
                            }
                            Surface(
                                modifier = Modifier.weight(1f),
                                color = SuniteBackground,
                                shape = RoundedCornerShape(6.dp)
                            ) {
                                Column(modifier = Modifier.padding(8.dp)) {
                                    Text(text = "Survey Engineer", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextMuted, fontSize = 9.sp))
                                    Text(text = lead.assignedSurveyEngineer, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteOrange))
                                }
                            }
                        }

                        Divider(color = SuniteBorder)

                        // Pipeline Advancement Actions
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(top = 8.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "Priority: ${lead.priority}",
                                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                            )

                            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                // Advance Stage Button
                                val nextStage = when (lead.status) {
                                    "New Lead" -> "Contacted"
                                    "Contacted" -> "Qualified"
                                    "Qualified" -> "Survey Scheduled"
                                    "Survey Scheduled" -> "Survey Completed"
                                    "Survey Completed" -> "Quotation Pending"
                                    else -> null
                                }

                                nextStage?.let { target ->
                                    EnterpriseButton(
                                        text = "Advance to $target",
                                        onClick = {
                                            coroutineScope.launch {
                                                repository.updateLeadStatus(lead.id, target)
                                            }
                                        },
                                        isPrimary = true
                                    )
                                }

                                EnterpriseButton(
                                    text = "Assign Survey",
                                    onClick = { selectedLeadForEdit = lead },
                                    isPrimary = false
                                )
                            }
                        }
                    }
                }
            }
        }
    }

    // Modal: Capture New Lead
    if (showCreateLeadModal) {
        var customerName by remember { mutableStateOf("") }
        var mobile by remember { mutableStateOf("") }
        var email by remember { mutableStateOf("") }
        var city by remember { mutableStateOf("Austin") }
        var state by remember { mutableStateOf("Texas") }
        var loadKw by remember { mutableStateOf("25") }
        var roofType by remember { mutableStateOf("RCC Flat Roof") }
        var source by remember { mutableStateOf("Marketing Partner") }

        EnterpriseModal(
            title = "Capture Solar Lead Opportunity",
            subtitle = "Lead pipeline entry for quotation & feasibility analysis",
            onDismissRequest = { showCreateLeadModal = false },
            confirmText = "Create Lead Entry",
            confirmEnabled = customerName.isNotEmpty(),
            onConfirm = {
                val newLead = LeadEntity(
                    id = "lead_" + System.currentTimeMillis(),
                    leadNumber = "LEAD-2026-" + (1000..9999).random(),
                    customerId = "cust_" + System.currentTimeMillis(),
                    customerName = customerName,
                    mobile = mobile,
                    email = email,
                    city = city,
                    state = state,
                    source = source,
                    sanctionedLoadKw = loadKw.toDoubleOrNull() ?: 25.0,
                    roofType = roofType,
                    status = "New Lead",
                    priority = "HIGH",
                    createdAt = "2026-07-30",
                    updatedAt = "2026-07-30"
                )
                coroutineScope.launch {
                    repository.addLead(newLead)
                    showCreateLeadModal = false
                }
            }
        ) {
            EnterpriseTextField(value = customerName, onValueChange = { customerName = it }, label = "Customer / Entity Name")
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = mobile, onValueChange = { mobile = it }, label = "Mobile No") }
                Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = email, onValueChange = { email = it }, label = "Email Address") }
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = loadKw, onValueChange = { loadKw = it }, label = "Sanctioned Load (kW)") }
                Box(modifier = Modifier.weight(1f)) {
                    EnterpriseDropdown(
                        label = "Roof Structure",
                        options = listOf("RCC Flat Roof", "Tin Shed Rooftop", "Tile Roof", "Ground Mounted"),
                        selectedOption = roofType,
                        onOptionSelected = { roofType = it }
                    )
                }
            }
            EnterpriseDropdown(
                label = "Lead Acquisition Channel Source",
                options = listOf("Marketing Partner", "Franchise Referral", "Direct Web", "Campaign"),
                selectedOption = source,
                onOptionSelected = { source = it }
            )
        }
    }

    // Modal: Assign Survey Engineer
    selectedLeadForEdit?.let { lead ->
        var selectedEngineerName by remember { mutableStateOf(surveyEngineers.firstOrNull()?.fullName ?: "Alexander Vance") }

        EnterpriseModal(
            title = "Assign Survey Engineer to Lead",
            subtitle = lead.leadNumber,
            onDismissRequest = { selectedLeadForEdit = null },
            confirmText = "Assign Engineer & Schedule Survey",
            onConfirm = {
                coroutineScope.launch {
                    repository.assignSurveyEngineer(lead.id, selectedEngineerName)
                    repository.updateLeadStatus(lead.id, "Survey Scheduled")
                    selectedLeadForEdit = null
                }
            }
        ) {
            EnterpriseDropdown(
                label = "Select Qualified Survey Engineer",
                options = surveyEngineers.map { it.fullName }.ifEmpty { listOf("Alexander Vance", "David Miller", "Carlos Santana") },
                selectedOption = selectedEngineerName,
                onOptionSelected = { selectedEngineerName = it }
            )
        }
    }
}
