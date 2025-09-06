
import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import { ThemeProvider } from '@/components/theme-provider';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: {
    default: 'AI Toolkit Pro – Best Free AI Tools Hub Online',
    template: '%s | AI Toolkit Pro',
  },
  description: 'AI Toolkit Pro offers the best free online AI tools. voice ganerator, Generate ad copy, logos, scripts, SEO keywords, image & more—boost creativity fast.',
  keywords: ['AI Content Generator, AI Image Generator, AI Video Generator, AI Script Writer, AI Logo Maker, AI Voice Cloning, AI Text-to-Speech, AI Social Media Tools, AI SEO Tools, AI Resume Builder, AI Quiz Generator, AI Study Notes Creator, AI Ad Copy Generator, AI Background Remover, AI Cartoon Maker'],
  openGraph: {
    title: 'AI Toolkit Pro - Free All-in-One AI Tools for Content, SEO & Design',
    description: 'Instantly access a suite of AI-powered tools for content creation, image editing, and audio processing. 100% free, no subscriptions.',
    url: 'https://aitoolkitpro.netlify.app/',
    siteName: 'AI Toolkit Pro',
    images: [
      {
        url: 'https://aitoolkitpro.netlify.app/og-image.png',
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
    images: ['https://aitoolkitpro.netlify.app/twitter-image.png'],
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
    "url": "https://aitoolkitpro.netlify.app/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://aitoolkitpro.netlify.app/tools?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="monetag" content="988e7060a5c1fec9e76a5ab72a2630ab" />
        <meta name="google-site-verification" content="O53X2mdbJz3WwgeqtSsvQVCGlo5jYyvjVrckboIfecg" />
        <meta name="msvalidate.01" content="" />
        <link rel="icon" href="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3cdefs%3e%3cfilter id='glow' x='-50%25' y='-50%25' width='200%25' height='200%25'%3e%3cfeGaussianBlur stdDeviation='5' result='coloredBlur'/%3e%3cfeMerge%3e%3cfeMergeNode in='coloredBlur'/%3e%3cfeMergeNode in='SourceGraphic'/%3e%3c/feMerge%3e%3c/filter%3e%3c/defs%3e%3cg fill='%23f472b6' filter='url(%23glow)'%3e%3cpath d='M20,40 h-5 v-5 h10 v-5 h-15 v35 h5 v5 h-10 v5 h70 v-5 h-10 v-5 h5 v-35 h-15 v5 h10 v5 h-30 Z'/%3e%3ccircle cx='40' cy='50' r='5'/%3e%3ccircle cx='60' cy='50' r='5'/%3e%3c/g%3e%3c/svg%3e" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script src="https://fpyf8.com/88/tag.min.js" data-zone="168961" async data-cfasync="false"></script>
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased', inter.variable, spaceGrotesk.variable)}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <div className="relative flex min-h-screen flex-col bg-gradient-bg">
            <AppHeader />
            <main className="flex-1 pt-16">{children}</main>
            <AppFooter />
            </div>
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
