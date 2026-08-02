package com.example.ui.screens.mobile

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
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
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.SuniteRepository
import com.example.data.entity.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EnterpriseMobilePlatformScreen(
    repository: SuniteRepository,
    initialTab: Int = 0
) {
    var selectedTab by remember { mutableIntStateOf(initialTab) }
    val scope = rememberCoroutineScope()

    val devices by repository.mobileDevices.collectAsState(initial = emptyList())
    val pushNotifications by repository.pushNotifications.collectAsState(initial = emptyList())
    val syncRecords by repository.offlineSyncRecords.collectAsState(initial = emptyList())
    val documents by repository.digitalDocuments.collectAsState(initial = emptyList())
    val signatures by repository.digitalSignatures.collectAsState(initial = emptyList())

    val tabs = listOf(
        "Customer App",
        "Partner App",
        "Franchise App",
        "Survey App",
        "Installation App",
        "Service App",
        "Finance App",
        "CEO App",
        "Integration Hub"
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
    ) {
        // Top Header
        Surface(
            tonalElevation = 2.dp,
            shadowElevation = 1.dp,
            color = MaterialTheme.colorScheme.surface
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Default.Phonelink,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.primary,
                                modifier = Modifier.size(26.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "Phase 10: Enterprise Mobile Platform & Integrations",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        Text(
                            text = "8 Role Mobile Apps, Offline Engine, Biometrics, AWS S3 & Payment Gateways",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }

                    AssistChip(
                        onClick = {},
                        label = { Text("v1.0 Mobile Ecosystem", fontSize = 11.sp, fontWeight = FontWeight.Bold) },
                        leadingIcon = {
                            Icon(Icons.Default.Verified, contentDescription = null, tint = SuniteSuccess, modifier = Modifier.size(14.dp))
                        }
                    )
                }

                Spacer(modifier = Modifier.height(10.dp))

                // Scrollable Tabs
                ScrollableTabRow(
                    selectedTabIndex = selectedTab,
                    edgePadding = 0.dp,
                    divider = {}
                ) {
                    tabs.forEachIndexed { index, title ->
                        Tab(
                            selected = selectedTab == index,
                            onClick = { selectedTab = index },
                            text = {
                                Text(
                                    text = title,
                                    fontWeight = if (selectedTab == index) FontWeight.Bold else FontWeight.Normal,
                                    fontSize = 12.sp
                                )
                            }
                        )
                    }
                }
            }
        }

        // Tab Content
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            when (selectedTab) {
                0 -> CustomerAppContent(pushNotifications, documents, signatures, repository)
                1 -> PartnerAppContent(repository)
                2 -> FranchiseAppContent(repository)
                3 -> SurveyEngineerAppContent(repository)
                4 -> InstallationEngineerAppContent(repository)
                5 -> ServiceEngineerAppContent(repository)
                6 -> FinanceAppContent(repository)
                7 -> CeoExecutiveAppContent(repository)
                8 -> MobileIntegrationHubContent(devices, pushNotifications, syncRecords, documents, signatures, repository)
            }
        }
    }
}

