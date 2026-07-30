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
import com.example.data.entity.CustomerEntity
import com.example.data.entity.CustomerTimelineEntity
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun CustomerCrmScreen(repository: SuniteRepository) {
    val customers by repository.customers.collectAsState(initial = emptyList())
    val partners by repository.partners.collectAsState(initial = emptyList())
    
    var searchQuery by remember { mutableStateOf("") }
    var selectedTypeFilter by remember { mutableStateOf("ALL") }
    var selectedCustomerFor360 by remember { mutableStateOf<CustomerEntity?>(null) }
    var showRegistrationModal by remember { mutableStateOf(false) }

    val coroutineScope = rememberCoroutineScope()

    val filteredCustomers = customers.filter { cust ->
        val matchesSearch = searchQuery.isEmpty() ||
                cust.customerName.contains(searchQuery, ignoreCase = true) ||
                cust.consumerNumber.contains(searchQuery, ignoreCase = true) ||
                cust.city.contains(searchQuery, ignoreCase = true)
        val matchesType = if (selectedTypeFilter == "ALL") true else cust.customerType.equals(selectedTypeFilter, ignoreCase = true)
        matchesSearch && matchesType
    }

    val customerTypes = listOf("ALL", "Residential", "Commercial", "Industrial", "Government")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
    ) {
        // Top Action Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Customer CRM & 360° Management",
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                )
                Text(
                    text = "Residential, Commercial, Industrial & Govt Solar Account Directory",
                    style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                )
            }

            EnterpriseButton(
                text = "Register Customer",
                onClick = { showRegistrationModal = true },
                isPrimary = true,
                icon = Icons.Default.PersonAdd
            )
        }

        // Search & Filter Toolbar
        EnterpriseCard(modifier = Modifier.padding(horizontal = 16.dp)) {
            EnterpriseTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                label = "Customer Search",
                placeholder = "Search by Name, Electricity Consumer No, or City...",
                leadingIcon = Icons.Default.Search,
                trailingIcon = if (searchQuery.isNotEmpty()) Icons.Default.Clear else null,
                onTrailingIconClick = { searchQuery = "" }
            )

            Spacer(modifier = Modifier.height(10.dp))

            ScrollableTabRow(
                selectedTabIndex = customerTypes.indexOf(selectedTypeFilter).coerceAtLeast(0),
                containerColor = Color.Transparent,
                contentColor = SuniteNavy,
                edgePadding = 0.dp,
                divider = {}
            ) {
                customerTypes.forEach { type ->
                    Tab(
                        selected = selectedTypeFilter == type,
                        onClick = { selectedTypeFilter = type },
                        text = {
                            Text(
                                text = type,
                                fontSize = 12.sp,
                                fontWeight = if (selectedTypeFilter == type) FontWeight.Bold else FontWeight.Normal
                            )
                        }
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Customers List
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            items(filteredCustomers, key = { it.id }) { customer ->
                EnterpriseCard {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            modifier = Modifier.weight(1f),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Surface(
                                modifier = Modifier.size(42.dp),
                                shape = RoundedCornerShape(8.dp),
                                color = SuniteOrange.copy(alpha = 0.1f)
                            ) {
                                Box(contentAlignment = Alignment.Center) {
                                    Icon(
                                        imageVector = when (customer.customerType) {
                                            "Industrial" -> Icons.Default.Factory
                                            "Commercial" -> Icons.Default.Storefront
                                            "Government" -> Icons.Default.AccountBalance
                                            else -> Icons.Default.Home
                                        },
                                        contentDescription = null,
                                        tint = SuniteOrange
                                    )
                                }
                            }

                            Spacer(modifier = Modifier.width(12.dp))

                            Column {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(
                                        text = customer.customerName,
                                        style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                                    )
                                    Spacer(modifier = Modifier.width(8.dp))
                                    EnterpriseBadge(text = customer.customerType)
                                }

                                Text(
                                    text = "Consumer No: ${customer.consumerNumber} • ${customer.city}, ${customer.state}",
                                    style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary),
                                    modifier = Modifier.padding(top = 2.dp)
                                )
                                Text(
                                    text = "Partner Source: ${customer.partnerName}",
                                    style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextMuted, fontSize = 10.sp),
                                    modifier = Modifier.padding(top = 1.dp)
                                )
                            }
                        }

                        EnterpriseButton(
                            text = "360° View",
                            onClick = { selectedCustomerFor360 = customer },
                            isPrimary = false
                        )
                    }
                }
            }
        }
    }

    // Modal: Customer Registration
    if (showRegistrationModal) {
        var customerName by remember { mutableStateOf("") }
        var mobile by remember { mutableStateOf("") }
        var email by remember { mutableStateOf("") }
        var address by remember { mutableStateOf("") }
        var city by remember { mutableStateOf("Austin") }
        var state by remember { mutableStateOf("Texas") }
        var consumerNumber by remember { mutableStateOf("ELEC-TX-") }
        var customerType by remember { mutableStateOf("Industrial") }
        var selectedPartnerName by remember { mutableStateOf(partners.firstOrNull()?.companyName ?: "Sunite Direct") }

        EnterpriseModal(
            title = "Register New Customer Profile",
            subtitle = "SLA Target: Solar Feasibility Assessment within 24 Hrs",
            onDismissRequest = { showRegistrationModal = false },
            confirmText = "Create Customer Record",
            confirmEnabled = customerName.isNotEmpty() && consumerNumber.isNotEmpty(),
            onConfirm = {
                val newCust = CustomerEntity(
                    id = "cust_" + System.currentTimeMillis(),
                    customerNumber = "CUST-2026-" + (1000..9999).random(),
                    customerName = customerName,
                    mobile = mobile,
                    email = email,
                    address = address,
                    state = state,
                    district = "Central",
                    city = city,
                    consumerNumber = consumerNumber,
                    customerType = customerType,
                    partnerName = selectedPartnerName,
                    createdAt = "2026-07-30"
                )
                coroutineScope.launch {
                    repository.addCustomer(newCust)
                    showRegistrationModal = false
                }
            }
        ) {
            EnterpriseTextField(value = customerName, onValueChange = { customerName = it }, label = "Customer / Entity Name")
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = mobile, onValueChange = { mobile = it }, label = "Mobile No") }
                Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = email, onValueChange = { email = it }, label = "Email Address") }
            }
            EnterpriseTextField(value = consumerNumber, onValueChange = { consumerNumber = it }, label = "Electricity Consumer Number")
            EnterpriseDropdown(
                label = "Customer Category",
                options = listOf("Residential", "Commercial", "Industrial", "Government"),
                selectedOption = customerType,
                onOptionSelected = { customerType = it }
            )
            EnterpriseTextField(value = address, onValueChange = { address = it }, label = "Site Address")
        }
    }

    // Modal: Customer 360° Portal & Activity Timeline
    selectedCustomerFor360?.let { customer ->
        Customer360Modal(
            customer = customer,
            repository = repository,
            onDismiss = { selectedCustomerFor360 = null }
        )
    }
}

