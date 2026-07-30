package com.example.ui.screens.reports

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
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
import com.example.ui.components.*
import com.example.ui.theme.*

@Composable
fun ReportsScreen(repository: SuniteRepository) {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("Audit Trail", "Login History", "User Activity", "Error Logs", "Security Logs")
    val activityLogs by repository.activityLogs.collectAsState(initial = emptyList())
    var exported by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
            .padding(16.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Compliance Audit & Activity Logs",
                    style = MaterialTheme.typography.titleMedium.copy(
                        fontWeight = FontWeight.Bold,
                        color = SuniteNavy
                    )
                )
                Text(
                    text = "Immutable enterprise system access & action logs",
                    style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                )
            }
            EnterpriseButton(
                text = "Export Audit Log",
                onClick = { exported = true },
                isPrimary = false,
                icon = Icons.Default.Download
            )
        }

        if (exported) {
            Surface(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 12.dp),
                color = SuniteSuccessBg,
                shape = androidx.compose.foundation.shape.RoundedCornerShape(8.dp)
            ) {
                Text(
                    text = "Audit trail exported: sunite_audit_report_20260730.csv",
                    color = SuniteSuccess,
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(10.dp)
                )
            }
        }

        ScrollableTabRow(
            selectedTabIndex = selectedTab,
            containerColor = SuniteSurface,
            contentColor = SuniteNavy,
            edgePadding = 0.dp
        ) {
            tabs.forEachIndexed { index, title ->
                Tab(
                    selected = selectedTab == index,
                    onClick = { selectedTab = index },
                    text = {
                        Text(
                            text = title,
                            fontSize = 12.sp,
                            fontWeight = if (selectedTab == index) FontWeight.Bold else FontWeight.Normal
                        )
                    }
                )
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            items(activityLogs, key = { it.id }) { log ->
                EnterpriseCard(padding = 12.dp) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = log.action,
                                    style = MaterialTheme.typography.bodyMedium.copy(
                                        fontWeight = FontWeight.Bold,
                                        color = SuniteNavy
                                    )
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                EnterpriseBadge(text = log.status)
                            }
                            Text(
                                text = "User: ${log.userEmail} (${log.userRole})",
                                style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextPrimary),
                                modifier = Modifier.padding(top = 2.dp)
                            )
                            Text(
                                text = "Module: ${log.module} • Timestamp: ${log.timestamp} • IP: ${log.ipAddress}",
                                style = MaterialTheme.typography.labelSmall.copy(
                                    color = SuniteTextSecondary,
                                    fontSize = 10.sp
                                ),
                                modifier = Modifier.padding(top = 4.dp)
                            )
                        }
                    }
                }
            }
        }
    }
}
