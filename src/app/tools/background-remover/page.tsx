import { type Metadata } from 'next';
import { BackgroundRemoverClient } from '@/components/background-remover-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free AI Image Background Remover | Remove Backgrounds Instantly',
  description: 'Easily remove the background from any image with our free AI-powered tool. Get a transparent PNG or add a custom color background in seconds. No login required.',
};

const benefits = [
    "Save time on manual photo editing.",
    "Create professional product photos for e-commerce.",
    "Make stunning profile pictures and social media posts.",
    "Isolate subjects for graphic design projects."
];

export default function BackgroundRemoverPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Image Background Remover
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Upload any image and let our AI automatically remove the background. It's fast, free, and incredibly simple. Our AI image background remover helps you create transparent PNGs, add custom color backgrounds, and save time on manual photo editing. This free tool is perfect for e-commerce product photos, social media posts, and graphic design projects. Get professional results instantly with our easy-to-use background eraser.
            </p>

            <div className="mt-8">
                <BackgroundRemoverClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Upload Your Image:</strong> Click the upload area and select an image from your device.</p>
                    <p><strong>2. Choose a Background:</strong> Select "Transparent" or pick a solid color for your new background.</p>
                    <p><strong>3. Process:</strong> Click the "Remove Background" button and let the AI do the work.</p>
                    <p><strong>4. Download:</strong> Click the download button on the resulting image to save your new, background-free photo.</p>
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
                            Yes, our AI Background Remover is 100% free to use. There are no hidden fees or subscriptions.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What image formats are supported?</AccordionTrigger>
                            <AccordionContent>
                            You can upload images in various formats like JPEG, PNG, and WEBP. The output will always be a high-quality PNG.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Is my data safe?</AccordionTrigger>
                            <AccordionContent>
                            Yes, your privacy is important. We don't store your images on our servers. They are sent to the AI for processing and then the result is returned to you.
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
