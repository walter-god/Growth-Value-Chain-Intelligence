import React from 'react';
import { 
  Sparkles, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  TrendingUp, 
  ChevronRight, 
  Lock, 
  ArrowUpRight, 
  CheckCircle2, 
  Zap, 
  BarChart3, 
  Radio, 
  UserCheck, 
  Share2, 
  Eye, 
  MessageSquare
} from 'lucide-react';
import { Article, BeatCategory, UserProfile, WireDispatch } from '../../types';

interface HomeViewProps {
  articles: Article[];
  wireDispatches: WireDispatch[];
  beats: BeatCategory[];
  currentUser: UserProfile;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  onSelectBeat: (beatSlug: string) => void;
  onNavigate: (view: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  articles,
  wireDispatches,
  beats,
  currentUser,
  onSelectArticle,
  onToggleBookmark,
  onSelectBeat,
  onNavigate,
}) => {
  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const secondaryArticles = articles.filter(a => a.id !== featuredArticle.id).slice(0, 3);
  const deepDives = articles.filter(a => a.format === 'deep_dive' || a.format === 'market_report');

  // Filter articles based on followed beats if available
  const followedArticles = articles.filter(a => 
    currentUser.followedBeats.some(bId => {
      const beat = beats.find(b => b.id === bId);
      return beat && beat.slug === a.beatSlug;
    })
  );

  return (
    <div id="home-view" className="space-y-10 pb-16 bg-[#0A0B0D] text-[#D1D5DB]">
      {/* Real-time Wire Ticker */}
      <section className="bg-[#0F1115] border-b border-[#1F232E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C5A059] uppercase tracking-widest shrink-0">
              <Radio className="w-4 h-4 text-[#C5A059] animate-pulse" />
              <span>THE WIRE</span>
            </div>

            <div className="flex items-center overflow-x-auto no-scrollbar gap-6 text-xs text-gray-300 divide-x divide-[#1F232E]">
              {wireDispatches.map(item => (
                <div key={item.id} className="flex items-center gap-2 pl-6 first:pl-0 shrink-0 group cursor-pointer" onClick={() => onSelectArticle(featuredArticle)}>
                  <span className="font-mono text-[10px] text-gray-500">{item.timeAgo}</span>
                  <span className="font-semibold text-gray-200 group-hover:text-[#C5A059] transition truncate max-w-sm sm:max-w-md md:max-w-lg">
                    {item.headline}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-[#C5A059] transition" />
                </div>
              ))}
            </div>

            <button 
              onClick={() => onNavigate('explore')}
              className="hidden lg:flex items-center gap-1 text-xs font-semibold text-[#C5A059] hover:text-[#D4B06A] shrink-0"
            >
              All Dispatches <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Hero Editorial Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Investigative Lead (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <article 
              id={`featured-article-${featuredArticle.id}`}
              className="group bg-[#0F1115] rounded-2xl border border-[#232733] overflow-hidden shadow-lg hover:border-[#C5A059]/40 transition duration-300"
            >
              <div 
                className="relative aspect-16/9 sm:aspect-21/9 overflow-hidden bg-black cursor-pointer"
                onClick={() => onSelectArticle(featuredArticle)}
              >
                <img 
                  src={featuredArticle.coverImage} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/50 to-transparent" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-[#C5A059] text-[#0A0B0D] text-xs font-bold uppercase tracking-wider rounded">
                    LEAD DOSSIER
                  </span>
                  {featuredArticle.accessTier === 'premium' && (
                    <span className="px-2.5 py-1 bg-[#1A1D26] text-[#C5A059] border border-[#C5A059]/40 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1">
                      <Lock className="w-3 h-3" /> GVW INSIDER
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-semibold">
                    {featuredArticle.beat}
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mt-1 leading-tight group-hover:text-[#E5C788] transition">
                    {featuredArticle.title}
                  </h1>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-sans">
                  {featuredArticle.subtitle}
                </p>

                {/* Key Insights Box */}
                <div className="bg-[#14171F] border border-[#232733] rounded-xl p-4 sm:p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C5A059] font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    Key Executive Takeaways
                  </div>
                  <ul className="space-y-2">
                    {featuredArticle.keyInsights.slice(0, 3).map((insight, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-gray-200 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Author & Footer Bar */}
                <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[#1F232E] gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={featuredArticle.author.avatar} 
                      alt={featuredArticle.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#232733]"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">{featuredArticle.author.name}</div>
                      <div className="text-xs text-gray-400">{featuredArticle.author.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" /> {featuredArticle.readTimeMinutes} min read
                    </span>
                    <button
                      onClick={() => onToggleBookmark(featuredArticle.id)}
                      className={`p-2 rounded-lg border transition ${currentUser.savedArticles.includes(featuredArticle.id) ? 'bg-[#C5A059]/15 border-[#C5A059]/40 text-[#C5A059]' : 'bg-[#14171F] border-[#232733] text-gray-300 hover:text-white'}`}
                      title={currentUser.savedArticles.includes(featuredArticle.id) ? 'Saved' : 'Save to My Library'}
                    >
                      {currentUser.savedArticles.includes(featuredArticle.id) ? (
                        <BookmarkCheck className="w-4 h-4" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => onSelectArticle(featuredArticle)}
                      className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4B06A] text-[#0A0B0D] font-bold rounded-lg text-xs shadow-sm transition"
                    >
                      Read Analysis
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Secondary Lead Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F232E]">
              <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold">
                TRENDING DISPATCHES
              </h2>
              <span className="text-xs text-[#C5A059] font-medium">Live Beat</span>
            </div>

            <div className="space-y-4">
              {secondaryArticles.map((article, index) => (
                <div 
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="group bg-[#0F1115] p-5 rounded-xl border border-[#232733] hover:border-[#C5A059]/40 hover:bg-[#14171F] transition cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#C5A059] font-semibold uppercase">{article.beat}</span>
                    {article.accessTier === 'premium' && (
                      <span className="text-[#E5C788] font-bold flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> INSIDER
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-base font-bold text-white group-hover:text-[#C5A059] transition line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2">
                    {article.subtitle}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-[#1F232E]">
                    <span>{article.author.name}</span>
                    <span className="font-mono">{article.readTimeMinutes}m read</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Market Multiples Card */}
            <div className="bg-[#0F1115] text-white p-5 rounded-xl border border-[#232733] space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  THE INSIDER INDEX
                </div>
                <span className="text-[10px] text-gray-500 font-mono">Weekly Multiples</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#14171F] p-3 rounded-lg border border-[#232733]">
                  <div className="text-gray-400 text-[10px]">Top-Quartile SaaS ARR</div>
                  <div className="text-base font-bold text-white font-mono mt-0.5">11.4x</div>
                  <div className="text-[10px] text-[#C5A059] font-semibold">+0.8x MoM</div>
                </div>
                <div className="bg-[#14171F] p-3 rounded-lg border border-[#232733]">
                  <div className="text-gray-400 text-[10px]">Secondary Discount</div>
                  <div className="text-base font-bold text-white font-mono mt-0.5">12.1%</div>
                  <div className="text-[10px] text-[#C5A059] font-semibold">-4.2% tighter</div>
                </div>
              </div>

              <div className="text-[11px] text-gray-400 flex items-center justify-between pt-1">
                <span>Updated every Friday by GVW Data Desk</span>
                <button 
                  onClick={() => onNavigate('subscription')}
                  className="text-[#C5A059] hover:text-[#D4B06A] font-semibold text-xs flex items-center gap-1"
                >
                  Full Index <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized "In Your Beats" Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F1115] border border-[#232733] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A059]"></span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Personalized For You: Followed Beats
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Filtered from your followed topics ({currentUser.followedBeats.length} active beats).
              </p>
            </div>

            <button
              onClick={() => onNavigate('personalization')}
              className="text-xs font-semibold text-[#C5A059] hover:text-[#D4B06A] bg-[#14171F] border border-[#232733] px-3 py-1.5 rounded-lg shadow-sm hover:bg-[#1A1E28] transition"
            >
              Customize My Beats
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {followedArticles.length > 0 ? (
              followedArticles.map(article => (
                <div 
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="bg-[#14171F] rounded-xl border border-[#232733] overflow-hidden hover:border-[#C5A059]/40 hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-16/9 overflow-hidden bg-black">
                    <img 
                      src={article.coverImage} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-103 transition duration-500 opacity-90 hover:opacity-100"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#0A0B0D]/90 backdrop-blur-xs text-[#C5A059] text-[10px] font-mono uppercase font-bold rounded border border-[#C5A059]/20">
                      {article.beat}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-serif text-base font-bold text-white line-clamp-2 leading-snug hover:text-[#C5A059] transition">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-2 mt-1.5">
                        {article.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#1F232E] text-[11px] text-gray-500">
                      <span>{article.author.name}</span>
                      <span className="font-mono">{article.readTimeMinutes} min read</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center bg-[#14171F] rounded-xl border border-dashed border-[#2A2E3C] p-6 space-y-3">
                <p className="text-sm text-gray-400">No followed beats selected yet.</p>
                <button
                  onClick={() => onNavigate('personalization')}
                  className="px-4 py-2 bg-[#C5A059] text-[#0A0B0D] rounded-lg text-xs font-bold hover:bg-[#D4B06A] transition"
                >
                  Pick Your Coverage Beats
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Deep-Dive Intelligence Reports & Dossiers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#1F232E]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold">
              INVESTIGATIVE ARCHIVE
            </span>
            <h2 className="font-serif text-2xl font-bold text-white mt-1">
              Proprietary Market Reports & Deep Dives
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('explore')}
            className="text-xs font-semibold text-[#C5A059] hover:text-[#D4B06A] flex items-center gap-1"
          >
            Browse All Reports <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deepDives.map(article => (
            <div 
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group bg-[#0F1115] rounded-xl border border-[#232733] p-6 hover:border-[#C5A059]/40 hover:shadow-lg transition cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-[#14171F] text-gray-300 border border-[#232733] text-[10px] font-mono uppercase font-bold rounded">
                    {article.format.replace('_', ' ')}
                  </span>
                  {article.accessTier === 'premium' && (
                    <span className="text-[#C5A059] text-xs font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> INSIDER DOSSIER
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#C5A059] transition leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400 line-clamp-3">
                  {article.summary}
                </p>
              </div>

              {article.metrics && (
                <div className="grid grid-cols-3 gap-2 bg-[#14171F] p-3 rounded-lg border border-[#1F232E] text-center">
                  {article.metrics.map((m, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="text-[10px] text-gray-400 truncate">{m.label}</div>
                      <div className="font-mono text-xs font-bold text-white">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-[#1F232E] text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name}
                    className="w-6 h-6 rounded-full object-cover border border-[#232733]"
                  />
                  <span className="font-medium text-gray-300">{article.author.name}</span>
                </div>
                <span className="text-[#C5A059] font-semibold group-hover:underline flex items-center gap-1">
                  Open Dossier <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Subscription Conversion Banner */}
      {currentUser.role !== 'premium' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0F1115] via-[#161922] to-[#1C1810] text-white rounded-2xl p-8 sm:p-12 border border-[#C5A059]/30 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="px-3 py-1 bg-[#C5A059] text-[#0A0B0D] text-xs font-mono font-bold uppercase tracking-wider rounded-md">
                UNLIMITED ACCESS TO THE BEAT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Get Ahead of the Capital Markets with GVW Insider.
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Unlock confidential cap table disclosures, sovereign LP allocations, foundation model inferencing cost teardowns, and private company valuations.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('subscription')}
                  className="bg-[#C5A059] hover:bg-[#D4B06A] text-[#0A0B0D] font-bold px-6 py-3 rounded-xl text-sm shadow-md transition"
                >
                  Start Insider Access ($29/mo)
                </button>
                <button
                  onClick={() => onNavigate('subscription')}
                  className="bg-[#14171F] hover:bg-[#1A1E28] text-gray-200 font-medium px-5 py-3 rounded-xl text-sm border border-[#232733] transition"
                >
                  View Institutional Tiers
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059]" /> Cancel anytime
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059]" /> 14-day risk-free preview
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059]" /> Corporate expense invoice available
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Global Footer & Ecosystem Sitemap */}
      <footer className="border-t border-[#1F232E] bg-[#07080A] text-gray-400 pt-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0F1115] rounded flex items-center justify-center text-white font-serif font-bold text-[#C5A059] text-sm border border-[#232733]">
                  GVW
                </div>
                <span className="font-serif font-bold text-white text-base">GLOBAL VENTURE WATCH</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                The authoritative, beat-driven digital intelligence platform for global venture capital, technology frontiers, and institutional sovereign allocation.
              </p>
              <div className="text-xs text-gray-500 font-mono">
                Bureaus: San Francisco • London • Riyadh • Tokyo • Paris
              </div>
            </div>

            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">Beats</div>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><button onClick={() => onNavigate('explore')} className="hover:text-[#C5A059]">AI & Frontier Systems</button></li>
                <li><button onClick={() => onNavigate('explore')} className="hover:text-[#C5A059]">Global Venture & LPs</button></li>
                <li><button onClick={() => onNavigate('explore')} className="hover:text-[#C5A059]">DeepTech & Defense</button></li>
                <li><button onClick={() => onNavigate('explore')} className="hover:text-[#C5A059]">Clean Infrastructure</button></li>
                <li><button onClick={() => onNavigate('explore')} className="hover:text-[#C5A059]">Secondary Liquidity</button></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">Platform</div>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><button onClick={() => onNavigate('personalization')} className="hover:text-[#C5A059]">My GVW Dashboard</button></li>
                <li><button onClick={() => onNavigate('explore')} className="hover:text-[#C5A059]">The Wire (Live Feeds)</button></li>
                <li><button onClick={() => onNavigate('subscription')} className="hover:text-[#C5A059]">Insider Membership</button></li>
                <li><button onClick={() => onNavigate('account')} className="hover:text-[#C5A059]">Security & Credentials</button></li>
                <li><button onClick={() => onNavigate('states')} className="hover:text-[#C5A059]">UI Edge Cases</button></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">Architecture</div>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><button onClick={() => onNavigate('spec')} className="text-[#C5A059] font-semibold hover:underline">Product Design Spec</button></li>
                <li><button onClick={() => onNavigate('admin')} className="hover:text-[#C5A059]">Admin Editorial CMS</button></li>
                <li><span className="text-gray-500">SOC2 Type II Certified</span></li>
                <li><span className="text-gray-500">Institutional Licensing</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 pb-10 border-t border-[#1A1D26] flex flex-wrap items-center justify-between text-xs text-gray-500 gap-4">
            <div>
              © 2026 Global Venture Watch, Inc. All rights reserved. Strictly confidential intelligence.
            </div>
            <div className="flex items-center gap-6">
              <span className="hover:text-gray-300 cursor-pointer">Editorial Guidelines</span>
              <span className="hover:text-gray-300 cursor-pointer">Privacy Charter</span>
              <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
