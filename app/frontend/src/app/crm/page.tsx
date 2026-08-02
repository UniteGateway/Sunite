'use client';

import React from 'react';
import { Users, Plus, Download, Search, Filter } from 'lucide-react';

export default function CrmPage() {
  const customers = [
    { id: 'CUST-1001', name: 'Ramesh Forge Pvt Ltd', type: 'Commercial', cap: '500 kW', status: 'Active', val: '$320,000' },
    { id: 'CUST-1002', name: 'Sanand Industrial Estate', type: 'Industrial', cap: '2.5 MW', status: 'Active', val: '$1,850,000' },
    { id: 'CUST-1003', name: 'Vadodara Tech Hub', type: 'Commercial', cap: '800 kW', status: 'Survey Done', val: '$510,000' },
    { id: 'CUST-1004', name: 'Mundra Cold Storage', type: 'Industrial', cap: '1.2 MW', status: 'Installation', val: '$940,000' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">CRM & Customer Accounts 360°</h1>
          <p className="text-xs text-slate-500">Customer Master, Capacity Installed, Billing & Site Records</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400">
            <Plus className="h-4 w-4" /> Add Customer
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between pb-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search customers by name, GST or ID..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs focus:outline-none dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <button className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400">
            <Filter className="h-4 w-4" /> Filter Options
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b bg-slate-50 text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-800/50">
              <tr>
                <th className="p-3">Customer ID</th>
                <th className="p-3">Account Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Capacity</th>
                <th className="p-3">Contract Value</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-amber-600">{c.id}</td>
                  <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{c.name}</td>
                  <td className="p-3">{c.type}</td>
                  <td className="p-3 font-semibold">{c.cap}</td>
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">{c.val}</td>
                  <td className="p-3">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
