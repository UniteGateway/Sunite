'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useLayout } from '@/lib/layout-context';
import { UserRole } from '@/lib/types';
import {
  Bell,
  Search,
  Moon,
  Sun,
  User,
  LogOut,
  ShieldAlert,
  Sliders,
  ChevronDown,
  Activity,
  Plus,
  Maximize2,
  Minimize2
} from 'lucide-react';

export const EnterpriseHeader: React.FC = () => {
  const { user, role, switchRole, logout, theme, toggleTheme } = useAuth();
  const { isFullscreen, toggleFullscreen } = useLayout();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const rolesList: UserRole[] = [
    'Super Admin',
    'Sales Admin',
    'Marketing Partner',
    'Franchise',
    'EPC Contractor',
    'Installation Vendor',
    'Survey Engineer',
    'Finance',
    'Service Engineer',
    'Customer',
  ];

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads, projects, SCADA telemetry..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          />
        </div>

        <div className="hidden items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-400 md:flex">
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          <span>SCADA Sync Active</span>
        </div>
      </div>

      {/* Right Header Controls */}
      <div className="flex items-center gap-4">
        {/* Role Switcher */}
        <div className="relative">
          <select
            value={role}
            onChange={(e) => switchRole(e.target.value as UserRole)}
            className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200"
          >
            {rolesList.map((r) => (
              <option key={r} value={r}>
                Role: {r}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Action Button */}
        <button className="hidden items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors sm:flex">
          <Plus className="h-4 w-4" />
          <span>New Lead</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-amber-400" />}
        </button>

        {/* Full Screen Mode Toggle */}
        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Full Screen' : 'Full Screen Mode'}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
        >
          {isFullscreen ? (
            <Minimize2 className="h-5 w-5 text-amber-500" />
          ) : (
            <Maximize2 className="h-5 w-5" />
          )}
        </button>

        {/* Notification Center */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b pb-2 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Realtime Notifications
                </h4>
                <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full dark:bg-amber-950">
                  3 New
                </span>
              </div>
              <div className="mt-3 space-y-3">
                <div className="flex items-start gap-3 text-xs">
                  <div className="rounded bg-amber-100 p-1.5 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    <ShieldAlert className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      Inverter #04 Overheat Alert
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Sanand 500kW Plant • 2m ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <div className="rounded bg-blue-100 p-1.5 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    <Sliders className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      Quotation Approved ($142,000)
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Ramesh Forge • 15m ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-amber-400 dark:bg-amber-500 dark:text-slate-950">
              {user?.name ? user.name.slice(0, 2) : 'SU'}
            </div>
            <div className="hidden text-left md:block">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{user?.name}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{role}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b px-3 py-2 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{user?.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{user?.email}</p>
              </div>
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                <User className="h-4 w-4" /> Profile & Account
              </button>
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
