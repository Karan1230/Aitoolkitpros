
import { type Metadata } from 'next';
import { HashtagGeneratorClient } from '@/components/hashtag-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Hashtag Generator | Boost Your Social Media Reach',
  description: 'Generate relevant, trending, and niche-specific hashtags for Instagram, TikTok, YouTube, and more with our free AI Hashtag Generator.',
};

const benefits = [
    "Increase the visibility and reach of your posts.",
    "Attract your target audience more effectively.",
    "Save time on hashtag research.",
    "Discover trending and niche hashtags in your industry."
];

export default function HashtagGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Hashtag Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Enter a topic and let our AI generate the perfect hashtags to boost your social media presence on platforms like Instagram, TikTok, and more.
              </p>
            </div>

            <div className="mt-8">
                <HashtagGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Your Topic:</strong> Provide a keyword, niche, or a short description of your post.</p>
                    <p><strong>2. Select Platform:</strong> Choose the social media platform you're posting on.</p>
                    <p><strong>3. Choose Style:</strong> Select the type of hashtags you need.</p>
                    <p><strong>4. Generate:</strong> Click the "Generate Hashtags" button to get a list of optimized hashtags.</p>
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
