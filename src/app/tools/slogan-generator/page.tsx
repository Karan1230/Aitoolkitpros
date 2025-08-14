import { type Metadata } from 'next';
import { SloganGeneratorClient } from '@/components/slogan-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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
            <p className="mt-4 text-lg text-muted-foreground">
                Describe your brand and let our AI create short, memorable slogans that capture your message and stick with your audience.
            </p>

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

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is this tool free?</AccordionTrigger>
                            <AccordionContent>
                            Yes, our AI Slogan Generator is 100% free to use, with no limits on generations.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Can I use the generated slogans for my business?</AccordionTrigger>
                            <AccordionContent>
                            Absolutely. The generated slogans are royalty-free and can be used for any commercial or personal branding.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What is "SEO-Friendly"?</AccordionTrigger>
                            <AccordionContent>
                            Enabling the "SEO-Friendly" option will prompt the AI to include relevant keywords from your industry and product details, which can help with online visibility.
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
