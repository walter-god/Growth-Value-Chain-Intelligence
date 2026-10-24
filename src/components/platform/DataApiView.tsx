import React, { useState } from 'react';
import { Database, Download, Code, CheckCircle2, ShieldCheck, ArrowRight, FileSpreadsheet } from 'lucide-react';
import { MACRO_INDICATORS, VALUE_CHAINS, COMPANIES_DATABASE } from '../../data/gvwIntelligenceData';

interface DataApiViewProps {
  onRequestAccess: () => void;
}

export const DataApiView: React.FC<DataApiViewProps> = ({ onRequestAccess }) => {
  const [selectedDataset, setSelectedDataset] = useState<'macro' | 'chains' | 'companies'>('macro');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (type: 'macro' | 'chains' | 'companies') => {
    let csv = '';
    let filename = '';

    if (type === 'macro') {
      csv = 'Indicator,Code,Category,Value,Period,Source\n' + 
        MACRO_INDICATORS.map(m => `"${m.name}","${m.code}","${m.category}","${m.value}","${m.period}","${m.source}"`).join('\n');
      filename = 'gvw_macro_indicators_tanzania.csv';
    } else if (type === 'chains') {
      csv = 'ValueChain,Sector,SubSector,AnnualProduction,ExportValueUSD,KeyRegions\n' + 
        VALUE_CHAINS.map(c => `"${c.name}","${c.sector}","${c.subSector}","${c.annualProduction}","${c.exportValueUsd}","${c.keyRegions.join('; ')}"`).join('\n');
      filename = 'gvw_value_chains_tanzania.csv';
    } else {
      csv = 'Company,Sector,Location,RevenueBracket,Employees,Ownership,Status\n' + 
        COMPANIES_DATABASE.map(c => `"${c.name}","${c.sector}","${c.location}","${c.revenueBracket}","${c.employees}","${c.ownership}","${c.status}"`).join('\n');
      filename = 'gvw_corporate_directory_tanzania.csv';
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
            <Database className="w-3.5 h-3.5" />
            <span>RAW DATA & DEVELOPER API FEEDS</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-950 mt-1">
            Data Feeds & Structured Exports
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Download verified machine-readable CSV datasets or connect directly to GVW's GraphQL and REST intelligence endpoints.
          </p>
        </div>

        <button
          onClick={onRequestAccess}
          className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition shadow-xs flex items-center gap-2 self-start lg:self-auto cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Generate Institutional API Token</span>
        </button>
      </div>

      {downloadSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Successfully exported <strong>{downloadSuccess}</strong> to your local downloads.</span>
        </div>
      )}

      {/* 2. Dataset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-blue-900 uppercase">
              DATASET 01 • MACRO INDICATORS
            </div>
            <h3 className="text-lg font-serif font-bold text-gray-950">
              National Macroeconomic Series
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Quarterly and monthly series: GDP growth, inflation, policy interest rates, FX reserves, and balance of payments.
            </p>
            <div className="text-[11px] font-mono text-gray-500">
              Format: CSV / JSON • 12 Active Variables
            </div>
          </div>

          <button
            onClick={() => handleDownload('macro')}
            className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV Feed</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-blue-900 uppercase">
              DATASET 02 • VALUE CHAINS
            </div>
            <h3 className="text-lg font-serif font-bold text-gray-950">
              Node-by-Node Margins & Capacities
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Structured database of cashew, coffee, gold, gas, horticulture, and cement production, export shares, and margins.
            </p>
            <div className="text-[11px] font-mono text-gray-500">
              Format: CSV / JSON • 6 Signature Chains
            </div>
          </div>

          <button
            onClick={() => handleDownload('chains')}
            className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV Feed</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-blue-900 uppercase">
              DATASET 03 • COMPANIES
            </div>
            <h3 className="text-lg font-serif font-bold text-gray-950">
              Verified Corporate Registry
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Searchable database with revenue brackets, headcounts, ownership structures, and primary value chain affiliations.
            </p>
            <div className="text-[11px] font-mono text-gray-500">
              Format: CSV / JSON • 12+ Major Conglomerates
            </div>
          </div>

          <button
            onClick={() => handleDownload('companies')}
            className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV Feed</span>
          </button>
        </div>
      </div>

      {/* 3. API Code Snippet Preview */}
      <div className="bg-gray-900 text-gray-100 rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400">
            <Code className="w-4 h-4" />
            <span>REST API INTEGRATION (CURL EXAMPLE)</span>
          </div>
          <span className="text-[11px] font-mono text-gray-400">ENDPOINT: https://api.gvw.africa/v1</span>
        </div>

        <pre className="p-4 bg-black/50 rounded-xl text-xs font-mono overflow-x-auto text-emerald-400 border border-gray-800">
{`curl -X GET "https://api.gvw.africa/v1/value-chains/cashew" \\
  -H "Authorization: Bearer gvw_live_sec_99182a" \\
  -H "Accept: application/json"`}
        </pre>

        <p className="text-xs text-gray-400">
          Enterprise subscriptions include unlimited rate-limit programmatic endpoints for Bloomberg Terminals, proprietary algorithmic funds, and institutional research intranets.
        </p>
      </div>
    </div>
  );
};
