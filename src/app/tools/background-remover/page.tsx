
import { type Metadata } from 'next';
import { BackgroundRemoverClient } from '@/components/background-remover-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

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
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Upload any image and let our AI automatically remove the background. It's fast, free, and incredibly simple, creating transparent PNGs for any project in seconds.
              </p>
            </div>

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
        </div>
      </div>
    </div>
  );
}
