package com.example.ui.screens.notifications

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
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
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.SuniteRepository
import com.example.data.entity.NotificationEntity
import com.example.data.entity.TemplateEntity
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun NotificationsScreen(repository: SuniteRepository) {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("In-App Feed", "Push Notifications", "Email Templates", "SMS Templates", "WhatsApp Templates")

    val notifications by repository.notifications.collectAsState(initial = emptyList())
    val templates by repository.templates.collectAsState(initial = emptyList())
    val coroutineScope = rememberCoroutineScope()

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

        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            when (selectedTab) {
                0 -> NotificationCenterTab(
                    notifications = notifications,
                    onMarkRead = { id -> coroutineScope.launch { repository.markNotificationAsRead(id) } },
                    onMarkAllRead = { coroutineScope.launch { repository.markAllNotificationsAsRead() } }
                )
                1 -> PushNotificationsTab()
                2 -> TemplatesTab(
                    type = "EMAIL",
                    templates = templates.filter { it.type == "EMAIL" },
                    onUpdate = { tpl -> coroutineScope.launch { repository.updateTemplate(tpl) } }
                )
                3 -> TemplatesTab(
                    type = "SMS",
                    templates = templates.filter { it.type == "SMS" },
                    onUpdate = { tpl -> coroutineScope.launch { repository.updateTemplate(tpl) } }
                )
                4 -> TemplatesTab(
                    type = "WHATSAPP",
                    templates = templates.filter { it.type == "WHATSAPP" },
                    onUpdate = { tpl -> coroutineScope.launch { repository.updateTemplate(tpl) } }
                )
            }
        }
    }
}

@Composable
fun NotificationCenterTab(
    notifications: List<NotificationEntity>,
    onMarkRead: (String) -> Unit,
    onMarkAllRead: () -> Unit
) {
    Column(modifier = Modifier.fillMaxSize()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "In-App Notification Feed (${notifications.count { !it.read }} Unread)",
                style = MaterialTheme.typography.titleMedium.copy(
                    fontWeight = FontWeight.Bold,
                    color = SuniteNavy
                )
            )
            TextButton(onClick = onMarkAllRead) {
                Text("Mark All Read", fontWeight = FontWeight.Bold, color = SuniteNavy)
            }
        }

        LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            items(notifications, key = { it.id }) { notif ->
                EnterpriseCard(
                    padding = 12.dp,
                    backgroundColor = if (notif.read) SuniteSurface else Color(0xFFF0F4FA)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.Top
                    ) {
                        Row(modifier = Modifier.weight(1f)) {
                            Box(
                                modifier = Modifier
                                    .size(36.dp)
                                    .clip(CircleShape)
                                    .background(if (notif.urgency == "HIGH") SuniteDangerBg else Color(0xFFE0E8F6)),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = if (notif.urgency == "HIGH") Icons.Default.PriorityHigh else Icons.Default.Notifications,
                                    contentDescription = null,
                                    tint = if (notif.urgency == "HIGH") SuniteDanger else SuniteNavy,
                                    modifier = Modifier.size(18.dp)
                                )
                            }

                            Spacer(modifier = Modifier.width(12.dp))

                            Column {
                                Text(
                                    text = notif.title,
                                    style = MaterialTheme.typography.titleSmall.copy(
                                        fontWeight = FontWeight.Bold,
                                        color = SuniteNavy
                                    )
                                )
                                Text(
                                    text = notif.message,
                                    style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextPrimary),
                                    modifier = Modifier.padding(top = 2.dp)
                                )
                                Text(
                                    text = "${notif.category} • ${notif.timestamp}",
                                    style = MaterialTheme.typography.labelSmall.copy(
                                        color = SuniteTextSecondary,
                                        fontSize = 10.sp
                                    ),
                                    modifier = Modifier.padding(top = 4.dp)
                                )
                            }
                        }

                        if (!notif.read) {
                            IconButton(onClick = { onMarkRead(notif.id) }) {
                                Icon(
                                    imageVector = Icons.Default.Check,
                                    contentDescription = "Mark Read",
                                    tint = SuniteSuccess,
                                    modifier = Modifier.size(20.dp)
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun TemplatesTab(
    type: String,
    templates: List<TemplateEntity>,
    onUpdate: (TemplateEntity) -> Unit
) {
    var editingTemplate by remember { mutableStateOf<TemplateEntity?>(null) }

    Column(modifier = Modifier.fillMaxSize()) {
        Text(
            text = "$type Dispatch Templates (${templates.size})",
            style = MaterialTheme.typography.titleMedium.copy(
                fontWeight = FontWeight.Bold,
                color = SuniteNavy
            ),
            modifier = Modifier.padding(bottom = 12.dp)
        )

        LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            items(templates, key = { it.id }) { tpl ->
                EnterpriseCard(padding = 12.dp) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.Top
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = tpl.title,
                                    style = MaterialTheme.typography.titleSmall.copy(
                                        fontWeight = FontWeight.Bold,
                                        color = SuniteNavy
                                    )
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                EnterpriseBadge(text = tpl.code)
                            }
                            if (tpl.subject.isNotEmpty()) {
                                Text(
                                    text = "Subject: ${tpl.subject}",
                                    style = MaterialTheme.typography.bodySmall.copy(
                                        fontWeight = FontWeight.SemiBold,
                                        color = SuniteTextPrimary
                                    ),
                                    modifier = Modifier.padding(top = 4.dp)
                                )
                            }
                            Text(
                                text = tpl.body,
                                style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary),
                                modifier = Modifier.padding(top = 4.dp)
                            )
                            Text(
                                text = "Variables: ${tpl.variables}",
                                style = MaterialTheme.typography.labelSmall.copy(
                                    color = SuniteOrange,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 10.sp
                                ),
                                modifier = Modifier.padding(top = 6.dp)
                            )
                        }

                        IconButton(onClick = { editingTemplate = tpl }) {
                            Icon(
                                imageVector = Icons.Default.Edit,
                                contentDescription = "Edit Template",
                                tint = SuniteNavy,
                                modifier = Modifier.size(20.dp)
                            )
                        }
                    }
                }
            }
        }
    }

    editingTemplate?.let { tpl ->
        var subject by remember { mutableStateOf(tpl.subject) }
        var body by remember { mutableStateOf(tpl.body) }

        EnterpriseModal(
            title = "Edit Template: ${tpl.code}",
            onDismissRequest = { editingTemplate = null },
            onConfirm = {
                onUpdate(
                    tpl.copy(
                        subject = subject,
                        body = body
                    )
                )
                editingTemplate = null
            }
        ) {
            if (type == "EMAIL") {
                EnterpriseTextField(
                    value = subject,
                    onValueChange = { subject = it },
                    label = "Subject Line"
                )
                Spacer(modifier = Modifier.height(10.dp))
            }
            EnterpriseTextField(
                value = body,
                onValueChange = { body = it },
                label = "Template Body Text",
                helperText = "Available variables: ${tpl.variables}"
            )
        }
    }
}

