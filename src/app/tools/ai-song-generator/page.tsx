
import { type Metadata } from 'next';
import { AiSongGeneratorClient } from '@/components/ai-song-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Song Generator | Create Music from Text',
  description: 'Generate original songs with vocals and instrumentals from text prompts using our free AI tool. Create music in any genre, from pop to rock, in seconds.',
};

const benefits = [
    "Create original songs without musical knowledge.",
    "Generate royalty-free music for your projects.",
    "Experiment with different genres and styles.",
    "Perfect for content creators, musicians, and hobbyists."
];

export default function AiSongGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Song Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Turn your text prompts into complete songs with vocals and instrumentation. Create original music in any genre with our free AI song generator.
              </p>
            </div>

            <div className="mt-8">
                <AiSongGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Describe Your Song:</strong> Enter a prompt describing the song's theme, genre, mood, or lyrics.</p>
                    <p><strong>2. Generate:</strong> Click the "Submit" button and let the AI compose your song.</p>
                    <p><strong>3. Listen & Download:</strong> Once generated, you can listen to your creation and download it.</p>
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
