package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.lifecycleScope
import com.example.auth.AuthManager
import com.example.auth.AuthScreenState
import com.example.data.AppDatabase
import com.example.data.SuniteRepository
import com.example.ui.components.EnterpriseHeader
import com.example.ui.components.EnterpriseSidebarContent
import com.example.ui.screens.auth.*
import com.example.ui.screens.crm.CustomerCrmScreen
import com.example.ui.screens.crm.LeadManagementScreen
import com.example.ui.screens.dashboard.DashboardScreen
import com.example.ui.screens.dashboard.RoleDashboardsScreen
import com.example.ui.screens.files.FileManagementScreen
import com.example.ui.screens.masterdata.MasterDataScreen
import com.example.ui.screens.notifications.NotificationsScreen
import com.example.ui.screens.organization.OrgScreen
import com.example.ui.screens.partners.PartnerNetworkScreen
import com.example.ui.screens.profile.ProfileScreen
import com.example.ui.screens.reports.ReportsScreen
import com.example.ui.screens.roles.RolesScreen
import com.example.ui.screens.search.GlobalSearchScreen
import com.example.ui.screens.settings.SettingsScreen
import com.example.ui.screens.users.UsersScreen
import com.example.ui.theme.SuniteTheme
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val db = AppDatabase.getDatabase(applicationContext, lifecycleScope)
        val repository = SuniteRepository(
            userDao = db.userDao(),
            orgDao = db.orgDao(),
            systemDao = db.systemDao(),
            crmDao = db.crmDao(),
            solarDesignDao = db.solarDesignDao(),
            pricingDao = db.pricingDao(),
            quotationDao = db.quotationDao(),
            projectExecutionDao = db.projectExecutionDao(),
            afterSalesDao = db.afterSalesDao()
        )

        setContent {
            SuniteTheme {
                SuniteMainApp(repository = repository)
            }
        }
    }
}

