import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Lock, 
  Check, 
  Eye, 
  BarChart3, 
  Sliders, 
  X,
  Sparkles,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { Article, BeatCategory, UserProfile } from '../../types';
import { MOCK_PLATFORM_ANALYTICS } from '../../data/mockData';

interface AdminViewProps {
  articles: Article[];
  beats: BeatCategory[];
  currentUser: UserProfile;
  onAddArticle: (newArticle: Partial<Article>) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  articles,
  beats,
  currentUser,
  onAddArticle,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'content' | 'users'>('analytics');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New Article Form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [beatSlug, setBeatSlug] = useState('ai-frontier');
  const [accessTier, setAccessTier] = useState<'free' | 'premium'>('premium');
  const [readTimeMinutes, setReadTimeMinutes] = useState(8);
  const [summary, setSummary] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const beatObj = beats.find(b => b.slug === beatSlug) || beats[0];

    onAddArticle({
      title: title.trim(),
      subtitle: subtitle.trim(),
      beat: beatObj.name,
      beatSlug: beatObj.slug,
      accessTier,
      readTimeMinutes: Number(readTimeMinutes),
      summary: summary.trim(),
      format: 'deep_dive',
      publishedAt: 'Just now',
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
      tags: ['Executive Briefing', beatObj.name],
      contentParagraphs: [
        summary.trim() || 'Confidential investigation compiled directly by the GVW Bureau desk.',
        'Initial data indicates rapid institutional reallocation across allied capital syndicates.',
      ],
      keyInsights: [
        'Proprietary finding compiled by bureau lead editor.',
        'Institutional capital deployment velocity accelerated by 18% quarter-over-quarter.',
      ],
    });

