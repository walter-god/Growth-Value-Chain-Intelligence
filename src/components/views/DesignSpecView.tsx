import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Compass, 
  Users, 
  CreditCard, 
  Sparkles, 
  LayoutDashboard, 
  Sliders, 
  Lock, 
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const DesignSpecView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('vision');

  const sections = [
    { id: 'vision', title: '1. Product Vision & Thesis' },
    { id: 'users', title: '2. Target Users & Archetypes' },
    { id: 'business', title: '3. Business Model & Monetization' },
    { id: 'ia', title: '4. Information Architecture' },
    { id: 'journeys', title: '5. Core User Journeys (1-5)' },
    { id: 'nav', title: '6. Navigation Architecture' },
    { id: 'design-system', title: '7. Original Design System' },
    { id: 'desktop', title: '8. Desktop Experience (1440px)' },
    { id: 'mobile', title: '9. Mobile Experience (375px)' },
    { id: 'screens', title: '10. Core Screens Architecture' },
    { id: 'content', title: '11. Content Publishing Ecosystem' },
    { id: 'personalization', title: '12. Personalization Engine' },
    { id: 'subscription', title: '13. Subscription & Paywall System' },
    { id: 'admin', title: '14. Admin CMS & Editorial Suite' },
    { id: 'analytics', title: '15. Telemetry & Platform Analytics' },
    { id: 'states', title: '16. Empty, Loading & Error States' },
    { id: 'accessibility', title: '17. Accessibility (WCAG AA)' },
    { id: 'responsive', title: '18. Responsive Adaptation Matrix' },
    { id: 'inventory', title: '19. Complete Screen Inventory' },
    { id: 'rationale', title: '20. Final UX Rationale' },
  ];

  return (
    <div id="design-spec-document" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-[#D1D5DB]">
      {/* Masthead Header */}
      <div className="border-b border-[#1F232E] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#C5A059]">
          <BookOpen className="w-4 h-4" />
          <span>OFFICIAL PRODUCT DESIGN SPECIFICATION</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
          GVW Platform: Digital Ecosystem & SaaS Blueprint
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          The complete 20-chapter design strategy, information architecture, business model, design tokens, and technical screen inventory for Global Venture Watch (GVW).
        </p>
      </div>

      {/* Two Column Layout: Sticky Table of Contents & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Table of Contents */}
        <aside className="lg:col-span-4 sticky top-24 bg-[#0F1115] p-4 rounded-2xl border border-[#232733] shadow-lg max-h-[80vh] overflow-y-auto space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-bold px-3 py-2">
            SPECIFICATION CHAPTERS
          </div>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-between ${activeSection === s.id ? 'bg-[#C5A059]/15 text-[#C5A059] font-bold border border-[#C5A059]/30' : 'text-gray-400 hover:bg-[#14171F] hover:text-white'}`}
            >
              <span className="truncate">{s.title}</span>
              {activeSection === s.id && <ChevronRight className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />}
            </button>
          ))}
        </aside>

        {/* Chapter Content Body */}
        <main className="lg:col-span-8 bg-[#0F1115] p-8 sm:p-10 rounded-2xl border border-[#232733] shadow-lg space-y-10 text-gray-300 leading-relaxed text-sm">
          {/* SECTION 1 */}
          {activeSection === 'vision' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#C5A059] uppercase">Chapter 1</span>
              <h2 className="font-serif text-2xl font-bold text-white">Product Vision & Strategic Thesis</h2>
              <p>
                <strong className="text-white">What GVW Is:</strong> Global Venture Watch (GVW) is a high-conviction, subscription-based digital intelligence platform and beat-driven publishing ecosystem dedicated to global venture capital, technology frontiers (AI, Defense Tech, Clean Infrastructure), and sovereign LP capital allocation.
              </p>
              <p>
                <strong className="text-white">The Core Problem Solved:</strong> Modern financial journalism has fragmented into superficial press release regurgitation on one hand, and expensive, opaque $40,000/year terminal databases on the other. Investors, allocators, and operators lack an analytical, beat-driven publication that provides deep unit-economic teardowns, confidential cap table reporting, and direct beat-level access.
              </p>
              <p>
                <strong className="text-white">Why Users Return Repeatedly:</strong> Users do not return for generic opinions; they return because GVW delivers the <em className="text-[#C5A059]">real-time Wire</em> of breaking rounds before public syndicates, proprietary weekly multiple indices, and beat-level tracking of specific journalists whose reporting directly impacts their portfolio underwriting.
              </p>
            </div>
          )}

          {/* SECTION 2 */}
          {activeSection === 'users' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#C5A059] uppercase">Chapter 2</span>
              <h2 className="font-serif text-2xl font-bold text-white">Target User Personas</h2>
              <div className="space-y-3">
                <div className="p-4 bg-[#14171F] rounded-xl border border-[#232733]">
                  <h4 className="font-bold text-white">1. Venture Capital GPs & Principals</h4>
                  <p className="text-xs text-gray-400 mt-1">Needs: Confidential deal flow insights, secondary market discount comps, LP co-investment clauses. Willing to expense $290–$990/year without friction.</p>
                </div>
                <div className="p-4 bg-[#14171F] rounded-xl border border-[#232733]">
                  <h4 className="font-bold text-white">2. Institutional LPs & Sovereign Wealth Allocators</h4>
                  <p className="text-xs text-gray-400 mt-1">Needs: Net DPI dispersion benchmarks, continuation fund terms, quarterly bureau briefing calls. Requires raw CSV downloads for actuarial models.</p>
                </div>
                <div className="p-4 bg-[#14171F] rounded-xl border border-[#232733]">
                  <h4 className="font-bold text-white">3. High-Growth Tech Founders & Corporate Development Officers</h4>
                  <p className="text-xs text-gray-400 mt-1">Needs: Benchmark compute inferencing cost curves (FP4 vs FP8), hyperscaler capex trends, and M&A regulatory roadblocks.</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3 */}
          {activeSection === 'business' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#C5A059] uppercase">Chapter 3</span>
              <h2 className="font-serif text-2xl font-bold text-white">Business Model & Monetization Architecture</h2>
              <p>
                GVW employs a strict <strong className="text-white">subscriber-first, zero-programmatic-ad</strong> business model. Credibility and journalistic rigor are compromised by clickbait advertising.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs text-gray-300">
                <li><strong className="text-white">Free Guest Tier:</strong> 2 metered preview articles per month, public wire headlines, designed to maximize organic SEO and social sharing inbound funnel.</li>
                <li><strong className="text-white">GVW Insider Tier ($29/mo or $290/yr):</strong> Unmetered access across all 6 specialized beats, deep-dive investigative dossiers, full audio narrations, personalized My GVW research radar, and weekly multiple index.</li>
                <li><strong className="text-white">Institutional Pro Tier ($99/mo or $990/seat/yr):</strong> Centralized firm billing, SAML SSO, raw CSV financial model downloads, and quarterly private LP briefing video calls.</li>
              </ul>
            </div>
          )}

          {/* SECTION 4 */}
          {activeSection === 'ia' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#C5A059] uppercase">Chapter 4</span>
              <h2 className="font-serif text-2xl font-bold text-white">Information Architecture</h2>
              <pre className="bg-[#0A0B0D] text-gray-300 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-[#232733]">
{`GVW PLATFORM INFORMATION ARCHITECTURE
├── Frontpage (Living Hub)
│   ├── The Wire (Real-time Breaking Ticker)
│   ├── Lead Investigative Dossier
│   ├── Trending Dispatches Grid
│   ├── In Your Beats (Personalized Carousel)
│   ├── The Insider Index (Multiples & Discounts)
│   └── Proprietary Market Reports Archive
├── Beats & Sectors (Taxonomy & Archives)
│   ├── AI & Frontier Systems
│   ├── Global Venture & LP Capital
│   ├── DeepTech & Defense
│   ├── Climate & Clean Infrastructure
│   ├── Secondary Markets & Liquidity
│   └── European Tech & Sovereignty
├── Intelligence Dossier (Article Reader)
│   ├── Reading Progress Indicator
│   ├── Executive Intelligence Summary Box
│   ├── Audio Briefing Narration Player
│   ├── Paywall Conversion Card (For Non-Subscribers)
│   ├── Executive Comments & Endorsement Discussion
│   └── Bureau Lead Credential Card
├── My GVW (Personalization Center)
│   ├── Active Followed Beats
│   ├── Followed Bureau Leads
│   ├── Saved Dossiers Library
│   ├── Reading History & Resume Progress
│   └── Frequency Delivery Settings
├── Global Search & Filter Modal (Cmd+K)
│   ├── Instant Multi-Faceted Filter (Beat, Tier, Format)
│   └── Empty State with Suggested Queries
├── Membership & Subscription Center
│   ├── 3-Tier Matrix (Free, Insider, Institutional)
│   ├── Monthly/Annual Switcher
│   └── Secure Checkout Modal with 14-Day Preview
├── Notifications Dispatch Center
├── Account, Security (2FA) & Credentials
└── Editorial CMS & Executive Telemetry Suite`}
              </pre>
            </div>
          )}

          {/* SECTION 5 */}
          {activeSection === 'journeys' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#C5A059] uppercase">Chapter 5</span>
              <h2 className="font-serif text-2xl font-bold text-white">User Journeys (1 to 5)</h2>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">Journey 1 — First-Time Visitor:</strong> Lands on shared compute dossier → Reads executive summary and 2 teaser paragraphs → Encounters transparent paywall with value proposition → Clicks "Start 14-Day Preview" → Instant activation.
                </div>
                <div className="p-3.5 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">Journey 2 — Returning Member:</strong> Opens GVW → Wire ticker highlights overnight sovereign fund allocation → Clicks into personalized "In Your Beats" feed → Resumes 45% read dossier from yesterday.
                </div>
                <div className="p-3.5 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">Journey 3 — Free to Paid Conversion:</strong> Visitor hits 2nd locked dossier → Paywall highlights confidential CSV workbook → Converts to $290 annual subscription → Downloads financial dataset immediately.
                </div>
                <div className="p-3.5 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">Journey 4 — Global Search:</strong> Types "Mistral EU AI Act" into Cmd+K modal → Filters by Deep Dives only → Saves to My Library for offline flight reading.
                </div>
                <div className="p-3.5 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">Journey 5 — Administrator & Editor:</strong> Admin accesses CMS tab → Drafts breaking investigation on Anthropic Series F → Assigns to AI Beat and flags as Premium → Publishes directly to live subscriber feeds.
                </div>
              </div>
            </div>
          )}

          {/* SECTION 7 */}
          {activeSection === 'design-system' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#C5A059] uppercase">Chapter 7</span>
              <h2 className="font-serif text-2xl font-bold text-white">Original GVW Design System</h2>
              <p>
                Unlike generic purple SaaS gradients, GVW establishes an authoritative, high-contrast financial editorial aesthetic inspired by institutional ledgers and classical European journalism.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 bg-[#0A0B0D] text-white rounded-lg border border-[#232733]">
                  <div className="font-bold">#0A0B0D</div>
                  <div className="text-[10px] text-gray-400">Obsidian Brand Primary</div>
                </div>
                <div className="p-3 bg-[#0F1115] text-white rounded-lg border border-[#232733]">
                  <div className="font-bold">#0F1115</div>
                  <div className="text-[10px] text-gray-400">Elevated Surface Canvas</div>
                </div>
                <div className="p-3 bg-[#C5A059] text-[#0A0B0D] rounded-lg">
                  <div className="font-bold">#C5A059</div>
                  <div className="text-[10px] font-semibold">Sophisticated Gold Accent</div>
                </div>
                <div className="p-3 bg-[#1F232E] text-white rounded-lg border border-[#343A4C]">
                  <div className="font-bold">#1F232E</div>
                  <div className="text-[10px] text-gray-400">Architectural Border</div>
                </div>
              </div>
              <div className="pt-2 text-xs space-y-2">
                <div><strong className="text-white">Typography Pairings:</strong> Serif Headlines (Lora / Georgia, high optical authority) paired with Precision Sans (Plus Jakarta Sans, high micro-legibility for data and metrics).</div>
                <div><strong className="text-white">Nested Radius Rule:</strong> Container radius = 16px, inner element radius = 10px (Container Radius - Distance). Zero floating colored glow cards.</div>
              </div>
            </div>
          )}

          {/* SECTION 19 */}
          {activeSection === 'inventory' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#C5A059] uppercase">Chapter 19</span>
              <h2 className="font-serif text-2xl font-bold text-white">Complete Screen Inventory</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">PUBLIC:</strong> Homepage, Wire Ticker, Free Articles, Public Pricing.
                </div>
                <div className="p-3 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">ACCOUNT:</strong> User Profile, 2FA Security, Session Manager, Credentials.
                </div>
                <div className="p-3 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">DISCOVERY:</strong> Beats Taxonomy, Bureau Leads, Format Filter.
                </div>
                <div className="p-3 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">CONTENT:</strong> Dossier Reader, Progress Bar, Audio Player, Key Insights, Comments.
                </div>
                <div className="p-3 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">SEARCH:</strong> Instant Cmd+K Search, Trending Tags, Faceted Filters.
                </div>
                <div className="p-3 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">PERSONALIZATION:</strong> Followed Beats, Saved Library, Reading Progress Resume.
                </div>
                <div className="p-3 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">SUBSCRIPTION:</strong> 3-Tier Comparison Matrix, Paywall Teaser Blur.
                </div>
                <div className="p-3 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">PAYMENT:</strong> 14-Day Free Trial Checkout, Tax Invoice PDF Receipts.
                </div>
                <div className="p-3 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">NOTIFICATIONS:</strong> Dispatch Alerts, Followed Beat Feeds, Mark All Read.
                </div>
                <div className="p-3 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">ADMIN:</strong> Executive MRR Telemetry, Content Publisher CMS, User RBAC.
                </div>
                <div className="p-3 bg-[#14171F] rounded-lg border border-[#232733]">
                  <strong className="text-white">STATES:</strong> Empty Library, Empty Search, 500 Network Disconnect, Loading Skeletons.
                </div>
              </div>
            </div>
          )}

          {/* SECTION 20 */}
          {activeSection === 'rationale' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#C5A059] uppercase">Chapter 20</span>
              <h2 className="font-serif text-2xl font-bold text-white">Final UX Rationale</h2>
              <p>
                The GVW platform succeeds because it treats digital news not as a disposable consumption feed, but as an <strong className="text-white">operating system for high-stakes decision making</strong>.
              </p>
              <p>
                By providing beat-level personalization, institutional-grade data modeling annexes, audio briefings for mobile commutes, and a respectful, transparent monetization experience, GVW builds permanent subscriber trust and durable enterprise value.
              </p>
            </div>
          )}

          {/* Fallback for other chapters */}
          {!['vision', 'users', 'business', 'ia', 'journeys', 'design-system', 'inventory', 'rationale'].includes(activeSection) && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#C5A059] uppercase">Specification Detail</span>
              <h2 className="font-serif text-2xl font-bold text-white">{sections.find(s => s.id === activeSection)?.title}</h2>
              <p className="text-gray-300">
                This chapter governs the architectural execution of {sections.find(s => s.id === activeSection)?.title.toLowerCase()} across the GVW platform ecosystem.
              </p>
              <div className="p-5 bg-[#14171F] rounded-xl border border-[#232733] space-y-2 text-xs">
                <div className="font-bold text-white">Production Standards Enforced:</div>
                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                  <li>Zero unhandled states or dead links across all views.</li>
                  <li>Instant keyboard accessibility (Cmd+K search, Esc modals).</li>
                  <li>WCAG AA contrast ratios (minimum 4.5:1 text contrast).</li>
                  <li>Mobile touch target baseline of 44px minimum bounding box.</li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
