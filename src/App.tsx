import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { PublicHomeView } from './components/public/PublicHomeView';
import { AboutContactView } from './components/public/AboutContactView';
import { PlatformDashboardView } from './components/platform/PlatformDashboardView';
import { EconomyView } from './components/platform/EconomyView';
import { ValueChainsView } from './components/platform/ValueChainsView';
import { CompaniesView } from './components/platform/CompaniesView';
import { InvestmentView } from './components/platform/InvestmentView';
import { WealthView } from './components/platform/WealthView';
import { ReportsView } from './components/platform/ReportsView';
import { DataApiView } from './components/platform/DataApiView';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { RequestAccessModal } from './components/modals/RequestAccessModal';
import { AuthModal } from './components/modals/AuthModal';
import { SubscriptionPaymentModal } from './components/modals/SubscriptionPaymentModal';
import { INITIAL_USER } from './data/mockData';
import { ActiveLayer, PlatformTab, UserProfile } from './types';
import { 
  Layers, 
  BarChart3, 
  Building2, 
  DollarSign, 
  Sparkles, 
  FileText, 
  Database, 
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  Globe,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeLayer, setActiveLayer] = useState<ActiveLayer>('public');
  const [activePlatformTab, setActivePlatformTab] = useState<PlatformTab>('dashboard');
  const [selectedDetailId, setSelectedDetailId] = useState<string | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRequestAccessOpen, setIsRequestAccessOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'signin' | 'signup'>('signin');
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [subscriptionContext, setSubscriptionContext] = useState<string | undefined>(undefined);
  const [trialNotice, setTrialNotice] = useState<{
    name: string;
    organization: string;
    active: boolean;
  } | null>(null);

  // Global Keyboard Shortcuts (Cmd+K for search, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsRequestAccessOpen(false);
        setIsAuthModalOpen(false);
        setIsSubscriptionModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleOpenSubscription = (contextInfo?: string) => {
    setSubscriptionContext(contextInfo);
    setIsSubscriptionModalOpen(true);
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };

  const handleSubscriptionSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setIsSubscriptionModalOpen(false);
    setTrialNotice({
      name: user.name,
      organization: user.organization,
      active: true
    });
  };

  const handleNavigateToPlatform = (tab: PlatformTab, detailId?: string) => {
    setActiveLayer('platform');
    setActivePlatformTab(tab);
    setSelectedDetailId(detailId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccessGranted = (userData: {
    fullName: string;
    workEmail: string;
    organization: string;
    jobTitle: string;
    accessType: string;
  }) => {
    setCurrentUser(prev => ({
      ...prev,
      name: userData.fullName || prev.name,
      email: userData.workEmail || prev.email,
      organization: userData.organization || 'Institutional Partner',
      title: userData.jobTitle || 'Institutional Analyst',
      role: 'institutional_pro',
      accessExpires: '14-Day Active Trial'
    }));
    setTrialNotice({
      name: userData.fullName || 'Institutional Partner',
      organization: userData.organization || 'Your Firm',
      active: true
    });
    setActiveLayer('platform');
    setActivePlatformTab('dashboard');
    setIsRequestAccessOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSearchResult = (type: string, id: string) => {
    setActiveLayer('platform');
    if (type === 'economy') {
      setActivePlatformTab('economy');
    } else if (type === 'value-chain') {
      setActivePlatformTab('value-chains');
    } else if (type === 'company') {
      setActivePlatformTab('companies');
    } else if (type === 'deal') {
      setActivePlatformTab('investment');
    } else if (type === 'wealth') {
      setActivePlatformTab('wealth');
    } else if (type === 'report') {
      setActivePlatformTab('reports');
    }
    setSelectedDetailId(id);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-gray-900 font-sans flex flex-col selection:bg-blue-900 selection:text-white">
      {/* 1. Universal Top Navigation */}
      <Navigation
        activeLayer={activeLayer}
        setActiveLayer={setActiveLayer}
        activePlatformTab={activePlatformTab}
        setActivePlatformTab={setActivePlatformTab}
        currentUser={currentUser}
        onOpenSearch={() => setIsSearchOpen(true)}
        onRequestAccess={() => setIsRequestAccessOpen(true)}
        onOpenAuth={handleOpenAuth}
        onOpenSubscription={handleOpenSubscription}
      />

      {/* Immediate Trial Activation Notification Banner */}
      {trialNotice?.active && (
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-blue-950 text-white px-4 py-2.5 text-xs shadow-md border-b border-emerald-500/30 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                ⚡ TRIAL TERMINAL ACTIVATED IMMEDIATELY:
              </div>
              <div className="text-gray-100 text-xs truncate">
                Welcome <strong className="text-white font-semibold">{trialNotice.name}</strong> ({trialNotice.organization}). Your 14-day institutional trial is active right now with full access to all 6 databases and CSV API feeds.
              </div>
            </div>
            <button
              onClick={() => setTrialNotice(null)}
              className="text-emerald-300 hover:text-white text-xs font-semibold underline shrink-0 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 2. Layer Rendering Engine */}
      {activeLayer === 'public' ? (
        /* LAYER 1: PUBLIC-FACING PORTAL */
        <main className="flex-1 bg-[#FBFBFB]">
          <PublicHomeView
            onEnterPlatform={(tab, detailId) => {
              handleNavigateToPlatform((tab as PlatformTab) || 'dashboard', detailId);
            }}
            onRequestAccess={() => setIsRequestAccessOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAuth={handleOpenAuth}
            onOpenSubscription={handleOpenSubscription}
          />
        </main>
      ) : (
        /* LAYER 2: THE ACTUAL INTELLIGENCE PLATFORM (Sidebar + Main Area) */
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Platform Institutional Sidebar */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs">
                {/* Brand Logo in Terminal Sidebar */}
                <div className="flex items-center gap-2.5 pb-3 mb-2 border-b border-gray-100">
                  <div className="w-9 h-9 rounded-xl overflow-hidden border border-gray-200 bg-white p-0.5 shadow-xs shrink-0">
                    <img 
                      src="/IMG-20260903-WA0033.jpg" 
                      alt="GVW Intelligence Logo" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/gvw_logo.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xs text-gray-950 tracking-tight leading-none">
                      GVW TERMINAL
                    </div>
                    <div className="text-[9px] font-mono text-emerald-700 font-semibold uppercase tracking-wider mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      INSTANT TRIAL ACTIVE
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-500 font-bold border-b border-gray-100 mb-2">
                  INTELLIGENCE DATABASES
                </div>

                <nav className="space-y-1 text-xs">
                  {[
                    { id: 'dashboard', label: 'Dashboard Overview', icon: BarChart3, badge: 'Live' },
                    { id: 'economy', label: '01 Economy Intelligence', icon: TrendingUp, count: '12 Ind' },
                    { id: 'value-chains', label: '02 Value Chains', icon: Layers, badge: 'Signature' },
                    { id: 'companies', label: '03 Company Registry', icon: Building2, count: '14 Co' },
                    { id: 'investment', label: '04 Investment Pipeline', icon: DollarSign, count: '7 Deals' },
                    { id: 'wealth', label: '05 Wealth & Capital', icon: Sparkles },
                    { id: 'reports', label: '06 Research & Outlooks', icon: FileText, count: '6 Rep' },
                    { id: 'data', label: 'Data Feeds & CSV API', icon: Database },
                    { id: 'about', label: 'About & Inquiries', icon: Globe }
                  ].map(tab => {
                    const Icon = tab.icon;
                    const isActive = activePlatformTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActivePlatformTab(tab.id as PlatformTab);
                          setSelectedDetailId(undefined);
                        }}
                        className={`w-full px-3 py-2.5 rounded-xl font-medium flex items-center justify-between transition cursor-pointer ${
                          isActive
                            ? 'bg-blue-900 text-white font-semibold shadow-xs'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-950'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                          <span className="truncate">{tab.label}</span>
                        </div>

                        {tab.badge && (
                          <span className={`px-1.5 py-0.2 text-[10px] font-mono rounded font-bold uppercase ${
                            isActive ? 'bg-blue-800 text-white' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {tab.badge}
                          </span>
                        )}

                        {tab.count && !tab.badge && (
                          <span className={`text-[10px] font-mono ${isActive ? 'text-blue-200' : 'text-gray-400'}`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Institutional License Card */}
              <div className="p-4 bg-gradient-to-br from-blue-900 to-blue-950 text-white rounded-2xl shadow-xs space-y-3">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-blue-200 uppercase font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>COMMERCIAL CLIENT DESK</span>
                </div>
                <div className="text-xs font-serif font-bold leading-snug">
                  Need custom deal underwriting or value-chain diligence?
                </div>
                <p className="text-[11px] text-blue-100 leading-relaxed">
                  Our Dar es Salaam advisory team delivers confidential private market audits.
                </p>
                <button
                  onClick={() => setIsRequestAccessOpen(true)}
                  className="w-full py-2 bg-white text-blue-950 text-xs font-semibold rounded-lg hover:bg-blue-50 transition cursor-pointer"
                >
                  Request Mandate Briefing
                </button>
              </div>
            </aside>

            {/* Platform Main Content Area */}
            <main className="lg:col-span-9 min-w-0">
              {activePlatformTab === 'dashboard' && (
                <PlatformDashboardView
                  onNavigateTab={(tab, detailId) => {
                    setActivePlatformTab(tab);
                    setSelectedDetailId(detailId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onRequestAccess={() => setIsRequestAccessOpen(true)}
                />
              )}

              {activePlatformTab === 'economy' && (
                <EconomyView
                  initialIndicatorId={selectedDetailId}
                  onRequestAccess={() => setIsRequestAccessOpen(true)}
                />
              )}

              {activePlatformTab === 'value-chains' && (
                <ValueChainsView
                  initialChainId={selectedDetailId}
                  onRequestAccess={() => setIsRequestAccessOpen(true)}
                  onNavigateToDeal={(dealId) => {
                    setActivePlatformTab('investment');
                    setSelectedDetailId(dealId);
                  }}
                />
              )}

              {activePlatformTab === 'companies' && (
                <CompaniesView
                  initialCompanyId={selectedDetailId}
                  onRequestAccess={() => setIsRequestAccessOpen(true)}
                />
              )}

              {activePlatformTab === 'investment' && (
                <InvestmentView
                  initialDealId={selectedDetailId}
                  onRequestAccess={() => setIsRequestAccessOpen(true)}
                />
              )}

              {activePlatformTab === 'wealth' && (
                <WealthView
                  onRequestAccess={() => setIsRequestAccessOpen(true)}
                />
              )}

              {activePlatformTab === 'reports' && (
                <ReportsView
                  initialReportId={selectedDetailId}
                  onRequestAccess={() => setIsRequestAccessOpen(true)}
                />
              )}

              {activePlatformTab === 'data' && (
                <DataApiView
                  onRequestAccess={() => setIsRequestAccessOpen(true)}
                />
              )}

              {activePlatformTab === 'about' && (
                <AboutContactView
                  onRequestAccess={() => setIsRequestAccessOpen(true)}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* 3. Global Modals */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      <RequestAccessModal
        isOpen={isRequestAccessOpen}
        onClose={() => setIsRequestAccessOpen(false)}
        onAccessGranted={handleAccessGranted}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authInitialMode}
        onSwitchToSubscription={() => {
          setIsAuthModalOpen(false);
          handleOpenSubscription('Account Registration Upgrade');
        }}
      />

      <SubscriptionPaymentModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        currentUser={currentUser}
        onSubscriptionSuccess={handleSubscriptionSuccess}
        contextInfo={subscriptionContext}
      />
    </div>
  );
}
