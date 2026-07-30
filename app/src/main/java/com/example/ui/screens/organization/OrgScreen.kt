package com.example.ui.screens.organization

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
import com.example.data.entity.BranchEntity
import com.example.data.entity.DepartmentEntity
import com.example.data.entity.OrganizationEntity
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun OrgScreen(repository: SuniteRepository) {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("Company Profile", "Operating Branches", "Departments", "Business Units", "Org Hierarchy", "Business Profile")
    val coroutineScope = rememberCoroutineScope()

    val orgState by repository.organization.collectAsState(initial = null)
    val branches by repository.branches.collectAsState(initial = emptyList())
    val departments by repository.departments.collectAsState(initial = emptyList())

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
    ) {
        // Tab Row Bar
        ScrollableTabRow(
            selectedTabIndex = selectedTab,
            containerColor = SuniteSurface,
            contentColor = SuniteNavy,
            edgePadding = 16.dp,
            divider = { Divider(color = SuniteBorder) }
        ) {
            tabs.forEachIndexed { index, title ->
                Tab(
                    selected = selectedTab == index,
                    onClick = { selectedTab = index },
                    text = {
                        Text(
                            text = title,
                            style = MaterialTheme.typography.bodyMedium.copy(
                                fontWeight = if (selectedTab == index) FontWeight.Bold else FontWeight.Normal,
                                color = if (selectedTab == index) SuniteNavy else SuniteTextSecondary
                            )
                        )
                    }
                )
            }
        }

        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            when (selectedTab) {
                0 -> CompanyProfileTab(orgState, onSave = { updatedOrg ->
                    coroutineScope.launch { repository.updateOrganization(updatedOrg) }
                })
                1 -> BranchesTab(branches, onAddBranch = { branch ->
                    coroutineScope.launch { repository.addBranch(branch) }
                }, onDeleteBranch = { id ->
                    coroutineScope.launch { repository.deleteBranch(id) }
                })
                2 -> DepartmentsTab(departments, onAddDepartment = { dept ->
                    coroutineScope.launch { repository.addDepartment(dept) }
                })
                3 -> BusinessUnitsTab()
                4 -> OrgHierarchyTab(orgState, branches, departments)
                5 -> BusinessProfileTab(orgState)
            }
        }
    }
}

