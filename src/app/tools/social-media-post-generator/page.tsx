
import { type Metadata } from 'next';
import { SocialMediaPostClient } from '@/components/social-media-post-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: 'Free Social Media Post Generator | AI-Powered Captions',
  description: 'Generate engaging social media posts and captions with hashtags using our free AI tool. Perfect for Instagram, Facebook, Twitter, and LinkedIn.',
};

const benefits = [
    "Create compelling content in seconds.",
    "Get relevant hashtags to boost reach.",
    "Generate posts for multiple platforms.",
    "Save time and overcome creative blocks."
];

const faqs = [
    {
        question: "1. Which social media platforms is this for?",
        answer: "The generated posts are suitable for all major platforms like Instagram, Facebook, X (formerly Twitter), LinkedIn, and more."
    },
    {
        question: "2. Is there a limit to how many posts I can generate?",
        answer: "No, this tool is completely free and you can generate as many posts as you need."
    },
    {
        question: "3. Can I customize the generated content?",
        answer: "Absolutely! We recommend using the generated post as a starting point and adding your own personal touch or brand voice."
    },
    {
        question: "4. Does the AI generate hashtags automatically?",
        answer: "Yes, the AI analyzes your topic and automatically includes a set of relevant hashtags within the generated post to help increase its visibility and reach."
    },
    {
        question: "5. Can I generate posts in different languages?",
        answer: "Yes. Our tool supports over 20 languages. Simply select your desired language from the dropdown menu, and the AI will create the post in that language."
    },
    {
        question: "6. How long are the generated posts?",
        answer: "The AI aims to create posts of an optimal length for social media—long enough to be informative or engaging, but short enough to be easily readable in a feed."
    },
    {
        question: "7. How can I get the best results?",
        answer: "Provide a clear and concise topic. For example, instead of just 'coffee,' try 'the benefits of drinking black coffee in the morning.' The more specific you are, the better the result."
    }
];

export default function SocialMediaPostGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                Social Media Post Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Enter a topic and let our AI create engaging posts for your social media channels, complete with relevant hashtags to boost reach and save you time.
              </p>
            </div>

            <div className="mt-8">
                <SocialMediaPostClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter a Topic:</strong> Provide a keyword or a brief description of what you want to post about.</p>
                    <p><strong>2. Select Language:</strong> Choose the language for your post.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Post" button and let the AI work its magic.</p>
                    <p><strong>4. Copy & Paste:</strong> Use the copy button and paste the content directly to your social media platform.</p>
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
