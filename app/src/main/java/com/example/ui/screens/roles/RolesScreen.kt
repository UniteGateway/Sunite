package com.example.ui.screens.roles

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.horizontalScroll
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
import com.example.data.entity.RoleEntity
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun RolesScreen(repository: SuniteRepository) {
    val roles by repository.roles.collectAsState(initial = emptyList())
    var selectedRole by remember { mutableStateOf<RoleEntity?>(null) }
    var showCreateRoleModal by remember { mutableStateOf(false) }
    val coroutineScope = rememberCoroutineScope()

    LaunchedEffect(roles) {
        if (selectedRole == null && roles.isNotEmpty()) {
            selectedRole = roles.first()
        }
    }

    val modules = listOf(
        "Organization & HQ",
        "Operating Branches",
        "User Directory",
        "Roles & RBAC",
        "Master Tax Config",
        "Audit Logs & Compliance",
        "System Settings",
        "Partner Approvals"
    )

    val actions = listOf("Read", "Write", "Edit", "Delete", "Approve", "Export")

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
                    text = "Role & Permission Matrix",
                    style = MaterialTheme.typography.titleMedium.copy(
                        fontWeight = FontWeight.Bold,
                        color = SuniteNavy
                    )
                )
                Text(
                    text = "Granular Role-Based Access Control (RBAC) security engine",
                    style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                )
            }
            EnterpriseButton(
                text = "+ Create Role",
                onClick = { showCreateRoleModal = true },
                isPrimary = true,
                icon = Icons.Default.Add
            )
        }

        // Role Selection Chips
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState())
                .padding(bottom = 12.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            roles.forEach { role ->
                val isSelected = selectedRole?.id == role.id
                FilterChip(
                    selected = isSelected,
                    onClick = { selectedRole = role },
                    label = {
                        Text(
                            text = "${role.name} (${role.userCount})",
                            fontSize = 12.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                        )
                    },
                    colors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = SuniteNavy,
                        selectedLabelColor = Color.White
                    )
                )
            }
        }

        selectedRole?.let { role ->
            EnterpriseCard {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "Permission Matrix: ${role.name}",
                            style = MaterialTheme.typography.titleSmall.copy(
                                fontWeight = FontWeight.Bold,
                                color = SuniteNavy
                            )
                        )
                        Text(
                            text = role.description,
                            style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                        )
                    }
                    EnterpriseBadge(text = "${role.userCount} Assigned Users")
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Permission Matrix Table Grid
                val scrollState = rememberScrollState()
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(scrollState)
                ) {
                    // Header Row
                    Row(
                        modifier = Modifier
                            .background(Color(0xFFF1F5F9))
                            .padding(vertical = 8.dp, horizontal = 12.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "MODULE / RESOURCE",
                            style = MaterialTheme.typography.labelSmall.copy(
                                fontWeight = FontWeight.Bold,
                                color = SuniteNavy
                            ),
                            modifier = Modifier.width(180.dp)
                        )
                        actions.forEach { action ->
                            Text(
                                text = action.uppercase(),
                                style = MaterialTheme.typography.labelSmall.copy(
                                    fontWeight = FontWeight.Bold,
                                    color = SuniteNavy
                                ),
                                modifier = Modifier.width(70.dp),
                                fontSize = 10.sp
                            )
                        }
                    }

                    Divider(color = SuniteBorder)

                    // Module Rows
                    modules.forEachIndexed { idx, mod ->
                        var isCheckedMap by remember(role.id) {
                            mutableStateOf(
                                actions.associateWith { action ->
                                    role.name == "Super Admin" || (idx % 2 == 0 && (action == "Read" || action == "Export"))
                                }
                            )
                        }

                        Row(
                            modifier = Modifier.padding(vertical = 6.dp, horizontal = 12.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = mod,
                                style = MaterialTheme.typography.bodySmall.copy(
                                    fontWeight = FontWeight.SemiBold,
                                    color = SuniteTextPrimary
                                ),
                                modifier = Modifier.width(180.dp)
                            )
                            actions.forEach { action ->
                                val checked = isCheckedMap[action] == true
                                Checkbox(
                                    checked = checked,
                                    onCheckedChange = { isChecked ->
                                        isCheckedMap = isCheckedMap.toMutableMap().apply { put(action, isChecked) }
                                    },
                                    modifier = Modifier.width(70.dp),
                                    colors = CheckboxDefaults.colors(checkedColor = SuniteNavy)
                                )
                            }
                        }
                        Divider(color = SuniteBorder)
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                EnterpriseButton(
                    text = "Update RBAC Matrix",
                    onClick = {
                        coroutineScope.launch {
                            repository.updateRole(role)
                        }
                    },
                    isPrimary = true,
                    icon = Icons.Default.Save,
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }
    }

    if (showCreateRoleModal) {
        var name by remember { mutableStateOf("") }
        var desc by remember { mutableStateOf("") }

        EnterpriseModal(
            title = "Create New Security Role",
            onDismissRequest = { showCreateRoleModal = false },
            onConfirm = {
                if (name.isNotEmpty()) {
                    val newRole = RoleEntity(
                        id = "role_" + System.currentTimeMillis(),
                        name = name,
                        description = desc.ifEmpty { "Custom role profile" },
                        userCount = 0,
                        permissionsJson = "read"
                    )
                    coroutineScope.launch {
                        repository.addRole(newRole)
                    }
                }
                showCreateRoleModal = false
            }
        ) {
            EnterpriseTextField(
                value = name,
                onValueChange = { name = it },
                label = "Role Title",
                placeholder = "Regional Field Auditor"
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseTextField(
                value = desc,
                onValueChange = { desc = it },
                label = "Description",
                placeholder = "Scope of permissions..."
            )
        }
    }
}
