import React, { useState } from 'react';
import { 
  X, 
  Check, 
  CreditCard, 
  Smartphone, 
  Building, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Download, 
  QrCode, 
  CheckCircle2, 
  RefreshCw,
  Clock,
  FileText,
  AlertCircle
} from 'lucide-react';
import { PaymentGatewayType, SubscriptionPlan, SubscriptionTier, UserProfile } from '../../types';
import { INITIAL_USER } from '../../data/mockData';

interface SubscriptionPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile;
  particularInfoContext?: string;
  contextInfo?: string;
  onSubscriptionSuccess: (updatedUser: UserProfile) => void;
}

const PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter Intelligence',
    tier: 'starter',
    priceUsd: 49,
    priceTzs: 130000,
    interval: 'month',
    tagline: 'For independent analysts, researchers & regional SMEs.',
    features: [
      'Full Macroeconomic Database (20+ indicators)',
      'Value-Chain Core Node Architecture',
      'Standard Company Profiles & Directories',
      'Public Deal Flow Highlights',
      'Standard PDF Report Previews'
    ]
  },
  {
    id: 'plan-pro',
    name: 'Institutional Pro Terminal',
    tier: 'pro',
    priceUsd: 199,
    priceTzs: 520000,
    interval: 'month',
    highlighted: true,
    badge: 'MOST POPULAR FOR INVESTORS',
    tagline: 'Complete access to all 6 databases, raw CSV exports, and deal rooms.',
    features: [
      'All 6 Comprehensive Intelligence Databases',
      'Granular Value-Chain Margin Teardowns & Arbitrage',
      'Verified Shareholder Cap Tables & Historical Financials',
      'Confidential Deal Room & Sponsor Contacts',
      'Direct CSV / JSON Data Feed Downloads',
      'Interactive Tanzania Economic Regional Masterplan',
      'Priority Research Briefings & Custom Data Requests'
    ]
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise & Sovereign License',
    tier: 'enterprise',
    priceUsd: 890,
    priceTzs: 2350000,
    interval: 'year',
    badge: 'MULTI-SEAT & ADVISORY',
    tagline: 'For sovereign wealth funds, multinational banks & PE partners.',
    features: [
      'Multi-User Team License (Up to 10 Seats)',
      'Direct API Integration with Unlimited Query Bandwidth',
      'Quarterly In-Person / Private Briefing with GVW Economists',
      'Bespoke Value Chain Cost & Margin Modeling',
      'Custom Due Diligence Pack for Shovel-Ready Assets',
      'Dedicated Account Director & 24/7 Hotline'
    ]
  }
];

