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

export default function RoastJokeGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Roast & Joke Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Unleash your inner comedian. Enter a topic, pick a style, and let our AI generate hilarious roasts and jokes for you. Our free AI roast and joke generator helps you create funny one-liners and comebacks in seconds. Choose from various tones to match your humor, and entertain your friends, family, or social media followers with creative and witty content.
            </p>

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
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is this tool free to use?</AccordionTrigger>
                            <AccordionContent>
                            Yes, it's 100% free. You can generate as many jokes and roasts as you like without any limits.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What does "Family-Friendly" do?</AccordionTrigger>
                            <AccordionContent>
                             Enabling the "Family-Friendly" option instructs the AI to avoid generating content with adult themes, profanity, or dark humor, making it suitable for all audiences.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-3">
                            <AccordionTrigger>Can I use these jokes commercially?</AccordionTrigger>
                            <AccordionContent>
                            Absolutely. The generated content is royalty-free and can be used for social media, videos, or any other project.
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
