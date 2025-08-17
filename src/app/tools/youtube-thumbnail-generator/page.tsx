
import { type Metadata } from 'next';
import { YoutubeThumbnailGeneratorClient } from '@/components/youtube-thumbnail-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

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
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Enter your video title and let our AI create stunning, click-worthy thumbnails that will grab your audience's attention and increase your click-through rate (CTR).
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
        </div>
      </div>
    </div>
  );
}