export const SubscriptionPaymentModal: React.FC<SubscriptionPaymentModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  particularInfoContext,
  contextInfo,
  onSubscriptionSuccess
}) => {
  const safeUser = currentUser || INITIAL_USER;
  const activeContext = particularInfoContext || contextInfo;
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-pro');
  const [currency, setCurrency] = useState<'USD' | 'TZS'>('USD');
  const [selectedGateway, setSelectedGateway] = useState<PaymentGatewayType>('mobile_networks');
  
  // Mobile Network details
  const [mobileProvider, setMobileProvider] = useState<'mpesa' | 'tigopesa' | 'airtel' | 'halopesa'>('mpesa');
  const [mobileNumber, setMobileNumber] = useState('0754 123 456');
  
  // Tanzania Bank details
  const [selectedBank, setSelectedBank] = useState<'crdb' | 'nmb' | 'stanbic' | 'kcb' | 'azania'>('crdb');
  const [bankReceiptRef, setBankReceiptRef] = useState('');

  // Stripe details
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [cardHolder, setCardHolder] = useState(safeUser?.name || 'Walter Godliving');

  // PayPal details
  const [paypalEmail, setPaypalEmail] = useState(safeUser?.email || 'investor@firm.com');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  if (!isOpen) return null;

  const currentPlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[1];
  const priceDisplay = currency === 'USD' ? `$${currentPlan.priceUsd}` : `TZS ${currentPlan.priceTzs.toLocaleString()}`;

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setProcessingStep('Initiating secure gateway transaction...');

    setTimeout(() => {
      if (selectedGateway === 'mobile_networks') {
        setProcessingStep(`Dispatching USSD Push prompt to ${mobileNumber} on ${mobileProvider.toUpperCase()}...`);
      } else if (selectedGateway === 'tz_banks') {
        setProcessingStep(`Verifying GePG Control Number & Bank Settlement for ${selectedBank.toUpperCase()}...`);
      } else if (selectedGateway === 'stripe') {
        setProcessingStep('Authorizing 256-bit 3D Secure card charge with Stripe...');
      } else if (selectedGateway === 'paypal') {
        setProcessingStep('Connecting to PayPal Merchant Vault & verifying payment...');
      } else {
        setProcessingStep('Validating transaction ledger confirmation...');
      }
    }, 1000);

    setTimeout(() => {
      setProcessingStep('Confirming institutional subscription credentials...');
    }, 2000);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentCompleted(true);

      const generatedReceipt = {
        invoiceNumber: `GVW-${Date.now().toString().slice(-6)}`,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        transactionId: `${selectedGateway.toUpperCase()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        planName: currentPlan.name,
        tier: currentPlan.tier,
        amount: priceDisplay,
        paymentGateway: selectedGateway,
        customerName: safeUser?.name || 'Institutional Partner',
        customerEmail: safeUser?.email || 'investor@firm.com',
        tinNumber: 'TRA-TIN: 104-982-331 • VRN: 40-029144-P',
        status: 'Active & Verified'
      };

      setReceiptData(generatedReceipt);

      // Upgrade user profile
      const updatedUser: UserProfile = {
        ...safeUser,
        role: 'pro',
        subscription: {
          tier: currentPlan.name,
          status: 'Active',
          cycle: currentPlan.interval === 'month' ? 'Monthly' : 'Annual',
          renewalDate: 'Sep 2027',
          amount: currentPlan.priceUsd
        },
        accessExpires: 'Full Pro Subscriber (Unlimited 365 Days)'
      };

      localStorage.setItem('gvw_auth_session', JSON.stringify(updatedUser));
      onSubscriptionSuccess(updatedUser);
    }, 3200);
  };

  const handleDismiss = () => {
    setPaymentCompleted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-gray-950/75 backdrop-blur-xs">
      <div 
        className="bg-white rounded-3xl border border-gray-200 shadow-2xl max-w-4xl w-full overflow-hidden animate-scale-in max-h-[94vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Branding */}
        <div className="p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-gray-950 text-white relative">
          <button
            onClick={handleDismiss}
            className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/20 bg-white p-0.5 shadow-xs shrink-0">
                <img
                  src="/IMG-20260903-WA0033.jpg"
                  alt="GVW Intelligence Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/gvw_logo.jpg';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-xl tracking-tight">
                    GVW Subscription & Intelligence Pass
                  </h3>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold rounded-md border border-emerald-500/30">
                    INSTANT UNLOCK
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-0.5">
                  Institutional access to all 6 databases, verified valuation models, and confidential deal pipelines.
                </p>
              </div>
            </div>

            {/* Currency Toggle */}
            <div className="inline-flex p-1 bg-white/10 rounded-xl border border-white/10 text-xs font-mono shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  currency === 'USD' ? 'bg-white text-gray-950 font-bold shadow-xs' : 'text-gray-300 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('TZS')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  currency === 'TZS' ? 'bg-white text-gray-950 font-bold shadow-xs' : 'text-gray-300 hover:text-white'
                }`}
              >
                TZS (Shillings)
              </button>
            </div>
          </div>

          {/* Context Banner: What is being unlocked */}
          {activeContext && (
            <div className="mt-4 p-3 bg-blue-900/50 border border-blue-400/30 rounded-xl flex items-center gap-2.5 text-xs text-blue-100">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span>Unlocking Deep Data: </span>
                <strong className="text-white font-semibold">{activeContext}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Modal Main Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {paymentCompleted && receiptData ? (
            /* PAYMENT COMPLETED / RECEIPT VIEW */
            <div className="space-y-6 animate-fade-in text-center max-w-xl mx-auto py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-serif font-bold text-gray-950">
                  Subscription Activated Successfully
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Your account has been upgraded to <strong>{receiptData.planName}</strong>. You now have unrestricted access across all GVW databases and research feeds.
                </p>
              </div>

              {/* Official Invoice Card */}
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-5 text-left text-xs font-mono space-y-3 shadow-inner">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <div>
                    <div className="font-bold text-gray-950 text-sm">GVW INTELLIGENCE LIMITED</div>
                    <div className="text-[10px] text-gray-500">{receiptData.tinNumber}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      PAID & ACTIVE
                    </span>
                    <div className="text-[10px] text-gray-500 mt-1">Inv #{receiptData.invoiceNumber}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-700">
                  <div>
                    <span className="text-gray-400">Subscriber: </span>
                    <span className="font-bold text-gray-900">{receiptData.customerName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Email: </span>
                    <span className="font-medium text-gray-900">{receiptData.customerEmail}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Plan: </span>
                    <span className="font-bold text-blue-900">{receiptData.planName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Amount Paid: </span>
                    <span className="font-bold text-emerald-700 text-xs">{receiptData.amount}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Gateway: </span>
                    <span className="font-medium capitalize">{receiptData.paymentGateway.replace('_', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Ref Code: </span>
                    <span className="font-bold text-gray-900">{receiptData.transactionId}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Print Receipt</span>
                </button>
                <button
                  onClick={handleDismiss}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enter Unlocked Intelligence Platform →</span>
                </button>
              </div>
            </div>
          ) : (
            /* STEP 1: CHOOSE PLAN & STEP 2: PAYMENT GATEWAYS */
            <>
              {/* Plan Cards Array */}
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center justify-between">
                  <span>1. SELECT YOUR SUBSCRIPTION TIER</span>
                  <span className="text-emerald-700 font-normal">All plans include 14-day money back guarantee</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {PLANS.map(plan => {
                    const isSelected = plan.id === selectedPlanId;
                    const price = currency === 'USD' ? `$${plan.priceUsd}` : `TZS ${(plan.priceTzs / 1000).toFixed(0)}k`;

                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                          isSelected
                            ? 'border-blue-900 bg-blue-50/40 ring-2 ring-blue-900/20 shadow-sm'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs'
                        }`}
                      >
                        {plan.badge && (
                          <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-blue-900 text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                            {plan.badge}
                          </span>
                        )}

                        <div>
                          <div className="flex items-center justify-between mt-1">
                            <h5 className="font-serif font-bold text-gray-950 text-base">
                              {plan.name}
                            </h5>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-blue-900 bg-blue-900 text-white' : 'border-gray-300'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>

                          <div className="mt-2 flex items-baseline gap-1">
                            <span className="text-2xl font-serif font-bold text-gray-950">
                              {price}
                            </span>
                            <span className="text-xs text-gray-500 font-mono">
                              /{plan.interval}
                            </span>
                          </div>

                          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                            {plan.tagline}
                          </p>

                          <div className="mt-3 pt-3 border-t border-gray-200/70 space-y-1.5">
                            {plan.features.map((feat, i) => (
                              <div key={i} className="flex items-start gap-1.5 text-[11px] text-gray-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Gateway Selector & Method Options */}
              <div className="pt-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3">
                  2. SELECT PAYMENT METHOD
                </div>

                {/* Gateway Tabs Array */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
                  {[
                    { id: 'mobile_networks', label: 'Mobile Networks', sub: 'M-Pesa / Tigo / Airtel', icon: Smartphone },
                    { id: 'tz_banks', label: 'Tanzania Banks', sub: 'CRDB / NMB / GePG', icon: Building },
                    { id: 'paypal', label: 'PayPal', sub: 'PayPal & Credit', icon: Sparkles },
                    { id: 'stripe', label: 'Stripe', sub: 'Visa / Mastercard / Amex', icon: CreditCard },
                    { id: 'wire_transfer', label: 'Wire / Crypto', sub: 'SWIFT / USDT / USDC', icon: QrCode },
                  ].map(tab => {
                    const isSelected = selectedGateway === tab.id;
                    const Icon = tab.icon;

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSelectedGateway(tab.id as PaymentGatewayType)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-blue-900 bg-blue-900 text-white shadow-xs'
                            : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-800'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-white' : 'text-blue-900'}`} />
                        <div>
                          <div className="text-xs font-bold leading-tight">{tab.label}</div>
                          <div className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-blue-200' : 'text-gray-500'}`}>
                            {tab.sub}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Gateway Detail Panel */}
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                  
                  {/* OPTION 1: MOBILE NETWORKS (TANZANIA & EAST AFRICA) */}
                  {selectedGateway === 'mobile_networks' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h6 className="font-serif font-bold text-sm text-gray-950">
                            East African Mobile Money (Instant USSD Push)
                          </h6>
                          <p className="text-xs text-gray-600">
                            Pay directly via your mobile operator. You will receive a prompt on your phone to enter your PIN.
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                          INSTANT SETTLEMENT
                        </span>
                      </div>

                      {/* Network selection */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'mpesa', name: 'Vodacom M-Pesa', till: 'Till: 552189', color: 'border-red-500/50 bg-red-50/50' },
                          { id: 'tigopesa', name: 'Tigo Pesa', till: 'Lipa: 883102', color: 'border-blue-500/50 bg-blue-50/50' },
                          { id: 'airtel', name: 'Airtel Money', till: 'Lipa: 441920', color: 'border-red-600/50 bg-red-50/50' },
                          { id: 'halopesa', name: 'Halotel Halopesa', till: 'Lipa: 228491', color: 'border-orange-500/50 bg-orange-50/50' }
                        ].map(net => (
                          <div
                            key={net.id}
                            onClick={() => setMobileProvider(net.id as any)}
                            className={`p-2.5 rounded-xl border cursor-pointer transition ${
                              mobileProvider === net.id 
                                ? 'border-blue-900 bg-white ring-2 ring-blue-900/20 shadow-xs' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="text-xs font-bold text-gray-950">{net.name}</div>
                            <div className="text-[10px] font-mono text-gray-500">{net.till}</div>
                          </div>
                        ))}
                      </div>

                      {/* Phone Number Input */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                            Subscriber Mobile Number (Tanzania +255)
                          </label>
                          <input
                            type="text"
                            value={mobileNumber}
                            onChange={e => setMobileNumber(e.target.value)}
                            placeholder="0754 000 000 or 2557..."
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                            Amount to be Charged
                          </label>
                          <div className="px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono font-bold text-emerald-700 flex items-center justify-between">
                            <span>{priceDisplay}</span>
                            <span className="text-gray-400 font-normal">Auto FX at BOT Rate</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-xs text-blue-900 font-mono flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-blue-900 shrink-0" />
                        <span>Prompt format: USSD push will trigger within 5 seconds of clicking Confirm.</span>
                      </div>
                    </div>
                  )}

                  {/* OPTION 2: TANZANIA BANKS & GEPG */}
                  {selectedGateway === 'tz_banks' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h6 className="font-serif font-bold text-sm text-gray-950">
                            Tanzania Bank Direct Transfer & GePG Gateway
                          </h6>
                          <p className="text-xs text-gray-600">
                            Transfer directly from your Tanzanian bank app (SimBanking, NMB Mkononi, Internet Banking) or through GePG Control Number.
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-[10px] font-mono font-bold">
                          BOT REGULATED
                        </span>
                      </div>

                      {/* Bank selection */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {[
                          { id: 'crdb', name: 'CRDB Bank', acc: '0150 2894 1100' },
                          { id: 'nmb', name: 'NMB Bank', acc: '2011 0038 4920' },
                          { id: 'stanbic', name: 'Stanbic Bank', acc: '9120 0041 8832' },
                          { id: 'kcb', name: 'KCB Tanzania', acc: '4401 2291 0019' },
                          { id: 'azania', name: 'Azania Bank', acc: '1000 8920 3341' }
                        ].map(bank => (
                          <div
                            key={bank.id}
                            onClick={() => setSelectedBank(bank.id as any)}
                            className={`p-2.5 rounded-xl border cursor-pointer transition ${
                              selectedBank === bank.id 
                                ? 'border-blue-900 bg-white ring-2 ring-blue-900/20 shadow-xs' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="text-xs font-bold text-gray-950">{bank.name}</div>
                            <div className="text-[9px] font-mono text-gray-500 mt-0.5">{bank.acc}</div>
                          </div>
                        ))}
                      </div>

                      {/* Bank instructions card */}
                      <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-2 text-xs font-mono">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-500">Government Electronic Payment (GePG) Control No:</span>
                          <span className="font-bold text-blue-950 bg-blue-50 px-2 py-0.5 rounded">
                            99123 0482 9102
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-500">Beneficiary:</span>
                          <span className="font-bold text-gray-900">GVW INTELLIGENCE LTD</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">SWIFT / BIC Code:</span>
                          <span className="font-bold text-gray-900">CORUTZTZ (CRDB) / NMBLTZTZ (NMB)</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                          Bank Transfer Reference / Transaction ID (Optional for instant matching)
                        </label>
                        <input
                          type="text"
                          value={bankReceiptRef}
                          onChange={e => setBankReceiptRef(e.target.value)}
                          placeholder="e.g. CRDB-TX-98421 or Bank Slip Reference"
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                      </div>
                    </div>
                  )}

                  {/* OPTION 3: PAYPAL */}
                  {selectedGateway === 'paypal' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h6 className="font-serif font-bold text-sm text-gray-950">
                            PayPal International Checkout
                          </h6>
                          <p className="text-xs text-gray-600">
                            Seamless international subscription payment in USD or EUR with buyer protection.
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-[10px] font-mono font-bold">
                          GLOBAL VERIFIED
                        </span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                          PayPal Registered Email
                        </label>
                        <input
                          type="email"
                          value={paypalEmail}
                          onChange={e => setPaypalEmail(e.target.value)}
                          placeholder="your-paypal-email@domain.com"
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                      </div>

                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>Supports PayPal Balance, Linked Credit Cards, and PayPal Credit financing.</span>
                      </div>
                    </div>
                  )}

                  {/* OPTION 4: STRIPE (CREDIT / DEBIT CARD) */}
                  {selectedGateway === 'stripe' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h6 className="font-serif font-bold text-sm text-gray-950">
                            Credit / Debit Card (Powered by Stripe)
                          </h6>
                          <p className="text-xs text-gray-600">
                            Direct card billing. Accepts Visa, MasterCard, American Express, and UnionPay.
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-700">
                          <Lock className="w-3.5 h-3.5" />
                          <span>PCI-DSS Level 1</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                            Card Number
                          </label>
                          <div className="relative">
                            <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={e => setCardNumber(e.target.value)}
                              placeholder="4242 4242 4242 4242"
                              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-900"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                              Expiry (MM/YY)
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={e => setCardExpiry(e.target.value)}
                              placeholder="12/28"
                              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono text-center focus:outline-none focus:ring-2 focus:ring-blue-900"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                              CVC / CVV
                            </label>
                            <input
                              type="text"
                              value={cardCvc}
                              onChange={e => setCardCvc(e.target.value)}
                              placeholder="883"
                              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono text-center focus:outline-none focus:ring-2 focus:ring-blue-900"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                              Postal Code
                            </label>
                            <input
                              type="text"
                              defaultValue="14111"
                              placeholder="ZIP / Postal"
                              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono text-center focus:outline-none focus:ring-2 focus:ring-blue-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={e => setCardHolder(e.target.value)}
                            placeholder="Name on card"
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* OPTION 5: WIRE / CRYPTO */}
                  {selectedGateway === 'wire_transfer' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h6 className="font-serif font-bold text-sm text-gray-950">
                            International Wire (SWIFT) or Stablecoin (USDT / USDC)
                          </h6>
                          <p className="text-xs text-gray-600">
                            Preferred for annual institutional or sovereign enterprise subscription agreements.
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 text-[10px] font-mono font-bold">
                          WEB3 & CORRESPONDENT
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3.5 bg-white rounded-xl border border-gray-200 space-y-1.5 text-xs font-mono">
                          <div className="font-bold text-gray-900 border-b border-gray-100 pb-1 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-blue-900" />
                            <span>International Wire (USD)</span>
                          </div>
                          <div>Bank: Citibank N.A. New York (Correspondent)</div>
                          <div>Account Name: GVW Intelligence Ltd</div>
                          <div>Account: 8849-2091-8821</div>
                          <div>IBAN: TZ89 CORU 0150 2894 1100</div>
                        </div>

                        <div className="p-3.5 bg-white rounded-xl border border-gray-200 space-y-1.5 text-xs font-mono">
                          <div className="font-bold text-gray-900 border-b border-gray-100 pb-1 flex items-center gap-1.5">
                            <QrCode className="w-3.5 h-3.5 text-purple-700" />
                            <span>USDT / USDC (TRC-20 / Solana)</span>
                          </div>
                          <div>Network: TRON (TRC-20) / SOLANA</div>
                          <div className="text-[10px] text-gray-500 truncate">
                            Address: TXYw8991204Kjmnz984210084321
                          </div>
                          <div className="text-emerald-700 font-bold text-[10px]">Zero conversion slippage</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action & Checkout Summary */}
              <div className="p-4 bg-gradient-to-r from-blue-950 to-slate-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                    TOTAL DUE TODAY • {currentPlan.name.toUpperCase()}
                  </div>
                  <div className="text-2xl font-serif font-bold text-white mt-0.5">
                    {priceDisplay} <span className="text-xs font-mono font-normal text-gray-300">/{currentPlan.interval}</span>
                  </div>
                  <div className="text-[11px] text-gray-300">
                    Payment Gateway: <strong className="text-white capitalize">{selectedGateway.replace('_', ' ')}</strong>
                  </div>
                </div>

                <button
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-gray-950 font-bold text-xs rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 whitespace-nowrap"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-gray-950" />
                      <span>{processingStep || 'Processing Subscription...'}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Confirm & Activate Subscription</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Bank-Grade 256-Bit SSL • Tax Compliant (TRA EFD Receipts Issued)</span>
          </div>
          <div>Cancel anytime with 1 click in your member profile</div>
        </div>
      </div>
    </div>
  );
};
