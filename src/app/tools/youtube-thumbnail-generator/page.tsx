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

export default function YoutubeThumbnailGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                YouTube Thumbnail Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Enter your video title and let our AI create stunning, click-worthy thumbnails that will grab your audience's attention. Our free YouTube thumbnail generator helps you design professional, eye-catching thumbnails to increase your click-through rate (CTR). Create a consistent brand look and save time on graphic design with our AI-powered tool. Generate multiple unique options in seconds and boost your video's performance.
            </p>

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
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is it really free?</AccordionTrigger>
                            <AccordionContent>
                            Yes, our AI YouTube Thumbnail Generator is 100% free to use. There are no hidden fees or subscriptions.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Can I use these thumbnails on monetized videos?</AccordionTrigger>
                            <AccordionContent>
                            Absolutely. The images generated are royalty-free and can be used for your personal and commercial projects, including monetized YouTube channels.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>How can I get the best results?</AccordionTrigger>
                            <AccordionContent>
                            Provide a clear and concise video title. The AI works best with specific topics. You can also experiment with different styles to see what works best for your channel.
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
