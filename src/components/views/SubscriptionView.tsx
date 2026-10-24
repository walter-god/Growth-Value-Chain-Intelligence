import React, { useState } from 'react';
import { 
  Check, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  Sparkles, 
  Download, 
  HelpCircle, 
  X, 
  CheckCircle2, 
  Building2, 
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../../types';

interface SubscriptionViewProps {
  currentUser: UserProfile;
  onUpgradeSuccess: (tierName: 'GVW Insider' | 'Institutional Pro', cycle: 'monthly' | 'annual') => void;
  onCancelSubscription: () => void;
}

export const SubscriptionView: React.FC<SubscriptionViewProps> = ({
  currentUser,
  onUpgradeSuccess,
  onCancelSubscription,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'GVW Insider' | 'Institutional Pro'>('GVW Insider');
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'success'>('form');

  const isCurrentPremium = currentUser.role === 'premium';

  const handleStartCheckout = (plan: 'GVW Insider' | 'Institutional Pro') => {
    setSelectedPlan(plan);
    setCheckoutStep('form');
    setCheckoutModalOpen(true);
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
    setTimeout(() => {
      onUpgradeSuccess(selectedPlan, billingCycle);
    }, 1200);
  };

  return (
    <div id="subscription-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-[#D1D5DB]">
      {/* Masthead */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 text-xs font-mono font-bold uppercase tracking-widest rounded-full">
          GVW MEMBERSHIP ARCHITECTURE
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Invest in High-Conviction Venture Intelligence
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Uncompromised investigative reporting, confidential sovereign allocation disclosures, and proprietary secondary market valuation benchmarks.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3 text-xs font-semibold">
          <span className={billingCycle === 'monthly' ? 'text-white font-bold' : 'text-gray-400'}>Billed Monthly</span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-12 h-6 bg-[#1F232E] rounded-full p-1 transition relative flex items-center"
          >
            <div
              className={`w-4 h-4 bg-[#C5A059] rounded-full transition transform ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </button>
          <span className={billingCycle === 'annual' ? 'text-white font-bold flex items-center gap-1.5' : 'text-gray-400'}>
            Billed Annually
            <span className="bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        {/* Tier 1: Free Guest */}
        <div className="bg-[#0F1115] rounded-2xl border border-[#232733] p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
              PUBLIC ACCESS
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">Free Guest</h3>
            <p className="text-xs text-gray-400">
              Basic preview access to public wire headlines and select non-confidential dispatches.
            </p>
            <div className="pt-2">
              <span className="font-mono text-4xl font-bold text-white">$0</span>
              <span className="text-gray-500 text-xs"> / forever</span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-[#1F232E] text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>The Wire public headlines</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>2 free articles per month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Weekly public newsletter</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <X className="w-4 h-4 text-gray-600 shrink-0" />
                <span>Confidential deep-dive dossiers</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <X className="w-4 h-4 text-gray-600 shrink-0" />
                <span>Cap table valuation models (CSV)</span>
              </li>
            </ul>
          </div>

          <button
            disabled={currentUser.role === 'visitor' || currentUser.role === 'registered'}
            className="w-full py-2.5 rounded-xl border border-[#232733] text-gray-300 font-semibold text-xs hover:bg-[#14171F] disabled:opacity-50 transition"
          >
            {currentUser.role === 'registered' ? 'Current Plan' : 'Free Account'}
          </button>
        </div>

        {/* Tier 2: GVW Insider (Flagship) */}
        <div className="bg-[#0F1115] text-white rounded-2xl border-2 border-[#C5A059] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C5A059] text-[#0A0B0D] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
            MOST POPULAR • INDIVIDUAL INVESTOR
          </div>

          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wider">
              GVW INSIDER
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">Full Beat Access</h3>
            <p className="text-xs text-gray-300">
              For venture capitalists, angel syndicates, founders, and private market professionals.
            </p>
            <div className="pt-2">
              <span className="font-mono text-4xl font-bold text-white">
                {billingCycle === 'annual' ? '$290' : '$29'}
              </span>
              <span className="text-gray-400 text-xs">
                {billingCycle === 'annual' ? ' / year ($24/mo)' : ' / month'}
              </span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-[#1F232E] text-xs text-gray-200">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span><strong>Unmetered access</strong> to all 6 coverage beats</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Confidential deep-dive dossiers & investigations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Executive audio briefings for all articles</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Personalized My GVW radar & offline mobile app</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>The Insider Index (Weekly multiples & discounts)</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleStartCheckout('GVW Insider')}
            className={`w-full py-3 rounded-xl font-bold text-xs shadow-md transition ${isCurrentPremium ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40' : 'bg-[#C5A059] hover:bg-[#D4B06A] text-[#0A0B0D]'}`}
          >
            {isCurrentPremium ? 'Current Membership Active' : 'Start 14-Day Free Preview'}
          </button>
        </div>

        {/* Tier 3: Institutional Pro */}
        <div className="bg-[#0F1115] rounded-2xl border border-[#232733] p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
              ENTERPRISE & FIRMS
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">Institutional Pro</h3>
            <p className="text-xs text-gray-400">
              For venture partnerships, sovereign funds, family offices, and tech corporate development.
            </p>
            <div className="pt-2">
              <span className="font-mono text-4xl font-bold text-white">
                {billingCycle === 'annual' ? '$990' : '$99'}
              </span>
              <span className="text-gray-400 text-xs"> / seat / year</span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-[#1F232E] text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Everything in GVW Insider</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span><strong>CSV & Excel downloads</strong> of valuation datasets</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Quarterly private LP briefing calls with bureau leads</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Centralized billing, SAML SSO & team seat admin</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Dedicated research concierge support</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleStartCheckout('Institutional Pro')}
            className="w-full py-2.5 rounded-xl bg-[#1F232E] hover:bg-[#282D3A] text-white font-semibold text-xs border border-[#343A4C] transition"
          >
            Upgrade to Institutional
          </button>
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="max-w-4xl mx-auto pt-8 border-t border-[#1F232E] space-y-6">
        <h3 className="font-serif text-2xl font-bold text-white text-center">
          Compare Platform Capabilities
        </h3>

        <div className="bg-[#0F1115] rounded-xl border border-[#232733] overflow-hidden text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#14171F] border-b border-[#1F232E] text-gray-400 font-mono text-[11px] uppercase">
                <th className="p-4 font-semibold">Capability</th>
                <th className="p-4 font-semibold text-center">Free Guest</th>
                <th className="p-4 font-semibold text-center text-[#C5A059] bg-[#C5A059]/10">GVW Insider</th>
                <th className="p-4 font-semibold text-center">Institutional Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F232E] text-gray-300">
              <tr>
                <td className="p-4 font-medium">Wire Real-Time Dispatches</td>
                <td className="p-4 text-center">Public only</td>
                <td className="p-4 text-center font-semibold text-[#C5A059] bg-[#C5A059]/5">Instant Push</td>
                <td className="p-4 text-center">Instant Push</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Confidential Investigative Dossiers</td>
                <td className="p-4 text-center text-gray-500">Metered preview</td>
                <td className="p-4 text-center font-semibold text-[#C5A059] bg-[#C5A059]/5">Unmetered Unlimited</td>
                <td className="p-4 text-center">Unmetered Unlimited</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Financial Modeling Workbooks (CSV)</td>
                <td className="p-4 text-center text-gray-500">—</td>
                <td className="p-4 text-center text-gray-500 bg-[#C5A059]/5">—</td>
                <td className="p-4 text-center font-semibold text-[#C5A059]">Included</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Executive Narration & Audio Briefings</td>
                <td className="p-4 text-center text-gray-500">—</td>
                <td className="p-4 text-center font-semibold text-[#C5A059] bg-[#C5A059]/5">Included</td>
                <td className="p-4 text-center">Included</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Private Bureau Briefing Calls</td>
                <td className="p-4 text-center text-gray-500">—</td>
                <td className="p-4 text-center text-gray-500 bg-[#C5A059]/5">—</td>
                <td className="p-4 text-center font-semibold text-[#C5A059]">Quarterly (GP-only)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F1115] rounded-2xl border border-[#232733] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-gray-200">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {checkoutStep === 'form' ? (
              <form onSubmit={handleCompletePayment} className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C5A059]">
                    SECURE CHECKOUT
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Activate {selectedPlan}
                  </h3>
                  <p className="text-xs text-gray-400">
                    14-day free preview. You will not be charged if canceled within 14 days.
                  </p>
                </div>

                {/* Plan Summary */}
                <div className="bg-[#14171F] p-4 rounded-xl border border-[#232733] flex justify-between items-center text-xs">
                  <div>
                    <strong className="text-white">{selectedPlan}</strong>
                    <div className="text-gray-400 capitalize">{billingCycle} Billing Cycle</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-base text-white">
                      {selectedPlan === 'GVW Insider' ? (billingCycle === 'annual' ? '$290/yr' : '$29/mo') : '$990/yr'}
                    </div>
                    <div className="text-[10px] text-[#C5A059] font-medium">Billed after preview</div>
                  </div>
                </div>

                {/* Payment Fields */}
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-300 mb-1">Corporate or Personal Card Number</label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        defaultValue="4242 •••• •••• 9102"
                        className="w-full pl-9 pr-3 py-2.5 bg-[#0A0B0D] border border-[#232733] rounded-lg text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-300 mb-1">Expiration</label>
                      <input
                        type="text"
                        required
                        defaultValue="08/29"
                        className="w-full px-3 py-2 bg-[#0A0B0D] border border-[#232733] rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-300 mb-1">CVC / CVV</label>
                      <input
                        type="text"
                        required
                        defaultValue="842"
                        className="w-full px-3 py-2 bg-[#0A0B0D] border border-[#232733] rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-300 mb-1">Billing Name / Entity</label>
                    <input
                      type="text"
                      required
                      defaultValue={currentUser.name}
                      className="w-full px-3 py-2 bg-[#0A0B0D] border border-[#232733] rounded-lg text-xs text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#C5A059] hover:bg-[#D4B06A] text-[#0A0B0D] font-bold rounded-xl text-xs shadow-md transition"
                  >
                    Start 14-Day Risk-Free Membership
                  </button>
                  <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    256-bit encrypted TLS checkout. Cancel anytime with 1 click.
                  </p>
                </div>
              </form>
            ) : (
              /* Success confirmation state */
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-[#C5A059]/20 text-[#C5A059] rounded-full mx-auto flex items-center justify-center border border-[#C5A059]/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Welcome to GVW Insider
                </h3>
                <p className="text-xs text-gray-300 max-w-sm mx-auto">
                  Your membership is activated immediately. All investigative dossiers, audio briefings, and proprietary multiples are now unlocked.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setCheckoutModalOpen(false)}
                    className="px-6 py-2.5 bg-[#C5A059] text-[#0A0B0D] font-bold rounded-xl text-xs hover:bg-[#D4B06A] transition"
                  >
                    Return to Intelligence Feed
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
