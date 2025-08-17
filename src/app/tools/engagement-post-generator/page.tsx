
import { type Metadata } from 'next';
import { EngagementPostGeneratorClient } from '@/components/engagement-post-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free AI Engagement Post Ideas Generator',
  description: 'Generate creative post ideas for Instagram, Facebook, TikTok and more to boost your social media engagement. Get captions and hashtags instantly.',
};

const benefits = [
    "Spark conversations with your audience.",
    "Increase likes, comments, and shares.",
    "Save time brainstorming content ideas.",
    "Keep your social media feed fresh and engaging."
];

const faqs = [
    {
        question: "1. Is this tool free?",
        answer: "Yes, our AI Engagement Post Ideas Generator is 100% free to use."
    },
    {
        question: "2. Are the ideas optimized for each platform?",
        answer: "Yes. The AI considers the style and best practices for the platform you select (e.g., Instagram, TikTok, Facebook) to create more effective and engaging post ideas."
    },
    {
        question: "3. Can I use this for any niche?",
        answer: "Absolutely. The tool is designed to be versatile and can generate ideas for a wide range of industries, hobbies, and topics."
    },
    {
        question: "4. What does the output include?",
        answer: "For each idea, the tool generates the core concept, a suggested caption to go with it, and a list of relevant hashtags to help increase visibility."
    },
    {
        question: "5. How many ideas does it generate?",
        answer: "The tool generates a list of 5 unique post ideas at a time, giving you a variety of options to choose from for your content calendar."
    },
    {
        question: "6. What are the different 'Content Types'?",
        answer: "You can choose from different types of engagement posts, such as asking a 'Question' to your audience, creating a 'Poll', launching a 'Challenge', or sharing a helpful 'Tip'. This helps tailor the output to your specific goal."
    },
    {
        question: "7. Can I download the generated ideas?",
        answer: "Yes. After generating the ideas, you can use the 'Download All' button to save a text file containing all the generated post ideas, captions, and hashtags."
    }
];

export default function EngagementPostGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                Engagement Post Ideas Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Never run out of content ideas. Generate engaging posts with captions and hashtags to keep your audience hooked on Instagram, TikTok, and other platforms.
              </p>
            </div>

            <div className="mt-8">
                <EngagementPostGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Topic:</strong> Provide a topic, niche, or audience you want to create content for.</p>
                    <p><strong>2. Select Platform & Type:</strong> Choose your social media platform and the type of content you need.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Ideas" button to get a list of creative post ideas.</p>
                    <p><strong>4. Copy & Use:</strong> Copy your favorite idea and post it directly to your social media.</p>
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
