'use client';

import React from 'react';
import { Target, TrendingUp, Users, FileText, CheckCircle2 } from 'lucide-react';

export const SalesDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Sales & Pipeline Performance</h2>
            <p className="text-xs text-slate-500">Lead Conversion, Partner Referrals & Quotations Generated</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Monthly Target: 85% Achieved
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-amber-50 p-4 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-800">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
              <Target className="h-4 w-4" />
              <span className="text-xs font-bold">Active Solar Leads</span>
            </div>
            <p className="mt-2 text-2xl font-black text-amber-950 dark:text-amber-200">184 Prospects</p>
            <p className="text-[11px] text-amber-800 dark:text-amber-400">+12 added today</p>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 border border-blue-200 dark:bg-blue-950/40 dark:border-blue-800">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300">
              <FileText className="h-4 w-4" />
              <span className="text-xs font-bold">Quotations Out</span>
            </div>
            <p className="mt-2 text-2xl font-black text-blue-950 dark:text-blue-200">42 Proposals</p>
            <p className="text-[11px] text-blue-800 dark:text-blue-400">Total Value $8.9M</p>
          </div>

          <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs font-bold">Closed Deals</span>
            </div>
            <p className="mt-2 text-2xl font-black text-emerald-950 dark:text-emerald-200">$4.2M</p>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-400">18 Signed Contracts</p>
          </div>
        </div>
      </div>
    </div>
  );
};
