
import { type Metadata } from 'next';
import { SloganGeneratorClient } from '@/components/slogan-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Slogan & Tagline Generator | Create Catchy Taglines',
  description: 'Generate memorable slogans and taglines for your brand with our free AI tool. Create catchy, professional, or funny taglines in any language.',
};

const benefits = [
    "Create a memorable brand identity instantly.",
    "Generate dozens of creative options in seconds.",
    "Craft the perfect tagline for marketing campaigns.",
    "Define your brand's message with clarity."
];

export default function SloganGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Slogan/Tagline Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Describe your brand and let our AI create short, memorable slogans that capture your message and stick with your audience. Perfect for branding and marketing campaigns.
              </p>
            </div>

            <div className="mt-8">
                <SloganGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Brand Details:</strong> Fill in your brand name, industry, product details, and key message.</p>
                    <p><strong>2. Choose Tone & Language:</strong> Select the tone that fits your brand and your desired language.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Slogans" button to get a list of creative taglines.</p>
                    <p><strong>4. Copy & Download:</strong> Use the buttons to copy your favorite slogans or download the entire list.</p>
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
