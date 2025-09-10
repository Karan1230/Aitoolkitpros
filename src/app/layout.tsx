
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
    default: 'AI Toolkit Pro – Best Free Online AI Tools Hub',
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
        url: 'https://aitoolkitpro.netlify.app/og-image.jpg',
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
    images: ['https://aitoolkitpro.netlify.app/og-image.jpg'],
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
        <link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAzNJREFUWEftl3tMW/UAx7/ve+1YSltgy9K2zWEDM4YRg8EYYyQ+bDA/WBL1wY+NvywJ+sCX+aM/GOMPEmMGY/JjMwZfMLOwZa0s2JK2tQ+11z5+3R3iX+d25+1a8iW5XU7/5/d8n+d8OhDHr8Y7nCgnsuCc1yAooIqAKgSgQ2Mh1xK8fL+4xXbWvA2Afg8AWBAQzM15sAFgAECz+UfAGkBsLFx2Pj7M599Z7c5N+A6I+AFgnwHAGh1x4/l8j88P65z5gY8B/N8A4Is/zW2Z/jT/vA4/ADgJ+Y8A4AcBQC+1y4KFS4uLV3bU2e4+x2+ABAAQAABoAYAGwIuLb1vdrS3lP58u/PjH8nOeVsK/zK/zVwDAP48A3t2+Z/vG5tbu3JpX1P75k8uX+37Y077H1v4DAP8eAHx8r9f9/jdB/PjA4OAxO3fu3N6xI611vV4vL3R3d/V+fn7+4x/u2B3g5wOAe5s21dn9/f2zMjA2VvT+/j4sLCwM+v3+3L17txfL6Pj4mIqNjcnY2FguLi4m4/F4ys3NlT8wWv+GZ+zueb6y/82G3d09W/J+w7o+fPjws4cPFy8fNjbWv0XG4/EAjuO0t7d3c3h4eHh5eamrq+vm9u3bN3fs2JH8/v5+fnd350h1NTU1q6qq+v3r4uJi+fnz5yv37t3rGxsbbUD4+PgY0dPT09vbOzs8POwDA/230tJSOzs7O5uammp/f3+d73jL+gqA3gQAmwAEy9Ua+t0P/M5/7fR/+R09Xf8CgN4DYHcSAJAAkAD4B0B+7kFhYZFkMpmYmpqSvb09GhoaEjg4OKCqmipXV1fe4cOHvQMDA3sPDw8nJyenqKurA+Dq4cOHmzdvXt63b9+ZM2fOGvH+4sWLDx48uHPmzJnTp09f2rp1a2JjY2N/f//Zl1566dNXXnndq6++uvPDDz988ODB/ft+8N//AQD89cQJp/z5XwAAAABJRU5ErkJggg==" />
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