    setCreateModalOpen(false);
    setTitle('');
    setSubtitle('');
    setSummary('');
  };

  return (
    <div id="admin-cms-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#D1D5DB]">
      {/* Admin Header */}
      <div className="border-b border-[#1F232E] pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
            <LayoutDashboard className="w-4 h-4" />
            <span>EDITORIAL CMS & PLATFORM TELEMETRY</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-tight mt-1">
            GVW Executive Platform Control
          </h1>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#C5A059] hover:bg-[#D4B06A] text-[#0A0B0D] rounded-xl text-xs font-bold shadow-md transition"
        >
          <Plus className="w-4 h-4" /> Publish New Intelligence Dossier
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center border-b border-[#1F232E] space-x-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 transition ${activeTab === 'analytics' ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Executive Telemetry
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`pb-3 transition ${activeTab === 'content' ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Content CMS ({articles.length} Dossiers)
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 transition ${activeTab === 'users' ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Subscriber & Access RBAC
        </button>
      </div>

      {/* TAB 1: EXECUTIVE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 bg-[#0F1115] rounded-xl border border-[#232733] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>MONTHLY RECURRING (MRR)</span>
                <DollarSign className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div className="font-mono text-3xl font-bold text-white">
                ${MOCK_PLATFORM_ANALYTICS.mrr.toLocaleString()}
              </div>
              <div className="text-xs text-[#C5A059] font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {MOCK_PLATFORM_ANALYTICS.mrrGrowth}
              </div>
            </div>

            <div className="p-5 bg-[#0F1115] rounded-xl border border-[#232733] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>ACTIVE PAID SUBSCRIBERS</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="font-mono text-3xl font-bold text-white">
                {MOCK_PLATFORM_ANALYTICS.activePaidSubscribers.toLocaleString()}
              </div>
              <div className="text-xs text-[#C5A059] font-semibold">
                {MOCK_PLATFORM_ANALYTICS.subscribersGrowth}
              </div>
            </div>

            <div className="p-5 bg-[#0F1115] rounded-xl border border-[#232733] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>FREE-TO-PAID CONVERSION</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="font-mono text-3xl font-bold text-white">
                {MOCK_PLATFORM_ANALYTICS.freeToPaidConversionRate}%
              </div>
              <div className="text-xs text-gray-400">
                Target: &gt;4.0% industry benchmark
              </div>
            </div>

            <div className="p-5 bg-[#0F1115] rounded-xl border border-[#232733] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>MONTHLY CHURN RATE</span>
                <ShieldAlert className="w-4 h-4 text-rose-400" />
              </div>
              <div className="font-mono text-3xl font-bold text-white">
                {MOCK_PLATFORM_ANALYTICS.churnRate}%
              </div>
              <div className="text-xs text-[#C5A059] font-semibold">
                -0.3% improvement vs Q2
              </div>
            </div>
          </div>

          {/* Beat Revenue Contribution Heatmap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-[#0F1115] rounded-xl border border-[#232733] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-white">
                  Revenue Contribution by Beat
                </h3>
                <span className="text-xs text-gray-400 font-mono">Current Month</span>
              </div>

              <div className="space-y-3">
                {MOCK_PLATFORM_ANALYTICS.beatRankings.map((b, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-gray-200">{b.beat}</span>
                      <span className="font-mono font-bold text-[#C5A059]">{b.revenueContribution} ({b.share})</span>
                    </div>
                    <div className="w-full bg-[#1F232E] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#C5A059] h-2 rounded-full"
                        style={{ width: b.share }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversion Funnel Breakdown */}
            <div className="p-6 bg-[#0F1115] rounded-xl border border-[#232733] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-white">
                  Conversion Funnel Telemetry
                </h3>
                <span className="text-xs text-gray-400 font-mono">Monthly Traffic</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-[#14171F] rounded-lg border border-[#232733]">
                  <span className="text-gray-300">Anonymous Unique Visitors</span>
                  <span className="font-mono font-bold text-white">
                    {MOCK_PLATFORM_ANALYTICS.funnelMetrics.anonymousVisitors.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#14171F] rounded-lg border border-[#232733]">
                  <span className="text-gray-300">Free Registered Accounts</span>
                  <span className="font-mono font-bold text-white">
                    {MOCK_PLATFORM_ANALYTICS.funnelMetrics.registeredFreeAccounts.toLocaleString()} (10.5%)
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#14171F] rounded-lg border border-[#232733]">
                  <span className="text-gray-300">Paywall Impressions Triggered</span>
                  <span className="font-mono font-bold text-white">
                    {MOCK_PLATFORM_ANALYTICS.funnelMetrics.paywallHitsMonthly.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#C5A059]/10 rounded-lg border border-[#C5A059]/40">
                  <span className="text-[#C5A059] font-semibold">New Paid Upgrades (MRR Added)</span>
                  <span className="font-mono font-bold text-[#C5A059]">
                    +{MOCK_PLATFORM_ANALYTICS.funnelMetrics.newPaidConversions.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTENT MANAGEMENT SYSTEM */}
      {activeTab === 'content' && (
        <div className="bg-[#0F1115] rounded-xl border border-[#232733] overflow-hidden space-y-4">
          <div className="p-4 border-b border-[#1F232E] flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Published Intelligence Dossiers</h3>
            <span className="text-xs text-gray-400 font-mono">{articles.length} records</span>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#14171F] border-b border-[#1F232E] text-gray-400 font-mono text-[11px] uppercase">
                  <th className="p-3.5">Title & Dossier</th>
                  <th className="p-3.5">Beat Desk</th>
                  <th className="p-3.5">Access Tier</th>
                  <th className="p-3.5">Author</th>
                  <th className="p-3.5 text-right">Views</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F232E] text-gray-300">
                {articles.map(art => (
                  <tr key={art.id} className="hover:bg-[#14171F]/60 transition">
                    <td className="p-3.5 font-medium text-white max-w-xs truncate">
                      {art.title}
                    </td>
                    <td className="p-3.5 text-gray-400 whitespace-nowrap">
                      {art.beat}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${art.accessTier === 'premium' ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40' : 'bg-[#1F232E] text-gray-300'}`}>
                        {art.accessTier}
                      </span>
                    </td>
                    <td className="p-3.5 text-gray-400 whitespace-nowrap">
                      {art.author.name}
                    </td>
                    <td className="p-3.5 font-mono text-right text-gray-300">
                      {art.views.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#C5A059] bg-[#C5A059]/20 border border-[#C5A059]/40 px-2 py-0.5 rounded">
                        <Check className="w-3 h-3" /> Live
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: USER ROLES & ACCESS CONTROL */}
      {activeTab === 'users' && (
        <div className="bg-[#0F1115] rounded-xl border border-[#232733] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Role-Based Access Control (RBAC)</h3>
              <p className="text-xs text-gray-400">Manage user privileges and subscription clearances.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#14171F] rounded-xl border border-[#232733] space-y-1">
              <div className="font-bold text-white">Visitor (Guest)</div>
              <p className="text-[11px] text-gray-400">Unauthenticated, metered headline browsing.</p>
            </div>
            <div className="p-4 bg-[#14171F] rounded-xl border border-[#232733] space-y-1">
              <div className="font-bold text-white">Registered Free</div>
              <p className="text-[11px] text-gray-400">Account holder, follows beats, paywalled articles.</p>
            </div>
            <div className="p-4 bg-[#C5A059]/10 rounded-xl border border-[#C5A059]/40 space-y-1">
              <div className="font-bold text-[#C5A059]">GVW Insider</div>
              <p className="text-[11px] text-gray-300">Unmetered access, audio briefings, offline save.</p>
            </div>
            <div className="p-4 bg-[#1F232E] rounded-xl border border-[#343A4C] space-y-1">
              <div className="font-bold text-white">Admin & Editor</div>
              <p className="text-[11px] text-gray-400">Full CMS publish, revenue metrics, user management.</p>
            </div>
          </div>
        </div>
      )}

      {/* Add New Intelligence Dossier Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F1115] rounded-2xl border border-[#232733] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-gray-200">
            <button
              onClick={() => setCreateModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C5A059]">
                  EDITORIAL PUBLISHER
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Publish Intelligence Dossier
                </h3>
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Headline Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Inside the $1.2B Fusion Offtake Agreements..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0B0D] border border-[#232733] rounded-lg text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Subtitle / Dek</label>
                <input
                  type="text"
                  placeholder="Brief sub-headline describing the institutional impact..."
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0B0D] border border-[#232733] rounded-lg text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Editorial Beat</label>
                  <select
                    value={beatSlug}
                    onChange={(e) => setBeatSlug(e.target.value)}
                    className="w-full px-2.5 py-2 bg-[#0A0B0D] border border-[#232733] rounded-lg text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  >
                    {beats.map(b => (
                      <option key={b.slug} value={b.slug}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Access Tier</label>
                  <select
                    value={accessTier}
                    onChange={(e: any) => setAccessTier(e.target.value)}
                    className="w-full px-2.5 py-2 bg-[#0A0B0D] border border-[#232733] rounded-lg text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  >
                    <option value="premium">GVW Insider (Paywalled)</option>
                    <option value="free">Free Public Access</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Executive Summary / Key Findings</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Confidential summary bulleting the key metrics and revelations..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full p-2.5 bg-[#0A0B0D] border border-[#232733] rounded-lg text-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 border border-[#232733] text-gray-300 rounded-lg font-medium hover:bg-[#14171F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C5A059] hover:bg-[#D4B06A] text-[#0A0B0D] font-bold rounded-lg transition shadow-md"
                >
                  Publish to Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
