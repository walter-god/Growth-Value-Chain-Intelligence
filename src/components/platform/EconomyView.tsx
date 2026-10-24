import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowRight, 
  Download, 
  Search, 
  Filter, 
  BarChart3, 
  Check, 
  Info, 
  ArrowUpRight,
  Database,
  Calendar,
  Layers
} from 'lucide-react';
import { MACRO_INDICATORS } from '../../data/gvwIntelligenceData';
import { MacroIndicator } from '../../types';

interface EconomyViewProps {
  initialIndicatorId?: string;
  onRequestAccess: () => void;
}

export const EconomyView: React.FC<EconomyViewProps> = ({
  initialIndicatorId,
  onRequestAccess
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeIndicatorId, setActiveIndicatorId] = useState<string>(
    initialIndicatorId || 'ind-gdp'
  );

  const filteredIndicators = MACRO_INDICATORS.filter(ind => {
    const matchesCat = selectedCategory === 'All' || ind.category === selectedCategory;
    const matchesSearch = 
      ind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ind.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ind.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ind.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeIndicator = MACRO_INDICATORS.find(i => i.id === activeIndicatorId) || MACRO_INDICATORS[0];

  const handleExportCSV = () => {
    const headers = 'Code,Name,Category,Value,Period,Source\n';
    const rows = MACRO_INDICATORS.map(
      ind => `"${ind.code}","${ind.name}","${ind.category}","${ind.value}","${ind.period}","${ind.source}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gvw_economic_indicators_tanzania_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
            <Database className="w-3.5 h-3.5" />
            <span>DATABASE 01 • ECONOMIC INTELLIGENCE</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-950 mt-1">
            Macroeconomic & Policy Indicators
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Real GDP growth, headline inflation, policy interest rates, foreign exchange reserves, public debt ratios, trade balances, and demographic trajectory.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition shadow-xs flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export All Data (CSV)</span>
        </button>
      </div>

      {/* 2. Top Selected Indicator Teardown & Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-gray-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold uppercase">
                {activeIndicator.category}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 font-mono">TICKER: {activeIndicator.code}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{activeIndicator.period}</span>
            </div>

            <h2 className="text-3xl font-serif font-bold text-gray-950">
              {activeIndicator.name}
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
              {activeIndicator.description}
            </p>
          </div>

          <div className="bg-[#FBFBFB] border border-gray-200 rounded-2xl p-5 min-w-[240px] text-right shrink-0">
            <span className="text-xs font-mono text-gray-500 uppercase">CURRENT LEVEL</span>
            <div className="text-4xl font-serif font-bold text-gray-950 mt-1">
              {activeIndicator.value}
            </div>
            <div className="text-xs font-semibold text-emerald-700 font-mono mt-1">
              {activeIndicator.changeStr}
            </div>
            <div className="text-[11px] text-gray-500 font-mono mt-2 pt-2 border-t border-gray-200">
              Source: {activeIndicator.source}
            </div>
          </div>
        </div>

        {/* Visual Chart / Historical Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-gray-500">
            <span>HISTORICAL TIME-SERIES CURVE ({activeIndicator.unit})</span>
            <span>PERIOD: 2021 - 2026</span>
          </div>

          <div className="h-48 w-full bg-[#FBFBFB] border border-gray-200 rounded-xl p-4 flex items-end justify-between gap-2 sm:gap-6 relative">
            {activeIndicator.historical.map((pt, idx) => {
              const vals = activeIndicator.historical.map(h => h.value);
              const min = Math.min(...vals) * 0.9;
              const max = Math.max(...vals) * 1.1;
              const heightPercent = Math.max(15, Math.min(100, ((pt.value - min) / (max - min || 1)) * 100));

              return (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group">
                  <span className="text-xs font-mono font-bold text-gray-800 mb-1 group-hover:text-blue-900 transition">
                    {pt.value}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[54px] bg-blue-900/80 group-hover:bg-blue-900 rounded-t-md transition-all relative"
                  />
                  <span className="text-[10px] font-mono text-gray-500 mt-2 whitespace-nowrap">
                    {pt.period}
                  </span>
                </div>
              );
            })}
          </div>

          {activeIndicator.forecast2026 && (
            <div className="p-4 bg-blue-50/80 rounded-xl border border-blue-200/80 text-xs text-blue-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <strong>Medium-Term Outlook:</strong> {activeIndicator.forecast2026}
              </div>
              <button
                onClick={onRequestAccess}
                className="font-semibold text-blue-900 hover:underline shrink-0 text-left sm:text-right"
              >
                Request Complete Econometric Forecasting Model →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search indicators by name, code or keyword..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-900 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-gray-400 font-mono mr-1">CATEGORY:</span>
            {['All', 'Macro', 'Monetary', 'Fiscal', 'External', 'Demographics'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Indicator Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-[#F8FAFC] text-gray-500 font-mono uppercase text-[10px] border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Indicator</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Latest Value</th>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredIndicators.map(ind => {
                const isCurrent = ind.id === activeIndicator.id;
                return (
                  <tr
                    key={ind.id}
                    onClick={() => setActiveIndicatorId(ind.id)}
                    className={`hover:bg-blue-50/40 transition cursor-pointer ${
                      isCurrent ? 'bg-blue-50/60 font-medium' : 'bg-white'
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-gray-950">
                      {ind.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-500 text-[11px]">
                      {ind.code}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-mono">
                        {ind.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-serif font-bold text-sm text-gray-950">
                      {ind.value}
                    </td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-[11px]">
                      {ind.period}
                    </td>
                    <td className="py-3 px-4 text-gray-600 truncate max-w-[180px]">
                      {ind.source}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[11px] font-semibold text-blue-900 hover:underline">
                        Inspect
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