// ==========================================
// 1. CUSTOMER MOBILE APP
// ==========================================
@Composable
fun CustomerAppContent(
    pushList: List<PushNotificationEntity>,
    documents: List<DocumentEntity>,
    signatures: List<DigitalSignatureEntity>,
    repository: SuniteRepository
) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.6f)),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Person, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(text = "Customer Mobile App — GreenTech Logistics", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                        }
                        BadgeChip(text = "Biometric Secured", color = SuniteSuccess)
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(text = "Solar Rooftop Plant Status: 220 kW TOPCon Array", fontWeight = FontWeight.SemiBold, fontSize = 14.sp)
                    Text(text = "Live Power Output: 184.2 kW (Grid Export Active)", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        MetricColumn("Today Gen", "1,120 kWh")
                        MetricColumn("CO2 Savings", "0.89 Tons")
                        MetricColumn("Grid Offset", "88.4%")
                        MetricColumn("Warranty Status", "Active (10Y)")
                    }
                }
            }
        }

        item {
            Text(text = "Quick Mobile Actions & Pay Gateways", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
        }

        item {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                Button(
                    onClick = {},
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                    modifier = Modifier.weight(1f)
                ) {
                    Icon(Icons.Default.Payment, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("Pay Invoice (Stripe)", fontSize = 11.sp)
                }
                OutlinedButton(
                    onClick = {},
                    modifier = Modifier.weight(1f)
                ) {
                    Icon(Icons.Default.QrCodeScanner, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("Pay via UPI / QR", fontSize = 11.sp)
                }
            }
        }

        item {
            Text(text = "Project Documents & Signed Quotations", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
        }

        items(documents) { doc ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = doc.title, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        Text(text = "Type: ${doc.documentType} • ${doc.storageProvider} • ${doc.fileSizeKb} KB", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    IconButton(onClick = {}) {
                        Icon(Icons.Default.PictureAsPdf, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                    }
                }
            }
        }
    }
}

// ==========================================
// 2. MARKETING PARTNER MOBILE APP
// ==========================================
@Composable
fun PartnerAppContent(repository: SuniteRepository) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.5f)),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "Marketing Partner Mobile App", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Text(text = "Register commercial leads, track quotations & receive instant commission payouts.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        MetricColumn("My Leads", "14 Active")
                        MetricColumn("Closed Deals", "$280,000")
                        MetricColumn("Earned Comm.", "$8,400")
                        MetricColumn("Payout Status", "Instant UPI/Stripe")
                    }
                }
            }
        }

        item {
            Button(onClick = {}, modifier = Modifier.fillMaxWidth()) {
                Icon(Icons.Default.PersonAdd, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Register New Customer Lead (+GPS Auto-Tag)")
            }
        }
    }
}

// ==========================================
// 3. FRANCHISE MOBILE APP
// ==========================================
@Composable
fun FranchiseAppContent(repository: SuniteRepository) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(shape = RoundedCornerShape(16.dp)) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "Franchise & Branch Manager Mobile App", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Text(text = "Branch Hub: Austin Clean Energy Branch | Regional Sales & Partner Network", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        MetricColumn("Branch Sales", "$1.25 M")
                        MetricColumn("Active Partners", "28")
                        MetricColumn("Live Projects", "12 Hubs")
                        MetricColumn("Override Revenue", "$38,500")
                    }
                }
            }
        }
    }
}

// ==========================================
// 4. SURVEY ENGINEER MOBILE APP
// ==========================================
@Composable
fun SurveyEngineerAppContent(repository: SuniteRepository) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.tertiaryContainer.copy(alpha = 0.5f)),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(text = "Survey Engineer Mobile Field App", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                        BadgeChip(text = "Offline Mode Enabled", color = SuniteSuccess)
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(text = "Today's Field Visits: 3 Commercial Sites", fontWeight = FontWeight.SemiBold, fontSize = 14.sp)
                    Text(text = "GPS Navigation • Camera Roof Laser Measurement • Digital Signatures", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }

        item {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                Button(onClick = {}, modifier = Modifier.weight(1f)) {
                    Icon(Icons.Default.CameraAlt, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("Capture Roof Photo", fontSize = 11.sp)
                }
                Button(onClick = {}, modifier = Modifier.weight(1f)) {
                    Icon(Icons.Default.Draw, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("Digital Signature", fontSize = 11.sp)
                }
            }
        }
    }
}

// ==========================================
// 5. INSTALLATION ENGINEER MOBILE APP
// ==========================================
@Composable
fun InstallationEngineerAppContent(repository: SuniteRepository) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(shape = RoundedCornerShape(16.dp)) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "Installation Engineer Mobile Field App", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Text(text = "Track assigned solar installation projects, material usage, Q/C & commissioning.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        MetricColumn("Assigned Site", "220kW Commercial")
                        MetricColumn("Progress", "78% Completed")
                        MetricColumn("Material Status", "Dispatched")
                        MetricColumn("Q/C Checklist", "12/15 Passed")
                    }
                }
            }
        }
    }
}

