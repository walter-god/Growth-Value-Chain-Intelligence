export type UserRole = 'visitor' | 'registered' | 'pro' | 'admin';

export type ActiveLayer = 'public' | 'platform';

export type PlatformTab = 
  | 'dashboard'
  | 'economy'
  | 'value-chains'
  | 'companies'
  | 'investment'
  | 'wealth'
  | 'reports'
  | 'data'
  | 'about'
  | 'contact';

export interface MacroIndicator {
  id: string;
  name: string;
  code: string;
  category: 'Macro' | 'Monetary' | 'Fiscal' | 'External' | 'Demographics';
  value: string;
  numericValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changeStr: string;
  period: string;
  source: string;
  historical: { period: string; value: number }[];
  forecast2026?: string;
  description: string;
}

export interface ValueChainNode {
  id: string;
  stageName: string;
  order: number;
  roleDescription: string;
  majorPlayers: string[];
  benchmarkPrice: string;
  averageMargin: string;
  processingCapacity?: string;
  geographicHotspots: string[];
  bottlenecks: string[];
  investmentOpportunity: string;
}

export interface ValueChain {
  id: string;
  slug: string;
  name: string;
  sector: 'Agriculture' | 'Mining' | 'Energy' | 'Industry' | 'Services';
  subSector: string;
  tagline: string;
  annualProduction: string;
  marketValueUsd: string;
  exportValueUsd: string;
  employmentEstimated: string;
  keyRegions: string[];
  topDestinations: { market: string; share: string }[];
  nodes: ValueChainNode[];
  summary: string;
  strategicOutlook: string;
}

export interface CompanyRecord {
  id: string;
  name: string;
  sector: string;
  subSector: string;
  location: string;
  region: string;
  revenueBracket: string;
  employees: string;
  ownership: 'Private' | 'Public (DSE)' | 'State-Owned / Parastatal' | 'Joint Venture / FDI';
  status: 'Active' | 'Expanding' | 'Restructuring' | 'Seeking Capital';
  yearFounded: number;
  description: string;
  keyProductsOrAssets: string[];
  valueChainRole: string;
  verifiedData: boolean;
}

export interface InvestmentOpportunity {
  id: string;
  title: string;
  sector: 'Agriculture' | 'Mining' | 'Energy' | 'Manufacturing' | 'Logistics' | 'Tourism';
  industry: string;
  companyOrSponsor: string;
  project: string;
  location: string;
  region: string;
  mapCoords: { x: number; y: number }; // Percentage on map canvas
  capitalRequired: string;
  capitalAmountUsd: number;
  expectedReturn: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  projectStage: 'Feasibility' | 'Shovel-Ready' | 'Expansion' | 'Operational Scaling';
  incentivesAvailable: string;
  summary: string;
  keyMilestones: string[];
}

export interface WealthMetric {
  id: string;
  title: string;
  category: 'Capital Formation' | 'High-Growth Business' | 'Private Capital & LPs' | 'Equities (DSE)' | 'Real Estate Corridors' | 'Value-Chain Wealth';
  primaryValue: string;
  metricLabel: string;
  growthYearOnYear: string;
  geographicFocus: string;
  description: string;
  keyEntitiesOrDrivers: string[];
}

export interface ResearchReport {
  id: string;
  slug: string;
  title: string;
  series: 'Tanzania Economic Outlook' | 'Value-Chain Monitor' | 'Sector Intelligence' | 'Wealth & Capital' | 'Special Brief';
  publishedDate: string;
  readTime: string;
  pages: number;
  featured: boolean;
  abstract: string;
  keyFindings: string[];
  dataPointsCount: number;
  tableOfContents: string[];
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

export interface TanzaniaRegion {
  id: string;
  name: string;
  hubCity: string;
  coordinates: { x: number; y: number };
  gdpShare: string;
  population: string;
  primaryPillars: string[];
  opportunitiesCount: number;
  overview: string;
  zone?: string;
  keyProjects?: string[];
  infrastructure?: string[];
  dominantCommodities?: string[];
}

export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'enterprise';

export type PaymentGatewayType = 
  | 'paypal' 
  | 'mobile_networks' 
  | 'tz_banks' 
  | 'stripe' 
  | 'crypto' 
  | 'wire_transfer';

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  priceUsd: number;
  priceTzs: number;
  interval: 'month' | 'year';
  tagline: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export interface PaymentReceipt {
  transactionId: string;
  date: string;
  amountUsd: number;
  amountTzs: number;
  planName: string;
  gateway: PaymentGatewayType;
  providerDetails: string;
  status: 'Completed' | 'Pending' | 'Active';
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  organization: string;
  title: string;
  role: UserRole;
  avatar: string;
  followedChains?: string[];
  savedReports?: string[];
  savedOpportunities?: string[];
  accessExpires?: string;
  // Backwards compatibility for legacy views
  followedBeats?: string[];
  followedAuthors?: string[];
  savedArticles?: string[];
  readingHistory?: { articleId: string; progressPercent: number; lastReadAt: string }[];
  subscription?: {
    tier: string;
    status: string;
    cycle: string;
    renewalDate: string;
    amount: number;
  };
  notificationsCount?: number;
}

// Legacy editorial magazine types for backward compatibility
export type ContentFormat = string;

export interface Author {
  id: string;
  name: string;
  title?: string;
  bureau?: string;
  avatar: string;
  bio: string;
  followersCount: number;
  role?: string;
  beat?: string;
  articlesCount?: number;
}

export interface BeatCategory {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  color?: string;
  subscriberCount?: number;
  subscribersCount?: number;
  accentColor?: string;
  iconName?: string;
  leadEditor?: any;
  articlesCount?: number;
}

export interface WireDispatch {
  id: string;
  timestamp: string;
  headline: string;
  beat: string;
  significance?: 'high' | 'medium' | 'low';
  timeAgo?: string;
  source?: string;
  impactLevel?: string;
}

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  articleId?: string;
  timeAgo?: string;
}

export interface ArticleComment {
  id: string;
  userName?: string;
  authorName?: string;
  userAvatar?: string;
  authorAvatar?: string;
  userRole?: string;
  authorRole?: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  beat: string;
  beatSlug: string;
  format: ContentFormat;
  accessTier: 'free' | 'registered' | 'premium';
  author: Author;
  publishedAt: string;
  readTimeMinutes: number;
  coverImage: string;
  tags: string[];
  summary: string;
  keyInsights: string[];
  contentParagraphs: string[];
  views: number;
  likes: number;
  bookmarksCount: number;
  comments: ArticleComment[];
  featured?: boolean;
  trendingScore?: number;
  pullQuote?: string | { quote: string; attribution: string };
  metrics?: any;
}

