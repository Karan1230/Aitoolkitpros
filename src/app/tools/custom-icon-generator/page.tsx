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

export default function CustomIconGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Custom Icon Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Describe the icon you need, and let our AI design it in various styles. Perfect for websites, apps, and presentations.
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
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is this tool really free?</AccordionTrigger>
                            <AccordionContent>
                            Yes, our AI Icon Generator is 100% free. You can generate and download icons without any hidden costs.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Can I use these icons for my business?</AccordionTrigger>
                            <AccordionContent>
                            Absolutely. The icons you generate are royalty-free, and you can use them for any commercial or personal project.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What format are the icons downloaded in?</AccordionTrigger>
                            <AccordionContent>
                            The icons are provided as high-quality PNG files with a transparent background, making them easy to use in any design.
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
