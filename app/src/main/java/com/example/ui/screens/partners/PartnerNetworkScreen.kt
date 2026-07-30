package com.example.ui.screens.partners

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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.SuniteRepository
import com.example.data.entity.PartnerEntity
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun PartnerNetworkScreen(repository: SuniteRepository) {
    val partners by repository.partners.collectAsState(initial = emptyList())
    var selectedPartnerTypeFilter by remember { mutableStateOf("ALL") }
    var selectedStatusFilter by remember { mutableStateOf("ALL") }
    var selectedPartnerForDetail by remember { mutableStateOf<PartnerEntity?>(null) }
    var showRegistrationWizard by remember { mutableStateOf(false) }
    var selectedPartnerTypeForRegistration by remember { mutableStateOf("Marketing Partner") }

    val coroutineScope = rememberCoroutineScope()

    val filteredPartners = partners.filter { partner ->
        val matchesType = if (selectedPartnerTypeFilter == "ALL") true else partner.partnerType.equals(selectedPartnerTypeFilter, ignoreCase = true)
        val matchesStatus = if (selectedStatusFilter == "ALL") true else partner.status.equals(selectedStatusFilter, ignoreCase = true)
        matchesType && matchesStatus
    }

    val partnerTypes = listOf("ALL", "Marketing Partner", "Franchise", "EPC Contractor", "Installation Vendor", "Survey Engineer", "Finance Team")
    val statusTypes = listOf("ALL", "Pending", "Document Verification", "Admin Review", "Approved", "Rejected")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
    ) {
        // Top Action Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Partner Network & Ecosystem",
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                )
                Text(
                    text = "Manage Marketing Partners, Franchises, EPC Contractors & Vendors",
                    style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                )
            }

            EnterpriseButton(
                text = "Register Partner",
                onClick = { showRegistrationWizard = true },
                isPrimary = true,
                icon = Icons.Default.AddBusiness
            )
        }

        // Summary KPI Metrics Banner
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 4.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            EnterpriseMetricCard(
                title = "Total Partners",
                value = "${partners.size}",
                subtitle = "Active Ecosystem",
                icon = Icons.Default.Handshake,
                modifier = Modifier.weight(1f)
            )
            EnterpriseMetricCard(
                title = "Approved",
                value = "${partners.count { it.status == "Approved" }}",
                subtitle = "Verified SLA Level",
                icon = Icons.Default.Verified,
                modifier = Modifier.weight(1f)
            )
            EnterpriseMetricCard(
                title = "Pending Approvals",
                value = "${partners.count { it.status != "Approved" }}",
                subtitle = "In Verification",
                icon = Icons.Default.PendingActions,
                modifier = Modifier.weight(1f)
            )
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Type Filter Scrollable Bar
        ScrollableTabRow(
            selectedTabIndex = partnerTypes.indexOf(selectedPartnerTypeFilter).coerceAtLeast(0),
            containerColor = SuniteSurface,
            contentColor = SuniteNavy,
            edgePadding = 16.dp,
            divider = { Divider(color = SuniteBorder) }
        ) {
            partnerTypes.forEach { type ->
                Tab(
                    selected = selectedPartnerTypeFilter == type,
                    onClick = { selectedPartnerTypeFilter = type },
                    text = {
                        Text(
                            text = type,
                            fontSize = 12.sp,
                            fontWeight = if (selectedPartnerTypeFilter == type) FontWeight.Bold else FontWeight.Normal
                        )
                    }
                )
            }
        }

        // Partner Directory Cards List
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(filteredPartners, key = { it.id }) { partner ->
                EnterpriseCard {
                    Column {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Surface(
                                    modifier = Modifier.size(40.dp),
                                    shape = RoundedCornerShape(8.dp),
                                    color = SuniteNavy.copy(alpha = 0.1f)
                                ) {
                                    Box(contentAlignment = Alignment.Center) {
                                        Icon(
                                            imageVector = when (partner.partnerType) {
                                                "Marketing Partner" -> Icons.Default.Campaign
                                                "Franchise" -> Icons.Default.Store
                                                "EPC Contractor" -> Icons.Default.Engineering
                                                "Installation Vendor" -> Icons.Default.Build
                                                "Survey Engineer" -> Icons.Default.Rule
                                                else -> Icons.Default.AccountBalance
                                            },
                                            contentDescription = null,
                                            tint = SuniteNavy
                                        )
                                    }
                                }

                                Spacer(modifier = Modifier.width(12.dp))

                                Column {
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Text(
                                            text = partner.companyName,
                                            style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                                        )
                                        Spacer(modifier = Modifier.width(8.dp))
                                        EnterpriseBadge(text = partner.partnerType)
                                    }

                                    Text(
                                        text = "${partner.contactPerson} • ${partner.email} • ${partner.city}, ${partner.state}",
                                        style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary),
                                        modifier = Modifier.padding(top = 2.dp)
                                    )
                                }
                            }

                            EnterpriseBadge(
                                text = partner.status,
                                statusType = if (partner.status == "Approved") "APPROVED" else "PENDING"
                            )
                        }

                        Divider(color = SuniteBorder, modifier = Modifier.padding(vertical = 10.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                                Column {
                                    Text(text = "Commissions", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextMuted))
                                    Text(text = "$${partner.commissionEarned}", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                                }
                                Column {
                                    Text(text = "Customers", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextMuted))
                                    Text(text = "${partner.activeCustomers}", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                                }
                                Column {
                                    Text(text = "GSTIN", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextMuted))
                                    Text(text = partner.gstNumber, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                                }
                            }

                            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                // Approval Status Transition Quick Actions
                                if (partner.status != "Approved") {
                                    EnterpriseButton(
                                        text = "Verify & Approve",
                                        onClick = {
                                            coroutineScope.launch {
                                                repository.updatePartnerStatus(partner.id, "Approved")
                                            }
                                        },
                                        isPrimary = true
                                    )
                                }

                                EnterpriseButton(
                                    text = "360° Portal",
                                    onClick = { selectedPartnerForDetail = partner },
                                    isPrimary = false
                                )
                            }
                        }
                    }
                }
            }
        }
    }

    // Modal: 5-Step Partner Registration Wizard
    if (showRegistrationWizard) {
        PartnerRegistrationWizardModal(
            initialType = selectedPartnerTypeForRegistration,
            onDismiss = { showRegistrationWizard = false },
            onSubmit = { newPartner ->
                coroutineScope.launch {
                    repository.addPartner(newPartner)
                    showRegistrationWizard = false
                }
            }
        )
    }

    // Modal: Partner 360° Detail View & Verification Workflow
    selectedPartnerForDetail?.let { partner ->
        EnterpriseModal(
            title = "Partner 360° Ecosystem Portal",
            subtitle = "${partner.companyName} (${partner.partnerType})",
            onDismissRequest = { selectedPartnerForDetail = null },
            confirmText = "Close Dashboard",
            onConfirm = { selectedPartnerForDetail = null }
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                // Profile Completion Progress Bar
                Column {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "Profile Completion & Compliance Index", style = MaterialTheme.typography.labelSmall.copy(color = SuniteNavy, fontWeight = FontWeight.Bold))
                        Text(text = if (partner.status == "Approved") "100%" else "75%", style = MaterialTheme.typography.labelSmall.copy(color = SuniteOrange, fontWeight = FontWeight.Bold))
                    }
                    LinearProgressIndicator(
                        progress = if (partner.status == "Approved") 1.0f else 0.75f,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 4.dp),
                        color = SuniteOrange,
                        trackColor = SuniteBorder
                    )
                }

                Divider(color = SuniteBorder)

                // Workflow Stepper
                Text(text = "KYC & Governance Approval Workflow", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    val steps = listOf("Pending", "Document Verification", "Admin Review", "Approved")
                    steps.forEach { step ->
                        val isDone = steps.indexOf(step) <= steps.indexOf(partner.status).let { if (it == -1) 3 else it }
                        Text(
                            text = if (isDone) "✓ $step" else "○ $step",
                            fontSize = 10.sp,
                            fontWeight = if (isDone) FontWeight.Bold else FontWeight.Normal,
                            color = if (isDone) SuniteSuccess else SuniteTextMuted
                        )
                    }
                }

                Divider(color = SuniteBorder)

                // Key Info
                Text(text = "Business & Bank Governance", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(text = "GSTIN Number", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    Text(text = partner.gstNumber, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(text = "PAN Number", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    Text(text = partner.panNumber, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(text = "Bank Escrow Account", style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary))
                    Text(text = "${partner.bankName} (${partner.accountNumber})", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                }

                Divider(color = SuniteBorder)

                // Document Vault Summary
                Text(text = "Verified KYC Document Vault", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    EnterpriseBadge(text = "✓ Aadhaar Verified")
                    EnterpriseBadge(text = "✓ PAN Verified")
                    EnterpriseBadge(text = "✓ GST Cert")
                    EnterpriseBadge(text = "✓ Digital Signature")
                }
            }
        }
    }
}

