import { type Metadata } from 'next';
import { YoutubeThumbnailGeneratorClient } from '@/components/youtube-thumbnail-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free YouTube Thumbnail Generator | Create Click-Worthy Thumbnails',
  description: 'Generate professional, eye-catching YouTube thumbnails for free with our AI-powered tool. Increase your click-through rate with stunning designs.',
};

const benefits = [
    "Boost your video's click-through rate (CTR).",
    "Create a professional and consistent brand look.",
    "Save time and money on graphic design.",
    "Generate multiple unique options in seconds."
];

const faqs = [
    {
        question: "1. Is it really free?",
        answer: "Yes, our AI YouTube Thumbnail Generator is 100% free to use. There are no hidden fees or subscriptions."
    },
    {
        question: "2. Can I use these thumbnails on monetized videos?",
        answer: "Absolutely. The images generated are royalty-free and can be used for your personal and commercial projects, including monetized YouTube channels."
    },
    {
        question: "3. How can I get the best results?",
        answer: "Provide a clear and concise video title. The AI works best with specific topics that it can visualize. You can also experiment with different styles in your prompt (e.g., 'A vibrant cartoon thumbnail about...')."
    },
    {
        question: "4. Does the AI add text to the thumbnail?",
        answer: "Yes. The AI is specifically prompted to create a YouTube thumbnail that includes your video title as bold, readable text. It focuses on creating a design that is visually appealing and click-worthy."
    },
    {
        question: "5. What size are the generated thumbnails?",
        answer: "You can choose a 16:9 aspect ratio, which is the standard for YouTube video thumbnails (1280x720 pixels), or a 1:1 square ratio, which is useful for social media previews or profile icons."
    },
    {
        question: "6. How many thumbnails does it generate?",
        answer: "The tool generates a batch of 4 unique thumbnail designs for each request, giving you multiple options to choose from for your video."
    },
    {
        question: "7. Do I need design skills to use this?",
        answer: "Not at all! The tool is designed for content creators, not graphic designers. You just provide the title, and the AI handles all the design work, including layout, colors, and typography."
    }
];


export default function YoutubeThumbnailGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                YouTube Thumbnail Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Enter your video title and let our <strong>AI thumbnail generator</strong> create stunning, <strong>click-worthy thumbnails</strong> that will grab your audience's attention. Our <strong>free YouTube thumbnail maker</strong> helps you design professional, <strong>eye-catching thumbnails</strong> to increase your <strong>click-through rate (CTR)</strong>. Create a consistent brand look and save time on graphic design with our <strong>AI-powered tool</strong>. Generate multiple unique options in seconds and boost your video's performance.
              </p>
            </div>

            <div className="mt-8">
                <YoutubeThumbnailGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Your Title:</strong> Write the title or main topic of your YouTube video.</p>
                    <p><strong>2. Choose Size:</strong> Select the aspect ratio—16:9 for standard thumbnails or 1:1 for icons and previews.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Thumbnails" button to see the AI-generated designs.</p>
                    <p><strong>4. Download:</strong> Click on your favorite thumbnail to download the high-quality version.</p>
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
