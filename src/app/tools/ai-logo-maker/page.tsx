
import { type Metadata } from 'next';
import { AiLogoMakerClient } from '@/components/ai-logo-maker-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Logo Maker | Design Your Brand Logo Instantly',
  description: 'Create a unique, professional logo for your business with our free AI Logo Maker. Generate and download high-quality logos in seconds. No design skills needed.',
};

const benefits = [
    "Get a professional logo without hiring a designer.",
    "Create a unique identity for your brand.",
    "Receive multiple design options instantly.",
    "Download high-quality files for web and print."
];

export default function AiLogoMakerPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Logo Maker
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Describe your brand, and let our AI design the perfect logo for you. It's fast, free, and surprisingly creative, giving you a professional brand identity in seconds.
              </p>
            </div>

            <div className="mt-8">
                <AiLogoMakerClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Describe Your Brand:</strong> Enter your brand name, slogan, and industry.</p>
                    <p><strong>2. Choose Your Style:</strong> Select a design style and color preferences that match your brand's vibe.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Logos" button and watch the AI create unique designs.</p>
                    <p><strong>4. Download:</strong> Click on your favorite logo to download both the standard and transparent versions.</p>
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
