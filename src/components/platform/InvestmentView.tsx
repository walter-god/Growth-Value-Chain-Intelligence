import React, { useState } from 'react';
import { 
  DollarSign, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Filter, 
  CheckCircle2, 
  ArrowRight, 
  X,
  Building2,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import { INVESTMENT_OPPORTUNITIES, TANZANIA_REGIONS } from '../../data/gvwIntelligenceData';
import { InvestmentOpportunity, TanzaniaRegion } from '../../types';
import { TanzaniaEconomicMap } from '../maps/TanzaniaEconomicMap';

interface InvestmentViewProps {
  initialDealId?: string;
  onRequestAccess: () => void;
}

export const InvestmentView: React.FC<InvestmentViewProps> = ({
  initialDealId,
  onRequestAccess
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [selectedRegionPin, setSelectedRegionPin] = useState<string>('reg-mtwara');
  const [selectedDeal, setSelectedDeal] = useState<InvestmentOpportunity | null>(
    INVESTMENT_OPPORTUNITIES.find(d => d.id === initialDealId) || null
  );

  const activeRegion = TANZANIA_REGIONS.find(r => r.id === selectedRegionPin) || TANZANIA_REGIONS[0];

  const filteredDeals = INVESTMENT_OPPORTUNITIES.filter(deal => {
    const matchesSector = selectedSector === 'All' || deal.sector === selectedSector;
    const matchesStage = selectedStage === 'All' || deal.projectStage === selectedStage;
    return matchesSector && matchesStage;
  });

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5" />
            <span>DATABASE 04 • INVESTMENT INTELLIGENCE & DEAL FLOW</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-950 mt-1">
            Tanzania Investment Opportunity Pipeline
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Curated, vetted, shovel-ready projects structured by Sector → Industry → Project → Location → Capital Required → Expected Return → Risk Profile.
          </p>
        </div>

        <button
          onClick={onRequestAccess}
          className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition shadow-xs flex items-center gap-2 self-start lg:self-auto cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Request Deal Data Room Access</span>
        </button>
      </div>

      {/* 2. Interactive Legit Tanzania Investment Map & Regional Hubs */}
      <div className="space-y-4">
        <TanzaniaEconomicMap
          selectedRegionId={selectedRegionPin}
          onSelectRegion={(regId) => setSelectedRegionPin(regId)}
          onExploreOpportunities={(regId) => {
            setSelectedRegionPin(regId);
            const foundDeal = INVESTMENT_OPPORTUNITIES.find(d => d.region.toLowerCase().includes(regId.replace('reg-', '')));
            if (foundDeal) setSelectedDeal(foundDeal);
          }}
          onRequestSubscription={(ctx) => onRequestAccess()}
        />
      </div>

      {/* 3. Filters & Deal Matrix */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-gray-400 font-mono text-[11px]">SECTOR:</span>
            {['All', 'Agriculture', 'Manufacturing', 'Logistics'].map(sec => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  selectedSector === sec
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-gray-400 font-mono text-[11px]">STAGE:</span>
            {['All', 'Shovel-Ready', 'Expansion', 'Operational Scaling'].map(stg => (
              <button
                key={stg}
                onClick={() => setSelectedStage(stg)}
                className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  selectedStage === stg
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {stg}
              </button>
            ))}
          </div>
        </div>

        {/* Shovel-Ready Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDeals.map(deal => (
            <div
              key={deal.id}
              onClick={() => setSelectedDeal(deal)}
              className="bg-[#FBFBFB] border border-gray-200 hover:border-blue-900 hover:shadow-md rounded-2xl p-5 flex flex-col justify-between transition cursor-pointer group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold uppercase">
                    {deal.sector}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    deal.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {deal.riskLevel} Risk
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-gray-950 group-hover:text-blue-900 transition leading-snug">
                  {deal.title}
                </h3>

                <div className="text-[11px] text-gray-500 font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-900" />
                  <span>{deal.location}</span>
                </div>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {deal.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">CAPITAL REQUIRED</span>
                  <span className="text-sm font-serif font-bold text-gray-950">{deal.capitalRequired}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">PROJECT IRR</span>
                  <span className="text-xs font-mono font-bold text-emerald-700">{deal.expectedReturn.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Deal Sheet Teardown Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative my-8 text-gray-900">
            <button
              onClick={() => setSelectedDeal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase">
                  <span>{selectedDeal.sector}</span>
                  <span>•</span>
                  <span>{selectedDeal.industry}</span>
                  <span>•</span>
                  <span className="text-emerald-700">{selectedDeal.projectStage}</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-gray-950 mt-1">
                  {selectedDeal.title}
                </h3>

                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {selectedDeal.summary}
                </p>
              </div>

              {/* Deal Metrics Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-[#FBFBFB] border border-gray-200 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">CAPITAL REQUIRED</span>
                  <span className="text-sm font-serif font-bold text-gray-950 mt-0.5 block">
                    {selectedDeal.capitalRequired}
                  </span>
                </div>
                <div className="p-3 bg-[#FBFBFB] border border-gray-200 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">EXPECTED IRR</span>
                  <span className="text-xs font-bold text-emerald-800 font-mono mt-0.5 block">
                    {selectedDeal.expectedReturn}
                  </span>
                </div>
                <div className="p-3 bg-[#FBFBFB] border border-gray-200 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">RISK PROFILE</span>
                  <span className="text-xs font-semibold text-blue-900 font-mono mt-0.5 block">
                    {selectedDeal.riskLevel} Risk
                  </span>
                </div>
                <div className="p-3 bg-[#FBFBFB] border border-gray-200 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">LOCATION</span>
                  <span className="text-xs font-medium text-gray-800 truncate mt-0.5 block">
                    {selectedDeal.region}
                  </span>
                </div>
              </div>

              {/* Key Milestones */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-gray-950 uppercase">
                  PROGRESS & PROJECT MILESTONES
                </div>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {selectedDeal.keyMilestones.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TIC Special Incentives */}
              <div className="p-4 bg-blue-50/70 border border-blue-200/70 rounded-xl space-y-1">
                <div className="text-[10px] font-mono font-bold text-blue-900 uppercase">
                  GOVERNMENT & TIC FISCAL INCENTIVES
                </div>
                <p className="text-xs text-blue-950 font-medium leading-relaxed">
                  {selectedDeal.incentivesAvailable}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-[11px] text-gray-500 font-mono">
                  Sponsor: {selectedDeal.companyOrSponsor}
                </div>
                <button
                  onClick={() => {
                    setSelectedDeal(null);
                    onRequestAccess();
                  }}
                  className="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition shadow-xs cursor-pointer"
                >
                  Request Full Deal Teaser & Data Room Access →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
