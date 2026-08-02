'use client';

import React from 'react';
import { Handshake, Plus, Download, ShieldCheck } from 'lucide-react';

export default function PartnersPage() {
  const partners = [
    { id: 'PRT-101', name: 'Gujarat Energy Solutions', tier: 'Franchise Partner', region: 'North Gujarat', deals: 24, comm: '$142,000' },
    { id: 'PRT-102', name: 'SunTech EPC Ltd', tier: 'EPC Contractor', region: 'Saurashtra', deals: 18, comm: '$210,000' },
    { id: 'PRT-103', name: 'GreenField Marketing', tier: 'Marketing Referral', region: 'Central Gujarat', deals: 42, comm: '$85,000' },
    { id: 'PRT-104', name: 'Sanand Solar Crew', tier: 'Installation Vendor', region: 'Ahmedabad', deals: 31, comm: '$94,000' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Partner Ecosystem & Commission Tiers</h1>
          <p className="text-xs text-slate-500">Franchises, EPC Contractors, Marketing Referral Partners & Installation Vendors</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400">
          <Plus className="h-4 w-4" /> Register New Partner
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-bold text-slate-500">Total Active Partners</p>
          <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">318 Partners</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-bold text-slate-500">Regional Franchises</p>
          <p className="mt-2 text-2xl font-black text-amber-600">42 Hubs</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-bold text-slate-500">EPC Contractors</p>
          <p className="mt-2 text-2xl font-black text-blue-600">68 Teams</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-bold text-slate-500">Commission Disbursed</p>
          <p className="mt-2 text-2xl font-black text-emerald-600">$1,840,000</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 text-sm font-bold text-slate-800 dark:text-slate-200">Partner Directory</h3>
        <table className="w-full text-left text-xs">
          <thead className="border-b bg-slate-50 text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-800/50">
            <tr>
              <th className="p-3">Partner ID</th>
              <th className="p-3">Partner Name</th>
              <th className="p-3">Tier</th>
              <th className="p-3">Region</th>
              <th className="p-3">Deals Closed</th>
              <th className="p-3">Commission Earned</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-800">
            {partners.map((p) => (
              <tr key={p.id}>
                <td className="p-3 font-bold text-amber-600">{p.id}</td>
                <td className="p-3 font-bold">{p.name}</td>
                <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">{p.tier}</td>
                <td className="p-3">{p.region}</td>
                <td className="p-3 font-bold">{p.deals}</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">{p.comm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
