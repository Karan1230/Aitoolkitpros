
import { type Metadata } from 'next';
import { AiComicsGeneratorClient } from '@/components/ai-comics-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Comics Generator | Create Your Own Comics Instantly',
  description: 'Generate complete comic strips from text prompts with our free AI tool. Create characters, scenes, and stories in seconds. No artistic skills needed.',
};

const benefits = [
    "Turn your stories into visual comic strips.",
    "Create unique characters and scenes effortlessly.",
    "Experiment with different panel layouts and art styles.",
    "Perfect for storytellers, educators, and content creators."
];

export default function AiComicsGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Comics Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Bring your stories to life by generating entire comic strips from simple text prompts. Create unique characters, scenes, and multi-panel stories in seconds.
              </p>
            </div>

            <div className="mt-8">
                <AiComicsGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Describe Your Story:</strong> Write a prompt describing the characters, setting, and plot for your comic.</p>
                    <p><strong>2. Choose a Layout:</strong> Select the number and arrangement of panels.</p>
                    <p><strong>3. Generate:</strong> Let the AI create the comic panels based on your input.</p>
                    <p><strong>4. View & Share:</strong> Once generated, you can view your comic and share it with the world!</p>
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
