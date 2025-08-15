import { type Metadata } from 'next';
import { AdCopyGeneratorClient } from '@/components/ad-copy-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free AI Ad Copy Generator | Create High-Converting Ads',
  description: 'Generate effective ad copy for Google, Facebook, Instagram, and more with our free AI tool. Create headlines, body text, and CTAs in seconds.',
};

const benefits = [
    "Create high-converting ad copy in seconds.",
    "Optimize your ads for different platforms.",
    "A/B test multiple variations to find the winner.",
    "Save time and money on copywriting."
];

export default function AdCopyGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Ad Copy Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Turn your product details into persuasive ad copy that drives clicks and conversions. Our AI ad copy generator helps you craft compelling headlines, body text, and calls-to-action (CTAs) for various platforms, including Google Ads, Facebook, and Instagram. This free tool is perfect for marketers looking to create high-converting ad copy, run effective A/B tests, and save time on copywriting. Boost your digital marketing campaigns with AI-powered ad creation.
            </p>

            <div className="mt-8">
                <AdCopyGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Details:</strong> Provide product info, your target audience, and key selling points.</p>
                    <p><strong>2. Select Platform & Tone:</strong> Choose the ad platform and the tone of voice for your copy.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Ad Copy" button to get multiple ad variations.</p>
                    <p><strong>4. Copy & Use:</strong> Copy your favorite ad variation and use it in your campaign.</p>
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

            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is this tool free?</AccordionTrigger>
                            <AccordionContent>
                            Yes, our AI Ad Copy Generator is 100% free to use.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is the ad copy optimized for each platform?</AccordionTrigger>
                            <AccordionContent>
                            Yes. The AI considers the typical character limits, style, and best practices for the platform you select to create more effective ad copy.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Can I use this for any product or service?</AccordionTrigger>
                            <AccordionContent>
                            Absolutely. The tool is designed to be versatile and can generate ad copy for a wide range of industries and offerings.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
