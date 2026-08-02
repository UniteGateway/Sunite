'use client';

import React, { useState } from 'react';
import {
  Sun,
  Zap,
  Activity,
  FileText,
  CreditCard,
  ShieldCheck,
  Wrench,
  Bot,
  Gift,
  Bell,
  User,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Download,
  Send,
  Plus,
  RefreshCw,
  Sparkles,
  Search,
  PhoneCall,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  Share2,
  Check,
  ChevronRight,
  ExternalLink,
  Info,
  MapPin,
  Building,
} from 'lucide-react';

export default function CustomerSelfServicePortalPage() {
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'projects'
    | 'scada'
    | 'billing'
    | 'documents'
    | 'warranty'
    | 'amc'
    | 'service'
    | 'ai'
    | 'referral'
    | 'notifications'
    | 'profile'
  >('dashboard');

  // Interactive Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Payment State
  const [paymentAmount, setPaymentAmount] = useState('125000');
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  // Service Ticket Creation State
  const [ticketCategory, setTicketCategory] = useState('PANEL_CLEANING');
  const [ticketSubject, setTicketSubject] = useState('Routine Dust & Debris Cleaning Request');
  const [ticketDesc, setTicketDesc] = useState('Please schedule water wash crew for the 550 kWp array.');

  // AI Assistant Chat State
  const [aiInput, setAiInput] = useState('How much solar energy did my plant produce today?');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'Hello! I am your Sunite AI Solar Assistant. I can help you analyze plant generation, check invoice status, review warranty coverage, or troubleshoot equipment. How can I assist you today?',
      time: 'Just now',
    },
  ]);

  // Referral State
  const [refName, setRefName] = useState('Rajesh Mehta');
  const [refPhone, setRefPhone] = useState('+91 98250 99887');
  const [refKw, setRefKw] = useState('150');

  // Action Handlers
  const handlePayInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Payment of ₹${Number(paymentAmount).toLocaleString('en-IN')} successful via ${paymentMethod}. Receipt #RCP-90128 generated.`);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Service Ticket #TKT-${Math.floor(100000 + Math.random() * 900000)} created. Assigned to Senior Engineer Rajesh Sharma.`);
  };

  const handleSendAiMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMsg = aiInput;
    const newMsgs = [...chatMessages, { sender: 'user' as const, text: userMsg, time: 'Just now' }];
    setChatMessages(newMsgs);
    setAiInput('');

    setTimeout(() => {
      let aiReply = 'Your 550 kWp plant generated 2,680.5 kWh today with an 82.4% Performance Ratio. All 4 string inverters are operating at peak efficiency.';
      if (userMsg.toLowerCase().includes('invoice') || userMsg.toLowerCase().includes('payment')) {
        aiReply = 'You have 1 pending invoice INV-2026-042 for ₹1,25,000 (Annual AMC) due on 15 Aug 2026. You can clear it directly from the Billing tab.';
      } else if (userMsg.toLowerCase().includes('warranty')) {
        aiReply = 'Your LONGi 550W solar modules are covered under a 25-year linear power warranty valid until 2050.';
      }
      setChatMessages([...newMsgs, { sender: 'ai' as const, text: aiReply, time: 'Just now' }]);
    }, 600);
  };

  const handleSubmitReferral = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Referral for ${refName} recorded. Eligible referral bonus: ₹${(Number(refKw) * 100).toLocaleString('en-IN')}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 space-y-8">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-emerald-500 px-5 py-3 text-slate-950 font-bold shadow-2xl animate-bounce">
          <Sparkles className="h-5 w-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
              CUSTOMER SELF-SERVICE PORTAL
            </span>
            <span className="text-xs text-slate-400">Account: SUN-CUST-8092</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-2 flex items-center gap-3">
            <Sun className="h-8 w-8 text-amber-400" />
            Sanand Industrial Polymers Ltd.
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            550 kWp Captive Rooftop Solar Power Plant • GIDC Phase 2, Sanand, Gujarat
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('ai')}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition shadow-lg"
          >
            <Bot className="h-4 w-4" />
            Ask AI Solar Assistant
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 text-xs font-medium">
        {[
          { id: 'dashboard', label: 'Customer Dashboard', icon: Sun },
          { id: 'projects', label: 'Project Tracker', icon: Clock },
          { id: 'scada', label: 'Live SCADA IoT', icon: Activity },
          { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
          { id: 'documents', label: 'Document Vault', icon: FileText },
          { id: 'warranty', label: 'Warranty Center', icon: ShieldCheck },
          { id: 'amc', label: 'AMC Portal', icon: RefreshCw },
          { id: 'service', label: 'Service Desk', icon: Wrench },
          { id: 'ai', label: 'AI Assistant', icon: Bot },
          { id: 'referral', label: 'Referral Rewards', icon: Gift },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'profile', label: 'Account Profile', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 border-b-2 px-3.5 py-3 transition ${
                isActive
                  ? 'border-amber-400 text-amber-400 font-bold bg-amber-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: CUSTOMER DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>INSTALLED CAPACITY</span>
                <Zap className="h-4 w-4 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">550 kWp</div>
              <p className="text-xs text-slate-400">Mono PERC High Efficiency Array</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>TODAY'S GENERATION</span>
                <Sun className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-emerald-400">2,680.5 kWh</div>
              <p className="text-xs text-emerald-400/80 font-medium">82.4% Performance Ratio</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>LIFETIME SAVINGS</span>
                <DollarSign className="h-4 w-4 text-sky-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">₹42.80 Lakhs</div>
              <p className="text-xs text-slate-400">Displaced Grid Tariff Charges</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>ENVIRONMENTAL CO₂ OFFSET</span>
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-emerald-400">642.8 Tons</div>
              <p className="text-xs text-slate-400">Equiv. 25,700 Trees Planted</p>
            </div>
          </div>

          {/* Quick Action Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 text-sm flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Outstanding Invoice Notice
                </span>
                <span className="text-xs font-mono font-bold text-slate-300">INV-2026-042</span>
              </div>
              <p className="text-xs text-slate-300">
                Annual AMC Year 1 Service Invoice of <strong className="text-white">₹1,25,000</strong> is due on 15 Aug 2026.
              </p>
              <button
                onClick={() => setActiveTab('billing')}
                className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
              >
                Pay Online Now →
              </button>
            </div>

            <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-400 text-sm flex items-center gap-2">
                  <Wrench className="h-4 w-4" /> Scheduled Maintenance
                </span>
                <span className="text-xs font-bold text-emerald-400">ON TRACK</span>
              </div>
              <p className="text-xs text-slate-300">
                Robotic Panel Cleaning and Inverter Inspection scheduled for <strong className="text-white">10 Aug 2026</strong>.
              </p>
              <button
                onClick={() => setActiveTab('service')}
                className="rounded-lg bg-sky-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-sky-400 transition"
              >
                View Visit Calendar →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROJECT TRACKER */}
      {activeTab === 'projects' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">550 kWp Captive Rooftop Solar Plant</h2>
                <p className="text-xs text-slate-400">Project ID: PROJ-SUN-550KW • Commissioned Nov 15, 2025</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                100% COMMISSIONED & GRID SYNCHRONIZED
              </span>
            </div>

            {/* Milestones */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-200">Execution Timeline & Milestones</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {[
                  { name: 'Site Survey & Engineering Design', date: '10 Aug 2025', status: 'COMPLETED' },
                  { name: 'Procurement & Module Delivery', date: '02 Sep 2025', status: 'COMPLETED' },
                  { name: 'Structure Erection & Mounting', date: '25 Sep 2025', status: 'COMPLETED' },
                  { name: 'Inverter & Electrical Cabling', date: '20 Oct 2025', status: 'COMPLETED' },
                  { name: 'CEIG Inspection & DISCOM Approval', date: '05 Nov 2025', status: 'COMPLETED' },
                  { name: 'Plant Commissioning & Grid Sync', date: '15 Nov 2025', status: 'COMPLETED' },
                ].map((m) => (
                  <div key={m.name} className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-2">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>{m.name}</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <p className="text-slate-400 text-[11px]">{m.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineer Visits */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-200">Field Engineer Visits & Inspection Logs</h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-white">Rajesh Sharma (Lead SCADA Engineer)</p>
                    <p className="text-slate-400">Quarterly Maintenance & Inverter Calibration • 20 Jul 2026</p>
                  </div>
                  <span className="text-emerald-400 font-bold">COMPLETED</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-white">Amit Patel (Solar Field Tech)</p>
                    <p className="text-slate-400">Scheduled Thermal Imaging & Panel Washing • 10 Aug 2026</p>
                  </div>
                  <span className="text-amber-400 font-bold">SCHEDULED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LIVE SCADA DASHBOARD */}
      {activeTab === 'scada' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-1">
              <p className="text-xs text-slate-400 font-semibold">LIVE ACTIVE POWER</p>
              <p className="text-3xl font-extrabold text-amber-400">412.5 kW</p>
              <p className="text-[11px] text-slate-400">Peak Today: 510.2 kW</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-1">
              <p className="text-xs text-slate-400 font-semibold">PERFORMANCE RATIO (PR)</p>
              <p className="text-3xl font-extrabold text-emerald-400">82.4 %</p>
              <p className="text-[11px] text-emerald-400">Above Design SLA (80%)</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-1">
              <p className="text-xs text-slate-400 font-semibold">CAPACITY UTILISATION (CUF)</p>
              <p className="text-3xl font-extrabold text-sky-400">20.8 %</p>
              <p className="text-[11px] text-slate-400">High Solar Irradiation</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-1">
              <p className="text-xs text-slate-400 font-semibold">SOLAR IRRADIANCE (GHI)</p>
              <p className="text-3xl font-extrabold text-amber-400">840.5 W/m²</p>
              <p className="text-[11px] text-slate-400">Module Temp: 48.5 °C</p>
            </div>
          </div>

          {/* Inverters Status */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-400" />
              Central String Inverters Telemetry Status
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {[
                { id: 'INV-01', model: 'Sungrow 110kW', power: '104.2 kW', status: 'NORMAL', eff: '98.6%' },
                { id: 'INV-02', model: 'Sungrow 110kW', power: '103.8 kW', status: 'NORMAL', eff: '98.5%' },
                { id: 'INV-03', model: 'Sungrow 110kW', power: '102.1 kW', status: 'NORMAL', eff: '98.4%' },
                { id: 'INV-04', model: 'Sungrow 110kW', power: '102.4 kW', status: 'NORMAL', eff: '98.6%' },
              ].map((inv) => (
                <div key={inv.id} className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-2">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{inv.id}</span>
                    <span className="text-emerald-400 text-[11px]">{inv.status}</span>
                  </div>
                  <p className="text-slate-400">{inv.model}</p>
                  <p className="text-amber-400 font-bold text-sm">{inv.power}</p>
                  <p className="text-slate-500 text-[10px]">Efficiency: {inv.eff}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BILLING & PAYMENTS */}
      {activeTab === 'billing' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          <form onSubmit={handlePayInvoice} className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-amber-400" />
              Online Payment Portal
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-300">Select Invoice to Pay</label>
              <select className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100">
                <option value="INV-2026-042">INV-2026-042 - Annual AMC Year 1 (₹1,25,000)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Amount (INR)</label>
              <input
                type="text"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Payment Gateway Instrument</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              >
                <option value="UPI">UPI AutoPay / QR Code</option>
                <option value="NET_BANKING">Net Banking (HDFC, ICICI, SBI)</option>
                <option value="CREDIT_CARD">Corporate Credit Card</option>
                <option value="RAZORPAY">Razorpay Checkout</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition shadow-lg"
            >
              Proceed to Pay ₹{Number(paymentAmount).toLocaleString('en-IN')}
            </button>
          </form>

          {/* Invoice History */}
          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Invoice & Payment History</h2>
            <div className="space-y-3 text-xs">
              {[
                { no: 'INV-2026-042', title: 'Annual AMC Year 1 Service', amt: '₹1,25,000', status: 'UNPAID', date: 'Due 15 Aug 2026' },
                { no: 'INV-2025-882', title: 'Commissioning Balance Payment', amt: '₹12,50,000', status: 'PAID', date: 'Paid 22 Nov 2025' },
                { no: 'INV-2025-410', title: 'Equipment Delivery Milestone', amt: '₹25,00,000', status: 'PAID', date: 'Paid 05 Sep 2025' },
              ].map((inv) => (
                <div key={inv.no} className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-sm">{inv.title}</p>
                    <p className="text-slate-400">{inv.no} • {inv.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-amber-400 text-sm">{inv.amt}</p>
                    <span className={`text-[11px] font-bold ${inv.status === 'PAID' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DOCUMENT VAULT */}
      {activeTab === 'documents' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 animate-fadeIn">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-sky-400" />
            Customer Plant Document Vault
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              { type: 'QUOTATION', title: 'Approved EPC Quotation & Yield Model', size: '3.4 MB' },
              { type: 'INVOICE', title: 'Commissioning Tax Invoice (INV-2025-882)', size: '1.2 MB' },
              { type: 'RECEIPT', title: 'Final Payment Receipt (RCP-9021)', size: '850 KB' },
              { type: 'WARRANTY_CERTIFICATE', title: '25-Year Linear Warranty Certificate', size: '2.8 MB' },
              { type: 'AMC_AGREEMENT', title: '5-Year Gold AMC Agreement', size: '4.1 MB' },
              { type: 'COMMISSIONING_REPORT', title: 'CEIG CE-Grid Sync Report', size: '5.6 MB' },
            ].map((doc) => (
              <div key={doc.title} className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-semibold text-amber-400 text-[11px]">{doc.type}</span>
                  <span>{doc.size}</span>
                </div>
                <p className="font-bold text-white text-sm">{doc.title}</p>
                <button
                  onClick={() => showToast(`Downloading ${doc.title}...`)}
                  className="w-full rounded-lg bg-slate-800 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition flex items-center justify-center gap-2"
                >
                  <Download className="h-3.5 w-3.5 text-sky-400" /> Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: WARRANTY CENTER */}
      {activeTab === 'warranty' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              Active Equipment Warranties & Coverage
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {[
                { name: 'LONGi Solar 550W Mono PERC Panels', warranty: '25 Years Linear Power', status: 'ACTIVE', validTill: 'Nov 2050' },
                { name: 'Sungrow 110kW String Inverters (4 Units)', warranty: '10 Years Product Warranty', status: 'ACTIVE', validTill: 'Nov 2035' },
                { name: 'Galvanized Module Mounting Structure', warranty: '20 Years Wind & Corrosion', status: 'ACTIVE', validTill: 'Nov 2045' },
                { name: 'ABB AC/DC Electrical Distribution Panel', warranty: '5 Years Electrical Warranty', status: 'ACTIVE', validTill: 'Nov 2030' },
              ].map((w) => (
                <div key={w.name} className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-2">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{w.name}</span>
                    <span className="text-emerald-400 text-xs">{w.status}</span>
                  </div>
                  <p className="text-slate-400">{w.warranty}</p>
                  <p className="text-slate-500 text-[11px]">Valid Until: {w.validTill}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: AMC PORTAL */}
      {activeTab === 'amc' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-amber-400" />
                GOLD PREVENTIVE COMPREHENSIVE AMC PLAN
              </h2>
              <p className="text-xs text-slate-400">Valid: 15 Nov 2025 to 14 Nov 2026 • Annual Fee: ₹1,25,000</p>
            </div>

            <button
              onClick={() => showToast('AMC online renewal request initiated.')}
              className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
            >
              Renew AMC Plan Online
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <p className="font-bold text-slate-200">Included SLA Deliverables:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Automated Robotic Panel Cleaning Inspection',
                'Quarterly Thermal Imaging & Hotspot Sweep',
                'Inverter Calibration & Oil Checks',
                '24/7 SCADA AI Telemetry Monitoring',
                '4-Hour On-Site Emergency SLA Response',
                'Free Spare Replacement for Consumables',
              ].map((svc) => (
                <div key={svc} className="p-3 rounded-lg border border-slate-800 bg-slate-950 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-slate-200">{svc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: SERVICE DESK */}
      {activeTab === 'service' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          <form onSubmit={handleCreateTicket} className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Wrench className="h-5 w-5 text-sky-400" />
              Create Service Ticket
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-300">Category</label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              >
                <option value="PANEL_CLEANING">Panel Washing & Cleaning</option>
                <option value="INVERTER_FAULT">Inverter Error / Alarm</option>
                <option value="GRID_TRIP">DISCOM Grid Trip Inquiry</option>
                <option value="GENERAL_MAINTENANCE">General Inspection</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Subject</label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Description</label>
              <textarea
                value={ticketDesc}
                onChange={(e) => setTicketDesc(e.target.value)}
                rows={3}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-sky-500 py-2.5 text-sm font-bold text-slate-950 hover:bg-sky-400 transition"
            >
              Submit Ticket to O&M Desk
            </button>
          </form>

          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Active Tickets & Service History</h2>
            <div className="space-y-3 text-xs">
              {[
                { id: 'TKT-991204', subject: 'Post-Monsoon Dust Panel Washing Request', eng: 'Amit Patel', status: 'IN_PROGRESS', date: '03 Aug 2026' },
                { id: 'TKT-882102', subject: 'Inverter #02 Temp Sensor Probe Check', eng: 'Rajesh Sharma', status: 'RESOLVED', date: '13 Apr 2026' },
              ].map((tkt) => (
                <div key={tkt.id} className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">{tkt.subject}</p>
                    <p className="text-slate-400">{tkt.id} • Assigned: {tkt.eng}</p>
                  </div>
                  <span className={`font-bold ${tkt.status === 'RESOLVED' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {tkt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: AI ASSISTANT */}
      {activeTab === 'ai' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bot className="h-5 w-5 text-amber-400" />
            Sunite AI Solar Copilot
          </h2>

          <div className="h-80 overflow-y-auto space-y-4 p-4 rounded-lg border border-slate-800 bg-slate-950 text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-xl p-3.5 rounded-lg leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'bg-slate-900 text-slate-100 border border-slate-800'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1">{msg.time}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendAiMessage} className="flex gap-3">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask about generation, invoices, troubleshooting, energy savings..."
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition flex items-center gap-2"
            >
              <Send className="h-4 w-4" /> Ask Copilot
            </button>
          </form>
        </div>
      )}

      {/* TAB 10: REFERRAL REWARDS */}
      {activeTab === 'referral' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          <form onSubmit={handleSubmitReferral} className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Gift className="h-5 w-5 text-amber-400" />
              Refer a Business & Earn Cash Rewards
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-300">Friend / Business Contact Name</label>
              <input
                type="text"
                value={refName}
                onChange={(e) => setRefName(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Phone Number</label>
              <input
                type="text"
                value={refPhone}
                onChange={(e) => setRefPhone(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Estimated Plant Capacity (kWp)</label>
              <input
                type="text"
                value={refKw}
                onChange={(e) => setRefKw(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition"
            >
              Submit Referral (Earn ₹{Number(refKw) * 100})
            </button>
          </form>

          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Your Referral Rewards History</h2>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">Anand Textile Mills (200 kWp)</p>
                  <p className="text-slate-400">Referred on 12 May 2026</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-400">₹20,000 Paid</p>
                  <span className="text-[10px] text-slate-500">Bank Transfer Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 11: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 animate-fadeIn">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bell className="h-5 w-5 text-sky-400" />
            Customer Notification Stream (WhatsApp, Email, SMS, In-App)
          </h2>

          <div className="space-y-3 text-xs">
            {[
              { title: 'Scheduled Panel Washing Alert', body: 'Solar cleaning team scheduled to visit tomorrow at 9:30 AM.', channel: 'WHATSAPP', time: '10 mins ago' },
              { title: 'Monthly Yield Report Ready', body: 'July generation report ready for download (78,450 kWh).', channel: 'EMAIL', time: '2 days ago' },
              { title: 'AMC Renewal Due Notice', body: 'Invoice INV-2026-042 due on 15 Aug 2026.', channel: 'SMS', time: '5 days ago' },
            ].map((n, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">{n.title}</p>
                  <p className="text-slate-400">{n.body}</p>
                </div>
                <div className="text-right">
                  <span className="rounded bg-sky-500/10 px-2 py-1 text-sky-400 font-bold border border-sky-500/20 text-[10px]">
                    {n.channel}
                  </span>
                  <p className="text-slate-500 text-[10px] mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 12: PROFILE */}
      {activeTab === 'profile' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <User className="h-5 w-5 text-amber-400" />
            Customer Plant Profile & Utility Configuration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3 p-4 rounded-lg border border-slate-800 bg-slate-950">
              <p className="font-bold text-amber-400 text-sm">Personal & Commercial Details</p>
              <p>Company: <strong className="text-white">Sanand Industrial Polymers Ltd.</strong></p>
              <p>Contact Person: <strong className="text-white">Ketan Patel (Managing Director)</strong></p>
              <p>Email: <strong className="text-white">ketan@sanandpolymers.com</strong></p>
              <p>Phone: <strong className="text-white">+91 98250 11223</strong></p>
            </div>

            <div className="space-y-3 p-4 rounded-lg border border-slate-800 bg-slate-950">
              <p className="font-bold text-sky-400 text-sm">DISCOM Utility & Tariff Details</p>
              <p>DISCOM: <strong className="text-white">UGVCL (Uttar Gujarat Vij Company Ltd.)</strong></p>
              <p>Consumer No: <strong className="text-white">UGVCL-IND-908123</strong></p>
              <p>Contract Demand: <strong className="text-white">750 kVA</strong></p>
              <p>Grid Net-Metering: <strong className="text-emerald-400">ACTIVE & SYNCHRONIZED</strong></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
