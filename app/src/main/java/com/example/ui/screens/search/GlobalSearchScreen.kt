package com.example.ui.screens.search

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
import com.example.ui.components.*
import com.example.ui.theme.*

data class SearchResult(
    val title: String,
    val subtitle: String,
    val entityType: String, // USER, BRANCH, MASTER DATA, AUDIT, FILE, NOTIFICATION
    val route: String
)

@Composable
fun GlobalSearchScreen(
    repository: SuniteRepository,
    onNavigate: (String) -> Unit
) {
    var query by remember { mutableStateOf("") }
    var selectedFilter by remember { mutableStateOf("ALL") }
    val filters = listOf("ALL", "USERS", "BRANCHES", "MASTER DATA", "AUDIT", "FILES")

    val allData = remember {
        listOf(
            SearchResult("Alex Vance (Super Admin)", "alex.vance@sunite.io • Global HQ Hub", "USERS", "users"),
            SearchResult("Sarah Jenkins (Sales Admin)", "sarah.j@sunite.io • California Solar Hub", "USERS", "users"),
            SearchResult("David Miller (EPC Contractor)", "david.m@apexsolar.com • Texas EPC Hub", "USERS", "users"),
            SearchResult("Global Headquarters Hub", "Branch Code: HQ-01 • San Francisco, CA", "BRANCHES", "org"),
            SearchResult("California Regional Hub", "Branch Code: CA-02 • Los Angeles, CA", "BRANCHES", "org"),
            SearchResult("Mono PERC 550W Module", "Solar Products • Brand: Longi Solar", "MASTER DATA", "masterdata"),
            SearchResult("100kW Central Inverter", "Inverter Brands • Brand: Sungrow", "MASTER DATA", "masterdata"),
            SearchResult("Solar_EPC_Contract_Template_v2.pdf", "File Vault • 2.4 MB • Version 2.1", "FILES", "files"),
            SearchResult("Login Failure Alert - IP 192.168.1.42", "Security Log • User: unknown@test.com", "AUDIT", "reports"),
            SearchResult("Role Updated: Super Admin Permissions", "Audit Trail • Modified by Super Admin", "AUDIT", "reports")
        )
    }

    val searchResults = allData.filter { item ->
        val matchesQuery = query.isEmpty() ||
                item.title.contains(query, ignoreCase = true) ||
                item.subtitle.contains(query, ignoreCase = true)
        val matchesFilter = if (selectedFilter == "ALL") true else item.entityType.equals(selectedFilter, ignoreCase = true)
        matchesQuery && matchesFilter
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
            .padding(16.dp)
    ) {
        EnterpriseCard {
            Text(
                text = "Global Enterprise Search Engine",
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
            )
            Text(
                text = "Instant multi-indexed search across all ERP & Partner modules",
                style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary),
                modifier = Modifier.padding(bottom = 12.dp)
            )

            EnterpriseTextField(
                value = query,
                onValueChange = { query = it },
                label = "Search Query",
                placeholder = "Type name, email, branch code, product model or log ID...",
                leadingIcon = Icons.Default.Search,
                trailingIcon = if (query.isNotEmpty()) Icons.Default.Clear else null,
                onTrailingIconClick = { query = "" }
            )

            Spacer(modifier = Modifier.height(12.dp))

            // Filter Chips Row
            ScrollableTabRow(
                selectedTabIndex = filters.indexOf(selectedFilter),
                containerColor = Color.Transparent,
                contentColor = SuniteNavy,
                edgePadding = 0.dp,
                divider = {}
            ) {
                filters.forEach { filter ->
                    Tab(
                        selected = selectedFilter == filter,
                        onClick = { selectedFilter = filter },
                        text = {
                            Text(
                                text = filter,
                                fontSize = 11.sp,
                                fontWeight = if (selectedFilter == filter) FontWeight.Bold else FontWeight.Normal
                            )
                        }
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Row(
            modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Search Results (${searchResults.size})",
                style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
            )
            if (query.isNotEmpty()) {
                Text(
                    text = "Query: \"$query\"",
                    style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary)
                )
            }
        }

        LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            items(searchResults) { result ->
                EnterpriseCard(
                    padding = 12.dp,
                    borderColor = SuniteBorder
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onNavigate(result.route) },
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            modifier = Modifier.weight(1f),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = when (result.entityType) {
                                    "USERS" -> Icons.Default.Person
                                    "BRANCHES" -> Icons.Default.Business
                                    "MASTER DATA" -> Icons.Default.Inventory2
                                    "FILES" -> Icons.Default.InsertDriveFile
                                    "AUDIT" -> Icons.Default.VerifiedUser
                                    else -> Icons.Default.Search
                                },
                                contentDescription = null,
                                tint = SuniteNavy,
                                modifier = Modifier.size(22.dp)
                            )
                            Spacer(modifier = Modifier.width(12.dp))
                            Column {
                                Text(
                                    text = result.title,
                                    style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                                )
                                Text(
                                    text = result.subtitle,
                                    style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary),
                                    modifier = Modifier.padding(top = 2.dp)
                                )
                            }
                        }

                        Row(verticalAlignment = Alignment.CenterVertically) {
                            EnterpriseBadge(text = result.entityType)
                            Spacer(modifier = Modifier.width(8.dp))
                            Icon(imageVector = Icons.Default.ChevronRight, contentDescription = "Navigate", tint = SuniteTextSecondary)
                        }
                    }
                }
            }
        }
    }
}
