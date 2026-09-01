export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  featuredImage: string;
  featuredImageAlt?: string;
  thumbnailHighlightText?: string;
  thumbnailBadge?: string;
  showThumbnailOverlay?: boolean;
  inArticleImages?: Array<{
    url: string;
    alt: string;
    caption: string;
    prompt?: string;
    sectionTitle?: string;
    source?: 'gemini' | 'flux-ai';
  }>;
  datePublished: string;
  dateModified?: string;
  status: 'published' | 'draft';
  readTime: string;
  featured?: boolean;
  // SEO Metadata
  metaTitle?: string;
  metaDescription?: string;
  focusKeywords?: string[];
  canonicalUrl?: string;
  relatedToolHref?: string;
  relatedToolName?: string;
}

export interface SeoSettings {
  siteTitle: string;
  titleTemplate: string;
  siteDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogImageUrl: string;
  twitterHandle: string;
  searchConsoleId: string;
  googleAnalyticsId: string;
  enableRobotsIndex: boolean;
  enableRobotsFollow: boolean;
  organizationName: string;
  organizationLogo?: string;
  customHeaderScript?: string;
  customFooterScript?: string;
}

export interface AccessSettings {
  guestTrialMinutes: number; // default: 60 (1 hour)
  guestModeEnabled: boolean;
  enforceTrialLock: boolean;
  lockTitle: string;
  lockDescription: string;
  allowTrialResetForTesting: boolean;
}

export interface SiteSettings {
  brandName: string;
  announcementText: string;
  announcementLink: string;
  announcementEnabled: boolean;
  supportEmail: string;
  footerText: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  role: 'admin' | 'user';
  createdAt: string;
  lastLoginAt?: string;
  isUnlimited?: boolean;
  trialExpiresAt?: number;
}

export const INITIAL_SEO_SETTINGS: SeoSettings = {
  siteTitle: 'AI Toolkit Pro – Best Free Online AI Tools Hub',
  titleTemplate: '%s | AI Toolkit Pro',
  siteDescription: 'AI Toolkit Pro offers the best free online AI tools. Generate ad copy, logos, scripts, SEO keywords, images & more with 1-hour free guest access.',
  keywords: [
    'AI Content Generator',
    'AI Image Generator',
    'AI Video Generator',
    'AI Script Writer',
    'AI Logo Maker',
    'AI SEO Tools',
    'Free AI Tools Hub'
  ],
  canonicalUrl: 'https://aitoolkitpro.netlify.app',
  ogImageUrl: 'https://aitoolkitpro.netlify.app/og-image.jpg',
  twitterHandle: '@AIToolkitPro',
  searchConsoleId: 'O53X2mdbJz3WwgeqtSsvQVCGlo5jYyvjVrckboIfecg',
  googleAnalyticsId: 'G-XXXXXXXXXX',
  enableRobotsIndex: true,
  enableRobotsFollow: true,
  organizationName: 'AI Toolkit Pro',
  customHeaderScript: ''
};

export const INITIAL_ACCESS_SETTINGS: AccessSettings = {
  guestTrialMinutes: 60, // Exactly 1 hour
  guestModeEnabled: true,
  enforceTrialLock: true,
  lockTitle: 'Your 1-Hour Free Guest Trial Has Ended',
  lockDescription: 'You have enjoyed 60 minutes of free AI tools access. To continue generating unlimited content with no restrictions, please create a free account or log in below.',
  allowTrialResetForTesting: true
};

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  brandName: 'AI Toolkit Pro',
  announcementText: '🚀 Explore 20+ Free AI Generation Tools & In-Depth SEO Guides!',
  announcementLink: '/blog',
  announcementEnabled: true,
  supportEmail: 'support@aitoolkitpro.com',
  footerText: 'AI Toolkit Pro. An all-in-one suite of free AI tools for creators, developers, and marketers.'
};

export const INITIAL_ADMIN_USER: UserAccount = {
  id: 'admin-1',
  name: 'Admin Master',
  email: 'admin@aitoolkitpro.com',
  passwordHash: 'admin123456',
  role: 'admin',
  createdAt: '2025-01-01T00:00:00Z',
  lastLoginAt: '2025-01-01T00:00:00Z',
  isUnlimited: true
};
