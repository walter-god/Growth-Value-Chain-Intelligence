import React, { useState } from 'react';
import { 
  Compass, 
  Check, 
  Plus, 
  Clock, 
  Lock, 
  Sparkles, 
  Filter, 
  Users, 
  FileText, 
  Radio, 
  Bookmark, 
  BookmarkCheck,
  ChevronRight
} from 'lucide-react';
import { Article, BeatCategory, ContentFormat, UserProfile } from '../../types';

interface ExploreViewProps {
  articles: Article[];
  beats: BeatCategory[];
  currentUser: UserProfile;
  onSelectArticle: (article: Article) => void;
  onToggleFollowBeat: (beatId: string) => void;
  onToggleBookmark: (articleId: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  articles,
  beats,
  currentUser,
  onSelectArticle,
  onToggleFollowBeat,
  onToggleBookmark,
}) => {
  const [selectedBeatSlug, setSelectedBeatSlug] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  const filteredArticles = articles.filter(article => {
    const matchesBeat = selectedBeatSlug === 'all' || article.beatSlug === selectedBeatSlug;
    const matchesFormat = selectedFormat === 'all' || article.format === selectedFormat;
    return matchesBeat && matchesFormat;
  });

  return (
    <div id="explore-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-[#D1D5DB]">
      {/* Header Banner */}
      <div className="border-b border-[#1F232E] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
          <Compass className="w-4 h-4" />
          <span>BEAT DISCOVERY & ARCHIVE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Explore Specialized Venture Intelligence Beats
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Follow specific editorial desks to receive targeted real-time wire alerts, exclusive deep-dive dossiers, and proprietary LP allocation datasets.
        </p>
      </div>

      {/* Beats Taxonomy Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold">
          EDITORIAL DESKS & COVERAGE DOMAINS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {beats.map(beat => {
            const isFollowed = currentUser.followedBeats.includes(beat.id);
            const isSelected = selectedBeatSlug === beat.slug;

            return (
              <div 
                key={beat.id}
                className={`p-5 rounded-xl border transition flex flex-col justify-between space-y-4 ${isSelected ? 'bg-[#14171F] border-[#C5A059] shadow-sm' : 'bg-[#0F1115] border-[#232733] hover:border-[#C5A059]/40'}`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wide">
                      {beat.name}
                    </span>
                    <button
                      onClick={() => onToggleFollowBeat(beat.id)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition shrink-0 ${isFollowed ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-800/50' : 'bg-[#C5A059] text-[#0A0B0D] font-bold hover:bg-[#D4B06A]'}`}
                    >
                      {isFollowed ? (
                        <>
                          <Check className="w-3 h-3 text-[#C5A059]" /> Following
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" /> Follow Beat
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {beat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1F232E] flex items-center justify-between text-[11px] text-gray-400">
                  <span>Lead: <strong className="text-gray-200">{beat.leadEditor}</strong></span>
                  <button
                    onClick={() => setSelectedBeatSlug(isSelected ? 'all' : beat.slug)}
                    className="text-[#C5A059] hover:underline font-medium"
                  >
                    {isSelected ? 'Viewing Articles' : `${beat.articlesCount} Reports`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter & Browse Section */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1F232E]">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#C5A059]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-300">
              Filter By Format
            </span>
          </div>

          {/* Format Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {[
              { label: 'All Formats', value: 'all' },
              { label: 'Deep Dives', value: 'deep_dive' },
              { label: 'Market Reports', value: 'market_report' },
              { label: 'Executive Interviews', value: 'executive_interview' },
              { label: 'Case Studies', value: 'case_study' },
            ].map(f => (
              <button
                key={f.value}
                onClick={() => setSelectedFormat(f.value)}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${selectedFormat === f.value ? 'bg-[#C5A059] text-[#0A0B0D] font-bold' : 'bg-[#14171F] text-gray-400 hover:bg-[#1A1E28] hover:text-white border border-[#232733]'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Filter Indicator */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div>
            Showing <strong className="text-white">{filteredArticles.length}</strong> reports
            {selectedBeatSlug !== 'all' && (
              <span> in beat <strong className="text-[#C5A059]">{beats.find(b => b.slug === selectedBeatSlug)?.name}</strong></span>
            )}
          </div>
          {(selectedBeatSlug !== 'all' || selectedFormat !== 'all') && (
            <button
              onClick={() => { setSelectedBeatSlug('all'); setSelectedFormat('all'); }}
              className="text-xs text-rose-400 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Filtered Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <div 
              key={article.id}
              className="bg-[#0F1115] rounded-xl border border-[#232733] overflow-hidden hover:border-[#C5A059]/40 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div 
                className="relative aspect-16/9 overflow-hidden bg-black cursor-pointer group"
                onClick={() => onSelectArticle(article)}
              >
                <img 
                  src={article.coverImage} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-[#0A0B0D]/90 backdrop-blur-xs text-[#C5A059] border border-[#C5A059]/20 text-[10px] font-mono font-bold uppercase rounded">
                    {article.beat}
                  </span>
                  {article.accessTier === 'premium' && (
                    <span className="px-1.5 py-0.5 bg-[#1A1D26] text-[#C5A059] border border-[#C5A059]/40 text-[10px] font-bold uppercase rounded flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> INSIDER
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2 cursor-pointer" onClick={() => onSelectArticle(article)}>
                  <h3 className="font-serif text-base font-bold text-white hover:text-[#C5A059] transition line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1F232E] flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <img 
                      src={article.author.avatar} 
                      alt={article.author.name}
                      className="w-5 h-5 rounded-full object-cover border border-[#232733]"
                    />
                    <span className="truncate max-w-[110px] text-gray-300">{article.author.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-gray-500">{article.readTimeMinutes}m</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(article.id);
                      }}
                      className="text-gray-400 hover:text-white p-1"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
