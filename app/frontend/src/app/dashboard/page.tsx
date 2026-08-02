'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { CeoDashboard } from '@/components/dashboards/CeoDashboard';
import { SalesDashboard } from '@/components/dashboards/SalesDashboard';
import { FinanceDashboard } from '@/components/dashboards/FinanceDashboard';
import { AiScadaDashboard } from '@/components/dashboards/AiScadaDashboard';
import { LayoutDashboard, TrendingUp, Wallet, Activity, Wrench, FolderKanban } from 'lucide-react';

export default function DashboardPage() {
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState<'ceo' | 'sales' | 'finance' | 'ai'>('ceo');

  const tabs = [
    { id: 'ceo', name: 'CEO Executive', icon: LayoutDashboard },
    { id: 'sales', name: 'Sales & CRM', icon: TrendingUp },
    { id: 'finance', name: 'Finance & Escrow', icon: Wallet },
    { id: 'ai', name: 'AI & SCADA Telemetry', icon: Activity },
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard View Switcher */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Enterprise Role Dashboards</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Current Persona: <span className="font-bold text-amber-600 dark:text-amber-400">{role}</span>
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow dark:bg-slate-900 dark:text-amber-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Selected Dashboard */}
      {activeTab === 'ceo' && <CeoDashboard />}
      {activeTab === 'sales' && <SalesDashboard />}
      {activeTab === 'finance' && <FinanceDashboard />}
      {activeTab === 'ai' && <AiScadaDashboard />}
    </div>
  );
}
