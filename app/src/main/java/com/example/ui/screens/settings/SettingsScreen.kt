package com.example.ui.screens.settings

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
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

@Composable
fun SettingsScreen(repository: SuniteRepository) {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("Company & Financial Year", "GST Settings", "Security", "Email SMTP & SMS", "WhatsApp API", "Cloud Storage", "API Keys & Webhooks", "Backup")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
    ) {
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
                            fontSize = 12.sp,
                            fontWeight = if (selectedTab == index) FontWeight.Bold else FontWeight.Normal
                        )
                    }
                )
            }
        }

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                when (selectedTab) {
                    0 -> GeneralSettingsView()
                    1 -> GstSettingsView()
                    2 -> SecuritySettingsView()
                    3 -> EmailSmsSettingsView()
                    4 -> WhatsAppSettingsView()
                    5 -> StorageSettingsView()
                    6 -> ApiKeysSettingsView()
                    7 -> BackupSettingsView()
                }
            }
        }
    }
}

@Composable
fun GeneralSettingsView() {
    var systemTitle by remember { mutableStateOf("Sunite Solar Partner Network") }
    var timezone by remember { mutableStateOf("UTC-6 (US Central Standard Time)") }
    var currency by remember { mutableStateOf("USD ($)") }
    var financialYear by remember { mutableStateOf("FY 2026-2027 (Apr 01 - Mar 31)") }
    var saved by remember { mutableStateOf(false) }

    EnterpriseCard {
        Text(
            text = "Company & Financial Year Configurations",
            style = MaterialTheme.typography.titleMedium.copy(
                fontWeight = FontWeight.Bold,
                color = SuniteNavy
            )
        )
        Spacer(modifier = Modifier.height(16.dp))

        EnterpriseTextField(
            value = systemTitle,
            onValueChange = { systemTitle = it },
            label = "Platform Instance Name"
        )
        Spacer(modifier = Modifier.height(12.dp))
        EnterpriseTextField(
            value = financialYear,
            onValueChange = { financialYear = it },
            label = "Active Financial Year Cycle"
        )
        Spacer(modifier = Modifier.height(12.dp))
        EnterpriseTextField(
            value = timezone,
            onValueChange = { timezone = it },
            label = "Master Timezone Offset"
        )
        Spacer(modifier = Modifier.height(12.dp))
        EnterpriseTextField(
            value = currency,
            onValueChange = { currency = it },
            label = "Base Reporting Currency"
        )

        Spacer(modifier = Modifier.height(20.dp))

        if (saved) {
            Surface(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 12.dp),
                color = SuniteSuccessBg,
                shape = RoundedCornerShape(8.dp)
            ) {
                Text(
                    text = "System settings successfully updated & propagated across branches.",
                    color = SuniteSuccess,
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(10.dp)
                )
            }
        }

        EnterpriseButton(
            text = "Save General Settings",
            onClick = { saved = true },
            isPrimary = true,
            modifier = Modifier.fillMaxWidth()
        )
    }
}

@Composable
fun GstSettingsView() {
    var gstin by remember { mutableStateOf("27AAACS9901F1Z2") }
    var gstRateDefault by remember { mutableStateOf("12.0%") }
    var hsnCodeDefault by remember { mutableStateOf("85414011 (Solar Cells & Modules)") }
    var saved by remember { mutableStateOf(false) }

    EnterpriseCard {
        Text(
            text = "GST & Tax Master Compliance Configuration",
            style = MaterialTheme.typography.titleMedium.copy(
                fontWeight = FontWeight.Bold,
                color = SuniteNavy
            )
        )
        Spacer(modifier = Modifier.height(16.dp))

        EnterpriseTextField(
            value = gstin,
            onValueChange = { gstin = it },
            label = "Primary Corporate GSTIN Identification"
        )
        Spacer(modifier = Modifier.height(12.dp))
        EnterpriseTextField(
            value = gstRateDefault,
            onValueChange = { gstRateDefault = it },
            label = "Default Solar Equipment GST Rate"
        )
        Spacer(modifier = Modifier.height(12.dp))
        EnterpriseTextField(
            value = hsnCodeDefault,
            onValueChange = { hsnCodeDefault = it },
            label = "Default Solar PV HSN/SAC Code"
        )

        Spacer(modifier = Modifier.height(20.dp))

        if (saved) {
            Surface(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 12.dp),
                color = SuniteSuccessBg,
                shape = RoundedCornerShape(8.dp)
            ) {
                Text(
                    text = "GST configurations saved & locked for automated billing calculation.",
                    color = SuniteSuccess,
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(10.dp)
                )
            }
        }

        EnterpriseButton(
            text = "Save GST Configuration",
            onClick = { saved = true },
            isPrimary = true,
            modifier = Modifier.fillMaxWidth()
        )
    }
}

