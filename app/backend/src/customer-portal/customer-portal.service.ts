import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ProcessCustomerPaymentDto,
  CreateServiceTicketDto,
  CreateReferralDto,
  AiAssistantQueryDto,
} from './customer-portal.dto';

@Injectable()
export class CustomerPortalService {
  constructor(private prisma: PrismaService) {}

  /**
   * 1. Customer Dashboard Summary
   */
  async getDashboard() {
    return {
      statusCode: 200,
      success: true,
      data: {
        customerInfo: {
          name: 'Sanand Industrial Polymers Ltd.',
          accountNo: 'SUN-CUST-8092',
          plantLocation: 'GIDC Phase 2, Sanand, Gujarat',
        },
        currentProjectsCount: 2,
        installedCapacityKw: 550.0, // 550 kWp Rooftop & Ground Mounted
        todaysGenerationKwh: 2680.5,
        monthlyGenerationKwh: 78450.0,
        lifetimeSavingsInr: 4280500, // ₹42.8 Lakhs
        co2OffsetTons: 642.8,
        treesEquivalentPlanted: 25700,
        outstandingPaymentsInr: 125000,
        openServiceTicketsCount: 1,
        activeAmcPlan: 'GOLD_PREMIUM_PREVENTIVE',
        warrantyStatus: 'ACTIVE_FULLY_COVERED',
      },
    };
  }

