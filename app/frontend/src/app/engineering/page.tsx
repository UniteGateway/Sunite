'use client';

import React from 'react';
import { Calculator, Cpu, Zap, Download, Play } from 'lucide-react';

export default function EngineeringPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Solar Design & Payback Calculator</h1>
          <p className="text-xs text-slate-500">PVSyst Yield Simulation, String Sizing, Roof Azimuth & ROI Engine</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400">
          <Play className="h-4 w-4" /> Run Simulation
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">System Design Parameters</h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-500">Target Solar Capacity (kW)</label>
              <input type="number" defaultValue={500} className="mt-1 w-full rounded-lg border p-2 dark:border-slate-700 dark:bg-slate-800" />
            </div>
            <div>
              <label className="font-semibold text-slate-500">Module Type</label>
              <select className="mt-1 w-full rounded-lg border p-2 dark:border-slate-700 dark:bg-slate-800">
                <option>550W Mono PERC Bifacial</option>
                <option>580W TOPCon N-Type</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-500">Inverter Efficiency</label>
              <input type="text" defaultValue="98.8%" className="mt-1 w-full rounded-lg border p-2 dark:border-slate-700 dark:bg-slate-800" />
            </div>
            <div>
              <label className="font-semibold text-slate-500">Grid Tariff ($/kWh)</label>
              <input type="number" defaultValue={0.12} className="mt-1 w-full rounded-lg border p-2 dark:border-slate-700 dark:bg-slate-800" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Simulation Yield & Payback Results</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-amber-50 p-4 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-800">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300">Annual Energy Generation</span>
              <p className="mt-1 text-2xl font-black text-amber-950 dark:text-amber-200">750,000 kWh</p>
            </div>

            <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800">
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">Estimated Payback Period</span>
              <p className="mt-1 text-2xl font-black text-emerald-950 dark:text-emerald-200">3.2 Years</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
