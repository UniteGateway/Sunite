'use client';

import React, { useState } from 'react';
import {
  Building,
  CreditCard,
  Key,
  BarChart3,
  Globe,
  ShoppingBag,
  Users,
  Award,
  Sparkles,
  TrendingUp,
  DollarSign,
  Plus,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  Download,
  Settings,
  ShieldCheck,
  Zap,
  Check,
  Send,
  Layers,
  Activity,
  ChevronRight,
  ExternalLink,
  Sliders,
  Calendar,
  Lock,
} from 'lucide-react';

export default function SaasMultiTenantPlatformPage() {
  const [activeTab, setActiveTab] = useState<
    | 'global'
    | 'tenants'
    | 'subscriptions'
    | 'licenses'
    | 'metering'
    | 'whitelabel'
    | 'marketplace'
    | 'reseller'
    | 'success'
  >('global');

  // Interactive Toast State
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Tenant Creation State
  const [tenantName, setTenantName] = useState('Adani Green Energy Solar');
  const [tenantDomain, setTenantDomain] = useState('adani.sunite.io');
  const [tenantPlan, setTenantPlan] = useState('ENTERPRISE');
  const [tenantMw, setTenantMw] = useState('250');

  // License Creation State
  const [licTenantId, setLicTenantId] = useState('TENANT-001');
  const [licType, setLicType] = useState('ENTERPRISE');
  const [licFlags, setLicFlags] = useState('CRM,ERP,SCADA,AI,FINANCE,INVENTORY,WARRANTY,AMC,BI,API_ACCESS,WHITE_LABEL');

  // Subscription Creation State
  const [subCycle, setSubCycle] = useState('ANNUAL');
  const [subAmount, setSubAmount] = useState('350000');
  const [subGateway, setSubGateway] = useState('RAZORPAY');

  // Reseller State
  const [resellerName, setResellerName] = useState('SunTech CleanEnergy Pvt Ltd');
  const [resellerEmail, setResellerEmail] = useState('partners@suntech.com');
  const [resellerCommission, setResellerCommission] = useState('15');

  // Action Handlers
  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Tenant '${tenantName}' provisioned successfully on domain '${tenantDomain}'.`);
  };

  const handleIssueLicense = (e: React.FormEvent) => {
    e.preventDefault();
    const key = `SUN-LIC-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    showToast(`Enterprise License Key '${key}' issued with flags: [${licFlags}]`);
  };

  const handleCreateSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Subscription created for ${subCycle} cycle (₹${Number(subAmount).toLocaleString('en-IN')}) via ${subGateway}.`);
  };

  const handleOnboardReseller = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Reseller '${resellerName}' onboarded with ${resellerCommission}% commission rate.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 space-y-8">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-amber-500 px-5 py-3 text-slate-950 font-bold shadow-2xl animate-bounce">
          <Sparkles className="h-5 w-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
              SUNITE ENTERPRISE PHASE 13.6
            </span>
            <span className="text-xs text-slate-400">Multi-Tenant SaaS Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-2 flex items-center gap-3">
            <Building className="h-8 w-8 text-amber-400" />
            SaaS Platform & Tenant Management Console
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Global Licensing, Subscription Billing, B2B Marketplace, White Label & Customer Success Platform
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2 text-right">
            <div className="text-[10px] text-slate-400 font-bold">MONTHLY RECURRING REVENUE (MRR)</div>
            <div className="text-lg font-extrabold text-amber-400">₹18.50 Lakhs</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2 text-right">
            <div className="text-[10px] text-slate-400 font-bold">ANNUAL RECURRING REVENUE (ARR)</div>
            <div className="text-lg font-extrabold text-emerald-400">₹2.22 Cr</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 text-xs font-medium">
        {[
          { id: 'global', label: 'Global Admin Dashboard', icon: BarChart3 },
          { id: 'tenants', label: 'Tenant Management', icon: Building },
          { id: 'subscriptions', label: 'Subscriptions & Billing', icon: CreditCard },
          { id: 'licenses', label: 'Licenses & Feature Flags', icon: Key },
          { id: 'metering', label: 'Usage Metering', icon: Activity },
          { id: 'whitelabel', label: 'White Label Branding', icon: Globe },
          { id: 'marketplace', label: 'Solar B2B Marketplace', icon: ShoppingBag },
          { id: 'reseller', label: 'Reseller & Partner Portal', icon: Users },
          { id: 'success', label: 'Customer Success', icon: Award },
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

      {/* TAB 1: GLOBAL ADMIN DASHBOARD */}
      {activeTab === 'global' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key SaaS Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>ACTIVE TENANTS</span>
                <Building className="h-4 w-4 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">18 Tenants</div>
              <p className="text-xs text-emerald-400/80 font-medium">+3 Provisioned This Month</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>TOTAL MANAGED CAPACITY</span>
                <Zap className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-emerald-400">1,450 MWp</div>
              <p className="text-xs text-slate-400">Across Rooftop & Utility Parks</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>NET RETENTION RATE (NRR)</span>
                <TrendingUp className="h-4 w-4 text-sky-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">118 %</div>
              <p className="text-xs text-sky-400/80 font-medium">Strong Enterprise Expansion</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>CHURN RATE</span>
                <AlertTriangle className="h-4 w-4 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">0.8 %</div>
              <p className="text-xs text-emerald-400/80 font-medium">99.2% Renewal Rate</p>
            </div>
          </div>

          {/* Revenue & Tier Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center justify-between">
                <span>Enterprise Tenant Overview</span>
                <button
                  onClick={() => setActiveTab('tenants')}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  Manage Tenants →
                </button>
              </h2>

              <div className="space-y-3 text-xs">
                {[
                  { name: 'Tata Power Renewable Ltd.', domain: 'tatapower.sunite.io', plan: 'UTILITY_GRID', capacity: '450 MW', status: 'ACTIVE', mrr: '₹4,50,000' },
                  { name: 'Adani Green Energy Ltd.', domain: 'adani.sunite.io', plan: 'ENTERPRISE', capacity: '350 MW', status: 'ACTIVE', mrr: '₹3,50,000' },
                  { name: 'ReNew Power Solar', domain: 'renew.sunite.io', plan: 'ENTERPRISE', capacity: '280 MW', status: 'ACTIVE', mrr: '₹3,50,000' },
                  { name: 'Sanand Industrial Polymers', domain: 'sanand.sunite.io', plan: 'ENTERPRISE', capacity: '550 kW', status: 'ACTIVE', mrr: '₹1,25,000' },
                ].map((t) => (
                  <div key={t.name} className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white text-sm">{t.name}</p>
                      <p className="text-slate-400">{t.domain} • Plan: {t.plan} • {t.capacity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-amber-400 text-sm">{t.mrr} / mo</p>
                      <span className="text-emerald-400 font-bold text-[11px]">{t.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">License Distribution</h2>
              <div className="space-y-3 text-xs">
                {[
                  { tier: 'Enterprise Tier', count: 12, pct: '66.7%' },
                  { tier: 'Utility / Grid Tier', count: 4, pct: '22.2%' },
                  { tier: 'Professional Tier', count: 2, pct: '11.1%' },
                ].map((l) => (
                  <div key={l.tier} className="p-3 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{l.tier}</p>
                      <p className="text-slate-400">{l.count} Tenants</p>
                    </div>
                    <span className="font-extrabold text-amber-400">{l.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TENANT MANAGEMENT */}
      {activeTab === 'tenants' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          <form onSubmit={handleCreateTenant} className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="h-5 w-5 text-amber-400" />
              Provision New Tenant
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-300">Tenant Name</label>
              <input
                type="text"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Custom Domain / Subdomain</label>
              <input
                type="text"
                value={tenantDomain}
                onChange={(e) => setTenantDomain(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Subscription Tier</label>
              <select
                value={tenantPlan}
                onChange={(e) => setTenantPlan(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              >
                <option value="STARTER">Starter Tier</option>
                <option value="PROFESSIONAL">Professional Tier</option>
                <option value="ENTERPRISE">Enterprise Tier</option>
                <option value="UTILITY">Utility / Grid Tier</option>
                <option value="GOVERNMENT">Government / PSU Tier</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Managed Capacity (MWp)</label>
              <input
                type="text"
                value={tenantMw}
                onChange={(e) => setTenantMw(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition shadow-lg"
            >
              Provision Tenant Workspace
            </button>
          </form>

          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Active Provisioned Tenants</h2>
            <div className="space-y-3 text-xs">
              {[
                { name: 'Tata Power Renewable Ltd.', domain: 'tatapower.sunite.io', plan: 'UTILITY_GRID', users: '150 Users', mw: '450 MW' },
                { name: 'Adani Green Energy Ltd.', domain: 'adani.sunite.io', plan: 'ENTERPRISE', users: '100 Users', mw: '350 MW' },
                { name: 'ReNew Power Solar', domain: 'renew.sunite.io', plan: 'ENTERPRISE', users: '90 Users', mw: '280 MW' },
                { name: 'Sanand Industrial Polymers', domain: 'sanand.sunite.io', plan: 'ENTERPRISE', users: '25 Users', mw: '550 kW' },
              ].map((t) => (
                <div key={t.name} className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-slate-400">{t.domain} • {t.users} • {t.mw}</p>
                  </div>
                  <span className="rounded bg-emerald-500/10 px-3 py-1 text-emerald-400 font-bold border border-emerald-500/20 text-[11px]">
                    ACTIVE
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUBSCRIPTIONS & BILLING */}
      {activeTab === 'subscriptions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          <form onSubmit={handleCreateSubscription} className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-amber-400" />
              Subscription Engine
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-300">Billing Cycle</label>
              <select
                value={subCycle}
                onChange={(e) => setSubCycle(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              >
                <option value="MONTHLY">Monthly Billing</option>
                <option value="QUARTERLY">Quarterly Billing</option>
                <option value="HALF_YEARLY">Half-Yearly Billing</option>
                <option value="ANNUAL">Annual Billing (15% Disc)</option>
                <option value="LIFETIME">Lifetime Enterprise</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Subscription Amount (INR)</label>
              <input
                type="text"
                value={subAmount}
                onChange={(e) => setSubAmount(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Payment Gateway</label>
              <select
                value={subGateway}
                onChange={(e) => setSubGateway(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              >
                <option value="RAZORPAY">Razorpay Subscription Autopay</option>
                <option value="STRIPE">Stripe Billing</option>
                <option value="PHONEPE">PhonePe Business</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition"
            >
              Activate Subscription Plan
            </button>
          </form>

          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Subscription Ledger & Invoices</h2>
            <div className="space-y-3 text-xs">
              {[
                { no: 'INV-SAAS-901', tenant: 'Tata Power Renewable Ltd.', plan: 'UTILITY_GRID', amt: '₹4,50,000', status: 'PAID', cycle: 'ANNUAL' },
                { no: 'INV-SAAS-902', tenant: 'Adani Green Energy Ltd.', plan: 'ENTERPRISE', amt: '₹3,50,000', status: 'PAID', cycle: 'ANNUAL' },
                { no: 'INV-SAAS-903', tenant: 'ReNew Power Solar', plan: 'ENTERPRISE', amt: '₹3,50,000', status: 'ISSUED_UNPAID', cycle: 'ANNUAL' },
              ].map((inv) => (
                <div key={inv.no} className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-sm">{inv.tenant}</p>
                    <p className="text-slate-400">{inv.no} • Plan: {inv.plan} ({inv.cycle})</p>
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

      {/* TAB 4: LICENSES & FEATURE FLAGS */}
      {activeTab === 'licenses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          <form onSubmit={handleIssueLicense} className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Key className="h-5 w-5 text-amber-400" />
              Issue License Key
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-300">Target Tenant ID</label>
              <input
                type="text"
                value={licTenantId}
                onChange={(e) => setLicTenantId(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">License Tier</label>
              <select
                value={licType}
                onChange={(e) => setLicType(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              >
                <option value="COMMUNITY">Community</option>
                <option value="STARTER">Starter</option>
                <option value="PROFESSIONAL">Professional</option>
                <option value="ENTERPRISE">Enterprise</option>
                <option value="UTILITY">Utility</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Enabled Feature Flags</label>
              <textarea
                value={licFlags}
                onChange={(e) => setLicFlags(e.target.value)}
                rows={3}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-100 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition"
            >
              Generate & Assign License
            </button>
          </form>

          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Active License Key Registry</h2>
            <div className="space-y-3 text-xs">
              {[
                { key: 'SUN-LIC-901823', tenant: 'Tata Power Renewable', type: 'UTILITY_GRID', flags: 'CRM,ERP,SCADA,AI,FINANCE,BI,WHITE_LABEL' },
                { key: 'SUN-LIC-881204', tenant: 'Adani Green Energy', type: 'ENTERPRISE', flags: 'CRM,ERP,SCADA,AI,FINANCE,BI,WHITE_LABEL' },
                { key: 'SUN-LIC-772109', tenant: 'ReNew Power Solar', type: 'ENTERPRISE', flags: 'CRM,ERP,SCADA,AI,FINANCE,BI,WHITE_LABEL' },
              ].map((l) => (
                <div key={l.key} className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-2">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span className="font-mono text-amber-400 text-sm">{l.key}</span>
                    <span className="text-emerald-400 text-[11px]">{l.type}</span>
                  </div>
                  <p className="text-slate-400">Tenant: {l.tenant}</p>
                  <p className="text-slate-500 text-[10px] font-mono">{l.flags}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: USAGE METERING */}
      {activeTab === 'metering' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-sky-400" />
            Global Tenant Usage Metering & Quota Telemetry
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-2">
              <p className="text-slate-400 font-bold">TOTAL ACTIVE USERS</p>
              <p className="text-2xl font-extrabold text-white">1,240 Users</p>
              <p className="text-slate-500 text-[11px]">Across 18 Tenant Orgs</p>
            </div>

            <div className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-2">
              <p className="text-slate-400 font-bold">SCADA DEVICES CONNECTED</p>
              <p className="text-2xl font-extrabold text-amber-400">8,920 Devices</p>
              <p className="text-slate-500 text-[11px]">Inverters, Pyranometers, Meters</p>
            </div>

            <div className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-2">
              <p className="text-slate-400 font-bold">AI ASSISTANT QUERIES</p>
              <p className="text-2xl font-extrabold text-emerald-400">452,000 / mo</p>
              <p className="text-slate-500 text-[11px]">GenAI Solar Predictions</p>
            </div>

            <div className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-2">
              <p className="text-slate-400 font-bold">API CALLS METERED</p>
              <p className="text-2xl font-extrabold text-sky-400">18.4M / mo</p>
              <p className="text-slate-500 text-[11px]">Webhook & REST Execution</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: WHITE LABEL */}
      {activeTab === 'whitelabel' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe className="h-5 w-5 text-amber-400" />
            White Label Platform Customization
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-3">
              <p className="font-bold text-amber-400 text-sm">Custom Branding & Logos</p>
              <p>Primary Color: <strong className="text-white">#f59e0b (Amber Solar)</strong></p>
              <p>Logo URL: <strong className="text-white">https://cdn.sunite.io/branding/logo.png</strong></p>
              <p>Custom Subdomain: <strong className="text-white">*.sunite.io or Custom CNAME</strong></p>
            </div>

            <div className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-3">
              <p className="font-bold text-sky-400 text-sm">SMTP & Communication Gateway</p>
              <p>Custom Sender Email: <strong className="text-white">noreply@tenantdomain.com</strong></p>
              <p>WhatsApp Business API: <strong className="text-emerald-400">CONNECTED & VERIFIED</strong></p>
              <p>Whitelabel Powered By: <strong className="text-slate-400">Hidden / Clean Enterprise</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SOLAR B2B MARKETPLACE */}
      {activeTab === 'marketplace' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-amber-400" />
            Solar B2B Equipment & Service Marketplace
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {[
              { title: 'LONGi Hi-MO 6 580W N-Type Mono PERC', mfr: 'LONGi Green Energy', price: '₹16.50 / Wp', stock: '45.0 MW in Stock' },
              { title: 'Sungrow SG350HX 1500V String Inverter', mfr: 'Sungrow Power', price: '₹6,80,000 / unit', stock: '120 Units' },
              { title: 'CATL 2.1 MWh BESS Container', mfr: 'CATL Solutions', price: '₹1.85 Cr / unit', stock: '15 Units' },
              { title: 'Sunite HDG High Wind Load Racking', mfr: 'Sunite Structural', price: '₹92 / kg', stock: '850 Tons' },
            ].map((m) => (
              <div key={m.title} className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-3">
                <p className="font-bold text-white text-sm">{m.title}</p>
                <p className="text-slate-400">{m.mfr}</p>
                <p className="text-amber-400 font-extrabold">{m.price}</p>
                <p className="text-emerald-400 text-[11px]">{m.stock}</p>
                <button
                  onClick={() => showToast(`RFX Quote request submitted for ${m.title}`)}
                  className="w-full rounded bg-amber-500 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                >
                  Request RFX Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: RESELLER & PARTNER PORTAL */}
      {activeTab === 'reseller' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          <form onSubmit={handleOnboardReseller} className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-400" />
              Onboard Reseller Partner
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-300">Partner Organization Name</label>
              <input
                type="text"
                value={resellerName}
                onChange={(e) => setResellerName(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Contact Email</label>
              <input
                type="text"
                value={resellerEmail}
                onChange={(e) => setResellerEmail(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Commission Rate (%)</label>
              <input
                type="text"
                value={resellerCommission}
                onChange={(e) => setResellerCommission(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition"
            >
              Approve Partner Certification
            </button>
          </form>

          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Certified Reseller Partners</h2>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex justify-between items-center">
                <div>
                  <p className="font-bold text-white text-sm">SunTech CleanEnergy West</p>
                  <p className="text-slate-400">partners@suntech.com • 15% Share Rate</p>
                </div>
                <span className="text-emerald-400 font-bold">CERTIFIED PARTNER</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: CUSTOMER SUCCESS */}
      {activeTab === 'success' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-400" />
            Tenant Health Score & Renewal Predictions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {[
              { tenant: 'Sanand Industrial Polymers Ltd.', renewal: '15 Nov 2026', likelihood: '99% VERY HIGH', health: '98 / 100' },
              { tenant: 'Gujarat Solar Park Utilities', renewal: '01 Dec 2026', likelihood: '96% HIGH', health: '92 / 100' },
            ].map((cs) => (
              <div key={cs.tenant} className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-2">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>{cs.tenant}</span>
                  <span className="text-emerald-400">{cs.likelihood}</span>
                </div>
                <p className="text-slate-400">Renewal Date: {cs.renewal}</p>
                <p className="text-amber-400 font-extrabold">Health Score: {cs.health}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
