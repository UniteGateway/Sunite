package com.example.ui.screens.dashboard

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
import com.example.ui.components.*
import com.example.ui.theme.*

@Composable
fun RoleDashboardsScreen(repository: SuniteRepository) {
    var selectedRole by remember { mutableStateOf("Super Admin") }
    val roles = listOf(
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
    )

    val partners by repository.partners.collectAsState(initial = emptyList())
    val customers by repository.customers.collectAsState(initial = emptyList())
    val leads by repository.leads.collectAsState(initial = emptyList())

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
    ) {
        // Role Selector Bar
        EnterpriseCard(modifier = Modifier.padding(16.dp)) {
            Text(
                text = "Enterprise Role Dashboard Console",
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
            )
            Text(
                text = "Select active role view to inspect role-tailored metrics & operational widgets",
                style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary),
                modifier = Modifier.padding(bottom = 8.dp)
            )

            ScrollableTabRow(
                selectedTabIndex = roles.indexOf(selectedRole),
                containerColor = Color.Transparent,
                contentColor = SuniteNavy,
                edgePadding = 0.dp,
                divider = {}
            ) {
                roles.forEach { role ->
                    Tab(
                        selected = selectedRole == role,
                        onClick = { selectedRole = role },
                        text = {
                            Text(
                                text = role,
                                fontSize = 11.sp,
                                fontWeight = if (selectedRole == role) FontWeight.Bold else FontWeight.Normal
                            )
                        }
                    )
                }
            }
        }

        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp)
        ) {
            when (selectedRole) {
                "Super Admin" -> SuperAdminDashboardView(partners.size, customers.size, leads.size)
                "Sales Admin" -> SalesAdminDashboardView(leads)
                "Marketing Partner" -> MarketingPartnerDashboardView(partners.firstOrNull { it.partnerType == "Marketing Partner" })
                "Franchise" -> FranchiseDashboardView(partners.firstOrNull { it.partnerType == "Franchise" })
                "EPC Contractor" -> EpcContractorDashboardView()
                "Installation Vendor" -> InstallationVendorDashboardView()
                "Survey Engineer" -> SurveyEngineerDashboardView(leads)
                "Finance Team" -> FinanceTeamDashboardView()
                "Service Engineer" -> ServiceEngineerDashboardView()
                "Customer" -> CustomerPortalDashboardView()
            }
        }
    }
}

@Composable
fun SuperAdminDashboardView(partnerCount: Int, customerCount: Int, leadCount: Int) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                EnterpriseMetricCard(title = "Ecosystem Partners", value = "$partnerCount", subtitle = "Global Partner Network", modifier = Modifier.weight(1f))
                EnterpriseMetricCard(title = "Active Customers", value = "$customerCount", subtitle = "Solar Accounts", modifier = Modifier.weight(1f))
            }
        }
        item {
            EnterpriseCard {
                Text(text = "Super Admin Governance Overview", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = "• All 10 Role Dashboards active with full RBAC isolation.\n• System Health: 99.98% Uptime | AWS S3 Vault Connected | FCM Push Service Active.\n• Security Status: MFA enforced across all administrative accounts.", style = MaterialTheme.typography.bodySmall.copy(color = SuniteNavy))
            }
        }
    }
}

@Composable
fun SalesAdminDashboardView(leads: List<com.example.data.entity.LeadEntity>) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                EnterpriseMetricCard(title = "Opportunity Pipeline", value = "${leads.size}", subtitle = "Active Leads", modifier = Modifier.weight(1f))
                EnterpriseMetricCard(title = "Unassigned Surveys", value = "${leads.count { it.assignedSurveyEngineer == "Unassigned" }}", subtitle = "Pending Assignment", modifier = Modifier.weight(1f))
            }
        }
        item {
            EnterpriseCard {
                Text(text = "Sales Operations & Proposal Queue", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = "• 3 Quotations ready for final approval & delivery.\n• Average deal cycle time: 4.2 days from lead capture to survey completion.", style = MaterialTheme.typography.bodySmall.copy(color = SuniteNavy))
            }
        }
    }
}

@Composable
fun MarketingPartnerDashboardView(partner: com.example.data.entity.PartnerEntity?) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                EnterpriseMetricCard(title = "Commission Balance", value = "$${partner?.commissionEarned ?: 14500.0}", subtitle = "Earned Payouts", modifier = Modifier.weight(1f))
                EnterpriseMetricCard(title = "Referral Leads", value = "${partner?.activeCustomers ?: 32}", subtitle = "Converted Customers", modifier = Modifier.weight(1f))
            }
        }
        item {
            EnterpriseCard {
                Text(text = "Marketing Partner Affiliate Portal", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = "Referral Link: https://sunite.io/ref/APEX-SOLAR-001\nCommission Rate: 3.5% on completed grid tie installations.", style = MaterialTheme.typography.bodySmall.copy(color = SuniteNavy))
            }
        }
    }
}

