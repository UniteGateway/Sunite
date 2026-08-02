'use client';

import React from 'react';
import { EnterpriseHeader } from '@/components/layout/EnterpriseHeader';
import { EnterpriseSidebar } from '@/components/layout/EnterpriseSidebar';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Enterprise Navigation Sidebar */}
      <EnterpriseSidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col pl-0 md:pl-64 w-full">
        <EnterpriseHeader />
        <Breadcrumbs />
        <main className="flex-1 p-6">{children}</main>

        <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          © 2026 Sunite Enterprise Web Portal • Version 12.0.0 Production Release
        </footer>
      </div>
    </div>
  );
};
