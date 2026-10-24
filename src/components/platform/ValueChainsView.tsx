import React, { useState } from 'react';
import { 
  Layers, 
  ArrowRight, 
  TrendingUp, 
  AlertCircle, 
  Building2, 
  DollarSign, 
  CheckCircle2, 
  MapPin, 
  Download, 
  Sparkles,
  Info,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { VALUE_CHAINS } from '../../data/gvwIntelligenceData';
import { ValueChain, ValueChainNode } from '../../types';

interface ValueChainsViewProps {
  initialChainId?: string;
  onRequestAccess: () => void;
  onNavigateToDeal?: (dealId: string) => void;
}

export const ValueChainsView: React.FC<ValueChainsViewProps> = ({
  initialChainId,
  onRequestAccess,
  onNavigateToDeal
}) => {
  const [selectedChainId, setSelectedChainId] = useState<string>(
    initialChainId || 'vc-cashew'
  );
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(2); // Default to Industrial Processor (the high-return signature node!)

  const activeChain = VALUE_CHAINS.find(c => c.id === selectedChainId) || VALUE_CHAINS[0];
  const activeNode = activeChain.nodes[selectedNodeIndex] || activeChain.nodes[0];

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>DATABASE 02 • VALUE-CHAIN INTELLIGENCE (GVW SIGNATURE PRODUCT)</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-950 mt-1">
            End-to-End Value Chain Teardowns
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Deconstructing every stage from primary extraction to global retail off-take. Tracking who captures what margins, geographic hubs, processing bottlenecks, and high-yield investment allocations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRequestAccess}
            className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Commission Bespoke Value-Chain Audit</span>
          </button>
        </div>
      </div>

      {/* 2. Value Chain Selector Strip */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4">
        {VALUE_CHAINS.map(chain => {
          const isSelected = chain.id === activeChain.id;
          return (
            <button
              key={chain.id}
              onClick={() => {
                setSelectedChainId(chain.id);
                setSelectedNodeIndex(Math.min(2, chain.nodes.length - 1));
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer text-left ${
                isSelected
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="font-semibold">{chain.name}</div>
              <div className={`text-[10px] ${isSelected ? 'text-blue-200' : 'text-gray-500'}`}>
                {chain.sector} • {chain.exportValueUsd}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Active Value Chain Summary Cards */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-gray-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold uppercase">
                {activeChain.sector}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 font-medium">{activeChain.subSector}</span>
            </div>

            <h2 className="text-3xl font-serif font-bold text-gray-950">
              {activeChain.name}
            </h2>

            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/60 text-xs text-blue-900 font-mono font-semibold">
              CHAIN FLOW: {activeChain.tagline}
            </div>

            <p className="text-xs text-gray-600 leading-relaxed max-w-3xl pt-1">
              {activeChain.summary}
            </p>
          </div>

          {/* Key Metric Grid */}
          <div className="grid grid-cols-2 gap-3 min-w-[280px] shrink-0">
            <div className="p-3.5 bg-[#FBFBFB] border border-gray-200 rounded-xl">
              <div className="text-[10px] font-mono text-gray-500 uppercase">ANNUAL PRODUCTION</div>
              <div className="text-sm font-serif font-bold text-gray-950 mt-0.5">
                {activeChain.annualProduction.split('(')[0]}
              </div>
            </div>
            <div className="p-3.5 bg-[#FBFBFB] border border-gray-200 rounded-xl">
              <div className="text-[10px] font-mono text-gray-500 uppercase">CURRENT EXPORT</div>
              <div className="text-sm font-serif font-bold text-gray-950 mt-0.5">
                {activeChain.exportValueUsd}
              </div>
            </div>
            <div className="p-3.5 bg-[#FBFBFB] border border-gray-200 rounded-xl">
              <div className="text-[10px] font-mono text-gray-500 uppercase">EMPLOYMENT BASE</div>
              <div className="text-xs font-semibold text-gray-800 mt-0.5">
                {activeChain.employmentEstimated.split(' ')[0]} {activeChain.employmentEstimated.split(' ')[1]}
              </div>
            </div>
            <div className="p-3.5 bg-emerald-50/80 border border-emerald-200/80 rounded-xl">
              <div className="text-[10px] font-mono text-emerald-800 uppercase">VALUE MULTIPLIER</div>
              <div className="text-xs font-bold text-emerald-900 font-mono mt-0.5">
                Up to 3.2x Uplift
              </div>
            </div>
          </div>
        </div>

        {/* 4. Interactive Node Flow Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
              SELECT A VALUE CHAIN NODE TO INSPECT PLAYERS & MARGINS
            </div>
            <span className="text-[11px] font-mono text-blue-900">
              Active: {activeNode.stageName}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {activeChain.nodes.map((node, idx) => {
              const isSelected = idx === selectedNodeIndex;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeIndex(idx)}
                  className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-900 text-white border-blue-950 shadow-md ring-2 ring-blue-900/20'
                      : 'bg-[#FBFBFB] border-gray-200 hover:border-blue-900/50'
                  }`}
                >
                  <div>
                    <div className={`text-[11px] font-mono font-bold mb-1 ${isSelected ? 'text-blue-200' : 'text-blue-900'}`}>
                      {node.stageName}
                    </div>
                    <p className={`text-[11px] line-clamp-2 leading-relaxed ${isSelected ? 'text-blue-100' : 'text-gray-600'}`}>
                      {node.roleDescription}
                    </p>
                  </div>

                  <div className={`mt-4 pt-2 border-t text-[10px] ${isSelected ? 'border-blue-800 text-blue-200' : 'border-gray-200 text-gray-500'}`}>
                    <div>Margin: <span className={isSelected ? 'text-emerald-300 font-bold' : 'text-emerald-700 font-bold'}>{node.averageMargin}</span></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Deep-Dive on Active Node */}
        <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200">
            <div>
              <div className="text-xs font-mono font-bold text-blue-900 uppercase">
                NODE DEEP-DIVE: {activeNode.stageName}
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-950 mt-1">
                Operational Realities & Financial Dynamics
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 text-xs">
                <span className="text-gray-500 text-[10px] font-mono block">BENCHMARK PRICING</span>
                <span className="font-bold text-gray-950">{activeNode.benchmarkPrice}</span>
              </div>
              <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 text-xs">
                <span className="text-emerald-700 text-[10px] font-mono block">AVERAGE MARGIN</span>
                <span className="font-bold text-emerald-900">{activeNode.averageMargin}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Major Players */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-3">
              <div className="text-xs font-mono font-bold text-gray-950 uppercase flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-blue-900" />
                <span>MAJOR MARKET PLAYERS & ENTITIES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeNode.majorPlayers.map((player, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 text-xs font-medium font-mono"
                  >
                    {player}
                  </span>
                ))}
              </div>
              {activeNode.processingCapacity && (
                <div className="pt-2 text-xs text-gray-600 border-t border-gray-100">
                  <strong>Processing Capacity:</strong> {activeNode.processingCapacity}
                </div>
              )}
            </div>

            {/* Geographic Concentration */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-3">
              <div className="text-xs font-mono font-bold text-gray-950 uppercase flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-900" />
                <span>GEOGRAPHIC CONCENTRATION & HOTSPOTS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeNode.geographicHotspots.map((geo, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 text-xs font-medium font-mono"
                  >
                    📍 {geo}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed pt-2 border-t border-gray-100">
                Primary logistics arteries flow along the Central SGR railway line and the southern Tanzam corridor.
              </p>
            </div>
          </div>

          {/* Bottlenecks vs Investment Opportunity Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Bottlenecks */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-5 space-y-3">
              <div className="text-xs font-mono font-bold text-amber-900 uppercase flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>STRUCTURAL BOTTLENECKS (WHAT IS HOLDING IT BACK)</span>
              </div>
              <ul className="space-y-2 text-xs text-amber-950">
                {activeNode.bottlenecks.map((btn, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{btn}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="bg-blue-900 text-white rounded-xl p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-blue-200 uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>ACTIONABLE INVESTMENT OPPORTUNITY</span>
                </div>
                <p className="text-xs text-blue-50 leading-relaxed mt-2">
                  {activeNode.investmentOpportunity}
                </p>
              </div>

              <div className="pt-3 border-t border-blue-800 flex items-center justify-between">
                <span className="text-[11px] text-blue-200 font-mono">
                  TIC Special Incentives Applicable
                </span>
                <button
                  onClick={onRequestAccess}
                  className="px-3 py-1.5 bg-white text-blue-950 font-semibold text-xs rounded-lg hover:bg-blue-50 transition cursor-pointer"
                >
                  Inquire on Deal Dossier →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Export Trade Destinations */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
            INTERNATIONAL TRADE DESTINATIONS & MARKET DESTINATIONS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {activeChain.topDestinations.map((dest, i) => (
              <div key={i} className="p-3.5 bg-[#FBFBFB] border border-gray-200 rounded-xl">
                <div className="text-lg font-serif font-bold text-blue-900">{dest.share}</div>
                <div className="text-xs text-gray-700 mt-1 line-clamp-2">{dest.market}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
