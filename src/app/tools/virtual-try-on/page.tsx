
import { type Metadata } from 'next';
import { VirtualTryOnClient } from '@/components/virtual-try-on-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Virtual Try-On Tool | Try On Clothes Virtually',
  description: 'Virtually try on different outfits using our free AI-powered tool. Upload a photo of yourself and a photo of the clothing item to see how it looks.',
};

const benefits = [
    "Visualize how clothes will look on you before buying.",
    "Experiment with different styles from the comfort of your home.",
    "Save time and reduce returns when shopping online.",
    "Fun and easy to use for fashion enthusiasts."
];

export default function VirtualTryOnPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Virtual Try-On
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                See how clothes look on you without leaving your home. Upload a photo of yourself and an image of a clothing item to get a realistic virtual try-on experience.
              </p>
            </div>

            <div className="mt-8">
                <VirtualTryOnClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Upload Photos:</strong> Provide a photo of a person and a separate photo of the clothing item.</p>
                    <p><strong>2. Generate:</strong> Click the "Run" button and wait for the AI to process the images.</p>
                    <p><strong>3. View Result:</strong> The tool will generate an image of the person wearing the clothes.</p>
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
