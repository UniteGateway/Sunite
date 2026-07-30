package com.example.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView

private val LightColorScheme = lightColorScheme(
    primary = SuniteNavy,
    onPrimary = Color.White,
    primaryContainer = Color(0xFFE0E8F6),
    onPrimaryContainer = SuniteNavyDark,
    secondary = SuniteOrange,
    onSecondary = Color.White,
    secondaryContainer = Color(0xFFFFE8D1),
    onSecondaryContainer = Color(0xFF6B3A00),
    tertiary = SuniteInfo,
    onTertiary = Color.White,
    background = SuniteBackground,
    onBackground = SuniteTextPrimary,
    surface = SuniteSurface,
    onSurface = SuniteTextPrimary,
    surfaceVariant = Color(0xFFF1F5F9),
    onSurfaceVariant = SuniteTextSecondary,
    outline = SuniteBorder,
    outlineVariant = SuniteBorderDark,
    error = SuniteDanger,
    onError = Color.White,
    errorContainer = SuniteDangerBg,
    onErrorContainer = SuniteDanger
)

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF82B0FF),
    onPrimary = SuniteNavyDark,
    primaryContainer = SuniteNavy,
    onPrimaryContainer = Color.White,
    secondary = SuniteOrangeLight,
    onSecondary = Color(0xFF422100),
    background = Color(0xFF0F172A),
    onBackground = Color(0xFFF8FAFC),
    surface = Color(0xFF1E293B),
    onSurface = Color(0xFFF8FAFC),
    surfaceVariant = Color(0xFF334155),
    onSurfaceVariant = Color(0xFFCBD5E1),
    outline = Color(0xFF475569),
    error = SuniteDanger,
    onError = Color.White
)

@Composable
fun SuniteTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.primary.toArgb()
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}

