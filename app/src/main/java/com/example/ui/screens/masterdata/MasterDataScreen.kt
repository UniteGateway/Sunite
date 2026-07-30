package com.example.ui.screens.masterdata

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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.SuniteRepository
import com.example.data.entity.MasterDataEntity
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun MasterDataScreen(repository: SuniteRepository) {
    var selectedCategory by remember { mutableStateOf("SOLAR PRODUCTS") }
    val categories = listOf(
        "SOLAR PRODUCTS",
        "MODULE BRANDS",
        "INVERTER BRANDS",
        "BATTERY BRANDS",
        "STRUCTURE TYPES",
        "TAX MASTER",
        "HSN CODES",
        "STATES",
        "DISTRICTS",
        "CITIES",
        "BANKS",
        "CURRENCY",
        "UNITS"
    )

    val masterItems by repository.masterData.collectAsState(initial = emptyList())
    val filteredItems = masterItems.filter { it.category == selectedCategory }
    val coroutineScope = rememberCoroutineScope()
    var showAddModal by remember { mutableStateOf(false) }

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
                    text = "Master Data Engine",
                    style = MaterialTheme.typography.titleMedium.copy(
                        fontWeight = FontWeight.Bold,
                        color = SuniteNavy
                    )
                )
                Text(
                    text = "Global lookup codes, tax rules, currencies & banking details",
                    style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                )
            }
            EnterpriseButton(
                text = "+ Add Item",
                onClick = { showAddModal = true },
                isPrimary = true,
                icon = Icons.Default.Add
            )
        }

        // Category Filter Tabs
        ScrollableTabRow(
            selectedTabIndex = categories.indexOf(selectedCategory),
            containerColor = SuniteSurface,
            contentColor = SuniteNavy,
            edgePadding = 0.dp
        ) {
            categories.forEach { cat ->
                Tab(
                    selected = selectedCategory == cat,
                    onClick = { selectedCategory = cat },
                    text = {
                        Text(
                            text = cat,
                            fontSize = 12.sp,
                            fontWeight = if (selectedCategory == cat) FontWeight.Bold else FontWeight.Normal
                        )
                    }
                )
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            items(filteredItems, key = { it.id }) { item ->
                EnterpriseCard(padding = 12.dp) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = item.name,
                                    style = MaterialTheme.typography.titleSmall.copy(
                                        fontWeight = FontWeight.Bold,
                                        color = SuniteNavy
                                    )
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                EnterpriseBadge(text = item.code)
                            }
                            Text(
                                text = "Value/Detail: ${item.value}",
                                style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary),
                                modifier = Modifier.padding(top = 2.dp)
                            )
                        }

                        IconButton(
                            onClick = {
                                coroutineScope.launch {
                                    repository.deleteMasterDataItem(item.id)
                                }
                            }
                        ) {
                            Icon(
                                imageVector = Icons.Default.DeleteOutline,
                                contentDescription = "Delete",
                                tint = SuniteDanger,
                                modifier = Modifier.size(20.dp)
                            )
                        }
                    }
                }
            }
        }
    }

    if (showAddModal) {
        var code by remember { mutableStateOf("") }
        var name by remember { mutableStateOf("") }
        var value by remember { mutableStateOf("") }

        EnterpriseModal(
            title = "Add Master Data Record ($selectedCategory)",
            onDismissRequest = { showAddModal = false },
            onConfirm = {
                if (name.isNotEmpty()) {
                    val newItem = MasterDataEntity(
                        id = "md_" + System.currentTimeMillis(),
                        category = selectedCategory,
                        code = code.ifEmpty { name.take(3).uppercase() },
                        name = name,
                        value = value.ifEmpty { "Standard Active" }
                    )
                    coroutineScope.launch {
                        repository.addMasterDataItem(newItem)
                    }
                }
                showAddModal = false
            }
        ) {
            EnterpriseTextField(
                value = name,
                onValueChange = { name = it },
                label = "Display Name",
                placeholder = "e.g. United Kingdom / 20% WHT Tax"
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseTextField(
                value = code,
                onValueChange = { code = it },
                label = "Code Key",
                placeholder = "UK / WHT_UK"
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseTextField(
                value = value,
                onValueChange = { value = it },
                label = "Rate / Value / Info",
                placeholder = "20.00% / Europe"
            )
        }
    }
}
