import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  TrendingUp, 
  Layers, 
  Building2, 
  DollarSign, 
  FileText, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { 
  MACRO_INDICATORS, 
  VALUE_CHAINS, 
  COMPANIES_DATABASE, 
  INVESTMENT_OPPORTUNITIES, 
  RESEARCH_REPORTS 
} from '../../data/gvwIntelligenceData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: any, itemId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'chains' | 'companies' | 'deals' | 'reports' | 'economy'>('all');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const items: Array<{
      type: 'chains' | 'companies' | 'deals' | 'reports' | 'economy';
      id: string;
      title: string;
      subtitle: string;
      meta: string;
      badge: string;
    }> = [];

    // Value Chains
    if (filterType === 'all' || filterType === 'chains') {
      VALUE_CHAINS.forEach(vc => {
        if (
          vc.name.toLowerCase().includes(q) ||
          vc.sector.toLowerCase().includes(q) ||
          vc.tagline.toLowerCase().includes(q) ||
          vc.keyRegions.some(r => r.toLowerCase().includes(q))
        ) {
          items.push({
            type: 'chains',
            id: vc.id,
            title: vc.name,
            subtitle: vc.tagline,
            meta: `${vc.sector} • ${vc.annualProduction}`,
            badge: 'Value Chain'
          });
        }
      });
    }

    // Companies
    if (filterType === 'all' || filterType === 'companies') {
      COMPANIES_DATABASE.forEach(c => {
        if (
          c.name.toLowerCase().includes(q) ||
          c.sector.toLowerCase().includes(q) ||
          c.subSector.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.keyProductsOrAssets.some(p => p.toLowerCase().includes(q))
        ) {
          items.push({
            type: 'companies',
            id: c.id,
            title: c.name,
            subtitle: c.description,
            meta: `${c.sector} • ${c.location} • ${c.ownership}`,
            badge: 'Company'
          });
        }
      });
    }

    // Investment Opportunities
    if (filterType === 'all' || filterType === 'deals') {
      INVESTMENT_OPPORTUNITIES.forEach(opp => {
        if (
          opp.title.toLowerCase().includes(q) ||
          opp.sector.toLowerCase().includes(q) ||
          opp.location.toLowerCase().includes(q) ||
          opp.summary.toLowerCase().includes(q)
        ) {
          items.push({
            type: 'deals',
            id: opp.id,
            title: opp.title,
            subtitle: opp.summary,
            meta: `${opp.sector} • ${opp.location} • ${opp.capitalRequired}`,
            badge: 'Deal Opportunity'
          });
        }
      });
    }

    // Research
    if (filterType === 'all' || filterType === 'reports') {
      RESEARCH_REPORTS.forEach(rep => {
        if (
          rep.title.toLowerCase().includes(q) ||
          rep.series.toLowerCase().includes(q) ||
          rep.abstract.toLowerCase().includes(q)
        ) {
          items.push({
            type: 'reports',
            id: rep.id,
            title: rep.title,
            subtitle: rep.abstract,
            meta: `${rep.series} • ${rep.publishedDate}`,
            badge: 'Intelligence Report'
          });
        }
      });
    }

    // Economic Indicators
    if (filterType === 'all' || filterType === 'economy') {
      MACRO_INDICATORS.forEach(ind => {
        if (
          ind.name.toLowerCase().includes(q) ||
          ind.category.toLowerCase().includes(q) ||
          ind.description.toLowerCase().includes(q)
        ) {
          items.push({
            type: 'economy',
            id: ind.id,
            title: `${ind.name}: ${ind.value}`,
            subtitle: ind.description,
            meta: `${ind.category} Indicator • ${ind.source}`,
            badge: 'Macro Indicator'
          });
        }
      });
    }

    return items;
  }, [query, filterType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-3xl w-full p-6 relative overflow-hidden text-gray-900">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            <span>GVW INTELLIGENCE DATABASE SEARCH</span>
          </div>

          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search e.g. 'Cashew', 'Cement companies', 'Mtwara', 'GDP', 'Barrick'..."
              className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border-2 border-gray-200 focus:border-blue-900 rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none transition focus:bg-white"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-gray-400 font-mono text-[11px]">FILTER:</span>
            {[
              { id: 'all', label: 'All Databases' },
              { id: 'chains', label: 'Value Chains' },
              { id: 'companies', label: 'Companies' },
              { id: 'deals', label: 'Opportunities' },
              { id: 'reports', label: 'Research' },
              { id: 'economy', label: 'Economy' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  filterType === f.id
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="mt-6 max-h-[55vh] overflow-y-auto space-y-2.5 pr-1">
          {query.trim() === '' ? (
            <div className="py-10 text-center space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400">
                POPULAR INTELLIGENCE QUERIES
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                {[
                  'Cashew Value Chain',
                  'Tanzania cement companies',
                  'GDP & Inflation 2026',
                  'Mtwara Port Opportunities',
                  'Lake Victoria Tilapia',
                  'BoT Gold Reserves',
                  'CRDB Bank',
                  'Kurasini Cold Chain'
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(q)}
                    className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-900 hover:border-blue-200 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-2">
              <div className="text-xs text-gray-500 font-mono">
                Found {searchResults.length} matching database records
              </div>
              {searchResults.map((item, idx) => (
                <div
                  key={`${item.type}-${item.id}-${idx}`}
                  onClick={() => {
                    if (item.type === 'chains') onNavigateTab('value-chains', item.id);
                    else if (item.type === 'companies') onNavigateTab('companies', item.id);
                    else if (item.type === 'deals') onNavigateTab('investment', item.id);
                    else if (item.type === 'reports') onNavigateTab('reports', item.id);
                    else if (item.type === 'economy') onNavigateTab('economy', item.id);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl border border-gray-200 hover:border-blue-900 hover:bg-blue-50/40 cursor-pointer transition flex items-start justify-between gap-4 group bg-white"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium text-[10px]">
                        {item.badge}
                      </span>
                      <span className="text-gray-400 text-[11px]">{item.meta}</span>
                    </div>
                    <div className="font-semibold text-gray-900 group-hover:text-blue-900 transition text-sm">
                      {item.title}
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition shrink-0 mt-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500 space-y-2">
              <p className="text-sm font-medium text-gray-700">No database records matched "{query}"</p>
              <p className="text-xs text-gray-500">Try searching broader sector terms like "Agriculture", "Gas", or "Cement".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
