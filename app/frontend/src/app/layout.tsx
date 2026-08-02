import React from 'react';
import '@/app/globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { LayoutProvider } from '@/lib/layout-context';
import { MainLayout } from '@/components/layout/MainLayout';

export const metadata = {
  title: 'Sunite Enterprise - Web Portal',
  description: 'Enterprise Renewable Energy Management Platform • Solar EPC, CRM, SCADA, Finance & Mobile Engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-slate-50 font-sans antialiased dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <AuthProvider>
          <LayoutProvider>
            <MainLayout>{children}</MainLayout>
          </LayoutProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
