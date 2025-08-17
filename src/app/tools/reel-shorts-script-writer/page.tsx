
import { type Metadata } from 'next';
import { ReelShortsScriptWriterClient } from '@/components/reel-shorts-script-writer-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Reel/Shorts Script Writer | Go Viral Instantly',
  description: 'Generate engaging short-form video scripts for TikTok, Instagram Reels, and YouTube Shorts. Get hooks, content ideas, and CTAs in seconds.',
};

const benefits = [
    "Create viral-worthy video scripts in seconds.",
    "Get attention-grabbing hooks for your videos.",
    "Receive structured content ideas with a clear CTA.",
    "Save time brainstorming and writing scripts."
];

export default function ReelShortsScriptWriterPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Reel/Shorts Script Writer
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Turn your ideas into engaging, short-form video scripts designed to go viral on TikTok, Reels, and YouTube Shorts. Get catchy hooks and structured content instantly.
              </p>
            </div>

            <div className="mt-8">
                <ReelShortsScriptWriterClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Your Idea:</strong> Provide a topic or the main idea for your short video.</p>
                    <p><strong>2. Select Platform & Tone:</strong> Choose your platform and the tone of voice for the script.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Scripts" button to get multiple script variations.</p>
                    <p><strong>4. Copy & Film:</strong> Copy your favorite script and start filming your next viral video!</p>
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
