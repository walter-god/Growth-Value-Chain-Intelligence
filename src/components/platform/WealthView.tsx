import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Building2, 
  DollarSign, 
  Sparkles, 
  ArrowRight,
  Layers,
  MapPin,
  CheckCircle2,
  PieChart
} from 'lucide-react';
import { WEALTH_METRICS } from '../../data/gvwIntelligenceData';
import { WealthMetric } from '../../types';

interface WealthViewProps {
  onRequestAccess: () => void;
}

export const WealthView: React.FC<WealthViewProps> = ({ onRequestAccess }) => {
  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DATABASE 05 • WEALTH INTELLIGENCE & CAPITAL FORMATION</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-950 mt-1">
            Where is Wealth Being Created?
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Wealth in Africa is not about celebrity lists. It is about tracking domestic capital formation, institutional pension asset deployments, DSE equity dividend powerhouses, and capturing value-chain margins.
          </p>
        </div>

        <button
          onClick={onRequestAccess}
          className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition shadow-xs flex items-center gap-2 self-start lg:self-auto cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Request Wealth & LP Mandates Report</span>
        </button>
      </div>

      {/* 2. Core Strategic Philosophy Callout */}
      <div className="p-6 sm:p-8 bg-blue-900 text-white rounded-2xl shadow-sm space-y-4">
        <div className="text-xs font-mono font-bold text-blue-200 uppercase">
          THE GVW WEALTH INTELLIGENCE THESIS
        </div>
        <h2 className="text-2xl font-serif font-bold text-white max-w-2xl leading-snug">
          "The greatest wealth generation in modern East Africa occurs at the intersection of infrastructure development, commodity processing, and domestic institutional savings."
        </h2>
        <p className="text-xs text-blue-100 max-w-3xl leading-relaxed">
          While speculative foreign capital fluctuates, domestic pension funds (NSSF, PSSSF), listed blue-chips on the DSE, and local industrial conglomerates (Bakhresa, MeTL, Amsons) are compounding wealth by capturing processing margins and infrastructure appreciation.
        </p>
      </div>

      {/* 3. Wealth Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WEALTH_METRICS.map(metric => (
          <div
            key={metric.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:border-blue-900/50 hover:shadow-md transition group shadow-xs space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold uppercase">
                  {metric.category}
                </span>
                <span className="text-emerald-700 font-semibold font-mono">
                  {metric.growthYearOnYear}
                </span>
              </div>

              <div>
                <div className="text-3xl font-serif font-bold text-gray-950 tracking-tight">
                  {metric.primaryValue}
                </div>
                <div className="text-xs font-medium text-gray-600 mt-0.5">
                  {metric.metricLabel}
                </div>
              </div>

              <h3 className="text-base font-serif font-bold text-gray-950 group-hover:text-blue-900 transition">
                {metric.title}
              </h3>

              <p className="text-xs text-gray-600 leading-relaxed">
                {metric.description}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <div className="text-[10px] font-mono font-bold text-gray-500 uppercase">
                KEY INSTITUTIONAL DRIVERS
              </div>
              <div className="flex flex-wrap gap-1.5">
                {metric.keyEntitiesOrDrivers.map((entity, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-mono rounded"
                  >
                    {entity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Strategic Corridors Deep Dive */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="text-xs font-mono font-bold text-blue-900 uppercase">
            GEOGRAPHIC CORRIDORS
          </div>
          <h3 className="text-2xl font-serif font-bold text-gray-950 mt-1">
            Top 3 Wealth-Generation Corridors
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-[#FBFBFB] border border-gray-200 rounded-xl space-y-2">
            <div className="text-xs font-mono font-bold text-blue-900">01. DODOMA EXECUTIVE CITY</div>
            <h4 className="text-base font-serif font-bold text-gray-950">Administrative & Commercial Relocation</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Permanent establishment of 100% of national ministries, foreign embassies, and statutory bodies resulting in +24% annual land value appreciation.
            </p>
          </div>

          <div className="p-5 bg-[#FBFBFB] border border-gray-200 rounded-xl space-y-2">
            <div className="text-xs font-mono font-bold text-blue-900">02. KIGAMBONI & DAR SOUTH</div>
            <h4 className="text-base font-serif font-bold text-gray-950">Industrial Port & Residential Modernization</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Catalyzed by the Nyerere Suspension Bridge, unlocking thousands of hectares of coastal waterfront, industrial warehousing, and middle-class housing.
            </p>
          </div>

          <div className="p-5 bg-[#FBFBFB] border border-gray-200 rounded-xl space-y-2">
            <div className="text-xs font-mono font-bold text-blue-900">03. MTWARA SEZ CORRIDOR</div>
            <h4 className="text-base font-serif font-bold text-gray-950">Cashew & Natural Gas Hub</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Anchor of the Dangote 3M MT plant, Mnazi Bay gas, and the upcoming cashew kernel agro-parks with direct deepwater maritime berths.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