@Composable
fun PartnerRegistrationWizardModal(
    initialType: String,
    onDismiss: () -> Unit,
    onSubmit: (PartnerEntity) -> Unit
) {
    var step by remember { mutableStateOf(1) }

    // Step 1: Basic
    var partnerType by remember { mutableStateOf(initialType) }
    var companyName by remember { mutableStateOf("") }
    var contactPerson by remember { mutableStateOf("") }
    var mobile by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var address by remember { mutableStateOf("") }
    var state by remember { mutableStateOf("Texas") }
    var district by remember { mutableStateOf("Travis") }
    var city by remember { mutableStateOf("Austin") }

    // Step 2: Business
    var gstNumber by remember { mutableStateOf("27AAACS9901F1Z2") }
    var panNumber by remember { mutableStateOf("ABCDE1234F") }
    var cin by remember { mutableStateOf("U72200TX2024PTC109283") }
    var msme by remember { mutableStateOf("UDYAM-TX-00-10293") }

    // Step 3: Bank
    var bankName by remember { mutableStateOf("JPMorgan Chase Enterprise") }
    var accountName by remember { mutableStateOf("") }
    var accountNumber by remember { mutableStateOf("") }
    var ifscCode by remember { mutableStateOf("CHASUS33") }

    // Step 4: Documents & Agreement
    var agreementAccepted by remember { mutableStateOf(false) }

    EnterpriseModal(
        title = "Partner Onboarding Wizard (Step $step of 5)",
        subtitle = "Category: $partnerType Registration",
        onDismissRequest = onDismiss,
        confirmText = if (step == 5) "Submit for Approval" else "Next Step →",
        confirmEnabled = when (step) {
            1 -> companyName.isNotEmpty() && contactPerson.isNotEmpty() && email.isNotEmpty()
            2 -> gstNumber.isNotEmpty() && panNumber.isNotEmpty()
            3 -> accountNumber.isNotEmpty()
            4 -> agreementAccepted
            else -> true
        },
        onConfirm = {
            if (step < 5) {
                step++
            } else {
                onSubmit(
                    PartnerEntity(
                        id = "prt_" + System.currentTimeMillis(),
                        partnerType = partnerType,
                        companyName = companyName,
                        contactPerson = contactPerson,
                        mobile = mobile,
                        email = email,
                        address = address,
                        state = state,
                        district = district,
                        city = city,
                        gstNumber = gstNumber,
                        panNumber = panNumber,
                        cin = cin,
                        msme = msme,
                        bankName = bankName,
                        accountName = if (accountName.isEmpty()) companyName else accountName,
                        accountNumber = accountNumber,
                        ifscCode = ifscCode,
                        agreementSigned = agreementAccepted,
                        status = "Pending",
                        registeredAt = "Just now"
                    )
                )
            }
        }
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            // Stepper Visual
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                listOf("Basic", "Business", "Bank", "Docs", "Finish").forEachIndexed { index, name ->
                    val num = index + 1
                    Text(
                        text = if (num <= step) "● $name" else "○ $name",
                        fontSize = 11.sp,
                        fontWeight = if (num == step) FontWeight.Bold else FontWeight.Normal,
                        color = if (num <= step) SuniteNavy else SuniteTextMuted
                    )
                }
            }

            Divider(color = SuniteBorder)

            when (step) {
                1 -> {
                    EnterpriseDropdown(
                        label = "Partner Registration Role Type",
                        options = listOf("Marketing Partner", "Franchise", "EPC Contractor", "Installation Vendor", "Survey Engineer", "Finance Team"),
                        selectedOption = partnerType,
                        onOptionSelected = { partnerType = it }
                    )
                    EnterpriseTextField(value = companyName, onValueChange = { companyName = it }, label = "Company / Agency Name", placeholder = "e.g. Apex Solar Solutions LLC")
                    EnterpriseTextField(value = contactPerson, onValueChange = { contactPerson = it }, label = "Contact Person Name")
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = mobile, onValueChange = { mobile = it }, label = "Mobile Number") }
                        Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = email, onValueChange = { email = it }, label = "Corporate Email") }
                    }
                    EnterpriseTextField(value = address, onValueChange = { address = it }, label = "Registered Office Address")
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = city, onValueChange = { city = it }, label = "City") }
                        Box(modifier = Modifier.weight(1f)) { EnterpriseTextField(value = state, onValueChange = { state = it }, label = "State") }
                    }
                }
                2 -> {
                    EnterpriseTextField(value = gstNumber, onValueChange = { gstNumber = it }, label = "GSTIN Registration Number")
                    EnterpriseTextField(value = panNumber, onValueChange = { panNumber = it }, label = "PAN Identification Number")
                    EnterpriseTextField(value = cin, onValueChange = { cin = it }, label = "CIN (Corporate Identification No - Optional)")
                    EnterpriseTextField(value = msme, onValueChange = { msme = it }, label = "MSME / Udyam Certificate No")
                }
                3 -> {
                    EnterpriseTextField(value = bankName, onValueChange = { bankName = it }, label = "Bank Name")
                    EnterpriseTextField(value = accountName, onValueChange = { accountName = it }, label = "Account Holder Name")
                    EnterpriseTextField(value = accountNumber, onValueChange = { accountNumber = it }, label = "Bank Account Number")
                    EnterpriseTextField(value = ifscCode, onValueChange = { ifscCode = it }, label = "IFSC / SWIFT Branch Code")
                }
                4 -> {
                    Text(text = "Upload Statutory Documents (Simulated Instant Verification)", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        EnterpriseBadge(text = "✓ Aadhaar Card")
                        EnterpriseBadge(text = "✓ PAN Card")
                        EnterpriseBadge(text = "✓ GST Cert")
                        EnterpriseBadge(text = "✓ Cancelled Cheque")
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Checkbox(checked = agreementAccepted, onCheckedChange = { agreementAccepted = it })
                        Text(text = "I accept Sunite Solar Partner Network Master SLA & Digital Contract", style = MaterialTheme.typography.bodySmall.copy(color = SuniteNavy))
                    }
                }
                5 -> {
                    Surface(
                        modifier = Modifier.fillMaxWidth(),
                        color = SuniteSuccessBg,
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Text(text = "Ready for Submission!", fontWeight = FontWeight.Bold, color = SuniteSuccess)
                            Text(text = "Your application for $partnerType will be submitted to Super Admin & Compliance team for verification.", style = MaterialTheme.typography.bodySmall, color = SuniteNavy)
                        }
                    }
                }
            }
        }
    }
}
