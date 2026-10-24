import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface AboutContactViewProps {
  onRequestAccess: () => void;
}

export const AboutContactView: React.FC<AboutContactViewProps> = ({ onRequestAccess }) => {
  const [messageSent, setMessageSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    subject: 'General Partnership & Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
  };

  return (
    <div className="space-y-12">
      {/* 1. About GVW Intelligence */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
            INSTITUTIONAL PROFILE & METHODOLOGY
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-950">
            About GVW Intelligence
          </h1>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
            GVW stands for <strong>Growth Value-Chain & Wealth Intelligence</strong>. We are a specialized African economic data, value-chain intelligence, and deal origination platform headquartered in Dar es Salaam, Tanzania.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
          <div className="space-y-2">
            <h3 className="text-base font-serif font-bold text-gray-950">The Core Problem</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Investors looking at African markets encounter either high-level macroeconomic summaries with no operational depth, or fragmented local information hidden inside bureaucratic silos and informal networks.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-serif font-bold text-gray-950">The GVW Solution</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We deconstruct African markets through real value chains: from rural farmers and mining concessions to regional transport corridors, processing facilities, and international export ports.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-serif font-bold text-gray-950">Actionable Outcome</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Capital allocators, private equity funds, development finance institutions (DFIs), and corporates make informed capital allocation decisions backed by verified unit economics and deal origination.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Offices & Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          {messageSent ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-950">Inquiry Dispatched</h3>
              <p className="text-xs text-gray-600 max-w-md mx-auto">
                Thank you, {form.name}. Our research partner in Dar es Salaam will respond to {form.email} within one business day.
              </p>
              <button
                onClick={() => setMessageSent(false)}
                className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <div className="text-xs font-mono font-bold text-blue-900 uppercase">
                  DIRECT ENGAGEMENT
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-950 mt-1">
                  Contact Our Research Team
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Your Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Salim Rashid"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="name@organization.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Organization / Firm</label>
                  <input
                    type="text"
                    placeholder="e.g. East Africa Capital Advisors"
                    value={form.organization}
                    onChange={e => setForm({ ...form, organization: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">Inquiry Subject</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-900 focus:bg-white"
                  >
                    <option>General Partnership & Inquiry</option>
                    <option>Institutional Terminal Subscription</option>
                    <option>Bespoke Value-Chain Advisory Commission</option>
                    <option>Investment Deal Origination</option>
                    <option>Press & Editorial Citation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Message / Mandate Specifics *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="How can GVW Intelligence assist your investment or research mandate?"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-900 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
              >
                <span>Send Direct Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Physical Presence & Direct Lines */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="text-xs font-mono font-bold text-blue-900 uppercase">
              PHYSICAL PRESENCE
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-gray-950">Dar es Salaam Headquarters</div>
                  <div className="text-gray-600 text-[11px] leading-relaxed">
                    Level 14, Golden Jubilee Towers, Ohio Street<br />
                    Postcode 11101, Dar es Salaam, Tanzania
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-gray-950">Electronic Mail</div>
                  <div className="text-gray-600 text-[11px]">
                    intelligence@gvw.africa
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-gray-950">Institutional Desk</div>
                  <div className="text-gray-600 text-[11px]">
                    +255 22 211 8400 (Mon - Fri, 08:00 - 18:00 EAT)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900 text-white rounded-2xl p-6 shadow-xs space-y-3">
            <div className="text-xs font-mono font-bold text-blue-200 uppercase">
              INSTITUTIONAL TERMINAL ACCESS
            </div>
            <h4 className="text-base font-serif font-bold">
              Require instant trial access to our raw databases?
            </h4>
            <p className="text-xs text-blue-100 leading-relaxed">
              Verified corporate finance, sovereign advisory, and development finance analysts receive accelerated 14-day terminal access.
            </p>
            <button
              onClick={onRequestAccess}
              className="w-full py-2 bg-white text-blue-950 font-semibold text-xs rounded-xl hover:bg-blue-50 transition cursor-pointer"
            >
              Request Access Modal →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
