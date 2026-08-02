package com.example.ui.screens.backend

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.SuniteRepository
import com.example.data.entity.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EnterpriseBackendCloudScreen(
    repository: SuniteRepository,
    initialTab: Int = 0
) {
    var selectedTab by remember { mutableIntStateOf(initialTab) }
    val scope = rememberCoroutineScope()

    val psqlLogs by repository.postgresSyncLogs.collectAsState(initial = emptyList())
    val apiRoutes by repository.apiGatewayRoutes.collectAsState(initial = emptyList())
    val cloudStorage by repository.cloudStorageConfigs.collectAsState(initial = emptyList())
    val secAuditLogs by repository.securityAuditLogs.collectAsState(initial = emptyList())
    val devOpsK8s by repository.devOpsDeployments.collectAsState(initial = emptyList())

    val tabs = listOf(
        "NestJS & PostgreSQL Sync",
        "API Gateway & Swagger",
        "Multi-Cloud Storage",
        "DevOps & Kubernetes",
        "Security & OWASP Audit",
        "Architecture & ERD Docs"
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
                                imageVector = Icons.Default.CloudSync,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.primary,
                                modifier = Modifier.size(26.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "Phase 11: Enterprise Production Backend & Cloud Architecture",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        Text(
                            text = "NestJS, PostgreSQL Master, Room Sync Engine, Redis Cache, AWS/GCP, K8s & Security",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }

                    AssistChip(
                        onClick = {},
                        label = { Text("Phase 11 Active", fontSize = 11.sp, fontWeight = FontWeight.Bold) },
                        leadingIcon = {
                            Icon(Icons.Default.CheckCircle, contentDescription = null, tint = SuniteSuccess, modifier = Modifier.size(14.dp))
                        }
                    )
                }

                Spacer(modifier = Modifier.height(10.dp))

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
                0 -> PostgresSyncEngineContent(psqlLogs)
                1 -> ApiGatewaySwaggerContent(apiRoutes)
                2 -> MultiCloudStorageContent(cloudStorage)
                3 -> DevOpsKubernetesContent(devOpsK8s)
                4 -> SecurityOwaspAuditContent(secAuditLogs)
                5 -> ArchitectureErdDocsContent()
            }
        }
    }
}

// ==========================================
// 1. NESTJS & POSTGRESQL SYNC ENGINE
// ==========================================
@Composable
private fun PostgresSyncEngineContent(logs: List<PostgresSyncLogEntity>) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.5f)),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(text = "PostgreSQL Master & Room Offline Cache Architecture", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                        BadgeChip(text = "Bi-Directional Sync Active", color = SuniteSuccess)
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = "Room SQLite acts as offline cache on client devices. Changes queue automatically and stream to NestJS backend, executing transactional ACID writes into PostgreSQL.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        MetricColumn("Master DB", "PostgreSQL 16.2")
                        MetricColumn("Cluster", "AWS RDS Multi-AZ")
                        MetricColumn("Sync Latency", "30 ms Avg")
                        MetricColumn("Conflict Res.", "Timestamp Vector")
                    }
                }
            }
        }

        item {
            Text(text = "Live Sync Transactions (${logs.size})", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
        }

        items(logs) { log ->
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
                        Text(text = "Table: ${log.tableName} (ID: ${log.recordId})", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        Text(text = "Direction: ${log.syncDirection} • Cluster: ${log.postgresCluster}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Text(text = "Time: ${log.timestamp} • Latency: ${log.latencyMs} ms", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    BadgeChip(text = log.syncStatus, color = SuniteSuccess)
                }
            }
        }
    }
}

// ==========================================
// 2. API GATEWAY & SWAGGER SPECS
// ==========================================
@Composable
private fun ApiGatewaySwaggerContent(routes: List<ApiGatewayRouteEntity>) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(shape = RoundedCornerShape(16.dp)) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "REST API Gateway & OpenAPI / Swagger Portal", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Text(text = "Rate-limited NestJS routes, Redis caching layer & OpenAPI spec endpoints.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }

        item {
            Text(text = "Gateway Routes & Redis Caching", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
        }

        items(routes) { route ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Surface(
                                color = if (route.httpMethod == "POST") MaterialTheme.colorScheme.primary else SuniteSuccess,
                                shape = RoundedCornerShape(4.dp)
                            ) {
                                Text(text = route.httpMethod, modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp), color = Color.White, fontWeight = FontWeight.Bold, fontSize = 10.sp)
                            }
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(text = route.endpointPath, fontFamily = FontFamily.Monospace, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                        }
                        BadgeChip(text = route.status, color = SuniteSuccess)
                    }

                    Spacer(modifier = Modifier.height(6.dp))
                    Text(text = "Controller: ${route.controllerName} • Tag: ${route.swaggerTag}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Text(text = "Rate Limit: ${route.rateLimitRpm} RPM • Redis Cached: ${route.isCachedRedis} • Auth: ${if (route.authRequired) "JWT/OAuth2" else "Public"}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
    }
}

