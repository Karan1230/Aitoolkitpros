import { type Metadata } from 'next';
import { StoryPlotGeneratorClient } from '@/components/story-plot-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free AI Story Plot Generator | Create Unique Story Ideas',
  description: 'Generate endless story plots with our free AI tool. Get unique ideas with characters, settings, conflicts, and resolutions for any genre.',
};

const benefits = [
    "Overcome writer's block with endless inspiration.",
    "Develop complex characters and settings effortlessly.",
    "Structure your narrative with a clear plot outline.",
    "Explore different genres and story angles."
];

export default function StoryPlotGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Story Plot Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Never stare at a blank page again. Generate unique story ideas, complete with characters, settings, conflict, and resolution.
            </p>

            <div className="mt-8">
                <StoryPlotGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Choose a Genre:</strong> Select the genre that fits your story.</p>
                    <p><strong>2. Select Plot Detail:</strong> Choose how detailed you want the plot to be.</p>
                    <p><strong>3. (Optional) Add Details:</strong> Specify characters, setting, or a theme to guide the AI.</p>
                    <p><strong>4. Generate:</strong> Click the "Generate Plot" button and watch your story come to life.</p>
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
                            Yes, our AI Story Plot Generator is completely free. Create as many story ideas as you like.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Can I use the generated plots for my novel or script?</AccordionTrigger>
                            <AccordionContent>
                            Absolutely. The generated content is royalty-free and can be used as a foundation for your novels, screenplays, games, or any other creative project.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-3">
                            <AccordionTrigger>Are the generated plots unique?</AccordionTrigger>
                            <AccordionContent>
                            The AI generates a new, unique plot based on your specific inputs each time. While tropes may be common in genres, the combination of elements is designed to be original.
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
