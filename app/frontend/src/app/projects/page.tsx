'use client';

import React from 'react';
import { FolderKanban, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function ProjectsPage() {
  const projects = [
    { id: 'PRJ-9001', name: 'Sanand Roof Solar 500kW', client: 'Ramesh Forge', cap: '500 kW', stage: 'Procurement', progress: 65 },
    { id: 'PRJ-9002', name: 'Mundra Solar Grid 2.5MW', client: 'Mundra Cold Storage', cap: '2.5 MW', stage: 'Grid Testing', progress: 90 },
    { id: 'PRJ-9003', name: 'Vadodara Tech Park 800kW', client: 'Vadodara Hub', cap: '800 kW', stage: 'Civil Structure', progress: 40 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Project Execution & EPC Milestones</h1>
          <p className="text-xs text-slate-500">Civil Structures, Module Mounting, Inverter Wiring, DISCOM Net-Metering & Grid Sync</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-600">{p.id}</span>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">{p.name}</h3>
                <p className="text-xs text-slate-500">Client: {p.client} • Capacity: {p.cap}</p>
              </div>
              <div className="text-right">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {p.stage}
                </span>
                <p className="mt-1 text-xs font-bold text-slate-700 dark:text-slate-300">{p.progress}% Complete</p>
              </div>
            </div>

            <div className="mt-4 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-2 rounded-full bg-amber-500" style={{ width: `${p.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
