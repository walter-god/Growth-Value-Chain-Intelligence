import React, { useState } from 'react';
import { 
  FileText, 
  ArrowRight, 
  Download, 
  Calendar, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  X,
  BookOpen,
  Sparkles,
  Share2
} from 'lucide-react';
import { RESEARCH_REPORTS } from '../../data/gvwIntelligenceData';
import { ResearchReport } from '../../types';

interface ReportsViewProps {
  initialReportId?: string;
  onRequestAccess: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  initialReportId,
  onRequestAccess
}) => {
  const [selectedSeries, setSelectedSeries] = useState<string>('All');
  const [activeReport, setActiveReport] = useState<ResearchReport | null>(
    RESEARCH_REPORTS.find(r => r.id === initialReportId) || null
  );

  const filteredReports = RESEARCH_REPORTS.filter(rep => {
    return selectedSeries === 'All' || rep.series === selectedSeries;
  });

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>DATABASE 06 • RESEARCH & STRATEGIC REPORTS</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-950 mt-1">
            Institutional Research Library
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Data-backed publications, econometric outlooks, and sector value-chain monitors authored by GVW’s in-house economics and market research team.
          </p>
        </div>

        <button
          onClick={onRequestAccess}
          className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition shadow-xs flex items-center gap-2 self-start lg:self-auto cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Subscribe to Institutional Feed</span>
        </button>
      </div>

      {/* 2. Series Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4">
        <span className="text-xs text-gray-400 font-mono mr-2">SERIES:</span>
        {[
          'All',
          'Tanzania Economic Outlook',
          'Value-Chain Monitor',
          'Sector Intelligence',
          'Wealth & Capital'
        ].map(series => (
          <button
            key={series}
            onClick={() => setSelectedSeries(series)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              selectedSeries === series
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {series}
          </button>
        ))}
      </div>

      {/* 3. Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReports.map(report => (
          <div
            key={report.id}
            onClick={() => setActiveReport(report)}
            className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col justify-between hover:border-blue-900/50 hover:shadow-md transition cursor-pointer group shadow-xs space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-500">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold uppercase">
                  {report.series}
                </span>
                <span>{report.publishedDate}</span>
              </div>

              <h3 className="text-xl font-serif font-bold text-gray-950 group-hover:text-blue-900 transition leading-snug">
                {report.title}
              </h3>

              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                {report.abstract}
              </p>

              <div className="space-y-1.5 pt-2">
                <div className="text-[10px] font-mono font-bold text-gray-500 uppercase">
                  KEY TAKEAWAYS
                </div>
                {report.keyFindings.slice(0, 2).map((k, i) => (
                  <div key={i} className="text-xs text-gray-700 flex items-start gap-2">
                    <span className="text-blue-900 font-bold">•</span>
                    <span className="line-clamp-2">{k}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <img src={report.author.avatar} alt={report.author.name} className="w-6 h-6 rounded-full object-cover" />
                <span className="text-gray-700 font-medium text-xs">{report.author.name}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-gray-500">
                <span>{report.pages} pages</span>
                <span className="font-semibold text-blue-900 flex items-center gap-1 group-hover:translate-x-0.5 transition">
                  Read Full Report <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Full Report Reader Modal */}
      {activeReport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-3xl w-full p-6 sm:p-10 relative my-8 text-gray-900">
            <button
              onClick={() => setActiveReport(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="space-y-2 border-b border-gray-200 pb-5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase">
                  <span>{activeReport.series}</span>
                  <span>•</span>
                  <span>{activeReport.publishedDate}</span>
                  <span>•</span>
                  <span>{activeReport.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950 leading-tight">
                  {activeReport.title}
                </h2>

                <div className="flex items-center gap-3 pt-2">
                  <img src={activeReport.author.avatar} alt={activeReport.author.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className="text-xs">
                    <div className="font-bold text-gray-900">{activeReport.author.name}</div>
                    <div className="text-gray-500 text-[11px]">{activeReport.author.title}</div>
                  </div>
                </div>
              </div>

              {/* Executive Abstract */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-gray-500 uppercase">
                  EXECUTIVE SUMMARY
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-sans">
                  {activeReport.abstract}
                </p>
              </div>

              {/* Key Empirical Findings */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-5 space-y-3">
                <div className="text-xs font-mono font-bold text-blue-900 uppercase">
                  KEY QUANTITATIVE FINDINGS & DISCOVERIES
                </div>
                <ul className="space-y-2.5 text-xs text-blue-950">
                  {activeReport.keyFindings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Table of Contents */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-gray-500 uppercase">
                  REPORT TABLE OF CONTENTS ({activeReport.pages} PAGES)
                </div>
                <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4 divide-y divide-gray-100 text-xs text-gray-700">
                  {activeReport.tableOfContents.map((section, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between">
                      <span className="font-medium">{idx + 1}. {section}</span>
                      <span className="text-gray-400 font-mono text-[11px]">Section {idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download / Subscribe Footer */}
              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-gray-500 font-mono">
                  Full 48-page PDF available with dataset appendicies.
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      alert('Downloading executive briefing PDF summary...');
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveReport(null);
                      onRequestAccess();
                    }}
                    className="px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Request Full Data Appendices →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
