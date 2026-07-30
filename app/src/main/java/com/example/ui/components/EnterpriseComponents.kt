package com.example.ui.components

import androidx.compose.animation.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.*

// Enterprise Metric Card Component
@Composable
fun EnterpriseMetricCard(
    title: String,
    value: String,
    subtitle: String = "",
    modifier: Modifier = Modifier,
    icon: ImageVector? = null,
    iconColor: Color = SuniteNavy
) {
    EnterpriseCard(modifier = modifier, padding = 12.dp) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.labelSmall.copy(
                        color = SuniteTextSecondary,
                        fontWeight = FontWeight.Medium
                    )
                )
                Text(
                    text = value,
                    style = MaterialTheme.typography.titleMedium.copy(
                        fontWeight = FontWeight.Bold,
                        color = SuniteNavy,
                        fontSize = 18.sp
                    ),
                    modifier = Modifier.padding(vertical = 2.dp)
                )
                if (subtitle.isNotEmpty()) {
                    Text(
                        text = subtitle,
                        style = MaterialTheme.typography.labelSmall.copy(
                            color = SuniteTextMuted,
                            fontSize = 10.sp
                        )
                    )
                }
            }

            if (icon != null) {
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = iconColor.copy(alpha = 0.1f),
                    modifier = Modifier.size(36.dp)
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Icon(
                            imageVector = icon,
                            contentDescription = null,
                            tint = iconColor,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                }
            }
        }
    }
}

// Enterprise Card Component
@Composable
fun EnterpriseCard(
    modifier: Modifier = Modifier,
    padding: Dp = 16.dp,
    elevation: Dp = 1.dp,
    borderColor: Color = SuniteBorder,
    backgroundColor: Color = SuniteSurface,
    content: @Composable ColumnScope.() -> Unit
) {
    Card(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = backgroundColor),
        border = BorderStroke(1.dp, borderColor),
        elevation = CardDefaults.cardElevation(defaultElevation = elevation)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(padding)
        ) {
            content()
        }
    }
}

// Enterprise Status Badge Component
@Composable
fun EnterpriseBadge(
    text: String,
    statusType: String = text,
    modifier: Modifier = Modifier
) {
    val (bgColor, textColor, borderColor) = when (statusType.uppercase()) {
        "ACTIVE", "SUCCESS", "APPROVED", "COMPLETED" -> Triple(SuniteSuccessBg, SuniteSuccess, Color(0xFFBBF7D0))
        "PENDING", "MAINTENANCE", "WARNING", "MFA REQUIRED" -> Triple(SuniteWarningBg, Color(0xFFD97706), Color(0xFFFDE68A))
        "DEACTIVATED", "SUSPENDED", "FAILED", "HIGH", "DANGER" -> Triple(SuniteDangerBg, SuniteDanger, Color(0xFFFECACA))
        "SUPER ADMIN", "ENTERPRISE PLATINUM PARTNER" -> Triple(Color(0xFFE0E8F6), SuniteNavy, Color(0xFFBFDBFE))
        else -> Triple(Color(0xFFF1F5F9), SuniteTextSecondary, SuniteBorder)
    }

    Surface(
        modifier = modifier.testTag("status_badge_${text.lowercase().replace(" ", "_")}"),
        shape = RoundedCornerShape(16.dp),
        color = bgColor,
        border = BorderStroke(1.dp, borderColor)
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(6.dp)
                    .clip(CircleShape)
                    .background(textColor)
            )
            Spacer(modifier = Modifier.width(6.dp))
            Text(
                text = text,
                style = MaterialTheme.typography.labelMedium.copy(
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 11.sp
                ),
                color = textColor
            )
        }
    }
}

