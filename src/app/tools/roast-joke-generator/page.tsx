
import { type Metadata } from 'next';
import { RoastJokeGeneratorClient } from '@/components/roast-joke-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free AI Roast & Joke Generator | Create Funny Lines Instantly',
  description: 'Generate hilarious roasts, jokes, and one-liners with our free AI tool. Choose a tone and topic to get creative and funny content in seconds.',
};

const benefits = [
    "Instantly generate funny content for any occasion.",
    "Come up with witty comebacks and one-liners.",
    "Entertain friends, family, or your social media followers.",
    "Choose from multiple tones to match your style."
];

const faqs = [
    {
        question: "1. Is this tool free to use?",
        answer: "Yes, it's 100% free. You can generate as many jokes and roasts as you like without any limits."
    },
    {
        question: "2. What does 'Family-Friendly' do?",
        answer: "Enabling the 'Family-Friendly' option instructs the AI to avoid generating content with adult themes, profanity, or dark humor, making it suitable for all audiences."
    },
    {
        question: "3. Can I use these jokes commercially?",
        answer: "Absolutely. The generated content is royalty-free and can be used for social media, videos, stand-up routines, or any other project."
    },
    {
        question: "4. What's the difference between 'Roast' and 'Joke' mode?",
        answer: "'Roast' mode generates witty insults about the topic, in the style of a comedy roast. 'Joke' mode generates classic one-liners and short jokes about the topic. 'Mixed' gives you a combination of both."
    },
    {
        question: "5. Can I choose the comedic tone?",
        answer: "Yes. You can select from various tones like 'Sarcastic', 'Savage', 'Light/Friendly', or 'Dark Humor' to match the style of comedy you're looking for. Note that 'Dark Humor' is only available when 'Family-Friendly' is turned off."
    },
    {
        question: "6. How many results do I get?",
        answer: "The tool generates a list of 10 unique roasts or jokes for each request, giving you plenty of material to choose from."
    },
    {
        question: "7. Does the AI understand jokes about specific people?",
        answer: "You can enter a name or a type of person (e.g., 'my friend who is a doctor') as the topic. The AI will generate jokes based on common stereotypes and situations associated with that topic. It does not have knowledge of private individuals."
    }
];

export default function RoastJokeGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Roast & Joke Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Unleash your inner comedian. Enter a topic, pick a style, and let our AI create hilarious roasts, jokes, and one-liners for any occasion.
              </p>
            </div>

            <div className="mt-8">
                <RoastJokeGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter a Topic:</strong> Write a name, topic, or scenario you want to joke about.</p>
                    <p><strong>2. Choose Mode & Tone:</strong> Select whether you want a roast, a joke, or a mix, and pick the comedic tone.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate" button and let the AI craft some witty lines.</p>
                    <p><strong>4. Copy & Share:</strong> Copy your favorite jokes and share them with the world!</p>
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