@Composable
fun Customer360Modal(
    customer: CustomerEntity,
    repository: SuniteRepository,
    onDismiss: () -> Unit
) {
    val timelineList by repository.getTimelineForCustomer(customer.id).collectAsState(initial = emptyList())
    var newNoteTitle by remember { mutableStateOf("") }
    var newNoteDesc by remember { mutableStateOf("") }
    var selectedActivityType by remember { mutableStateOf("Call") }
    val coroutineScope = rememberCoroutineScope()

    EnterpriseModal(
        title = "Customer 360° Unified View",
        subtitle = "${customer.customerName} (${customer.customerNumber})",
        onDismissRequest = onDismiss,
        confirmText = "Close Portal",
        onConfirm = onDismiss
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            // Customer Details Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = SuniteBackground),
                border = androidx.compose.foundation.BorderStroke(1.dp, SuniteBorder)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(text = "Electricity Consumer No:", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                        Text(text = customer.consumerNumber, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                    }
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(text = "Customer Type:", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                        EnterpriseBadge(text = customer.customerType)
                    }
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(text = "Location / GPS:", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                        Text(text = "${customer.city}, ${customer.state} (${customer.gpsCoordinates})", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                    }
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(text = "Attributed Partner:", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                        Text(text = customer.partnerName, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteOrange))
                    }
                }
            }

            Divider(color = SuniteBorder)

            // Add Timeline Note Form
            Text(text = "Log New Activity / Interaction", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
            EnterpriseDropdown(
                label = "Interaction Type",
                options = listOf("Call", "Meeting", "WhatsApp", "Email", "Document", "Note"),
                selectedOption = selectedActivityType,
                onOptionSelected = { selectedActivityType = it }
            )
            EnterpriseTextField(value = newNoteTitle, onValueChange = { newNoteTitle = it }, label = "Activity Subject", placeholder = "e.g. Quotation Negotiation Call")
            EnterpriseTextField(value = newNoteDesc, onValueChange = { newNoteDesc = it }, label = "Details & Outcome", placeholder = "Notes...")

            EnterpriseButton(
                text = "Save Interaction Entry",
                onClick = {
                    if (newNoteTitle.isNotEmpty()) {
                        coroutineScope.launch {
                            repository.addCustomerTimeline(
                                CustomerTimelineEntity(
                                    id = "tml_" + System.currentTimeMillis(),
                                    customerId = customer.id,
                                    type = selectedActivityType,
                                    title = newNoteTitle,
                                    description = newNoteDesc,
                                    createdBy = "Current Sales Admin",
                                    timestamp = "Just now"
                                )
                            )
                            newNoteTitle = ""
                            newNoteDesc = ""
                        }
                    }
                },
                isPrimary = true,
                modifier = Modifier.fillMaxWidth()
            )

            Divider(color = SuniteBorder)

            // Activity Timeline Logs List
            Text(text = "Customer Activity & Audit Timeline (${timelineList.size})", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))

            LazyColumn(
                modifier = Modifier.height(160.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(timelineList) { entry ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(SuniteBackground, shape = RoundedCornerShape(6.dp))
                            .padding(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = when (entry.type) {
                                "Call" -> Icons.Default.Phone
                                "Meeting" -> Icons.Default.Groups
                                "WhatsApp" -> Icons.Default.Chat
                                "Email" -> Icons.Default.Email
                                "Document" -> Icons.Default.InsertDriveFile
                                else -> Icons.Default.Note
                            },
                            contentDescription = null,
                            tint = SuniteNavy,
                            modifier = Modifier.size(18.dp)
                        )
                        Spacer(modifier = Modifier.width(10.dp))
                        Column(modifier = Modifier.weight(1f)) {
                            Text(text = entry.title, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                            Text(text = entry.description, style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary))
                        }
                        Text(text = entry.timestamp, style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextMuted, fontSize = 9.sp))
                    }
                }
            }
        }
    }
}
