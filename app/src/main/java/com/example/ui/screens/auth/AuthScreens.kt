package com.example.ui.screens.auth

import androidx.compose.animation.*
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.R
import com.example.auth.AuthManager
import com.example.auth.AuthScreenState
import com.example.ui.components.*
import com.example.ui.theme.*

// Splash Screen
@Composable
fun SplashScreen(onFinishSplash: () -> Unit) {
    LaunchedEffect(Unit) {
        kotlinx.coroutines.delay(1800)
        onFinishSplash()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteNavy),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.padding(24.dp)
        ) {
            Surface(
                modifier = Modifier
                    .size(90.dp)
                    .clip(RoundedCornerShape(20.dp)),
                color = Color.White
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Image(
                        painter = painterResource(id = R.drawable.sunite_logo_1785428146872),
                        contentDescription = "Sunite Logo",
                        modifier = Modifier.size(70.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(20.dp))

            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    text = "sun",
                    style = MaterialTheme.typography.headlineLarge.copy(
                        fontWeight = FontWeight.Bold,
                        color = Color.White,
                        fontSize = 38.sp,
                        letterSpacing = (-1).sp
                    )
                )
                Icon(
                    imageVector = Icons.Default.Bolt,
                    contentDescription = null,
                    tint = SuniteOrange,
                    modifier = Modifier.size(38.dp)
                )
                Text(
                    text = "te",
                    style = MaterialTheme.typography.headlineLarge.copy(
                        fontWeight = FontWeight.Bold,
                        color = Color.White,
                        fontSize = 38.sp,
                        letterSpacing = (-1).sp
                    )
                )
            }

            Text(
                text = "SUNITE ENTERPRISE",
                style = MaterialTheme.typography.labelMedium.copy(
                    color = SuniteOrange,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.sp
                ),
                modifier = Modifier.padding(top = 4.dp)
            )

            Text(
                text = "Unite Solar Partner Network",
                style = MaterialTheme.typography.bodySmall.copy(
                    color = Color(0xFF94A3B8)
                ),
                modifier = Modifier.padding(top = 2.dp)
            )

            Spacer(modifier = Modifier.height(40.dp))

            LinearProgressIndicator(
                modifier = Modifier
                    .width(160.dp)
                    .height(4.dp)
                    .clip(RoundedCornerShape(2.dp)),
                color = SuniteOrange,
                trackColor = Color(0xFF1E3A8A)
            )

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = "Initializing Enterprise Security & DB Engine...",
                style = MaterialTheme.typography.labelSmall.copy(color = Color(0xFFCBD5E1))
            )
        }
    }
}

// Login Screen
@Composable
fun LoginScreen() {
    val authState by AuthManager.authState.collectAsState()
    var email by remember { mutableStateOf("admin@sunite.io") }
    var password by remember { mutableStateOf("Enterprise123!") }
    var rememberMe by remember { mutableStateOf(true) }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp)
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Header Logo
            Surface(
                modifier = Modifier
                    .size(64.dp)
                    .clip(RoundedCornerShape(16.dp)),
                color = SuniteNavy
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Icon(
                        imageVector = Icons.Default.Bolt,
                        contentDescription = null,
                        tint = SuniteOrange,
                        modifier = Modifier.size(36.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = "Sunite Enterprise Portal",
                style = MaterialTheme.typography.headlineSmall.copy(
                    fontWeight = FontWeight.Bold,
                    color = SuniteNavy
                )
            )
            Text(
                text = "Unite Solar Partner Network",
                style = MaterialTheme.typography.bodySmall.copy(
                    color = SuniteOrange,
                    fontWeight = FontWeight.Bold
                ),
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 2.dp)
            )

            Spacer(modifier = Modifier.height(24.dp))

            EnterpriseCard(padding = 20.dp) {
                if (authState.errorMessage != null) {
                    Surface(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(bottom = 16.dp),
                        color = SuniteDangerBg,
                        shape = RoundedCornerShape(8.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFFECACA))
                    ) {
                        Text(
                            text = authState.errorMessage ?: "",
                            color = SuniteDanger,
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.padding(12.dp)
                        )
                    }
                }

                EnterpriseTextField(
                    value = email,
                    onValueChange = { email = it },
                    label = "Corporate Email Address",
                    placeholder = "name@company.com",
                    leadingIcon = Icons.Outlined.Email,
                    keyboardType = KeyboardType.Email
                )

                Spacer(modifier = Modifier.height(16.dp))

                EnterpriseTextField(
                    value = password,
                    onValueChange = { password = it },
                    label = "Password",
                    placeholder = "••••••••••••",
                    leadingIcon = Icons.Outlined.Lock,
                    isPassword = true
                )

                Spacer(modifier = Modifier.height(12.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Checkbox(
                            checked = rememberMe,
                            onCheckedChange = { rememberMe = it },
                            colors = CheckboxDefaults.colors(checkedColor = SuniteNavy)
                        )
                        Text(
                            text = "Remember Session",
                            style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextPrimary)
                        )
                    }

                    TextButton(onClick = { AuthManager.navigateTo(AuthScreenState.ForgotPassword) }) {
                        Text(
                            text = "Forgot Password?",
                            style = MaterialTheme.typography.bodySmall.copy(
                                fontWeight = FontWeight.Bold,
                                color = SuniteNavy
                            )
                        )
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                EnterpriseButton(
                    text = "Sign In with Credentials",
                    onClick = { AuthManager.loginWithPassword(email, password) },
                    modifier = Modifier.fillMaxWidth(),
                    icon = Icons.Default.Login,
                    isPrimary = true
                )

                Spacer(modifier = Modifier.height(12.dp))

                OutlinedButton(
                    onClick = { AuthManager.navigateTo(AuthScreenState.OtpLogin) },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(44.dp),
                    shape = RoundedCornerShape(8.dp),
                    border = androidx.compose.foundation.BorderStroke(1.dp, SuniteBorder)
                ) {
                    Icon(
                        imageVector = Icons.Outlined.Sms,
                        contentDescription = null,
                        tint = SuniteNavy,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Sign In with OTP / SMS",
                        color = SuniteNavy,
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            Text(
                text = "Protected by Sunite Enterprise Multi-Factor Authentication & Audit Vault v2.4",
                style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextMuted),
                textAlign = TextAlign.Center
            )
        }
    }
}