@Composable
fun CompanyProfileTab(
    org: OrganizationEntity?,
    onSave: (OrganizationEntity) -> Unit
) {
    var companyName by remember(org) { mutableStateOf(org?.companyName ?: "Sunite Energy Systems") }
    var legalName by remember(org) { mutableStateOf(org?.legalName ?: "Unite Solar Partner Network Global Corp") }
    var taxId by remember(org) { mutableStateOf(org?.taxId ?: "US-984210492-EIN") }
    var registrationNumber by remember(org) { mutableStateOf(org?.registrationNumber ?: "DEL-2024-SOLAR-099") }
    var website by remember(org) { mutableStateOf(org?.website ?: "https://sunite.io") }
    var address by remember(org) { mutableStateOf(org?.address ?: "100 Solar Way, Energy Tech Park") }
    var contactEmail by remember(org) { mutableStateOf(org?.contactEmail ?: "support@sunite.io") }
    var phone by remember(org) { mutableStateOf(org?.phone ?: "+1 (800) 555-SUNITE") }

    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier.fillMaxSize()
    ) {
        item {
            EnterpriseCard {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "Organization Identity & Headquarters",
                            style = MaterialTheme.typography.titleMedium.copy(
                                fontWeight = FontWeight.Bold,
                                color = SuniteNavy
                            )
                        )
                        Text(
                            text = "Global legal entity details for solar partner network agreements",
                            style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                        )
                    }
                    EnterpriseBadge(text = "Enterprise Platinum Partner")
                }

                Spacer(modifier = Modifier.height(16.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    EnterpriseTextField(
                        value = companyName,
                        onValueChange = { companyName = it },
                        label = "Company Brand Name",
                        modifier = Modifier.weight(1f)
                    )
                    EnterpriseTextField(
                        value = taxId,
                        onValueChange = { taxId = it },
                        label = "Federal Tax ID / EIN",
                        modifier = Modifier.weight(1f)
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                EnterpriseTextField(
                    value = legalName,
                    onValueChange = { legalName = it },
                    label = "Full Registered Legal Entity Name"
                )

                Spacer(modifier = Modifier.height(12.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    EnterpriseTextField(
                        value = registrationNumber,
                        onValueChange = { registrationNumber = it },
                        label = "Corporate Reg Number",
                        modifier = Modifier.weight(1f)
                    )
                    EnterpriseTextField(
                        value = website,
                        onValueChange = { website = it },
                        label = "Enterprise Portal Domain",
                        modifier = Modifier.weight(1f)
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                EnterpriseTextField(
                    value = address,
                    onValueChange = { address = it },
                    label = "Global HQ Street Address"
                )

                Spacer(modifier = Modifier.height(12.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    EnterpriseTextField(
                        value = contactEmail,
                        onValueChange = { contactEmail = it },
                        label = "Primary Support Email",
                        modifier = Modifier.weight(1f)
                    )
                    EnterpriseTextField(
                        value = phone,
                        onValueChange = { phone = it },
                        label = "HQ Phone Line",
                        modifier = Modifier.weight(1f)
                    )
                }

                Spacer(modifier = Modifier.height(20.dp))

                EnterpriseButton(
                    text = "Save Corporate Profile",
                    onClick = {
                        val current = org ?: OrganizationEntity(
                            companyName = companyName,
                            legalName = legalName,
                            taxId = taxId,
                            registrationNumber = registrationNumber,
                            website = website,
                            address = address,
                            city = "Austin",
                            state = "Texas",
                            country = "United States",
                            contactEmail = contactEmail,
                            phone = phone,
                            currency = "USD ($)",
                            timezone = "UTC-6 (CST)"
                        )
                        onSave(
                            current.copy(
                                companyName = companyName,
                                legalName = legalName,
                                taxId = taxId,
                                registrationNumber = registrationNumber,
                                website = website,
                                address = address,
                                contactEmail = contactEmail,
                                phone = phone
                            )
                        )
                    },
                    isPrimary = true,
                    icon = Icons.Default.Save,
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }
    }
}

@Composable
fun BranchesTab(
    branches: List<BranchEntity>,
    onAddBranch: (BranchEntity) -> Unit,
    onDeleteBranch: (String) -> Unit
) {
    var showAddModal by remember { mutableStateOf(false) }

    Column(modifier = Modifier.fillMaxSize()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Operating Hubs & Regional Branches (${branches.size})",
                style = MaterialTheme.typography.titleMedium.copy(
                    fontWeight = FontWeight.Bold,
                    color = SuniteNavy
                )
            )
            EnterpriseButton(
                text = "+ Add Branch",
                onClick = { showAddModal = true },
                isPrimary = true
            )
        }

        LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            items(branches, key = { it.id }) { branch ->
                EnterpriseCard {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = branch.name,
                                    style = MaterialTheme.typography.titleSmall.copy(
                                        fontWeight = FontWeight.Bold,
                                        color = SuniteNavy
                                    )
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Surface(
                                    shape = RoundedCornerShape(4.dp),
                                    color = Color(0xFFE2E8F0)
                                ) {
                                    Text(
                                        text = branch.branchCode,
                                        style = MaterialTheme.typography.labelSmall.copy(
                                            color = SuniteTextSecondary,
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 10.sp
                                        ),
                                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                    )
                                }
                            }

                            Text(
                                text = "${branch.city}, ${branch.state}, ${branch.country} • Mgr: ${branch.managerName}",
                                style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary),
                                modifier = Modifier.padding(top = 2.dp)
                            )

                            Row(
                                modifier = Modifier.padding(top = 8.dp),
                                horizontalArrangement = Arrangement.spacedBy(16.dp)
                            ) {
                                Text(
                                    text = "Active Projects: ${branch.activeProjects}",
                                    style = MaterialTheme.typography.labelSmall.copy(
                                        color = SuniteNavy,
                                        fontWeight = FontWeight.Bold
                                    )
                                )
                                Text(
                                    text = "Staff: ${branch.staffCount}",
                                    style = MaterialTheme.typography.labelSmall.copy(
                                        color = SuniteTextSecondary,
                                        fontWeight = FontWeight.SemiBold
                                    )
                                )
                            }
                        }

                        Column(horizontalAlignment = Alignment.End) {
                            EnterpriseBadge(text = branch.status)
                            IconButton(onClick = { onDeleteBranch(branch.id) }) {
                                Icon(
                                    imageVector = Icons.Default.DeleteOutline,
                                    contentDescription = "Delete Branch",
                                    tint = SuniteDanger,
                                    modifier = Modifier.size(20.dp)
                                )
                            }
                        }
                    }
                }
            }
        }
    }

    if (showAddModal) {
        var name by remember { mutableStateOf("") }
        var code by remember { mutableStateOf("") }
        var city by remember { mutableStateOf("") }
        var state by remember { mutableStateOf("") }

        EnterpriseModal(
            title = "Register Regional Branch Hub",
            onDismissRequest = { showAddModal = false },
            onConfirm = {
                if (name.isNotEmpty()) {
                    onAddBranch(
                        BranchEntity(
                            id = "br_" + System.currentTimeMillis(),
                            branchCode = code.ifEmpty { "HUB-GEN" },
                            name = name,
                            city = city.ifEmpty { "Austin" },
                            state = state.ifEmpty { "Texas" },
                            country = "United States",
                            managerName = "Assigned Lead",
                            status = "Active",
                            activeProjects = 0,
                            staffCount = 1
                        )
                    )
                }
                showAddModal = false
            }
        ) {
            EnterpriseTextField(
                value = name,
                onValueChange = { name = it },
                label = "Branch Name",
                placeholder = "Denver Solar Operations Hub"
            )
            Spacer(modifier = Modifier.height(12.dp))
            EnterpriseTextField(
                value = code,
                onValueChange = { code = it },
                label = "Branch Code",
                placeholder = "HUB-DEN"
            )
            Spacer(modifier = Modifier.height(12.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                EnterpriseTextField(
                    value = city,
                    onValueChange = { city = it },
                    label = "City",
                    modifier = Modifier.weight(1f)
                )
                EnterpriseTextField(
                    value = state,
                    onValueChange = { state = it },
                    label = "State / Province",
                    modifier = Modifier.weight(1f)
                )
            }
        }
    }
}

