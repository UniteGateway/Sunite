'use client';

import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Sun,
  Zap,
  Users,
  ShieldCheck,
  Award
} from 'lucide-react';

export const CeoDashboard: React.FC = () => {
  const kpis = [
    {
      title: 'Total Installed Capacity',
      value: '142.8 MW',
      change: '+18.4% YoY',
      isPositive: true,
      subtext: '42 Active Commercial Plants',
      icon: Sun,
      color: 'bg-amber-500',
    },
    {
      title: 'Annual Contracted Revenue',
      value: '$28.4M',
      change: '+24.2% vs target',
      isPositive: true,
      subtext: 'Q3 Forecast: $34.1M',
      icon: DollarSign,
      color: 'bg-emerald-500',
    },
    {
      title: 'Partner Network Growth',
      value: '318 Partners',
      change: '+32 new partners',
      isPositive: true,
      subtext: 'Franchises & EPCs',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Realtime SCADA Generation',
      value: '84.2 MW/h',
      change: '99.4% Efficiency',
      isPositive: true,
      subtext: '31,400 T CO2 Offset',
      icon: Zap,
      color: 'bg-violet-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Executive Welcome Header */}
      <div className="flex flex-col gap-2 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
              EXECUTIVE LEADERSHIP PORTAL
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight">CEO Executive Overview</h2>
            <p className="mt-1 text-xs text-slate-300">
              Sunite Enterprise Global Performance • Realtime Financials & IoT Telemetry
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-xs text-slate-400">System Health</span>
            <p className="text-sm font-bold text-emerald-400 flex items-center justify-end gap-1">
              <ShieldCheck className="h-4 w-4" /> All Systems Operational
            </p>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{kpi.title}</span>
                <div className={`rounded-lg ${kpi.color} p-2 text-white shadow-sm`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{kpi.value}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full dark:bg-emerald-950 dark:text-emerald-400">
                    {kpi.change}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{kpi.subtext}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Regional Power Output & Top Deals Table */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Plant Status */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" /> Top Performing Solar Mega-Plants
            </h3>
            <span className="text-xs font-semibold text-amber-600">42 Total Sites</span>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { name: 'Sanand Industrial Park Plant #1', cap: '15.0 MW', status: 'Optimal', prod: '98.8%' },
              { name: 'Mundra Port Solar Roof Grid', cap: '25.5 MW', status: 'Optimal', prod: '99.2%' },
              { name: 'Vadodara Tech Park Solar Microgrid', cap: '8.4 MW', status: 'Maintenance', prod: '94.1%' },
              { name: 'Surat Textile Industrial Solar', cap: '12.0 MW', status: 'Optimal', prod: '97.6%' },
            ].map((plant, pIdx) => (
              <div
                key={pIdx}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/50"
              >
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{plant.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Capacity: {plant.cap}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{plant.prod} Yield</span>
                  <p className="text-[10px] text-slate-400">{plant.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Pipeline Breakdown */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-amber-500" /> Revenue & Pipeline Stage Distribution
            </h3>
            <span className="text-xs font-semibold text-slate-500">Q3 2026 Target</span>
          </div>
          <div className="mt-4 space-y-4">
            {[
              { stage: 'Site Survey & CAD Engineering', deals: 28, val: '$8.4M', pct: 85 },
              { stage: 'Quotation & Payback Proposal', deals: 19, val: '$12.1M', pct: 60 },
              { stage: 'Procurement & Mobilization', deals: 14, val: '$18.6M', pct: 90 },
              { stage: 'Commissioned & Grid Sync', deals: 42, val: '$28.4M', pct: 100 },
            ].map((st, sIdx) => (
              <div key={sIdx} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
                  <span>{st.stage} ({st.deals} deals)</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{st.val}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-2 rounded-full bg-amber-500" style={{ width: `${st.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
