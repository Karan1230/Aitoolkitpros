import { type Metadata } from 'next';
import { CustomIconGeneratorClient } from '@/components/custom-icon-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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

const faqs = [
    {
        question: "1. Is this tool really free?",
        answer: "Yes, our AI Icon Generator is 100% free. You can generate and download icons without any hidden costs."
    },
    {
        question: "2. Can I use these icons for my business?",
        answer: "Absolutely. The icons you generate are royalty-free, and you can use them for any commercial or personal project."
    },
    {
        question: "3. What format are the icons downloaded in?",
        answer: "The icons are provided as high-quality PNG files with a transparent background, making them easy to use in any design."
    },
    {
        question: "4. What kind of prompts work best for generating icons?",
        answer: "Simple and clear descriptions work best. Focus on the main object and its key characteristics. For example, instead of a long sentence, try 'A friendly rocket ship with three fins'."
    },
    {
        question: "5. How many icons are generated at once?",
        answer: "The tool generates a batch of 4 unique icon variations for each prompt, giving you multiple options to choose from."
    },
    {
        question: "6. Can I specify the color of the icon?",
        answer: "Yes. You can describe the desired color scheme in the 'Color Scheme' input box (e.g., 'shades of blue and white', 'warm sunset colors') to guide the AI's color choices."
    },
    {
        question: "7. What styles of icons can I create?",
        answer: "You can choose from a wide range of popular styles, including Flat, 3D, Outline, Glyph, Cartoon, and Minimalist, to ensure the icon matches your project's aesthetic."
    }
];

export default function CustomIconGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Custom Icon Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Describe the icon you need, and let our AI design it in various styles. Perfect for websites, apps, and presentations. Our free AI custom icon generator helps you create unique, high-quality icons from text descriptions. Choose from styles like flat, 3D, and outline to match your brand. Download high-resolution PNGs for your web and app projects without needing any design skills.
            </p>

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