@Composable
fun PushNotificationsTab() {
    var title by remember { mutableStateOf("") }
    var body by remember { mutableStateOf("") }
    var targetRole by remember { mutableStateOf("All Roles") }
    var sent by remember { mutableStateOf(false) }

    EnterpriseCard {
        Text(
            text = "Broadcast Mobile & Web Push Notification",
            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
        )
        Spacer(modifier = Modifier.height(16.dp))

        EnterpriseTextField(
            value = title,
            onValueChange = { title = it },
            label = "Notification Title",
            placeholder = "e.g. Mandatory System Maintenance / Policy Update"
        )
        Spacer(modifier = Modifier.height(12.dp))

        EnterpriseTextField(
            value = body,
            onValueChange = { body = it },
            label = "Push Payload Message",
            placeholder = "Enter message body..."
        )
        Spacer(modifier = Modifier.height(12.dp))

        EnterpriseDropdown(
            label = "Target Audience Segment",
            options = listOf("All Roles", "Super Admin", "Sales Admin", "EPC Contractor", "Installation Vendor", "Survey Engineer", "Customer"),
            selectedOption = targetRole,
            onOptionSelected = { targetRole = it }
        )

        Spacer(modifier = Modifier.height(20.dp))

        if (sent) {
            Surface(
                modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp),
                color = SuniteSuccessBg,
                shape = androidx.compose.foundation.shape.RoundedCornerShape(8.dp)
            ) {
                Text(
                    text = "Push notification dispatched to FCM & APNS subscribers.",
                    color = SuniteSuccess,
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(10.dp)
                )
            }
        }

        EnterpriseButton(
            text = "Send Instant Push Broadcast",
            onClick = { sent = true },
            isPrimary = true,
            modifier = Modifier.fillMaxWidth()
        )
    }
}