// Enterprise Primary & Secondary Buttons
@Composable
fun EnterpriseButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    icon: ImageVector? = null,
    isPrimary: Boolean = true,
    isAccent: Boolean = false,
    isDanger: Boolean = false,
    enabled: Boolean = true,
    isLoading: Boolean = false,
    testTag: String = "enterprise_button_${text.lowercase().replace(" ", "_")}"
) {
    val containerColor = when {
        isDanger -> SuniteDanger
        isAccent -> SuniteOrange
        isPrimary -> SuniteNavy
        else -> Color.Transparent
    }
    val contentColor = if (!isPrimary && !isAccent && !isDanger) SuniteNavy else Color.White
    val border = if (!isPrimary && !isAccent && !isDanger) BorderStroke(1.dp, SuniteBorder) else null

    Button(
        onClick = onClick,
        modifier = modifier
            .defaultMinSize(minHeight = 44.dp)
            .testTag(testTag),
        enabled = enabled && !isLoading,
        shape = RoundedCornerShape(8.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = containerColor,
            contentColor = contentColor,
            disabledContainerColor = Color(0xFFE2E8F0),
            disabledContentColor = SuniteTextMuted
        ),
        border = border,
        contentPadding = PaddingValues(horizontal = 16.dp, vertical = 10.dp)
    ) {
        if (isLoading) {
            CircularProgressIndicator(
                modifier = Modifier.size(18.dp),
                color = contentColor,
                strokeWidth = 2.dp
            )
            Spacer(modifier = Modifier.width(8.dp))
        } else if (icon != null) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                modifier = Modifier.size(18.dp),
                tint = contentColor
            )
            Spacer(modifier = Modifier.width(8.dp))
        }
        Text(
            text = text,
            style = MaterialTheme.typography.labelLarge.copy(
                fontWeight = FontWeight.SemiBold,
                fontSize = 13.sp
            )
        )
    }
}

// Enterprise Input Field
@Composable
fun EnterpriseTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    placeholder: String = "",
    modifier: Modifier = Modifier,
    leadingIcon: ImageVector? = null,
    trailingIcon: ImageVector? = null,
    onTrailingIconClick: (() -> Unit)? = null,
    isPassword: Boolean = false,
    keyboardType: KeyboardType = KeyboardType.Text,
    isError: Boolean = false,
    errorMessage: String? = null,
    helperText: String? = null,
    enabled: Boolean = true,
    testTag: String = "input_${label.lowercase().replace(" ", "_")}"
) {
    var passwordVisible by remember { mutableStateOf(!isPassword) }

    Column(modifier = modifier.fillMaxWidth()) {
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall.copy(
                fontWeight = FontWeight.SemiBold,
                color = SuniteTextPrimary
            ),
            modifier = Modifier.padding(bottom = 6.dp)
        )
        OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            modifier = Modifier
                .fillMaxWidth()
                .testTag(testTag),
            placeholder = {
                Text(
                    text = placeholder,
                    color = SuniteTextMuted,
                    fontSize = 13.sp
                )
            },
            leadingIcon = leadingIcon?.let {
                {
                    Icon(
                        imageVector = it,
                        contentDescription = null,
                        tint = SuniteTextSecondary,
                        modifier = Modifier.size(20.dp)
                    )
                }
            },
            trailingIcon = {
                if (isPassword) {
                    IconButton(onClick = { passwordVisible = !passwordVisible }) {
                        Icon(
                            imageVector = if (passwordVisible) Icons.Default.VisibilityOff else Icons.Default.Visibility,
                            contentDescription = "Toggle Password Visibility",
                            tint = SuniteTextSecondary,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                } else if (trailingIcon != null && onTrailingIconClick != null) {
                    IconButton(onClick = onTrailingIconClick) {
                        Icon(
                            imageVector = trailingIcon,
                            contentDescription = null,
                            tint = SuniteTextSecondary,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                }
            },
            visualTransformation = if (isPassword && !passwordVisible) PasswordVisualTransformation() else VisualTransformation.None,
            keyboardOptions = KeyboardOptions(keyboardType = keyboardType),
            singleLine = true,
            enabled = enabled,
            isError = isError,
            shape = RoundedCornerShape(8.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedContainerColor = SuniteSurface,
                unfocusedContainerColor = SuniteSurface,
                disabledContainerColor = Color(0xFFF1F5F9),
                focusedBorderColor = SuniteNavy,
                unfocusedBorderColor = SuniteBorder,
                errorBorderColor = SuniteDanger
            )
        )
        if (isError && errorMessage != null) {
            Text(
                text = errorMessage,
                color = SuniteDanger,
                style = MaterialTheme.typography.labelSmall,
                modifier = Modifier.padding(top = 4.dp, start = 4.dp)
            )
        } else if (helperText != null) {
            Text(
                text = helperText,
                color = SuniteTextSecondary,
                style = MaterialTheme.typography.labelSmall,
                modifier = Modifier.padding(top = 4.dp, start = 4.dp)
            )
        }
    }
}

// Enterprise Dropdown Menu Component
@Composable
fun EnterpriseDropdown(
    label: String,
    options: List<String>,
    selectedOption: String,
    onOptionSelected: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }

    Column(modifier = modifier.fillMaxWidth()) {
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall.copy(
                fontWeight = FontWeight.SemiBold,
                color = SuniteTextPrimary
            ),
            modifier = Modifier.padding(bottom = 6.dp)
        )
        Box(modifier = Modifier.fillMaxWidth()) {
            OutlinedButton(
                onClick = { expanded = true },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                shape = RoundedCornerShape(8.dp),
                border = BorderStroke(1.dp, SuniteBorder),
                colors = ButtonDefaults.outlinedButtonColors(containerColor = SuniteSurface)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = selectedOption.ifEmpty { "Select $label" },
                        style = MaterialTheme.typography.bodyMedium.copy(
                            color = if (selectedOption.isEmpty()) SuniteTextMuted else SuniteTextPrimary,
                            fontSize = 13.sp
                        )
                    )
                    Icon(
                        imageVector = Icons.Default.ArrowDropDown,
                        contentDescription = "Dropdown Options",
                        tint = SuniteTextSecondary
                    )
                }
            }
            DropdownMenu(
                expanded = expanded,
                onDismissRequest = { expanded = false },
                modifier = Modifier
                    .fillMaxWidth(0.9f)
                    .background(SuniteSurface)
            ) {
                options.forEach { option ->
                    DropdownMenuItem(
                        text = {
                            Text(
                                text = option,
                                style = MaterialTheme.typography.bodyMedium.copy(
                                    fontWeight = if (option == selectedOption) FontWeight.Bold else FontWeight.Normal,
                                    color = if (option == selectedOption) SuniteNavy else SuniteTextPrimary
                                )
                            )
                        },
                        onClick = {
                            onOptionSelected(option)
                            expanded = false
                        }
                    )
                }
            }
        }
    }
}

