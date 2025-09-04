
import { type Metadata } from 'next';
import { AiReelShortsGeneratorClient } from '@/components/ai-reel-shorts-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Reel & Shorts Generator | Create Viral Videos Instantly',
  description: 'Generate stunning short-form videos for TikTok, Instagram Reels, and YouTube Shorts from text prompts with our free AI tool.',
};

const benefits = [
    "Create engaging video content in seconds.",
    "Turn your ideas into viral-worthy clips.",
    "No video editing skills required.",
    "Perfect for social media marketers and content creators."
];

export default function AiReelShortsGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Reel/Shorts Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Instantly create engaging, short-form videos for Reels, TikTok, and YouTube Shorts. Just describe your idea, and let the AI bring it to life.
              </p>
            </div>

            <div className="mt-8">
                <AiReelShortsGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Prompt:</strong> Describe the video you want to create in the text box.</p>
                    <p><strong>2. Generate:</strong> Click the "Run" button and wait for the AI to create your video.</p>
                    <p><strong>3. Download:</strong> Once generated, you can download the video directly.</p>
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
