
import { type Metadata } from 'next';
import { AiImageGeneratorClient } from '@/components/ai-image-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Image Generator | Create Art from Text',
  description: 'Generate stunning, high-quality images from text prompts with our free AI Image Generator. No login required. Turn your creative ideas into visual art instantly.',
};

const benefits = [
    "Unleash creativity without artistic skills.",
    "Generate unique assets for blogs and social media.",
    "Visualize concepts and ideas in seconds.",
    "Create royalty-free images for any project."
];

export default function AiImageGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Image Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                  Transform your words into breathtaking images. Describe what you want to see, and our AI image generator will bring your vision to life in seconds.
              </p>
            </div>

            <div className="mt-8">
                <AiImageGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Write a Prompt:</strong> Be descriptive. The more detail you provide, the better the result. Think about the subject, style, colors, and mood.</p>
                    <p><strong>2. Generate:</strong> Click the "Generate Image" button and wait for the AI to work its magic.</p>
                    <p><strong>3. Download:</strong> Right-click and save your generated image. Use it for your projects, social media, or just for fun!</p>
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