  /**
   * 2. Project Tracker
   */
  async getProjects() {
    return {
      statusCode: 200,
      success: true,
      data: [
        {
          projectId: 'PROJ-SUN-550KW',
          projectName: '550 kWp Captive Rooftop Solar Plant',
          capacityKw: 550,
          status: 'COMMISSIONED',
          commissionedDate: '2025-11-15',
          expectedCompletion: '2025-11-15',
          milestones: [
            { name: 'Site Survey & Engineering Design', status: 'COMPLETED', date: '2025-08-10' },
            { name: 'Procurement & Module Delivery', status: 'COMPLETED', date: '2025-09-02' },
            { name: 'Structure Erection & Panel Mounting', status: 'COMPLETED', date: '2025-09-25' },
            { name: 'Inverter & Electrical Cabling', status: 'COMPLETED', date: '2025-10-20' },
            { name: 'CEIG Inspection & DISCOM Net-Metering', status: 'COMPLETED', date: '2025-11-05' },
            { name: 'Plant Commissioning & Grid Sync', status: 'COMPLETED', date: '2025-11-15' },
          ],
          engineerVisits: [
            { date: '2026-07-20', engineer: 'Rajesh Sharma (Lead SCADA Engineer)', purpose: 'Quarterly Maintenance & Inverter Calibration', status: 'COMPLETED' },
            { date: '2026-08-10', engineer: 'Amit Patel (Solar Field Tech)', purpose: 'Scheduled Thermal Imaging & Panel Washing', status: 'SCHEDULED' },
          ],
          installationPhotos: [
            { url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800', caption: 'Module Mounting Array' },
            { url: 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=800', caption: 'Central Inverter & Grid Panel' },
          ],
        },
      ],
    };
  }

  /**
   * 3. Live SCADA Dashboard Data
   */
  async getScada() {
    return {
      statusCode: 200,
      success: true,
      data: {
        plantName: 'Sanand Industrial 550 kWp Solar Plant',
        plantStatus: 'ONLINE_GENERATING',
        livePowerKw: 412.5,
        peakPowerTodayKw: 510.2,
        todaysGenerationKwh: 2680.5,
        monthlyGenerationKwh: 78450.0,
        yearlyGenerationKwh: 890200.0,
        performanceRatioPct: 82.4, // PR %
        capacityUtilisationFactorPct: 20.8, // CUF %
        weatherTelemetry: {
          ambientTempCelsius: 33.2,
          moduleTempCelsius: 48.5,
          ghiIrradianceWm2: 840.5,
          windSpeedMps: 3.4,
          condition: 'CLEAR_SKY_OPTIMAL',
        },
        inverters: [
          { id: 'INV-01', model: 'Sungrow 110kW String Inverter', liveOutputKw: 104.2, status: 'NORMAL', efficiencyPct: 98.6 },
          { id: 'INV-02', model: 'Sungrow 110kW String Inverter', liveOutputKw: 103.8, status: 'NORMAL', efficiencyPct: 98.5 },
          { id: 'INV-03', model: 'Sungrow 110kW String Inverter', liveOutputKw: 102.1, status: 'NORMAL', efficiencyPct: 98.4 },
          { id: 'INV-04', model: 'Sungrow 110kW String Inverter', liveOutputKw: 102.4, status: 'NORMAL', efficiencyPct: 98.6 },
        ],
        faultAlerts: [
          { alertId: 'ALT-1029', severity: 'LOW', message: 'String 04 Current slight imbalance (within 3% tolerance)', timestamp: new Date() },
        ],
      },
    };
  }

  /**
   * 4. Customer Document Vault
   */
  async getDocuments() {
    return {
      statusCode: 200,
      success: true,
      data: [
        { id: 'DOC-101', type: 'QUOTATION', title: 'Approved EPC Quotation & Yield Estimate', date: '2025-07-15', fileSize: '3.4 MB', downloadUrl: '/docs/quotation.pdf' },
        { id: 'DOC-102', type: 'INVOICE', title: 'Commissioning Milestone Tax Invoice (INV-2025-882)', date: '2025-11-20', fileSize: '1.2 MB', downloadUrl: '/docs/invoice.pdf' },
        { id: 'DOC-103', type: 'RECEIPT', title: 'Final Payment Receipt (RCP-9021)', date: '2025-11-22', fileSize: '850 KB', downloadUrl: '/docs/receipt.pdf' },
        { id: 'DOC-104', type: 'WARRANTY_CERTIFICATE', title: '25-Year Linear Performance Warranty Card', date: '2025-11-25', fileSize: '2.8 MB', downloadUrl: '/docs/warranty.pdf' },
        { id: 'DOC-105', type: 'AMC_AGREEMENT', title: '5-Year Comprehensive AMC Agreement', date: '2025-12-01', fileSize: '4.1 MB', downloadUrl: '/docs/amc.pdf' },
        { id: 'DOC-106', type: 'COMMISSIONING_REPORT', title: 'CEIG CE-Grid Synchronization Certificate', date: '2025-11-15', fileSize: '5.6 MB', downloadUrl: '/docs/commissioning.pdf' },
        { id: 'DOC-107', type: 'USER_MANUAL', title: 'Plant Operations & Maintenance Safety Manual', date: '2025-11-15', fileSize: '8.2 MB', downloadUrl: '/docs/manual.pdf' },
      ],
    };
  }

  /**
   * 5. Payments & Invoices History
   */
  async getPayments() {
    return {
      statusCode: 200,
      success: true,
      data: {
        outstandingAmountInr: 125000,
        dueByDate: '2026-08-15',
        currency: 'INR',
        invoices: [
          { invoiceNo: 'INV-2026-042', description: 'Annual AMC Service Invoice (Year 1)', amountInr: 125000, status: 'UNPAID', dueDate: '2026-08-15' },
          { invoiceNo: 'INV-2025-882', description: 'Final EPC Plant Commissioning Balance', amountInr: 1250000, status: 'PAID', paidDate: '2025-11-22', transactionRef: 'TXN_901823901' },
          { invoiceNo: 'INV-2025-410', description: 'Equipment Procurement Milestone Payment', amountInr: 2500000, status: 'PAID', paidDate: '2025-09-05', transactionRef: 'TXN_881239102' },
        ],
      },
    };
  }

  /**
   * 6. Online Payment Trigger
   */
  async processPayment(dto: ProcessCustomerPaymentDto) {
    const paymentTxnId = `TXN_CUST_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return {
      statusCode: 200,
      success: true,
      message: `Online payment of ₹${dto.amount.toLocaleString('en-IN')} initiated via ${dto.paymentMethod}`,
      data: {
        transactionId: paymentTxnId,
        invoiceId: dto.invoiceId,
        amountPaid: dto.amount,
        paymentMethod: dto.paymentMethod,
        status: 'SUCCESS',
        receiptNumber: `RCP-${Math.floor(100000 + Math.random() * 900000)}`,
        paidAt: new Date(),
      },
    };
  }

  /**
   * 7. Warranty Information & Equipment Coverage
   */
  async getWarranty() {
    return {
      statusCode: 200,
      success: true,
      data: {
        overallWarrantyStatus: 'ACTIVE_FULL_COVERAGE',
        plantCommissionedDate: '2025-11-15',
        equipmentList: [
          { equipment: 'Solar PV Modules (550W Mono PERC)', brand: 'LONGi Solar', serialNo: 'LR5-72HPH-550M-90812', warrantyYears: 25, type: '25-Year Linear Output Guarantee', status: 'ACTIVE', validTill: '2050-11-15' },
          { equipment: 'Central String Inverters (110kW)', brand: 'Sungrow Power', serialNo: 'SG110CX-IN-889123', warrantyYears: 10, type: 'Comprehensive Product Warranty', status: 'ACTIVE', validTill: '2035-11-15' },
          { equipment: 'Module Mounting Structures (Hot Dip Galv)', brand: 'Sunite Structural', serialNo: 'ST-HDG-550', warrantyYears: 20, type: 'Corrosion & Wind Load Guarantee', status: 'ACTIVE', validTill: '2045-11-15' },
          { equipment: 'AC/DC Distribution Panels & Switchgear', brand: 'ABB / Schneider', serialNo: 'MDB-550-2025', warrantyYears: 5, type: 'Standard Electrical Warranty', status: 'ACTIVE', validTill: '2030-11-15' },
        ],
        claimHistory: [
          { claimId: 'CLM-901', equipment: 'String Inverter Fan Unit', filedDate: '2026-03-10', status: 'RESOLVED_REPLACED', resolutionDate: '2026-03-12', notes: 'Replacement fan assembly fitted under warranty' },
        ],
      },
    };
  }

  /**
   * 8. AMC Plan & Renewal
   */
  async getAmc() {
    return {
      statusCode: 200,
      success: true,
      data: {
        currentPlanName: 'GOLD_PREVENTIVE_COMPREHENSIVE_AMC',
        annualFeeInr: 125000,
        startDate: '2025-11-15',
        expiryDate: '2026-11-14',
        status: 'ACTIVE',
        includedServices: [
          'Monthly Automated Robotic Panel Cleaning Inspection',
          'Quarterly Thermal Imaging & Hotspot Analysis',
          'Bi-Annual Inverter & Transformer Oil Calibration',
          '24/7 Remote SCADA AI Telemetry Monitoring',
          '4-Hour Guaranteed On-Site Emergency Fault Response',
          'Free Replacement of Consumables & Fuse Gears',
        ],
        upgradeOptions: [
          { plan: 'PLATINUM_ZERO_DOWNTIME_AMC', annualFeeInr: 180000, extraFeatures: 'Includes robotic panel washing drones & 2-hour SLA on-site response' },
        ],
        visitCalendar: [
          { date: '2026-02-15', type: 'Quarterly Maintenance', status: 'COMPLETED' },
          { date: '2026-05-15', type: 'Quarterly Maintenance', status: 'COMPLETED' },
          { date: '2026-08-15', type: 'Quarterly Maintenance', status: 'UPCOMING' },
          { date: '2026-11-15', type: 'Annual Overhaul & Thermal Sweep', status: 'SCHEDULED' },
        ],
      },
    };
  }

  /**
   * 9. Service Desk - Create Ticket
   */
  async createServiceTicket(dto: CreateServiceTicketDto) {
    const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      statusCode: 201,
      success: true,
      message: `Service ticket ${ticketId} created successfully. Assigned to Senior Field Engineer.`,
      data: {
        ticketId,
        projectId: dto.projectId,
        category: dto.category,
        subject: dto.subject,
        description: dto.description,
        priority: dto.priority || 'MEDIUM',
        status: 'OPEN_ASSIGNED',
        assignedEngineer: {
          name: 'Rajesh Sharma',
          phone: '+91 98765 12345',
          designation: 'Senior O&M Solar Specialist',
        },
        scheduledVisitDate: '2026-08-04 10:00 AM',
        createdAt: new Date(),
      },
    };
  }

  /**
   * 10. Service Desk - History & Track
   */
  async getServiceHistory() {
    return {
      statusCode: 200,
      success: true,
      data: [
        {
          ticketId: 'TKT-882102',
          category: 'INVERTER_FAULT',
          subject: 'Inverter #02 Thermal Sensor Calibration Warning',
          status: 'RESOLVED',
          createdAt: '2026-04-12',
          resolvedAt: '2026-04-13',
          engineerName: 'Rajesh Sharma',
          resolutionSummary: 'Calibrated temperature probe and updated inverter firmware v4.12',
          customerSignatureUrl: '/signatures/cust_sig_882102.png',
        },
        {
          ticketId: 'TKT-991204',
          category: 'PANEL_CLEANING',
          subject: 'Post-Monsoon Dust & Debris Panel Washing Request',
          status: 'IN_PROGRESS',
          createdAt: '2026-07-28',
          scheduledVisitDate: '2026-08-03 09:30 AM',
          engineerName: 'Amit Patel',
          resolutionSummary: 'Cleaning crew dispatched with de-mineralized water washing rig',
        },
      ],
    };
  }

  /**
   * 11. Customer Referral Program
   */
  async createReferral(dto: CreateReferralDto) {
    const ref = await this.prisma.customerReferral.create({
      data: {
        referrerName: dto.referrerName,
        referrerEmail: dto.referrerEmail,
        friendName: dto.friendName,
        friendPhone: dto.friendPhone,
        friendEmail: dto.friendEmail || null,
        capacityKw: dto.estimatedCapacityKw || 100,
        status: 'PENDING',
        rewardAmount: (dto.estimatedCapacityKw || 100) * 100, // ₹100 per kW referral reward
      },
    });

    return {
      statusCode: 201,
      success: true,
      message: `Referral for ${dto.friendName} submitted successfully. Reward eligibility: ₹${ref.rewardAmount.toLocaleString('en-IN')}`,
      data: ref,
    };
  }

  /**
   * 12. Customer Notifications Stream
   */
  async getNotifications() {
    return {
      statusCode: 200,
      success: true,
      data: [
        { id: 'NTF-101', title: 'Scheduled Panel Washing Alert', message: 'Solar cleaning team is scheduled to visit tomorrow at 9:30 AM.', channel: 'WHATSAPP_INAPP', date: '10 mins ago', isRead: false },
        { id: 'NTF-102', title: 'Monthly Solar Yield Report Ready', message: 'Your July 2026 generation report is ready for download (78,450 kWh generated).', channel: 'EMAIL', date: '2 days ago', isRead: true },
        { id: 'NTF-103', title: 'AMC Renewal Due Notice', message: 'Invoice INV-2026-042 for Year 1 AMC is due on 15 Aug 2026.', channel: 'SMS_EMAIL', date: '5 days ago', isRead: true },
      ],
    };
  }

  /**
   * 13. AI Solar Assistant
   */
  async askAiAssistant(dto: AiAssistantQueryDto) {
    const queryLower = dto.query.toLowerCase();
    let responseText = '';

    if (queryLower.includes('generation') || queryLower.includes('yield') || queryLower.includes('kwh')) {
      responseText = 'Your 550 kWp solar plant generated 2,680.5 kWh today and 78,450 kWh this month. Performance Ratio (PR) is operating at an optimal 82.4%.';
    } else if (queryLower.includes('invoice') || queryLower.includes('bill') || queryLower.includes('payment')) {
      responseText = 'You have 1 pending invoice (INV-2026-042 for Annual AMC) amounting to ₹1,25,000 due on 15 Aug 2026. You can pay online directly from the Payments tab.';
    } else if (queryLower.includes('warranty') || queryLower.includes('guarantee')) {
      responseText = 'Your LONGi 550W solar panels carry a 25-year linear power warranty valid till 2050. Your Sungrow string inverters carry a 10-year product warranty valid till 2035.';
    } else if (queryLower.includes('troubleshoot') || queryLower.includes('fault') || queryLower.includes('clean')) {
      responseText = 'All 4 string inverters are operating normally. To request panel washing or report a grid trip, you can create a Service Ticket from the Service Desk tab.';
    } else {
      responseText = `Sunite AI Solar Assistant: Based on your 550 kWp plant telemetry, your system is operating at peak performance with zero critical faults. Is there a specific document, invoice, or technical query I can assist you with?`;
    }

    return {
      statusCode: 200,
      success: true,
      data: {
        query: dto.query,
        response: responseText,
        category: dto.category || 'PLANT_PERFORMANCE',
        suggestedActions: [
          'Download Monthly Solar Report',
          'Pay AMC Invoice Online',
          'Schedule Panel Cleaning',
        ],
      },
    };
  }
}
