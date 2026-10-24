import React, { useState } from 'react';
import { 
  Bookmark, 
  Clock, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  Sliders, 
  UserCheck, 
  BookOpen, 
  BellRing, 
  ArrowRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import { Article, Author, BeatCategory, UserProfile } from '../../types';

interface PersonalizationViewProps {
  currentUser: UserProfile;
  articles: Article[];
  beats: BeatCategory[];
  authors: Author[];
  onSelectArticle: (article: Article) => void;
  onToggleFollowBeat: (beatId: string) => void;
  onToggleFollowAuthor: (authorId: string) => void;
  onToggleBookmark: (articleId: string) => void;
}

export const PersonalizationView: React.FC<PersonalizationViewProps> = ({
  currentUser,
  articles,
  beats,
  authors,
  onSelectArticle,
  onToggleFollowBeat,
  onToggleFollowAuthor,
  onToggleBookmark,
}) => {
  const [activeTab, setActiveTab] = useState<'beats' | 'saved' | 'history' | 'digest'>('beats');

  // Bookmarked articles
  const savedArticleList = articles.filter(a => currentUser.savedArticles.includes(a.id));

  // History articles with progress
  const historyArticles = currentUser.readingHistory.map(hist => {
    const article = articles.find(a => a.id === hist.articleId);
    return {
      ...hist,
      article,
    };
  }).filter(h => h.article !== undefined);

  return (
    <div id="personalization-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#D1D5DB]">
      {/* Header Bar */}
      <div className="border-b border-[#1F232E] pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
          <Sparkles className="w-4 h-4" />
          <span>PERSONALIZATION ENGINE</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
          My GVW Intelligence Center
        </h1>
        <p className="text-gray-300 text-sm max-w-2xl">
          Fine-tune your personal research radar. Your selected coverage beats, followed bureau leads, and saved reading dossiers dynamically reshape your daily experience.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center border-b border-[#1F232E] space-x-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('beats')}
          className={`pb-3 transition relative ${activeTab === 'beats' ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Followed Beats ({currentUser.followedBeats.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 transition relative ${activeTab === 'saved' ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Saved Dossiers ({currentUser.savedArticles.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 transition relative ${activeTab === 'history' ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Reading History ({currentUser.readingHistory.length})
        </button>
        <button
          onClick={() => setActiveTab('digest')}
          className={`pb-3 transition relative ${activeTab === 'digest' ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Digest & Delivery
        </button>
      </div>

      {/* TAB 1: FOLLOWED BEATS & AUTHORS */}
      {activeTab === 'beats' && (
        <div className="space-y-8">
          {/* Beats Selector */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold">
                CORE INTELLIGENCE BEATS
              </h2>
              <span className="text-xs text-gray-400">Click to toggle active coverage</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {beats.map(beat => {
                const isFollowed = currentUser.followedBeats.includes(beat.id);
                return (
                  <div
                    key={beat.id}
                    onClick={() => onToggleFollowBeat(beat.id)}
                    className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${isFollowed ? 'bg-[#0F1115] border-[#C5A059] shadow-md' : 'bg-[#0F1115] border-[#232733] hover:border-[#343A4C]'}`}
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono font-bold text-white uppercase">
                        {beat.name}
                      </div>
                      <div className="text-[11px] text-gray-400 line-clamp-1">
                        {beat.leadEditor} • {beat.articlesCount} reports
                      </div>
                    </div>

                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition shrink-0 ${isFollowed ? 'bg-[#C5A059] text-[#0A0B0D]' : 'bg-[#14171F] text-gray-400'}`}>
                      {isFollowed ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Authors / Bureau Leads */}
          <div className="space-y-4 pt-4 border-t border-[#1F232E]">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold">
              FOLLOW EDITORIAL BUREAU LEADS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {authors.map(author => {
                const isFollowed = currentUser.followedAuthors.includes(author.id);
                return (
                  <div
                    key={author.id}
                    className="p-4 rounded-xl bg-[#0F1115] border border-[#232733] space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <img 
                          src={author.avatar} 
                          alt={author.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#232733]"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{author.name}</div>
                          <div className="text-[10px] text-[#C5A059] font-medium">{author.beat}</div>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-300 line-clamp-2">
                        {author.bio}
                      </p>
                    </div>

                    <button
                      onClick={() => onToggleFollowAuthor(author.id)}
                      className={`w-full py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${isFollowed ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40' : 'bg-[#C5A059] text-[#0A0B0D] hover:bg-[#D4B06A] font-bold'}`}
                    >
                      {isFollowed ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      {isFollowed ? 'Following' : 'Follow'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SAVED DOSSIERS / BOOKMARKS */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold">
              YOUR SAVED READING LIST ({savedArticleList.length})
            </h2>
            <span className="text-xs text-gray-400">Accessible offline on mobile app</span>
          </div>

          {savedArticleList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedArticleList.map(article => (
                <div
                  key={article.id}
                  className="bg-[#0F1115] p-5 rounded-xl border border-[#232733] hover:border-[#343A4C] transition flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2 cursor-pointer" onClick={() => onSelectArticle(article)}>
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#C5A059] font-bold uppercase">{article.beat}</span>
                      <span className="text-gray-500">{article.readTimeMinutes} min read</span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-white hover:text-[#C5A059] transition line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2">
                      {article.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#1F232E] text-xs">
                    <span className="text-gray-400">{article.author.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleBookmark(article.id)}
                        className="p-1 text-gray-400 hover:text-rose-400 transition"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onSelectArticle(article)}
                        className="px-3 py-1 bg-[#C5A059] text-[#0A0B0D] rounded text-xs font-bold hover:bg-[#D4B06A] transition"
                      >
                        Open Dossier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#0F1115] rounded-xl border border-dashed border-[#232733] p-8 space-y-3">
              <Bookmark className="w-8 h-8 text-gray-500 mx-auto" />
              <p className="text-sm font-semibold text-gray-200">No saved dossiers yet</p>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Click the bookmark icon on any analysis, report, or wire dispatch to save it here for later reference.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: READING HISTORY / CONTINUE READING */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold">
            CONTINUE WHERE YOU LEFT OFF
          </h2>

          <div className="space-y-3">
            {historyArticles.map(({ article, progressPercent, lastReadAt }, idx) => {
              if (!article) return null;
              return (
                <div
                  key={idx}
                  onClick={() => onSelectArticle(article)}
                  className="p-4 bg-[#0F1115] rounded-xl border border-[#232733] hover:border-[#343A4C] transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 sm:max-w-xl">
                    <div className="text-[10px] font-mono text-[#C5A059] uppercase font-semibold">
                      {article.beat} • Last read: {lastReadAt}
                    </div>
                    <div className="font-serif text-sm sm:text-base font-bold text-white">
                      {article.title}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-32 space-y-1">
                      <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                        <span>Progress</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-[#14171F] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-[#C5A059] h-1.5 rounded-full"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <button className="text-xs font-semibold text-[#C5A059] hover:underline flex items-center gap-1">
                      Resume <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: DIGEST & DELIVERY CONFIGURATION */}
      {activeTab === 'digest' && (
        <div className="max-w-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-bold text-white">
              Personalized Intelligence Delivery
            </h2>
            <p className="text-xs text-gray-400">
              Control when and how GVW delivers executive intelligence to your inbox and terminal.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#0F1115] rounded-xl border border-[#232733] flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">Morning Executive Wire (07:00 AM)</div>
                <div className="text-xs text-gray-400">5-minute briefing summarizing all overnight venture & sovereign capital movements.</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#C5A059] rounded" />
            </div>

            <div className="p-4 bg-[#0F1115] rounded-xl border border-[#232733] flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">Real-Time Breaking Alerts</div>
                <div className="text-xs text-gray-400">Instant push notifications for critical scoops in your followed beats.</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#C5A059] rounded" />
            </div>

            <div className="p-4 bg-[#0F1115] rounded-xl border border-[#232733] flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">Friday Cap Table & Valuation Index</div>
                <div className="text-xs text-gray-400">Weekly proprietary multiples and secondary market discount report.</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#C5A059] rounded" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
