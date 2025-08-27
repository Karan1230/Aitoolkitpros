
import { type Metadata } from 'next';
import { YoutubeSeoToolClient } from '@/components/youtube-seo-tool-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI YouTube SEO Tool | Boost Your Video Rankings',
  description: 'Analyze your YouTube videos, channels, and keywords with our free AI SEO tool. Get optimized titles, descriptions, tags, and an SEO score to rank higher.',
};

const benefits = [
    "Increase video visibility and reach.",
    "Get a data-driven SEO score for your content.",
    "Find high-ranking keywords from competitors.",
    "Optimize titles, descriptions, and tags instantly."
];

export default function YoutubeSeoToolPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI YouTube SEO Tool
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Get everything you need to rank higher on YouTube. Analyze videos, channels, or keywords to get an instant SEO score and AI-powered recommendations.
              </p>
            </div>

            <div className="mt-8">
                <YoutubeSeoToolClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Choose Analysis Type:</strong> Select whether you want to analyze a video, channel, or keyword.</p>
                    <p><strong>2. Enter Input:</strong> Paste a YouTube URL or type a keyword.</p>
                    <p><strong>3. Generate Report:</strong> Click "Analyze" to get your comprehensive SEO report.</p>
                    <p><strong>4. Apply Suggestions:</strong> Copy the optimized title, description, and tags to improve your video's performance.</p>
                </CardContent>
            </Card>

             <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <span>{benefit}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
