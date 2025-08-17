
import { type Metadata } from 'next';
import { GiftSuggestionToolClient } from '@/components/gift-suggestion-tool-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Gift Suggestion Tool | Find the Perfect Gift',
  description: 'Get personalized gift ideas for any occasion, age, or interest with our free AI-powered tool. Find the perfect present for birthdays, anniversaries, and more.',
};

const benefits = [
    "Find unique gifts tailored to the recipient.",
    "Save time searching for the perfect present.",
    "Get ideas for any budget or occasion.",
    "Surprise your loved ones with thoughtful gifts."
];

export default function GiftSuggestionToolPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Gift Suggestion Tool
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Never struggle to find the perfect gift again. Describe the recipient and occasion, and our AI will suggest thoughtful presents tailored to their interests and your budget.
              </p>
            </div>

            <div className="mt-8">
                <GiftSuggestionToolClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Describe Recipient:</strong> Enter the person's interests, age, and the occasion.</p>
                    <p><strong>2. Set Budget:</strong> Choose a price range for your gift.</p>
                    <p><strong>3. Generate:</strong> Click the "Suggest Gifts" button to get a list of personalized ideas.</p>
                    <p><strong>4. Copy or Download:</strong> Save your favorite ideas for later.</p>
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