@Composable
fun DepartmentsTab(
    departments: List<DepartmentEntity>,
    onAddDepartment: (DepartmentEntity) -> Unit
) {
    var showModal by remember { mutableStateOf(false) }

    Column(modifier = Modifier.fillMaxSize()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Enterprise Departments (${departments.size})",
                style = MaterialTheme.typography.titleMedium.copy(
                    fontWeight = FontWeight.Bold,
                    color = SuniteNavy
                )
            )
            EnterpriseButton(
                text = "+ Add Department",
                onClick = { showModal = true },
                isPrimary = true
            )
        }

        LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            items(departments, key = { it.id }) { dept ->
                EnterpriseCard {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = dept.name,
                                    style = MaterialTheme.typography.titleSmall.copy(
                                        fontWeight = FontWeight.Bold,
                                        color = SuniteNavy
                                    )
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                EnterpriseBadge(text = dept.code)
                            }
                            Text(
                                text = dept.description,
                                style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary),
                                modifier = Modifier.padding(top = 4.dp)
                            )
                            Text(
                                text = "Lead: ${dept.leadName} • Members: ${dept.memberCount}",
                                style = MaterialTheme.typography.labelSmall.copy(
                                    color = SuniteNavy,
                                    fontWeight = FontWeight.SemiBold
                                ),
                                modifier = Modifier.padding(top = 6.dp)
                            )
                        }
                    }
                }
            }
        }
    }

    if (showModal) {
        var name by remember { mutableStateOf("") }
        var code by remember { mutableStateOf("") }
        var lead by remember { mutableStateOf("") }
        var desc by remember { mutableStateOf("") }

        EnterpriseModal(
            title = "Create New Department",
            onDismissRequest = { showModal = false },
            onConfirm = {
                if (name.isNotEmpty()) {
                    onAddDepartment(
                        DepartmentEntity(
                            id = "dept_" + System.currentTimeMillis(),
                            code = code.ifEmpty { "GEN" },
                            name = name,
                            leadName = lead.ifEmpty { "Unassigned" },
                            memberCount = 1,
                            description = desc.ifEmpty { "Operational unit." }
                        )
                    )
                }
                showModal = false
            }
        ) {
            EnterpriseTextField(
                value = name,
                onValueChange = { name = it },
                label = "Department Name",
                placeholder = "Solar Grid Integration & CAD"
            )
            Spacer(modifier = Modifier.height(12.dp))
            EnterpriseTextField(
                value = code,
                onValueChange = { code = it },
                label = "Department Code",
                placeholder = "CAD-ENG"
            )
            Spacer(modifier = Modifier.height(12.dp))
            EnterpriseTextField(
                value = lead,
                onValueChange = { lead = it },
                label = "Department Lead Name",
                placeholder = "David Miller"
            )
            Spacer(modifier = Modifier.height(12.dp))
            EnterpriseTextField(
                value = desc,
                onValueChange = { desc = it },
                label = "Operational Description",
                placeholder = "Brief overview of responsibilities..."
            )
        }
    }
}

