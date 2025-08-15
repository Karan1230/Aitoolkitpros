import { type Metadata } from 'next';
import { ReelShortsScriptWriterClient } from '@/components/reel-shorts-script-writer-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free AI Reel/Shorts Script Writer | Go Viral Instantly',
  description: 'Generate engaging short-form video scripts for TikTok, Instagram Reels, and YouTube Shorts. Get hooks, content ideas, and CTAs in seconds.',
};

const benefits = [
    "Create viral-worthy video scripts in seconds.",
    "Get attention-grabbing hooks for your videos.",
    "Receive structured content ideas with a clear CTA.",
    "Save time brainstorming and writing scripts."
];

const faqs = [
    {
        question: "1. Is this tool free?",
        answer: "Yes, our AI Reel/Shorts Script Writer is 100% free to use."
    },
    {
        question: "2. Are the scripts optimized for each platform?",
        answer: "Yes. The AI considers the typical pacing, style, and trends for the platform you select (TikTok, Instagram Reels, YouTube Shorts) to create more effective scripts."
    },
    {
        question: "3. Can I use this for any topic?",
        answer: "Absolutely. The tool is versatile and can generate scripts for a wide range of niches, from educational content and DIY tutorials to funny skits and trending challenges."
    },
    {
        question: "4. What does a generated script include?",
        answer: "Each generated script provides a powerful hook for the first 3 seconds, the main content broken down into simple scenes or points, a clear call-to-action (CTA), a suggested post caption, and a list of relevant hashtags."
    },
    {
        question: "5. How long are the generated scripts?",
        answer: "The scripts are designed for short-form video, typically ranging from 15 to 60 seconds in length, which is ideal for these platforms."
    },
    {
        question: "6. How many script ideas do I get?",
        answer: "The tool generates 3 distinct script variations for each topic you enter, giving you multiple creative angles to choose from."
    },
    {
        question: "7. Can I edit the scripts after they are generated?",
        answer: "Yes. We encourage you to use the generated scripts as a starting point. You can copy the text and then edit it to add your own personality, humor, and unique voice."
    }
];

export default function ReelShortsScriptWriterPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Reel/Shorts Script Writer
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Turn your ideas into engaging, short-form video scripts designed to go viral on TikTok, Reels, and YouTube Shorts. Our free AI Reel/Shorts script writer helps you generate catchy hooks, structured content, and effective calls-to-action in seconds. Create viral-worthy video scripts and save time on brainstorming. This tool is perfect for content creators looking to boost their social media presence.
            </p>

            <div className="mt-8">
                <ReelShortsScriptWriterClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Your Idea:</strong> Provide a topic or the main idea for your short video.</p>
                    <p><strong>2. Select Platform & Tone:</strong> Choose your platform and the tone of voice for the script.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Scripts" button to get multiple script variations.</p>
                    <p><strong>4. Copy & Film:</strong> Copy your favorite script and start filming your next viral video!</p>
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
