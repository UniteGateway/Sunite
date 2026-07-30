package com.example.ui.screens.files

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
import com.example.ui.components.*
import com.example.ui.theme.*

data class EnterpriseFile(
    val id: String,
    val name: String,
    val category: String, // DOCUMENT, IMAGE, PDF
    val size: String,
    val version: String,
    val uploadedBy: String,
    val uploadedAt: String
)

@Composable
fun FileManagementScreen(repository: SuniteRepository) {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("Document Library", "Image Gallery", "PDF Viewer", "Upload Manager", "Version History")
    var selectedFileForPreview by remember { mutableStateOf<EnterpriseFile?>(null) }
    var selectedFileForVersions by remember { mutableStateOf<EnterpriseFile?>(null) }
    var showUploadModal by remember { mutableStateOf(false) }

    val sampleFiles = remember {
        mutableStateListOf(
            EnterpriseFile("1", "Solar_EPC_Contract_Template_v2.pdf", "PDF", "2.4 MB", "v2.1", "Super Admin", "2026-07-29"),
            EnterpriseFile("2", "Single_Line_Diagram_500kW.dwg", "DOCUMENT", "14.2 MB", "v1.0", "Solar Engineer", "2026-07-28"),
            EnterpriseFile("3", "Site_Survey_Rooftop_Drone_Image_01.jpg", "IMAGE", "6.8 MB", "v1.0", "Survey Engineer", "2026-07-27"),
            EnterpriseFile("4", "GST_Tax_Compliance_Schedules_2026.pdf", "PDF", "1.1 MB", "v3.0", "Finance Team", "2026-07-26"),
            EnterpriseFile("5", "Inverter_Warranty_Agreement_Growatt.pdf", "PDF", "850 KB", "v1.2", "Service Engineer", "2026-07-25")
        )
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SuniteBackground)
    ) {
        // Header Bar with Primary Upload Action
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Enterprise Document & File Vault",
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                )
                Text(
                    text = "Encrypted S3 cloud storage with automated versioning",
                    style = MaterialTheme.typography.bodySmall.copy(color = SuniteTextSecondary)
                )
            }
            EnterpriseButton(
                text = "Upload New File",
                onClick = { showUploadModal = true },
                isPrimary = true,
                icon = Icons.Default.CloudUpload
            )
        }

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
                0 -> FileList(
                    files = sampleFiles.filter { it.category == "DOCUMENT" || it.category == "PDF" },
                    onPreview = { selectedFileForPreview = it },
                    onVersions = { selectedFileForVersions = it }
                )
                1 -> FileList(
                    files = sampleFiles.filter { it.category == "IMAGE" },
                    onPreview = { selectedFileForPreview = it },
                    onVersions = { selectedFileForVersions = it }
                )
                2 -> PdfViewerTab(
                    pdfFiles = sampleFiles.filter { it.category == "PDF" }
                )
                3 -> UploadManagerTab(
                    onUpload = { file -> sampleFiles.add(file) }
                )
                4 -> VersionHistoryTab(
                    files = sampleFiles
                )
            }
        }
    }

    // Modal: Upload File
    if (showUploadModal) {
        var name by remember { mutableStateOf("") }
        var category by remember { mutableStateOf("PDF") }

        EnterpriseModal(
            title = "Upload Document to Enterprise Vault",
            subtitle = "Target AWS S3 Bucket: sunite-uspn-vault-production",
            onDismissRequest = { showUploadModal = false },
            confirmText = "Confirm Upload",
            confirmEnabled = name.isNotEmpty(),
            onConfirm = {
                sampleFiles.add(
                    EnterpriseFile(
                        id = (sampleFiles.size + 1).toString(),
                        name = name,
                        category = category,
                        size = "3.2 MB",
                        version = "v1.0",
                        uploadedBy = "Current User",
                        uploadedAt = "Just now"
                    )
                )
                showUploadModal = false
            }
        ) {
            EnterpriseTextField(
                value = name,
                onValueChange = { name = it },
                label = "Document Name",
                placeholder = "e.g. Solar_Grid_Permission_Letter.pdf"
            )
            Spacer(modifier = Modifier.height(12.dp))
            EnterpriseDropdown(
                label = "File Category",
                options = listOf("PDF", "DOCUMENT", "IMAGE"),
                selectedOption = category,
                onOptionSelected = { category = it }
            )
        }
    }

    // Modal: Preview PDF / Image
    selectedFileForPreview?.let { file ->
        EnterpriseModal(
            title = "Secure File Previewer",
            subtitle = file.name,
            onDismissRequest = { selectedFileForPreview = null },
            confirmText = "Download File",
            onConfirm = { selectedFileForPreview = null }
        ) {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp),
                shape = RoundedCornerShape(8.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B))
            ) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(
                            imageVector = if (file.category == "IMAGE") Icons.Default.Image else Icons.Default.PictureAsPdf,
                            contentDescription = null,
                            tint = SuniteOrange,
                            modifier = Modifier.size(48.dp)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "[ Encrypted Stream Preview ]",
                            color = Color.White,
                            style = MaterialTheme.typography.bodySmall
                        )
                        Text(
                            text = "${file.name} • ${file.size} • Version ${file.version}",
                            color = Color(0xFF94A3B8),
                            fontSize = 10.sp
                        )
                    }
                }
            }
        }
    }

    // Modal: Version History Details
    selectedFileForVersions?.let { file ->
        EnterpriseModal(
            title = "Document Version History",
            subtitle = file.name,
            onDismissRequest = { selectedFileForVersions = null },
            confirmText = "Close History",
            onConfirm = { selectedFileForVersions = null }
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf(
                    file.version to "Latest commit by ${file.uploadedBy} on ${file.uploadedAt}",
                    "v1.1" to "Updated SLA clauses and warranty terms",
                    "v1.0" to "Initial document creation & signature seal"
                ).forEach { (ver, desc) ->
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(text = ver, fontWeight = FontWeight.Bold, color = SuniteNavy)
                            Text(text = desc, style = MaterialTheme.typography.labelSmall, color = SuniteTextSecondary)
                        }
                        EnterpriseButton(text = "Restore", onClick = {}, isPrimary = false)
                    }
                    Divider(color = SuniteBorder)
                }
            }
        }
    }
}

