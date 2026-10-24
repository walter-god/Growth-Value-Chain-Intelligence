import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  CreditCard, 
  Key, 
  Download, 
  Smartphone, 
  Check, 
  AlertCircle, 
  FileText, 
  Clock, 
  LogOut,
  Building2,
  Mail
} from 'lucide-react';
import { UserProfile } from '../../types';

interface AccountViewProps {
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  onUpgradeClick: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  currentUser,
  setCurrentUser,
  onUpgradeClick,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing'>('profile');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [saveToast, setSaveToast] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div id="account-settings-view" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#D1D5DB]">
      {/* Header */}
      <div className="border-b border-[#1F232E] pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
            <User className="w-4 h-4" />
            <span>ACCOUNT & CREDENTIALS</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-tight mt-1">
            Executive Profile & Security
          </h1>
        </div>

        {saveToast && (
          <div className="bg-[#C5A059] text-[#0A0B0D] font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-fade-in shadow-md">
            <Check className="w-3.5 h-3.5" /> Changes saved successfully
          </div>
        )}
      </div>

      {/* Tab Controls */}
      <div className="flex items-center border-b border-[#1F232E] space-x-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 transition relative ${activeTab === 'profile' ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Profile Details
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 transition relative ${activeTab === 'security' ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Security & 2FA
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`pb-3 transition relative ${activeTab === 'billing' ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Membership & Invoices
        </button>
      </div>

      {/* TAB 1: PROFILE */}
      {activeTab === 'profile' && (
        <form onSubmit={handleUpdateProfile} className="max-w-2xl space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#C5A059]/40"
            />
            <div>
              <div className="text-sm font-bold text-white">{currentUser.name}</div>
              <div className="text-xs text-gray-400">{currentUser.email}</div>
              <span className="inline-block mt-1 px-2 py-0.5 bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 rounded text-[10px] font-mono font-bold uppercase">
                {currentUser.role === 'premium' ? 'GVW Insider' : 'Registered Member'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-300 mb-1">Full Legal Name</label>
              <input
                type="text"
                defaultValue={currentUser.name}
                className="w-full px-3 py-2 bg-[#0F1115] border border-[#232733] rounded-lg text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-300 mb-1">Institutional Email</label>
              <input
                type="email"
                defaultValue={currentUser.email}
                className="w-full px-3 py-2 bg-[#0F1115] border border-[#232733] rounded-lg text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-300 mb-1">Professional Title</label>
              <input
                type="text"
                defaultValue={currentUser.title}
                className="w-full px-3 py-2 bg-[#0F1115] border border-[#232733] rounded-lg text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-300 mb-1">Firm or Organization</label>
              <input
                type="text"
                defaultValue={currentUser.organization}
                className="w-full px-3 py-2 bg-[#0F1115] border border-[#232733] rounded-lg text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#D4B06A] text-[#0A0B0D] rounded-lg text-xs font-bold transition shadow-md"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: SECURITY */}
      {activeTab === 'security' && (
        <div className="max-w-2xl space-y-6">
          <div className="p-5 bg-[#0F1115] rounded-xl border border-[#232733] flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span className="text-sm font-bold text-white">Two-Factor Authentication (2FA)</span>
              </div>
              <p className="text-xs text-gray-400">
                Enforce hardware security keys (YubiKey) or TOTP authenticator app for confidential intelligence access.
              </p>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${twoFactorEnabled ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40' : 'bg-[#14171F] text-gray-400'}`}
            >
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="p-5 bg-[#0F1115] rounded-xl border border-[#232733] space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-white">Active Terminal & Browser Sessions</div>
              <button className="text-xs text-rose-400 hover:underline font-semibold">
                Revoke All Other Sessions
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-[#14171F] rounded-lg border border-[#232733]">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-semibold text-white">MacBook Pro (Apple Silicon) • London Bureau</div>
                    <div className="text-[11px] text-gray-500 font-mono">Current Active Session • IP: 194.223.14.88</div>
                  </div>
                </div>
                <span className="text-[10px] bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 font-bold px-2 py-0.5 rounded">Active Now</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#14171F] rounded-lg border border-[#232733]">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-semibold text-white">GVW Mobile App (iOS 19) • San Francisco</div>
                    <div className="text-[11px] text-gray-500 font-mono">Last active 4 hours ago</div>
                  </div>
                </div>
                <span className="text-[10px] text-gray-500">Authorized</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BILLING & INVOICES */}
      {activeTab === 'billing' && (
        <div className="max-w-2xl space-y-6">
          <div className="p-6 bg-[#0F1115] text-white rounded-xl border border-[#232733] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
                ACTIVE SUBSCRIPTION
              </span>
              <span className="px-2 py-0.5 bg-[#C5A059] text-[#0A0B0D] font-bold text-[10px] uppercase rounded">
                Active
              </span>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {currentUser.subscription?.tier || 'Free Guest'}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {currentUser.role === 'premium' 
                  ? 'Annual Billing Plan • Next renewal on November 14, 2026 ($290/yr)'
                  : 'Free basic account • Upgrade to unlock all confidential dossiers and wire alerts.'}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              {currentUser.role !== 'premium' ? (
                <button
                  onClick={onUpgradeClick}
                  className="px-4 py-2 bg-[#C5A059] text-[#0A0B0D] font-bold rounded-lg text-xs hover:bg-[#D4B06A] transition shadow-md"
                >
                  Upgrade to GVW Insider
                </button>
              ) : (
                <button
                  onClick={onUpgradeClick}
                  className="px-4 py-2 bg-[#1F232E] text-white font-medium rounded-lg text-xs hover:bg-[#282D3A] border border-[#343A4C] transition"
                >
                  Manage Institutional Licenses
                </button>
              )}
            </div>
          </div>

          {/* Past Invoices */}
          <div className="p-5 bg-[#0F1115] rounded-xl border border-[#232733] space-y-3">
            <h3 className="text-sm font-bold text-white">Tax Invoices & Billing Receipts</h3>
            <div className="divide-y divide-[#1F232E] text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Invoice #GVW-88219 (Annual Membership)</div>
                  <div className="text-[11px] text-gray-500">Paid on Nov 14, 2025 • Visa ending in 9102</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-white">$290.00</span>
                  <button className="text-[#C5A059] hover:text-[#D4B06A] flex items-center gap-1 font-semibold">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
