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

const faqs = [
    {
        question: "1. What languages are supported?",
        answer: "Our tool supports a wide range of languages and accents. The default is English, but you can select from over 20 languages including Spanish, French, German, Hindi, Japanese, and more."
    },
    {
        question: "2. Is there a character limit?",
        answer: "While the tool is free, there is a generous character limit per request to ensure fair usage for everyone. For very long texts, consider breaking them into smaller parts."
    },
    {
        question: "3. Can I use the audio commercially?",
        answer: "Generally, yes. The generated audio can be used for both personal and commercial projects like YouTube videos or e-learning courses. Please verify the terms of service of the AI provider for any specific restrictions."
    },
    {
        question: "4. What format is the audio downloaded in?",
        answer: "The audio is generated and provided in WAV format, which is a high-quality, uncompressed audio format suitable for most video and audio editing software."
    },
    {
        question: "5. Can I choose different voices?",
        answer: "Yes! Our tool provides a selection of high-quality male and female voices. You can choose the one that best fits the tone and style of your content."
    },
    {
        question: "6. How realistic are the AI voices?",
        answer: "We use state-of-the-art AI models that produce incredibly natural-sounding speech, complete with realistic intonation and pacing. Most listeners find it difficult to distinguish from a human voice."
    },
    {
        question: "7. How do I download the audio?",
        answer: "Once the audio is generated, an audio player will appear. You can listen to the preview and then use the download option directly on the player to save the file to your device."
    }
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
                Bring your text to life with realistic AI voices. Paste your text, choose a voice, and generate high-quality audio in seconds. Our free AI text-to-speech (TTS) tool converts text into natural-sounding speech, perfect for voiceovers, accessibility, and content creation. Create high-quality audio for videos, listen to articles on the go, and prototype voice applications with our easy-to-use converter.
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
