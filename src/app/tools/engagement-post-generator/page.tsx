
import { type Metadata } from 'next';
import { EngagementPostGeneratorClient } from '@/components/engagement-post-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Engagement Post Ideas Generator',
  description: 'Generate creative post ideas for Instagram, Facebook, TikTok and more to boost your social media engagement. Get captions and hashtags instantly.',
};

const benefits = [
    "Spark conversations with your audience.",
    "Increase likes, comments, and shares.",
    "Save time brainstorming content ideas.",
    "Keep your social media feed fresh and engaging."
];

export default function EngagementPostGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                Engagement Post Ideas Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Never run out of content ideas. Generate engaging posts with captions and hashtags to keep your audience hooked on Instagram, TikTok, and other platforms.
              </p>
            </div>

            <div className="mt-8">
                <EngagementPostGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Topic:</strong> Provide a topic, niche, or audience you want to create content for.</p>
                    <p><strong>2. Select Platform & Type:</strong> Choose your social media platform and the type of content you need.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Ideas" button to get a list of creative post ideas.</p>
                    <p><strong>4. Copy & Use:</strong> Copy your favorite idea and post it directly to your social media.</p>
                </CardContent>
            </Card>

             <Card>
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
