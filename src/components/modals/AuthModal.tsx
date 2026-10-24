import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  KeyRound, 
  Globe,
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onAuthSuccess: (user: UserProfile) => void;
  onOpenSubscription?: () => void;
  onSwitchToSubscription?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  onAuthSuccess,
  onOpenSubscription,
  onSwitchToSubscription
}) => {
  const triggerSubscription = onSwitchToSubscription || onOpenSubscription;
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  
  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up State
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [country, setCountry] = useState('Tanzania');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [primaryInterest, setPrimaryInterest] = useState('Value Chain Economics');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!signInEmail || !signInPassword) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const authenticatedUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: signInEmail.split('@')[0].replace('.', ' ').toUpperCase(),
        email: signInEmail,
        organization: 'Verified Institutional Member',
        title: 'Senior Market Analyst',
        role: 'registered',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        accessExpires: 'Active Member'
      };

      // Check if this was a known pro user
      if (signInEmail.toLowerCase().includes('walter') || signInEmail.toLowerCase().includes('director')) {
        authenticatedUser.role = 'pro';
        authenticatedUser.title = 'Investment Director';
        authenticatedUser.organization = 'GVW Global Capital';
      }

      localStorage.setItem('gvw_auth_session', JSON.stringify(authenticatedUser));
      onAuthSuccess(authenticatedUser);
      onClose();
    }, 600);
  };

  const handleQuickDemoLogin = (type: 'director' | 'analyst') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: UserProfile = type === 'director' 
        ? {
            id: 'user-walter-director',
            name: 'Walter Godliving',
            email: 'waltergodliving123@gmail.com',
            organization: 'GVW Intelligence Advisory',
            title: 'Managing Director & Lead Economist',
            role: 'pro',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
            accessExpires: 'Annual Pro Enterprise'
          }
        : {
            id: 'user-analyst-guest',
            name: 'Devota Mushi',
            email: 'devota.mushi@horizoncap.co.tz',
            organization: 'East Africa Infrastructure Fund',
            title: 'Value-Chain Investment Analyst',
            role: 'registered',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
            accessExpires: 'Active Member'
          };

      localStorage.setItem('gvw_auth_session', JSON.stringify(user));
      onAuthSuccess(user);
      onClose();
    }, 450);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!fullName || !workEmail || !organization || !signUpPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: fullName,
        email: workEmail,
        organization: organization,
        title: jobTitle || 'Institutional Partner',
        role: 'registered',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        accessExpires: 'Active Member'
      };

      localStorage.setItem('gvw_auth_session', JSON.stringify(newUser));
      onAuthSuccess(newUser);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-xs">
      <div 
        className="bg-white rounded-3xl border border-gray-200 shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Logo */}
        <div className="p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-gray-950 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 bg-white p-0.5 shadow-sm shrink-0">
              <img
                src="/IMG-20260903-WA0033.jpg"
                alt="GVW Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/gvw_logo.jpg';
                }}
              />
            </div>
            <div>
              <div className="font-serif font-bold text-lg tracking-wide leading-tight">
                GVW INTELLIGENCE
              </div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                Institutional Member Portal
              </div>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-white/10 p-1 rounded-xl mt-5 border border-white/10">
            <button
              onClick={() => { setMode('signin'); setErrorMessage(''); }}
              className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                mode === 'signin'
                  ? 'bg-white text-gray-950 shadow-xs'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              SIGN IN
            </button>
            <button
              onClick={() => { setMode('signup'); setErrorMessage(''); }}
              className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-gray-950 shadow-xs'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              CREATE NEW ACCOUNT
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {errorMessage}
            </div>
          )}

          {mode === 'signin' ? (
            /* SIGN IN FORM */
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                  Work / Personal Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={signInEmail}
                    onChange={e => setSignInEmail(e.target.value)}
                    placeholder="name@organization.com or email"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={signInPassword}
                    onChange={e => setSignInPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded text-blue-900 focus:ring-blue-900"
                  />
                  <span>Keep me logged in</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset instructions have been forwarded to your registered email.')}
                  className="text-blue-900 font-semibold hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-xs rounded-xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to GVW Terminal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* 1-Click Institutional Demo Buttons */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <div className="text-[11px] font-mono text-gray-500 text-center uppercase">
                  Or instant 1-click credential demo:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('director')}
                    className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100/70 text-left transition cursor-pointer"
                  >
                    <div className="text-[11px] font-bold text-blue-950 truncate">Walter Godliving</div>
                    <div className="text-[10px] text-blue-700">Managing Director (Pro)</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('analyst')}
                    className="p-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-left transition cursor-pointer"
                  >
                    <div className="text-[11px] font-bold text-gray-900 truncate">Devota Mushi</div>
                    <div className="text-[10px] text-gray-600">Research Analyst</div>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* SIGN UP FORM */
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Walter Godliving"
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onChange={e => setWorkEmail(e.target.value)}
                      placeholder="name@firm.com"
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                    Organization / Company *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={organization}
                      onChange={e => setOrganization(e.target.value)}
                      placeholder="e.g. Stanbic / CRDB / Agro firm"
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                    Job Title / Role
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={e => setJobTitle(e.target.value)}
                      placeholder="Investment Manager / Analyst"
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                    Country / Base
                  </label>
                  <select
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="Tanzania">Tanzania (East Africa)</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="South Africa">South Africa</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="UAE">United Arab Emirates / Dubai</option>
                    <option value="Other">Other Global Jurisdiction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                    Account Password *
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={signUpPassword}
                      onChange={e => setSignUpPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
                  Primary Economic Focus
                </label>
                <select
                  value={primaryInterest}
                  onChange={e => setPrimaryInterest(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="Value Chain Economics">Value Chain Margins & Processing</option>
                  <option value="Deal Flow & Pipelines">Shovel-Ready Investment Pipelines</option>
                  <option value="Mining & Natural Gas">Mining, Metals & Natural Gas Assets</option>
                  <option value="Commercial Agriculture">Agro-Processing & Cash Crops</option>
                  <option value="Macroeconomic Research">Macroeconomic Time-Series Data</option>
                </select>
              </div>

              <div className="text-[11px] text-gray-500 leading-tight">
                By creating an account, you agree to GVW Intelligence Data Access Terms & Financial Confidentiality protocols.
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-xs rounded-xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Complete Registration & Open Terminal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Subscription Prompt Callout */}
          <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-200/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <div className="text-[11px] text-gray-700">
                Need unlimited cap tables, raw CSV data, and deal rooms?
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                triggerSubscription?.();
              }}
              className="text-xs font-bold text-blue-900 hover:text-blue-950 underline shrink-0 cursor-pointer"
            >
              View Subscription Plans →
            </button>
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-[11px] font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>256-Bit SSL Encrypted Session</span>
          </div>
          <div>Bank-Grade Data Protection</div>
        </div>
      </div>
    </div>
  );
};
