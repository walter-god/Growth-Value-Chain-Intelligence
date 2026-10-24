import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  CheckCircle2, 
  MapPin, 
  Users, 
  DollarSign, 
  ExternalLink,
  ShieldCheck, 
  X,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { COMPANIES_DATABASE } from '../../data/gvwIntelligenceData';
import { CompanyRecord } from '../../types';

interface CompaniesViewProps {
  initialCompanyId?: string;
  onRequestAccess: () => void;
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({
  initialCompanyId,
  onRequestAccess
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedOwnership, setSelectedOwnership] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<CompanyRecord | null>(
    COMPANIES_DATABASE.find(c => c.id === initialCompanyId) || null
  );

  const filteredCompanies = COMPANIES_DATABASE.filter(comp => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      comp.name.toLowerCase().includes(q) ||
      comp.sector.toLowerCase().includes(q) ||
      comp.subSector.toLowerCase().includes(q) ||
      comp.location.toLowerCase().includes(q) ||
      comp.region.toLowerCase().includes(q) ||
      comp.keyProductsOrAssets.some(p => p.toLowerCase().includes(q));

    const matchesSector = selectedSector === 'All' || comp.sector === selectedSector;
    const matchesOwnership = selectedOwnership === 'All' || comp.ownership === selectedOwnership;

    return matchesSearch && matchesSector && matchesOwnership;
  });

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>DATABASE 03 • COMPANY INTELLIGENCE (ASOKO & STEARS BENCHMARK)</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-950 mt-1">
            Corporate Registry & Cap Table Intelligence
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Search verified corporate profiles across manufacturing, mining, agribusiness, banking, and infrastructure. Track ownership, asset bases, and value-chain placement.
          </p>
        </div>

        <button
          onClick={onRequestAccess}
          className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition shadow-xs flex items-center gap-2 self-start lg:self-auto cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Request Verified Cap-Table Feeds</span>
        </button>
      </div>

      {/* 2. Search Bar with Instant Pre-Set Chips */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search companies, e.g. 'Tanzania cement companies', 'ETG', 'Gold', 'CRDB Bank'..."
              className="w-full pl-12 pr-10 py-3 bg-[#FBFBFB] border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-900 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Query Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-gray-400 font-mono text-[11px]">SUGGESTED:</span>
            {[
              'Tanzania cement companies',
              'Agribusiness & Cashew',
              'Banking & Finance',
              'Mining & Gold',
              'Dar es Salaam'
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(chip.replace('Tanzania ', '').replace(' & Cashew', ''))}
                className="px-2.5 py-1 bg-gray-100 hover:bg-blue-50 hover:text-blue-900 hover:border-blue-200 border border-transparent rounded-lg text-xs text-gray-700 transition cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-gray-400 font-mono text-[11px]">SECTOR:</span>
            {['All', 'Industry', 'Agriculture', 'Mining', 'Energy', 'Manufacturing', 'Services'].map(sec => (
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

          <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <span>Showing {filteredCompanies.length} verified corporate entities</span>
          </div>
        </div>

        {/* Table View (Matching User Specification) */}
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-[#F8FAFC] text-gray-500 font-mono uppercase text-[10px] border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Sector</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-right">Revenue</th>
                <th className="py-3 px-4">Employees</th>
                <th className="py-3 px-4">Ownership</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCompanies.map(comp => (
                <tr
                  key={comp.id}
                  onClick={() => setSelectedCompany(comp)}
                  className="hover:bg-blue-50/40 transition cursor-pointer group bg-white"
                >
                  <td className="py-3 px-4 font-semibold text-gray-950 group-hover:text-blue-900">
                    <div className="flex items-center gap-1.5">
                      <span>{comp.name}</span>
                      {comp.verifiedData && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800 shrink-0" title="Verified Cap Table" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-mono">
                      {comp.sector}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 truncate max-w-[160px]">
                    {comp.location}
                  </td>
                  <td className="py-3 px-4 text-right font-serif font-bold text-gray-950 text-xs">
                    {comp.revenueBracket}
                  </td>
                  <td className="py-3 px-4 text-gray-600 font-mono text-[11px]">
                    {comp.employees}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-900 text-[10px] font-mono font-medium">
                      {comp.ownership}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      {comp.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-[11px] font-semibold text-blue-900 group-hover:underline">
                      View Profile →
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Company Detail Modal / Profile Drawer */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative my-8 text-gray-900">
            <button
              onClick={() => setSelectedCompany(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase">
                  <span>{selectedCompany.sector}</span>
                  <span>•</span>
                  <span>{selectedCompany.subSector}</span>
                  <span>•</span>
                  <span>Founded {selectedCompany.yearFounded}</span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-2xl font-serif font-bold text-gray-950">
                    {selectedCompany.name}
                  </h3>
                  {selectedCompany.verifiedData && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 text-[10px] font-mono font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-blue-800" /> Verified
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {selectedCompany.description}
                </p>
              </div>

              {/* Core Financial & Operational Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-[#FBFBFB] border border-gray-200 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">REVENUE</span>
                  <span className="text-sm font-serif font-bold text-gray-950 mt-0.5 block">
                    {selectedCompany.revenueBracket}
                  </span>
                </div>
                <div className="p-3 bg-[#FBFBFB] border border-gray-200 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">HEADCOUNT</span>
                  <span className="text-xs font-bold text-gray-950 font-mono mt-0.5 block">
                    {selectedCompany.employees}
                  </span>
                </div>
                <div className="p-3 bg-[#FBFBFB] border border-gray-200 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">OWNERSHIP</span>
                  <span className="text-xs font-semibold text-blue-900 font-mono mt-0.5 block">
                    {selectedCompany.ownership}
                  </span>
                </div>
                <div className="p-3 bg-[#FBFBFB] border border-gray-200 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">LOCATION</span>
                  <span className="text-xs font-medium text-gray-800 truncate mt-0.5 block">
                    {selectedCompany.region}
                  </span>
                </div>
              </div>

              {/* Value Chain Role */}
              <div className="p-4 bg-blue-50/70 border border-blue-200/70 rounded-xl space-y-1">
                <div className="text-[10px] font-mono font-bold text-blue-900 uppercase">
                  VALUE CHAIN PLACEMENT & STRATEGIC ROLE
                </div>
                <div className="text-xs font-semibold text-blue-950">
                  {selectedCompany.valueChainRole}
                </div>
              </div>

              {/* Key Assets or Products */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-gray-500 uppercase">
                  KEY ASSETS & CORE PRODUCT LINES
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCompany.keyProductsOrAssets.map((asset, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 text-xs font-mono"
                    >
                      {asset}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-4">
                <div className="text-[11px] text-gray-500 font-mono">
                  Full cap table and financials available under Institutional License.
                </div>
                <button
                  onClick={() => {
                    setSelectedCompany(null);
                    onRequestAccess();
                  }}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Request Full Company Cap Table →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
