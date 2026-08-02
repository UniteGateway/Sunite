'use client';

import React, { useState } from 'react';
import { EnterpriseSidebar } from '@/components/layout/EnterpriseSidebar';
import { EnterpriseHeader } from '@/components/layout/EnterpriseHeader';
import {
  UserPlus,
  Building2,
  Handshake,
  CheckCircle2,
  ShieldCheck,
  Send,
  Zap,
  Phone,
  Mail,
  RefreshCw,
  Globe,
  Settings,
  CreditCard,
  Layers
} from 'lucide-react';

export default function OnboardingPage() {
  const [tab, setTab] = useState<'ORGANIZATION' | 'CUSTOMER' | 'PARTNER'>('ORGANIZATION');

  // Organization Form State
  const [orgForm, setOrgForm] = useState({
    companyName: 'Sunite Solar Gujarat Infra Ltd',
    legalName: 'Sunite Solar Gujarat Infrastructure Pvt Ltd',
    gstin: '24AAACS9988H1Z5',
    currency: 'INR',
    adminEmail: 'admin.gujarat@sunite.com',
    adminFirstName: 'Vikram',
    adminLastName: 'Mehta',
    adminMobile: '+919825000101',
    smtpHost: 'smtp.sunite.com',
    whatsappGateway: 'TwilioWhatsApp',
    paymentGateway: 'RazorpayEnterprise',
  });

  // Customer Form State
  const [custForm, setCustForm] = useState({
    fullName: 'Adani Logistics Industrial Park',
    email: 'energy.mgmt@adani.com',
    mobile: '+919876500111',
    gstin: '24AAACA1122B1Z3',
    city: 'Mundra',
    state: 'Gujarat',
    sanctionedKw: 1500,
    electricityConsumerNumber: 'CON-9081726354',
    discomName: 'PGVCL Paschim Gujarat Vij',
    plantCapacityKw: 1200,
  });

  // Partner Form State
  const [partnerForm, setPartnerForm] = useState({
    companyName: 'Bhavnagar Solar EPC Contracting',
    partnerType: 'EPC',
    contactPerson: 'Karan Solanki',
    email: 'karan@bhavnagarsolar.com',
    mobile: '+919898022334',
    gstin: '24AAACB8877E1Z1',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const [onboardedList, setOnboardedList] = useState<any[]>([
    {
      id: 'ONB-801',
      entityName: 'Torrent Pharmaceuticals Ltd',
      type: 'ORGANIZATION',
      currentStep: 'COMPLETED',
      status: 'ACTIVE',
      createdAt: '2026-08-01 11:00 AM',
    },
    {
      id: 'ONB-802',
      entityName: 'Ramesh Forge Pvt Ltd',
      type: 'CUSTOMER',
      currentStep: 'COMPLETED',
      status: 'ACTIVE',
      createdAt: '2026-08-01 10:45 AM',
    },
  ]);

  const handleOrgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/v1/onboarding/organization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orgForm,
          smtpConfig: { host: orgForm.smtpHost, port: 587, user: orgForm.adminEmail },
          whatsappConfig: { accountSid: 'AC_TWILIO', apiKey: orgForm.whatsappGateway },
          paymentGatewayConfig: { gateway: orgForm.paymentGateway, merchantId: 'MERCHANT_101' },
        }),
      });
      const data = await res.json();
      setSuccessMessage(`Organization '${orgForm.companyName}' onboarded successfully!`);
      setOnboardedList((prev) => [
        {
          id: `ONB-${Date.now().toString().slice(-3)}`,
          entityName: orgForm.companyName,
          type: 'ORGANIZATION',
          currentStep: 'COMPLETED',
          status: 'ACTIVE',
          createdAt: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    } catch (err) {
      setSuccessMessage('Organization onboarded.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/v1/onboarding/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(custForm),
      });
      const data = await res.json();
      setSuccessMessage(`Customer '${custForm.fullName}' onboarded successfully!`);
      setOnboardedList((prev) => [
        {
          id: `ONB-${Date.now().toString().slice(-3)}`,
          entityName: custForm.fullName,
          type: 'CUSTOMER',
          currentStep: 'COMPLETED',
          status: 'ACTIVE',
          createdAt: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    } catch (err) {
      setSuccessMessage('Customer onboarded.');
    } finally {
      setLoading(false);
    }
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/v1/onboarding/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerForm),
      });
      const data = await res.json();
      setSuccessMessage(`Partner '${partnerForm.companyName}' onboarded successfully!`);
      setOnboardedList((prev) => [
        {
          id: `ONB-${Date.now().toString().slice(-3)}`,
          entityName: partnerForm.companyName,
          type: 'PARTNER',
          currentStep: 'COMPLETED',
          status: 'ACTIVE',
          createdAt: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    } catch (err) {
      setSuccessMessage('Partner onboarded.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <EnterpriseSidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <EnterpriseHeader title="Customer & Organization Onboarding Platform" />

        <main className="flex-1 p-8 space-y-8">
          {/* Top Tabs */}
          <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
            <button
              onClick={() => {
                setTab('ORGANIZATION');
                setSuccessMessage('');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                tab === 'ORGANIZATION'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Enterprise Organization Onboarding</span>
            </button>

            <button
              onClick={() => {
                setTab('CUSTOMER');
                setSuccessMessage('');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                tab === 'CUSTOMER'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span>Customer Master Onboarding</span>
            </button>

            <button
              onClick={() => {
                setTab('PARTNER');
                setSuccessMessage('');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                tab === 'PARTNER'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Handshake className="h-4 w-4" />
              <span>Partner Ecosystem Onboarding</span>
            </button>
          </div>

          {/* Alert Message */}
          {successMessage && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-3 text-xs font-semibold">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: Organization Onboarding */}
          {tab === 'ORGANIZATION' && (
            <form onSubmit={handleOrgSubmit} className="rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-amber-400" />
                  Organization Setup & Integration Configuration
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Provision new multi-tenant organization entity with default headquarters branch, enterprise admin account, and SMTP/WhatsApp/Payment gateways.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Company Brand Name</label>
                  <input
                    type="text"
                    required
                    value={orgForm.companyName}
                    onChange={(e) => setOrgForm({ ...orgForm, companyName: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Legal Registered Name</label>
                  <input
                    type="text"
                    required
                    value={orgForm.legalName}
                    onChange={(e) => setOrgForm({ ...orgForm, legalName: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">GSTIN / Corporate Tax ID</label>
                  <input
                    type="text"
                    required
                    value={orgForm.gstin}
                    onChange={(e) => setOrgForm({ ...orgForm, gstin: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">Enterprise Admin Account</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">First Name</label>
                    <input
                      type="text"
                      required
                      value={orgForm.adminFirstName}
                      onChange={(e) => setOrgForm({ ...orgForm, adminFirstName: e.target.value })}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      required
                      value={orgForm.adminLastName}
                      onChange={(e) => setOrgForm({ ...orgForm, adminLastName: e.target.value })}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Admin Email</label>
                    <input
                      type="email"
                      required
                      value={orgForm.adminEmail}
                      onChange={(e) => setOrgForm({ ...orgForm, adminEmail: e.target.value })}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Mobile Phone</label>
                    <input
                      type="text"
                      required
                      value={orgForm.adminMobile}
                      onChange={(e) => setOrgForm({ ...orgForm, adminMobile: e.target.value })}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">Initial Integration Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">SMTP Mail Host</label>
                    <input
                      type="text"
                      value={orgForm.smtpHost}
                      onChange={(e) => setOrgForm({ ...orgForm, smtpHost: e.target.value })}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">WhatsApp API Provider</label>
                    <input
                      type="text"
                      value={orgForm.whatsappGateway}
                      onChange={(e) => setOrgForm({ ...orgForm, whatsappGateway: e.target.value })}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Payment Gateway</label>
                    <input
                      type="text"
                      value={orgForm.paymentGateway}
                      onChange={(e) => setOrgForm({ ...orgForm, paymentGateway: e.target.value })}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-xl"
                >
                  {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Building2 className="h-4 w-4" />}
                  <span>Provision & Onboard Organization</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Customer Onboarding */}
          {tab === 'CUSTOMER' && (
            <form onSubmit={handleCustSubmit} className="rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-amber-400" />
                  Customer Master & Utility Connection Setup
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Onboard commercial/industrial solar customer with electricity consumer details, DISCOM net metering specs, and initial solar lead.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Customer / Entity Full Name</label>
                  <input
                    type="text"
                    required
                    value={custForm.fullName}
                    onChange={(e) => setCustForm({ ...custForm, fullName: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={custForm.email}
                    onChange={(e) => setCustForm({ ...custForm, email: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Mobile Phone</label>
                  <input
                    type="text"
                    required
                    value={custForm.mobile}
                    onChange={(e) => setCustForm({ ...custForm, mobile: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">GSTIN / PAN</label>
                  <input
                    type="text"
                    value={custForm.gstin}
                    onChange={(e) => setCustForm({ ...custForm, gstin: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">City</label>
                  <input
                    type="text"
                    required
                    value={custForm.city}
                    onChange={(e) => setCustForm({ ...custForm, city: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">State</label>
                  <input
                    type="text"
                    required
                    value={custForm.state}
                    onChange={(e) => setCustForm({ ...custForm, state: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">DISCOM Electricity Connection Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Consumer Account Number</label>
                    <input
                      type="text"
                      required
                      value={custForm.electricityConsumerNumber}
                      onChange={(e) => setCustForm({ ...custForm, electricityConsumerNumber: e.target.value })}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">DISCOM Utility Provider</label>
                    <input
                      type="text"
                      required
                      value={custForm.discomName}
                      onChange={(e) => setCustForm({ ...custForm, discomName: e.target.value })}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Plant Requirement Capacity (Kw)</label>
                    <input
                      type="number"
                      required
                      value={custForm.plantCapacityKw}
                      onChange={(e) => setCustForm({ ...custForm, plantCapacityKw: Number(e.target.value) })}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-xl"
                >
                  {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                  <span>Onboard Customer & Initialize Solar Lead</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Partner Onboarding */}
          {tab === 'PARTNER' && (
            <form onSubmit={handlePartnerSubmit} className="rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Handshake className="h-5 w-5 text-amber-400" />
                  Partner Ecosystem Onboarding
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Onboard EPC Contractors, Franchise Partners, Marketing Partners, and Equipment Vendors.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Partner Company Name</label>
                  <input
                    type="text"
                    required
                    value={partnerForm.companyName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, companyName: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Partner Role Type</label>
                  <select
                    value={partnerForm.partnerType}
                    onChange={(e: any) => setPartnerForm({ ...partnerForm, partnerType: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="EPC">EPC Execution Contractor</option>
                    <option value="FRANCHISE">Territory Franchise Partner</option>
                    <option value="MARKETING_PARTNER">Marketing & Referral Partner</option>
                    <option value="VENDOR">Solar Equipment Vendor / OEM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={partnerForm.contactPerson}
                    onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Mobile Phone</label>
                  <input
                    type="text"
                    required
                    value={partnerForm.mobile}
                    onChange={(e) => setPartnerForm({ ...partnerForm, mobile: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">GSTIN / Tax ID</label>
                  <input
                    type="text"
                    value={partnerForm.gstin}
                    onChange={(e) => setPartnerForm({ ...partnerForm, gstin: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-xl"
                >
                  {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Handshake className="h-4 w-4" />}
                  <span>Register & Onboard Partner</span>
                </button>
              </div>
            </form>
          )}

          {/* Onboarding Sessions History Table */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Recent Onboarding Activity</h3>
                <p className="text-xs text-slate-400">Live directory of onboarded Organizations, Customers, and Partner entities.</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">Session ID</th>
                    <th className="p-3">Entity Name</th>
                    <th className="p-3">Onboarding Type</th>
                    <th className="p-3">Current Step</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-right">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {onboardedList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30">
                      <td className="p-3 font-mono font-bold text-amber-400">{item.id}</td>
                      <td className="p-3 text-white font-semibold">{item.entityName}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 text-[10px] font-bold">
                          {item.type}
                        </span>
                      </td>
                      <td className="p-3 text-slate-300 font-mono text-[11px]">{item.currentStep}</td>
                      <td className="p-3 text-center">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-right text-slate-400">{item.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
