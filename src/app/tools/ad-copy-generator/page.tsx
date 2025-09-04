
import { type Metadata } from 'next';
import { AdCopyGeneratorClient } from '@/components/ad-copy-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Ad Copy Generator | Create High-Converting Ads',
  description: 'Generate effective ad copy for Google, Facebook, Instagram, and more with our free AI tool. Create headlines, body text, and CTAs in seconds.',
};

const benefits = [
    "Create high-converting ad copy in seconds.",
    "Optimize your ads for different platforms.",
    "A/B test multiple variations to find the winner.",
    "Save time and money on copywriting."
];

export default function AdCopyGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Ad Copy Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Turn your product details into persuasive, high-converting ad copy. Instantly create compelling headlines and text for Google Ads, Facebook, and more to boost your campaigns.
              </p>
            </div>

            <div className="mt-8">
                <AdCopyGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm md:text-base">
                    <p><strong>1. Enter Details:</strong> Provide product info, your target audience, and key selling points.</p>
                    <p><strong>2. Select Platform & Tone:</strong> Choose the ad platform and the tone of voice for your copy.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Ad Copy" button to get multiple ad variations.</p>
                    <p><strong>4. Copy & Use:</strong> Copy your favorite ad variation and use it in your campaign.</p>
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
                            <span className="text-sm md:text-base">{benefit}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