// ==========================================
// 3. MULTI-CLOUD STORAGE
// ==========================================
@Composable
private fun MultiCloudStorageContent(configs: List<CloudStorageConfigEntity>) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(shape = RoundedCornerShape(16.dp)) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "Multi-Cloud Storage & CDN Layer", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Text(text = "Configurable attachment routing between AWS S3, Azure Blob & Google Cloud Storage.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }

        items(configs) { config ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(text = "${config.provider} — Bucket: ${config.bucketName}", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        BadgeChip(text = config.region, color = MaterialTheme.colorScheme.primary)
                    }
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(text = "CDN Domain: ${config.cdnDomain}", fontFamily = FontFamily.Monospace, fontSize = 11.sp, color = MaterialTheme.colorScheme.primary)
                    Text(text = "Encryption: ${config.defaultEncryption} • Storage Class: ${config.activeStorageClass}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Text(text = "Files: ${config.totalFilesCount} • Usage: ${config.storageUsedGb} GB", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
    }
}

// ==========================================
// 4. DEVOPS & KUBERNETES
// ==========================================
@Composable
private fun DevOpsKubernetesContent(deployments: List<DevOpsDeploymentEntity>) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(shape = RoundedCornerShape(16.dp)) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "Kubernetes & CI/CD DevOps Cluster Control", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Text(text = "Docker container health, Helm deployments, CPU/RAM telemetry & autoscaling.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }

        items(deployments) { k8s ->
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
                        Text(text = k8s.serviceName, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        BadgeChip(text = k8s.environment, color = SuniteSuccess)
                    }
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(text = "Image Tag: ${k8s.dockerImageTag} • Helm Chart: ${k8s.helmReleaseVersion}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Text(text = "K8s Pods: ${k8s.k8sPodStatus} • Memory: ${k8s.memoryUsageMb} MB • CPU: ${k8s.cpuUsagePct}%", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Text(text = "Last Deployed: ${k8s.lastDeployedAt}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
    }
}

// ==========================================
// 5. SECURITY & OWASP AUDIT
// ==========================================
@Composable
private fun SecurityOwaspAuditContent(logs: List<SecurityAuditLogEntity>) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer.copy(alpha = 0.3f)),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(text = "OWASP Security, JWT & Penetration Audit Logs", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                        BadgeChip(text = "SOC2 / ISO27001 Ready", color = SuniteSuccess)
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = "Real-time threat monitoring, token refreshes, rate-limit enforcement and WAF sanitization logs.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }

        items(logs) { sec ->
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
                        Text(text = sec.eventType, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        BadgeChip(
                            text = sec.threatSeverity,
                            color = if (sec.threatSeverity == "HIGH" || sec.threatSeverity == "CRITICAL") MaterialTheme.colorScheme.error else SuniteSuccess
                        )
                    }
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(text = "User: ${sec.userEmail} • IP: ${sec.ipAddress}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Text(text = "Details: ${sec.details}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Text(text = "Timestamp: ${sec.timestamp}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
    }
}

// ==========================================
// 6. ARCHITECTURE & ERD DOCS
// ==========================================
@Composable
private fun ArchitectureErdDocsContent() {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(shape = RoundedCornerShape(16.dp)) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "Sunite Enterprise System Architecture & ERD Specifications", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = "System Stack: Android (Jetpack Compose, Room Cache) <---> NestJS API Gateway <---> PostgreSQL Master + Redis Cache + RabbitMQ Queue + Multi-Cloud Storage (S3/GCS/Azure)", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "PostgreSQL ERD Schemas & Tables", fontWeight = FontWeight.Bold, fontSize = 15.sp)
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = "• organizations (id, company_name, legal_name, tax_id, currency)", style = MaterialTheme.typography.bodySmall)
                    Text(text = "• users (id, email, password_hash, role, permissions, mfa_secret)", style = MaterialTheme.typography.bodySmall)
                    Text(text = "• crm_leads (id, customer_name, kw_requirement, stage, partner_id)", style = MaterialTheme.typography.bodySmall)
                    Text(text = "• solar_designs (id, customer_name, module_type, kw_dc, roof_area)", style = MaterialTheme.typography.bodySmall)
                    Text(text = "• quotations (id, lead_id, total_price_usd, tax_amount, approved_by)", style = MaterialTheme.typography.bodySmall)
                    Text(text = "• project_execution (id, project_name, status, engineer_id, progress_pct)", style = MaterialTheme.typography.bodySmall)
                    Text(text = "• scada_telemetry (id, plant_id, live_power_kw, grid_export_kw, temp_c)", style = MaterialTheme.typography.bodySmall)
                    Text(text = "• mobile_devices (id, user_id, push_token, os_version, biometric_enabled)", style = MaterialTheme.typography.bodySmall)
                    Text(text = "• offline_sync_records (id, entity_name, action_type, payload_json, status)", style = MaterialTheme.typography.bodySmall)
                }
            }
        }
    }
}

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
