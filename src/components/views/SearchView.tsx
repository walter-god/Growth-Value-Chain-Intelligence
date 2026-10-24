import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Clock, 
  TrendingUp, 
  Filter, 
  Lock, 
  ArrowRight, 
  Sparkles,
  SlidersHorizontal,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { Article, UserProfile } from '../../types';

interface SearchViewProps {
  articles: Article[];
  currentUser: UserProfile;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  onClose?: () => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  articles,
  currentUser,
  onSelectArticle,
  onToggleBookmark,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [selectedBeat, setSelectedBeat] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'relevance' | 'views'>('relevance');

  const recentSearches = ['Hyperscaler CapEx', 'Anthropic Series F', 'Secondary Discounts', 'Sovereign LPs'];
  const trendingTopics = ['Compute Economics', 'DoD Procurement', 'FP4 Quantization', 'Nuclear SMRs', 'EU AI Act'];

  const filteredResults = useMemo(() => {
    return articles.filter(article => {
      const q = query.toLowerCase().trim();
      const matchesQuery = !q || 
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.author.name.toLowerCase().includes(q) ||
        article.tags.some(tag => tag.toLowerCase().includes(q));

      const matchesBeat = selectedBeat === 'all' || article.beatSlug === selectedBeat;
      const matchesTier = selectedTier === 'all' || article.accessTier === selectedTier;

      return matchesQuery && matchesBeat && matchesTier;
    }).sort((a, b) => {
      if (sortBy === 'views') return b.views - a.views;
      return 0; // Default order
    });
  }, [articles, query, selectedBeat, selectedTier, sortBy]);

  return (
    <div id="search-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#D1D5DB]">
      {/* Search Input Bar */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search investigative dossiers, company names, authors, tags, or deals..."
            autoFocus
            className="w-full pl-12 pr-12 py-4 bg-[#0F1115] border-2 border-[#232733] focus:border-[#C5A059] rounded-2xl text-base sm:text-lg text-white placeholder:text-gray-500 shadow-lg focus:outline-none transition"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#C5A059] font-mono uppercase tracking-wider flex items-center gap-1 text-[10px]">
            <TrendingUp className="w-3 h-3 text-[#C5A059]" />
            TRENDING:
          </span>
          {trendingTopics.map((topic, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(topic)}
              className="px-2.5 py-1 bg-[#14171F] hover:bg-[#1F232E] hover:text-[#C5A059] text-gray-300 rounded-md transition border border-[#232733]"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#0F1115] rounded-xl border border-[#232733]">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-gray-300">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter By:</span>
          </div>

          <select
            value={selectedBeat}
            onChange={(e) => setSelectedBeat(e.target.value)}
            className="px-2.5 py-1.5 bg-[#0A0B0D] border border-[#232733] rounded-lg text-white focus:ring-1 focus:ring-[#C5A059] text-xs"
          >
            <option value="all">All Beats</option>
            <option value="ai-frontier">AI & Frontier Systems</option>
            <option value="venture-capital">Global Venture & LPs</option>
            <option value="deeptech-defense">DeepTech & Defense</option>
            <option value="climate-infrastructure">Climate & Infrastructure</option>
            <option value="secondary-markets">Secondary Markets</option>
          </select>

          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-2.5 py-1.5 bg-[#0A0B0D] border border-[#232733] rounded-lg text-white focus:ring-1 focus:ring-[#C5A059] text-xs"
          >
            <option value="all">All Access Tiers</option>
            <option value="free">Free / Public Access</option>
            <option value="premium">GVW Insider Only</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">Sort:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="px-2.5 py-1.5 bg-[#0A0B0D] border border-[#232733] rounded-lg text-white text-xs"
          >
            <option value="relevance">Highest Relevance</option>
            <option value="views">Most Read</option>
            <option value="newest">Most Recent</option>
          </select>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">
          Showing <strong className="text-white">{filteredResults.length}</strong> matching dossiers
        </div>

        {filteredResults.length > 0 ? (
          <div className="space-y-4">
            {filteredResults.map(article => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group p-5 bg-[#0F1115] rounded-xl border border-[#232733] hover:border-[#C5A059]/40 hover:shadow-lg transition cursor-pointer flex flex-col sm:flex-row gap-5 items-start justify-between"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[#C5A059] font-bold uppercase">{article.beat}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">{article.format.replace('_', ' ')}</span>
                    {article.accessTier === 'premium' && (
                      <span className="text-[#C5A059] font-bold flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" /> INSIDER
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#C5A059] transition leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {article.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {article.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] bg-[#14171F] border border-[#232733] text-gray-400 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#1F232E] text-xs text-gray-400">
                  <span className="font-mono">{article.readTimeMinutes}m read</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(article.id);
                    }}
                    className="p-1 text-gray-400 hover:text-white"
                    title={currentUser.savedArticles.includes(article.id) ? 'Saved' : 'Save'}
                  >
                    {currentUser.savedArticles.includes(article.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-[#C5A059]" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 bg-[#0F1115] rounded-2xl border border-[#232733] p-8 space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 bg-[#1F232E] text-[#C5A059] rounded-full mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-white">No Intelligence Found</h3>
              <p className="text-xs text-gray-400">
                We couldn't find any dossiers matching "{query}". Try checking for spelling or searching for broad terms.
              </p>
            </div>

            <div className="pt-2">
              <div className="text-xs font-mono uppercase text-[#C5A059] mb-2">Recommended Searches:</div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Compute Margin', 'Sovereign Wealth', 'Defense Tech', 'Mistral'].map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1 bg-[#14171F] hover:bg-[#1F232E] text-gray-300 hover:text-[#C5A059] text-xs rounded-lg transition border border-[#232733]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
