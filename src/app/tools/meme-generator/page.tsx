import { type Metadata } from 'next';
import { MemeGeneratorClient } from '@/components/meme-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free AI Meme Generator | Create Funny Memes Instantly',
  description: 'Generate hilarious, shareable memes from text or images with our free AI Meme Generator. No login required. Go viral with your creativity!',
};

const benefits = [
    "Instantly create viral-worthy memes.",
    "Generate funny content for social media.",
    "No graphic design skills needed.",
    "Turn your ideas into humorous images."
];

const faqs = [
    {
        question: "1. Is it really free?",
        answer: "Yes, our AI Meme Generator is 100% free to use. There are no hidden costs or subscriptions."
    },
    {
        question: "2. Can I use my own images?",
        answer: "Absolutely! You can upload your own image, and the AI will add a witty caption to it."
    },
    {
        question: "3. What kind of topics work best?",
        answer: "Literally anything! Current events, relatable situations, or inside jokes work great. The more creative you are, the funnier the result."
    },
    {
        question: "4. What if I don't upload an image?",
        answer: "If you don't upload an image, the AI will generate one for you based on your topic. It will create a relevant and humorous image to go along with the meme text."
    },
    {
        question: "5. Can I use the generated memes on my social media?",
        answer: "Yes! The memes are royalty-free. Feel free to download them and share them on Instagram, Twitter/X, Facebook, or anywhere else."
    },
    {
        question: "6. Does the AI add the text directly onto the image?",
        answer: "Yes, the AI generates a final image with the meme text overlaid in a classic, bold, and easy-to-read meme font."
    },
    {
        question: "7. How long does it take to create a meme?",
        answer: "It's super fast! The entire process, from entering your topic to downloading the final image, usually takes less than 30 seconds."
    }
];

export default function MemeGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Meme Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Unleash your inner comedian. Describe a topic or upload an image, and let our <strong>AI meme generator</strong> create the perfect meme for you. Our <strong>free meme maker</strong> helps you create hilarious, <strong>shareable memes</strong> from text or images. Go viral with your creativity and <strong>generate funny content</strong> for social media without any graphic design skills. Turn your ideas into humorous images and entertain your audience instantly. This is the <strong>best meme generator</strong> for modern creators.
              </p>
            </div>

            <div className="mt-8">
                <MemeGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter a Topic:</strong> Be descriptive about the meme you want to create.</p>
                    <p><strong>2. (Optional) Upload Image:</strong> Upload your own image to use as the meme background.</p>
                    <p><strong>3. Generate:</strong> Click "Generate Meme" and let the AI work its magic.</p>
                    <p><strong>4. Download:</strong> Click the download button on your generated meme and share it with the world!</p>
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
