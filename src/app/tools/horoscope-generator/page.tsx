
import { type Metadata } from 'next';
import { HoroscopeGeneratorClient } from '@/components/horoscope-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Horoscope Generator | Daily, Weekly, Monthly',
  description: 'Get your free, personalized horoscope for any zodiac sign. Our AI generates daily, weekly, and monthly predictions for love, career, and health.',
};

const benefits = [
    "Get personalized daily, weekly, and monthly insights.",
    "Plan your future with predictions for love, career, and health.",
    "Discover your lucky numbers and colors.",
    "Available in multiple languages for a global audience."
];

export default function HoroscopeGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Horoscope Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Select your zodiac sign and timeframe to receive a personalized horoscope covering love, career, health, your lucky numbers, and more insightful predictions.
              </p>
            </div>

            <div className="mt-8">
                <HoroscopeGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Select Your Sign:</strong> Choose your zodiac sign from the list.</p>
                    <p><strong>2. Choose Timeframe:</strong> Select whether you want a daily, weekly, or monthly horoscope.</p>
                    <p><strong>3. Select Language:</strong> Pick your preferred language.</p>
                    <p><strong>4. Generate:</strong> Click the "Generate Horoscope" button to get your personalized reading.</p>
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
