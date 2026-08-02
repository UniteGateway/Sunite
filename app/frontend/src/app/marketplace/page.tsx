'use client';

import React, { useState } from 'react';
import {
  Store,
  Code2,
  Key,
  Shield,
  Download,
  Terminal,
  Cpu,
  Layers,
  Zap,
  Radio,
  Sparkles,
  Search,
  PlusCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
  ExternalLink,
  BookOpen,
  DollarSign,
  TrendingUp,
  Box,
  Copy,
  Play,
  Sliders,
  Award,
  Globe2,
  FileCode,
  ShieldCheck,
  Building,
  UserPlus,
  HelpCircle,
  Send,
  Lock,
} from 'lucide-react';

export default function DeveloperMarketplacePage() {
  const [activeTab, setActiveTab] = useState<
    | 'marketplace'
    | 'devportal'
    | 'apiexplorer'
    | 'apikeys'
    | 'plugins'
    | 'sdks'
    | 'sandbox'
    | 'analytics'
  >('marketplace');

  // Interactive Toast State
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // State for Developer Registration Modal
  const [showRegModal, setShowRegModal] = useState(false);
  const [devOrgName, setDevOrgName] = useState('');
  const [devEmail, setDevEmail] = useState('');
  const [devTier, setDevTier] = useState('TIER_OEM');

  // State for API Key Generation
  const [keyLabel, setKeyLabel] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  // State for Webhook Simulator
  const [simEvent, setSimEvent] = useState('scada.telemetry.alarm');
  const [simUrl, setSimUrl] = useState('https://api.sungrow.com/webhooks/sunite');
  const [simStatus, setSimStatus] = useState<string | null>(null);

  // Handlers
  const handleRegisterDev = (e: React.FormEvent) => {
    e.preventDefault();
    if (!devOrgName) return;
    showToast(`🚀 Developer Organization '${devOrgName}' registered! OAuth credentials and Sandbox ready.`);
    setDevOrgName('');
    setDevEmail('');
    setShowRegModal(false);
  };

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyLabel) return;
    const secret = `sunite_live_sk_${Math.random().toString(36).substring(2, 20)}`;
    setGeneratedKey(secret);
    showToast(`🔑 API Key '${keyLabel}' generated! Secret copied to buffer.`);
    setKeyLabel('');
  };

  const handleInstallApp = (appName: string) => {
    showToast(`✅ Installed '${appName}' to Sunite Enterprise Tenant. Extension running.`);
  };

  const handleRunSandboxTest = () => {
    setSimStatus('200 OK - Payload delivered in 14ms (HMAC-SHA256 verified)');
    showToast(`⚡ Webhook simulation triggered to ${simUrl}`);
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

      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              PHASE 15.0 CERTIFIED
            </span>
            <span className="text-xs text-slate-400">Sunite Open Platform & Partner Ecosystem</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-2 flex items-center gap-3">
            <Store className="h-8 w-8 text-emerald-400" />
            Open Platform, Developer Portal & Marketplace
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Third-party Developer Console, Public REST APIs, OAuth 2.0 Client Keys, SDK Distribution, Webhooks & OEM App Extensions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRegModal(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition shadow-lg"
          >
            <UserPlus className="h-4 w-4" />
            Register Developer Org
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>REGISTERED DEVELOPERS</span>
            <Building className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">48 Orgs</div>
          <p className="text-xs text-emerald-400">OEMs, EPCs & Utility Partners</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>MARKETPLACE APPS</span>
            <Store className="h-4 w-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-sky-400">12 Published</div>
          <p className="text-xs text-slate-400">Solar, Battery, EV & SCADA</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>PUBLIC REST ENDPOINTS</span>
            <Code2 className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">110 APIs</div>
          <p className="text-xs text-slate-400">10 API Functional Groups</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>RUNNING PLUGINS</span>
            <Cpu className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">3 Active</div>
          <p className="text-xs text-slate-400">Verified Permissions</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>SDK DISTRIBUTION</span>
            <Download className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">7 Languages</div>
          <p className="text-xs text-slate-400">JS, TS, Python, Java, .NET, PHP</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 text-xs font-medium">
        {[
          { id: 'marketplace', label: 'App & OEM Marketplace', icon: Store },
          { id: 'devportal', label: 'Developer Portal', icon: Building },
          { id: 'apiexplorer', label: 'Public API Explorer', icon: Code2 },
          { id: 'apikeys', label: 'OAuth & API Keys', icon: Key },
          { id: 'plugins', label: 'Plugin Extension Store', icon: Cpu },
          { id: 'sdks', label: 'SDK Downloads', icon: Download },
          { id: 'sandbox', label: 'API Sandbox & Webhooks', icon: Terminal },
          { id: 'analytics', label: 'Marketplace Billing & Stats', icon: TrendingUp },
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

      {/* TAB 1: APP & OEM MARKETPLACE */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Store className="h-5 w-5 text-emerald-400" />
                Enterprise App & OEM Connector Marketplace
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Extend Sunite Enterprise with certified inverter adapters, BESS optimizers, EV charging bridges & AI extensions</p>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search Growatt, Sungrow, CATL, ABB..."
                className="bg-transparent border-none outline-none text-slate-200 placeholder-slate-500 w-48 md:w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'APP-101',
                name: 'Sungrow Inverter SCADA Adapter',
                category: 'SOLAR_OEM',
                developer: 'Sungrow Power Supply',
                price: '$29.99 / mo',
                rating: 4.9,
                installs: 142,
                desc: 'Direct Modbus MQTT sync for Sungrow SG250HX & SG350HX central string inverters.',
                badge: 'OEM Certified',
              },
              {
                id: 'APP-102',
                name: 'CATL BESS Cell Balancing Optimizer',
                category: 'BATTERY_STORAGE',
                developer: 'CATL Clean Tech Labs',
                price: '$49.99 / mo',
                rating: 4.95,
                installs: 68,
                desc: 'AI-driven State-of-Health (SoH) cell level degradation mitigation and thermal control.',
                badge: 'AI Powered',
              },
              {
                id: 'APP-103',
                name: 'ABB Terra DC Fast Charger Bridge',
                category: 'EV_CHARGING',
                developer: 'ABB E-mobility',
                price: '$19.99 / mo',
                rating: 4.8,
                installs: 35,
                desc: 'OCPP 2.0.1 protocol translation layer for fleet charging station telemetry.',
                badge: 'Verified',
              },
              {
                id: 'APP-104',
                name: 'Razorpay Auto-Escrow Milestone Billing',
                category: 'FINANCE_EXTENSION',
                developer: 'Razorpay Financial Labs',
                price: 'Free Trial',
                rating: 5.0,
                installs: 89,
                desc: 'Automated release of milestone funds upon DISCOM net-metering approval sign-off.',
                badge: 'Financial',
              },
            ].map((app) => (
              <div key={app.id} className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 flex flex-col justify-between hover:border-emerald-500/40 transition group">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                      {app.category}
                    </span>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      ★ {app.rating}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-white text-base group-hover:text-emerald-400 transition">
                    {app.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{app.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{app.developer}</span>
                    <span className="font-extrabold text-white">{app.price}</span>
                  </div>

                  <button
                    onClick={() => handleInstallApp(app.name)}
                    className="w-full rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/20 py-2 text-xs font-bold transition flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Install Extension
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: DEVELOPER PORTAL */}
      {activeTab === 'devportal' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Building className="h-5 w-5 text-emerald-400" />
                Partner & Organization Developer Console
              </h2>
              <p className="text-xs text-slate-400 mt-1">Manage partner developer profiles, verification tiers, rate limit quotas, and OAuth client scopes</p>
            </div>

            <button
              onClick={() => setShowRegModal(true)}
              className="rounded bg-emerald-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Register Organization
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: 'DEV-10022', org: 'Sungrow Power Solutions', email: 'api-support@sungrowpower.com', tier: 'TIER_OEM', status: 'VERIFIED', rateLimit: '5,000 RPM', appsCount: 2 },
              { id: 'DEV-10045', org: 'Torrent Power Dev Labs', email: 'dev@torrentpower.com', tier: 'TIER_ENTERPRISE_PARTNER', status: 'VERIFIED', rateLimit: '10,000 RPM', appsCount: 1 },
              { id: 'DEV-10089', org: 'Growatt Energy Technology', email: 'dev-portal@growatt.com', tier: 'TIER_OEM', status: 'VERIFIED', rateLimit: '5,000 RPM', appsCount: 1 },
            ].map((dev) => (
              <div key={dev.id} className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm">{dev.org}</span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">{dev.id}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Email: {dev.email} | Rate Limit Quota: {dev.rateLimit} | Apps Published: {dev.appsCount}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded bg-sky-500/10 px-2.5 py-1 text-sky-400 font-bold text-[10px] border border-sky-500/20">
                    {dev.tier}
                  </span>
                  <span className="rounded bg-emerald-500/10 px-2.5 py-1 text-emerald-400 font-bold text-[10px] border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {dev.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PUBLIC API EXPLORER */}
      {activeTab === 'apiexplorer' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="h-5 w-5 text-amber-400" />
              Sunite Public REST API Platform Catalog
            </h2>
            <p className="text-xs text-slate-400 mt-1">Complete API endpoints directory for third-party solar integrations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              { group: 'CRM & Lead APIs', path: '/api/v1/crm', count: 12, desc: 'Lead ingestion, status pipeline, customer assignments' },
              { group: 'Project & EPC APIs', path: '/api/v1/projects', count: 15, desc: 'Milestones, BOM lists, execution progress tracking' },
              { group: 'Solar Design 3D APIs', path: '/api/v1/solar-design', count: 9, desc: 'PVSyst CAD layout, string configuration, shadow mesh' },
              { group: 'SCADA IoT Telemetry APIs', path: '/api/v1/scada', count: 18, desc: 'Inverter packets, string currents, alarm streams' },
              { group: 'Gemini AI APIs', path: '/api/v1/ai', count: 10, desc: 'Thermal OCR inspection, defect classification, generation forecast' },
              { group: 'Finance & Escrow APIs', path: '/api/v1/finance', count: 14, desc: 'Invoicing, Razorpay auto-escrow, subsidy tracking' },
            ].map((api) => (
              <div key={api.group} className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white">{api.group}</span>
                  <span className="rounded bg-amber-500/10 px-2 py-0.5 text-amber-400 font-bold text-[10px]">
                    {api.count} APIs
                  </span>
                </div>
                <code className="text-[11px] text-emerald-400 block font-mono">{api.path}</code>
                <p className="text-[11px] text-slate-400">{api.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: OAUTH & API KEYS */}
      {activeTab === 'apikeys' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Key className="h-5 w-5 text-emerald-400" />
                OAuth 2.0 Clients & Secret Key Management
              </h2>
              <p className="text-xs text-slate-400 mt-1">Generate REST API secret tokens and configure OAuth client credentials for third-party authorization</p>
            </div>
          </div>

          <form onSubmit={handleGenerateKey} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 max-w-lg text-xs">
            <label className="font-semibold text-slate-200">Generate New Production API Key</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={keyLabel}
                onChange={(e) => setKeyLabel(e.target.value)}
                placeholder="e.g. SCADA Ingest Key - Gujarat Park"
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
              />
              <button
                type="submit"
                className="rounded-lg bg-emerald-500 px-4 py-2 font-bold text-slate-950 hover:bg-emerald-400 transition"
              >
                Generate Key
              </button>
            </div>
          </form>

          {generatedKey && (
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-emerald-400">
                <span>NEW API SECRET KEY GENERATED (Store Safely)</span>
                <span className="text-[10px] text-slate-400">Copy to env</span>
              </div>
              <code className="block p-2 rounded bg-slate-950 text-emerald-300 font-mono text-xs select-all">
                {generatedKey}
              </code>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: PLUGIN EXTENSION STORE */}
      {activeTab === 'plugins' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="h-5 w-5 text-sky-400" />
              Plugin Extensions Framework
            </h2>
            <p className="text-xs text-slate-400 mt-1">Installed lifecycle plugins running in isolated sandboxed workers</p>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: 'PLG-101', name: 'Modbus RTU/TCP Custom Parser', author: 'Schneider Electric Partner Dev', version: '2.1.0', state: 'RUNNING', perms: 'READ_TELEMETRY, WRITE_TELEMETRY' },
              { id: 'PLG-102', name: 'DISCOM Automated Tariff Sync India', author: 'Torrent Power Dev Labs', version: '1.4.2', state: 'RUNNING', perms: 'READ_FINANCE, WRITE_TARIFFS' },
              { id: 'PLG-103', name: 'Gemini Anomaly Vision Detector', author: 'Sunite AI Core Labs', version: '3.0.0', state: 'RUNNING', perms: 'READ_INSPECTIONS, WRITE_AI_LOGS' },
            ].map((p) => (
              <div key={p.id} className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm">{p.name}</span>
                    <span className="text-slate-500 text-[10px]">v{p.version} ({p.id})</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Author: {p.author} | Permissions: {p.perms}</p>
                </div>

                <span className="rounded bg-emerald-500/10 px-2.5 py-1 text-emerald-400 font-bold text-[10px] border border-emerald-500/20 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {p.state}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SDK DOWNLOADS */}
      {activeTab === 'sdks' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Download className="h-5 w-5 text-emerald-400" />
              SDK Distributions & Libraries
            </h2>
            <p className="text-xs text-slate-400 mt-1">Official client libraries for integrating third-party software with Sunite Enterprise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              { lang: 'JavaScript / Node.js', pkg: '@sunite/sdk-js', cmd: 'npm install @sunite/sdk-js' },
              { lang: 'TypeScript', pkg: '@sunite/sdk-ts', cmd: 'npm install @sunite/sdk-ts' },
              { lang: 'Python', pkg: 'sunite-sdk-python', cmd: 'pip install sunite-sdk-python' },
              { lang: 'Java / Android', pkg: 'com.sunite.sdk', cmd: 'implementation "com.sunite:sdk:1.5.0"' },
              { lang: 'Flutter / Dart', pkg: 'sunite_flutter', cmd: 'flutter pub add sunite_flutter' },
              { lang: '.NET C#', pkg: 'Sunite.SDK.DotNet', cmd: 'dotnet add package Sunite.SDK.DotNet' },
            ].map((sdk) => (
              <div key={sdk.lang} className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-2">
                <p className="font-extrabold text-white">{sdk.lang}</p>
                <code className="text-[11px] text-sky-400 block font-mono">{sdk.pkg}</code>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-mono">
                  {sdk.cmd}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: SANDBOX & WEBHOOK SIMULATOR */}
      {activeTab === 'sandbox' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="h-5 w-5 text-sky-400" />
              API Sandbox & Webhook Payload Simulator
            </h2>
            <p className="text-xs text-slate-400 mt-1">Test webhook delivery, payload signatures, and API response structures safely in sandbox mode</p>
          </div>

          <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 space-y-4 max-w-xl text-xs">
            <div>
              <label className="font-semibold text-slate-300">Webhook Target Endpoint URL</label>
              <input
                type="text"
                value={simUrl}
                onChange={(e) => setSimUrl(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 font-mono text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300">Event Topic</label>
              <select
                value={simEvent}
                onChange={(e) => setSimEvent(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
              >
                <option value="scada.telemetry.alarm">scada.telemetry.alarm (Inverter Overheat)</option>
                <option value="crm.lead.created">crm.lead.created (New Solar Lead Ingestion)</option>
                <option value="invoice.paid">invoice.paid (Milestone Escrow Payment)</option>
              </select>
            </div>

            <button
              onClick={handleRunSandboxTest}
              className="w-full rounded-lg bg-sky-500 py-2.5 font-bold text-slate-950 hover:bg-sky-400 transition flex items-center justify-center gap-2"
            >
              <Play className="h-4 w-4" />
              Send Test Webhook Payload
            </button>

            {simStatus && (
              <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                {simStatus}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 8: MARKETPLACE BILLING & ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Marketplace Revenue Share & Developer Billing
            </h2>
            <p className="text-xs text-slate-400 mt-1">70/30 revenue split analytics for third-party developers and automated payout execution</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
              <p className="text-slate-400">Total Ecosystem Revenue (24h)</p>
              <p className="text-2xl font-extrabold text-emerald-400">$12,450.00</p>
              <p className="text-[11px] text-slate-500">Gross App Subscriptions</p>
            </div>

            <div className="p-5 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
              <p className="text-slate-400">Developer Net Payouts (70%)</p>
              <p className="text-2xl font-extrabold text-sky-400">$8,715.00</p>
              <p className="text-[11px] text-slate-500">Automated Razorpay Route</p>
            </div>

            <div className="p-5 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
              <p className="text-slate-400">Sunite Platform Share (30%)</p>
              <p className="text-2xl font-extrabold text-amber-400">$3,735.00</p>
              <p className="text-[11px] text-slate-500">Platform Maintenance Fee</p>
            </div>
          </div>
        </div>
      )}

      {/* Developer Registration Modal */}
      {showRegModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <form onSubmit={handleRegisterDev} className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-emerald-400" />
              Register Developer Organization
            </h3>

            <div>
              <label className="font-semibold text-slate-300">Organization Name</label>
              <input
                type="text"
                required
                value={devOrgName}
                onChange={(e) => setDevOrgName(e.target.value)}
                placeholder="e.g. Sungrow Power Solutions"
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300">Contact Email</label>
              <input
                type="email"
                required
                value={devEmail}
                onChange={(e) => setDevEmail(e.target.value)}
                placeholder="e.g. dev-portal@sungrow.com"
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300">Developer Tier</label>
              <select
                value={devTier}
                onChange={(e) => setDevTier(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              >
                <option value="TIER_OEM">OEM Partner (Inverter, BESS, EV)</option>
                <option value="TIER_ENTERPRISE_PARTNER">Enterprise Partner (Utilities, DISCOMs)</option>
                <option value="TIER_STANDARD">Standard Third-Party Developer</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRegModal(false)}
                className="w-1/2 rounded-lg border border-slate-700 py-2 text-slate-400 font-bold hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 rounded-lg bg-emerald-500 py-2 text-slate-950 font-bold hover:bg-emerald-400"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