// MFA Verification Screen
@Composable
fun MfaScreen() {
    val authState by AuthManager.authState.collectAsState()
    var code by remember { mutableStateOf("123456") }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Surface(
                modifier = Modifier
                    .size(60.dp)
                    .clip(CircleShape),
                color = Color(0xFFE0E8F6)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Icon(
                        imageVector = Icons.Default.Security,
                        contentDescription = null,
                        tint = SuniteNavy,
                        modifier = Modifier.size(30.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = "Two-Factor Verification Required",
                style = MaterialTheme.typography.titleLarge.copy(
                    fontWeight = FontWeight.Bold,
                    color = SuniteNavy
                )
            )

            Text(
                text = "Enter the 6-digit authenticator code sent to ${authState.pendingEmailForAuth.ifBlank { "admin@sunite.io" }}",
                style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary),
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 4.dp, bottom = 20.dp)
            )

            EnterpriseCard(padding = 20.dp) {
                if (authState.errorMessage != null) {
                    Text(
                        text = authState.errorMessage ?: "",
                        color = SuniteDanger,
                        style = MaterialTheme.typography.bodySmall,
                        modifier = Modifier.padding(bottom = 12.dp)
                    )
                }

                EnterpriseTextField(
                    value = code,
                    onValueChange = { if (it.length <= 6) code = it },
                    label = "6-Digit MFA Passcode",
                    placeholder = "123456",
                    leadingIcon = Icons.Outlined.VpnKey,
                    keyboardType = KeyboardType.Number,
                    helperText = "Default sandbox passcode is 123456"
                )

                Spacer(modifier = Modifier.height(20.dp))

                EnterpriseButton(
                    text = "Verify & Complete Login",
                    onClick = { AuthManager.verifyMfaCode(code) },
                    modifier = Modifier.fillMaxWidth(),
                    isPrimary = true
                )

                Spacer(modifier = Modifier.height(12.dp))

                TextButton(
                    onClick = { AuthManager.navigateTo(AuthScreenState.Login) },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Back to Standard Login", color = SuniteTextSecondary, fontSize = 12.sp)
                }
            }
        }
    }
}

// OTP Login Screen
@Composable
fun OtpLoginScreen() {
    var identifier by remember { mutableStateOf("+1 512 555 0101") }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "OTP / SMS Authentication",
                style = MaterialTheme.typography.titleLarge.copy(
                    fontWeight = FontWeight.Bold,
                    color = SuniteNavy
                )
            )
            Text(
                text = "Fast single-use code login for enterprise field officers",
                style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary),
                modifier = Modifier.padding(top = 4.dp, bottom = 20.dp)
            )

            EnterpriseCard(padding = 20.dp) {
                EnterpriseTextField(
                    value = identifier,
                    onValueChange = { identifier = it },
                    label = "Phone Number or Corporate Email",
                    placeholder = "+1 (512) 555-0192",
                    leadingIcon = Icons.Outlined.Phone
                )

                Spacer(modifier = Modifier.height(16.dp))

                EnterpriseButton(
                    text = "Send One-Time Passcode",
                    onClick = { AuthManager.loginWithOtp(identifier) },
                    modifier = Modifier.fillMaxWidth(),
                    isAccent = true
                )

                Spacer(modifier = Modifier.height(12.dp))

                TextButton(
                    onClick = { AuthManager.navigateTo(AuthScreenState.Login) },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Cancel and return to password login", color = SuniteTextSecondary, fontSize = 12.sp)
                }
            }
        }
    }
}