@Composable
fun FileList(
    files: List<EnterpriseFile>,
    onPreview: (EnterpriseFile) -> Unit,
    onVersions: (EnterpriseFile) -> Unit
) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        items(files, key = { it.id }) { file ->
            EnterpriseCard(padding = 12.dp) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        modifier = Modifier.weight(1f),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = when (file.category) {
                                "IMAGE" -> Icons.Default.Image
                                "PDF" -> Icons.Default.PictureAsPdf
                                else -> Icons.Default.InsertDriveFile
                            },
                            contentDescription = null,
                            tint = SuniteNavy,
                            modifier = Modifier.size(24.dp)
                        )
                        Spacer(modifier = Modifier.width(12.dp))
                        Column {
                            Text(
                                text = file.name,
                                style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy)
                            )
                            Text(
                                text = "${file.size} • Version ${file.version} • Uploaded by ${file.uploadedBy} on ${file.uploadedAt}",
                                style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary, fontSize = 10.sp),
                                modifier = Modifier.padding(top = 2.dp)
                            )
                        }
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        IconButton(onClick = { onPreview(file) }) {
                            Icon(imageVector = Icons.Default.Visibility, contentDescription = "Preview", tint = SuniteNavy, modifier = Modifier.size(18.dp))
                        }
                        IconButton(onClick = { onVersions(file) }) {
                            Icon(imageVector = Icons.Default.History, contentDescription = "Versions", tint = SuniteTextSecondary, modifier = Modifier.size(18.dp))
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun PdfViewerTab(pdfFiles: List<EnterpriseFile>) {
    var selectedPdf by remember { mutableStateOf(pdfFiles.firstOrNull()) }

    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        EnterpriseCard {
            Text(text = "Interactive In-App PDF Document Viewer", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
            Spacer(modifier = Modifier.height(12.dp))

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(280.dp),
                shape = RoundedCornerShape(8.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A)),
                border = androidx.compose.foundation.BorderStroke(1.dp, SuniteBorder)
            ) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(imageVector = Icons.Default.PictureAsPdf, contentDescription = null, tint = SuniteOrange, modifier = Modifier.size(54.dp))
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(text = selectedPdf?.name ?: "No PDF selected", color = Color.White, fontWeight = FontWeight.Bold)
                        Text(text = "Page 1 of 8 • Encrypted PDF Rendering Canvas", color = Color(0xFF94A3B8), fontSize = 11.sp)
                    }
                }
            }
        }
    }
}

@Composable
fun UploadManagerTab(onUpload: (EnterpriseFile) -> Unit) {
    EnterpriseCard {
        Text(text = "Enterprise Bulk Document Upload Manager", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
        Spacer(modifier = Modifier.height(16.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(140.dp)
                .background(SuniteBackground, shape = RoundedCornerShape(8.dp))
                .border(1.dp, SuniteBorder, shape = RoundedCornerShape(8.dp)),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Icon(imageVector = Icons.Default.CloudUpload, contentDescription = null, tint = SuniteNavy, modifier = Modifier.size(36.dp))
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = "Drag & Drop Solar EPC Files Here or Click to Browse", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = SuniteNavy))
                Text(text = "Supports PDF, DWG, PNG, JPG up to 100MB per file", style = MaterialTheme.typography.labelSmall.copy(color = SuniteTextSecondary))
            }
        }
    }
}

@Composable
fun VersionHistoryTab(files: List<EnterpriseFile>) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        items(files) { file ->
            EnterpriseCard {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = file.name, fontWeight = FontWeight.Bold, color = SuniteNavy)
                        Text(text = "Active Version: ${file.version} • Managed by ${file.uploadedBy}", style = MaterialTheme.typography.labelSmall, color = SuniteTextSecondary)
                    }
                    EnterpriseBadge(text = "v1.0 - ${file.version}")
                }
            }
        }
    }
}
