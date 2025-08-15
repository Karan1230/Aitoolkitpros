import { type Metadata } from 'next';
import { AiScriptWriterClient } from '@/components/ai-script-writer-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: 'Free AI Script Writer | Generate Scripts for Videos & More',
  description: 'Effortlessly create compelling scripts for YouTube videos, podcasts, and presentations with our free AI Script Writer. No login required. Get started now!',
};

const benefits = [
    "Overcome writer's block instantly.",
    "Save hours of brainstorming and writing time.",
    "Structure your content professionally.",
    "Generate ideas for various formats and topics."
];

const faqs = [
    {
        question: "1. Is this tool free to use?",
        answer: "Absolutely. The AI Script Writer is completely free, with no usage limits or subscriptions required."
    },
    {
        question: "2. What kind of scripts can I generate?",
        answer: "You can generate scripts for a wide variety of content, including YouTube videos, short films, podcast episodes, social media skits, ad copy, and more."
    },
    {
        question: "3. Is the generated content unique?",
        answer: "Yes, the AI generates unique content based on your specific prompt. However, we always recommend reviewing and adding your personal touch to make it truly yours."
    },
    {
        question: "4. What is 'Storytelling Mode'?",
        answer: "When enabled, Storytelling Mode instructs the AI to focus on creating a well-structured narrative. The generated script will have a clearer beginning, middle, and end, making it ideal for content that tells a story."
    },
    {
        question: "5. Can the AI write in different languages?",
        answer: "Yes. Our tool supports over 20 languages. You can write your prompt in English and select a different output language, and the AI will generate and translate the script for you."
    },
    {
        question: "6. How long can the generated scripts be?",
        answer: "You can choose the desired length, from a short concept to a medium-length script or a full-length draft. The AI will adjust the level of detail and content accordingly."
    },
    {
        question: "7. Can I use the generated scripts for commercial projects?",
        answer: "Yes, the scripts you generate are royalty-free. You are free to use them for personal and commercial projects, including monetized YouTube channels and professional podcasts."
    }
];

export default function AiScriptWriterPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Script Writer
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Generate high-quality, engaging scripts for any purpose. Just provide a prompt, and let our <strong>AI script writer</strong> handle the rest. Our <strong>AI content writer</strong> is perfect for creating content for YouTube videos, podcasts, and presentations. Overcome writer's block, save time on brainstorming, and structure your ideas professionally with this <strong>scriptwriting assistant AI</strong>. This free <strong>AI for creative writing</strong> tool helps you generate compelling narratives and dialogues for various formats and topics, making content creation faster and more efficient. It is the <strong>best AI scriptwriting tool</strong> for creators.
              </p>
            </div>

            <div className="mt-8">
                <AiScriptWriterClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Describe Your Script:</strong> Enter a detailed prompt describing the script you need. Include the topic, format (e.g., YouTube video, podcast), desired length, and tone.</p>
                    <p><strong>2. Generate:</strong> Click the "Generate Script" button.</p>
                    <p><strong>3. Review & Refine:</strong> Copy the generated script and use it as a starting point. Feel free to edit and adapt it to your unique voice.</p>
                </CardContent>
            </Card>

             <Card className="bg-card/50">
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

            <Card className="bg-card/50">
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
