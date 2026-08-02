'use client';

import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, ShieldCheck, CreditCard } from 'lucide-react';

export const FinanceDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Finance & Commission Escrow</h2>
            <p className="text-xs text-slate-500">Partner Commission Escrow, Invoicing, Tax & Revenue Recognition</p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            Escrow Status: Active
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-xs font-bold">Total Invoiced</span>
            </div>
            <p className="mt-2 text-2xl font-black text-emerald-950 dark:text-emerald-200">$18,450,000</p>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-400">Paid: 92%</p>
          </div>

          <div className="rounded-lg bg-amber-50 p-4 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-800">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
              <CreditCard className="h-4 w-4" />
              <span className="text-xs font-bold">Commission Escrow Held</span>
            </div>
            <p className="mt-2 text-2xl font-black text-amber-950 dark:text-amber-200">$1,240,000</p>
            <p className="text-[11px] text-amber-800 dark:text-amber-400">For 318 Partners</p>
          </div>

          <div className="rounded-lg bg-purple-50 p-4 border border-purple-200 dark:bg-purple-950/40 dark:border-purple-800">
            <div className="flex items-center gap-2 text-purple-900 dark:text-purple-300">
              <Wallet className="h-4 w-4" />
              <span className="text-xs font-bold">Pending Disbursements</span>
            </div>
            <p className="mt-2 text-2xl font-black text-purple-950 dark:text-purple-200">$310,000</p>
            <p className="text-[11px] text-purple-800 dark:text-purple-400">Scheduled Next Friday</p>
          </div>
        </div>
      </div>
    </div>
  );
};
