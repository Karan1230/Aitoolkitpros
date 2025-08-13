import { type Metadata } from 'next';
import { TextToSpeechClient } from '@/components/text-to-speech-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free Text-to-Speech Converter | Natural AI Voices',
  description: 'Convert text into natural-sounding speech with our free AI Text-to-Speech (TTS) tool. Perfect for voiceovers, accessibility, and content creation. No login needed.',
};

const benefits = [
    "Create high-quality voiceovers for videos.",
    "Make your content accessible to a wider audience.",
    "Listen to articles and documents on the go.",
    "Prototype voice applications and IVR systems."
];

export default function TextToSpeechPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                Text-to-Speech Converter
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Bring your text to life with realistic AI voices. Paste your text, choose a voice, and generate high-quality audio in seconds.
            </p>

            <div className="mt-8">
                <TextToSpeechClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Text:</strong> Type or paste the text you want to convert into the text area.</p>
                    <p><strong>2. Generate Audio:</strong> Click the "Convert to Speech" button.</p>
                    <p><strong>3. Listen & Download:</strong> Use the audio player to listen to the generated speech. You can download the audio file directly from the player.</p>
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
                            <AccordionTrigger>What languages are supported?</AccordionTrigger>
                            <AccordionContent>
                            Our tool supports a wide range of languages and accents. The default is English, but the underlying AI can handle many others.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is there a character limit?</AccordionTrigger>
                            <AccordionContent>
                            While the tool is free, there might be a reasonable character limit per request to ensure fair usage for everyone. For very long texts, consider breaking them into smaller parts.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Can I use the audio commercially?</AccordionTrigger>
                            <AccordionContent>
                            Generally, yes. The generated audio can be used for both personal and commercial projects. Please verify the terms of service of the AI provider for any specific restrictions.
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
