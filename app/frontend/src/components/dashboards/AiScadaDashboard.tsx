'use client';

import React from 'react';
import { Cpu, Zap, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

export const AiScadaDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">AI & SCADA Realtime Telemetry Hub</h2>
            <p className="text-xs text-slate-500">Live Modbus Inverter Telemetry, Irradiance & GenAI Predictive Maintenance</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            <Activity className="h-3.5 w-3.5 animate-pulse" /> Live Telemetry Feed
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-amber-50 p-4 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-800">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-bold">Total Power Generation</span>
            </div>
            <p className="mt-2 text-2xl font-black text-amber-950 dark:text-amber-200">84.20 MW</p>
            <p className="text-[11px] text-amber-800 dark:text-amber-400">Irradiance: 920 W/m²</p>
          </div>

          <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300">
              <Cpu className="h-4 w-4" />
              <span className="text-xs font-bold">GenAI Vision OCR Accuracy</span>
            </div>
            <p className="mt-2 text-2xl font-black text-emerald-950 dark:text-emerald-200">99.4%</p>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-400">Electricity Bill Scans</p>
          </div>

          <div className="rounded-lg bg-rose-50 p-4 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-800">
            <div className="flex items-center gap-2 text-rose-900 dark:text-rose-300">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs font-bold">Predictive Fault Alerts</span>
            </div>
            <p className="mt-2 text-2xl font-black text-rose-950 dark:text-rose-200">2 Inverters</p>
            <p className="text-[11px] text-rose-800 dark:text-rose-400">Scheduled Inspection</p>
          </div>
        </div>
      </div>
    </div>
  );
};
