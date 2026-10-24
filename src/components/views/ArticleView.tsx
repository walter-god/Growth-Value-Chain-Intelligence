import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Heart, 
  Share2, 
  Clock, 
  Lock, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Send, 
  Plus, 
  Check, 
  ChevronRight,
  ZoomIn,
  ZoomOut,
  ShieldAlert
} from 'lucide-react';
import { Article, UserProfile } from '../../types';

interface ArticleViewProps {
  article: Article;
  currentUser: UserProfile;
  onBack: () => void;
  onToggleBookmark: (articleId: string) => void;
  onSelectArticle: (article: Article) => void;
  onUpgradePrompt: () => void;
  onFollowAuthor: (authorId: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  currentUser,
  onBack,
  onToggleBookmark,
  onSelectArticle,
  onUpgradePrompt,
  onFollowAuthor,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [likes, setLikes] = useState(article.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState(article.comments);
  const [newCommentText, setNewCommentText] = useState('');
  const [shareToastVisible, setShareToastVisible] = useState(false);

  // Paywall check
  const isLocked = article.accessTier === 'premium' && currentUser.role !== 'premium' && currentUser.role !== 'admin';
  const isAuthorFollowed = currentUser.followedAuthors.includes(article.author.id);
  const isBookmarked = currentUser.savedArticles.includes(article.id);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareToastVisible(true);
    setTimeout(() => setShareToastVisible(false), 3000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      authorName: currentUser.name || 'Anonymous Investor',
      authorRole: currentUser.title || 'GVW Reader',
      authorAvatar: currentUser.avatar,
      timestamp: 'Just now',
      content: newCommentText.trim(),
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  return (
    <div id="article-reader-view" className="relative pb-24 bg-[#0A0B0D] text-[#D1D5DB]">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#1F232E] z-50">
        <div 
          className="h-full bg-[#C5A059] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Share Toast */}
      {shareToastVisible && (
        <div className="fixed bottom-6 right-6 bg-[#0F1115] text-[#C5A059] text-xs px-4 py-2.5 rounded-lg shadow-xl border border-[#C5A059]/40 z-50 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
          <span>Confidential dossier link copied to clipboard</span>
        </div>
      )}

      {/* Breadcrumb & Navigation Actions */}
      <div className="bg-[#0F1115] border-b border-[#1F232E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dispatches
          </button>

          <div className="flex items-center gap-3">
            {/* Audio Narration Toggle */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border transition ${isPlayingAudio ? 'bg-[#C5A059]/20 text-[#C5A059] border-[#C5A059]/40' : 'bg-[#14171F] text-gray-400 hover:text-white border-[#232733]'}`}
              title="Listen to Executive Audio Briefing"
            >
              {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlayingAudio ? 'Audio Playing (6m)' : 'Audio Briefing'}</span>
            </button>

            {/* Font Size Adjuster */}
            <button
              onClick={() => setIsLargeText(!isLargeText)}
              className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-[#14171F] transition"
              title={isLargeText ? 'Default Font Size' : 'Enlarge Reading Typography'}
            >
              {isLargeText ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-1.5 rounded-md border transition ${isBookmarked ? 'bg-[#C5A059]/20 border-[#C5A059]/40 text-[#C5A059]' : 'border-[#232733] text-gray-400 hover:text-white'}`}
              title={isBookmarked ? 'Saved' : 'Save to My Library'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-md border border-[#232733] text-gray-400 hover:text-white transition"
              title="Share Report"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Article Header & Typography Canvas */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
            <span>{article.beat}</span>
            <span>•</span>
            <span>{article.format.replace('_', ' ')}</span>
            {article.accessTier === 'premium' && (
              <span className="ml-2 px-2 py-0.5 bg-[#1A1D26] text-[#C5A059] border border-[#C5A059]/40 rounded text-[10px] flex items-center gap-1 font-bold">
                <Lock className="w-2.5 h-2.5" /> GVW INSIDER
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl font-sans leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between pt-6 pb-6 border-y border-[#1F232E] gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover border border-[#232733]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{article.author.name}</span>
                  <button
                    onClick={() => onFollowAuthor(article.author.id)}
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded border transition flex items-center gap-1 ${isAuthorFollowed ? 'bg-[#C5A059]/20 text-[#C5A059] border-[#C5A059]/40' : 'bg-[#14171F] text-gray-300 border-[#232733] hover:bg-[#1A1E28]'}`}
                  >
                    {isAuthorFollowed ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    {isAuthorFollowed ? 'Following Author' : 'Follow'}
                  </button>
                </div>
                <div className="text-xs text-gray-400">{article.author.role}</div>
              </div>
            </div>

            <div className="text-xs text-gray-400 font-mono space-y-0.5 text-right">
              <div>Published: {article.publishedAt}</div>
              <div className="flex items-center justify-end gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span>{article.readTimeMinutes} min reading time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden bg-black border border-[#232733] aspect-16/9">
          <img 
            src={article.coverImage} 
            alt={article.title}
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Executive Summary Callout */}
        <div className="bg-[#0F1115] border-l-4 border-[#C5A059] border border-[#232733] rounded-r-xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C5A059] font-bold">
            <Sparkles className="w-4 h-4" />
            Executive Intelligence Summary
          </div>
          <p className="text-gray-200 text-sm sm:text-base font-medium leading-relaxed">
            {article.summary}
          </p>

          <div className="pt-2 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">Key Findings:</div>
            <ul className="space-y-2">
              {article.keyInsights.map((insight, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Metric Data Strip if available */}
        {article.metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0F1115] text-white p-6 rounded-xl border border-[#232733]">
            {article.metrics.map((m, idx) => (
              <div key={idx} className="border-b sm:border-b-0 sm:border-r border-[#1F232E] last:border-0 pb-3 sm:pb-0 sm:pr-4">
                <div className="text-xs text-gray-400">{m.label}</div>
                <div className="font-mono text-2xl font-bold text-[#C5A059] mt-1">{m.value}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{m.sublabel}</div>
              </div>
            ))}
          </div>
        )}

        {/* Article Body Content */}
        <div className={`prose max-w-none space-y-6 ${isLargeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'} text-gray-300 font-serif leading-relaxed`}>
          {/* Always render first paragraph */}
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-white">
            {article.contentParagraphs[0]}
          </p>

          {/* Render second paragraph */}
          {article.contentParagraphs.length > 1 && (
            <p>{article.contentParagraphs[1]}</p>
          )}

          {/* Pull quote */}
          {article.pullQuote && (
            <blockquote className="my-8 py-4 px-6 border-l-4 border-[#C5A059] bg-[#14171F] italic text-white font-serif text-lg sm:text-xl rounded-r-lg border border-[#232733]">
              "{article.pullQuote.quote}"
              <footer className="mt-2 text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider not-italic">
                — {article.pullQuote.attribution}
              </footer>
            </blockquote>
          )}

          {/* If LOCKED by paywall, show teaser blur + conversion paywall card */}
          {isLocked ? (
            <div className="relative pt-6">
              {/* Blurred teaser paragraph */}
              <div className="filter blur-sm select-none opacity-40 space-y-4 pointer-events-none text-gray-400">
                <p>{article.contentParagraphs[2] || 'Confidential liquidity term sheets reveal that major sovereign allocators are introducing 30% downside protection covenants for tech funds exceeding $1B in AUM...'}</p>
                <p>{article.contentParagraphs[3] || 'Furthermore, across 42 private technology enterprises surveyed, secondary share transactions reached an unprecedented equilibrium point with median discounts compressing to 12.1%...'}</p>
              </div>

              {/* Paywall Container */}
              <div className="mt-8 bg-[#0F1115] text-white rounded-2xl p-8 sm:p-10 border border-[#C5A059]/30 shadow-2xl space-y-6 text-center max-w-2xl mx-auto">
                <div className="w-12 h-12 rounded-full bg-[#C5A059]/20 text-[#C5A059] mx-auto flex items-center justify-center border border-[#C5A059]/40">
                  <Lock className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold">
                    GVW INSIDER ACCESS REQUIRED
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Read the Unabridged Investigation
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-lg mx-auto">
                    You've reached the preview limit for this dossier. Unlock the full financial model disclosures, sovereign allocations, and venture cap table teardowns.
                  </p>
                </div>

                <div className="bg-[#14171F] border border-[#232733] rounded-xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="text-gray-400 font-medium">Inside this 14-minute dossier:</div>
                  <div className="flex items-center gap-2 text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Proprietary datacenter compute margin tables (FP4 vs FP8)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Confidential sovereign LP clawback clauses & secondary terms</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Downloadable CSV data workbook for financial modeling</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={onUpgradePrompt}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A059] hover:bg-[#D4B06A] text-[#0A0B0D] font-bold rounded-xl text-sm shadow-lg transition"
                  >
                    Unlock with GVW Insider ($29/mo)
                  </button>
                  <p className="text-xs text-gray-400">
                    14-day money-back guarantee. Instant access on all devices.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Full Unlocked Content for Premium Users
            <div className="space-y-6">
              {article.contentParagraphs.slice(2).map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              {/* Insider Subscriber Data Appendix */}
              <div className="mt-10 p-6 bg-[#14171F] border border-[#C5A059]/30 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C5A059] font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  GVW Insider Verified Data Annex
                </div>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  As an active GVW Insider, you have unmetered clearance to this dossier. The accompanying institutional data workbook (CSV, 4.2 MB) containing 42 enterprise anonymized cap table multiples is available via your My GVW Downloads portal.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Reaction & Discussion Footer */}
        <div className="pt-10 border-t border-[#1F232E] space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${hasLiked ? 'bg-rose-950/40 border-rose-800/60 text-rose-400' : 'bg-[#14171F] border-[#232733] text-gray-400 hover:text-white'}`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current text-rose-500' : ''}`} />
                <span>{likes} Endorsements</span>
              </button>

              <button
                onClick={() => onToggleBookmark(article.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${isBookmarked ? 'bg-[#C5A059]/20 border-[#C5A059]/40 text-[#C5A059]' : 'bg-[#14171F] border-[#232733] text-gray-400 hover:text-white'}`}
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                <span>{isBookmarked ? 'Saved to Library' : 'Save'}</span>
              </button>
            </div>

            <div className="text-xs text-gray-400 font-mono">
              {comments.length} Reader Comments
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-6 pt-4">
            <h3 className="font-serif text-xl font-bold text-white">
              Executive Reader Discussion
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Contribute your perspective or ask the author a question..."
                rows={3}
                className="w-full p-3.5 text-xs sm:text-sm bg-[#0F1115] border border-[#232733] rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4B06A] disabled:opacity-50 text-[#0A0B0D] rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Post Comment
                </button>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-4">
              {comments.map(c => (
                <div key={c.id} className="p-4 bg-[#0F1115] rounded-xl border border-[#232733] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={c.authorAvatar} 
                        alt={c.authorName}
                        className="w-8 h-8 rounded-full object-cover border border-[#232733]"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{c.authorName}</div>
                        <div className="text-[11px] text-gray-400">{c.authorRole}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">{c.timestamp}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pl-10">
                    {c.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
