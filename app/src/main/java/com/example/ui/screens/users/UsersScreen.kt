package com.example.ui.screens.users

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
import com.example.data.entity.UserEntity
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun UsersScreen(repository: SuniteRepository) {
    val users by repository.users.collectAsState(initial = emptyList())
    var searchQuery by remember { mutableStateOf("") }
    var selectedFilterStatus by remember { mutableStateOf("ALL") }
    var showInviteModal by remember { mutableStateOf(false) }
    var selectedUserForEdit by remember { mutableStateOf<UserEntity?>(null) }
    var selectedUserForResetPassword by remember { mutableStateOf<UserEntity?>(null) }
    var selectedUserForView by remember { mutableStateOf<UserEntity?>(null) }
    val coroutineScope = rememberCoroutineScope()

    val filteredUsers = users.filter { user ->
        val matchesSearch = user.fullName.contains(searchQuery, ignoreCase = true) ||
                user.email.contains(searchQuery, ignoreCase = true) ||
                user.role.contains(searchQuery, ignoreCase = true)
        val matchesStatus = if (selectedFilterStatus == "ALL") true else user.status.equals(selectedFilterStatus, ignoreCase = true)
        matchesSearch && matchesStatus
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
            .padding(16.dp)
    ) {
        // Page Title & Primary Action
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "User Directory & Access Control (${filteredUsers.size})",
                    style = MaterialTheme.typography.titleMedium.copy(
                        fontWeight = FontWeight.Bold,
                        color = SuniteNavy
                    )
                )
                Text(
                    text = "Role-based access management across global solar hubs",
                    style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                )
            }
            EnterpriseButton(
                text = "+ Add User",
                onClick = { showInviteModal = true },
                isPrimary = true,
                icon = Icons.Default.PersonAdd
            )
        }

        // Search & Filter Control Bar
        EnterpriseCard(padding = 12.dp) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                EnterpriseTextField(
                    value = searchQuery,
                    onValueChange = { searchQuery = it },
                    label = "",
                    placeholder = "Search user name, email or role...",
                    leadingIcon = Icons.Outlined.Search,
                    modifier = Modifier.weight(1f)
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                listOf("ALL", "Active", "Pending", "Deactivated").forEach { filter ->
                    val isSelected = selectedFilterStatus == filter
                    FilterChip(
                        selected = isSelected,
                        onClick = { selectedFilterStatus = filter },
                        label = { Text(filter, fontSize = 11.sp) },
                        colors = FilterChipDefaults.filterChipColors(
                            selectedContainerColor = SuniteNavy,
                            selectedLabelColor = Color.White
                        )
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Enterprise Data List / Table View
        LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            items(filteredUsers, key = { it.id }) { user ->
                EnterpriseCard(padding = 14.dp) {
                    Column {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.Top
                        ) {
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = user.fullName,
                                    style = MaterialTheme.typography.titleSmall.copy(
                                        fontWeight = FontWeight.Bold,
                                        color = SuniteNavy
                                    )
                                )
                                Text(
                                    text = user.email,
                                    style = MaterialTheme.typography.bodySmall.copy(
                                        color = SuniteTextSecondary,
                                        fontSize = 12.sp
                                    )
                                )
                            }
                            EnterpriseBadge(text = user.status)
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Surface(
                                    shape = RoundedCornerShape(4.dp),
                                    color = Color(0xFFE0E8F6)
                                ) {
                                    Text(
                                        text = user.role,
                                        style = MaterialTheme.typography.labelSmall.copy(
                                            color = SuniteNavy,
                                            fontWeight = FontWeight.Bold
                                        ),
                                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                                    )
                                }
                                Text(
                                    text = "${user.branch} • ${user.department}",
                                    style = MaterialTheme.typography.labelSmall.copy(
                                        color = SuniteTextSecondary,
                                        fontSize = 10.sp
                                    ),
                                    modifier = Modifier.padding(top = 4.dp)
                                )
                            }

                            Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                                IconButton(onClick = { selectedUserForView = user }) {
                                    Icon(
                                        imageVector = Icons.Default.Visibility,
                                        contentDescription = "View Profile",
                                        tint = SuniteNavy,
                                        modifier = Modifier.size(18.dp)
                                    )
                                }
                                IconButton(onClick = { selectedUserForResetPassword = user }) {
                                    Icon(
                                        imageVector = Icons.Default.LockReset,
                                        contentDescription = "Reset Password",
                                        tint = SuniteNavy,
                                        modifier = Modifier.size(18.dp)
                                    )
                                }
                                IconButton(onClick = { selectedUserForEdit = user }) {
                                    Icon(
                                        imageVector = Icons.Default.Edit,
                                        contentDescription = "Edit User",
                                        tint = SuniteTextSecondary,
                                        modifier = Modifier.size(18.dp)
                                    )
                                }
                                IconButton(
                                    onClick = {
                                        val newStatus = if (user.status == "Active") "Deactivated" else "Active"
                                        coroutineScope.launch {
                                            repository.updateUserStatus(user.id, newStatus)
                                        }
                                    }
                                ) {
                                    Icon(
                                        imageVector = if (user.status == "Active") Icons.Default.Block else Icons.Default.CheckCircle,
                                        contentDescription = "Toggle Status",
                                        tint = if (user.status == "Active") SuniteDanger else SuniteSuccess,
                                        modifier = Modifier.size(18.dp)
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Modal: Add / Invite User
    if (showInviteModal) {
        var name by remember { mutableStateOf("") }
        var email by remember { mutableStateOf("") }
        var role by remember { mutableStateOf("Branch Manager") }
        var phone by remember { mutableStateOf("") }

        EnterpriseModal(
            title = "Provision New User Account",
            subtitle = "Direct email dispatch with MFA setup invitation",
            onDismissRequest = { showInviteModal = false },
            onConfirm = {
                if (email.isNotEmpty()) {
                    val newUser = UserEntity(
                        id = "usr_" + System.currentTimeMillis(),
                        email = email,
                        fullName = name.ifEmpty { email.substringBefore("@") },
                        role = role,
                        branch = "Austin Clean Energy Hub",
                        department = "Executive Management",
                        phone = phone.ifEmpty { "+1 512 555 0100" },
                        status = "Pending"
                    )
                    coroutineScope.launch {
                        repository.addUser(newUser)
                    }
                }
                showInviteModal = false
            }
        ) {
            EnterpriseTextField(
                value = name,
                onValueChange = { name = it },
                label = "Full Name",
                placeholder = "Sophia Chen"
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseTextField(
                value = email,
                onValueChange = { email = it },
                label = "Corporate Email Address",
                placeholder = "s.chen@sunite.io"
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseDropdown(
                label = "Assign Role",
                options = listOf(
                    "Super Admin",
                    "Sales Admin",
                    "Marketing Partner",
                    "Franchise",
                    "EPC Contractor",
                    "Installation Vendor",
                    "Survey Engineer",
                    "Finance Team",
                    "Service Engineer",
                    "Customer"
                ),
                selectedOption = role,
                onOptionSelected = { role = it }
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseTextField(
                value = phone,
                onValueChange = { phone = it },
                label = "Phone Number",
                placeholder = "+1 (512) 555-0199"
            )
        }
    }

    // Modal: Edit User
    selectedUserForEdit?.let { user ->
        var name by remember { mutableStateOf(user.fullName) }
        var role by remember { mutableStateOf(user.role) }
        var phone by remember { mutableStateOf(user.phone) }

        EnterpriseModal(
            title = "Edit User Account: ${user.email}",
            onDismissRequest = { selectedUserForEdit = null },
            onConfirm = {
                coroutineScope.launch {
                    repository.updateUser(
                        user.copy(
                            fullName = name,
                            role = role,
                            phone = phone
                        )
                    )
                }
                selectedUserForEdit = null
            }
        ) {
            EnterpriseTextField(
                value = name,
                onValueChange = { name = it },
                label = "Full Name"
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseDropdown(
                label = "Role",
                options = listOf("Super Admin", "Solar Partner Admin", "Branch Manager", "Finance Auditor", "Solar Engineer / Tech Lead"),
                selectedOption = role,
                onOptionSelected = { role = it }
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseTextField(
                value = phone,
                onValueChange = { phone = it },
                label = "Phone Number"
            )
        }
    }

    // Modal: Reset Password Trigger
    selectedUserForResetPassword?.let { user ->
        EnterpriseModal(
            title = "Trigger Password Reset",
            subtitle = "Dispatch secure single-use reset token to ${user.email}",
            onDismissRequest = { selectedUserForResetPassword = null },
            confirmText = "Dispatch Token",
            onConfirm = {
                selectedUserForResetPassword = null
            }
        ) {
            Text(
                text = "An automated email & SMS link will be sent to reset credentials for ${user.fullName}. Account status remains active.",
                style = MaterialTheme.typography.bodySmall,
                color = SuniteTextSecondary
            )
        }
    }

    // Modal: User Profile & Activity Summary
    selectedUserForView?.let { user ->
        EnterpriseModal(
            title = "User Profile & Security Details",
            subtitle = user.email,
            onDismissRequest = { selectedUserForView = null },
            confirmText = "Close Profile",
            onConfirm = { selectedUserForView = null }
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(text = "Full Name", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    Text(text = user.fullName, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                }
                Divider(color = SuniteBorder)
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(text = "Assigned Role", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    Text(text = user.role, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                }
                Divider(color = SuniteBorder)
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(text = "Branch Hub", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    Text(text = user.branch, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                }
                Divider(color = SuniteBorder)
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(text = "Department", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    Text(text = user.department, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                }
                Divider(color = SuniteBorder)
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(text = "Status", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    EnterpriseBadge(text = user.status)
                }
                Divider(color = SuniteBorder)
                Text(
                    text = "Recent Activity Log",
                    style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy),
                    modifier = Modifier.padding(top = 8.dp)
                )
                Text(
                    text = "• Logged in from 192.168.1.42 at 2026-07-30 08:30 UTC\n• Updated Solar Project #PRJ-8821\n• Generated Quotation #Q-9901",
                    style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary)
                )
            }
        }
    }
}