@Composable
fun SuniteMainApp(repository: SuniteRepository) {
    val authState by AuthManager.authState.collectAsState()
    var currentRoute by remember { mutableStateOf("dashboard") }
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val coroutineScope = rememberCoroutineScope()

    val notifications by repository.notifications.collectAsState(initial = emptyList())
    val unreadNotifCount = notifications.count { !it.read }

    when (authState.screenState) {
        AuthScreenState.Splash -> {
            SplashScreen(onFinishSplash = {
                AuthManager.navigateTo(
                    if (authState.currentUser != null) AuthScreenState.Authenticated else AuthScreenState.Login
                )
            })
        }
        AuthScreenState.Login -> {
            LoginScreen()
        }
        AuthScreenState.OtpLogin -> {
            OtpLoginScreen()
        }
        AuthScreenState.ForgotPassword -> {
            ForgotPasswordScreen()
        }
        AuthScreenState.ResetPassword -> {
            ResetPasswordScreen()
        }
        AuthScreenState.MfaVerification -> {
            MfaScreen()
        }
        AuthScreenState.Unauthorized -> {
            UnauthorizedScreen(onBackToDashboard = {
                AuthManager.navigateTo(AuthScreenState.Authenticated)
                currentRoute = "dashboard"
            })
        }
        AuthScreenState.SessionExpired -> {
            SessionExpiredScreen()
        }
        AuthScreenState.Authenticated, AuthScreenState.EmailVerification -> {
            ModalNavigationDrawer(
                drawerState = drawerState,
                drawerContent = {
                    ModalDrawerSheet {
                        EnterpriseSidebarContent(
                            currentRoute = currentRoute,
                            onNavigate = { route ->
                                currentRoute = route
                                coroutineScope.launch { drawerState.close() }
                            },
                            onLogout = {
                                AuthManager.logout()
                                coroutineScope.launch { drawerState.close() }
                            },
                            onTriggerTimeout = {
                                AuthManager.triggerSessionTimeout()
                                coroutineScope.launch { drawerState.close() }
                            },
                            onTriggerUnauthorized = {
                                AuthManager.triggerUnauthorizedAccess()
                                coroutineScope.launch { drawerState.close() }
                            },
                            onCloseDrawer = {
                                coroutineScope.launch { drawerState.close() }
                            }
                        )
                    }
                }
            ) {
                Scaffold(
                    topBar = {
                        EnterpriseHeader(
                            currentTitle = when (currentRoute) {
                                "dashboard" -> "Sunite Enterprise Dashboard"
                                "role_dashboards" -> "Role-Tailored Executive Dashboards"
                                "crm" -> "Customer CRM 360° Directory"
                                "leads" -> "Opportunity Pipeline & Lead Tracker"
                                "partners" -> "Partner Ecosystem & Onboarding"
                                "crm_leads" -> "CRM: Solar Leads Management"
                                "crm_customers" -> "CRM: Customer Directory"
                                "crm_opps" -> "CRM: Opportunities Pipeline"
                                "partner_marketing" -> "Partners: Marketing Partners"
                                "partner_franchise" -> "Partners: Franchise Network"
                                "partner_epc" -> "Partners: EPC Contractors"
                                "partner_vendors" -> "Partners: Installation Vendors"
                                "survey" -> "Survey & Feasibility Engineering"
                                "quotation" -> "Quotation & Payback Proposals"
                                "projects" -> "Projects & EPC Execution"
                                "finance" -> "Finance & Commission Escrow"
                                "warranty" -> "Warranty & AMC Management"
                                "reports" -> "Reports & Compliance Audit Logs"
                                "ai_assistant" -> "Sunite GenAI Solar Assistant"
                                "search" -> "Global Enterprise Search Engine"
                                "files" -> "Document & File Vault"
                                "org" -> "Organization & Branch Hubs"
                                "users" -> "User Directory & Access Controls"
                                "roles" -> "Role-Based Access Control (RBAC)"
                                "masterdata" -> "Master Data Engine"
                                "settings" -> "System Configurations & Integrations"
                                "notifications" -> "Notifications & Templates"
                                "profile" -> "My Profile & Security"
                                else -> "Sunite Enterprise"
                            },
                            onMenuClick = {
                                coroutineScope.launch { drawerState.open() }
                            },
                            unreadNotificationCount = unreadNotifCount,
                            onNotificationClick = { currentRoute = "notifications" },
                            onProfileClick = { currentRoute = "profile" },
                            selectedRole = authState.currentUser?.role ?: "Super Admin",
                            onRoleChange = { role -> AuthManager.switchUserRole(role) }
                        )
                    }
                ) { innerPadding ->
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(innerPadding)
                    ) {
                        AnimatedContent(
                            targetState = currentRoute,
                            label = "MainRouteTransition"
                        ) { targetRoute ->
                            when (targetRoute) {
                                "dashboard" -> DashboardScreen(
                                    repository = repository,
                                    onNavigate = { currentRoute = it }
                                )
                                "master_workflow" -> com.example.ui.screens.workflow.MasterWorkflowEngineScreen(repository = repository)
                                "role_dashboards" -> RoleDashboardsScreen(repository = repository)
                                "crm" -> CustomerCrmScreen(repository = repository)
                                "leads" -> LeadManagementScreen(repository = repository)
                                "partners" -> PartnerNetworkScreen(repository = repository)
                                "crm_leads" -> com.example.ui.screens.modules.GenericModuleScreen(
                                    title = "Solar Leads Management",
                                    subtitle = "Track and qualify incoming solar prospects",
                                    category = "CRM MODULE",
                                    icon = Icons.Outlined.PersonAdd,
                                    primaryActionLabel = "+ Add Lead"
                                )
                                "crm_customers" -> com.example.ui.screens.modules.GenericModuleScreen(
                                    title = "Customer Accounts",
                                    subtitle = "Customer database, installed capacity and site histories",
                                    category = "CRM MODULE",
                                    icon = Icons.Outlined.Groups,
                                    primaryActionLabel = "+ Add Customer"
                                )
                                "crm_opps" -> com.example.ui.screens.modules.GenericModuleScreen(
                                    title = "Opportunities Pipeline",
                                    subtitle = "Stage-wise solar deal progress and revenue estimation",
                                    category = "CRM MODULE",
                                    icon = Icons.Outlined.TrendingUp,
                                    primaryActionLabel = "+ Create Opportunity"
                                )
                                "partner_marketing" -> com.example.ui.screens.modules.GenericModuleScreen(
                                    title = "Marketing Partners",
                                    subtitle = "Referral tracking, lead attribution & commission tiers",
                                    category = "PARTNER MODULE",
                                    icon = Icons.Outlined.Campaign,
                                    primaryActionLabel = "+ Register Marketing Partner"
                                )
                                "partner_franchise" -> com.example.ui.screens.modules.GenericModuleScreen(
                                    title = "Franchise Network",
                                    subtitle = "Regional franchise hubs, performance & territorial rights",
                                    category = "PARTNER MODULE",
                                    icon = Icons.Outlined.Store,
                                    primaryActionLabel = "+ Register Franchise"
                                )
                                "partner_epc" -> com.example.ui.screens.modules.GenericModuleScreen(
                                    title = "EPC Contractors",
                                    subtitle = "Engineering, Procurement, and Construction partner network",
                                    category = "PARTNER MODULE",
                                    icon = Icons.Outlined.Engineering,
                                    primaryActionLabel = "+ Register EPC Partner"
                                )
                                "partner_vendors" -> com.example.ui.screens.modules.GenericModuleScreen(
                                    title = "Installation Vendors",
                                    subtitle = "Field installation crews, equipment vendors & SLAs",
                                    category = "PARTNER MODULE",
                                    icon = Icons.Outlined.Handshake,
                                    primaryActionLabel = "+ Register Vendor"
                                )
                                "pricing_engine" -> com.example.ui.screens.pricing.DynamicPricingEngineScreen(repository = repository)
                                "solar_design" -> com.example.ui.screens.design.SolarDesignCalculatorScreen(repository = repository)
                                "survey" -> com.example.ui.screens.modules.GenericModuleScreen(
                                    title = "Site Feasibility & Surveys",
                                    subtitle = "Roof structural analysis, shadow testing, and CAD validation",
                                    category = "SURVEY MODULE",
                                    icon = Icons.Outlined.Assignment,
                                    primaryActionLabel = "+ Create Site Survey"
                                )
                                "quotation" -> com.example.ui.screens.quotation.ProfessionalQuotationEngineScreen(repository = repository)
                                "projects" -> com.example.ui.screens.execution.ProjectExecutionOrderScreen(repository = repository)
                                "finance" -> com.example.ui.screens.modules.GenericModuleScreen(
                                    title = "Finance & Escrow",
                                    subtitle = "Partner commission payouts, invoicing, tax withholding & billing",
                                    category = "FINANCE MODULE",
                                    icon = Icons.Outlined.Payments,
                                    primaryActionLabel = "+ Record Transaction"
                                )
                                "after_sales" -> com.example.ui.screens.modules.AfterSalesServiceScreen(repository = repository, initialTab = 0)
                                "warranty" -> com.example.ui.screens.modules.AfterSalesServiceScreen(repository = repository, initialTab = 0)
                                "amc" -> com.example.ui.screens.modules.AfterSalesServiceScreen(repository = repository, initialTab = 1)
                                "service_tickets" -> com.example.ui.screens.modules.AfterSalesServiceScreen(repository = repository, initialTab = 2)
                                "service_visits" -> com.example.ui.screens.modules.AfterSalesServiceScreen(repository = repository, initialTab = 3)
                                "preventive_maintenance" -> com.example.ui.screens.modules.AfterSalesServiceScreen(repository = repository, initialTab = 4)
                                "spare_inventory" -> com.example.ui.screens.modules.AfterSalesServiceScreen(repository = repository, initialTab = 5)
                                "warranty_claims" -> com.example.ui.screens.modules.AfterSalesServiceScreen(repository = repository, initialTab = 6)
                                "customer_feedback" -> com.example.ui.screens.modules.AfterSalesServiceScreen(repository = repository, initialTab = 7)
                                "warranty_old" -> com.example.ui.screens.modules.GenericModuleScreen(
                                    title = "Warranty & AMC Contracts",
                                    subtitle = "Annual maintenance contracts, panel degradation & telemetry alerts",
                                    category = "WARRANTY MODULE",
                                    icon = Icons.Outlined.VerifiedUser,
                                    primaryActionLabel = "+ New AMC Contract"
                                )
                                "ai_assistant" -> com.example.ui.screens.modules.GenericModuleScreen(
                                    title = "Sunite GenAI Solar Assistant",
                                    subtitle = "AI-powered proposal generation, solar chat assistance & auto-categorization",
                                    category = "AI MODULE",
                                    icon = Icons.Outlined.AutoAwesome,
                                    primaryActionLabel = "+ Launch AI Session"
                                )
                                "search" -> GlobalSearchScreen(
                                    repository = repository,
                                    onNavigate = { currentRoute = it }
                                )
                                "files" -> FileManagementScreen(repository = repository)
                                "org" -> OrgScreen(repository = repository)
                                "users" -> UsersScreen(repository = repository)
                                "roles" -> RolesScreen(repository = repository)
                                "masterdata" -> MasterDataScreen(repository = repository)
                                "settings" -> SettingsScreen(repository = repository)
                                "notifications" -> NotificationsScreen(repository = repository)
                                "reports" -> ReportsScreen(repository = repository)
                                "profile" -> ProfileScreen()
                                else -> DashboardScreen(
                                    repository = repository,
                                    onNavigate = { currentRoute = it }
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
