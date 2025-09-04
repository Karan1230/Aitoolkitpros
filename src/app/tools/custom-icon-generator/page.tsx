
import { type Metadata } from 'next';
import { CustomIconGeneratorClient } from '@/components/custom-icon-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Custom Icon Generator | Create Unique Icons Instantly',
  description: 'Generate custom, high-quality icons from a text description with our free AI tool. Choose styles like flat, 3D, outline, and more for your brand or project.',
};

const benefits = [
    "Create unique icons perfectly matched to your brand.",
    "No design skills needed to get professional icons.",
    "Generate multiple styles to find the perfect look.",
    "Download high-resolution PNGs for web and apps."
];

export default function CustomIconGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Custom Icon Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Describe the icon you need, and our AI will design it in various styles. Perfect for creating unique, high-quality icons for websites, apps, and presentations.
              </p>
            </div>

            <div className="mt-8">
                <CustomIconGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Describe Your Icon:</strong> Enter a clear description of the icon concept (e.g., "a friendly robot waving").</p>
                    <p><strong>2. Choose Style & Colors:</strong> Select a design style and describe your preferred color scheme.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Icons" button and see the AI-created designs.</p>
                    <p><strong>4. Download:</strong> Click your favorite icon to download the high-resolution PNG file.</p>
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
