'use client';

import React from 'react';
import { Activity, Zap, AlertTriangle, Cpu, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ScadaPage() {
  const telemetries = [
    { site: 'Sanand 500kW Plant', inverter: 'INV-01 (100kW)', power: '98.4 kW', temp: '42°C', status: 'Optimal' },
    { site: 'Sanand 500kW Plant', inverter: 'INV-02 (100kW)', power: '97.9 kW', temp: '44°C', status: 'Optimal' },
    { site: 'Sanand 500kW Plant', inverter: 'INV-04 (100kW)', power: '82.1 kW', temp: '68°C', status: 'Warning: High Temp' },
    { site: 'Mundra 2.5MW Grid', inverter: 'INV-CENTRAL-01', power: '2.42 MW', temp: '48°C', status: 'Optimal' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">SCADA Modbus IoT & Telemetry Stream</h1>
          <p className="text-xs text-slate-500">Inverter Modbus Registers, Weather Station Irradiance & Predictive GenAI Faults</p>
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full dark:bg-emerald-950">
          <Activity className="h-4 w-4 animate-pulse" /> WebSocket Live Telemetry Feed
        </span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 text-sm font-bold text-slate-800 dark:text-slate-200">Live Inverter Register Stream</h3>
        <table className="w-full text-left text-xs">
          <thead className="border-b bg-slate-50 text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-800/50">
            <tr>
              <th className="p-3">Site Location</th>
              <th className="p-3">Inverter ID</th>
              <th className="p-3">AC Active Power</th>
              <th className="p-3">Internal Temp</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-800">
            {telemetries.map((t, idx) => (
              <tr key={idx}>
                <td className="p-3 font-bold">{t.site}</td>
                <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">{t.inverter}</td>
                <td className="p-3 font-bold text-amber-600">{t.power}</td>
                <td className="p-3 font-semibold">{t.temp}</td>
                <td className="p-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      t.status.includes('Warning')
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
