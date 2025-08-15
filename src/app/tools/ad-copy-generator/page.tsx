import { type Metadata } from 'next';
import { AdCopyGeneratorClient } from '@/components/ad-copy-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Free AI Ad Copy Generator | Create High-Converting Ads',
  description: 'Generate effective ad copy for Google, Facebook, Instagram, and more with our free AI tool. Create headlines, body text, and CTAs in seconds.',
};

const benefits = [
    "Create high-converting ad copy in seconds.",
    "Optimize your ads for different platforms.",
    "A/B test multiple variations to find the winner.",
    "Save time and money on copywriting."
];

const faqs = [
    {
        question: "1. Is this tool free to use?",
        answer: "Yes, our AI Ad Copy Generator is 100% free to use."
    },
    {
        question: "2. Is the ad copy optimized for each platform?",
        answer: "Yes. The AI considers the typical character limits, style, and best practices for the platform you select to create more effective ad copy."
    },
    {
        question: "3. Can I use this for any product or service?",
        answer: "Absolutely. The tool is designed to be versatile and can generate ad copy for a wide range of industries and offerings."
    },
    {
        question: "4. What languages does the ad copy generator support?",
        answer: "You can generate ad copy in over 20 languages. Simply select your desired language from the dropdown menu before generating the copy."
    },
    {
        question: "5. Can I generate copy for A/B testing?",
        answer: "Yes! The tool generates multiple unique ad variations with different headlines and body text, making it perfect for A/B testing to see which message resonates best with your audience."
    },
    {
        question: "6. How can I get the best results?",
        answer: "For the best results, be as specific as possible in the 'Product Details' and 'Key Selling Points' fields. The more context you give the AI, the more relevant and persuasive the generated ad copy will be."
    },
    {
        question: "7. Is the generated content original?",
        answer: "Yes, the AI creates new ad copy from scratch based on your inputs. While the ideas are unique, we always recommend reviewing the copy to ensure it perfectly aligns with your brand's voice."
    }
];

export default function AdCopyGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Ad Copy Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Turn your product details into persuasive <strong>high-converting ad copy</strong> that drives clicks and conversions. Our <strong>AI ad copy generator</strong> helps you craft compelling headlines, body text, and calls-to-action (CTAs) for various platforms, including our <strong>Google Ads copywriting tool</strong> and <strong>Facebook ad copy generator</strong>. This free <strong>AI-powered ad writing tool</strong> is perfect for marketers looking to create effective <strong>AI for ad creatives</strong>, run A/B tests, and save time on copywriting. Boost your digital marketing campaigns with the <strong>best AI ad copy tools</strong> available. You can also generate creative posts with our <Link href="/tools/social-media-post-generator" className="text-primary hover:underline">Social Media Post Generator</Link>.
              </p>
            </div>

            <div className="mt-8">
                <AdCopyGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Details:</strong> Provide product info, your target audience, and key selling points.</p>
                    <p><strong>2. Select Platform & Tone:</strong> Choose the ad platform and the tone of voice for your copy.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Ad Copy" button to get multiple ad variations.</p>
                    <p><strong>4. Copy & Use:</strong> Copy your favorite ad variation and use it in your campaign.</p>
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
