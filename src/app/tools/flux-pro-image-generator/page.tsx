
import { type Metadata } from 'next';
import { FluxProImageGeneratorClient } from '@/components/flux-pro-image-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Flux Pro Image Generator | High-Quality AI Images',
  description: 'Generate stunning, high-quality images from text prompts with our free Flux Pro Image Generator. Create photorealistic or artistic visuals in seconds.',
};

const benefits = [
    "Create photorealistic and artistic images.",
    "Generate unique visuals for any creative project.",
    "Experiment with different styles and concepts.",
    "Completely free to use, no login required."
];

export default function FluxProImageGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                Flux Pro Image Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Harness the power of Flux Pro to transform your text prompts into breathtaking images. It's fast, efficient, and capable of generating stunning visuals for any project.
              </p>
            </div>

            <div className="mt-8">
                <FluxProImageGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Prompt:</strong> Describe the image you want to create.</p>
                    <p><strong>2. Generate:</strong> Click the "Run" button and wait for the AI to create your image.</p>
                    <p><strong>3. Download:</strong> Once generated, you can download the image directly.</p>
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
