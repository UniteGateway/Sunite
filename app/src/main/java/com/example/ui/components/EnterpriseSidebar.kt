package com.example.ui.components

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.*

data class NavItem(
    val route: String,
    val title: String,
    val icon: ImageVector,
    val section: String,
    val badge: String? = null,
    val isSubItem: Boolean = false
)

@Composable
fun EnterpriseSidebarContent(
    currentRoute: String,
    onNavigate: (String) -> Unit,
    onLogout: () -> Unit,
    onTriggerTimeout: () -> Unit,
    onTriggerUnauthorized: () -> Unit,
    onCloseDrawer: () -> Unit
) {
    val navItems = listOf(
        // Dashboard & Roles
        NavItem("dashboard", "Dashboard Overview", Icons.Outlined.Dashboard, "OVERVIEW"),
        NavItem("master_workflow", "Master Workflow Engine", Icons.Outlined.AccountTree, "OVERVIEW", "20 Steps"),
        NavItem("role_dashboards", "Role Dashboards Console", Icons.Outlined.SpaceDashboard, "OVERVIEW", "10 Roles"),
        
        // CRM & Pipeline
        NavItem("crm", "Customer CRM 360°", Icons.Outlined.Groups, "CRM & PIPELINE"),
        NavItem("leads", "Lead Opportunity Pipeline", Icons.Outlined.TrendingUp, "CRM & PIPELINE", "New Leads"),
        
        // Partner Network
        NavItem("partners", "Partner Network & Onboarding", Icons.Outlined.Handshake, "PARTNER NETWORK", "Wizard"),
        
        // Operations & Modules
        NavItem("pricing_engine", "Dynamic Pricing Engine", Icons.Outlined.Calculate, "OPERATIONS", "Phase 4"),
        NavItem("solar_design", "Solar Design Engine", Icons.Outlined.SolarPower, "OPERATIONS", "Phase 3"),
        NavItem("survey", "Survey Engine", Icons.Outlined.Assignment, "OPERATIONS"),
        NavItem("quotation", "Quotation Engine", Icons.Outlined.RequestQuote, "OPERATIONS", "Phase 5"),
        NavItem("projects", "Projects Execution", Icons.Outlined.AccountTree, "OPERATIONS", "Phase 6"),
        NavItem("finance", "Finance & Payouts", Icons.Outlined.Payments, "OPERATIONS", "Phase 7"),
        NavItem("after_sales", "After Sales & Service", Icons.Outlined.BuildCircle, "OPERATIONS", "Phase 8"),
        NavItem("warranty", "Warranty Register", Icons.Outlined.WorkspacePremium, "OPERATIONS"),
        NavItem("amc", "AMC Contracts", Icons.Outlined.Verified, "OPERATIONS"),
        NavItem("service_tickets", "Service Tickets", Icons.Outlined.ConfirmationNumber, "OPERATIONS"),
        NavItem("service_visits", "Field Engineer Visits", Icons.Outlined.Engineering, "OPERATIONS"),
        NavItem("preventive_maintenance", "Preventive Maintenance", Icons.Outlined.Event, "OPERATIONS"),
        NavItem("spare_inventory", "Spare Parts Stock", Icons.Outlined.Inventory, "OPERATIONS"),
        NavItem("warranty_claims", "Warranty Claims RMA", Icons.Outlined.AssignmentReturn, "OPERATIONS"),
        NavItem("customer_feedback", "Customer Feedback", Icons.Outlined.Grade, "OPERATIONS"),
        
        // Search & Vault
        NavItem("search", "Global Search", Icons.Outlined.Search, "SEARCH & FILES"),
        NavItem("files", "File Vault", Icons.Outlined.FolderSpecial, "SEARCH & FILES"),

        // Analytics & AI
        NavItem("reports", "Audit & Compliance", Icons.Outlined.VerifiedUser, "ANALYTICS & COMPLIANCE"),
        NavItem("smart_energy", "Smart Energy AI Platform", Icons.Outlined.AutoAwesome, "AI & SCADA PLATFORM", "Phase 9"),
        NavItem("ai_assistant", "GenAI Assistant", Icons.Outlined.Chat, "AI & SCADA PLATFORM", "Gemini"),
        NavItem("ai_ocr", "Utility Bill OCR", Icons.Outlined.DocumentScanner, "AI & SCADA PLATFORM", true),
        NavItem("ai_roof", "Roof CAD & Shading AI", Icons.Outlined.Satellite, "AI & SCADA PLATFORM", true),
        NavItem("scada_telemetry", "SCADA IoT Live Telemetry", Icons.Outlined.CellTower, "AI & SCADA PLATFORM", true),
        NavItem("predictive_maint", "Predictive Maintenance AI", Icons.Outlined.Troubleshoot, "AI & SCADA PLATFORM", true),
        
        // System & Governance
        NavItem("org", "Organization & Hubs", Icons.Outlined.Business, "SYSTEM & GOVERNANCE"),
        NavItem("users", "User Management", Icons.Outlined.People, "SYSTEM & GOVERNANCE"),
        NavItem("roles", "Roles & Permissions", Icons.Outlined.Security, "SYSTEM & GOVERNANCE"),
        NavItem("masterdata", "Master Data Engine", Icons.Outlined.Inventory2, "SYSTEM & GOVERNANCE"),
        NavItem("notifications", "Notification Center", Icons.Outlined.Notifications, "SYSTEM & GOVERNANCE"),
        NavItem("settings", "System Configurations", Icons.Outlined.Settings, "SYSTEM & GOVERNANCE")
    )

    val sections = navItems.map { it.section }.distinct()

    Column(
        modifier = Modifier
            .fillMaxHeight()
            .width(280.dp)
            .background(SuniteNavyDark)
            .padding(16.dp)
    ) {
        // Sidebar Branding Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column {
                // Corporate Brand Logo: sun⚡te
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = "sun",
                        style = MaterialTheme.typography.titleLarge.copy(
                            fontWeight = FontWeight.Bold,
                            color = Color.White,
                            fontSize = 22.sp,
                            letterSpacing = (-0.5).sp
                        )
                    )
                    Icon(
                        imageVector = Icons.Default.Bolt,
                        contentDescription = null,
                        tint = SuniteOrange,
                        modifier = Modifier.size(22.dp)
                    )
                    Text(
                        text = "te",
                        style = MaterialTheme.typography.titleLarge.copy(
                            fontWeight = FontWeight.Bold,
                            color = Color.White,
                            fontSize = 22.sp,
                            letterSpacing = (-0.5).sp
                        )
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Surface(
                        shape = RoundedCornerShape(4.dp),
                        color = SuniteOrange.copy(alpha = 0.2f),
                        border = androidx.compose.foundation.BorderStroke(1.dp, SuniteOrange.copy(alpha = 0.6f))
                    ) {
                        Text(
                            text = "ENTERPRISE",
                            color = SuniteOrangeLight,
                            fontSize = 8.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(horizontal = 4.dp, vertical = 1.dp)
                        )
                    }
                }
                Text(
                    text = "Sunite Enterprise",
                    style = MaterialTheme.typography.labelSmall.copy(
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    ),
                    modifier = Modifier.padding(top = 2.dp)
                )
                Text(
                    text = "Unite Solar Partner Network",
                    style = MaterialTheme.typography.labelSmall.copy(
                        color = SuniteOrangeLight,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Normal
                    )
                )
            }
            IconButton(onClick = onCloseDrawer) {
                Icon(
                    imageVector = Icons.Default.ChevronLeft,
                    contentDescription = "Close Menu",
                    tint = Color.White
                )
            }
        }

        Divider(color = Color(0xFF1E3A8A), modifier = Modifier.padding(bottom = 8.dp))

        // Navigation Items by Section
        Column(
            modifier = Modifier
                .weight(1f)
                .verticalScroll(rememberScrollState())
        ) {
            sections.forEach { section ->
                Text(
                    text = section,
                    style = MaterialTheme.typography.labelSmall.copy(
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF94A3B8),
                        fontSize = 10.sp
                    ),
                    modifier = Modifier.padding(top = 10.dp, bottom = 4.dp, start = 8.dp)
                )

                navItems.filter { it.section == section }.forEach { item ->
                    val isSelected = currentRoute == item.route
                    Surface(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(
                                start = if (item.isSubItem) 12.dp else 0.dp,
                                top = 2.dp,
                                bottom = 2.dp
                            )
                            .testTag("nav_item_${item.route}"),
                        shape = RoundedCornerShape(8.dp),
                        color = if (isSelected) SuniteNavy else Color.Transparent,
                        border = if (isSelected) androidx.compose.foundation.BorderStroke(1.dp, SuniteOrange) else null
                    ) {
                        Row(
                            modifier = Modifier
                                .clickable {
                                    onNavigate(item.route)
                                    onCloseDrawer()
                                }
                                .padding(horizontal = 10.dp, vertical = 8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = item.icon,
                                contentDescription = item.title,
                                tint = if (isSelected) SuniteOrange else Color(0xFFCBD5E1),
                                modifier = Modifier.size(if (item.isSubItem) 16.dp else 18.dp)
                            )
                            Spacer(modifier = Modifier.width(10.dp))
                            Text(
                                text = item.title,
                                style = MaterialTheme.typography.bodyMedium.copy(
                                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                                    color = if (isSelected) Color.White else Color(0xFFE2E8F0),
                                    fontSize = if (item.isSubItem) 12.sp else 13.sp
                                ),
                                modifier = Modifier.weight(1f)
                            )
                            if (item.badge != null) {
                                Surface(
                                    shape = RoundedCornerShape(12.dp),
                                    color = if (isSelected) SuniteOrange else Color(0xFF1E428A)
                                ) {
                                    Text(
                                        text = item.badge,
                                        style = MaterialTheme.typography.labelSmall.copy(
                                            color = Color.White,
                                            fontSize = 9.sp,
                                            fontWeight = FontWeight.Bold
                                        ),
                                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }

        Divider(color = Color(0xFF1E3A8A), modifier = Modifier.padding(vertical = 8.dp))

        // Security & Test Helpers
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 6.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            TextButton(
                onClick = onTriggerTimeout,
                colors = ButtonDefaults.textButtonColors(contentColor = SuniteWarning)
            ) {
                Text("Timeout Test", fontSize = 10.sp)
            }
            TextButton(
                onClick = onTriggerUnauthorized,
                colors = ButtonDefaults.textButtonColors(contentColor = SuniteDanger)
            ) {
                Text("403 Test", fontSize = 10.sp)
            }
        }

        // Logout Button
        Surface(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(8.dp),
            color = Color(0xFF450A0A)
        ) {
            Row(
                modifier = Modifier
                    .clickable { onLogout() }
                    .padding(horizontal = 12.dp, vertical = 10.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.Logout,
                    contentDescription = "Logout",
                    tint = SuniteDanger,
                    modifier = Modifier.size(18.dp)
                )
                Spacer(modifier = Modifier.width(10.dp))
                Text(
                    text = "Sign Out Session",
                    color = Color.White,
                    fontWeight = FontWeight.Bold,
                    fontSize = 12.sp
                )
            }
        }
    }
}
