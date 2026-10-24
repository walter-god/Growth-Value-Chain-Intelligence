import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Shield, ArrowRight, Building2, Mail, User, Phone, Briefcase, Zap, Sparkles } from 'lucide-react';

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccessGranted?: (userData: {
    fullName: string;
    workEmail: string;
    organization: string;
    jobTitle: string;
    accessType: string;
  }) => void;
}

export const RequestAccessModal: React.FC<RequestAccessModalProps> = ({ 
  isOpen, 
  onClose,
  onAccessGranted 
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [autoRedirect, setAutoRedirect] = useState(true);
  const [formData, setFormData] = useState({
    fullName: 'Walter Godliving',
    workEmail: 'waltergodliving123@gmail.com',
    organization: 'Global Capital & Advisory Partners',
    jobTitle: 'Principal / Investment Director',
    phone: '+255 700 000 000',
    sectorInterest: 'All Sectors (Cross-Market)',
    accessType: 'Institutional Pro Terminal (Immediate Access)',
    notes: ''
  });

  // Auto-redirect countdown when access is activated
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (submitted && autoRedirect && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (submitted && autoRedirect && countdown === 0) {
      handleLaunchTerminal();
    }
    return () => clearTimeout(timer);
  }, [submitted, autoRedirect, countdown]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setCountdown(3);
  };

  const handleInstantTrial = () => {
    setSubmitted(true);
    setCountdown(2);
  };

  const handleLaunchTerminal = () => {
    if (onAccessGranted) {
      onAccessGranted({
        fullName: formData.fullName || 'Trial Member',
        workEmail: formData.workEmail || 'member@gvw.africa',
        organization: formData.organization || 'Institutional Partner',
        jobTitle: formData.jobTitle || 'Institutional Analyst',
        accessType: formData.accessType
      });
    }
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 relative my-8 text-gray-900">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-5">
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="absolute -top-1 -right-1 bg-blue-900 text-white p-1 rounded-full shadow-sm">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold tracking-wide uppercase border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ACCESS ACTIVATED IMMEDIATELY (NO 2-HR WAIT)</span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-gray-950">
                Trial Terminal Active
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Welcome, <span className="font-semibold text-gray-900">{formData.fullName}</span>. Your 14-day institutional trial terminal has been provisioned <strong className="text-blue-900 font-bold">immediately</strong> for <span className="font-semibold text-gray-900">{formData.organization || 'Your Firm'}</span>. You do not need to wait 2 hours—all 6 databases and raw feeds are unlocked right now.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-left space-y-2 text-gray-700">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-500">Terminal Access Status</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold font-mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> ACTIVE IMMEDIATELY
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div>
                  <span className="text-gray-500 block">Assigned Organization:</span>
                  <strong className="text-gray-900">{formData.organization || 'Partner Firm'}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Credentials Dispatched To:</span>
                  <strong className="text-gray-900 truncate block">{formData.workEmail}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Tier Granted:</span>
                  <strong className="text-blue-900">Institutional Pro Terminal</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Databases Unlocked:</span>
                  <strong className="text-emerald-700">All 6 Core DBs + CSV Feeds</strong>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                id="launch-trial-terminal-btn"
                onClick={handleLaunchTerminal}
                className="w-full py-3.5 bg-blue-900 hover:bg-blue-950 text-white text-sm font-semibold rounded-xl transition shadow-md shadow-blue-900/15 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Launch Trial Terminal Immediately</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-gray-500 px-1">
                <span>Auto-launching terminal in {countdown}s...</span>
                <button
                  onClick={() => setAutoRedirect(false)}
                  className="text-gray-400 hover:text-gray-600 underline text-[10px]"
                >
                  Stay on this screen
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-blue-900 uppercase">
                  <Shield className="w-4 h-4" />
                  <span>GVW INTELLIGENCE TRIAL ACCESS</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-600" />
                  <span>IMMEDIATE ACCESS</span>
                </span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-950 mt-1">
                Request Institutional Terminal Access
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                Trial access is granted <strong className="text-blue-950 font-semibold">immediately upon request</strong>. No 2-hour delay. Explore raw economic time-series, value-chain cost teardowns, verified company cap tables, and investment deals.
              </p>
            </div>

            {/* Instant 1-Click Fast Track Card */}
            <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl flex items-center justify-between gap-3">
              <div className="space-y-0.5 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-950 font-serif">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Instant 14-Day Institutional Trial</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-tight">
                  Skip waiting — launch the terminal now with pre-provisioned demo analyst credentials.
                </p>
              </div>
              <button
                type="button"
                id="instant-trial-activate-btn"
                onClick={handleInstantTrial}
                className="px-3.5 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-lg shrink-0 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Instant Launch</span>
                <Zap className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Walter Godliving"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-700 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">Institutional Email *</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      required
                      type="email"
                      placeholder="name@firm.com"
                      value={formData.workEmail}
                      onChange={e => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-700 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Organization / Firm *</label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Standard Chartered / IFC / Capital Advisory"
                      value={formData.organization}
                      onChange={e => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-700 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">Job Title / Role</label>
                  <div className="relative">
                    <Briefcase className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Investment Director"
                      value={formData.jobTitle}
                      onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-700 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Primary Sector Interest</label>
                  <select
                    value={formData.sectorInterest}
                    onChange={e => setFormData({ ...formData, sectorInterest: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-700 focus:bg-white transition"
                  >
                    <option>All Sectors (Cross-Market)</option>
                    <option>Agriculture & Agribusiness Value Chains</option>
                    <option>Mining & Critical Transition Minerals</option>
                    <option>Energy, Gas & Utilities</option>
                    <option>Industrial Manufacturing & Cement</option>
                    <option>Port Logistics & Transportation</option>
                    <option>Banking, FinTech & Wealth Creation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">Access Tier Requested</label>
                  <select
                    value={formData.accessType}
                    onChange={e => setFormData({ ...formData, accessType: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-700 focus:bg-white transition"
                  >
                    <option>Institutional Pro Terminal (Immediate 14-Day Trial)</option>
                    <option>Enterprise Research Subscription (Multi-seat)</option>
                    <option>Bespoke Value-Chain Advisory & Teardowns</option>
                    <option>Academic / DFI Research Fellowship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Specific Research or Deal Mandate (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Tell us about specific commodities, regions or investment thresholds you are evaluating..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-700 focus:bg-white transition"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-access-request-btn"
                  className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Activate Trial Terminal Immediately</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-gray-500 text-center">
                Immediate access guaranteed. Your session begins as soon as you confirm.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
