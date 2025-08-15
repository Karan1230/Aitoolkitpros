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

export default function SocialMediaPostGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                Social Media Post Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Enter a topic and let our AI create engaging posts for your social media channels, complete with hashtags. Our free AI social media post generator helps you create compelling content in seconds. Get relevant hashtags to boost your reach on Instagram, Facebook, Twitter, and LinkedIn. Save time, overcome creative blocks, and keep your social media feed active and engaging with our easy-to-use tool.
            </p>

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
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Which social media platforms is this for?</AccordionTrigger>
                            <AccordionContent>
                            The generated posts are suitable for all major platforms like Instagram, Facebook, X (formerly Twitter), LinkedIn, and more.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is there a limit to how many posts I can generate?</AccordionTrigger>
                            <AccordionContent>
                            No, this tool is completely free and you can generate as many posts as you need.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Can I customize the generated content?</AccordionTrigger>
                            <AccordionContent>
                            Absolutely! We recommend using the generated post as a starting point and adding your own personal touch or brand voice.
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
