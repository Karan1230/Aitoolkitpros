
import { type Metadata } from 'next';
import { LtxAiVideoGeneratorClient } from '@/components/ltx-ai-video-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free LTX AI Video Generator | High-Quality Text-to-Video',
  description: 'Create stunning, high-quality videos from text prompts with our free LTX AI Video Generator. Fast generation with improved prompt understanding.',
};

const benefits = [
    "Generate high-quality video clips from text.",
    "Improved prompt understanding for detailed results.",
    "No complex video editing software needed.",
    "Bring your creative stories and ideas to life."
];

export default function LtxAiVideoGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                LTX AI Video Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Generate incredibly detailed and high-quality videos from your text prompts. Powered by LTX Video 0.9.8, this tool offers fast generation with enhanced prompt understanding.
              </p>
            </div>

            <div className="mt-8">
                <LtxAiVideoGeneratorClient />
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
                    <p><strong>3. Download:</strong> Once generated, you can download the video directly from the player.</p>
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
