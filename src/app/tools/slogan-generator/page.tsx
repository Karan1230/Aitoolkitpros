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

const faqs = [
    {
        question: "1. Is this tool free?",
        answer: "Yes, our AI Slogan Generator is 100% free to use, with no limits on generations."
    },
    {
        question: "2. Can I use the generated slogans for my business?",
        answer: "Absolutely. The generated slogans are royalty-free and can be used for any commercial or personal branding."
    },
    {
        question: "3. What is 'SEO-Friendly'?",
        answer: "Enabling the 'SEO-Friendly' option will prompt the AI to include relevant keywords from your industry and product details, which can help with online visibility."
    },
    {
        question: "4. How many slogans does it generate?",
        answer: "The tool generates a list of at least 15 unique slogans and taglines for every request, giving you a wide variety of options to choose from."
    },
    {
        question: "5. Can I get slogans in different languages?",
        answer: "Yes, the tool supports over 20 languages. Just select your desired language from the menu, and the AI will generate slogans in that language."
    },
    {
        question: "6. How can I get the best results?",
        answer: "Provide as much detail as you can. A clear 'Key Message' and specific 'Product/Service Details' will help the AI generate more relevant and impactful slogans."
    },
    {
        question: "7. What's the difference between a slogan and a tagline?",
        answer: "While often used interchangeably, a tagline is a more permanent representation of the brand (e.g., Nike's 'Just Do It'), while a slogan can be specific to a product or campaign. Our tool can generate both."
    }
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
                Describe your brand and let our AI create short, memorable slogans that capture your message and stick with your audience. Our free AI slogan and tagline generator helps you create catchy, professional, or funny taglines for your brand in any language. Generate dozens of creative options instantly and craft the perfect tagline for your marketing campaigns. Define your brand's message with clarity and create a memorable identity.
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
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                             <AccordionItem 
                                value={`item-${index + 1}`} 
                                key={index} 
                                className="bg-background/50 border rounded-lg transition-all duration-300 data-[state=open]:border-primary data-[state=open]:shadow-lg data-[state=open]:shadow-primary/10"
                            >
                                <AccordionTrigger className="text-left px-6 hover:no-underline font-semibold">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
