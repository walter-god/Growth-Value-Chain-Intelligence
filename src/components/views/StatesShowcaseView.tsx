import React, { useState } from 'react';
import { 
  Layers, 
  WifiOff, 
  CreditCard, 
  Search, 
  Bookmark, 
  RefreshCw, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const StatesShowcaseView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'empty' | 'loading' | 'error'>('empty');

  return (
    <div id="ui-states-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#D1D5DB]">
      {/* Header */}
      <div className="border-b border-[#1F232E] pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
          <Layers className="w-4 h-4" />
          <span>SYSTEM STATES & RESILIENCE MATRIX</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
          Edge Cases, Loading Skeletons & Error Recovery
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
          In production systems, state management determines user trust. Review the interactive implementations of all empty states, skeleton loaders, and error boundaries.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center border-b border-[#1F232E] space-x-6 text-sm font-semibold">
        <button
          onClick={() => setSelectedCategory('empty')}
          className={`pb-3 transition ${selectedCategory === 'empty' ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          1. Empty States (Guided Next Steps)
        </button>
        <button
          onClick={() => setSelectedCategory('loading')}
          className={`pb-3 transition ${selectedCategory === 'loading' ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          2. Loading Skeletons (Perceived Performance)
        </button>
        <button
          onClick={() => setSelectedCategory('error')}
          className={`pb-3 transition ${selectedCategory === 'error' ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          3. Error States & Failover UX
        </button>
      </div>

      {/* EMPTY STATES */}
      {selectedCategory === 'empty' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Empty Saved Library */}
          <div className="bg-[#0F1115] p-8 rounded-2xl border border-[#232733] text-center space-y-4">
            <div className="w-12 h-12 bg-[#1F232E] text-[#C5A059] rounded-full mx-auto flex items-center justify-center">
              <Bookmark className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-white">Your Reading List is Empty</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Save dossiers, investigations, and weekly indexes to read later or sync offline on mobile.
              </p>
            </div>
            <button className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4B06A] text-[#0A0B0D] font-bold rounded-lg text-xs shadow-md transition">
              Explore Today’s Lead Dispatches
            </button>
          </div>

          {/* Empty Zero Search */}
          <div className="bg-[#0F1115] p-8 rounded-2xl border border-[#232733] text-center space-y-4">
            <div className="w-12 h-12 bg-[#1F232E] text-[#C5A059] rounded-full mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-white">No Intelligence Results</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                No matching venture filings found for this keyword query. Try broader terms or check filters.
              </p>
            </div>
            <div className="flex justify-center gap-2 text-xs">
              <span className="px-2.5 py-1 bg-[#14171F] border border-[#232733] rounded text-gray-300 font-medium">Sovereign Wealth</span>
              <span className="px-2.5 py-1 bg-[#14171F] border border-[#232733] rounded text-gray-300 font-medium">Inference Margin</span>
            </div>
          </div>
        </div>
      )}

      {/* LOADING SKELETONS */}
      {selectedCategory === 'loading' && (
        <div className="space-y-6">
          <div className="text-xs font-mono uppercase text-[#C5A059]">Simulated Content Loading Pulse</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#0F1115] p-5 rounded-xl border border-[#232733] space-y-4 animate-pulse">
                <div className="w-full aspect-16/9 bg-[#1F232E] rounded-lg" />
                <div className="space-y-2">
                  <div className="w-1/3 h-3 bg-[#1F232E] rounded" />
                  <div className="w-full h-5 bg-[#1F232E] rounded" />
                  <div className="w-5/6 h-5 bg-[#1F232E] rounded" />
                  <div className="w-full h-3 bg-[#14171F] rounded mt-2" />
                  <div className="w-4/5 h-3 bg-[#14171F] rounded" />
                </div>
                <div className="flex justify-between pt-3 border-t border-[#1F232E]">
                  <div className="w-20 h-3 bg-[#1F232E] rounded" />
                  <div className="w-12 h-3 bg-[#1F232E] rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ERROR RECOVERY STATES */}
      {selectedCategory === 'error' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Network Disconnect */}
          <div className="bg-[#0F1115] p-8 rounded-2xl border border-[#232733] text-center space-y-4">
            <div className="w-12 h-12 bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-full mx-auto flex items-center justify-center">
              <WifiOff className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-white">Secure Connection Interrupted</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Unable to synchronize with the GVW Real-Time Wire. Cached offline dispatches remain accessible.
              </p>
            </div>
            <button className="px-4 py-2 bg-[#1F232E] hover:bg-[#2A303F] text-white border border-[#343A4C] font-semibold rounded-lg text-xs flex items-center gap-1.5 mx-auto transition">
              <RefreshCw className="w-3.5 h-3.5" /> Reconnect to Bureau Feed
            </button>
          </div>

          {/* Payment Declined */}
          <div className="bg-[#0F1115] p-8 rounded-2xl border border-[#232733] text-center space-y-4">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full mx-auto flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-white">Payment Authorization Failed</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Your financial institution requested two-step SCA verification or declined corporate procurement limits.
              </p>
            </div>
            <button className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4B06A] text-[#0A0B0D] font-bold rounded-lg text-xs shadow-md transition">
              Update Card or Use Wire Transfer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
