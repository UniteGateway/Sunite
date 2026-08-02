'use client';

import React, { useState } from 'react';
import {
  Activity,
  Shield,
  ShieldAlert,
  Server,
  Database,
  Cpu,
  Radio,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RefreshCw,
  HardDrive,
  Lock,
  Flame,
  Terminal,
  FileText,
  BarChart3,
  TrendingUp,
  Sliders,
  PlusCircle,
  Eye,
  Settings,
  Sparkles,
  Layers,
  HelpCircle,
  AlertCircle,
  Globe,
  BellRing,
  Award,
} from 'lucide-react';

export default function EnterpriseOperationsPage() {
  const [activeTab, setActiveTab] = useState<
    | 'noc'
    | 'soc'
    | 'incidents'
    | 'observability'
    | 'scada'
    | 'backup'
    | 'capacity'
    | 'sla'
  >('noc');

  // Interactive Toast State
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // State for Create Incident Modal
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [incTitle, setIncTitle] = useState('');
  const [incSeverity, setIncSeverity] = useState('SEV-2');
  const [incCategory, setIncCategory] = useState('SCADA');
  const [incLead, setIncLead] = useState('Vikram Mehta (Principal SRE)');
  const [incTenants, setIncTenants] = useState('ORG-CUST-102 (Gujarat Solar Parks)');

  // Handlers
  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incTitle) return;
    showToast(`🚨 Incident created! Assigned to ${incLead}. PagerDuty & Slack NOC alerted.`);
    setIncTitle('');
    setShowIncidentModal(false);
  };

  const handleRunBackupVerification = (jobId: string) => {
    showToast(`🔄 Automated DR Restore Verification initiated for '${jobId}'. RPO verified within 5 mins.`);
  };

  const handleMitigateAlert = (alertId: string) => {
    showToast(`🛡️ Security Threat '${alertId}' mitigated. Firewall IP rule updated.`);
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
              PHASE 14.3 CERTIFIED
            </span>
            <span className="text-xs text-slate-400">Enterprise Operations Center (NOC & SOC)</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-2 flex items-center gap-3">
            <Activity className="h-8 w-8 text-emerald-400" />
            Global Operations, NOC & SOC Platform
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            24/7 Real-time Observability, Security Threat Analytics, Incident Management, Backup DR & Capacity Planning
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowIncidentModal(true)}
            className="flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-rose-400 transition shadow-lg"
          >
            <PlusCircle className="h-4 w-4" />
            Declare System Incident
          </button>
        </div>
      </div>

      {/* Top Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>SYSTEM AVAILABILITY</span>
            <Globe className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">99.99%</div>
          <p className="text-xs text-slate-400">SLA Target: 99.90%</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>ACTIVE INCIDENTS</span>
            <Flame className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">1</div>
          <p className="text-xs text-amber-400 font-medium">1 SEV-2 Investigating</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>SOC THREAT LEVEL</span>
            <ShieldAlert className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">LOW THREAT</div>
          <p className="text-xs text-slate-400">0 Active Critical Exploits</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>CONNECTED SCADA PLANTS</span>
            <Zap className="h-4 w-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-sky-400">141 / 142</div>
          <p className="text-xs text-slate-400">1 Offline (Inverter Repair)</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>BACKUP RPO / RTO</span>
            <HardDrive className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">2m / 8m</div>
          <p className="text-xs text-slate-400">Target: 5m RPO / 15m RTO</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 text-xs font-medium">
        {[
          { id: 'noc', label: 'Global NOC Console', icon: Server },
          { id: 'soc', label: 'Security Center (SOC)', icon: Shield },
          { id: 'incidents', label: 'Incident Console', icon: Flame },
          { id: 'observability', label: 'APIs, DB & Redis', icon: Cpu },
          { id: 'scada', label: 'SCADA Telemetry NOC', icon: Radio },
          { id: 'backup', label: 'Backup & DR Center', icon: HardDrive },
          { id: 'capacity', label: 'Capacity & K8s Cluster', icon: Layers },
          { id: 'sla', label: 'SLA Performance Report', icon: Award },
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

      {/* TAB 1: GLOBAL NOC CONSOLE */}
      {activeTab === 'noc' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Server className="h-5 w-5 text-emerald-400" />
                Core Infrastructure Services Health
              </h2>
              <div className="space-y-3 text-xs">
                {[
                  { name: 'API Gateway Cluster', status: 'HEALTHY', latency: '12ms' },
                  { name: 'PostgreSQL DB Primary', status: 'HEALTHY', latency: '2ms' },
                  { name: 'Redis Memory Cache', status: 'HEALTHY', latency: '1ms' },
                  { name: 'Kubernetes Control Plane', status: 'HEALTHY', latency: '5ms' },
                  { name: 'SCADA Telemetry Ingest', status: 'HEALTHY', latency: '18ms' },
                  { name: 'Gemini AI Inference', status: 'HEALTHY', latency: '210ms' },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-950">
                    <span className="font-semibold text-slate-200">{s.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-[10px]">{s.latency}</span>
                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-sky-400" />
                External Service Integration Status
              </h2>
              <div className="space-y-3 text-xs">
                {[
                  { name: 'Razorpay Payment Gateway', status: 'OPERATIONAL', uptime: '100%' },
                  { name: 'SendGrid Email SMTP', status: 'OPERATIONAL', uptime: '99.98%' },
                  { name: 'Twilio / Gupshup WhatsApp', status: 'OPERATIONAL', uptime: '100%' },
                  { name: 'AWS S3 Cloud Storage', status: 'OPERATIONAL', uptime: '100%' },
                  { name: 'National DISCOM Telemetry', status: 'OPERATIONAL', uptime: '99.95%' },
                ].map((ext) => (
                  <div key={ext.name} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-950">
                    <span className="font-semibold text-slate-200">{ext.name}</span>
                    <span className="rounded bg-sky-500/10 px-2 py-0.5 text-sky-400 font-bold text-[10px] border border-sky-500/20">
                      {ext.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BellRing className="h-5 w-5 text-amber-400" />
                Active NOC Alerting Channels
              </h2>
              <div className="space-y-3 text-xs">
                {[
                  { channel: 'Slack #noc-alerts', status: 'ACTIVE', type: 'Instant Webhook' },
                  { channel: 'PagerDuty On-Call Lead', status: 'ACTIVE', type: 'SEV-1/SEV-2 Escalation' },
                  { channel: 'SMS & WhatsApp Gateway', status: 'ACTIVE', type: 'Executive Emergency' },
                  { channel: 'Microsoft Teams Operations', status: 'ACTIVE', type: 'Daily Health Summary' },
                ].map((c) => (
                  <div key={c.channel} className="p-2.5 rounded-lg border border-slate-800 bg-slate-950 space-y-0.5">
                    <div className="flex justify-between items-center font-bold text-white">
                      <span>{c.channel}</span>
                      <span className="text-emerald-400 text-[10px]">{c.status}</span>
                    </div>
                    <p className="text-slate-400 text-[10px]">{c.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOC SECURITY MONITORING */}
      {activeTab === 'soc' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                Security Operations Center (SOC) Threat Monitor
              </h2>
              <p className="text-xs text-slate-400 mt-1">Real-time inspection of API rate limits, JWT token validation, failed auth attempts, and OWASP compliance</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: 'SEC-401', level: 'MEDIUM', type: 'RATE_LIMIT_EXCEEDED', ip: '103.22.140.12', tenant: 'ORG-CUST-103', details: 'Exceeded 1,000 req/min threshold on SCADA telemetry ingest endpoint.', status: 'BLOCKED' },
              { id: 'SEC-402', level: 'LOW', type: 'FAILED_LOGIN', ip: '49.207.18.90', tenant: 'ORG-PILOT-001', details: '3 consecutive invalid password attempts on Admin Portal.', status: 'DISMISSED' },
            ].map((s) => (
              <div key={s.id} className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm">{s.type}</span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">{s.id}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">IP: {s.ip} | Tenant: {s.tenant} | Details: {s.details}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded bg-amber-500/10 px-2.5 py-1 text-amber-400 font-bold text-[10px] border border-amber-500/20">
                    {s.level} THREAT
                  </span>
                  <button
                    onClick={() => handleMitigateAlert(s.id)}
                    className="rounded bg-emerald-500 px-3 py-1 text-slate-950 font-bold text-[11px] hover:bg-emerald-400 transition"
                  >
                    Mitigate Threat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INCIDENT CONSOLE */}
      {activeTab === 'incidents' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="h-5 w-5 text-rose-400" />
                Incident Management Console & Post-Mortem Reviews
              </h2>
              <p className="text-xs text-slate-400 mt-1">Severity levels, root cause analysis (RCA), and resolution timelines</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: 'INC-801', title: 'Gujarat Substation SCADA Gateway Telemetry Packet Delay', sev: 'SEV-2', cat: 'SCADA', status: 'INVESTIGATING', lead: 'Vikram Mehta (Principal SRE)', tenant: 'ORG-CUST-102', created: '2026-08-01 18:30' },
              { id: 'INC-798', title: 'Redis Cache Cluster Memory Usage Spike during Batch Export', sev: 'SEV-3', cat: 'REDIS', status: 'RESOLVED', lead: 'Ananya Sharma', tenant: 'ALL_TENANTS', created: '2026-07-31 22:10' },
            ].map((inc) => (
              <div key={inc.id} className="p-4 rounded-lg border border-slate-800 bg-slate-950 space-y-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm">{inc.title}</span>
                    <span className="text-slate-400 text-[10px]">({inc.id})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-rose-500/10 px-2.5 py-1 text-rose-400 font-bold text-[10px] border border-rose-500/20">
                      {inc.sev}
                    </span>
                    <span className="rounded bg-amber-500/10 px-2.5 py-1 text-amber-400 font-bold text-[10px] border border-amber-500/20">
                      {inc.status}
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 text-[11px]">Category: {inc.cat} | Assigned SRE Lead: {inc.lead} | Impacted: {inc.tenant} | Declared: {inc.created}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: APIS, DB & REDIS OBSERVABILITY */}
      {activeTab === 'observability' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs animate-fadeIn">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="h-5 w-5 text-emerald-400" />
              PostgreSQL Database Observability
            </h2>
            <div className="space-y-3">
              <div className="p-3 rounded bg-slate-950 border border-slate-800 flex justify-between">
                <span>Active Connection Pool</span>
                <span className="font-bold text-white">28 / 200 Connections</span>
              </div>
              <div className="p-3 rounded bg-slate-950 border border-slate-800 flex justify-between">
                <span>Replication Lag</span>
                <span className="font-bold text-emerald-400">0.02 Seconds (Sync OK)</span>
              </div>
              <div className="p-3 rounded bg-slate-950 border border-slate-800 flex justify-between">
                <span>Slow Queries Count (24h)</span>
                <span className="font-bold text-white">0 Queries &gt; 100ms</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="h-5 w-5 text-sky-400" />
              Redis Cache & Queue Health
            </h2>
            <div className="space-y-3">
              <div className="p-3 rounded bg-slate-950 border border-slate-800 flex justify-between">
                <span>Cache Hit Ratio</span>
                <span className="font-bold text-emerald-400">98.6%</span>
              </div>
              <div className="p-3 rounded bg-slate-950 border border-slate-800 flex justify-between">
                <span>Memory Usage</span>
                <span className="font-bold text-white">18.4% (450 MB / 2.5 GB)</span>
              </div>
              <div className="p-3 rounded bg-slate-950 border border-slate-800 flex justify-between">
                <span>Background Queue Pending</span>
                <span className="font-bold text-white">0 Messages</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SCADA TELEMETRY NOC */}
      {activeTab === 'scada' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Radio className="h-5 w-5 text-sky-400" />
                SCADA IoT Telemetry Operations NOC
              </h2>
              <p className="text-xs text-slate-400 mt-1">Live monitoring of solar plant connectivity, Modbus gateways, and generation alarms</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <p className="text-slate-400">Active Solar Plants</p>
              <p className="text-xl font-extrabold text-white">141 Connected</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <p className="text-slate-400">Ingest Telemetry Rate</p>
              <p className="text-xl font-extrabold text-sky-400">1,250 Packets / Sec</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <p className="text-slate-400">Active Generation Alarms</p>
              <p className="text-xl font-extrabold text-amber-400">3 Low Priority Alarms</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: BACKUP & DR CENTER */}
      {activeTab === 'backup' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-amber-400" />
                Backup & Disaster Recovery (DR) Console
              </h2>
              <p className="text-xs text-slate-400 mt-1">RPO 5 mins, RTO 15 mins target, automated restore verification on AWS & Azure</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: 'BKP-PG-20260801', comp: 'PostgreSQL Database WAL Archiving', size: '14.2 GB', status: 'RESTORE_VERIFIED', rpo: '2 mins', rto: '8 mins' },
              { id: 'BKP-RD-20260801', comp: 'Redis Snapshot RDB/AOF', size: '450 MB', status: 'COMPLETED', rpo: '5 mins', rto: '3 mins' },
            ].map((bkp) => (
              <div key={bkp.id} className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-white text-sm">{bkp.comp}</p>
                  <p className="text-slate-400 text-[11px]">Size: {bkp.size} | Achieved RPO: {bkp.rpo} | Achieved RTO: {bkp.rto}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded bg-emerald-500/10 px-2.5 py-1 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                    {bkp.status}
                  </span>
                  <button
                    onClick={() => handleRunBackupVerification(bkp.id)}
                    className="rounded bg-amber-500 px-3 py-1 text-slate-950 font-bold text-[11px] hover:bg-amber-400 transition"
                  >
                    Verify DR Restore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: CAPACITY & K8S CLUSTER */}
      {activeTab === 'capacity' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-400" />
                Kubernetes Cluster & Capacity Planning
              </h2>
              <p className="text-xs text-slate-400 mt-1">Node CPU, memory, disk IOPS, and 28-month capacity runway estimator</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { name: 'k8s-node-worker-01', cpu: '28.2%', mem: '45.1%', disk: '24.0%', iops: '1,400 IOPS', status: 'HEALTHY' },
              { name: 'k8s-node-worker-02', cpu: '22.4%', mem: '40.8%', disk: '21.5%', iops: '1,250 IOPS', status: 'HEALTHY' },
              { name: 'k8s-node-scada-01', cpu: '34.0%', mem: '52.0%', disk: '30.2%', iops: '2,100 IOPS', status: 'HEALTHY' },
            ].map((node) => (
              <div key={node.name} className="p-4 rounded-lg border border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-white text-sm">{node.name}</p>
                  <p className="text-slate-400 text-[11px]">CPU: {node.cpu} | Memory: {node.mem} | Disk: {node.disk} | IOPS: {node.iops}</p>
                </div>

                <span className="rounded bg-emerald-500/10 px-2.5 py-1 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                  {node.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: SLA PERFORMANCE REPORT */}
      {activeTab === 'sla' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                Enterprise SLA Compliance & Performance Report
              </h2>
              <p className="text-xs text-slate-400 mt-1">Contractual availability verification, MTTD, MTTR, and zero SLA breaches</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
              <p className="text-slate-400">Achieved Monthly Uptime</p>
              <p className="text-2xl font-extrabold text-emerald-400">99.99%</p>
              <p className="text-[11px] text-slate-500">Target: 99.90%</p>
            </div>

            <div className="p-5 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
              <p className="text-slate-400">Mean Time To Detect (MTTD)</p>
              <p className="text-2xl font-extrabold text-sky-400">1.2 Minutes</p>
              <p className="text-[11px] text-slate-500">Target: &lt; 5 Minutes</p>
            </div>

            <div className="p-5 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
              <p className="text-slate-400">Mean Time To Resolve (MTTR)</p>
              <p className="text-2xl font-extrabold text-amber-400">14.5 Minutes</p>
              <p className="text-[11px] text-slate-500">Target: &lt; 30 Minutes</p>
            </div>
          </div>
        </div>
      )}

      {/* Incident Modal */}
      {showIncidentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <form onSubmit={handleCreateIncident} className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="h-5 w-5 text-rose-400" />
              Declare System Incident
            </h3>

            <div>
              <label className="font-semibold text-slate-300">Incident Title</label>
              <input
                type="text"
                required
                value={incTitle}
                onChange={(e) => setIncTitle(e.target.value)}
                placeholder="e.g. Inverter MQTT Ingest Latency Spike"
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-300">Severity</label>
                <select
                  value={incSeverity}
                  onChange={(e) => setIncSeverity(e.target.value)}
                  className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                >
                  <option value="SEV-1">SEV-1 (Critical Outage)</option>
                  <option value="SEV-2">SEV-2 (Major Impact)</option>
                  <option value="SEV-3">SEV-3 (Minor Degradation)</option>
                  <option value="SEV-4">SEV-4 (Low / Advisory)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300">Category</label>
                <select
                  value={incCategory}
                  onChange={(e) => setIncCategory(e.target.value)}
                  className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                >
                  <option value="SCADA">SCADA IoT</option>
                  <option value="API">API Gateway</option>
                  <option value="DATABASE">Database</option>
                  <option value="REDIS">Redis</option>
                  <option value="KUBERNETES">Kubernetes</option>
                  <option value="SECURITY">Security</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-300">Assigned SRE Lead</label>
              <input
                type="text"
                value={incLead}
                onChange={(e) => setIncLead(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300">Impacted Tenants</label>
              <input
                type="text"
                value={incTenants}
                onChange={(e) => setIncTenants(e.target.value)}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowIncidentModal(false)}
                className="w-1/2 rounded-lg border border-slate-700 py-2 text-slate-400 font-bold hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 rounded-lg bg-rose-500 py-2 text-white font-bold hover:bg-rose-400"
              >
                Declare Incident
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
