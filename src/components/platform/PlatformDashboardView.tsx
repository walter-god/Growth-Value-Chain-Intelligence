import React, { useState } from 'react';
import { 
  TrendingUp, 
  Layers, 
  Building2, 
  MapPin, 
  DollarSign, 
  FileText, 
  ArrowRight, 
  ExternalLink,
  Download,
  Filter,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { 
  MACRO_INDICATORS, 
  VALUE_CHAINS, 
  COMPANIES_DATABASE, 
  INVESTMENT_OPPORTUNITIES, 
  RESEARCH_REPORTS 
} from '../../data/gvwIntelligenceData';
import { PlatformTab } from '../../types';

interface PlatformDashboardViewProps {
  onNavigateTab: (tab: PlatformTab, detailId?: string) => void;
  onRequestAccess: () => void;
}

export const PlatformDashboardView: React.FC<PlatformDashboardViewProps> = ({
  onNavigateTab,
  onRequestAccess
}) => {
  const [selectedMacroId, setSelectedMacroId] = useState<string>('ind-gdp');
  const activeMacro = MACRO_INDICATORS.find(m => m.id === selectedMacroId) || MACRO_INDICATORS[0];

  return (
    <div className="space-y-8">
      {/* 1. TOP HEADER BANNER */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>TANZANIA MARKET INTELLIGENCE TERMINAL</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-950 mt-1">
            Executive Overview & Macro Tracker
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Real-time economic signals, structural supply chain developments, and active deal pipelines across the United Republic of Tanzania and Eastern Africa.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigateTab('data')}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-gray-600" />
            <span>Export CSV Feeds</span>
          </button>
          
          <button
            onClick={onRequestAccess}
            className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Institutional License</span>
          </button>
        </div>
      </div>

      {/* 2. LIVE MACRO GAUGES TICKER */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {MACRO_INDICATORS.slice(0, 6).map(ind => {
          const isSelected = ind.id === activeMacro.id;
          return (
            <div
              key={ind.id}
              onClick={() => setSelectedMacroId(ind.id)}
              className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-950 text-white border-blue-900 shadow-md ring-2 ring-blue-900/20'
                  : 'bg-white text-gray-900 border-gray-200 hover:border-blue-900/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className={isSelected ? 'text-blue-300' : 'text-gray-500'}>{ind.category}</span>
                  <span className={isSelected ? 'text-emerald-400 font-bold' : ind.trend === 'up' ? 'text-emerald-700 font-bold' : 'text-blue-900'}>
                    {ind.trend === 'up' ? '↑' : ind.trend === 'down' ? '↓' : '•'}
                  </span>
                </div>
                <div className={`text-xs font-medium line-clamp-1 ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                  {ind.name}
                </div>
              </div>

              <div className="mt-3">
                <div className={`text-2xl font-serif font-bold tracking-tight ${isSelected ? 'text-white' : 'text-gray-950'}`}>
                  {ind.value}
                </div>
                <div className={`text-[10px] mt-1 truncate ${isSelected ? 'text-blue-200' : 'text-gray-500'}`}>
                  {ind.changeStr}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. INTERACTIVE MACROECONOMIC CHART / SIGNAL TEARDOWN */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <div className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
              INDICATOR DEEP-DIVE: {activeMacro.name} ({activeMacro.code})
            </div>
            <h2 className="text-xl font-serif font-bold text-gray-950 mt-1">
              Historical Trajectory & 2026/27 Forecast
            </h2>
            <p className="text-xs text-gray-600 mt-1 max-w-2xl">
              {activeMacro.description}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] font-mono text-gray-500 block">SOURCE:</span>
            <span className="text-xs font-medium text-gray-800">{activeMacro.source}</span>
          </div>
        </div>

        {/* SVG Historical Chart */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-gray-500">
            <span>Historical Trajectory (2021 - 2026)</span>
            <span>Unit: {activeMacro.unit}</span>
          </div>

          <div className="h-44 w-full bg-[#FBFBFB] border border-gray-200 rounded-xl p-4 flex items-end justify-between gap-2 sm:gap-6 relative">
            {activeMacro.historical.map((pt, idx) => {
              // Calculate normalized height percentage
              const values = activeMacro.historical.map(h => h.value);
              const min = Math.min(...values) * 0.9;
              const max = Math.max(...values) * 1.1;
              const heightPercent = Math.max(15, Math.min(100, ((pt.value - min) / (max - min || 1)) * 100));

              return (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group">
                  <span className="text-[11px] font-mono font-semibold text-gray-700 mb-1 group-hover:text-blue-900 transition">
                    {pt.value}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[48px] bg-blue-900/80 group-hover:bg-blue-900 rounded-t-md transition-all relative"
                  />
                  <span className="text-[10px] font-mono text-gray-500 mt-2 whitespace-nowrap">
                    {pt.period}
                  </span>
                </div>
              );
            })}
          </div>

          {activeMacro.forecast2026 && (
            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/60 text-xs text-blue-950 flex items-center justify-between">
              <div>
                <strong>Institutional Forecast:</strong> {activeMacro.forecast2026}
              </div>
              <button 
                onClick={() => onNavigateTab('economy', activeMacro.id)}
                className="font-semibold text-blue-900 hover:underline shrink-0 ml-4"
              >
                View Full Economic Database →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. TWO-COLUMN SPLIT: TOP OPPORTUNITIES & LATEST INTELLIGENCE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: TOP OPPORTUNITIES LIST (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div>
              <div className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
                DEAL PIPELINE • DATABASE 04
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-950 mt-1">
                Top Investment Opportunities
              </h3>
            </div>

            <button
              onClick={() => onNavigateTab('investment')}
              className="text-xs font-semibold text-blue-900 hover:text-blue-950 flex items-center gap-1 cursor-pointer"
            >
              <span>View All Pipeline Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {INVESTMENT_OPPORTUNITIES.slice(0, 4).map(opp => (
              <div
                key={opp.id}
                onClick={() => onNavigateTab('investment', opp.id)}
                className="p-4 rounded-xl border border-gray-200 hover:border-blue-900 hover:bg-blue-50/20 transition cursor-pointer group bg-[#FBFBFB]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold uppercase">
                        {opp.sector}
                      </span>
                      <span className="text-gray-500">{opp.region}</span>
                      <span>•</span>
                      <span className="text-gray-600">{opp.projectStage}</span>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-900 transition">
                      {opp.title}
                    </h4>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {opp.summary}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-base font-serif font-bold text-gray-950">
                      {opp.capitalRequired}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-700 font-semibold">
                      IRR: {opp.expectedReturn.split(' ')[0]}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab('investment')}
            className="w-full py-2.5 bg-gray-50 hover:bg-blue-900 hover:text-white text-gray-800 text-xs font-semibold rounded-xl border border-gray-200 transition text-center cursor-pointer"
          >
            Access Interactive Tanzania Investment Map →
          </button>
        </div>

        {/* Right: LATEST INTELLIGENCE PUBLICATIONS (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div>
              <div className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
                RESEARCH LIBRARY • DATABASE 06
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-950 mt-1">
                Latest Publications
              </h3>
            </div>

            <button
              onClick={() => onNavigateTab('reports')}
              className="text-xs font-semibold text-blue-900 hover:text-blue-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {RESEARCH_REPORTS.slice(0, 3).map(rep => (
              <div
                key={rep.id}
                onClick={() => onNavigateTab('reports', rep.id)}
                className="p-4 rounded-xl border border-gray-200 hover:border-blue-900/50 hover:shadow-xs transition cursor-pointer group bg-[#FBFBFB] space-y-2"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-500">
                  <span className="font-semibold text-blue-900">{rep.series}</span>
                  <span>{rep.publishedDate}</span>
                </div>

                <h4 className="text-sm font-serif font-bold text-gray-950 group-hover:text-blue-900 transition leading-snug">
                  {rep.title}
                </h4>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {rep.abstract}
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] text-gray-500 border-t border-gray-100">
                  <span>{rep.readTime} • {rep.pages} pages</span>
                  <span className="font-semibold text-blue-900 flex items-center gap-1 group-hover:translate-x-0.5 transition">
                    Read Report <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Value Chain Teaser Card */}
          <div className="p-4 rounded-xl bg-blue-900 text-white space-y-3">
            <div className="text-xs font-mono text-blue-200 uppercase font-semibold">
              SIGNATURE INTELLIGENCE PRODUCT
            </div>
            <div className="text-sm font-serif font-bold">
              The Cashew Value Chain Teardown
            </div>
            <p className="text-xs text-blue-100 leading-relaxed">
              Why 85% raw nut export costs Tanzania over $600M in foregone annual value addition and how local processing captures a 3x profit uplift.
            </p>
            <button
              onClick={() => onNavigateTab('value-chains', 'vc-cashew')}
              className="w-full py-2 bg-white text-blue-950 font-semibold text-xs rounded-lg hover:bg-blue-50 transition cursor-pointer"
            >
              Examine Flow & Margin Teardown
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
