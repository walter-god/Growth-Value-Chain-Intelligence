import React, { useState } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  Layers, 
  Building2, 
  MapPin, 
  DollarSign, 
  FileText, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Database,
  BarChart3,
  Search,
  CheckCircle2,
  Sparkles,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { 
  MACRO_INDICATORS, 
  VALUE_CHAINS, 
  INVESTMENT_OPPORTUNITIES, 
  RESEARCH_REPORTS, 
  TANZANIA_REGIONS 
} from '../../data/gvwIntelligenceData';
import { ValueChain, InvestmentOpportunity } from '../../types';
import { TanzaniaEconomicMap } from '../maps/TanzaniaEconomicMap';

interface PublicHomeViewProps {
  onEnterPlatform?: (tab?: string, detailId?: string) => void;
  onRequestAccess?: () => void;
  onOpenSearch?: () => void;
  onOpenSubscription?: (contextInfo?: string) => void;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
}

export const PublicHomeView: React.FC<PublicHomeViewProps> = ({
  onEnterPlatform = (_tab?: string, _detailId?: string) => {},
  onRequestAccess = () => {},
  onOpenSearch = () => {},
  onOpenSubscription,
  onOpenAuth
}) => {
  const [selectedChainId, setSelectedChainId] = useState<string>('vc-cashew');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('reg-mtwara');
  const [activeSectorTab, setActiveSectorTab] = useState<'All' | 'Agriculture' | 'Mining' | 'Energy' | 'Industry' | 'Services'>('Agriculture');

  const activeChain = VALUE_CHAINS.find(c => c.id === selectedChainId) || VALUE_CHAINS[0];
  const activeRegion = TANZANIA_REGIONS.find(r => r.id === selectedRegionId) || TANZANIA_REGIONS[0];
  const regionOpportunities = INVESTMENT_OPPORTUNITIES.filter(
    opp => opp.region.toLowerCase().includes(activeRegion.name.toLowerCase())
  );

  return (
    <div className="bg-[#FBFBFB] text-gray-900 min-h-screen">
      {/* 1. HERO SECTION WITH OFFICIAL COMPANY LOGO */}
      <section className="relative pt-10 pb-16 lg:pb-20 border-b border-gray-200 overflow-hidden bg-white/90">
        <div className="absolute inset-0 bg-radial-[at_top_right] from-blue-50/80 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Core Value & Call To Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold tracking-wide uppercase font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-700 animate-pulse" />
                <span>GVW INTELLIGENCE — TANZANIA & AFRICAN MARKETS</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-950 tracking-tight leading-[1.15]">
                  Know the Chain. <br />
                  Understand the Wealth. <br />
                  <span className="text-blue-900">Act on the Intelligence.</span>
                </h1>
                <p className="text-lg sm:text-xl font-medium text-gray-700 font-serif italic">
                  Global Value-Chain & Wealth Intelligence
                </p>
              </div>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans max-w-2xl">
                We build structured intelligence on Tanzania and African markets, connecting economic data, businesses, industries, value chains, investment flows and wealth-creation opportunities.
              </p>

              {/* CTA Action Array */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-explore-intelligence-btn"
                  onClick={() => onEnterPlatform('dashboard')}
                  className="px-6 py-3.5 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-sm rounded-xl transition shadow-md shadow-blue-900/10 flex items-center gap-2 group cursor-pointer"
                >
                  <span>Explore Intelligence</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>

                <button
                  id="hero-subscribe-btn"
                  onClick={() => onOpenSubscription?.('Hero Section Upgrade')}
                  className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition shadow-md shadow-emerald-600/15 flex items-center gap-2 cursor-pointer"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Subscribe to Platform</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-800 text-emerald-100 text-[10px] font-mono font-bold">M-PESA / CARDS</span>
                </button>

                <button
                  id="hero-auth-btn"
                  onClick={() => onOpenAuth?.('signin')}
                  className="px-5 py-3.5 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-semibold text-sm rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-900" />
                  <span>Sign In / Register</span>
                </button>

                <button
                  onClick={() => onEnterPlatform('data')}
                  className="px-4 py-3.5 text-gray-600 hover:text-blue-900 font-medium text-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Database className="w-4 h-4 text-gray-400" />
                  <span>Explore Raw Data</span>
                </button>
              </div>

              {/* Competitive Anchor Notice */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4 text-xs text-gray-500 font-mono">
                <span className="text-gray-400">DATA ARCHITECTURE:</span>
                <span className="font-medium text-gray-700">Database → Analysis → Visualisation → Actionable Intelligence</span>
              </div>
            </div>

            {/* Right Col: Official Company Logo & Intelligence Insignia Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-xl shadow-gray-900/5 transition hover:border-blue-900/40 group">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-900 text-white text-[10px] font-mono font-bold shadow-sm uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Official Emblem
                  </span>
                </div>

                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Official Company Logo */}
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-white p-2 border border-gray-200 shadow-xs flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <img 
                      src="/IMG-20260903-WA0033.jpg" 
                      alt="GVW Intelligence Official Company Logo" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/gvw_logo.jpg';
                      }}
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-gray-950 tracking-tight">
                      GVW INTELLIGENCE
                    </h3>
                    <p className="text-xs font-serif italic text-gray-600">
                      Growth Value-Chain & Wealth Intelligence
                    </p>
                    <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider pt-0.5">
                      Tanzania & African Market Architecture
                    </p>
                  </div>

                  <div className="w-full pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-left">
                    <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="text-[10px] font-mono uppercase text-gray-400">Coverage</div>
                      <div className="font-semibold text-xs text-gray-900">28+ Value Chains</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="text-[10px] font-mono uppercase text-gray-400">Trial Terminal</div>
                      <div className="font-semibold text-xs text-emerald-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Immediate Access
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onRequestAccess}
                    className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Request Instant Trial Terminal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TANZANIA AT A GLANCE — MACROECONOMIC DATA */}
      <section className="py-12 border-b border-gray-200 bg-[#FBFBFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 mb-1">
                MACROECONOMIC MONITORS • 2026 WIRE
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950">
                Tanzania at a Glance
              </h2>
              <p className="text-xs text-gray-600 mt-1 max-w-xl">
                Real-time official indicators from the Bank of Tanzania (BoT), National Bureau of Statistics (NBS), and Tanzania Revenue Authority.
              </p>
            </div>
            <button
              onClick={() => onEnterPlatform('economy')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:text-blue-950 transition group cursor-pointer"
            >
              <span>View Full Economic Database (12+ Indicators)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {MACRO_INDICATORS.slice(0, 6).map(ind => (
              <div
                key={ind.id}
                onClick={() => onEnterPlatform('economy', ind.id)}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-900/40 hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono mb-1">
                    <span className="uppercase">{ind.category}</span>
                    <span className={`font-semibold ${ind.trend === 'up' ? 'text-emerald-700' : 'text-blue-900'}`}>
                      {ind.trend === 'up' ? '↑' : ind.trend === 'down' ? '↓' : '•'}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-gray-700 line-clamp-1 group-hover:text-blue-900 transition">
                    {ind.name}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-2xl font-serif font-bold text-gray-950 tracking-tight">
                    {ind.value}
                  </div>
                  <div className="text-[11px] text-gray-500 mt-1 flex items-center justify-between">
                    <span className="truncate">{ind.period}</span>
                    <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-blue-900 transition" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EXPLORE TANZANIA'S VALUE CHAINS (THE SIGNATURE PRODUCT) */}
      <section className="py-16 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 mb-1">
                SIGNATURE PRODUCT • DATABASE 02
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-950">
                Explore Tanzania’s Value Chains
              </h2>
              <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                Unpacking every stage: from rural farmer or mine concession to international export and consumer retail. Understand who makes what margin and where the processing bottlenecks create multi-million dollar investment returns.
              </p>
            </div>
            
            <button
              onClick={() => onEnterPlatform('value-chains')}
              className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-lg transition shadow-xs inline-flex items-center gap-2 cursor-pointer self-start md:self-auto"
            >
              <span>Explore All 6 Deep Value Chains</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sector Selector Chips */}
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3">
            {[
              { label: 'Agriculture', sub: 'Cashew, Coffee, Horticulture' },
              { label: 'Mining', sub: 'Gold, Critical Minerals' },
              { label: 'Energy', sub: 'Natural Gas, Pipeline & LNG' },
              { label: 'Industry', sub: 'Cement, Clinker & Export' }
            ].map(sec => {
              const chainForSec = VALUE_CHAINS.find(c => c.sector === sec.label);
              const isActive = activeChain.sector === sec.label;
              return (
                <button
                  key={sec.label}
                  onClick={() => chainForSec && setSelectedChainId(chainForSec.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer text-left ${
                    isActive 
                      ? 'bg-blue-900 text-white shadow-xs' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-semibold">{sec.label}</div>
                  <div className={`text-[10px] ${isActive ? 'text-blue-200' : 'text-gray-500'}`}>{sec.sub}</div>
                </button>
              );
            })}
          </div>

          {/* Active Value Chain Card / Teardown */}
          <div className="bg-[#FBFBFB] border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-semibold">{activeChain.sector}</span>
                  <span>•</span>
                  <span>{activeChain.subSector}</span>
                  <span>•</span>
                  <span>Annual Output: {activeChain.annualProduction}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-950 mt-1">
                  {activeChain.name}
                </h3>
                <p className="text-xs font-mono text-blue-900 mt-1 font-semibold">
                  Flow: {activeChain.tagline}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200">
                  <div className="text-gray-500 text-[10px]">CURRENT EXPORT VALUE</div>
                  <div className="text-base font-bold text-gray-950 font-serif">{activeChain.exportValueUsd}</div>
                </div>
                <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200">
                  <div className="text-gray-500 text-[10px]">POTENTIAL VALUE ADDED</div>
                  <div className="text-base font-bold text-emerald-800 font-serif">{activeChain.marketValueUsd.split('→')[1] || activeChain.marketValueUsd}</div>
                </div>
              </div>
            </div>

            {/* Interactive Flow Diagram Nodes */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                VALUE CHAIN ARCHITECTURE & MARGIN SPREAD
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {activeChain.nodes.map((node, i) => (
                  <div
                    key={node.id}
                    className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col justify-between hover:border-blue-900/50 hover:shadow-xs transition relative"
                  >
                    <div>
                      <div className="text-[11px] font-mono font-bold text-blue-900 mb-1">
                        {node.stageName}
                      </div>
                      <p className="text-[11px] text-gray-600 line-clamp-3 leading-relaxed">
                        {node.roleDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 space-y-1 text-[10px]">
                      <div>
                        <span className="text-gray-400">Benchmark: </span>
                        <span className="font-semibold text-gray-900 line-clamp-1">{node.benchmarkPrice}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Margin: </span>
                        <span className="font-semibold text-emerald-700">{node.averageMargin}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Highlight Callout */}
            <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-blue-900 uppercase">
                  INVESTMENT OPPORTUNITY IN THIS CHAIN
                </div>
                <p className="text-xs text-blue-950 font-medium leading-relaxed max-w-2xl">
                  {activeChain.nodes[2]?.investmentOpportunity || activeChain.summary}
                </p>
              </div>
              <button
                onClick={() => onEnterPlatform('value-chains', activeChain.id)}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-lg transition whitespace-nowrap shrink-0 cursor-pointer"
              >
                Inspect Teardown & Players →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHERE IS THE OPPORTUNITY? (LEGIT INTERACTIVE TANZANIA MAP & ECONOMIC REGIONS) */}
      <section className="py-16 border-b border-gray-200 bg-[#FBFBFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <TanzaniaEconomicMap
            selectedRegionId={selectedRegionId}
            onSelectRegion={(regId) => setSelectedRegionId(regId)}
            onExploreOpportunities={(regId) => onEnterPlatform('investment', regId)}
            onRequestSubscription={(contextInfo) => {
              if (onOpenSubscription) {
                onOpenSubscription(contextInfo);
              } else {
                onRequestAccess();
              }
            }}
          />
        </div>
      </section>

      {/* 5. LATEST INTELLIGENCE & RESEARCH REPORTS */}
      <section className="py-16 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 mb-1">
                INSTITUTIONAL RESEARCH • DATABASE 06
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-950">
                Latest Intelligence Publications
              </h2>
              <p className="text-sm text-gray-600 mt-1 max-w-xl">
                Rigorous, data-backed reports produced by our in-house economists and sector specialists.
              </p>
            </div>
            
            <button
              onClick={() => onEnterPlatform('reports')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:text-blue-950 transition group cursor-pointer"
            >
              <span>Explore Research Library ({RESEARCH_REPORTS.length} Reports)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESEARCH_REPORTS.slice(0, 3).map(rep => (
              <div
                key={rep.id}
                onClick={() => onEnterPlatform('reports', rep.id)}
                className="bg-[#FBFBFB] border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-900/50 hover:shadow-md transition cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-500">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-900 font-semibold">{rep.series}</span>
                    <span>{rep.publishedDate}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-gray-950 group-hover:text-blue-900 transition leading-snug">
                    {rep.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {rep.abstract}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img src={rep.author.avatar} alt={rep.author.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-[11px] text-gray-600 font-medium">{rep.author.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-blue-900 font-semibold flex items-center gap-1">
                    Read Report <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. METHODOLOGY & COMPETITIVE BENCHMARK */}
      <section className="py-16 bg-[#FBFBFB] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-xs space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900">
                THE GVW INTELLIGENCE ENGINE
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950">
                How GVW Bridges Data to Actionable Capital Allocation
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Most African market analysis is either fragmented government statistics or generic consulting slide decks. Inspired by benchmark data leaders such as Stears, Briter, Kilwa Intelligence, and Mustard Insights, GVW unifies the four critical steps of modern economic decision-making:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              {[
                {
                  step: '01',
                  title: 'Database',
                  desc: 'Proprietary collection of macroeconomic time series, company cap tables, commodity farmgate auction prices, and port logistics telemetry.'
                },
                {
                  step: '02',
                  title: 'Analysis',
                  desc: 'In-house sector economists tearing down margin distribution across value-chain nodes, identifying structural bottlenecks and regulatory incentives.'
                },
                {
                  step: '03',
                  title: 'Visualisation',
                  desc: 'Interactive geographic opportunity mapping, node-by-node supply chain flows, and searchable corporate intelligence terminals.'
                },
                {
                  step: '04',
                  title: 'Actionable Intel',
                  desc: 'Direct deal dossiers, expected IRRs, contact pathways, and institutional research reports that guide private equity and corporate investment.'
                }
              ].map(pillar => (
                <div key={pillar.step} className="p-5 rounded-2xl bg-[#FBFBFB] border border-gray-200 space-y-2">
                  <div className="text-xs font-mono font-bold text-blue-900">{pillar.step}</div>
                  <h4 className="text-base font-serif font-bold text-gray-950">{pillar.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Platform Gateway Banner */}
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-serif font-bold text-gray-950">
                  Ready to access the complete GVW Terminal?
                </h4>
                <p className="text-xs text-gray-600">
                  Access live company databases, investment models, and interactive value chains now.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onEnterPlatform('dashboard')}
                  className="px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>Launch Intelligence Terminal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onRequestAccess}
                  className="px-5 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Request Institutional License
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5 SUBSCRIPTION TIERS & PAYMENT INTEGRATION (PAYPAL, STRIPE, M-PESA, TIGO, CRDB, NMB) */}
      <section className="py-20 bg-[#F8FAFC] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>INSTITUTIONAL & PROFESSIONAL SUBSCRIPTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-950">
              Transparent Pricing with Instant Local & Global Payments
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Unlock complete value-chain gross margin models, private corporate financial statements, shovel-ready deal rooms, and regional GIS datasets. Settle instantly via Mobile Money, Tanzania commercial banks, Stripe, or PayPal.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Plan 1: Professional */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xs hover:border-gray-300 transition flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-block px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-[10px] font-mono font-bold uppercase">
                  INDIVIDUAL ANALYSTS
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-950">Professional</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  For independent sector researchers, consultants, and portfolio analysts tracking Tanzania markets.
                </p>
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-serif text-gray-950">$49</span>
                    <span className="text-xs font-mono text-gray-500">/ month</span>
                  </div>
                  <div className="text-[11px] font-mono text-blue-900 font-semibold mt-0.5">
                    or TZS 130,000 / month
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-700 pt-3 border-t border-gray-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full access to 6 Macroeconomic Databases</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>All 6 Value Chain margin breakdowns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Interactive Tanzania Economic Map</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Monthly Sector Research PDF downloads</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenSubscription?.('Professional Plan')}
                className="w-full py-3 bg-white hover:bg-gray-50 text-blue-900 border border-blue-900 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Subscribe Professional</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Plan 2: Institutional (Featured) */}
            <div className="bg-gradient-to-b from-blue-950 to-blue-900 rounded-3xl p-8 text-white shadow-xl shadow-blue-950/20 flex flex-col justify-between space-y-6 relative overflow-hidden border border-blue-800">
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 rounded-full bg-emerald-400 text-blue-950 text-[10px] font-mono font-bold uppercase">
                  MOST POPULAR
                </span>
              </div>

              <div className="space-y-4">
                <div className="inline-block px-2.5 py-1 rounded-md bg-blue-900/80 border border-blue-700 text-blue-200 text-[10px] font-mono font-bold uppercase">
                  FUNDS & CORPORATES
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">Institutional Fund</h3>
                <p className="text-xs text-blue-200 leading-relaxed">
                  For private equity, DFIs, commercial banks, and multinationals executing investment deals in East Africa.
                </p>
                <div className="pt-2 border-t border-blue-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-serif text-white">$490</span>
                    <span className="text-xs font-mono text-blue-300">/ year (save 17%)</span>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-300 font-semibold mt-0.5">
                    or TZS 1,300,000 / year
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-blue-100 pt-3 border-t border-blue-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Everything in Professional plus:</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unrestricted Investment Deal Data Rooms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>5 seat licenses for deal team analysts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Company Cap Tables & Executive Dossiers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Custom Excel models & raw data export</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenSubscription?.('Institutional Fund Plan')}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-blue-950 rounded-xl text-xs font-bold transition shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Subscribe Institutional</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Plan 3: Enterprise & Sovereign */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xs hover:border-gray-300 transition flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-block px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-[10px] font-mono font-bold uppercase">
                  ENTERPRISE & API
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-950">Enterprise & API</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  For sovereign wealth funds, central banks, enterprise Bloomberg/Refinitiv connectors, and data desks.
                </p>
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-serif text-gray-950">$1,950</span>
                    <span className="text-xs font-mono text-gray-500">/ year</span>
                  </div>
                  <div className="text-[11px] font-mono text-blue-900 font-semibold mt-0.5">
                    or TZS 5,200,000 / year
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-700 pt-3 border-t border-gray-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unlimited seat licenses firmwide</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>REST & WebSocket Data Feed API access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dedicated economist advisory & briefings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Bespoke supply chain margin deep dives</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenSubscription?.('Enterprise & API Plan')}
                className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Subscribe Enterprise</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Payment Methods Showcase */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
              <div>
                <h4 className="text-sm font-serif font-bold text-gray-950">
                  Accepted Payment Gateways & Settlement Rails
                </h4>
                <p className="text-xs text-gray-500">
                  Instant automated receipting with Bank of Tanzania compliant fiscal tax invoices.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { name: 'Vodacom M-Pesa', badge: '*150*00#', desc: 'Instant STK Push' },
                { name: 'Tigo Pesa', badge: '*150*01#', desc: 'Direct Lipa Namba' },
                { name: 'Airtel Money', badge: '*150*60#', desc: 'Mobile Checkout' },
                { name: 'CRDB SimBanking', badge: 'Bank App', desc: 'Instant Clearing' },
                { name: 'NMB Mkononi', badge: 'Bank App', desc: 'Tanzania National' },
                { name: 'GePG Gateway', badge: 'Gov Rails', desc: 'Control Number' },
                { name: 'Stripe Global', badge: 'Cards', desc: 'Visa, Master, Amex' },
                { name: 'PayPal Checkout', badge: 'PayPal', desc: 'USD & EUR Wallets' },
                { name: 'Apple & Google Pay', badge: 'Wallets', desc: '1-Click Mobile' },
                { name: 'SWIFT Wire Transfer', badge: 'Direct Wire', desc: 'Tanzania Shilling / USD' },
                { name: 'Halopesa', badge: '*150*88#', desc: 'Mobile Money' },
                { name: 'Crypto / USDC', badge: 'Polygon/Sol', desc: 'Instant Web3' }
              ].map(gw => (
                <div
                  key={gw.name}
                  onClick={() => onOpenSubscription?.(`Payment via ${gw.name}`)}
                  className="p-3 rounded-xl border border-gray-200 hover:border-blue-900 hover:bg-blue-50/20 transition cursor-pointer text-left group bg-[#FBFBFB]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-blue-900 px-1.5 py-0.5 rounded bg-blue-50">
                      {gw.badge}
                    </span>
                  </div>
                  <div className="font-semibold text-gray-900 text-xs mt-2 group-hover:text-blue-900">
                    {gw.name}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    {gw.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Auth Trigger Prompt */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="text-gray-600">
                Already registered or have an institutional subscription?
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenAuth?.('signin')}
                  className="text-blue-900 font-semibold hover:underline cursor-pointer"
                >
                  Sign In to Account →
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => onOpenAuth?.('signup')}
                  className="text-gray-700 font-medium hover:text-blue-900 cursor-pointer"
                >
                  Create Free Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INSTITUTIONAL FOOTER */}
      <footer className="py-12 bg-white text-gray-600 text-xs border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-200 bg-white p-0.5 shadow-xs shrink-0">
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
                  <div className="font-serif font-bold text-base text-gray-950 tracking-wider leading-none">
                    GVW INTELLIGENCE
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mt-1">
                    Value-Chain & Wealth
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-serif italic">
                Growth Value-Chain & Wealth Intelligence
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Structured intelligence on Tanzania and African markets. Connecting economic data, value chains, companies, and wealth creation.
              </p>
            </div>

            <div>
              <div className="font-mono text-[11px] font-bold uppercase text-gray-900 mb-3 tracking-wider">
                INTELLIGENCE DATABASES
              </div>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => onEnterPlatform('economy')} className="hover:text-blue-900 transition">01 — Economic Intelligence</button></li>
                <li><button onClick={() => onEnterPlatform('value-chains')} className="hover:text-blue-900 transition">02 — Value-Chain Intelligence</button></li>
                <li><button onClick={() => onEnterPlatform('companies')} className="hover:text-blue-900 transition">03 — Company Intelligence</button></li>
                <li><button onClick={() => onEnterPlatform('investment')} className="hover:text-blue-900 transition">04 — Investment Intelligence</button></li>
                <li><button onClick={() => onEnterPlatform('wealth')} className="hover:text-blue-900 transition">05 — Wealth Intelligence</button></li>
                <li><button onClick={() => onEnterPlatform('reports')} className="hover:text-blue-900 transition">06 — Research & Reports</button></li>
              </ul>
            </div>

            <div>
              <div className="font-mono text-[11px] font-bold uppercase text-gray-900 mb-3 tracking-wider">
                STRATEGIC VALUE CHAINS
              </div>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => onEnterPlatform('value-chains', 'vc-cashew')} className="hover:text-blue-900 transition">Cashew Nut Processing Chain</button></li>
                <li><button onClick={() => onEnterPlatform('value-chains', 'vc-coffee')} className="hover:text-blue-900 transition">Coffee & Specialty Beverage</button></li>
                <li><button onClick={() => onEnterPlatform('value-chains', 'vc-gold')} className="hover:text-blue-900 transition">Gold & Transition Minerals</button></li>
                <li><button onClick={() => onEnterPlatform('value-chains', 'vc-gas')} className="hover:text-blue-900 transition">Natural Gas & Lindi LNG</button></li>
                <li><button onClick={() => onEnterPlatform('value-chains', 'vc-horticulture')} className="hover:text-blue-900 transition">Horticulture & Cold Chain</button></li>
                <li><button onClick={() => onEnterPlatform('value-chains', 'vc-cement')} className="hover:text-blue-900 transition">Cement & Clinker Regional Export</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-[11px] font-bold uppercase text-gray-900 mb-3 tracking-wider">
                ACCESS & INQUIRIES
              </div>
              <p className="text-xs text-gray-500">
                Institutional licenses, enterprise API feeds, and bespoke value-chain research commissions:
              </p>
              <div className="font-mono text-xs text-blue-900 font-semibold">
                intelligence@gvw.africa
              </div>
              <button
                onClick={onRequestAccess}
                className="w-full py-2 bg-blue-900 text-white rounded-lg text-xs font-medium hover:bg-blue-950 transition cursor-pointer"
              >
                Request Terminal Access
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-gray-500 text-[11px] gap-2">
            <div>© {new Date().getFullYear()} GVW Intelligence Platform. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span>Dar es Salaam • Nairobi • London</span>
              <span>Confidential & Proprietary Data Architecture</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
