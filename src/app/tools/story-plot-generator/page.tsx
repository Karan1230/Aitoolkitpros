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

const faqs = [
    {
        question: "1. Is this tool free?",
        answer: "Yes, our AI Story Plot Generator is completely free. Create as many story ideas as you like."
    },
    {
        question: "2. Can I use the generated plots for my novel or script?",
        answer: "Absolutely. The generated content is royalty-free and can be used as a foundation for your novels, screenplays, games, or any other creative project."
    },
    {
        question: "3. Are the generated plots unique?",
        answer: "The AI generates a new, unique plot based on your specific inputs each time. While tropes may be common in genres, the combination of elements is designed to be original."
    },
    {
        question: "4. Can I provide my own characters or setting?",
        answer: "Yes. To get a more customized plot, you can provide optional details about your desired characters, setting, or theme. The AI will weave these elements into the story it generates."
    },
    {
        question: "5. What's the difference between the 'Plot Detail' options?",
        answer: "'Short idea' gives you a concise, one-paragraph summary. 'Detailed plot' provides a multi-paragraph narrative from beginning to end. 'Chapter outline' breaks the story down into a list of chapter-by-chapter plot points."
    },
    {
        question: "6. Does this tool write the entire story for me?",
        answer: "No, this tool is designed to be an idea and plot generator. It provides the structure—the title, logline, characters, setting, conflict, resolution, and outline—but the final prose is up to you to write."
    },
    {
        question: "7. Can I use this for any genre?",
        answer: "Yes! The tool includes a wide variety of genres, including Romance, Thriller, Sci-Fi, Fantasy, and Comedy, allowing you to explore ideas across different styles of storytelling."
    }
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
                Never stare at a blank page again. Generate unique story ideas, complete with characters, settings, conflict, and resolution. Our free AI story plot generator helps you overcome writer's block by providing endless inspiration. Develop complex characters, create detailed settings, and structure your narrative with a clear plot outline. Explore different genres and story angles to kickstart your next novel or script.
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
