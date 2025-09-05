
import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: {
    default: 'AI Toolkit Pro - Free All-in-One AI Tools for Content, SEO & Design',
    template: '%s | AI Toolkit Pro',
  },
  description: 'Your ultimate suite of free AI tools. Generate ad copy, create scripts, design logos, find SEO keywords, and much more. Boost your productivity with our all-in-one toolkit, fully AdSense friendly and SEO optimized.',
  keywords: ['ai tools', 'free ai tools', 'content generator', 'seo tools', 'image generator', 'ai script writer', 'adsense friendly', 'ai ad copy generator', 'free logo maker', 'youtube seo tool'],
  openGraph: {
    title: 'AI Toolkit Pro - Free All-in-One AI Tools for Content, SEO & Design',
    description: 'Instantly access a suite of AI-powered tools for content creation, image editing, and audio processing. 100% free, no subscriptions.',
    url: 'https://www.aitoolkitpro.com',
    siteName: 'AI Toolkit Pro',
    images: [
      {
        url: 'https://www.aitoolkitpro.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Toolkit Pro - All-in-one AI Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Toolkit Pro - Free All-in-One AI Tools',
    description: 'Discover a powerful collection of free AI tools. From script writing to image generation, boost your creativity with AI Toolkit Pro.',
    images: ['https://www.aitoolkitpro.com/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AI Toolkit Pro",
    "url": "https://www.aitoolkitpro.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.aitoolkitpro.com/tools?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="monetag" content="803be72e60a8dc84014c97c22a08131a" />
        <meta name="google-site-verification" content="VOsx4LSG6crq_QSGq-So1NsDV0dA3_TIt4cdVnLQDD0" />
        <meta name="msvalidate.01" content="428CEBBD8BBBA5CC5CE5570CEA5F0964" />
        <link rel="icon" href="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M12 8V4H8'/%3e%3crect width='16' height='12' x='4' y='8' rx='2'/%3e%3cpath d='M2 14h2'/%3e%3cpath d='M20 14h2'/%3e%3cpath d='M15 13v2'/%3e%3cpath d='M9 13v2'/%3e%3c/svg%3e" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased dark', inter.variable, spaceGrotesk.variable)}>
        <div className="relative flex min-h-screen flex-col bg-gradient-bg">
          <AppHeader />
          <main className="flex-1 pt-16">{children}</main>
          <AppFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
