
import { type Metadata } from 'next';
import { AiLogoMakerClient } from '@/components/ai-logo-maker-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free AI Logo Maker | Design Your Brand Logo Instantly',
  description: 'Create a unique, professional logo for your business with our free AI Logo Maker. Generate and download high-quality logos in seconds. No design skills needed.',
};

const benefits = [
    "Get a professional logo without hiring a designer.",
    "Create a unique identity for your brand.",
    "Receive multiple design options instantly.",
    "Download high-quality files for web and print."
];

const faqs = [
    {
        question: "1. Is this logo maker really free?",
        answer: "Yes, it's 100% free. You can generate and download as many logos as you like without any hidden charges."
    },
    {
        question: "2. Can I use the logos for my business?",
        answer: "Absolutely. The logos are royalty-free, and you can use them for any commercial or personal project."
    },
    {
        question: "3. What files will I get when I download?",
        answer: "When you click to download a logo, you will receive a ZIP file containing two versions: a standard JPEG on a white background and a PNG with a transparent background."
    },
    {
        question: "4. Does the AI understand my industry?",
        answer: "Yes, when you provide your industry (e.g., 'Technology', 'Cafe', 'Fitness'), the AI uses that information to generate more relevant symbols, fonts, and styles for your logo."
    },
    {
        question: "5. Can I get a logo with a transparent background?",
        answer: "Yes! Every logo you download comes with a standard version on a white background and a PNG version with a transparent background, perfect for use on websites, videos, and other colored backgrounds."
    },
    {
        question: "6. What if I don't like the generated logos?",
        answer: "If you're not satisfied, try refining your inputs. Use different keywords for your industry, experiment with other color descriptions, or select a new style. Generating new batches is free and unlimited."
    },
    {
        question: "7. Do I need any design skills to use this tool?",
        answer: "Not at all. The AI Logo Maker is designed for everyone, especially entrepreneurs and small business owners who don't have a design background. The tool handles all the design principles for you."
    }
];

export default function AiLogoMakerPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Logo Maker
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Describe your brand, and let our AI design the perfect logo for you. It's fast, free, and surprisingly creative, giving you a professional brand identity in seconds.
              </p>
            </div>

            <div className="mt-8">
                <AiLogoMakerClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Describe Your Brand:</strong> Enter your brand name, slogan, and industry.</p>
                    <p><strong>2. Choose Your Style:</strong> Select a design style and color preferences that match your brand's vibe.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Logos" button and watch the AI create unique designs.</p>
                    <p><strong>4. Download:</strong> Click on your favorite logo to download both the standard and transparent versions.</p>
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
