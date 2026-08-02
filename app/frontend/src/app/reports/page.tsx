'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Zap,
  Users,
  Building2,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  PieChart as PieChartIcon,
  ShieldCheck,
  Award,
  Layers,
  FileSpreadsheet,
  FileText,
  Clock,
  CheckCircle2,
  Send,
  Sparkles,
  ArrowUpRight,
  Sun,
  Activity,
  ChevronRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#6366f1', '#14b8a6'];

export default function BusinessIntelligencePage() {
  const [activeTab, setActiveTab] = useState<'executive' | 'analytics' | 'builder' | 'schedule'>('executive');
  const [subAnalyticsTab, setSubAnalyticsTab] = useState<'sales' | 'finance' | 'projects' | 'scada' | 'service' | 'carbon'>('sales');

  // Custom Builder State
  const [reportName, setReportName] = useState('Quarterly Commercial Solar Sales');
  const [entityType, setEntityType] = useState('SALES');
  const [selectedColumns, setSelectedColumns] = useState(['Lead Source', 'Deal Value', 'Conversion Rate', 'Executive']);
  const [chartType, setChartType] = useState('BAR');
  const [customReportData, setCustomReportData] = useState<any>(null);

  // Schedule State
  const [schedName, setSchedName] = useState('Executive Weekly Digest');
  const [schedType, setSchedType] = useState('DASHBOARD');
  const [schedFreq, setSchedFreq] = useState('WEEKLY');
  const [schedEmail, setSchedEmail] = useState('csuite@sunite.com, finance@sunite.com');
  const [schedFormat, setSchedFormat] = useState('PDF');

  // Export State
  const [exporting, setExporting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Mock Executive Dashboard Data
  const revenueTrend = [
    { month: 'Jan 26', revenue: 11.2, profit: 2.3 },
    { month: 'Feb 26', revenue: 12.1, profit: 2.5 },
    { month: 'Mar 26', revenue: 13.5, profit: 2.8 },
    { month: 'Apr 26', revenue: 14.2, profit: 2.95 },
    { month: 'May 26', revenue: 15.1, profit: 3.2 },
    { month: 'Jun 26', revenue: 16.8, profit: 3.55 },
  ];

  const projectStageDistribution = [
    { name: 'Survey & PVsyst', value: 76 },
    { name: 'DISCOM Approval', value: 28 },
    { name: 'Procurement & Civil', value: 40 },
    { name: 'Wiring & Metering', value: 27 },
    { name: 'Commissioned', value: 139 },
  ];

  const scadaGenTrend = [
    { day: 'Mon', kwh: 41200, pr: 82.1 },
    { day: 'Tue', kwh: 43500, pr: 83.4 },
    { day: 'Wed', kwh: 39800, pr: 80.9 },
    { day: 'Thu', kwh: 44100, pr: 84.0 },
    { day: 'Fri', kwh: 42900, pr: 82.8 },
    { day: 'Sat', kwh: 45200, pr: 84.5 },
    { day: 'Sun', kwh: 43800, pr: 83.0 },
  ];

  const leadSourcesData = [
    { name: 'Direct Outreach', value: 185 },
    { name: 'Franchise Partner', value: 142 },
    { name: 'Digital Web', value: 210 },
    { name: 'DISCOM Tenders', value: 48 },
  ];

  const handleRunCustomReport = () => {
    setCustomReportData({
      columns: selectedColumns,
      rows: [
        { id: 'REC-101', entity: 'Torrent Pharma 500kW', category: 'Commercial', dealValue: '₹2.85 Cr', exec: 'Amit Sharma', conversion: '42%' },
        { id: 'REC-102', entity: 'Nirma Bhavnagar 1.2MW', category: 'Industrial', dealValue: '₹6.20 Cr', exec: 'Priya Patel', conversion: '38%' },
        { id: 'REC-103', entity: 'Shree Ram Cotton 250kW', category: 'Textile', dealValue: '₹1.45 Cr', exec: 'Rajesh Verma', conversion: '31%' },
        { id: 'REC-104', entity: 'Adani Logistics 1.5MW', category: 'Logistics', dealValue: '₹7.80 Cr', exec: 'Amit Sharma', conversion: '45%' },
        { id: 'REC-105', entity: 'GIDC Sanand Cluster', category: 'Industrial', dealValue: '₹4.90 Cr', exec: 'Sanjay Mehta', conversion: '29%' },
      ],
    });
    showToast('Custom Report Query Executed Successfully!');
  };

  const handleExport = (format: string) => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      const filename = `sunite_enterprise_report_${format.toLowerCase()}_${Date.now()}.${format.toLowerCase()}`;
      showToast(`Export complete! Generated file: ${filename}`);
    }, 1200);
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Recurring schedule created: "${schedName}" (${schedFreq}) to ${schedEmail}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-emerald-500 px-5 py-3 text-slate-950 font-bold shadow-2xl animate-bounce">
          <Sparkles className="h-5 w-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
              PHASE 13.3 CERTIFIED
            </span>
            <span className="text-xs text-slate-400">Enterprise Business Intelligence</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-2 flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-amber-400" />
            Executive BI & Analytics Portal
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time cross-functional analytics, CEO decision dashboards, custom report builder, and automated export engine.
          </p>
        </div>

        {/* Global Action Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExport('PDF')}
            disabled={exporting}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400 transition shadow-lg"
          >
            <Download className="h-4 w-4" />
            {exporting ? 'Generating...' : 'Export PDF Report'}
          </button>
          <button
            onClick={() => handleExport('EXCEL')}
            className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-700 border border-slate-700 transition"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
            Excel Export
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 text-sm font-medium">
        <button
          onClick={() => setActiveTab('executive')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 transition ${
            activeTab === 'executive'
              ? 'border-amber-400 text-amber-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          Executive CEO Dashboard
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 transition ${
            activeTab === 'analytics'
              ? 'border-amber-400 text-amber-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="h-4 w-4" />
          Department Analytics
        </button>

        <button
          onClick={() => setActiveTab('builder')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 transition ${
            activeTab === 'builder'
              ? 'border-amber-400 text-amber-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="h-4 w-4" />
          Custom Report Builder
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 transition ${
            activeTab === 'schedule'
              ? 'border-amber-400 text-amber-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="h-4 w-4" />
          Export & Schedules
        </button>
      </div>

      {/* TAB 1: EXECUTIVE CEO DASHBOARD */}
      {activeTab === 'executive' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Executive KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <span>Total Billed Revenue</span>
                <DollarSign className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">₹14.85 Cr</div>
              <div className="flex items-center justify-between text-xs text-emerald-400">
                <span className="flex items-center gap-1 font-semibold">
                  <ArrowUpRight className="h-3.5 w-3.5" /> +24.5% YoY
                </span>
                <span className="text-slate-500">Target: ₹15.0 Cr</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <span>Net EBITDA Profit</span>
                <TrendingUp className="h-4 w-4 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-amber-400">₹3.12 Cr</div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Net Margin: <strong className="text-amber-400">21.0%</strong></span>
                <span className="text-emerald-400">Healthy</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <span>Installed Solar Capacity</span>
                <Zap className="h-4 w-4 text-sky-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">48.5 MW</div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Annual Gen: <strong className="text-slate-200">72.4 GWh</strong></span>
                <span className="text-sky-400">PR 81.4%</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <span>AI Health Score</span>
                <Award className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-emerald-400">94 / 100</div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Risk Level: <strong className="text-emerald-400">LOW</strong></span>
                <span className="text-slate-500">Audit Certified</span>
              </div>
            </div>
          </div>

          {/* Revenue & Profit Trends Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Monthly Revenue & Profit Trajectory</h2>
                  <p className="text-xs text-slate-400">FY 2026-27 Revenue (Cr) vs Net Operating Profit (Cr)</p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-block h-3 w-3 rounded bg-amber-400"></span> Revenue
                  <span className="inline-block h-3 w-3 rounded bg-emerald-400 ml-2"></span> Profit
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueTrend}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fillOpacity={1} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProf)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Solar Projects Stage Breakdown */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold text-white">Project Pipeline Distribution</h2>
                <p className="text-xs text-slate-400">310 Active Solar Projects by Phase</p>
              </div>

              <div className="h-60 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={projectStageDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                      {projectStageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs">
                {projectStageDistribution.map((item, idx) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                      {item.name}
                    </span>
                    <strong className="text-slate-200">{item.value} Projects</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEPARTMENT ANALYTICS SUITE */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Sub-navigation for Departmental Analytics */}
          <div className="flex flex-wrap gap-2 rounded-xl bg-slate-900 p-2 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setSubAnalyticsTab('sales')}
              className={`px-4 py-2 rounded-lg transition ${
                subAnalyticsTab === 'sales' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sales & Funnel Analytics
            </button>
            <button
              onClick={() => setSubAnalyticsTab('finance')}
              className={`px-4 py-2 rounded-lg transition ${
                subAnalyticsTab === 'finance' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Finance & Profitability
            </button>
            <button
              onClick={() => setSubAnalyticsTab('projects')}
              className={`px-4 py-2 rounded-lg transition ${
                subAnalyticsTab === 'projects' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Project Execution & Delays
            </button>
            <button
              onClick={() => setSubAnalyticsTab('scada')}
              className={`px-4 py-2 rounded-lg transition ${
                subAnalyticsTab === 'scada' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              AI-SCADA Plant Performance
            </button>
            <button
              onClick={() => setSubAnalyticsTab('service')}
              className={`px-4 py-2 rounded-lg transition ${
                subAnalyticsTab === 'service' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Service & AMC Tickets
            </button>
            <button
              onClick={() => setSubAnalyticsTab('carbon')}
              className={`px-4 py-2 rounded-lg transition ${
                subAnalyticsTab === 'carbon' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Carbon ESG & Credits
            </button>
          </div>

          {/* Sub-tab 1: Sales Analytics */}
          {subAnalyticsTab === 'sales' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Lead Source Conversion & Acquisition</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leadSourcesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                      <Bar dataKey="value" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Top Sales Executives (Revenue Billed)</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { name: 'Amit Sharma', region: 'Gujarat (Ahmedabad)', deals: 28, revenue: '₹3.42 Cr' },
                    { name: 'Priya Patel', region: 'Gujarat (Surat)', deals: 24, revenue: '₹2.95 Cr' },
                    { name: 'Rajesh Verma', region: 'Maharashtra (Pune)', deals: 19, revenue: '₹2.40 Cr' },
                    { name: 'Sanjay Mehta', region: 'Rajasthan (Jaipur)', deals: 16, revenue: '₹1.85 Cr' },
                  ].map((exec) => (
                    <div key={exec.name} className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div>
                        <p className="font-semibold text-slate-200">{exec.name}</p>
                        <p className="text-xs text-slate-400">{exec.region} • {exec.deals} Deals</p>
                      </div>
                      <span className="font-bold text-amber-400">{exec.revenue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab 4: AI-SCADA Plant Performance */}
          {subAnalyticsTab === 'scada' && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <h3 className="text-base font-bold text-white">7-Day Generation Trend & Performance Ratio (PR %)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scadaGenTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="day" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                    <Bar dataKey="kwh" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Sub-tab 6: Carbon ESG */}
          {subAnalyticsTab === 'carbon' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-2 text-center">
                <Sun className="h-8 w-8 text-amber-400 mx-auto" />
                <h4 className="text-xs font-semibold text-slate-400 uppercase">CO2 Offset Total</h4>
                <p className="text-3xl font-extrabold text-white">59,368 Tons</p>
                <p className="text-xs text-emerald-400">Equivalent to 2.72M Trees</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-2 text-center">
                <Zap className="h-8 w-8 text-sky-400 mx-auto" />
                <h4 className="text-xs font-semibold text-slate-400 uppercase">Coal Burn Avoided</h4>
                <p className="text-3xl font-extrabold text-white">23,890 Tons</p>
                <p className="text-xs text-sky-400">Clean Energy Generation</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-2 text-center">
                <Award className="h-8 w-8 text-emerald-400 mx-auto" />
                <h4 className="text-xs font-semibold text-slate-400 uppercase">Carbon Credit Value</h4>
                <p className="text-3xl font-extrabold text-emerald-400">₹3.56 Cr</p>
                <p className="text-xs text-slate-400">Monetized ESG Yield</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CUSTOM DRAG & DROP REPORT BUILDER */}
      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          {/* Query Configuration Options */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-amber-400" />
              Report Builder Controls
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-300">Report Title</label>
              <input
                type="text"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Target Entity</label>
              <select
                value={entityType}
                onChange={(e) => setEntityType(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
              >
                <option value="SALES">Sales & Leads</option>
                <option value="PROJECT">Solar Projects</option>
                <option value="FINANCE">Finance & Invoices</option>
                <option value="SCADA">SCADA Plant Telemetry</option>
                <option value="SERVICE">Service & AMC</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Select Columns to Include</label>
              <div className="mt-2 space-y-2 text-xs">
                {['Lead Source', 'Deal Value', 'Conversion Rate', 'Executive', 'Project MW', 'Client Region'].map((col) => (
                  <label key={col} className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(col)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedColumns([...selectedColumns, col]);
                        else setSelectedColumns(selectedColumns.filter((c) => c !== col));
                      }}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-400"
                    />
                    {col}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Visualization Chart Type</label>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs font-medium">
                {['BAR', 'LINE', 'PIE', 'RADAR'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setChartType(t)}
                    className={`py-2 rounded-lg border transition ${
                      chartType === t
                        ? 'border-amber-400 bg-amber-500/10 text-amber-400 font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t} Chart
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRunCustomReport}
              className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Execute Query & Render Report
            </button>
          </div>

          {/* Live Data Preview */}
          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">{reportName}</h2>
                <p className="text-xs text-slate-400">Custom Query Execution Results ({entityType})</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                LIVE RUN
              </span>
            </div>

            {customReportData ? (
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                      <tr>
                        {customReportData.columns.map((col: string) => (
                          <th key={col} className="p-3 border-b border-slate-800">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      {customReportData.rows.map((row: any) => (
                        <tr key={row.id} className="hover:bg-slate-800/40">
                          <td className="p-3 font-semibold text-white">{row.entity}</td>
                          <td className="p-3 font-bold text-amber-400">{row.dealValue}</td>
                          <td className="p-3 text-emerald-400">{row.conversion}</td>
                          <td className="p-3">{row.exec}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center text-slate-500 space-y-3">
                <Filter className="h-10 w-10 text-slate-600 animate-pulse" />
                <p>Configure query parameters on the left and click "Execute Query".</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: EXPORT & AUTOMATED RECURRING SCHEDULES */}
      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
          {/* Recurring Schedule Creator */}
          <form onSubmit={handleCreateSchedule} className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-400" />
              Schedule Automated Recurring Report
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-300">Schedule Name</label>
              <input
                type="text"
                required
                value={schedName}
                onChange={(e) => setSchedName(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Report Category</label>
                <select
                  value={schedType}
                  onChange={(e) => setSchedType(e.target.value)}
                  className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
                >
                  <option value="DASHBOARD">Executive CEO Digest</option>
                  <option value="SALES">Sales Performance</option>
                  <option value="FINANCE">Finance & P&L</option>
                  <option value="SCADA">SCADA Telemetry</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Frequency</label>
                <select
                  value={schedFreq}
                  onChange={(e) => setSchedFreq(e.target.value)}
                  className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
                >
                  <option value="DAILY">Daily at 08:00 AM</option>
                  <option value="WEEKLY">Weekly (Mondays)</option>
                  <option value="MONTHLY">Monthly (1st Day)</option>
                  <option value="QUARTERLY">Quarterly Audit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Recipients Email (Comma Separated)</label>
              <input
                type="text"
                required
                value={schedEmail}
                onChange={(e) => setSchedEmail(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              Save & Activate Schedule
            </button>
          </form>

          {/* Active Automated Schedules List */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Active Recurring Schedules</h2>
            <div className="space-y-3 text-xs">
              {[
                { name: 'Executive CEO Weekly Summary', type: 'DASHBOARD', freq: 'WEEKLY', status: 'ACTIVE', nextRun: 'Mon, Aug 04 08:00 AM' },
                { name: 'Monthly Finance & P&L Statement', type: 'FINANCE', freq: 'MONTHLY', status: 'ACTIVE', nextRun: 'Sep 01 06:00 AM' },
                { name: 'Daily SCADA Solar Plant Audit', type: 'SCADA', freq: 'DAILY', status: 'ACTIVE', nextRun: 'Tomorrow 08:00 AM' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-950">
                  <div>
                    <p className="font-semibold text-slate-200">{item.name}</p>
                    <p className="text-slate-400 mt-0.5">{item.freq} • Next Run: <strong className="text-amber-400">{item.nextRun}</strong></p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-bold text-emerald-400 border border-emerald-500/20">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
