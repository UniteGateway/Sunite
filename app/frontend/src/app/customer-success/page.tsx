'use client';

import React, { useState } from 'react';
import {
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Users,
  ShieldCheck,
  Zap,
  Building,
  Globe,
  Sparkles,
  BarChart3,
  FileCheck2,
  Clock,
  TrendingUp,
  Headphones,
  GraduationCap,
  BookOpen,
  MessageSquarePlus,
  Tag,
  Search,
  Calendar,
  Award,
  DollarSign,
  AlertCircle,
  ChevronRight,
  PlusCircle,
  CheckSquare,
  FileText,
  ThumbsUp,
  Send,
  Layers,
} from 'lucide-react';

export default function CustomerSuccessOpsPage() {
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'health'
    | 'implementation'
    | 'support'
    | 'training'
    | 'knowledge'
    | 'releases'
    | 'renewals'
  >('dashboard');

  // Interactive Toast State
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // State for Onboarding Modal / Form
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustTenant, setNewCustTenant] = useState('');
  const [newCsmName, setNewCsmName] = useState('Ananya Sharma');

  // State for Support Ticket Creation
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketPriority, setTicketPriority] = useState('HIGH');
  const [ticketCategory, setTicketCategory] = useState('SCADA');
  const [ticketDesc, setTicketDesc] = useState('');

  // State for Product Feedback Submission
  const [fbTitle, setFbTitle] = useState('');
  const [fbType, setFbType] = useState('FEATURE_REQUEST');
  const [fbDesc, setFbDesc] = useState('');

  // Handlers
  const handleOnboardCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName) return;
    showToast(`✅ Customer '${newCustName}' onboarded successfully & assigned to CSM ${newCsmName}`);
    setNewCustName('');
    setNewCustTenant('');
    setShowOnboardModal(false);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject) return;
    showToast(`✅ Support Ticket created successfully! Assigned to Tier-2 Support Engine (SLA: ${ticketPriority === 'CRITICAL' ? '1 Hour' : '4 Hours'})`);
    setTicketSubject('');
    setTicketDesc('');
  };

  const handleEnrollTraining = (courseTitle: string) => {
    showToast(`🎓 Successfully enrolled in '${courseTitle}'. Role learning path initialized.`);
  };

  const handleGoLiveSignOff = (projectId: string) => {
    showToast(`🎉 Go-Live Sign-off Certificate for '${projectId}' issued! Moved to Active Operations.`);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbTitle) return;
    showToast(`💡 Feedback '${fbTitle}' submitted to Product Operations Backlog.`);
    setFbTitle('');
    setFbDesc('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 space-y-8">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-emerald-500 px-5 py-3 text-slate-950 font-bold shadow-2xl animate-bounce">
          <Sparkles className="h-5 w-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              PHASE 14.2 CERTIFIED
            </span>
            <span className="text-xs text-slate-400">Commercial Launch & Product Operations</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-2 flex items-center gap-3">
            <HeartHandshake className="h-8 w-8 text-emerald-400" />
            Customer Success & Product Operations Platform
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            End-to-end customer lifecycle management, implementation tracking, support desk, training academy & release center
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowOnboardModal(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition shadow-lg"
          >
            <PlusCircle className="h-4 w-4" />
            Onboard New Customer
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>ACTIVE CUSTOMERS</span>
            <Users className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">142</div>
          <p className="text-xs text-emerald-400 font-medium">+18 Onboarded This Quarter</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>NET REVENUE RETAIN (NRR)</span>
            <TrendingUp className="h-4 w-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-sky-400">118.5%</div>
          <p className="text-xs text-slate-400">₹1.85 Cr Expansion ARR</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>AVG HEALTH SCORE</span>
            <Award className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">94 / 100</div>
          <p className="text-xs text-slate-400">88% Healthy | 3% At-Risk</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>OPEN SUPPORT TICKETS</span>
            <Headphones className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">7</div>
          <p className="text-xs text-emerald-400">1.8 Hr Avg Resolution Time</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>SATISFACTION (CSAT)</span>
            <Sparkles className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">4.9 / 5.0</div>
          <p className="text-xs text-slate-400">NPS Score 78 (Promoters)</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 text-xs font-medium">
        {[
          { id: 'dashboard', label: 'Executive CS Dashboard', icon: BarChart3 },
          { id: 'health', label: 'Customer Health & Risk Matrix', icon: Award },
          { id: 'implementation', label: 'Implementation & Go-Live', icon: FileCheck2 },
          { id: 'support', label: 'Support Desk & SLAs', icon: Headphones },
          { id: 'training', label: 'Training Academy', icon: GraduationCap },
          { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
          { id: 'releases', label: 'Release & Feedback Center', icon: MessageSquarePlus },
          { id: 'renewals', label: 'Renewal & Expansion Forecast', icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 border-b-2 px-3.5 py-3 transition ${
                isActive
                  ? 'border-emerald-400 text-emerald-400 font-bold bg-emerald-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXECUTIVE CS DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-400" />
                Customer Lifecycle Stage Distribution
              </h2>
              <div className="space-y-3 text-xs">
                {[
                  { stage: 'Prospect / Onboarding', count: 18, pct: '12.6%', color: 'bg-sky-500' },
                  { stage: 'Pilot & Go-Live', count: 12, pct: '8.4%', color: 'bg-amber-500' },
                  { stage: 'Active Operation', count: 85, pct: '59.8%', color: 'bg-emerald-500' },
                  { stage: 'Expansion / Upsell', count: 21, pct: '14.7%', color: 'bg-purple-500' },
                  { stage: 'Renewal & Advocate', count: 6, pct: '4.5%', color: 'bg-indigo-500' },
                ].map((item) => (
                  <div key={item.stage} className="space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>{item.stage}</span>
                      <span className="font-bold">{item.count} ({item.pct})</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: item.pct }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-400" />
                Executive Business Review (EBR) Schedule
              </h2>
              <div className="space-y-3 text-xs">
                {[
                  { customer: 'Sunite CleanEnergy India Pvt Ltd', csm: 'Ananya Sharma', date: 'Q3 2026 (Oct 15)', status: 'SCHEDULED' },
                  { customer: 'Gujarat Solar Parks & Infra', csm: 'Rajesh Verma', date: 'Q3 2026 (Sep 20)', status: 'PREPARING' },
                  { customer: 'Maharashtra Renewable Energy Corp', csm: 'Priya Nair', date: 'Q3 2026 (Aug 10)', status: 'URGENT_REVIEW' },
                ].map((ebr) => (
                  <div key={ebr.customer} className="p-3 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{ebr.customer}</p>
                      <p className="text-slate-400 text-[11px]">CSM: {ebr.csm} | Date: {ebr.date}</p>
                    </div>
                    <span className="rounded bg-emerald-500/10 px-2 py-1 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                      {ebr.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-sky-400" />
                Revenue Retention & Expansion ARR
              </h2>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
                  <p className="text-slate-400">Gross Recurring Revenue (ARR)</p>
                  <p className="text-xl font-extrabold text-white">₹ 12.50 Crore</p>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
                  <p className="text-slate-400">Expansion Opportunity Pipeline</p>
                  <p className="text-xl font-extrabold text-sky-400">₹ 1.85 Crore (+14.8%)</p>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
                  <p className="text-slate-400">Net Logo Churn Rate</p>
                  <p className="text-xl font-extrabold text-emerald-400">0.0% (Zero Logo Churn)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HEALTH & RISK MATRIX */}
      {activeTab === 'health' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                Enterprise Customer Health & Risk Matrix
              </h2>
              <p className="text-xs text-slate-400 mt-1">Calculated real-time from SCADA telemetry adoption, ticket resolution times, and feature usage</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: 'ORG-PILOT-001', name: 'Sunite CleanEnergy India Pvt Ltd', csm: 'Ananya Sharma', stage: 'ACTIVE', health: 96, adoption: 92, nrr: '125.0%', risk: 'LOW', ebr: 'Oct 15, 2026' },
              { id: 'ORG-CUST-102', name: 'Gujarat Solar Parks & Infrastructure', csm: 'Rajesh Verma', stage: 'EXPANSION', health: 91, adoption: 89, nrr: '118.0%', risk: 'LOW', ebr: 'Sep 20, 2026' },
              { id: 'ORG-CUST-103', name: 'Maharashtra Renewable Energy Corp', csm: 'Priya Nair', stage: 'ACTIVE', health: 78, adoption: 72, nrr: '102.0%', risk: 'MEDIUM', ebr: 'Aug 10, 2026' },
              { id: 'ORG-CUST-104', name: 'Rajasthan Clean Power Utility', csm: 'Amit Kumar', stage: 'ONBOARDING', health: 90, adoption: 85, nrr: '110.0%', risk: 'LOW', ebr: 'Nov 01, 2026' },
            ].map((c) => (
              <div key={c.id} className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm">{c.name}</span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">{c.id}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">CSM: <span className="text-slate-200 font-semibold">{c.csm}</span> | Stage: <span className="text-emerald-400 font-semibold">{c.stage}</span> | Next EBR: {c.ebr}</p>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div>
                    <p className="text-slate-400 text-[10px]">HEALTH SCORE</p>
                    <p className="text-base font-extrabold text-amber-400">{c.health} / 100</p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-[10px]">ADOPTION</p>
                    <p className="text-base font-extrabold text-sky-400">{c.adoption}%</p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-[10px]">RENEWAL RISK</p>
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                      c.risk === 'LOW'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {c.risk} RISK
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: IMPLEMENTATION & GO-LIVE */}
      {activeTab === 'implementation' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck2 className="h-5 w-5 text-emerald-400" />
                Implementation & Deployment Management
              </h2>
              <p className="text-xs text-slate-400 mt-1">Track deployment milestones, verification checklists, and issue digital acceptance certificates</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {[
              { id: 'IMP-701', name: 'Sunite CleanEnergy Phase 14 Pilot Go-Live', csm: 'Ananya Sharma', lead: 'Vikram Mehta', progress: 100, status: 'GO_LIVE_APPROVED', target: '2026-08-01' },
              { id: 'IMP-702', name: 'Rajasthan 100 MW Solar Plant SCADA Integration', csm: 'Rajesh Verma', lead: 'Amit Kumar', progress: 88, status: 'UAT_TESTING', target: '2026-08-15' },
              { id: 'IMP-703', name: 'Gujarat Utility Grid Substation SCADA Gateway', csm: 'Priya Nair', lead: 'Suresh Patel', progress: 45, status: 'IN_PROGRESS', target: '2026-09-01' },
            ].map((prj) => (
              <div key={prj.id} className="p-5 rounded-lg border border-slate-800 bg-slate-950 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-sm">{prj.name}</h3>
                    <p className="text-slate-400 text-[11px]">CSM: {prj.csm} | Lead Engineer: {prj.lead} | Target Go-Live: {prj.target}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-sky-500/10 px-2.5 py-1 text-sky-400 font-bold text-[10px] border border-sky-500/20">
                      {prj.status}
                    </span>
                    {prj.progress < 100 && (
                      <button
                        onClick={() => handleGoLiveSignOff(prj.id)}
                        className="rounded bg-emerald-500 px-3 py-1 text-slate-950 font-bold text-[11px] hover:bg-emerald-400 transition"
                      >
                        Issue Go-Live Certificate
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Implementation Milestone Progress</span>
                    <span className="font-bold text-emerald-400">{prj.progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${prj.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SUPPORT DESK */}
      {activeTab === 'support' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          <form onSubmit={handleCreateTicket} className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Headphones className="h-5 w-5 text-rose-400" />
              Create Support Ticket
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-300">Ticket Subject</label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g. Inverter Modbus Connection Lost"
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Priority</label>
                <select
                  value={ticketPriority}
                  onChange={(e) => setTicketPriority(e.target.value)}
                  className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
                >
                  <option value="LOW">LOW (24 Hours SLA)</option>
                  <option value="MEDIUM">MEDIUM (12 Hours SLA)</option>
                  <option value="HIGH">HIGH (4 Hours SLA)</option>
                  <option value="CRITICAL">CRITICAL (1 Hour SLA)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Category</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
                >
                  <option value="SCADA">SCADA IoT</option>
                  <option value="CRM">CRM & Leads</option>
                  <option value="ERP">ERP & Inventory</option>
                  <option value="FINANCE">Invoicing & Tax</option>
                  <option value="HARDWARE">Hardware / Inverter</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Issue Description</label>
              <textarea
                rows={3}
                value={ticketDesc}
                onChange={(e) => setTicketDesc(e.target.value)}
                placeholder="Detailed issue description..."
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-rose-500 py-2.5 text-xs font-bold text-white hover:bg-rose-400 transition"
            >
              Submit Support Ticket
            </button>
          </form>

          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Active Support Ticket Queue</h2>

            <div className="space-y-3 text-xs">
              {[
                { id: 'TCK-9001', subject: 'SCADA Modbus IP Telemetry Timeout', prio: 'HIGH', cat: 'SCADA', status: 'IN_PROGRESS', agent: 'Suresh Patel', sla: '45 mins remaining' },
                { id: 'TCK-9002', subject: 'GST Invoice Export PDF Customization', prio: 'MEDIUM', cat: 'FINANCE', status: 'RESOLVED', agent: 'Kavita Roy', sla: 'SLA Met' },
                { id: 'TCK-9003', subject: 'Android App Inverter Serial Barcode Scanner', prio: 'LOW', cat: 'MOBILE', status: 'OPEN', agent: 'Tier 1 Desk', sla: '18 hours remaining' },
              ].map((tck) => (
                <div key={tck.id} className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{tck.subject}</span>
                      <span className="text-slate-400 text-[10px]">({tck.id})</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">Category: {tck.cat} | Assigned: {tck.agent}</p>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <span className="rounded bg-rose-500/10 px-2.5 py-1 text-rose-400 font-bold text-[10px] border border-rose-500/20">
                      {tck.prio} ({tck.sla})
                    </span>
                    <span className="rounded bg-emerald-500/10 px-2.5 py-1 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                      {tck.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TRAINING ACADEMY */}
      {activeTab === 'training' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-amber-400" />
                Sunite Training Academy & Role Certification
              </h2>
              <p className="text-xs text-slate-400 mt-1">Role-based learning courses for Platform Admins, Field Engineers, and Finance teams</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {[
              { code: 'TRN-101', title: 'Sunite Platform Certified Administrator', role: 'ADMIN', time: '120 Mins (8 Modules)', score: '85% Passing Score', enrolled: 340, certified: 295 },
              { code: 'TRN-201', title: 'Solar Engineer SCADA Telemetry & Inverter Setup', role: 'FIELD_ENGINEER', time: '90 Mins (6 Modules)', score: '80% Passing Score', enrolled: 520, certified: 480 },
              { code: 'TRN-301', title: 'GST Invoicing, Subsidy & Finance Management', role: 'FINANCE', time: '60 Mins (4 Modules)', score: '80% Passing Score', enrolled: 210, certified: 198 },
            ].map((crs) => (
              <div key={crs.code} className="p-5 rounded-lg border border-slate-800 bg-slate-950 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-amber-500/10 px-2.5 py-1 text-amber-400 font-bold text-[10px] border border-amber-500/20">{crs.code}</span>
                    <span className="text-slate-400 text-[10px]">{crs.role}</span>
                  </div>
                  <h3 className="font-bold text-white text-sm">{crs.title}</h3>
                  <p className="text-slate-400 text-[11px]">{crs.time} • {crs.score}</p>
                  <p className="text-slate-500 text-[11px]">Enrolled: {crs.enrolled} | Certified: {crs.certified}</p>
                </div>

                <button
                  onClick={() => handleEnrollTraining(crs.title)}
                  className="w-full rounded bg-amber-500 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                >
                  Enroll & Start Course
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: KNOWLEDGE BASE */}
      {activeTab === 'knowledge' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-sky-400" />
                Knowledge Base & Documentation Center
              </h2>
              <p className="text-xs text-slate-400 mt-1">Self-service troubleshooting guides, installation manuals, and REST API docs</p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search Knowledge Base..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 pl-9 pr-3 py-2 text-xs text-slate-100"
              />
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: 'KB-101', title: 'Connecting Sungrow & Huawei Inverters to SCADA Gateway', cat: 'SCADA IoT Configuration', views: '1,240 views', votes: '382 helpful votes', snippet: 'Step-by-step guide on setting RS485 Modbus RTU register addresses and TCP port 502 mappings.' },
              { id: 'KB-102', title: 'Generating E-Invoices with 18% GST and State DISCOM Subsidies', cat: 'Finance & Tax Invoicing', views: '980 views', votes: '290 helpful votes', snippet: 'How to configure dynamic HSN code 8541 and auto-reconcile Razorpay online payments.' },
              { id: 'KB-103', title: 'REST API & Webhooks Quickstart Guide', cat: 'API Documentation', views: '1,850 views', votes: '610 helpful votes', snippet: 'Authentication headers, HMAC signatures, and event hooks for SCADA telemetry alerts.' },
            ].map((kb) => (
              <div key={kb.id} className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">{kb.title}</h3>
                  <span className="text-slate-400 text-[11px]">{kb.views} • {kb.votes}</span>
                </div>
                <p className="text-sky-400 font-semibold text-[11px]">{kb.cat}</p>
                <p className="text-slate-400 text-[12px]">{kb.snippet}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: RELEASE & FEEDBACK CENTER */}
      {activeTab === 'releases' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          <form onSubmit={handleSubmitFeedback} className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquarePlus className="h-5 w-5 text-emerald-400" />
              Submit Product Feedback
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-300">Feature Title</label>
              <input
                type="text"
                value={fbTitle}
                onChange={(e) => setFbTitle(e.target.value)}
                placeholder="e.g. Mobile App Dark Theme for Night SCADA"
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Feedback Type</label>
              <select
                value={fbType}
                onChange={(e) => setFbType(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              >
                <option value="FEATURE_REQUEST">Feature Request</option>
                <option value="BUG_REPORT">Bug Report</option>
                <option value="ENHANCEMENT">UX / UI Enhancement</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Description</label>
              <textarea
                rows={3}
                value={fbDesc}
                onChange={(e) => setFbDesc(e.target.value)}
                placeholder="Explain feature use case and impact..."
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition"
            >
              Submit Product Idea
            </button>
          </form>

          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Release Notes & Product Roadmap</h2>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-emerald-400 text-sm">v1.0.0-phase14.2 Commercial Launch Release</span>
                  <span className="text-slate-400 text-[10px]">Released: Aug 01, 2026</span>
                </div>
                <p className="text-slate-200">
                  Added Phase 14.2 Customer Success Platform, Implementation Management, Support Desk, Training Academy, and Release Center.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">v1.0.0-phase14.1 Production Pilot & Load Testing</span>
                  <span className="text-slate-400 text-[10px]">Released: Jul 28, 2026</span>
                </div>
                <p className="text-slate-400">
                  Validated 19-step E2E business workflow, 5,000 user load test, Docker & Kubernetes deployment manifests.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: RENEWALS & AMC FORECAST */}
      {activeTab === 'renewals' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-amber-400" />
                Subscription & AMC Renewal Forecast
              </h2>
              <p className="text-xs text-slate-400 mt-1">Predict contract renewals, track upcoming expirations, and automate payment reminders</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: 'RNW-101', name: 'Sunite CleanEnergy India Pvt Ltd', type: 'ENTERPRISE_SAAS', mrr: '₹5,00,000', arr: '₹60,00,000', expiry: 'Aug 01, 2027', likelihood: '98%', status: 'UPCOMING' },
              { id: 'RNW-102', name: 'Gujarat Solar Parks & Infrastructure', type: 'AMC_MAINTENANCE', mrr: '₹3,50,000', arr: '₹42,00,000', expiry: 'Sep 30, 2026', likelihood: '92%', status: 'UPCOMING' },
              { id: 'RNW-103', name: 'Maharashtra Renewable Energy Corp', type: 'GRID_LICENSE', mrr: '₹2,50,000', arr: '₹30,00,000', expiry: 'Oct 15, 2026', likelihood: '85%', status: 'RISK_ALERT' },
            ].map((rnw) => (
              <div key={rnw.id} className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-white text-sm">{rnw.name}</p>
                  <p className="text-slate-400 text-[11px]">Contract Type: {rnw.type} | Expiry: {rnw.expiry}</p>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div>
                    <p className="text-slate-400 text-[10px]">ARR VALUE</p>
                    <p className="text-base font-extrabold text-amber-400">{rnw.arr}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-[10px]">RENEWAL PROBABILITY</p>
                    <p className="text-base font-extrabold text-emerald-400">{rnw.likelihood}</p>
                  </div>

                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                    rnw.status === 'UPCOMING'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {rnw.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Onboarding Modal */}
      {showOnboardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <form onSubmit={handleOnboardCustomer} className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-emerald-400" />
              Onboard New Customer to CS Center
            </h3>

            <div>
              <label className="font-semibold text-slate-300">Customer Organization Name</label>
              <input
                type="text"
                required
                value={newCustName}
                onChange={(e) => setNewCustName(e.target.value)}
                placeholder="e.g. Tamil Nadu CleanPower Corp"
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300">Tenant ID</label>
              <input
                type="text"
                value={newCustTenant}
                onChange={(e) => setNewCustTenant(e.target.value)}
                placeholder="e.g. ORG-TN-202"
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300">Assigned Customer Success Manager (CSM)</label>
              <select
                value={newCsmName}
                onChange={(e) => setNewCsmName(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              >
                <option value="Ananya Sharma">Ananya Sharma (Senior CSM)</option>
                <option value="Rajesh Verma">Rajesh Verma (CSM Lead)</option>
                <option value="Priya Nair">Priya Nair (Enterprise CSM)</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowOnboardModal(false)}
                className="w-1/2 rounded-lg border border-slate-700 py-2 text-slate-400 font-bold hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 rounded-lg bg-emerald-500 py-2 text-slate-950 font-bold hover:bg-emerald-400"
              >
                Onboard Customer
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
