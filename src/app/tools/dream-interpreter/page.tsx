
import { type Metadata } from 'next';
import { DreamInterpreterClient } from '@/components/dream-interpreter-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Dream Interpreter | Understand Your Dreams in Any Language',
  description: 'Unlock the meanings behind your dreams with our free AI Dream Interpreter. Get instant analysis of symbols, emotions, and context in over 100 languages.',
};

const benefits = [
    "Gain insight into your subconscious mind.",
    "Understand the symbols and themes in your dreams.",
    "Explore psychological and spiritual perspectives.",
    "Get interpretations in your native language."
];

export default function DreamInterpreterPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Dream Interpreter
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Describe your dream in any language, and our AI will provide a thoughtful interpretation to help you understand its meaning, symbols, emotions, and context.
              </p>
            </div>

            <div className="mt-8">
                <DreamInterpreterClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Describe Your Dream:</strong> Write down everything you can remember about your dream in the text area.</p>
                    <p><strong>2. Choose Language:</strong> Select the language you want the interpretation in.</p>
                    <p><strong>3. Generate:</strong> Click the "Interpret Dream" button to get your AI-powered analysis.</p>
                    <p><strong>4. Reflect:</strong> Read the interpretation and reflect on how it might relate to your waking life.</p>
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