// Enterprise Modal / Dialog Wrapper
@Composable
fun EnterpriseModal(
    title: String,
    subtitle: String = "",
    onDismissRequest: () -> Unit,
    confirmText: String = "Save",
    onConfirm: () -> Unit,
    confirmEnabled: Boolean = true,
    content: @Composable ColumnScope.() -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismissRequest,
        shape = RoundedCornerShape(12.dp),
        containerColor = SuniteSurface,
        title = {
            Column {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = title,
                        style = MaterialTheme.typography.titleMedium.copy(
                            fontWeight = FontWeight.Bold,
                            color = SuniteNavy
                        )
                    )
                    IconButton(onClick = onDismissRequest) {
                        Icon(
                            imageVector = Icons.Default.Close,
                            contentDescription = "Close Modal",
                            tint = SuniteTextSecondary
                        )
                    }
                }
                if (subtitle.isNotEmpty()) {
                    Text(
                        text = subtitle,
                        style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                    )
                }
                Divider(
                    modifier = Modifier.padding(top = 12.dp),
                    color = SuniteBorder
                )
            }
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp)
            ) {
                content()
            }
        },
        confirmButton = {
            EnterpriseButton(
                text = confirmText,
                onClick = onConfirm,
                enabled = confirmEnabled,
                isPrimary = true
            )
        },
        dismissButton = {
            EnterpriseButton(
                text = "Cancel",
                onClick = onDismissRequest,
                isPrimary = false
            )
        }
    )
}

