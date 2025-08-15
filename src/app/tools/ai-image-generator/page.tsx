import { type Metadata } from 'next';
import { AiImageGeneratorClient } from '@/components/ai-image-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free AI Image Generator | Create Art from Text',
  description: 'Generate stunning, high-quality images from text prompts with our free AI Image Generator. No login required. Turn your creative ideas into visual art instantly.',
};

const benefits = [
    "Unleash creativity without artistic skills.",
    "Generate unique assets for blogs and social media.",
    "Visualize concepts and ideas in seconds.",
    "Create royalty-free images for any project."
];

export default function AiImageGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Image Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Transform your words into breathtaking images. Describe what you want to see, and our AI will bring it to life in seconds. This free AI image generator allows you to create high-quality, royalty-free images from text prompts. Whether you need visuals for your blog, social media, or creative projects, this tool helps you generate stunning art, illustrations, and photos instantly. Unleash your creativity and visualize any concept without needing artistic skills.
            </p>

            <div className="mt-8">
                <AiImageGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Write a Prompt:</strong> Be descriptive. The more detail you provide, the better the result. Think about the subject, style, colors, and mood.</p>
                    <p><strong>2. Generate:</strong> Click the "Generate Image" button and wait for the AI to work its magic.</p>
                    <p><strong>3. Download:</strong> Right-click and save your generated image. Use it for your projects, social media, or just for fun!</p>
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
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is it really free?</AccordionTrigger>
                            <AccordionContent>
                            Yes, our AI Image Generator is 100% free to use. There are no hidden costs or subscriptions.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Can I use the images commercially?</AccordionTrigger>
                            <AccordionContent>
                            The images generated are royalty-free. You are free to use them for personal and commercial projects, but please check the terms of the underlying AI models for any specific restrictions.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What kind of prompts work best?</AccordionTrigger>
                            <AccordionContent>
                            Detailed and specific prompts yield the best results. For example, instead of "a dog", try "a photo of a golden retriever puppy playing in a field of flowers during sunset".
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
