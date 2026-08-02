'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Building2,
  Building,
  Handshake,
  Compass,
  Calculator,
  FileSpreadsheet,
  FileCheck2,
  FileText,
  FolderKanban,
  ShoppingBag,
  Boxes,
  Wallet,
  ShieldCheck,
  Wrench,
  Bot,
  Activity,
  Database,
  UserPlus,
  BarChart3,
  UserCog,
  Settings,
  Sun,
  Layers,
  Cpu,
  Rocket,
  HeartHandshake,
  Store,
} from 'lucide-react';

interface SidebarNavGroup {
  title: string;
  items: {
    title: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

export const EnterpriseSidebar: React.FC = () => {
  const pathname = usePathname();

  const navGroups: SidebarNavGroup[] = [
    {
      title: 'CORE PLATFORM',
      items: [
        { title: 'Executive Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { title: 'CRM Directory', href: '/crm', icon: Users },
        { title: 'Lead Pipeline', href: '/crm?tab=leads', icon: Building2 },
        { title: 'Partner Ecosystem', href: '/partners', icon: Handshake },
      ],
    },
    {
      title: 'ENGINEERING & SALES',
      items: [
        { title: 'Site Survey & Feasibility', href: '/engineering?tab=survey', icon: Compass },
        { title: 'Solar Design & Calculator', href: '/engineering', icon: Calculator },
        { title: 'Dynamic Pricing Engine', href: '/engineering?tab=pricing', icon: FileSpreadsheet },
        { title: 'Quotation Proposals', href: '/engineering?tab=quotations', icon: FileCheck2 },
      ],
    },
    {
      title: 'EXECUTION & OPERATIONS',
      items: [
        { title: 'Project Management', href: '/projects', icon: FolderKanban },
        { title: 'Procurement POs', href: '/projects?tab=procurement', icon: ShoppingBag },
        { title: 'Inventory & Warehouses', href: '/projects?tab=inventory', icon: Boxes },
        { title: 'Finance & Commission', href: '/projects?tab=finance', icon: Wallet },
      ],
    },
    {
      title: 'AFTER-SALES & TELEMETRY',
      items: [
        { title: 'Warranty & Claims', href: '/scada?tab=warranty', icon: ShieldCheck },
        { title: 'AMC Contracts', href: '/scada?tab=amc', icon: Layers },
        { title: 'Field Service Tickets', href: '/scada?tab=service', icon: Wrench },
        { title: 'GenAI Solar Assistant', href: '/scada?tab=ai', icon: Bot },
        { title: 'SCADA IoT Telemetry', href: '/scada', icon: Activity },
      ],
    },
    {
      title: 'BUSINESS INTELLIGENCE & ANALYTICS',
      items: [
        { title: 'Executive CEO Dashboard', href: '/reports?tab=executive', icon: BarChart3, badge: 'Phase 13.3' },
        { title: 'BI & Advanced Analytics', href: '/reports?tab=analytics', icon: Activity },
        { title: 'Custom Report Builder', href: '/reports?tab=builder', icon: Layers },
        { title: 'Export & Schedule Center', href: '/reports?tab=schedule', icon: FileText },
      ],
    },
    {
      title: 'SAAS MULTI-TENANT PLATFORM',
      items: [
        { title: 'Global Admin & SaaS Console', href: '/saas', icon: Building, badge: 'Phase 13.6' },
      ],
    },
    {
      title: 'CUSTOMER SELF-SERVICE PORTAL',
      items: [
        { title: 'Customer Experience Portal', href: '/customer', icon: Users, badge: 'Phase 13.5' },
      ],
    },
    {
      title: 'OPEN PLATFORM & MARKETPLACE',
      items: [
        { title: 'Developer Portal & Marketplace', href: '/marketplace', icon: Store, badge: 'Phase 15.0' },
      ],
    },
    {
      title: 'ENTERPRISE OPERATIONS CENTER (NOC/SOC)',
      items: [
        { title: 'Operations, NOC & SOC', href: '/operations', icon: Activity, badge: 'Phase 14.3' },
      ],
    },
    {
      title: 'CUSTOMER SUCCESS & OPERATIONS',
      items: [
        { title: 'Customer Success & Ops', href: '/customer-success', icon: HeartHandshake, badge: 'Phase 14.2' },
      ],
    },
    {
      title: 'PRODUCTION PILOT & GO-LIVE',
      items: [
        { title: 'Pilot & Go-Live Validation', href: '/pilot', icon: Rocket, badge: 'Phase 14.1' },
      ],
    },
    {
      title: 'INTEGRATIONS & INFRASTRUCTURE',
      items: [
        { title: 'Enterprise Integration Hub', href: '/integrations', icon: Cpu, badge: 'Phase 13.4' },
      ],
    },
    {
      title: 'MIGRATION & ONBOARDING',
      items: [
        { title: 'Data Import & Migration', href: '/migration', icon: Database, badge: 'Phase 13.2' },
        { title: 'Customer Onboarding', href: '/onboarding', icon: UserPlus, badge: 'Active' },
      ],
    },
    {
      title: 'ADMIN & COMPLIANCE',
      items: [
        { title: 'Audit & System Settings', href: '/saas?tab=settings', icon: Settings },
        { title: 'User & RBAC Access', href: '/saas?tab=rbac', icon: UserCog },
      ],
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 hidden md:flex h-screen w-64 flex-col border-r border-slate-200 bg-slate-900 text-slate-100 dark:border-slate-800">
      {/* Brand Header */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-slate-950 shadow-md">
          <Sun className="h-6 w-6 font-bold" />
        </div>
        <div>
          <h1 className="text-sm font-extrabold tracking-wide text-white">SUNITE</h1>
          <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">Enterprise Web Portal</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <p className="mb-2 px-3 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-amber-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[9px] font-bold text-amber-300">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Version Footer */}
      <div className="border-t border-slate-800 p-4 text-center text-[10px] text-slate-400">
        <p className="font-semibold text-slate-300">Sunite Platform v12.0.0</p>
        <p>Enterprise Web Portal • Phase 12</p>
      </div>
    </aside>
  );
};
