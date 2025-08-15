import { type Metadata } from 'next';
import { ColorPaletteFinderClient } from '@/components/color-palette-finder-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free AI Color Palette Finder | Generate Color Schemes Instantly',
  description: 'Generate beautiful and harmonious color palettes from a text description. Get matching color schemes for your designs, websites, or brand in any language.',
};

const benefits = [
    "Discover unique color schemes in seconds.",
    "Ensure your colors are harmonious and balanced.",
    "Get palettes for any style: modern, vintage, or vibrant.",
    "Instantly copy HEX codes for use in any design tool."
];

export default function ColorPaletteFinderPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Color Palette Finder
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Describe your idea, and let our AI generate the perfect color palette. It's the ideal tool for designers, marketers, and creators. Our free AI color palette finder helps you create harmonious color schemes from any text description. Generate matching colors for your website, brand, or design projects in any language. Discover unique palettes and instantly copy HEX codes for your favorite design tools.
            </p>

            <div className="mt-8">
                <ColorPaletteFinderClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Describe Your Vision:</strong> Enter a description of the mood, style, or theme you want (e.g., "a serene beach at sunset").</p>
                    <p><strong>2. Choose Palette Type:</strong> Select a color theory model like Complementary or Analogous.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Palettes" button to see the AI's suggestions.</p>
                    <p><strong>4. Copy & Use:</strong> Click on a color's HEX code to copy it to your clipboard.</p>
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
                            Yes, the AI Color Palette Finder is 100% free to use, with no limits on how many palettes you can generate.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What do the different palette types mean?</AccordionTrigger>
                            <AccordionContent>
                            They are based on color theory. For example, "Complementary" uses colors from opposite sides of the color wheel for high contrast, while "Analogous" uses colors that are next to each other for a more harmonious feel.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Can I use these colors in my professional projects?</AccordionTrigger>
                            <AccordionContent>
                            Absolutely. The generated HEX codes can be used in any design software, website CSS, or branding guide.
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
