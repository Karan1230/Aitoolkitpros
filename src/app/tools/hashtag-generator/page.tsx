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

export default function HashtagGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Hashtag Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Enter a topic and let our AI generate the perfect hashtags to boost your social media presence.
            </p>

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
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is this tool free?</AccordionTrigger>
                            <AccordionContent>
                            Yes, our AI Hashtag Generator is 100% free to use. There are no limits on how many times you can use it.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Why do I need to select a platform?</AccordionTrigger>
                            <AccordionContent>
                            Different platforms have different hashtag best practices. For example, Instagram favors a larger number of hashtags, while Twitter/X is more effective with just a few. The AI optimizes its suggestions based on your choice.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What's the difference between hashtag styles?</AccordionTrigger>
                            <AccordionContent>
                            "Short & Popular" gives you high-traffic hashtags that reach a broad audience. "Long-Tail & Niche" provides more specific hashtags to target a dedicated community. "Mixed" offers a balance of both for a well-rounded strategy.
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
