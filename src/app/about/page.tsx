
import { type Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | AI Toolkit Pro',
  description: 'Learn about the mission and vision behind AI Toolkit Pro, your free all-in-one platform for AI-powered tools.',
  keywords: ['about ai toolkit pro', 'ai tools mission', 'free ai tools', 'ai for creators', 'democratize ai'],
  openGraph: {
    title: 'About Us | AI Toolkit Pro',
    description: 'Learn about our mission to democratize access to powerful AI tools for everyone.',
    url: 'https://www.aitoolkitpro.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About AI Toolkit Pro',
    description: 'Discover the team and vision behind the free suite of AI tools.',
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "AI Toolkit Pro",
    "url": "https://www.aitoolkitpro.com",
    "logo": "https://www.aitoolkitpro.com/logo.png",
    "description": "AI Toolkit Pro is dedicated to making powerful AI tools accessible to everyone, for free. Our mission is to empower creators, developers, and enthusiasts by removing barriers to cutting-edge technology.",
    "sameAs": [
      "https://twitter.com",
      "https://instagram.com",
      "https://facebook.com",
      "https://youtube.com"
    ]
  },
  "url": "https://www.aitoolkitpro.com/about"
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container max-w-3xl p-4 sm:p-6 md:p-8">
        <div className="text-center">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">
            About <span className="text-primary">AI Toolkit Pro</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            We are dedicated to making powerful AI tools accessible to everyone, for free. Our mission is to empower creators, developers, and enthusiasts by removing barriers to cutting-edge technology.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card className="text-center">
            <CardHeader className="items-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Target className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-xl md:text-2xl mt-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-sm md:text-base text-muted-foreground">
              To democratize access to artificial intelligence, providing high-quality, easy-to-use tools that inspire innovation and creativity without cost or complexity.
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader className="items-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-xl md:text-2xl mt-4">Who We Are</CardTitle>
            </CardHeader>
            <CardContent className="text-sm md:text-base text-muted-foreground">
              We are a passionate team of developers, designers, and AI specialists who believe in the transformative power of AI. We're committed to building a platform that is open, ethical, and user-centric.
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader className="items-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Zap className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-xl md:text-2xl mt-4">Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-sm md:text-base text-muted-foreground">
              We envision a future where anyone, regardless of technical skill, can leverage AI to bring their ideas to life. AI Toolkit Pro is our first step towards that future.
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
