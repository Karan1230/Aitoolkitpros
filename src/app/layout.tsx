import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthGuestProvider } from '@/context/auth-guest-context';
import { AuthModal } from '@/components/auth/auth-modal';
import { getStoredSeoSettings, getStoredSiteSettings } from '@/lib/server-storage';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export async function generateMetadata(): Promise<Metadata> {
  const seo = getStoredSeoSettings();
  const siteUrl = seo.canonicalUrl || 'https://aitoolkitpro.netlify.app';

  return {
    title: {
      default: seo.siteTitle || 'AI Toolkit Pro – Best Free Online AI Tools Hub',
      template: seo.titleTemplate || '%s | AI Toolkit Pro',
    },
    description: seo.siteDescription,
    keywords: seo.keywords,
    verification: {
      google: seo.searchConsoleId || undefined,
    },
    other: {
      monetag: '988e7060a5c1fec9e76a5ab72a2630ab',
    },
    icons: {
      icon: '/favicon.png',
    },
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      title: seo.siteTitle,
      description: seo.siteDescription,
      url: siteUrl,
      siteName: seo.organizationName || 'AI Toolkit Pro',
      images: [
        {
          url: seo.ogImageUrl || 'https://aitoolkitpro.netlify.app/og-image.jpg',
          width: 1200,
          height: 630,
          alt: seo.siteTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.siteTitle,
      description: seo.siteDescription,
      images: [seo.ogImageUrl || 'https://aitoolkitpro.netlify.app/og-image.jpg'],
      creator: seo.twitterHandle || '@AIToolkitPro',
    },
    robots: {
      index: seo.enableRobotsIndex,
      follow: seo.enableRobotsFollow,
      googleBot: {
        index: seo.enableRobotsIndex,
        follow: seo.enableRobotsFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const seo = getStoredSeoSettings();
  const siteSettings = getStoredSiteSettings();
  const siteUrl = seo.canonicalUrl || 'https://aitoolkitpro.netlify.app';

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": seo.organizationName || "AI Toolkit Pro",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className={cn(inter.variable, spaceGrotesk.variable)} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-body text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {seo.customHeaderScript && (
          <script
            dangerouslySetInnerHTML={{ __html: seo.customHeaderScript }}
          />
        )}
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <AuthGuestProvider>
            <div className="relative flex min-h-screen flex-col bg-gradient-bg">
              {/* Top Announcement Bar if enabled */}
              {siteSettings.announcementEnabled && siteSettings.announcementText && (
                <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-indigo-600 to-violet-600 text-white text-[11px] sm:text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 shadow-xs">
                  <Sparkles className="h-3 w-3 shrink-0 animate-pulse" />
                  <Link href={siteSettings.announcementLink || '/tools'} className="hover:underline font-medium">
                    {siteSettings.announcementText}
                  </Link>
                </div>
              )}

              <div className={siteSettings.announcementEnabled && siteSettings.announcementText ? 'pt-7' : ''}>
                <AppHeader />
                <main className="flex-1 pt-16">{children}</main>
                <AppFooter />
              </div>

              {/* 1-Hour Guest Lock & Registration Modal */}
              <AuthModal />
            </div>
            <Toaster />
          </AuthGuestProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

