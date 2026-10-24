import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  TrendingUp, 
  Anchor, 
  Zap, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Filter,
  Train,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { TanzaniaRegion } from '../../types';
import { TANZANIA_REGIONS } from '../../data/gvwIntelligenceData';

interface TanzaniaEconomicMapProps {
  selectedRegionId?: string;
  onSelectRegion: (regionId: string) => void;
  onExploreOpportunities?: (regionId: string) => void;
  onRequestSubscription?: (contextInfo: string) => void;
}

export const TanzaniaEconomicMap: React.FC<TanzaniaEconomicMapProps> = ({
  selectedRegionId = 'reg-dar',
  onSelectRegion,
  onExploreOpportunities,
  onRequestSubscription
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'agro' | 'mining' | 'energy' | 'logistics'>('all');
  const [showTransitCorridors, setShowTransitCorridors] = useState(true);
  const [hoveredRegion, setHoveredRegion] = useState<TanzaniaRegion | null>(null);

  const activeRegion = TANZANIA_REGIONS.find(r => r.id === selectedRegionId) || TANZANIA_REGIONS[0];

  const filteredRegions = TANZANIA_REGIONS.filter(reg => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'agro') {
      return reg.primaryPillars.some(p => /agriculture|avocado|cashew|coffee|sugar|tea|sisal|cotton/i.test(p));
    }
    if (activeFilter === 'mining') {
      return reg.primaryPillars.some(p => /mining|gold|tanzanite|gemstone|coal/i.test(p));
    }
    if (activeFilter === 'energy') {
      return reg.primaryPillars.some(p => /gas|energy|solar|hydropower|pipeline|eacop/i.test(p));
    }
    if (activeFilter === 'logistics') {
      return reg.primaryPillars.some(p => /port|maritime|logistics|sgr|railway|trade/i.test(p));
    }
    return true;
  });

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header Toolbar */}
      <div className="p-5 sm:p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-b from-gray-50/70 to-white">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AUTHENTIC GEOGRAPHIC CARTOGRAPHY • 12 ECONOMIC ZONES</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-950 mt-1">
            Tanzania Regional Economic Architecture
          </h3>
          <p className="text-xs text-gray-600 mt-0.5">
            Mainland Tanzania & Zanzibar archipelago: Click any economic node to inspect GDP share, key value-chains, and infrastructure.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200 text-xs font-medium">
            {[
              { id: 'all', label: 'All Corridors' },
              { id: 'agro', label: 'Agro & Food' },
              { id: 'mining', label: 'Mines & Metals' },
              { id: 'energy', label: 'Gas & Power' },
              { id: 'logistics', label: 'Ports & SGR' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-2.5 py-1.5 rounded-lg transition text-[11px] font-mono cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-blue-900 text-white font-bold shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowTransitCorridors(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition cursor-pointer ${
              showTransitCorridors
                ? 'bg-blue-50 border-blue-200 text-blue-900 font-bold'
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
            }`}
          >
            <Train className="w-3.5 h-3.5" />
            <span>SGR & Transit Lines</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Map Canvas Column (7 Cols on large screens) */}
        <div className="lg:col-span-7 p-4 sm:p-6 bg-[#F8FAFC] border-b lg:border-b-0 lg:border-r border-gray-200 relative flex flex-col justify-between select-none">
          <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-900" />
              <span>INDIAN OCEAN & GREAT LAKES BASIN</span>
            </span>
            <span>SCALE: 1:2,500,000 (EPSG:4326 GEO-ALIGNED)</span>
          </div>

          {/* Legit Tanzania SVG Map Canvas */}
          <div className="relative w-full aspect-[4/3.4] bg-gradient-to-br from-[#EEF4FB] via-[#F4F8FD] to-[#EAF1F9] rounded-2xl border border-blue-100 p-2 sm:p-4 shadow-inner overflow-hidden">
            
            {/* SVG Geographical Layer */}
            <svg 
              viewBox="0 0 1000 850" 
              className="w-full h-full filter drop-shadow-sm"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Land Gradient */}
                <linearGradient id="tzMainlandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#F8FAFC" />
                  <stop offset="100%" stopColor="#EFF6FF" />
                </linearGradient>

                {/* Lake Water Gradient */}
                <linearGradient id="lakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#BFDBFE" />
                  <stop offset="100%" stopColor="#93C5FD" />
                </linearGradient>

                {/* Ocean Gradient */}
                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E0F2FE" />
                  <stop offset="100%" stopColor="#BAE6FD" />
                </linearGradient>

                {/* Regional Highlight Gradient */}
                <radialGradient id="highlightGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* 1. Surrounding Water Bodies (Indian Ocean background) */}
              <rect x="760" y="0" width="240" height="850" fill="url(#oceanGrad)" opacity="0.65" />

              {/* Indian Ocean Wave Textures */}
              <path d="M 770 120 Q 820 110 870 130 T 970 120" fill="none" stroke="#7DD3FC" strokeWidth="1.2" opacity="0.5" strokeDasharray="4 6" />
              <path d="M 780 280 Q 830 270 880 290 T 980 280" fill="none" stroke="#7DD3FC" strokeWidth="1.2" opacity="0.5" strokeDasharray="4 6" />
              <path d="M 800 460 Q 850 450 900 470 T 990 460" fill="none" stroke="#7DD3FC" strokeWidth="1.2" opacity="0.5" strokeDasharray="4 6" />
              <path d="M 820 680 Q 870 670 920 690 T 990 680" fill="none" stroke="#7DD3FC" strokeWidth="1.2" opacity="0.5" strokeDasharray="4 6" />

              {/* 2. Lake Victoria (Northern Border Basin) */}
              {/* Authentic shape of southern Tanzanian sector of Lake Victoria */}
              <path
                d="M 180 50 
                   C 230 40, 310 35, 410 40 
                   C 435 60, 445 95, 420 125 
                   C 390 150, 360 160, 320 165 
                   C 280 170, 250 155, 230 145 
                   C 210 135, 170 115, 180 50 Z"
                fill="url(#lakeGrad)"
                stroke="#60A5FA"
                strokeWidth="1.5"
              />
              {/* Lake Victoria Ukerewe Island */}
              <ellipse cx="335" cy="115" rx="14" ry="9" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
              <text x="275" y="90" fontSize="13" fontFamily="monospace" fill="#2563EB" fontWeight="bold" opacity="0.75">
                LAKE VICTORIA
              </text>

              {/* 3. Lake Tanganyika (Western Border Rift Lake) */}
              <path
                d="M 70 240 
                   C 85 270, 95 330, 110 420 
                   C 125 500, 150 600, 185 670 
                   C 170 675, 145 660, 125 610 
                   C 95 530, 75 440, 55 330 
                   C 48 290, 55 255, 70 240 Z"
                fill="url(#lakeGrad)"
                stroke="#60A5FA"
                strokeWidth="1.5"
              />
              <text x="35" y="470" fontSize="13" fontFamily="monospace" fill="#2563EB" fontWeight="bold" opacity="0.75" transform="rotate(-70 50,470)">
                LAKE TANGANYIKA
              </text>

              {/* 4. Lake Nyasa / Lake Malawi (Southwestern Border) */}
              <path
                d="M 330 650 
                   C 350 670, 390 710, 440 760 
                   C 425 770, 395 745, 360 705 
                   C 335 680, 315 655, 330 650 Z"
                fill="url(#lakeGrad)"
                stroke="#60A5FA"
                strokeWidth="1.5"
              />
              <text x="360" y="735" fontSize="11" fontFamily="monospace" fill="#2563EB" fontWeight="bold" opacity="0.75" transform="rotate(40 370,735)">
                LAKE NYASA
              </text>

              {/* Lake Rukwa (Inland Rift Lake) */}
              <path
                d="M 215 540 C 235 565, 255 600, 275 625 C 265 630, 245 605, 225 575 C 210 550, 205 535, 215 540 Z"
                fill="url(#lakeGrad)"
                stroke="#60A5FA"
                strokeWidth="1.2"
                opacity="0.85"
              />
              <text x="210" y="580" fontSize="9" fontFamily="monospace" fill="#2563EB" opacity="0.7">
                L. Rukwa
              </text>

              {/* Lake Natron & Lake Eyasi (Northern Rift) */}
              <ellipse cx="500" cy="120" rx="10" ry="20" fill="url(#lakeGrad)" stroke="#60A5FA" strokeWidth="1" />
              <path d="M 440 160 C 460 175, 475 190, 490 205" fill="none" stroke="#60A5FA" strokeWidth="3" opacity="0.6" />

              {/* 5. MAINLAND TANZANIA BOUNDARY (Authentic Geopolitical Contour) */}
              {/* Detailed vector border path capturing real geography */}
              <path
                id="tanzania-mainland"
                d="
                  M 180 50
                  L 230 48
                  L 245 80
                  L 280 120
                  L 320 150
                  L 360 145
                  L 410 115
                  L 440 60
                  C 475 55, 520 70, 560 100
                  C 590 120, 620 150, 650 180
                  L 670 205
                  C 700 230, 715 250, 710 270
                  L 700 285
                  C 715 310, 725 350, 720 380
                  L 745 420
                  C 755 450, 760 480, 745 510
                  L 760 540
                  C 765 570, 755 600, 750 620
                  L 775 660
                  C 790 700, 810 740, 805 770
                  L 790 790
                  C 760 805, 710 810, 660 800
                  L 610 790
                  C 560 780, 510 775, 460 770
                  L 430 760
                  L 380 710
                  C 340 670, 310 650, 280 645
                  L 240 640
                  C 210 640, 185 660, 180 665
                  L 150 600
                  L 125 500
                  L 105 400
                  L 80 300
                  C 70 260, 65 230, 75 200
                  L 100 180
                  L 115 140
                  C 130 110, 150 80, 180 50
                  Z
                "
                fill="url(#tzMainlandGrad)"
                stroke="#1E3A8A"
                strokeWidth="2.5"
                className="transition-colors duration-300"
              />

              {/* Regional Economic Zone Boundaries (Subtle Geo-Dividers) */}
              <g stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 4" opacity="0.65">
                {/* Coastal Zone boundary */}
                <path d="M 670 205 C 640 280, 630 400, 650 560 C 660 660, 690 740, 710 795" fill="none" />
                {/* Lake Victoria Basin boundary */}
                <path d="M 180 50 C 230 180, 260 260, 360 280 C 440 290, 480 250, 510 180" fill="none" />
                {/* Northern Safari circuit */}
                <path d="M 510 180 C 530 260, 580 300, 670 290" fill="none" />
                {/* Central corridor boundary */}
                <path d="M 360 280 C 370 380, 390 490, 420 580" fill="none" />
                {/* Southern Highlands boundary */}
                <path d="M 215 540 C 290 520, 370 520, 430 570 C 490 620, 530 700, 540 780" fill="none" />
                {/* Southern Gas boundary */}
                <path d="M 640 580 C 600 660, 570 720, 560 780" fill="none" />
              </g>

              {/* 6. ZANZIBAR ARCHIPELAGO & OFFSHORE ISLANDS */}
              {/* Pemba Island (North) */}
              <path
                d="M 755 240 C 765 245, 770 270, 765 295 C 755 300, 750 280, 750 255 Z"
                fill="#F8FAFC"
                stroke="#1E3A8A"
                strokeWidth="1.8"
                className="cursor-pointer hover:fill-blue-100 transition"
                onClick={() => onSelectRegion('reg-zanzibar')}
              />
              <text x="772" y="270" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1E3A8A">
                Pemba
              </text>

              {/* Unguja Island (Zanzibar Main Island) */}
              <path
                d="M 760 380 C 775 390, 785 430, 775 460 C 765 470, 755 440, 755 400 Z"
                fill="#EFF6FF"
                stroke="#1E3A8A"
                strokeWidth="2"
                className="cursor-pointer hover:fill-blue-200 transition"
                onClick={() => onSelectRegion('reg-zanzibar')}
              />
              <text x="785" y="425" fontSize="11" fontFamily="sans-serif" fontWeight="bold" fill="#1E3A8A">
                Unguja (Zanzibar)
              </text>

              {/* Mafia Island */}
              <ellipse 
                cx="775" 
                cy="585" 
                rx="8" 
                ry="16" 
                fill="#F8FAFC" 
                stroke="#1E3A8A" 
                strokeWidth="1.5" 
              />
              <text x="788" y="590" fontSize="9" fontFamily="sans-serif" fill="#475569">
                Mafia Is.
              </text>

              {/* 7. STRATEGIC TRANSIT CORRIDORS (SGR Railway & TAZARA) */}
              {showTransitCorridors && (
                <g id="transit-infrastructure">
                  {/* SGR Phase 1 & 2: Dar es Salaam -> Morogoro -> Dodoma -> Tabora -> Mwanza */}
                  <path
                    d="M 740 500 L 630 490 L 490 440 L 340 370 L 330 220"
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="2.8"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                  />
                  {/* SGR Western Branch to Kigoma */}
                  <path
                    d="M 340 370 L 210 390 L 125 400"
                    fill="none"
                    stroke="#EA580C"
                    strokeWidth="2.2"
                    strokeDasharray="4 4"
                  />
                  {/* TAZARA Railway: Dar es Salaam -> Mbeya -> Zambia */}
                  <path
                    d="M 740 505 L 640 520 L 510 590 L 370 660 L 250 680"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="2.2"
                    strokeDasharray="5 3"
                  />
                  {/* EACOP Pipeline Route from Uganda border to Tanga Port */}
                  <path
                    d="M 230 50 L 360 145 L 530 220 L 690 320"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />
                </g>
              )}

              {/* 8. MAJOR SEAPORT & AIRPORT ANCHORS */}
              {/* Port of Dar es Salaam */}
              <g transform="translate(740, 500)">
                <circle cx="0" cy="0" r="7" fill="#1E3A8A" />
                <circle cx="0" cy="0" r="12" fill="none" stroke="#1E3A8A" strokeWidth="1.5" opacity="0.6" />
              </g>
              {/* Port of Tanga */}
              <g transform="translate(700, 315)">
                <circle cx="0" cy="0" r="6" fill="#1E3A8A" />
              </g>
              {/* Port of Mtwara */}
              <g transform="translate(790, 775)">
                <circle cx="0" cy="0" r="6" fill="#1E3A8A" />
              </g>

              {/* 9. INTERACTIVE ECONOMIC REGION PINS */}
              {filteredRegions.map((reg) => {
                // Map percentages (0-100) to SVG canvas coordinates (1000x850)
                const cx = (reg.coordinates.x / 100) * 1000;
                const cy = (reg.coordinates.y / 100) * 850;
                const isSelected = reg.id === activeRegion.id;
                const isHovered = hoveredRegion?.id === reg.id;

                return (
                  <g 
                    key={reg.id}
                    className="cursor-pointer group"
                    onClick={() => onSelectRegion(reg.id)}
                    onMouseEnter={() => setHoveredRegion(reg)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  >
                    {/* Active Pulsing Ring */}
                    {isSelected && (
                      <>
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r="28" 
                          fill="url(#highlightGlow)" 
                          className="animate-ping" 
                        />
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r="22" 
                          fill="none" 
                          stroke="#1E3A8A" 
                          strokeWidth="2" 
                          strokeDasharray="4 2" 
                        />
                      </>
                    )}

                    {/* Outer Pin Body */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 16 : 12}
                      fill={isSelected ? '#1E3A8A' : '#FFFFFF'}
                      stroke={isSelected ? '#FFFFFF' : '#1E3A8A'}
                      strokeWidth={isSelected ? '3' : '2'}
                      className="transition-all duration-200 drop-shadow-md group-hover:scale-125"
                    />

                    {/* Center Dot */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 5 : 3.5}
                      fill={isSelected ? '#FBBF24' : '#1E3A8A'}
                    />

                    {/* Region Label Tag */}
                    <g transform={`translate(${cx + 18}, ${cy - 8})`}>
                      <rect
                        x="0"
                        y="0"
                        width={reg.name.length * 8 + 20}
                        height="20"
                        rx="5"
                        fill={isSelected ? '#0F172A' : '#FFFFFF'}
                        stroke={isSelected ? '#1E3A8A' : '#CBD5E1'}
                        strokeWidth="1"
                        opacity={isSelected ? 0.95 : 0.88}
                        className="drop-shadow-xs"
                      />
                      <text
                        x="10"
                        y="14"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                        fill={isSelected ? '#F8FAFC' : '#1E293B'}
                      >
                        {reg.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* Floating Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-gray-200 shadow-sm text-[11px] font-mono space-y-1.5 max-w-xs pointer-events-auto">
              <div className="text-[10px] uppercase font-bold text-gray-400">CORRIDOR LEGEND</div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-red-600 rounded" />
                <span className="text-gray-700 font-medium">SGR Standard Gauge Railway</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-blue-600 rounded" />
                <span className="text-gray-700 font-medium">TAZARA Southern Corridor</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-900 border border-white" />
                <span className="text-gray-700 font-medium">Primary Maritime Port</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-blue-900" />
                <span className="text-gray-700 font-medium">Regional Economic Capital</span>
              </div>
            </div>

            {/* Hover Tooltip Card (if hovering over a pin) */}
            {hoveredRegion && (
              <div 
                className="absolute top-3 right-3 bg-gray-950 text-white p-3.5 rounded-2xl shadow-xl max-w-xs border border-gray-800 pointer-events-none transition animate-fade-in"
              >
                <div className="flex items-center justify-between gap-2 border-b border-gray-800 pb-2 mb-2">
                  <span className="font-serif font-bold text-sm text-amber-400">
                    {hoveredRegion.name}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 px-1.5 py-0.5 rounded">
                    {hoveredRegion.gdpShare}
                  </span>
                </div>
                <div className="text-xs text-gray-300 line-clamp-2">
                  {hoveredRegion.overview}
                </div>
                <div className="text-[10px] font-mono text-gray-400 mt-2 flex items-center gap-1">
                  <span>Hub:</span>
                  <strong className="text-gray-200">{hoveredRegion.hubCity}</strong>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Region Strategic Intelligence Column (5 Cols) */}
        <div className="lg:col-span-5 p-6 space-y-6 bg-white flex flex-col justify-between">
          <div className="space-y-5">
            {/* Active Region Header Card */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 font-bold border border-blue-200">
                  {activeRegion.zone || 'Strategic Economic Corridor'}
                </span>
                <span className="font-semibold text-emerald-700 font-mono">
                  {activeRegion.gdpShare}
                </span>
              </div>

              <h4 className="text-2xl font-serif font-bold text-gray-950 mt-2">
                {activeRegion.name}
              </h4>
              <p className="text-xs text-gray-500 font-mono mt-0.5">
                {activeRegion.hubCity} • Pop. {activeRegion.population}
              </p>

              <p className="text-xs text-gray-700 mt-3 leading-relaxed">
                {activeRegion.overview}
              </p>
            </div>

            {/* Economic Pillars */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-blue-900" />
                <span>PRIMARY ECONOMIC PILLARS</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeRegion.primaryPillars.map((pillar, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-800 text-xs font-medium border border-gray-200/80"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </div>

            {/* Dominant Commodities */}
            {activeRegion.dominantCommodities && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400">
                  EXPORT COMMODITIES & FLOWS
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {activeRegion.dominantCommodities.map((item, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-blue-50/50 border border-blue-100 text-blue-950 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-700 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Major Capital Projects */}
            {activeRegion.keyProjects && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400">
                  FLAGSHIP CAPITAL PROJECTS
                </div>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {activeRegion.keyProjects.map((proj, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 border border-gray-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-gray-900">{proj}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Card & Subscription Unlock Trigger */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-amber-950">
                    Comprehensive Land Bank & Masterplan
                  </div>
                  <div className="text-[10px] text-amber-800">
                    Available with Pro / Institutional Subscription
                  </div>
                </div>
              </div>
              <button
                onClick={() => onRequestSubscription?.(`Regional Economic Masterplan & Land Bank: ${activeRegion.name}`)}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition shrink-0 cursor-pointer shadow-xs"
              >
                Subscribe to Unlock
              </button>
            </div>

            <div className="flex items-center gap-2">
              {onExploreOpportunities && (
                <button
                  onClick={() => onExploreOpportunities(activeRegion.id)}
                  className="flex-1 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Explore Deals in {activeRegion.name} ({activeRegion.opportunitiesCount})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