// ==========================================
// 6. SERVICE ENGINEER MOBILE APP
// ==========================================
@Composable
fun ServiceEngineerAppContent(repository: SuniteRepository) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(shape = RoundedCornerShape(16.dp)) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "Service Engineer Field App", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Text(text = "AMC maintenance visits, thermal imaging, spare parts request & before/after photos.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        MetricColumn("Today Visits", "4 Plant AMC")
                        MetricColumn("Inverter Diagnostics", "Sungrow 110kW")
                        MetricColumn("Parts Used", "2x DC SPD")
                        MetricColumn("Signoff", "Customer OTP")
                    }
                }
            }
        }
    }
}

// ==========================================
// 7. FINANCE MOBILE APP
// ==========================================
@Composable
fun FinanceAppContent(repository: SuniteRepository) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(shape = RoundedCornerShape(16.dp)) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "Finance Executive Mobile App", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Text(text = "Collections, GST, commission approvals, bank reconciliations & payment gateways.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        MetricColumn("Today Collections", "$48,500")
                        MetricColumn("Pending Invoices", "6 Due")
                        MetricColumn("Commission Queue", "$4,200")
                        MetricColumn("Bank Rec.", "Auto-Matched")
                    }
                }
            }
        }
    }
}

// ==========================================
// 8. CEO EXECUTIVE MOBILE APP
// ==========================================
@Composable
fun CeoExecutiveAppContent(repository: SuniteRepository) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(text = "CEO & Board Strategic Mobile Dashboard", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                        BadgeChip(text = "Real-time AI Telemetry", color = SuniteSuccess)
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        MetricColumn("Total Revenue", "$1.25 Million")
                        MetricColumn("Pipeline", "$3.40 Million")
                        MetricColumn("CO2 Offset", "784.5 Tons")
                        MetricColumn("AMC Revenue", "$128k/yr")
                    }
                }
            }
        }
    }
}

// ==========================================
// 9. MOBILE INTEGRATION HUB & INFRASTRUCTURE
// ==========================================
@Composable
fun MobileIntegrationHubContent(
    devices: List<MobileDeviceEntity>,
    pushList: List<PushNotificationEntity>,
    syncRecords: List<OfflineSyncEntity>,
    documents: List<DocumentEntity>,
    signatures: List<DigitalSignatureEntity>,
    repository: SuniteRepository
) {
    val scope = rememberCoroutineScope()

    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "Mobile Infrastructure & Integration Center", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Text(text = "Manage registered devices, FCM push notifications, offline sync queues, cloud storage & digital signatures.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }

        item {
            Text(text = "Registered Enterprise Mobile Devices (${devices.size})", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
        }

        items(devices) { dev ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth().padding(12.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = "${dev.deviceName} (${dev.appRole})", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        Text(text = "${dev.osVersion} • Registered: ${dev.registeredAt}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    BadgeChip(text = if (dev.biometricEnabled) "Biometric ON" else "PIN Only", color = MaterialTheme.colorScheme.primary)
                }
            }
        }

        item {
            Text(text = "Offline Engine Queue (${syncRecords.size})", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
        }

        items(syncRecords) { sync ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth().padding(12.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = "${sync.entityName} [${sync.actionType}]", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        Text(text = "Created: ${sync.createdAt} • Synced: ${sync.syncedAt}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    BadgeChip(text = sync.status, color = SuniteSuccess)
                }
            }
        }

        item {
            Text(text = "Digital Signatures & OTP Verifications (${signatures.size})", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
        }

        items(signatures) { sig ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = sig.signerName, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        BadgeChip(text = "OTP Verified", color = SuniteSuccess)
                    }
                    Text(text = "Entity: ${sig.targetEntityName} (${sig.targetId}) • Role: ${sig.signerRole}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Text(text = "GPS: ${sig.gpsCoordinates} • Signed: ${sig.signedAt}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
    }
}

// ==========================================
// HELPER COMPONENTS
// ==========================================
@Composable
private fun MetricColumn(title: String, value: String) {
    Column {
        Text(text = title, fontSize = 10.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Text(text = value, fontWeight = FontWeight.Bold, fontSize = 13.sp)
    }
}

@Composable
private fun BadgeChip(text: String, color: Color) {
    Surface(
        color = color.copy(alpha = 0.15f),
        contentColor = color,
        shape = RoundedCornerShape(12.dp)
    ) {
        Text(
            text = text,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
            fontSize = 10.sp,
            fontWeight = FontWeight.Bold
        )
    }
}