@Composable
fun SecuritySettingsView() {
    var mfaEnforced by remember { mutableStateOf(true) }
    var sessionTimeoutMins by remember { mutableStateOf("15") }
    var passwordMinLen by remember { mutableStateOf("12") }

    EnterpriseCard {
        Text(
            text = "Security Policies & Access Control Controls",
            style = MaterialTheme.typography.titleMedium.copy(
                fontWeight = FontWeight.Bold,
                color = SuniteNavy
            )
        )
        Spacer(modifier = Modifier.height(16.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "Enforce MFA for All Admin & Partner Accounts",
                    style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold)
                )
                Text(
                    text = "Mandatory 6-digit TOTP / SMS code verification on every sign-in",
                    style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                )
            }
            Switch(
                checked = mfaEnforced,
                onCheckedChange = { mfaEnforced = it },
                colors = SwitchDefaults.colors(checkedThumbColor = SuniteNavy)
            )
        }

        Divider(color = SuniteBorder, modifier = Modifier.padding(vertical = 12.dp))

        EnterpriseTextField(
            value = sessionTimeoutMins,
            onValueChange = { sessionTimeoutMins = it },
            label = "Session Inactivity Timeout (Minutes)",
            placeholder = "15"
        )

        Spacer(modifier = Modifier.height(12.dp))

        EnterpriseTextField(
            value = passwordMinLen,
            onValueChange = { passwordMinLen = it },
            label = "Minimum Password Complexity Length",
            placeholder = "12"
        )

        Spacer(modifier = Modifier.height(20.dp))

        EnterpriseButton(
            text = "Apply Security Policy",
            onClick = { },
            isPrimary = true,
            modifier = Modifier.fillMaxWidth()
        )
    }
}

@Composable
fun EmailSmsSettingsView() {
    var smtpHost by remember { mutableStateOf("email-smtp.us-east-1.amazonaws.com") }
    var smsGateway by remember { mutableStateOf("Twilio Corporate SMS API v2") }

    EnterpriseCard {
        Text(
            text = "Email (AWS SES) & SMS Gateway API Config",
            style = MaterialTheme.typography.titleMedium.copy(
                fontWeight = FontWeight.Bold,
                color = SuniteNavy
            )
        )
        Spacer(modifier = Modifier.height(16.dp))

        EnterpriseTextField(
            value = smtpHost,
            onValueChange = { smtpHost = it },
            label = "SMTP Gateway Endpoint"
        )
        Spacer(modifier = Modifier.height(12.dp))
        EnterpriseTextField(
            value = smsGateway,
            onValueChange = { smsGateway = it },
            label = "SMS Telephony API Endpoint"
        )

        Spacer(modifier = Modifier.height(20.dp))

        EnterpriseButton(
            text = "Save Messaging Gateways",
            onClick = { },
            isPrimary = true,
            modifier = Modifier.fillMaxWidth()
        )
    }
}

