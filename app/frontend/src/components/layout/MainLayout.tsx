'use client';

import React from 'react';
import { useLayout } from '@/lib/layout-context';
import { EnterpriseHeader } from '@/components/layout/EnterpriseHeader';
import { EnterpriseSidebar } from '@/components/layout/EnterpriseSidebar';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Minimize2 } from 'lucide-react';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isFullscreen, toggleFullscreen } = useLayout();

  if (isFullscreen) {
    return (
      <div className="relative min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {/* Floating Exit Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          title="Exit Full Screen (Esc)"
          className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-slate-900/90 px-3.5 py-2 text-xs font-bold text-amber-400 shadow-2xl border border-slate-700 hover:bg-slate-800 transition-all backdrop-blur"
        >
          <Minimize2 className="h-4 w-4" />
          <span>Exit Full Screen</span>
        </button>

        {/* 100% Viewport Width & Height Main Area */}
        <main className="min-h-screen w-full p-4 md:p-6">{children}</main>
      </div>
    );
  }

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
