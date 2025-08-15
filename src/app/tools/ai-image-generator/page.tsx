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

const faqs = [
    {
        question: "1. Is it really free?",
        answer: "Yes, our AI Image Generator is 100% free to use. There are no hidden costs or subscriptions."
    },
    {
        question: "2. Can I use the images commercially?",
        answer: "The images generated are royalty-free. You are free to use them for personal and commercial projects, but please check the terms of the underlying AI models for any specific restrictions."
    },
    {
        question: "3. What kind of prompts work best?",
        answer: "Detailed and specific prompts yield the best results. For example, instead of 'a dog', try 'a photo of a golden retriever puppy playing in a field of flowers during sunset'."
    },
    {
        question: "4. What image resolutions are available?",
        answer: "The AI generates high-resolution images suitable for most web and print applications. The exact dimensions can be controlled by selecting an aspect ratio like 1:1 (square), 16:9 (widescreen), or 9:16 (vertical)."
    },
    {
        question: "5. Can the AI create images of people or celebrities?",
        answer: "The AI can generate images of people, but for ethical reasons and to respect privacy, it is generally restricted from creating images of specific, named individuals, including celebrities."
    },
    {
        question: "6. How long does it take to generate an image?",
        answer: "Image generation is a complex process, but our tool is optimized for speed. Most images are generated within 10-30 seconds, depending on the complexity of the prompt and server load."
    },
    {
        question: "7. Are my prompts and generated images private?",
        answer: "Yes. We value your privacy. We do not store your text prompts or the images you generate on our servers. Your creations are yours alone."
    }
];

export default function AiImageGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Image Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                  Transform your words into breathtaking images. Describe what you want to see, and our <strong>AI image generator</strong> will bring it to life in seconds. This <strong>free AI image generator</strong> allows you to create high-quality, <strong>royalty-free images</strong> from text prompts. Whether you need visuals for your blog, social media, or creative projects, this tool helps you <strong>generate stunning art</strong>, illustrations, and photos instantly. Unleash your creativity and visualize any concept without needing artistic skills. This is one of the <strong>best AI image tools</strong> for creators.
              </p>
            </div>

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
