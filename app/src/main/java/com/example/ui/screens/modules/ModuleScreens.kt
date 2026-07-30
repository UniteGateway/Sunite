package com.example.ui.screens.modules

import androidx.compose.animation.*
import androidx.compose.foundation.background
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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.components.*
import com.example.ui.theme.*

@Composable
fun GenericModuleScreen(
    title: String,
    subtitle: String,
    category: String,
    icon: ImageVector,
    primaryActionLabel: String = "+ Add New Record",
    sampleItems: List<Triple<String, String, String>> = listOf(
        Triple("Sunite Commercial Solar Array #1", "In Progress • High Priority", "$120,000 Contract Value"),
        Triple("Austin Regional Grid Sync #4", "Approved • Active SLA", "Completed Feasibility Survey"),
        Triple("San Jose Partner Network Node", "Under Verification", "Pending Tier 1 Sign-off")
    )
) {
    var showModal by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
            .padding(16.dp)
    ) {
        // Module Title & Primary Action Button
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = icon,
                        contentDescription = null,
                        tint = SuniteNavy,
                        modifier = Modifier.size(22.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = title,
                        style = MaterialTheme.typography.titleMedium.copy(
                            fontWeight = FontWeight.Bold,
                            color = SuniteNavy
                        )
                    )
                }
                Text(
                    text = subtitle,
                    style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary),
                    modifier = Modifier.padding(top = 2.dp)
                )
            }

            EnterpriseButton(
                text = primaryActionLabel,
                onClick = { showModal = true },
                isPrimary = true,
                icon = Icons.Default.Add
            )
        }

        // Module Summary Banner
        EnterpriseCard(padding = 14.dp) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "MODULE STATUS & AUDIT ENGINE",
                        style = MaterialTheme.typography.labelSmall.copy(
                            color = SuniteNavy,
                            fontWeight = FontWeight.Bold
                        )
                    )
                    Text(
                        text = "Real-Time Enterprise Sync Active • Clean Energy Governance",
                        style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                    )
                }
                EnterpriseBadge(text = category, statusType = "SUPER ADMIN")
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Data Records List
        LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            items(sampleItems) { (itemTitle, itemMeta, itemDetail) ->
                EnterpriseCard(padding = 14.dp) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = itemTitle,
                                style = MaterialTheme.typography.bodyMedium.copy(
                                    fontWeight = FontWeight.Bold,
                                    color = SuniteNavy
                                )
                            )
                            Text(
                                text = "$itemMeta • $itemDetail",
                                style = MaterialTheme.typography.bodySmall.copy(
                                    color = SuniteTextSecondary,
                                    fontSize = 11.sp
                                ),
                                modifier = Modifier.padding(top = 2.dp)
                            )
                        }
                        EnterpriseButton(
                            text = "Manage",
                            onClick = { },
                            isPrimary = false,
                            modifier = Modifier.height(32.dp)
                        )
                    }
                }
            }
        }
    }

    if (showModal) {
        var nameInput by remember { mutableStateOf("") }
        EnterpriseModal(
            title = primaryActionLabel,
            subtitle = "Sunite Enterprise Module Entry",
            onDismissRequest = { showModal = false },
            onConfirm = { showModal = false }
        ) {
            EnterpriseTextField(
                value = nameInput,
                onValueChange = { nameInput = it },
                label = "Record Identifier / Title",
                placeholder = "Enter name or title..."
            )
        }
    }
}
