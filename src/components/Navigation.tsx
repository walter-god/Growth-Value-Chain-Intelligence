import React from 'react';
import { 
  Search, 
  Shield, 
  Database, 
  Layers, 
  TrendingUp, 
  Building2, 
  DollarSign, 
  Sparkles, 
  FileText, 
  ArrowRight,
  Menu,
  X,
  Compass,
  User,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { ActiveLayer, PlatformTab, UserProfile } from '../types';

interface NavigationProps {
  activeLayer: ActiveLayer;
  setActiveLayer: (layer: ActiveLayer) => void;
  activePlatformTab: PlatformTab;
  setActivePlatformTab: (tab: PlatformTab) => void;
  currentUser: UserProfile;
  onOpenSearch: () => void;
  onRequestAccess: () => void;
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
  onOpenSubscription?: (context?: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeLayer,
  setActiveLayer,
  activePlatformTab,
  setActivePlatformTab,
  currentUser,
  onOpenSearch,
  onRequestAccess,
  onOpenAuth,
  onOpenSubscription
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* 1. Top Institutional Wire Bar */}
      <div className="bg-[#F8FAFC] border-b border-gray-200 px-4 py-1.5 text-xs text-gray-600 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-xl truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
          <span className="font-mono font-bold text-blue-900 text-[11px] uppercase shrink-0">
            MARKET WIRE:
          </span>
          <span className="text-gray-700 text-[11px] truncate">
            Bank of Tanzania holds Central Bank Rate (CBR) at 6.00% • SGR freight freight operations slash Lake Victoria transit to 18 hrs
          </span>
        </div>

        {/* Layer Switcher & User Pill */}
        <div className="flex items-center gap-3">
          {/* Layer Switcher Toggle */}
          <div className="hidden sm:flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
            <button
              onClick={() => setActiveLayer('public')}
              className={`px-2.5 py-0.5 rounded-md font-medium transition cursor-pointer ${
                activeLayer === 'public'
                  ? 'bg-white text-gray-900 shadow-xs font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Public Website
            </button>
            <button
              onClick={() => setActiveLayer('platform')}
              className={`px-2.5 py-0.5 rounded-md font-medium transition cursor-pointer flex items-center gap-1 ${
                activeLayer === 'platform'
                  ? 'bg-blue-900 text-white shadow-xs font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Platform Terminal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => onOpenSubscription?.('Top Nav Header')}
              className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-mono text-[10px] font-bold uppercase transition cursor-pointer flex items-center gap-1"
            >
              <DollarSign className="w-3 h-3 text-emerald-600" />
              <span>Subscribe (TZS / USD)</span>
            </button>
            <button
              onClick={() => onOpenAuth?.('signin')}
              className="px-2.5 py-1 rounded-md bg-white text-gray-700 border border-gray-200 hover:border-gray-400 font-mono text-[10px] font-semibold transition cursor-pointer flex items-center gap-1"
            >
              <User className="w-3 h-3 text-gray-500" />
              <span>Sign In</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-gray-200 text-xs">
            <img src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'} alt={currentUser?.name || 'Investor'} className="w-5 h-5 rounded-full object-cover" />
            <span className="text-[11px] font-medium text-gray-700">{currentUser?.name || 'Investor'}</span>
            <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-900 text-[10px] font-mono font-bold uppercase">PRO</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => {
              setActiveLayer('public');
              setActivePlatformTab('dashboard');
            }}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-200 bg-white p-0.5 shadow-xs flex items-center justify-center group-hover:border-blue-900 group-hover:shadow-sm transition shrink-0">
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
              <div className="font-serif font-bold text-lg text-gray-950 tracking-tight leading-none group-hover:text-blue-950 transition">
                GVW INTELLIGENCE
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mt-0.5">
                Global Value-Chain & Wealth Insights
              </div>
            </div>
          </div>

          {/* Desktop Nav Links (Adaptive by Layer) */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium">
            {activeLayer === 'public' ? (
              <>
                <button
                  onClick={() => {
                    setActiveLayer('public');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition cursor-pointer"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setActiveLayer('platform');
                    setActivePlatformTab('value-chains');
                  }}
                  className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition cursor-pointer"
                >
                  Value Chains
                </button>
                <button
                  onClick={() => {
                    setActiveLayer('platform');
                    setActivePlatformTab('investment');
                  }}
                  className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition cursor-pointer"
                >
                  Investment Map
                </button>
                <button
                  onClick={() => {
                    setActiveLayer('platform');
                    setActivePlatformTab('companies');
                  }}
                  className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition cursor-pointer"
                >
                  Companies
                </button>
                <button
                  onClick={() => {
                    setActiveLayer('platform');
                    setActivePlatformTab('reports');
                  }}
                  className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition cursor-pointer"
                >
                  Research
                </button>
                <button
                  onClick={() => {
                    setActiveLayer('platform');
                    setActivePlatformTab('economy');
                  }}
                  className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition cursor-pointer"
                >
                  Economic Data
                </button>
                <button
                  onClick={() => {
                    setActiveLayer('platform');
                    setActivePlatformTab('about');
                  }}
                  className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition cursor-pointer"
                >
                  About & Contact
                </button>
              </>
            ) : (
              <>
                {[
                  { id: 'dashboard', label: 'Dashboard' },
                  { id: 'economy', label: '01 Economy' },
                  { id: 'value-chains', label: '02 Value Chains' },
                  { id: 'companies', label: '03 Companies' },
                  { id: 'investment', label: '04 Investment' },
                  { id: 'wealth', label: '05 Wealth' },
                  { id: 'reports', label: '06 Research' },
                  { id: 'data', label: 'Data Feeds' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActivePlatformTab(item.id as PlatformTab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      activePlatformTab === item.id
                        ? 'bg-blue-900 text-white shadow-xs font-semibold'
                        : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </>
            )}
          </nav>

          {/* Right Action Array */}
          <div className="flex items-center gap-2.5">
            {/* Search Button */}
            <button
              id="global-search-trigger"
              onClick={onOpenSearch}
              className="px-3 py-1.5 rounded-xl border border-gray-200 hover:border-blue-900 hover:bg-gray-50 text-gray-500 hover:text-gray-900 text-xs flex items-center gap-2 transition cursor-pointer"
              title="Search GVW Intelligence (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span className="hidden sm:inline text-gray-600">Search DB...</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-mono text-gray-500">⌘K</kbd>
            </button>

            {/* Subscribe Action Button */}
            <button
              onClick={() => onOpenSubscription?.('Navigation Action Bar')}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Subscribe</span>
            </button>

            {/* Primary CTA */}
            {activeLayer === 'public' ? (
              <button
                onClick={() => setActiveLayer('platform')}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enter Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onRequestAccess}
                className="px-4 py-2 bg-white hover:bg-gray-50 text-blue-900 border border-blue-900 text-xs font-semibold rounded-xl transition shadow-xs cursor-pointer"
              >
                Request Access
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-xs font-mono text-gray-500 uppercase font-bold">VIEW MODE</span>
            <div className="flex bg-gray-100 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => {
                  setActiveLayer('public');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-md ${activeLayer === 'public' ? 'bg-white font-bold shadow-xs' : 'text-gray-600'}`}
              >
                Public
              </button>
              <button
                onClick={() => {
                  setActiveLayer('platform');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-md ${activeLayer === 'platform' ? 'bg-blue-900 text-white font-bold' : 'text-gray-600'}`}
              >
                Platform
              </button>
            </div>
          </div>

          {/* Mobile Auth & Subscription Actions */}
          <div className="flex items-center gap-2 pt-1 pb-2">
            <button
              onClick={() => {
                onOpenSubscription?.('Mobile Drawer');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 px-3 bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Subscribe (Plans & M-Pesa)</span>
            </button>
            <button
              onClick={() => {
                onOpenAuth?.('signin');
                setMobileMenuOpen(false);
              }}
              className="py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                setActiveLayer('platform');
                setActivePlatformTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-gray-50 text-left rounded-lg font-medium text-gray-800"
            >
              📊 Platform Dashboard
            </button>
            <button
              onClick={() => {
                setActiveLayer('platform');
                setActivePlatformTab('economy');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-gray-50 text-left rounded-lg font-medium text-gray-800"
            >
              📈 01 Economy Data
            </button>
            <button
              onClick={() => {
                setActiveLayer('platform');
                setActivePlatformTab('value-chains');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-gray-50 text-left rounded-lg font-medium text-gray-800"
            >
              🔗 02 Value Chains
            </button>
            <button
              onClick={() => {
                setActiveLayer('platform');
                setActivePlatformTab('companies');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-gray-50 text-left rounded-lg font-medium text-gray-800"
            >
              🏢 03 Companies
            </button>
            <button
              onClick={() => {
                setActiveLayer('platform');
                setActivePlatformTab('investment');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-gray-50 text-left rounded-lg font-medium text-gray-800"
            >
              💰 04 Investment Deals
            </button>
            <button
              onClick={() => {
                setActiveLayer('platform');
                setActivePlatformTab('wealth');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-gray-50 text-left rounded-lg font-medium text-gray-800"
            >
              ✨ 05 Wealth Engine
            </button>
            <button
              onClick={() => {
                setActiveLayer('platform');
                setActivePlatformTab('reports');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-gray-50 text-left rounded-lg font-medium text-gray-800"
            >
              📑 06 Research Reports
            </button>
            <button
              onClick={() => {
                setActiveLayer('platform');
                setActivePlatformTab('data');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-gray-50 text-left rounded-lg font-medium text-gray-800"
            >
              💾 Data Feeds & CSV
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
