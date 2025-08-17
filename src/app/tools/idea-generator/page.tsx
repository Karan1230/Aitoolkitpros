
import { type Metadata } from 'next';
import { IdeaGeneratorClient } from '@/components/idea-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Idea Generator | Generate Business & Content Ideas',
  description: 'Generate endless creative ideas for business, marketing, content, and more with our free AI Idea Generator. Spark your next big project in any language.',
};

const benefits = [
    "Overcome creative blocks instantly.",
    "Discover new business or product opportunities.",
    "Generate engaging content ideas for your blog or social media.",
    "Explore marketing angles you haven't considered."
];

export default function IdeaGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Idea Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Stuck in a creative rut? Enter a topic and let our AI generate a list of innovative ideas for business, content, or marketing to get you started.
              </p>
            </div>

            <div className="mt-8">
                <IdeaGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Your Topic:</strong> Be as specific or broad as you like (e.g., "sustainable fashion," "mobile apps for fitness").</p>
                    <p><strong>2. Choose Idea Type:</strong> Select the category of ideas you need, such as "Business" or "Content."</p>
                    <p><strong>3. Select Language:</strong> Pick your preferred language for the generated ideas.</p>
                    <p><strong>4. Generate:</strong> Click the "Generate Ideas" button and get a list of creative concepts in seconds.</p>
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
