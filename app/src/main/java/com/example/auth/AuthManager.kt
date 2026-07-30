package com.example.auth

import com.example.data.entity.UserEntity
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

sealed class AuthScreenState {
    object Splash : AuthScreenState()
    object Login : AuthScreenState()
    object OtpLogin : AuthScreenState()
    object ForgotPassword : AuthScreenState()
    object ResetPassword : AuthScreenState()
    object EmailVerification : AuthScreenState()
    object MfaVerification : AuthScreenState()
    object Authenticated : AuthScreenState()
    object Unauthorized : AuthScreenState()
    object SessionExpired : AuthScreenState()
}

data class AuthState(
    val currentUser: UserEntity? = null,
    val screenState: AuthScreenState = AuthScreenState.Splash,
    val simulatedJwtToken: String? = null,
    val pendingEmailForAuth: String = "",
    val errorMessage: String? = null,
    val isLoading: Boolean = false,
    val mfaRequired: Boolean = true,
    val permissions: Set<String> = emptySet()
)

object AuthManager {
    private val _authState = MutableStateFlow(
        AuthState(
            currentUser = UserEntity(
                id = "usr_01",
                email = "admin@sunite.io",
                fullName = "Alexander Vance",
                role = "Super Admin",
                branch = "Austin Clean Energy Hub",
                department = "Executive Management",
                phone = "+1 512 555 0101",
                status = "Active",
                mfaEnabled = true
            ),
            screenState = AuthScreenState.Authenticated,
            simulatedJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfMDEiLCJlbWFpbCI6ImFkbWluQHN1bml0ZS5pbyIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcyMjM0MDUwOCwiZXhwIjoxNzIyOTQ1MzA4fQ.SuniteSecureSignature",
            permissions = setOf(
                "users:read", "users:write", "users:delete",
                "roles:manage", "org:write", "branches:write",
                "master:write", "settings:manage", "approvals:manage", "audit:read"
            )
        )
    )
    val authState: StateFlow<AuthState> = _authState

    fun navigateTo(screenState: AuthScreenState) {
        _authState.value = _authState.value.copy(
            screenState = screenState,
            errorMessage = null
        )
    }

    fun loginWithPassword(email: String, pass: String): Boolean {
        if (email.isBlank() || pass.isBlank()) {
            _authState.value = _authState.value.copy(errorMessage = "Please enter valid corporate email and password.")
            return false
        }
        if (pass.length < 4) {
            _authState.value = _authState.value.copy(errorMessage = "Invalid password credentials.")
            return false
        }
        _authState.value = _authState.value.copy(
            pendingEmailForAuth = email,
            errorMessage = null
        )
        // Check if MFA enabled
        navigateTo(AuthScreenState.MfaVerification)
        return true
    }

    fun loginWithOtp(phoneOrEmail: String): Boolean {
        if (phoneOrEmail.isBlank()) {
            _authState.value = _authState.value.copy(errorMessage = "Enter phone number or corporate email.")
            return false
        }
        _authState.value = _authState.value.copy(
            pendingEmailForAuth = phoneOrEmail,
            errorMessage = null
        )
        navigateTo(AuthScreenState.EmailVerification)
        return true
    }

    fun verifyMfaCode(code: String): Boolean {
        if (code != "123456" && code.length != 6) {
            _authState.value = _authState.value.copy(errorMessage = "Invalid 6-digit MFA passcode. Try 123456.")
            return false
        }
        val loggedUser = UserEntity(
            id = "usr_01",
            email = _authState.value.pendingEmailForAuth.ifBlank { "admin@sunite.io" },
            fullName = if (_authState.value.pendingEmailForAuth.contains("partner")) "Elena Rostova" else "Alexander Vance",
            role = if (_authState.value.pendingEmailForAuth.contains("partner")) "Solar Partner Admin" else "Super Admin",
            branch = "Austin Clean Energy Hub",
            department = "Executive Management",
            phone = "+1 512 555 0101",
            status = "Active",
            mfaEnabled = true
        )
        _authState.value = _authState.value.copy(
            currentUser = loggedUser,
            simulatedJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfMDEiLCJlbWFpbCI6ImFkbWluQHN1bml0ZS5pbyIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcyMjM0MDUwOCwiZXhwIjoxNzIyOTQ1MzA4fQ.SuniteSecureSignature",
            screenState = AuthScreenState.Authenticated,
            errorMessage = null,
            permissions = setOf(
                "users:read", "users:write", "users:delete",
                "roles:manage", "org:write", "branches:write",
                "master:write", "settings:manage", "approvals:manage", "audit:read"
            )
        )
        return true
    }

    fun verifyEmailOtp(code: String): Boolean {
        return verifyMfaCode(code)
    }

    fun logout() {
        _authState.value = AuthState(
            currentUser = null,
            screenState = AuthScreenState.Login,
            simulatedJwtToken = null,
            permissions = emptySet()
        )
    }

    fun triggerSessionTimeout() {
        _authState.value = _authState.value.copy(
            screenState = AuthScreenState.SessionExpired
        )
    }

    fun triggerUnauthorizedAccess() {
        _authState.value = _authState.value.copy(
            screenState = AuthScreenState.Unauthorized
        )
    }

    fun switchUserRole(roleName: String) {
        val user = _authState.value.currentUser ?: return
        val updatedUser = user.copy(role = roleName)
        val perms = when (roleName) {
            "Super Admin" -> setOf("users:read", "users:write", "users:delete", "roles:manage", "org:write", "branches:write", "master:write", "settings:manage", "approvals:manage", "audit:read")
            "Solar Partner Admin" -> setOf("users:read", "users:write", "org:read", "branches:write", "approvals:manage", "reports:read")
            "Branch Manager" -> setOf("users:read", "branches:read", "reports:read")
            else -> setOf("reports:read")
        }
        _authState.value = _authState.value.copy(
            currentUser = updatedUser,
            permissions = perms
        )
    }

    fun hasPermission(permission: String): Boolean {
        return _authState.value.permissions.contains(permission) || _authState.value.currentUser?.role == "Super Admin"
    }
}
