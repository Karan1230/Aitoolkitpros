
import { type Metadata } from 'next';
import { ColorPaletteFinderClient } from '@/components/color-palette-finder-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Color Palette Finder | Generate Color Schemes Instantly',
  description: 'Generate beautiful and harmonious color palettes from a text description. Get matching color schemes for your designs, websites, or brand in any language.',
};

const benefits = [
    "Discover unique color schemes in seconds.",
    "Ensure your colors are harmonious and balanced.",
    "Get palettes for any style: modern, vintage, or vibrant.",
    "Instantly copy HEX codes for use in any design tool."
];

export default function ColorPaletteFinderPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Color Palette Finder
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Describe your idea, and let our AI generate the perfect color palette. An ideal tool for designers, marketers, and creators looking for harmonious color schemes.
              </p>
            </div>

            <div className="mt-8">
                <ColorPaletteFinderClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Describe Your Vision:</strong> Enter a description of the mood, style, or theme you want (e.g., "a serene beach at sunset").</p>
                    <p><strong>2. Choose Palette Type:</strong> Select a color theory model like Complementary or Analogous.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Palettes" button to see the AI's suggestions.</p>
                    <p><strong>4. Copy & Use:</strong> Click on a color's HEX code to copy it to your clipboard.</p>
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