@Composable
fun WhatsAppSettingsView() {
    var waBusinessId by remember { mutableStateOf("WABA_SUNITE_9901") }
    var waToken by remember { mutableStateOf("EAAG....SuniteMetaSecureToken") }

    EnterpriseCard {
        Text(
            text = "WhatsApp Business Cloud API Settings",
            style = MaterialTheme.typography.titleMedium.copy(
                fontWeight = FontWeight.Bold,
                color = SuniteNavy
            )
        )
        Spacer(modifier = Modifier.height(16.dp))

        EnterpriseTextField(
            value = waBusinessId,
            onValueChange = { waBusinessId = it },
            label = "WhatsApp Business Account ID"
        )
        Spacer(modifier = Modifier.height(12.dp))
        EnterpriseTextField(
            value = waToken,
            onValueChange = { waToken = it },
            label = "System User Bearer Token",
            isPassword = true
        )

        Spacer(modifier = Modifier.height(20.dp))

        EnterpriseButton(
            text = "Save WhatsApp Integration",
            onClick = { },
            isPrimary = true,
            modifier = Modifier.fillMaxWidth()
        )
    }
}

@Composable
fun StorageSettingsView() {
    var s3Bucket by remember { mutableStateOf("sunite-uspn-vault-production") }
    var region by remember { mutableStateOf("us-east-1 (N. Virginia)") }

    EnterpriseCard {
        Text(
            text = "Cloud Storage Vault (AWS S3 & Encryption)",
            style = MaterialTheme.typography.titleMedium.copy(
                fontWeight = FontWeight.Bold,
                color = SuniteNavy
            )
        )
        Spacer(modifier = Modifier.height(16.dp))

        EnterpriseTextField(
            value = s3Bucket,
            onValueChange = { s3Bucket = it },
            label = "AWS S3 Encrypted Bucket"
        )
        Spacer(modifier = Modifier.height(12.dp))
        EnterpriseTextField(
            value = region,
            onValueChange = { region = it },
            label = "AWS Region Zone"
        )

        Spacer(modifier = Modifier.height(20.dp))

        EnterpriseButton(
            text = "Verify & Save Storage Config",
            onClick = { },
            isPrimary = true,
            modifier = Modifier.fillMaxWidth()
        )
    }
}

@Composable
fun ApiKeysSettingsView() {
    EnterpriseCard {
        Text(
            text = "API Keys & Webhook Subscriptions",
            style = MaterialTheme.typography.titleMedium.copy(
                fontWeight = FontWeight.Bold,
                color = SuniteNavy
            )
        )
        Spacer(modifier = Modifier.height(16.dp))

        listOf(
            Triple("Production ERP Gateway Key", "sn_live_9984...a18c", "ACTIVE"),
            Triple("Partner Webhook Listener", "https://api.sunite.io/v1/webhooks/partner-events", "ACTIVE")
        ).forEach { (title, key, status) ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(text = title, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                    Text(text = key, color = SuniteTextSecondary, fontSize = 11.sp)
                }
                EnterpriseBadge(text = status)
            }
            Divider(color = SuniteBorder)
        }

        Spacer(modifier = Modifier.height(16.dp))

        EnterpriseButton(
            text = "+ Generate New API Key",
            onClick = { },
            isPrimary = true,
            modifier = Modifier.fillMaxWidth()
        )
    }
}

@Composable
fun BackupSettingsView() {
    var backingUp by remember { mutableStateOf(false) }
    var backupComplete by remember { mutableStateOf(false) }

    EnterpriseCard {
        Text(
            text = "Automated Database Backup & Restore",
            style = MaterialTheme.typography.titleMedium.copy(
                fontWeight = FontWeight.Bold,
                color = SuniteNavy
            )
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Last Full Backup: 2026-07-30 03:00:00 UTC (Encrypted AES-256)",
            style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
        )

        Spacer(modifier = Modifier.height(20.dp))

        if (backupComplete) {
            Surface(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 12.dp),
                color = SuniteSuccessBg,
                shape = RoundedCornerShape(8.dp)
            ) {
                Text(
                    text = "Database snapshot created successfully: sunite_db_snapshot_20260730.enc",
                    color = SuniteSuccess,
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(10.dp)
                )
            }
        }

        EnterpriseButton(
            text = "Trigger On-Demand DB Snapshot",
            onClick = {
                backingUp = true
                backupComplete = true
                backingUp = false
            },
            isLoading = backingUp,
            isPrimary = true,
            modifier = Modifier.fillMaxWidth()
        )
    }
}
