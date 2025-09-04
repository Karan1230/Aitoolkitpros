
import { type Metadata } from 'next';
import { AiAdsGeneratorClient } from '@/components/ai-ads-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Video Ad Generator | Create Ads Instantly',
  description: 'Generate professional video ads for your products in minutes. Create content for Shorts, Reels, TikTok, Facebook, and YouTube with our free AI tool.',
};

const benefits = [
    "Create professional video ads in minutes.",
    "No video editing skills required.",
    "Generate content for all major social platforms.",
    "Perfect for e-commerce, marketing, and dropshipping."
];

export default function AiAdsGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Ads Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Create high-quality video ads based on your product name. Generate content for Shorts, Reels, TikTok, Facebook, and YouTube in minutes.
              </p>
            </div>

            <div className="mt-8">
                <AiAdsGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Product Name:</strong> Provide the name of the product you want to advertise.</p>
                    <p><strong>2. Select Dimension:</strong> Choose the video format you need (e.g., Shorts, Square).</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Ad" button and wait for the AI (2-4 minutes).</p>
                    <p><strong>4. Download:</strong> Once generated, you can download your video ad.</p>
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