// Enterprise Header Bar
@Composable
fun EnterpriseHeader(
    currentTitle: String,
    subtitle: String = "Unite Solar Partner Network",
    onMenuClick: () -> Unit,
    unreadNotificationCount: Int = 2,
    onNotificationClick: () -> Unit,
    onProfileClick: () -> Unit,
    selectedRole: String,
    onRoleChange: (String) -> Unit
) {
    var roleDropdownExpanded by remember { mutableStateOf(false) }

    val brdRoles = listOf(
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

    Surface(
        modifier = Modifier.fillMaxWidth(),
        color = SuniteNavy,
        tonalElevation = 4.dp
    ) {
        Column {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .statusBarsPadding()
                    .padding(horizontal = 12.dp, vertical = 10.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    IconButton(
                        onClick = onMenuClick,
                        modifier = Modifier.testTag("btn_sidebar_toggle")
                    ) {
                        Icon(
                            imageVector = Icons.Default.Menu,
                            contentDescription = "Toggle Sidebar",
                            tint = Color.White
                        )
                    }
                    Spacer(modifier = Modifier.width(4.dp))
                    Column {
                        // Corporate Brand: sun⚡te
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = "sun",
                                style = MaterialTheme.typography.titleLarge.copy(
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White,
                                    fontSize = 20.sp,
                                    letterSpacing = (-0.5).sp
                                )
                            )
                            Icon(
                                imageVector = Icons.Default.Bolt,
                                contentDescription = null,
                                tint = SuniteOrange,
                                modifier = Modifier
                                    .size(20.dp)
                                    .padding(horizontal = 0.dp)
                            )
                            Text(
                                text = "te",
                                style = MaterialTheme.typography.titleLarge.copy(
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White,
                                    fontSize = 20.sp,
                                    letterSpacing = (-0.5).sp
                                )
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Surface(
                                shape = RoundedCornerShape(4.dp),
                                color = SuniteOrange.copy(alpha = 0.2f),
                                border = BorderStroke(1.dp, SuniteOrange.copy(alpha = 0.6f))
                            ) {
                                Text(
                                    text = "ENTERPRISE",
                                    color = SuniteOrangeLight,
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(horizontal = 4.dp, vertical = 1.dp)
                                )
                            }
                        }
                        Text(
                            text = currentTitle,
                            style = MaterialTheme.typography.labelMedium.copy(
                                color = Color(0xFFCBD5E1),
                                fontWeight = FontWeight.SemiBold
                            ),
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                    }
                }

                Row(verticalAlignment = Alignment.CenterVertically) {
                    // Role Switcher Dropdown Chip
                    Box {
                        Surface(
                            modifier = Modifier
                                .clickable { roleDropdownExpanded = true }
                                .padding(end = 6.dp),
                            shape = RoundedCornerShape(16.dp),
                            color = Color(0xFF1E428A),
                            border = BorderStroke(1.dp, Color(0xFF3B82F6))
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Shield,
                                    contentDescription = null,
                                    tint = SuniteOrange,
                                    modifier = Modifier.size(14.dp)
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    text = selectedRole,
                                    color = Color.White,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Icon(
                                    imageVector = Icons.Default.ArrowDropDown,
                                    contentDescription = null,
                                    tint = Color.White,
                                    modifier = Modifier.size(16.dp)
                                )
                            }
                        }
                        DropdownMenu(
                            expanded = roleDropdownExpanded,
                            onDismissRequest = { roleDropdownExpanded = false }
                        ) {
                            brdRoles.forEach { role ->
                                DropdownMenuItem(
                                    text = { Text(role, fontSize = 12.sp) },
                                    onClick = {
                                        onRoleChange(role)
                                        roleDropdownExpanded = false
                                    }
                                )
                            }
                        }
                    }

                    // Notification Bell with Badge
                    IconButton(
                        onClick = onNotificationClick,
                        modifier = Modifier.testTag("btn_notification_center")
                    ) {
                        BadgedBox(
                            badge = {
                                if (unreadNotificationCount > 0) {
                                    Badge(
                                        containerColor = SuniteOrange,
                                        contentColor = Color.White
                                    ) {
                                        Text(text = unreadNotificationCount.toString())
                                    }
                                }
                            }
                        ) {
                            Icon(
                                imageVector = Icons.Default.Notifications,
                                contentDescription = "Notifications",
                                tint = Color.White
                            )
                        }
                    }

                    // User Profile Avatar
                    Box(
                        modifier = Modifier
                            .size(34.dp)
                            .clip(CircleShape)
                            .background(SuniteOrange)
                            .clickable(onClick = onProfileClick)
                            .testTag("btn_user_profile_avatar"),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "AV",
                            color = Color.White,
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp
                        )
                    }
                }
            }
        }
    }
}
