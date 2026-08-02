'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-2 py-3 px-6 text-xs text-slate-500 dark:text-slate-400">
      <Link href="/dashboard" className="flex items-center gap-1 hover:text-amber-500">
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </Link>

      {paths.map((p, idx) => {
        const href = '/' + paths.slice(0, idx + 1).join('/');
        const isLast = idx === paths.length - 1;
        const formattedName = p.charAt(0).toUpperCase() + p.slice(1).replace('-', ' ');

        return (
          <React.Fragment key={href}>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            {isLast ? (
              <span className="font-bold text-slate-800 dark:text-slate-200">{formattedName}</span>
            ) : (
              <Link href={href} className="hover:text-amber-500">
                {formattedName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