// Forgot Password Screen
@Composable
fun ForgotPasswordScreen() {
    var email by remember { mutableStateOf("") }
    var submitted by remember { mutableStateOf(false) }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Reset Corporate Password",
                style = MaterialTheme.typography.titleLarge.copy(
                    fontWeight = FontWeight.Bold,
                    color = SuniteNavy
                )
            )
            Text(
                text = "Enter your Sunite corporate email to receive security reset instructions",
                style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary),
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 4.dp, bottom = 20.dp)
            )

            EnterpriseCard(padding = 20.dp) {
                if (submitted) {
                    Surface(
                        modifier = Modifier.fillMaxWidth(),
                        color = SuniteSuccessBg,
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text(
                            text = "Password reset dispatch complete! Check your inbox for security link.",
                            color = SuniteSuccess,
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.padding(12.dp)
                        )
                    }
                    Spacer(modifier = Modifier.height(16.dp))
                    EnterpriseButton(
                        text = "Proceed to Reset Password Form",
                        onClick = { AuthManager.navigateTo(AuthScreenState.ResetPassword) },
                        modifier = Modifier.fillMaxWidth(),
                        isPrimary = true
                    )
                } else {
                    EnterpriseTextField(
                        value = email,
                        onValueChange = { email = it },
                        label = "Corporate Email",
                        placeholder = "admin@sunite.io",
                        leadingIcon = Icons.Outlined.Email
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    EnterpriseButton(
                        text = "Dispatch Reset Instructions",
                        onClick = { submitted = true },
                        modifier = Modifier.fillMaxWidth(),
                        isPrimary = true
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                TextButton(
                    onClick = { AuthManager.navigateTo(AuthScreenState.Login) },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Back to Sign In", color = SuniteTextSecondary, fontSize = 12.sp)
                }
            }
        }
    }
}

// Reset Password Screen
@Composable
fun ResetPasswordScreen() {
    var newPassword by remember { mutableStateOf("") }
    var confirmPassword by remember { mutableStateOf("") }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Create New Password",
                style = MaterialTheme.typography.titleLarge.copy(
                    fontWeight = FontWeight.Bold,
                    color = SuniteNavy
                )
            )
            Spacer(modifier = Modifier.height(16.dp))

            EnterpriseCard(padding = 20.dp) {
                EnterpriseTextField(
                    value = newPassword,
                    onValueChange = { newPassword = it },
                    label = "New Password",
                    placeholder = "••••••••••••",
                    isPassword = true,
                    helperText = "Must contain uppercase, symbol, and minimum 8 characters."
                )

                Spacer(modifier = Modifier.height(16.dp))

                EnterpriseTextField(
                    value = confirmPassword,
                    onValueChange = { confirmPassword = it },
                    label = "Confirm New Password",
                    placeholder = "••••••••••••",
                    isPassword = true
                )

                Spacer(modifier = Modifier.height(20.dp))

                EnterpriseButton(
                    text = "Update Password & Sign In",
                    onClick = { AuthManager.navigateTo(AuthScreenState.Login) },
                    modifier = Modifier.fillMaxWidth(),
                    isPrimary = true
                )
            }
        }
    }
}

// Unauthorized 403 Screen
@Composable
fun UnauthorizedScreen(onBackToDashboard: () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Surface(
                modifier = Modifier
                    .size(70.dp)
                    .clip(CircleShape),
                color = SuniteDangerBg
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Icon(
                        imageVector = Icons.Default.Block,
                        contentDescription = null,
                        tint = SuniteDanger,
                        modifier = Modifier.size(36.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "403 - Access Denied",
                style = MaterialTheme.typography.headlineSmall.copy(
                    fontWeight = FontWeight.Bold,
                    color = SuniteNavy
                )
            )

            Text(
                text = "Your active role does not possess permissions to view or execute actions in this module.",
                style = MaterialTheme.typography.bodyMedium.copy(color = SuniteTextSecondary),
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 8.dp, bottom = 24.dp)
            )

            EnterpriseButton(
                text = "Return to Dashboard",
                onClick = onBackToDashboard,
                isPrimary = true
            )
        }
    }
}

// Session Expired Screen
@Composable
fun SessionExpiredScreen() {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Surface(
                modifier = Modifier
                    .size(70.dp)
                    .clip(CircleShape),
                color = SuniteWarningBg
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Icon(
                        imageVector = Icons.Default.Timer,
                        contentDescription = null,
                        tint = Color(0xFFD97706),
                        modifier = Modifier.size(36.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "Enterprise Session Expired",
                style = MaterialTheme.typography.headlineSmall.copy(
                    fontWeight = FontWeight.Bold,
                    color = SuniteNavy
                )
            )

            Text(
                text = "For security compliance, your session timed out after inactivity. Please re-authenticate.",
                style = MaterialTheme.typography.bodyMedium.copy(color = SuniteTextSecondary),
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 8.dp, bottom = 24.dp)
            )

            EnterpriseButton(
                text = "Re-Authenticate Now",
                onClick = { AuthManager.navigateTo(AuthScreenState.Login) },
                isPrimary = true
            )
        }
    }
}
