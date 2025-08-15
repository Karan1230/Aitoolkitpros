import { type Metadata } from 'next';
import { HashtagGeneratorClient } from '@/components/hashtag-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free AI Hashtag Generator | Boost Your Social Media Reach',
  description: 'Generate relevant, trending, and niche-specific hashtags for Instagram, TikTok, YouTube, and more with our free AI Hashtag Generator.',
};

const benefits = [
    "Increase the visibility and reach of your posts.",
    "Attract your target audience more effectively.",
    "Save time on hashtag research.",
    "Discover trending and niche hashtags in your industry."
];

const faqs = [
    {
        question: "1. Is this tool free?",
        answer: "Yes, our AI Hashtag Generator is 100% free to use. There are no limits on how many times you can use it."
    },
    {
        question: "2. Why do I need to select a platform?",
        answer: "Different platforms have different hashtag best practices. For example, Instagram favors a larger number of hashtags, while Twitter/X is more effective with just a few. The AI optimizes its suggestions based on your choice."
    },
    {
        question: "3. What's the difference between hashtag styles?",
        answer: "'Short & Popular' gives you high-traffic hashtags that reach a broad audience. 'Long-Tail & Niche' provides more specific hashtags to target a dedicated community. 'Mixed' offers a balance of both for a well-rounded strategy."
    },
    {
        question: "4. How many hashtags does the tool generate?",
        answer: "The tool generates a list of at least 20 relevant hashtags, providing you with a comprehensive set of options to use in your posts."
    },
    {
        question: "5. Can I just copy and paste the hashtags?",
        answer: "Yes. After the hashtags are generated, you can use the 'Copy' button to copy all of them to your clipboard, formatted with spaces, ready to be pasted directly into your social media post."
    },
    {
        question: "6. How does the AI find the best hashtags?",
        answer: "The AI analyzes your topic and cross-references it with current trends and data from the selected social media platform to find hashtags that are relevant, have good engagement, and match your chosen style."
    },
    {
        question: "7. Should I use all the generated hashtags?",
        answer: "Not necessarily. We recommend choosing the most relevant hashtags from the generated list that best fit your specific post. Quality is often more important than quantity."
    }
];

export default function HashtagGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Hashtag Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Enter a topic and let our <strong>AI hashtag generator</strong> generate the perfect hashtags to boost your social media presence. Our <strong>free hashtag tool</strong> helps you find <strong>relevant hashtags</strong>, <strong>trending hashtags</strong>, and <strong>niche-specific hashtags</strong> for Instagram, TikTok, YouTube, and more. Increase your post's visibility, attract your target audience, and save time on <strong>hashtag research</strong>. Discover the <strong>best hashtags</strong> for your content and watch your reach grow.
              </p>
            </div>

            <div className="mt-8">
                <HashtagGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Your Topic:</strong> Provide a keyword, niche, or a short description of your post.</p>
                    <p><strong>2. Select Platform:</strong> Choose the social media platform you're posting on.</p>
                    <p><strong>3. Choose Style:</strong> Select the type of hashtags you need.</p>
                    <p><strong>4. Generate:</strong> Click the "Generate Hashtags" button to get a list of optimized hashtags.</p>
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
