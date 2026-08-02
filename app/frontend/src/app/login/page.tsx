'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Sun, Shield, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('v.sharma@sunite.com');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Super Admin');

  const roles: UserRole[] = [
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20">
            <Sun className="h-8 w-8 font-bold" />
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-white">SUNITE ENTERPRISE</h2>
          <p className="mt-1 text-xs text-slate-400">Enterprise Web Portal • Phase 12 Single Sign-On</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Select Role Persona</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-xs font-semibold text-amber-400 focus:border-amber-500 focus:outline-none"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  Role: {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Corporate Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/25 hover:bg-amber-400 transition-all"
          >
            <span>Authenticate as {selectedRole}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <Shield className="h-3.5 w-3.5 text-emerald-500" />
          <span>OAuth2 & JWT Protected • NestJS API Gateway v1.0</span>
        </div>
      </div>
    </div>
  );
}