@Composable
fun BusinessProfileTab(org: OrganizationEntity?) {
    EnterpriseCard {
        Text(
            text = "Solar Partner License & Compliance Tier",
            style = MaterialTheme.typography.titleMedium.copy(
                fontWeight = FontWeight.Bold,
                color = SuniteNavy
            )
        )
        Spacer(modifier = Modifier.height(16.dp))

        listOf(
            "Global License ID" to "USPN-GL-2026-990812",
            "Partner Network Tier" to "Enterprise Platinum Partner",
            "SLA Guarantee" to "99.9% Uptime Grid Sync",
            "Annual Solar Megawattage Quota" to "500 MW Certified",
            "Primary Escrow Bank" to "JPMorgan Chase Enterprise (SWIFT: CHASUS33)",
            "Audited Compliance Framework" to "ISO 27001 / SOC 2 Type II / SEC Green ERP"
        ).forEach { (label, value) ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(text = label, style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                Text(text = value, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
            }
            Divider(color = SuniteBorder)
        }
    }
}

@Composable
fun BusinessUnitsTab() {
    val units = listOf(
        Triple("Residential Solar Division", "RSD-01", "Rooftop PV solar, residential storage & EV home chargers"),
        Triple("Commercial & Industrial (C&I)", "CND-02", "Large-scale factory rooftop solar & microgrids"),
        Triple("Utility Scale Projects", "USP-03", "MW grid solar farms, battery storage hubs & substations"),
        Triple("AMC & Operations Services", "AOS-04", "Inverter maintenance, panel cleaning & degradation monitoring")
    )

    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        items(units) { (title, code, desc) ->
            EnterpriseCard {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(text = title, style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                            Spacer(modifier = Modifier.width(8.dp))
                            EnterpriseBadge(text = code)
                        }
                        Text(text = desc, style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary), modifier = Modifier.padding(top = 4.dp))
                    }
                    EnterpriseBadge(text = "Active")
                }
            }
        }
    }
}

@Composable
fun OrgHierarchyTab(
    org: OrganizationEntity?,
    branches: List<BranchEntity>,
    departments: List<DepartmentEntity>
) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            EnterpriseCard {
                Text(
                    text = "Global Corporate Hierarchy Tree",
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                )
                Spacer(modifier = Modifier.height(12.dp))

                // HQ Node
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(imageVector = Icons.Default.CorporateFare, contentDescription = null, tint = SuniteNavy, modifier = Modifier.size(24.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = org?.companyName ?: "Sunite Energy Systems (Global HQ)",
                        style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                    )
                }

                Spacer(modifier = Modifier.height(8.dp))

                // Branches Nodes
                branches.forEach { branch ->
                    Row(
                        modifier = Modifier
                            .padding(start = 24.dp, top = 6.dp)
                            .fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(text = "└─ ", color = SuniteTextSecondary, fontWeight = FontWeight.Bold)
                        Icon(imageVector = Icons.Default.Business, contentDescription = null, tint = SuniteOrange, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "${branch.name} (${branch.branchCode})",
                            style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.SemiBold, color = SuniteNavy)
                        )
                    }

                    // Departments under branches
                    departments.forEach { dept ->
                        Row(
                            modifier = Modifier
                                .padding(start = 52.dp, top = 4.dp)
                                .fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(text = "└─ ", color = SuniteTextMuted)
                            Icon(imageVector = Icons.Default.Groups, contentDescription = null, tint = SuniteTextSecondary, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = "${dept.name} [Lead: ${dept.leadName}]",
                                style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary)
                            )
                        }
                    }
                }
            }
        }
    }
}