@Composable
fun FranchiseDashboardView(partner: com.example.data.entity.PartnerEntity?) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                EnterpriseMetricCard(title = "Regional Revenue", value = "$148,200", subtitle = "Monthly Hub Turnover", modifier = Modifier.weight(1f))
                EnterpriseMetricCard(title = "Active Projects", value = "${partner?.activeProjects ?: 24}", subtitle = "Regional Operations", modifier = Modifier.weight(1f))
            }
        }
        item {
            EnterpriseCard {
                Text(text = "Franchise Regional Operations Desk", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = "• Territory: Silicon Valley / Santa Clara County Hub\n• Active Install Crews: 6 Vendors Onboarded", style = MaterialTheme.typography.bodySmall.copy(color = SuniteNavy))
            }
        }
    }
}

@Composable
fun EpcContractorDashboardView() {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                EnterpriseMetricCard(title = "EPC Projects", value = "12 Active", subtitle = "Milestone Tracking", modifier = Modifier.weight(1f))
                EnterpriseMetricCard(title = "Material Dispatch", value = "98%", subtitle = "BOM Inventory Ready", modifier = Modifier.weight(1f))
            }
        }
        item {
            EnterpriseCard {
                Text(text = "EPC Engineering & Site Execution Console", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = "• Single Line Diagrams (SLD) CAD Drawings verified for 500kW GreenTech Facility.\n• Structure assembly underway at Round Rock site.", style = MaterialTheme.typography.bodySmall.copy(color = SuniteNavy))
            }
        }
    }
}

@Composable
fun InstallationVendorDashboardView() {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                EnterpriseMetricCard(title = "Assigned Jobs", value = "6 Sites", subtitle = "Field Installation", modifier = Modifier.weight(1f))
                EnterpriseMetricCard(title = "Safety Pass Rate", value = "100%", subtitle = "SLA Compliance", modifier = Modifier.weight(1f))
            }
        }
        item {
            EnterpriseCard {
                Text(text = "Field Installation Crew Dispatch", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = "• Crew #4 assigned to Austin Commercial Rooftop Array.\n• Checklist: DC Cable crimping, inverter mounting & earthing grid complete.", style = MaterialTheme.typography.bodySmall.copy(color = SuniteNavy))
            }
        }
    }
}

@Composable
fun SurveyEngineerDashboardView(leads: List<com.example.data.entity.LeadEntity>) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                EnterpriseMetricCard(title = "Assigned Surveys", value = "${leads.count { it.status == "Survey Scheduled" }}", subtitle = "Pending On-Site Visit", modifier = Modifier.weight(1f))
                EnterpriseMetricCard(title = "Completed Surveys", value = "${leads.count { it.status == "Survey Completed" }}", subtitle = "Feasibility Passed", modifier = Modifier.weight(1f))
            }
        }
        item {
            EnterpriseCard {
                Text(text = "Survey Engineer Field Workstation", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = "• Drone CAD Shadow Scan integrated with 3D solar layout engine.\n• Upcoming: Dr. Arthur Pendelton Residence site visit scheduled.", style = MaterialTheme.typography.bodySmall.copy(color = SuniteNavy))
            }
        }
    }
}

@Composable
fun FinanceTeamDashboardView() {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                EnterpriseMetricCard(title = "Escrow Balance", value = "$412,800", subtitle = "Partner Settlements", modifier = Modifier.weight(1f))
                EnterpriseMetricCard(title = "Pending Payouts", value = "4 Accounts", subtitle = "WHT Deducted", modifier = Modifier.weight(1f))
            }
        }
        item {
            EnterpriseCard {
                Text(text = "Finance & Tax Settlement Desk", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = "• Automated GSTIN filing integration ready.\n• Partner commission withholding tax (10% WHT) applied to all payout calculations.", style = MaterialTheme.typography.bodySmall.copy(color = SuniteNavy))
            }
        }
    }
}

@Composable
fun ServiceEngineerDashboardView() {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                EnterpriseMetricCard(title = "AMC Contracts", value = "128 Active", subtitle = "Service Level Agreement", modifier = Modifier.weight(1f))
                EnterpriseMetricCard(title = "Open Tickets", value = "2 Pending", subtitle = "Inverter Telemetry Alerts", modifier = Modifier.weight(1f))
            }
        }
        item {
            EnterpriseCard {
                Text(text = "Service Operations & Warranty Desk", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = "• Real-time Modbus telemetry connected for 500kW inverter grid.\n• Annual preventative maintenance schedule updated.", style = MaterialTheme.typography.bodySmall.copy(color = SuniteNavy))
            }
        }
    }
}

@Composable
fun CustomerPortalDashboardView() {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                EnterpriseMetricCard(title = "Solar System", value = "25 kW PV", subtitle = "Rooftop Solar Array", modifier = Modifier.weight(1f))
                EnterpriseMetricCard(title = "Today's Energy", value = "142 kWh", subtitle = "Clean Power Generated", modifier = Modifier.weight(1f))
            }
        }
        item {
            EnterpriseCard {
                Text(text = "Customer Clean Energy Portal", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = "• Lifetime CO2 Offset: 18.4 Tons equivalent to planting 820 trees.\n• Inverter Status: Normal Generation | Grid Export Active.", style = MaterialTheme.typography.bodySmall.copy(color = SuniteNavy))
            }
        }
    }
}
