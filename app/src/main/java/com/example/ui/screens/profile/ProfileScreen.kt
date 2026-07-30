package com.example.ui.screens.profile

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.auth.AuthManager
import com.example.ui.components.*
import com.example.ui.theme.*

@Composable
fun ProfileScreen() {
    val authState by AuthManager.authState.collectAsState()
    val user = authState.currentUser

    var showChangePasswordModal by remember { mutableStateOf(false) }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            EnterpriseCard {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(60.dp)
                            .clip(CircleShape)
                            .background(SuniteNavy),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = user?.fullName?.split(" ")?.map { it.take(1) }?.joinToString("") ?: "AV",
                            color = Color.White,
                            fontWeight = FontWeight.Bold,
                            fontSize = 20.sp
                        )
                    }

                    Spacer(modifier = Modifier.width(16.dp))

                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = user?.fullName ?: "Alexander Vance",
                            style = MaterialTheme.typography.titleMedium.copy(
                                fontWeight = FontWeight.Bold,
                                color = SuniteNavy
                            )
                        )
                        Text(
                            text = user?.email ?: "admin@sunite.io",
                            style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            EnterpriseBadge(text = user?.role ?: "Super Admin")
                            EnterpriseBadge(text = user?.status ?: "Active")
                        }
                    }
                }
            }
        }

        item {
            EnterpriseCard {
                Text(
                    text = "Corporate Account Details",
                    style = MaterialTheme.typography.titleSmall.copy(
                        fontWeight = FontWeight.Bold,
                        color = SuniteNavy
                    )
                )
                Spacer(modifier = Modifier.height(12.dp))

                listOf(
                    "Branch Station" to (user?.branch ?: "Austin Clean Energy Hub"),
                    "Department" to (user?.department ?: "Executive Management"),
                    "Phone Line" to (user?.phone ?: "+1 512 555 0101"),
                    "MFA Protection" to "Enabled (TOTP Authenticator)",
                    "Last Login Session" to (user?.lastLogin ?: "2026-07-30 08:45 AM")
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

        item {
            EnterpriseCard {
                Text(
                    text = "Security & Session Actions",
                    style = MaterialTheme.typography.titleSmall.copy(
                        fontWeight = FontWeight.Bold,
                        color = SuniteNavy
                    )
                )
                Spacer(modifier = Modifier.height(12.dp))

                EnterpriseButton(
                    text = "Change Account Password",
                    onClick = { showChangePasswordModal = true },
                    isPrimary = true,
                    icon = Icons.Default.Lock,
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(modifier = Modifier.height(8.dp))

                EnterpriseButton(
                    text = "Sign Out Active Session",
                    onClick = { AuthManager.logout() },
                    isDanger = true,
                    icon = Icons.Default.Logout,
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }
    }

    if (showChangePasswordModal) {
        var oldPass by remember { mutableStateOf("") }
        var newPass by remember { mutableStateOf("") }

        EnterpriseModal(
            title = "Change Account Password",
            onDismissRequest = { showChangePasswordModal = false },
            onConfirm = { showChangePasswordModal = false }
        ) {
            EnterpriseTextField(
                value = oldPass,
                onValueChange = { oldPass = it },
                label = "Current Password",
                isPassword = true
            )
            Spacer(modifier = Modifier.height(10.dp))
            EnterpriseTextField(
                value = newPass,
                onValueChange = { newPass = it },
                label = "New Password",
                isPassword = true
            )
        }
    }
}
